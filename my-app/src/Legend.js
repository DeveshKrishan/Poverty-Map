import React from 'react'

    const colorData =[
        "#CFECF8", 
        "#B3E9FF",
        "#82DBFF",
        "#69D4FF",
        "#2EADE0",
        "#1896C8",
        "#0784B6",
        "#0775A1",
        "#005E84"
    ];
function Legend() {
  return (
    <div className="legend">
        {colorData.map((color,index) => (
        <div key={index} className="legend-color" style={{ backgroundColor: color }}></div>
        ))}
    </div>
  )
}

export default Legend;