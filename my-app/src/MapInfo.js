import jsonData from "../src/data/county_index.json"
import stateData from "./data/state_id.json"
import { useState, useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Label} from 'recharts';

function MapInfo(props) {
    const [screenSize, setScreenSize] = useState(getCurrentDimension());
    const county = props.countyName;
    const uid = props.countyId;
    const year = props.mapYear;

    let povertyRate = "";
    let annualIncome = "";
    let population = "";
    let stateName = "";
    let statePopulation = "";
    let intervalRange = 0;
    let chartHeight = "25%";
    let chartWidth = "100%";

    if (screenSize.width > 1800){
      intervalRange = 1;
      chartHeight = "25%";
      chartWidth = "100%";   
    }
    else if (screenSize.width > 1400 ){
      intervalRange = 3;
      chartHeight = "20%";
    }
    else if (screenSize.width > 1000){
      intervalRange = 5;
      chartHeight = "15%";
    }
    else if (screenSize.width > 700){
      intervalRange = 4;
    }
    else if (screenSize.width > 300){
      intervalRange = 6;
    }
    else{
      intervalRange = 1;
    }



    try{
        povertyRate = `${jsonData[uid][year]['rate_estimate']}%`;
        annualIncome = `$${parseInt(jsonData[uid][year]['median_income']).toLocaleString("en-US")}`;
        population = parseInt(jsonData[uid][year]['count_estimate']).toLocaleString("en-US");
        stateName = stateData[uid.slice(0, 2)]['name']
        // console.log(parseInt(population) / parseFloat(jsonData[uid][year]['rate_estimate']) / 100);
        statePopulation = Math.floor(parseInt(jsonData[uid][year]['count_estimate']) / (parseFloat(jsonData[uid][year]['rate_estimate']) / 100)).toLocaleString("en-US");
    }
    catch(e){
        povertyRate = "";
        annualIncome = "";
        population = "";
        stateName = "";
    }

    let povertyData = [];
    let incomeData = [];
    let countData = [];
    try{
      const dataInYears = jsonData[uid];
      
      for (let i in dataInYears){
        // console.log(i, dataInYears[i]);
        const tempPoverty = {
          "year" : i,
          "Poverty" : dataInYears[i]['rate_estimate']
        };

        const tempIncome = {
          "year" : i,
          "Income" : dataInYears[i]['median_income']
        };

        const tempCount = {
          "year" : i,
          "Count" : dataInYears[i]['count_estimate']
        }
      povertyData.push(tempPoverty);
      incomeData.push(tempIncome);
      countData.push(tempCount);
      }
    }
    catch(e){
      console.error(`Error has occured : ${e}`);
    }
    
    useEffect(() => {
      const updateDimension = () => {
        setScreenSize(getCurrentDimension())
      }
      window.addEventListener('resize', updateDimension);
      
      return(() => {
          window.removeEventListener('resize', updateDimension);
      })
    }, [screenSize])

    const maxYValue = Math.max(...povertyData.map(item => item.Poverty)) + 5; // Adding some buffer
    const maxYValueIncome = Math.max(...incomeData.map(item => item.Income)) + 1000; // Adding some buffer
    const maxYValueCount = Math.max(...countData.map(item => item.Count)) + 300; // Adding some buffer

    return (
      <>
        <p className="map-info-part">
          <p>
          State: { year === "1999" ? "N/A" :stateName}
          </p>
          County Name: { year === "1999" ? "N/A" :county}
          <p>
          County Population: { year === "1999" ? "N/A" :statePopulation}
          </p>
    
        </p>

        {/* <p className="map-info-part">State Name: {stateName}</p> */}
        <p className="map-info-part">Poverty Rate: { year === "1999" ? "N/A" : povertyRate} </p>
        <ResponsiveContainer width={chartWidth} height={chartHeight}>
          <LineChart fontSize={"0.8rem"}     margin={{
            top: 0,
            right: 15,
            left: 0,
            bottom: 0
          }} data={povertyData} >
            <Line type="monotone" dataKey="Poverty" name="Poverty Rate" stroke="#005E84" />
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <XAxis dataKey="year" interval={intervalRange} label={{ value: 'Year', position: 'insideBottom', offset: -15 }}/>
            <YAxis dataKey="Poverty" domain={[0, maxYValue]} label={{ value: 'Poverty Rate', position: 'insideLeft', angle: -90 }} />
            <Tooltip/>
            <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize : 20}}/>

          </LineChart>
        </ResponsiveContainer>

        <p className="map-info-part">Annual Income: { year === "1999" ? "N/A" : annualIncome}</p>
        <ResponsiveContainer width={chartWidth} height={chartHeight}>
          <LineChart fontSize={"0.8rem"}     margin={{
            top: 0,
            right: 15,
            left: 0,
            bottom: 0
          }} data={incomeData} >
            <Line type="monotone" dataKey="Income" name="Annual Income" stroke="#005E84" />
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <XAxis dataKey="year" interval={intervalRange} label={{ value: 'Year', position: 'insideBottom' , offset: -15 }}/>
            <YAxis dataKey="Income" domain={[0, maxYValueIncome]} label={{ value: 'Annual Income', position: 'insideLeft', angle: -90 }} />
            <Tooltip/>
            <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize : 20}}/>

          </LineChart>
        </ResponsiveContainer>

        <p className="map-info-part">People in Poverty: { year === "1999" ? "N/A" : population}</p>
        {/* Add line graph here  */}
        {/* margin={{ top: 5, right: 20, bottom: 5, left: 15 }} */}

        <ResponsiveContainer width={chartWidth} height={chartHeight}>
          <LineChart fontSize={"0.8rem"}     margin={{
            top: 0,
            right: 15,
            left: 0,
            bottom: 0
          }} data={countData} >
            <Line type="monotone" dataKey="Count" name="People in Poverty" stroke="#005E84" />
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <XAxis dataKey="year" interval={intervalRange} label={{ value: 'Year', position: 'insideBottom', offset: -15 }}/>
            <YAxis dataKey="Count" domain={[0, maxYValueCount]} label={{ value: 'Count', position: 'insideLeft', angle: -90 }} />
            <Tooltip/>
            <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize : 20}}/>

          </LineChart>
        </ResponsiveContainer>


      </>
    );
  }
  
function getCurrentDimension(){
  return {
      width: window.innerWidth,
      height: window.innerHeight
  }
}



export default MapInfo;
  