import React, { Component } from 'react';
import Display from './components/Display';
import './styles/App.min.css';

function getProcessingPage(data) {
  const error = { title: 'Error page', message: null };

  switch (data[0].state) {
    case 'success':
      return { title: 'Order complete', message: null };

    case 'processing':
      console.log('processing' + '..'.repeat(data.length - 1));
      if (data.length > 1) {
        let newData = [...data];
        newData.shift();

        return new Promise(function (resolve) {
          setTimeout(function () {
            resolve(getProcessingPage(newData));
          }, 2000);
        });
      } else return error;

    case 'error':
      switch (data[0].errorCode) {
        case 'NO_STOCK':
          return { title: 'Error page', message: 'No stock has been found' };

        case 'INCORRECT_DETAILS':
          return { title: 'Error page', message: 'Incorrect details have been entered' };

        default:
          return error;
      }

    default:
      return error;
  }
}

class App extends Component {
  state = {
    inputs: [
      require('./data/error-INCORRECT_DETAILS.json'),
      require('./data/error-NO_STOCK.json'),
      require('./data/error-null.json'),
      require('./data/error-undefined.json'),
      require('./data/example.json'),
      require('./data/success.json'),
    ],
  };

  componentDidMount() {
    console.log('Loaded ' + this.state.inputs.length + ' inputs.');
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
