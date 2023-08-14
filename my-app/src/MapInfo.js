import jsonData from "../src/data/county_index.json"
import stateData from "./data/state_id.json"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function MapInfo(props) {
    const county = props.countyName;
    const uid = props.countyId;
    const year = props.mapYear;

    let povertyRate = "";
    let annualIncome = "";
    let population = "";
    let stateName = "";
    try{
        povertyRate = `${jsonData[uid][year]['rate_estimate']}%`;
        annualIncome = `$${parseInt(jsonData[uid][year]['median_income']).toLocaleString("en-US")}`;
        population = parseInt(jsonData[uid][year]['count_estimate']).toLocaleString("en-US");
        stateName = stateData[uid.slice(0, 2)]['name']
    }
    catch(e){
        povertyRate = "";
        annualIncome = "";
        population = "";
        stateName = "";
    }

    let povertyData = [];

    try{
      const dataInYears = jsonData[uid];
      
      for (let i in dataInYears){
        // console.log(i, dataInYears[i]);
        const temp = {
          "year" : i,
          "poverty" : dataInYears[i]['rate_estimate']
        };
      povertyData.push(temp);
      }

    }
    catch(e){
      console.error(`Error has occured : ${e}`);
    }

    return (
      <>
        <p className="map-info-part">County Name: {county}</p>
        <p className="map-info-part">State Name: {stateName}</p>
        <p className="map-info-part">Poverty Rate: {povertyRate} </p>
        <p className="map-info-part">Annual Income: {annualIncome}</p>
        <p className="map-info-part">Poor People: {population}</p>
        {/* Add line graph here  */}
        {/* margin={{ top: 5, right: 20, bottom: 5, left: 15 }} */}
        <ResponsiveContainer width={600} height="40%">
          <LineChart width={500} height={400} fontSize={"1rem"}     margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 15
          }} data={povertyData} >
            <Line type="monotone" dataKey="poverty" stroke="#005E84" />
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <Tooltip />
            <XAxis dataKey="year" interval={1} />
            <YAxis dataKey="poverty" />
            <Tooltip />
          </LineChart>
      </ResponsiveContainer>


      </>
    );
  }
  
  export default MapInfo;
  