import React, { Component } from 'react';

class Form extends Component {
  render() {
    return (
      <div>
        <div className="location">
          <input type="text" placeholder={`${this.props.location} ${this.props.country ?? ''}`} />
          <button onClick={this.props.onBtnClick}>Search</button>
        </div>
      </div>
    )
  }
}

export default Form