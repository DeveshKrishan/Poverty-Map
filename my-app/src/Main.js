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

  // Modal

  const [modalVisible, setModalVisble] = useState(false);

  const handleModalToggle = () =>{
    setModalVisble(!modalVisible);
  }

  // when clicked only on overlay
  const handleOverlayClick = (event) =>{
    if(event.target.classList.contains("modal-overlay")){
      handleModalToggle();
    }
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
            <a href="#" className="links-huh" onClick={handleModalToggle}>About</a>
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

      
      
      {/* Modal Overlay */}
      <div className={`modal-overlay ${modalVisible ? 'active' : ''}`} onClick={handleOverlayClick}>
        {/* Modal Container */}
        <div className={`modal ${modalVisible ? 'active' : ''}`}>
          <div className="modal-content">
            <div className="module">
              <h1>About Us</h1>
              <button className="modal-close-button" onClick={handleModalToggle}>
                <span className="close-icon">X</span>
              </button>
            </div>
            {/* insert About info */}
            <div className='aboutText'>
              <p className="modal-content-text">
                Where is the data from? The data is publicly available from the <a href='https://www.census.gov/data/developers/data-sets/Poverty-Statistics.html ' target='_blank'>United States Census Bureau</a>.  
              </p>
              <p className="modal-content-text">
                How did you build this? We built this using React, Node.js, Python, and Git. Some libaries we use are React Simple Maps for the map, React Select for the map parameters, and Recharts for the line charts. Python is used to create specific JSON files to allow queries to be much faster than manually searching through a 72,000 line CSV. 
              </p>
              <p className="modal-content-text">
                Any future updates? Currently, there is no initiative to continue to develop this project. We do have some features in mind such as predicting the poverty and annual incomes of every county, allow users to search for specific counties, and add more information for each county.
              </p>
              <p className="modal-content-text">
                Who built this? <a href='https://github.com/DeveshKrishan' target='_blank'>Devesh Krishan </a>, <a href='https://github.com/sarvesh-krishan' target='_blank'>Sarvesh Krishan</a>, <a href='https://github.com/JaskirtKaler' target='_blank'>Jaskirt Kaler </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
