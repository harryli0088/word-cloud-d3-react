import React from 'react'
import PropTypes from 'prop-types'

import * as d3 from 'd3'

import styles from './styles.css'
import cloud from "./cloud"

export default class WordCloud extends React.Component {
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
      height: 600
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

    const count = data.reduce((sum, word) => sum + Math.pow(word.key.length, 0.8), 0);
    const scale = width * height / Math.pow(count,0.1) / 3000;

    const fontScale = d3.scaleLinear().domain([0, d3.max(data, d => d.value)]).range([8,2*scale]);
    console.log("------------------------")
    const {
      words,
      whiteSpace,
    } = cloud()
    .dimensions([width, height])
    .words(JSON.parse(JSON.stringify(data)))
    .fontSize(function(d) { return fontScale(+d.value); })
    .text(function(d) { return d.key; })
    .rotate(rotate)
    .font(fontFamily)
    .spiral(spiral)
    .compute();

    console.log("whiteSpace", whiteSpace)
    //
    // console.log("count",count,"scale",scale,"words", words.length, words.reduce((sum, word) => sum + (word.hasText?1:0), 0))
    // if(words.length < 11) console.log(words.map(d => ({x: d.x, y:d.y})))
    //
    const yScale = 1 // + (whiteSpace.top + whiteSpace.bottom) / whiteSpace.verticalFilled

    return (
      <div ref={this.containerRef}>
        <svg width={width} height={height} style={{border: "1px solid black"}}>
          <g transform={"scale("+yScale+","+yScale+") translate("+(width/2)+","+(height/2)+")"}>
            {words.map((word,i) =>
              <text
                key={i}

                fontFamily={fontFamily}
                fontStyle={fontStyle}
                fontWeight={fontWeight}
                fontSize={fontScale(word.value)}
                textAnchor="middle"
                transform={"translate(" + [word.x, word.y] + ") rotate(" + word.rotate + ")"}
                fill={fill(i, word)}

                onClick={e => onClickHandler(e, word, i)}
                onMouseOver={e => onMouseOverHandler(e, word, i)}
                onMouseLeave={e => onMouseLeaveHandler(e, word, i)}
                >
                {word.key}
              </text>
            )}
          </g>

          <line x1={width/2} x2={width/2} y1={height-whiteSpace.bottom} y2={height} strokeWidth="5" stroke="gray"></line>
          <line x1={width/2} x2={width/2} y1={whiteSpace.top} y2={whiteSpace.top+whiteSpace.verticalFilled} strokeWidth="5" stroke="pink"></line>
          <line x1={width/2} x2={width/2} y1={0} y2={whiteSpace.top} strokeWidth="5" stroke="gray"></line>
        </svg>
      </div>
    )
  }
}
