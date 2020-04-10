import React, { Component } from 'react';

class Display extends Component {
  process = () => {
    const data = this.props.input.data;
    console.clear();
    console.log('\nINPUT:');
    console.table(data);
    this.props.getProcessingPage(data).then(function (result) {
      console.log('\nRETURN:');
      console.table(result);
      return result;
    });
  };

  render() {
    return (
      <section>
        <ol start='0'>
          {this.props.input.data.map((message, index) => (
            <li key={index}>
              <span>
                state: <strong>{message.state} </strong>
                {message.errorCode !== undefined ? (
                  <>
                    | errorCode: <strong>{message.errorCode === null ? 'null' : message.errorCode}</strong>
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

        <em> open console for details...</em>

        <hr />
      </section>
    );
  }
}

export default Display;
