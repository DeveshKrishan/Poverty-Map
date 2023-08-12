import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { csv } from "d3-fetch";
import * as d3 from "d3";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";

const MapChart = (props) => {
  const [data, setData] = useState([]);
  const year = props.year;
  const topic = props.topic;

const arr = []

const topicConversion =  new Map();
topicConversion.set("Povery Rate", "Rate Estimate");
topicConversion.set("Annual Income", "Median Household Income");
topicConversion.set("Population", "Count Estimate");

console.log(year, topic)
  // d3.csv("/data.csv", function(data){
  //   if (data.Year == year)
  //         arr.push({
  //           "County" : data.County, 
  //           "Year" : data.Year,
  //           "Topic" : eval(`data.${topicConversion.get(topic)}`)
  //         })
  // });

  // console.log(arr)

  useEffect(() => {
    // https://www.bls.gov/lau/
    csv("/unemployment-by-county-2017.csv").then(counties => {
      setData(counties);
    });
  }, []);

  const colorScale = scaleQuantile()
    .domain(data.map(d => d.unemployment_rate))
    .range([
      "#ffedea",
      "#ffcec5",
      "#ffad9f",
      "#ff8a75",
      "#ff5533",
      "#e2492d",
      "#be3d26",
      "#9a311f",
      "#782618"
    ]);

  return (
    <>
        <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
            {({ geographies }) =>
            geographies.map(geo => {
                const cur = data.find(s => s.id === geo.id);
                return (
                <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={cur ? colorScale(cur.unemployment_rate) : "#EEE"}
                />
                );
            })
            }
        </Geographies>
        </ComposableMap>
    </>
  );
};

export default MapChart;
