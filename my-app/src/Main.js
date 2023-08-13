import React, { useState } from 'react';
import MapChart from './MapChart';
import Select from 'react-select';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
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
  
  const SelectTopic = ({ topic, onChange }) => (
    <Select
      options={options}
      value={options.find(option => option.value === topic)}
      onChange={onChange}
    />
  );
  

  const handleSliderChange = (event) => {
    setYear(parseInt(event.target.value));
  };

  const [topic, setTopic] = useState("povRate");
  

  function valuetext(value) {
    return `${value}°C`;
  }



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
                <SelectTopic topic={topic} onChange={selectedOption => setTopic(selectedOption.value)} />
              </div>

              <div className="param-1">
                <p>Select Year:</p>
                {/* <input
                type="range"
                min="1997"
                max="2023"
                value={year}
                onChange={handleSliderChange}
                /> */}
                <Box sx={{ width: 300 }}>
                  <Slider
                    // aria-label="Temperature"
                    // defaultValue={1997}
                    // getAriaValueText={valuetext}
                    // valueLabelDisplay="auto"
                    // step={1000}
                    // marks={true}
                    // min={1997}
                    // max={2020}
                    // onChange={handleSliderChange}

                    value={year}
                    onChange={handleSliderChange}
                    min={1997}
                    max={2020}
                    step={1}
                    marks={true}
                    valueLabelDisplay='auto'
                    aria-labelledby="year-slider"
                  />
                </Box>

                <p>{year}</p>
              </div>
          
          </div>


          
        </div>
        <div class="grid-item"></div>

        {/* Footer Locations */}
        <div class="grid-item">Footer</div>
      </div>


    </div>
  )
}
