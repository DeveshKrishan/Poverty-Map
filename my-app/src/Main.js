import React, { useState } from 'react';
import MapChart from './MapChart';

export default function Main() {

  const options = [
    {
      label: "Poverty Rate",
      value: "povRate",
    },
    {
      label: "Annual Income",
      value: "annIncome",
    },
  ];

  const [year, setYear] = useState(1997); // default parameter
  const [selectedCounty, setSelectedCounty] = useState(null);

  const handleSliderChange = (event) => {
    setYear(parseInt(event.target.value));
  };

  const [topic, setTopic] = useState("povRate");
  
  const handleTopicChange = (e) => {
    setTopic(e.target.value);
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
            <MapChart year={year} topic={topic} />
          </div>
        </div>
        {/* MAP INFO */}
        <div class="grid-item long">
          <div className="map-info">
            INFO
          </div>
        </div>
        {/* Map parameters */}
        <div class="grid-item" id='mapParam'>
          <div className="map-parameters">

          
            <div className='param-2'>
                <label for="language">Select type of data:</label>
                  <select name="language" id="language" onChange={handleTopicChange}>
                    <option value="povRate" >Poverty Rate</option>
                    <option value="annIncome">Annual Income</option>
                  </select>
              </div>

              <div className="param-1">
                <p>Select Year:</p>
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
