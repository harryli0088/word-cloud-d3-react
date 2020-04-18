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

    colorFunction: PropTypes.func,
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
      height: 600,
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
      height,
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

    const fill = colorFunction || d3.scaleOrdinal().domain(data.map(d => d.value)).range(d3.schemeCategory10)

    //TBH I guess and checked my way to get these values...
    const count = data.reduce((sum, word) => sum + Math.pow(word.value, 0.8), 0) //count the values
    const maxFontSize = width * height / Math.pow(count,0.1) / 2000 //get the max font size based on the dimensions and the count
    const fontScale = d3.scaleLinear().domain([0, d3.max(data, d => d.value)]).range([4,maxFontSize]) //map the data value to the font size

    const {
      words,
      whiteSpace,
    } = cloud()
    .dimensions([width, height])
    .words(JSON.parse(JSON.stringify(data))) //stringify the data so we recompute each time
    .fontSize(d => fontScale(+d.value))
    .text(d => d.key)
    .rotate(rotate)
    .font(fontFamily)
    .spiral(spiral)
    .compute()

    const xOffset = whiteSpace.right - whiteSpace.left //get the offset we need to center the word cloud horizontally
    const yOffset = whiteSpace.bottom - whiteSpace.top //get the offset we need to center the word cloud vertically
    const xScale = 1 + (whiteSpace.left + whiteSpace.right) / whiteSpace.horizontalFilledSpace //get the scale we would need to horizontally fill up the white space
    const yScale = 1 + (whiteSpace.top + whiteSpace.bottom) / whiteSpace.verticalFilled //get the scale we would need to vertically fill up the white space
    const scale = Math.min(xScale, yScale) //get the minimum of these scales so we don't exceed the boundaries on the axis that has a smaller scaling


    return (
      <div ref={this.containerRef}>
        <svg width={width} height={height}>
          <g transform={"translate("+(width + scale*xOffset)/2+","+(height + scale*yOffset)/2+")"}>
            <g transform={"scale("+scale+","+scale+")"}>
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
          </g>

          {/* these lines show on the x and y ais the space filled (pink) and the white space not used (gray) */}
          {/* <line x1={width/2} x2={width/2} y1={height-whiteSpace.bottom} y2={height} strokeWidth="5" stroke="gray"></line>
          <line x1={width/2} x2={width/2} y1={whiteSpace.top} y2={whiteSpace.top+whiteSpace.verticalFilled} strokeWidth="5" stroke="pink"></line>
          <line x1={width/2} x2={width/2} y1={0} y2={whiteSpace.top} strokeWidth="5" stroke="gray"></line>

          <line x1={0} x2={whiteSpace.left} y1={height/2} y2={height/2} strokeWidth="5" stroke="gray"></line>
          <line x1={whiteSpace.left} x2={whiteSpace.left+whiteSpace.horizontalFilledSpace} y1={height/2} y2={height/2} strokeWidth="5" stroke="pink"></line>
          <line x1={width-whiteSpace.right} x2={width} y1={height/2} y2={height/2} strokeWidth="5" stroke="gray"></line> */}
        </svg>
      </div>
    )
  }
}
