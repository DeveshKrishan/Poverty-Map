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
  

  const yearOptions = [
    {
      label: "1997",
      value: "1997",
    },
    {
      label: "1998",
      value: "1998",
    },
    {
      label: "1999",
      value: "1999",
    },
    {
      label: "2000",
      value: "2000",
    },
    {
      label: "2001",
      value: "2001",
    },
    {
      label: "2002",
      value: "2002",
    },
    {
      label: "2003",
      value: "2003",
    },
    {
      label: "2004",
      value: "2004",
    },
    {
      label: "2005",
      value: "2005",
    },
    {
      label: "2006",
      value: "2006",
    },
    {
      label: "2007",
      value: "2007",
    },
    {
      label: "2008",
      value: "2008",
    },
    {
      label: "2009",
      value: "2009",
    },
    {
      label: "2010",
      value: "2010",
    },
    {
      label: "2011",
      value: "2011",
    },
    {
      label: "2012",
      value: "2012",
    },
    {
      label: "2013",
      value: "2013",
    },
    {
      label: "2014",
      value: "2014",
    },
    {
      label: "2015",
      value: "2015",
    },
    {
      label: "2016",
      value: "2016",
    },
    {
      label: "2017",
      value: "2017",
    },
    {
      label: "2018",
      value: "2018",
    },{
      label: "2019",
      value: "2019",
    },
    {
      label: "2020",
      value: "2020",
    }
  ];
  
  const selectYear = ({ selectYYear, onChange }) => (
    <Select 
      options={yearOptions}
      value={yearOptions.find(option => option.value === selectYYear)}
      onChange={onChange}
    />
  );

  const handleSliderChange = (event) => {
    setYear(parseInt(event.target.value));
    // setTemp(newValue);

  };

  const [topic, setTopic] = useState("povRate");
  



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
            <div className="Legend"> This is a Legend</div>
            <MapChart year={year} topic={topic} />
          </div>
        </div>
        {/* MAP INFO */}
        <div class="grid-item long">
          <div className="map-info">
            <p className="map-info-part">Poverty Rate:</p>
            <p className="map-info-part">Annual Income:</p>
            <p className="map-info-part">Population Count:</p>
            {/* Add line graph here  */}
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
                {selectYear({ selectYYear: year, onChange: selectedOption => setYear(selectedOption.value) })}
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
