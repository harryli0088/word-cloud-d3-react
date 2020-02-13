import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as d3 from 'd3'

import styles from './styles.css'
import cloud from "./cloud"

export default class WordCloud extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,

    spiral: PropTypes.oneOf(['archimedean', 'rectangular']),
    rotate: PropTypes.number,
    fontFamily: PropTypes.string,
    fontStyle: PropTypes.string,
    fontWeight: PropTypes.string,
    onClickHandler: PropTypes.func,
    onMouseOverHandler: PropTypes.func,
    onMouseLeaveHandler: PropTypes.func,

    colorFunction: PropTypes.func
  }

  static defaultProps = {
    spiral: "archimedean",
    rotate: 0,
    fontFamily: "Arial",
    fontStyle: "italics",
    fontWeight: "normal",
    onClickHandler: (e, word, i) => {},
    onMouseOverHandler: (e, word, i) => {},
    onMouseLeaveHandler: (e, word, i) => {},
  }

  constructor(props) {
    super(props)

    this.state = {
      width: 500,
      height: 500
    }

    this.containerRef = React.createRef()
  }

  componentDidMount() {
    this.resize()
    window.addEventListener('resize', this.resize)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }


  resize = () => {
    if(this.containerRef.current) {
      this.setState({
        width: this.containerRef.current.clientWidth,
        height: this.containerRef.current.clientHeight,
      })
    }
  }

  render() {
    const {
      width,
      height
    } = this.state

    const {
      data,

      spiral,
      rotate,
      fontFamily,
      fontStyle,
      fontWeight,
      onClickHandler,
      onMouseOverHandler,
      onMouseLeaveHandler,

      colorFunction,
    } = this.props

    const fill = colorFunction || d3.scaleOrdinal().domain(data.map(d => d.value)).range(d3.schemeCategory10);

    const fontScale = d3.scaleLinear().domain([0, d3.max(data, d => d.value)]).range([10,200]);

    const processedWords = cloud()
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
      <div ref={this.containerRef}>
        <svg width={width} height={height} style={{border: "1px solid black"}}>
          <g transform={"translate("+(width/2)+","+(height/2)+")"}>
            {processedWords.map((word,i) =>
              <text
                key={i}

                fontFamily={fontFamily}
                fontStyle={fontStyle}
                fontWeight={fontWeight}
                fontSize={fontScale(word.value)}
                textAnchor="middle"
                transform={"translate(" + [word.x, word.y] + ")rotate(" + word.rotate + ")"}
                fill={fill(i, word)}

                onClick={e => onClickHandler(e, word, i)}
                onMouseOver={e => onMouseOverHandler(e, word, i)}
                onMouseLeave={e => onMouseLeaveHandler(e, word, i)}
                >
                {word.key}
              </text>
            )}
          </g>
        </svg>
      </div>
    )
  }
}
