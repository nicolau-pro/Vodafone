import React, { Component } from 'react';
import './styles/App.min.css';
import Display from './components/Display';

function getProcessingPage(data) {
  const message = data[0];

  switch (message.state) {
    case 'sucess':
      return { title: 'Order complete', message: null };

    case 'processing':
      console.log('processing' + '..'.repeat(data.length - 1));
      if (data.length > 1) {
        let newData = [...data];
        newData.shift();

        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            resolve(getProcessingPage(newData));
          }, 2000);
        });
      } else {
        return { title: 'Error page', message: null };
      }

    case 'error':
      switch (message.errorCode) {
        case 'NO_STOCK':
          return { title: 'Error page', message: 'No stock has been found' };

        case 'INCORRECT_DETAILS':
          return { title: 'Error page', message: 'Incorrect details have been entered' };

        default:
          return { title: 'Error page', message: null };
      }

    default:
      return { title: 'Error page', message: null };
  }
}

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
    };
  }

  componentDidMount() {
    console.log('Loaded inputs');
  }

  render() {
    return (
      <>
        {this.state.inputs.map((input, index) => (
          <Display key={index} input={input} getProcessingPage={getProcessingPage} />
        ))}
      </>
    );
  }
}

export default App;
