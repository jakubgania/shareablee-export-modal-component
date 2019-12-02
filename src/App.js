import React from 'react';
import Modal from './Component/Modal';
import './App.css';

class App extends React.Component {
  state = {
    show: false
  };
  showModal = () => {
    console.log('click button')
    this.setState({
      show: !this.state.show
    })
  };
  render() {
    return (
      <div className="App">
        <div className="App-button-container">
          <button className="export-report-button" onClick={this.showModal}>
            Export Report
          </button>
          <Modal onClose={this.showModal} show={this.state.show}/>
        </div>
      </div>
    );
  }
}

export default App;
