import React, { Component } from 'react';
import './styles/App.css';
import Display from './components/Display';

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
          <Display key={index} input={input} />
        ))}
      </>
    );
  }
}

export default App;
