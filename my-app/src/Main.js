import React, { useState } from 'react';

export default function Main() {
  const [year, setYear] = useState(1997); // default parameter
  
  const handleSliderChange = (event) => {
    setYear(parseInt(event.target.value));
  };
  
  return (
    <div className="main">
      <div class="grid-container">

        {/* Header */}
        <div class="grid-item">
          <h1 className="title">United States Poverty Rate</h1>
        </div>
        <div class="grid-item">
          <div className="header-2">
            <a href="#" className="links-huh">Home</a>
            <a href="#" className="links-huh">About</a>
          </div>
        </div>

        {/* MAP */}
        <div class="grid-item long">
          <div className="map">
            MAP
          </div>
        </div>
        {/* MAP INFO */}
        <div class="grid-item long">
          <div className="map-info">
            INFO
          </div>
        </div>
        {/* Map parameters */}
        <div class="grid-item">
          <div className="map-parameters">
            @param
            <div className="param-1">
              <input
              type="range"
              min="1997"
              max="2023"
              value={year}
              onChange={handleSliderChange}
              />
              <p>{year}</p>
            </div>
          
          </div>
        </div>
        <div class="grid-item"></div>

        {/* Footer Locations */}
        <div class="grid-item">Grid 7</div>
        <div class="grid-item">Grid 8</div>
      </div>


    </div>
  )
}
