import React, { useState, useEffect } from 'react';
import MapChart from './MapChart';
import Select from 'react-select';
// import Box from '@mui/material/Box';
// import Slider from '@mui/material/Slider';
import MapInfo from './MapInfo';
import Legend from './Legend';
import minMaxJSON from "./data/min_max.json";
import funFactsJSON from "./data/fun_facts.json";

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
  const [selectedCountyName, setSelectedCountyName] = useState(null); // State to store selected county name
  const [selectedCountyId, setSelectedCountyId] = useState(null); // State to store selected county ID
  const [topic, setTopic] = useState("povRate");
  const [funFact, setFunFact] = useState(funFactsJSON['facts'][(Math.floor(Math.random() * funFactsJSON['facts'].length))]);

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

  useEffect(() => {
    if(year === "1999"){
      alert("There is no data available for 1999.");
    }
  },[year]);

  // const handleSliderChange = (event) => {
  //   setYear(parseInt(event.target.value));
  //   // setTemp(newValue);

  // };
  let minimumValue = "";
  let maximumValue = "";
  try{
    const minMaxTopic = (topic === "povRate") ? "rate" : "income";

    const minMaxArray = minMaxJSON[year][minMaxTopic][0];
    minimumValue = minMaxArray[0].toLocaleString("en-US");
    maximumValue = minMaxArray[1].toLocaleString("en-US");

    minimumValue = (topic === "povRate") ? `${minimumValue}%` : `$${minimumValue}`;
    maximumValue = (topic === "povRate") ? `${maximumValue}%` : `$${maximumValue}`;
  }
  catch(e){
    console.error(`Something went wrong with getting the min and max values of the legend: ${e}`);
  }

  useEffect(() => {
    const funFactInterval = setInterval(() => {
      // Generate a new random fun fact here
      const newFunFact = generateRandomFunFact();
      setFunFact(newFunFact);
    }, 6000); // 6000 milliseconds = 6 seconds

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(funFactInterval);
    };
  }, []);


  function generateRandomFunFact(){
    const funFactsArr = funFactsJSON['facts'];
    const funFact = funFactsArr[(Math.floor(Math.random() * funFactsArr.length))];
    return funFact
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
                  <div className="Legend">
                    <Legend />
                    <div className="legend-title">
                      <p>{minimumValue}</p>
                      <p>{maximumValue}</p>
                    </div>
                  </div>
                  <MapChart year={year} topic={topic} onCountySelect={(selectedCountyName, selectedCountyId) => {
                      setSelectedCountyName(selectedCountyName);
                      setSelectedCountyId(selectedCountyId);
                    }}
                  />
                </div>
              </div>

        {/* MAP INFO */}
        <div class="grid-item long">
          <div className="map-info">
            <MapInfo countyName={ year === "1999" ? "N/A" : selectedCountyName} countyId={selectedCountyId} mapYear={year} />
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
        <div className="grid-item">
          <div className='fun-facts'>
            <p>Fun fact: {funFact} </p>
          </div>
        </div>
          
        {/* Footer Locations */}
        <div class="grid-item">
          <p className="footer"> &copy; 2023 Devesh Krishan, Sarvesh Krishan, Jaskirt Kaler. All rights reserved.</p> 
        </div>
      </div>


    </div>
  )
}
