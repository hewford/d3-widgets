import { useEffect, useState } from 'react'
import './App.css'
import * as d3 from "d3";

function App() {
  useEffect(() => {
    let width = 275
    const height = width/2;

    const margin = {top: 0, bottom: 0, left: 50, right: 0};

    let arc = []

    let r = 110
    let rSquared = Math.pow(r,2)
    for (let i = -r; i <= r; i++) {
      arc.push({
        x: i,
        y: Math.sqrt(rSquared - Math.pow(i,2))
      })
    }

    r = 80
    rSquared = Math.pow(r,2)
    for (let i = r; i >= -r; i--) {
      arc.push({
        x: i,
        y: Math.sqrt(Math.pow(r,2) - Math.pow(i,2))
      })
    }
    arc.push({
      x:-110,
      y:0
    })

    let complete = 0.5

    if (complete > 1) {
      complete = 1
    }
    let pX = -100 + (200*complete)
    let pY = Math.sqrt(10000 - Math.pow(pX,2))

    var border = [
      {
        x:-170,
        y:-30
      },
      {
        x:-170,
        y:130
      },
      {
        x:170,
        y:130
      },
      {
        x:170,
        y:-30
      },
      {
        x:-170,
        y:-30
      },
    ]

    var data=[
          {
            x: pX,
            y: pY
          },
          {
            x: (pY/10),
            y: 0 - (pX/10)
          },
          {
            x: (pX/10),
            y: (pY/10)
          },
          {
            x: 0 - (pY/10),
            y: (pX/10)
          },
          {
            x: (pX/10),
            y: (pY/10)
          },
          {
            x: (pY/10),
            y: 0 - (pX/10)
          },
          {
            x: 0 - (pX/10),
            y: 0 - (pY/10)
          },
          {
            x: 0 - (pY/10),
            y: (pX/10)
          },
          {
            x: pX,
            y: pY
          },
          {
            x: (pX/10),
            y: (pY/10)
          },
        ]

    const xScale = d3.scaleLinear()
      .domain([-170, 170])
      .range([0, width])

    const yScale = d3.scaleLinear()
    	.domain([-30, 130])
    	.range([height, 0]);

    var line = d3.line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))

      // .curve(d3.curveCatmullRom.alpha(1));

    var svg = d3.select('#'+"gauge")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append('g')
      .attr('transform', 'translate(35, 0)')
      .attr('x', -1)
    	.attr('y', -1)
      .attr("class", 'gauge-svg')

    var defs = svg.append("defs");

    var gradient = defs.append("linearGradient")
       .attr("id", "svgGradient")
       .attr("x1", "20%")
       .attr("x2", "95%")
       .attr("y1", "80%")
       .attr("y2", "80%");

    gradient.append("stop")
       .attr('class', 'start')
       .attr("offset", "0%")
       .attr("stop-color", "red")
       .attr("stop-opacity", 1);

       gradient.append("stop")
          .attr('class', 'middle')
          .attr("offset", "50%")
          .attr("stop-color", "yellow ")
          .attr("stop-opacity", 1);

    gradient.append("stop")
       .attr('class', 'end')
       .attr("offset", "100%")
       .attr("stop-color", "green")
       .attr("stop-opacity", 1);


      // svg.append("path")
      //   .attr("d", line(arc))
      //   .attr("stroke", "black")
      //   .attr("stroke-width", "1")
      //   .attr("fill", "url(#svgGradient)");

      // svg.append("path")
      //   .attr("d", line(border))
      //   .attr("stroke", "none")
      //   .attr("stroke-width", "1")
      //   .attr("fill", "none");

      svg.append("path")
        .attr("d", line(data))
        .attr("stroke", "black")
        .attr("stroke-width", "1")
        .attr("fill", "gray");

  }, [])
  return (
    <div className="App">
      <div style={{
        margin: 'auto',
        width: "350px",
        height:'120px'
      }} className="needle" id="gauge">
      </div>
    </div>
  )
}

export default App
