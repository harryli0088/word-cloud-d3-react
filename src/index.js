import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as d3 from 'd3'

import styles from './styles.css'
import cloud from "./cloud"

export default class WordCloud extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,

    spiral: PropTypes.oneOf(['archimedean', 'rectangular']),
    rotate: PropTypes.number,
    fontFamily: PropTypes.string,
    fontStyle: PropTypes.string,
    fontWeight: PropTypes.string,

    colorFunction: PropTypes.func
  }

  static defaultProps = {
    spiral: "archimedean",
    rotate: 0,
    fontFamily: "Arial",
    fontStyle: "italics",
    fontWeight: "normal",
  }

  render() {
    const {
      data,
      width,
      height,

      spiral,
      rotate,
      fontFamily,
      fontStyle,
      fontWeight,

      colorFunction,
    } = this.props

    const fill = colorFunction || d3.scaleOrdinal().domain(data.map(d => d.value)).range(d3.schemeCategory10);

    const fontScale = d3.scaleLinear().domain([0, d3.max(data, d => d.value)]).range([10,100]);

    let processedWords = cloud()
    .dimensions([width, height])
    .words(data)
    .fontSize(function(d) { return fontScale(+d.value); })
    .text(function(d) { return d.key; })
    .rotate(function() { return rotate; })
    .font(fontFamily)
    .spiral(spiral)
    .compute(40);

    console.log("processedWords", processedWords)


    return (
      <svg width={width} height={height} style={{border: "1px solid black"}}>
        <g transform={"translate("+(width/2)+","+(height/2)+")"}>
          {processedWords.map((word,i) =>
            <text
              fontFamily={fontFamily}
              fontStyle={fontStyle}
              fontWeight={fontWeight}
              fontSize={fontScale(word.value)}
              textAnchor="middle"
              transform={"translate(" + [word.x, word.y] + ")rotate(" + word.rotate + ")"}
              fill={fill(i)}
              >
              {word.key}
            </text>
          )}
        </g>
      </svg>
    )
  }
}
