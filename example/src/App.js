import React, { Component } from 'react'

import WordCloud from 'word-cloud-d3-react'

export default class App extends Component {
  render () {
    return (
      <div>
        <WordCloud
          data={[
            {"key":"50","value":1},{"key":"98","value":1},{"key":"1740","value":1},{"key":"course","value":1},{"key":"that’s","value":2},{"key":"contention","value":1},{"key":"you’re","value":6},{"key":"first","value":1},{"key":"year","value":2},{"key":"grad","value":1},{"key":"student","value":1},{"key":"just","value":2},{"key":"got","value":3},{"key":"finished","value":1},{"key":"readin’","value":1},{"key":"marxian","value":1},{"key":"historian","value":1},{"key":"pete","value":1},{"key":"garrison","value":1},{"key":"probably","value":1},{"key":"gonna","value":7},{"key":"convinced","value":1},{"key":"’til","value":1},{"key":"next","value":2},{"key":"month","value":1},{"key":"get","value":1},{"key":"james","value":1},{"key":"lemon","value":1},{"key":"talkin’","value":2},{"key":"economies","value":1},{"key":"virginia","value":1},{"key":"pennsylvania","value":1},{"key":"entrepreneurial","value":1},{"key":"capitalist","value":1},{"key":"way","value":1},{"key":"back","value":1},{"key":"last","value":1},{"key":"regurgitating","value":1},{"key":"gordon","value":1},{"key":"wood","value":1},{"key":"know","value":1},{"key":"pre","value":1},{"key":"revolutionary","value":1},{"key":"utopia","value":1},{"key":"capital","value":1},{"key":"forming","value":1},{"key":"effects","value":1},{"key":"military","value":1},{"key":"mobilization…","value":1},{"key":"‘wood","value":1},{"key":"drastically","value":1},{"key":"underestimates","value":1},{"key":"impact","value":1},{"key":"social","value":1},{"key":"distinctions","value":1},{"key":"predicated","value":1},{"key":"wealth","value":2},{"key":"especially","value":1},{"key":"inherited","value":1},{"key":"vickers","value":1},{"key":"work","value":1},{"key":"essex","value":1},{"key":"county","value":1},{"key":"page","value":1},{"key":"right","value":1},{"key":"yeah","value":1},{"key":"read","value":2},{"key":"plagiarize","value":1},{"key":"whole","value":1},{"key":"thing","value":3},{"key":"thoughts","value":1},{"key":"matter","value":1},{"key":"come","value":2},{"key":"bar","value":1},{"key":"obscure","value":1},{"key":"passage","value":1},{"key":"pretend","value":1},{"key":"pawn","value":1},{"key":"idea","value":1},{"key":"impress","value":1},{"key":"girls","value":1},{"key":"embarrass","value":1},{"key":"friend","value":1},{"key":"see","value":1},{"key":"sad","value":1},{"key":"guy","value":1},{"key":"like","value":1},{"key":"years","value":1},{"key":"start","value":1},{"key":"doin’","value":1},{"key":"thinkin’","value":1},{"key":"fact","value":1},{"key":"two","value":2},{"key":"certainties","value":1},{"key":"life","value":1},{"key":"one","value":1},{"key":"don’t","value":1},{"key":"dropped","value":1},{"key":"hundred","value":1},{"key":"fifty","value":2},{"key":"grand","value":1},{"key":"fuckin’","value":1},{"key":"education","value":1},{"key":"coulda","value":1},{"key":"dollar","value":1},{"key":"late","value":1},{"key":"charges","value":1},{"key":"public","value":1},{"key":"library","value":1}
          ]}
          width={1000}
          height={500}
          spiral="rectangular"
        />
      </div>
    )
  }
}
