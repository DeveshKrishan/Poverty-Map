import jsonData from "../src/data/county_index.json"
import stateData from "./data/state_id.json"

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

    return (
      <>
        <p className="map-info-part">County Name: {county}</p>
        <p className="map-info-part">State Name: {stateName}</p>
        <p className="map-info-part">Poverty Rate: {povertyRate} </p>
        <p className="map-info-part">Annual Income: {annualIncome}</p>
        <p className="map-info-part">Poor People: {population}</p>
        {/* Add line graph here  */}
      </>
    );
  }
  
  export default MapInfo;
  