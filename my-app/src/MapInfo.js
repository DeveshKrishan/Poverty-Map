import jsonData from "../src/data/county_index.json"

function MapInfo(props) {
    const county = props.countyName;
    const uid = props.countyId;
    const year = props.mapYear;

    let povertyRate = "";
    let annualIncome = "";
    let population = "";
    
    try{
        povertyRate = `${jsonData[uid][year]['rate_estimate']}%`;
        annualIncome = `$${parseInt(jsonData[uid][year]['median_income']).toLocaleString("en-US")}`;
        population = parseInt(jsonData[uid][year]['count_estimate']).toLocaleString("en-US");
    }
    catch(e){
        povertyRate = "";
        annualIncome = "";
        population = "";
    }

    return (
      <>
        <p className="map-info-part">County Name: {county}</p>
        <p className="map-info-part">State Name: </p>
        <p className="map-info-part">Poverty Rate: {povertyRate} </p>
        <p className="map-info-part">Annual Income: {annualIncome}</p>
        <p className="map-info-part">Poor People: {population}</p>
        {/* Add line graph here  */}
      </>
    );
  }
  
  export default MapInfo;
  