import React, { Component } from 'react';

class City extends Component {
  render() {
    return (
      <div>
        <div className="location" onClick={this.props.onBtnClick}>
          { this.props.location }
          {this.props.country !== null ? 
            <>, <span>{ this.props.country }</span></> :
            null
          }
          
        </div>
      </div>
    )
  }
}

export default City