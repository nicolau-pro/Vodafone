import React, { Component } from 'react';
import './styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: [
        require('./data/error-INCORRECT_DETAILS.json'),
        require('./data/error-NO_STOCK.json'),
        require('./data/error-null.json'),
        require('./data/error-undefined.json'),
        require('./data/example.json'),
        require('./data/sucess.json'),
      ],
      currentInput: 5,
    };
  }

  componentDidMount() {
    console.log('Loaded input');
    console.table(this.state.inputs[this.state.currentInput].data);

    function getProcessingPage(data) {
      let message = data[0];
      let state = message.state;
      let errorCode = message.errorCode;

      console.log(message);

      switch (state) {
        case 'sucess':
          console.log("RETURN: { title: 'Order complete', message: null }");
          return { title: 'Order complete', message: null };

        case 'processing':
          if (data.length > 1) {
            data.shift();
            setTimeout(function () {
              getProcessingPage(data);
            }, 200);
          } else {
            console.log("RETURN: { title: 'Error page', message: null }");
            return { title: 'Error page', message: null };
          }
          break;

        case 'error':
          switch (errorCode) {
            case 'NO_STOCK':
              console.log("RETURN: { title: 'Error page', message: 'No stock has been found' }");
              return { title: 'Error page', message: 'No stock has been found' };

            case 'INCORRECT_DETAILS':
              console.log("RETURN: { title: 'Error page', message: 'Incorrect details have been entered' }");
              return { title: 'Error page', message: 'Incorrect details have been entered' };

            default:
              console.log("RETURN: { title: 'Error page', message: null }");
              return { title: 'Error page', message: null };
          }

        default:
          console.log("RETURN: { title: 'Error page', message: null }");
          return { title: 'Error page', message: null };
      }
    }

    getProcessingPage(this.state.inputs[this.state.currentInput].data);
  }

  render() {
    return <></>;
  }
}

export default App;
