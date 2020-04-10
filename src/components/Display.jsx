import React, { Component } from 'react';

function getProcessingPage(data) {
  const message = data[0];

  switch (message.state) {
    case 'sucess':
      console.log("RETURN: { title: 'Order complete', message: null }");
      return { title: 'Order complete', message: null };

    case 'processing':
      console.log('processing' + '.'.repeat(data.length - 1));
      if (data.length > 1) {
        let newData = [...data];
        newData.shift();
        setTimeout(function () {
          getProcessingPage(newData);
        }, 2000);
      } else {
        console.log("RETURN: { title: 'Error page', message: null }");
        return { title: 'Error page', message: null };
      }
      break;

    case 'error':
      switch (message.errorCode) {
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

export class Display extends Component {
  process = () => {
    let data = this.props.input.data;
    console.clear();
    console.table(data);
    getProcessingPage(data);
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
