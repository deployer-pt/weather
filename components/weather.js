import React, { Component } from 'react';

class Weather extends Component {
  render() {
    return (
      <div className="weather">
        <div className="main">
          <div className="icon"><i className={`wi wi-owm-${this.props.weather.type}-${this.props.weather.weather[0].id}`}></i></div>
          <div className="temperature">
            <div className="small">
              { this.props.weather.temp_min }<sup>º</sup>
              <span>MIN</span>
            </div>
            <div className="big">
              { this.props.weather.temp_current }<sup>º</sup>
            </div>
            <div className="small">
              { this.props.weather.temp_max }<sup>º</sup>
              <span>MAX</span>
            </div>
          </div>
          <div className="description">{ this.props.weather.weather[0].main }</div>
        </div>
      </div>
    )
  }
}

export default Weather