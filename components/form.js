import React, { Component } from 'react';

class Form extends Component {
  onKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      document.querySelector('button').click()
    }
  }

  render() {
    return (
      <div>
        <div className="location">
          <input 
            autoFocus 
            type="text" 
            placeholder={`${this.props.location} ${this.props.country ?? ''}`} 
            onKeyDown={this.onKeyDown}
          />
          <button onClick={this.props.onBtnClick}>Search</button>
        </div>
      </div>
    )
  }
}

export default Form