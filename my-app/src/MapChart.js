import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { csv } from "d3-fetch";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";

const topicConversion = new Map();
topicConversion.set("povRate", "Rate Estimate");
topicConversion.set("annIncome", "Median Household Income");
topicConversion.set("Population", "Count Estimate");

const MapChart = (props) => {
  const [data, setData] = useState([]);
  const year = parseInt(props.year);
  const topic = props.topic;

  useEffect(() => {
    // Load data from CSV
    csv("/data.csv").then(csvData => {
      const filteredData = csvData
        .filter(item => parseInt(item.Year) === year)
        .map(item => {
          return {
            Id: item.Id,
            County: item.County,
            Year: parseInt(item.Year),
            Topic: parseFloat(item[topicConversion.get(topic)])
          };
        });
      setData(filteredData);
    });
  }, [year, topic]);

  const colorScale = scaleQuantile()
    .domain(data.map(d => d.Topic))
    .range([
      "#CFECF8", 
      "#B3E9FF",
      "#82DBFF",
      "#69D4FF",
      "#2EADE0",
      "#1896C8",
      "#0784B6",
      "#0775A1",
      "#005E84"
    ]);

    // "#CFECF8", DEFAULT Blue colors
    // "#B3E9FF",
    // "#82DBFF",
    // "#69D4FF",
    // "#2EADE0",
    // "#1896C8",
    // "#0784B6",
    // "#0775A1",
    // "#005E84"


  const handleCountyClick = (geo) => {
    const selectedCountyName = geo.properties.name;
    const selectedCountyId = geo.id; // Assuming geo.id holds the county ID
    props.onCountySelect(selectedCountyName, selectedCountyId); // Pass the selected county name and ID to the parent component
  };


  return (
    <>
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              const cur = data.find(s => s.Id === geo.id);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={cur ? colorScale(cur.Topic) : "#b1b1b1"}
                  onClick={() => handleCountyClick(geo)} // Handle county click
                  style={{
                    default: {
                      cursor: "pointer", 
                    },
                    hover: {
                      cursor: "pointer", 
                    },
                    pressed: {
                      cursor: "pointer", 
                    },
                  }}
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