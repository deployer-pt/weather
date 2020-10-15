import React, { Component } from 'react';

class Description extends Component {
  render() {
    return (
      <div>
        <div className="icons-description">

          <div className="block">
            <div className="icon"><i className="wi wi-sunrise"></i></div>
            <div className="txt">
              { this.props.weather.sunrise }
              <span>SUNRISE</span>
            </div>
          </div>

          <div className="block">
            <div className="icon"><i className="wi wi-sunset"></i></div>
            <div className="txt">
              { this.props.weather.sunset }
              <span>SUNSET</span>
            </div>
          </div>

          <div className="block">
            <div className="icon"><i className="wi wi-day-sunny"></i></div>
            <div className="txt">
              { this.props.weather.uvi }
              <span>UV</span>
            </div>
          </div>

          <div className="block">
            <div className="icon"><i className="wi wi-strong-wind"></i></div>
            <div className="txt">
              { this.props.weather.wind_speed }m/s
              <span>WIND</span>
            </div>
          </div>

          <div className="block">
            <div className="icon"><i className="wi wi-raindrops"></i></div>
            <div className="txt">
              { this.props.weather.humidity }%
              <span>HUMIDITY</span>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default Description