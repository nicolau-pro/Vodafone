import React, { Component } from 'react';

export class Display extends Component {
  process = () => {
    let data = this.props.input.data;
    console.clear();
    console.log('Input:');
    console.table(data);
    this.props.getProcessingPage(data);
  };

  render() {
    return (
      <section className='display'>
        <ol start='0'>
          {this.props.input.data.map((message, index) => (
            <li key={index}>
              <span>
                state: <strong>{message.state}</strong>
                {message.errorCode ? (
                  <>
                    , errorCode: <strong>{message.errorCode}</strong>
                  </>
                ) : (
                  <></>
                )}
              </span>
            </li>
          ))}
        </ol>
        <button type='button' onClick={this.process}>
          Process
        </button>
        <em>&nbsp;See console for details...</em>
        <hr />
      </section>
    );
  }
}

export default Display;
