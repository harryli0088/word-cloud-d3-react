# word-cloud-d3-react

> responsive word cloud using d3 and react

![Demo](/example/word-cloud-d3-react.gif)

## Install

```bash
npm install --save harryli0088/word-cloud-d3-react
```

## Usage

```jsx
import React, { Component } from 'react'

import WordCloud from 'word-cloud-d3-react'

export default class App extends Component {
  render () {
    return (
      <div>
        <WordCloud
          data={[{"key":"Harry","value":1213},{"key":"Ron","value":410},{"key":"all","value":348},{"key":"Hagrid","value":336}]}
          height={500}

          spiral="rectangular"
          rotate={0}
          fontFamily="Arial"
          fontStyle="italic"
          fontWeight="normal"

          colorFunciton={(index, word) => {}}
        />
      </div>
    )
  }
}
```


### Data
Each data point has to be in this format:
```js
const data = [
  {key: string, value: number},
  ...
]
```

### Props
- `data` {Array} Required
- `height` {Number} Required

Optional props
- `spiral` {'archimedean' or 'rectangular'} defaults to 'archimedean'
- `rotate` {Number} defaults to `0`
- `fontFamily` {String} defaults to `Impact`
- `fontStyle` {String} defaults to `normal`
- `fontWeight` {String} defaults to `normal`
- `onClick` {Function} accepts three arguments ```event```, ```word``` and ```index```,
- `onMouseOver` {Function} accepts three arguments ```event```, ```word``` and ```index```,
- `onMouseLeave` {Function} accepts three arguments ```event```, ```word``` and ```index```,
- `colorFunction` {Function} accepts two arguments ```index``` and ```word```, defaults to ```d3.schemeCategory10```


## Acknowledgements

- Built off this example from Jonathan Yu: https://bl.ocks.org/jyucsiro/767539a876836e920e38bc80d2031ba7
- Modified cloud code from Jason Davies: http://www.jasondavies.com/word-cloud/
- Using algorithm from Jonathan Feinberg: http://static.mrfeinberg.com/bv_ch03.pdf

## License

MIT © [harryli0088](https://github.com/harryli0088)
