import React, { Component } from 'react'

import WordCloud from 'word-cloud-d3-react'

const data = [{"key":"Harry","value":1213},{"key":"Ron","value":410},{"key":"all","value":348},{"key":"Hagrid","value":336},{"key":"back","value":258},{"key":"Hermione","value":257},{"key":"what","value":245},{"key":"one","value":230},{"key":"been","value":211},{"key":"not","value":204},{"key":"there","value":202},{"key":"an","value":201},{"key":"off","value":199},{"key":"if","value":198},{"key":"didnt","value":190},{"key":"like","value":189},{"key":"could","value":187},{"key":"so","value":186},{"key":"got","value":185},{"key":"know","value":185},{"key":"get","value":183},{"key":"Professor","value":180},{"key":"down","value":178},{"key":"her","value":175},{"key":"she","value":171},{"key":"its","value":170},{"key":"looked","value":169},{"key":"over","value":168},{"key":"see","value":162},{"key":"very","value":161},{"key":"just","value":161},{"key":"do","value":150},{"key":"who","value":149},{"key":"Snape","value":145},{"key":"by","value":143},{"key":"around","value":141},{"key":"when","value":140},{"key":"Dumbledore","value":140},{"key":"are","value":136},{"key":"no","value":134},{"key":"your","value":134},{"key":"going","value":134},{"key":"now","value":124},{"key":"think","value":121},{"key":"through","value":119},{"key":"something","value":118},{"key":"time","value":118},{"key":"hed","value":117},{"key":"then","value":117},{"key":"go","value":116},{"key":"we","value":115},{"key":"Dudley","value":115},{"key":"Harrys","value":113},{"key":"never","value":111},{"key":"Uncle","value":111},{"key":"And","value":110},{"key":"right","value":110},{"key":"dont","value":110},{"key":"But","value":110},{"key":"here","value":109},{"key":"Malfoy","value":109},{"key":"more","value":107},{"key":"Vernon","value":105},{"key":"door","value":105},{"key":"would","value":104},{"key":"eyes","value":104},{"key":"first","value":104},{"key":"couldnt","value":103},{"key":"Neville","value":102},{"key":"before","value":101},{"key":"only","value":101},{"key":"look","value":101},{"key":"again","value":101},{"key":"too","value":98},{"key":"looking","value":96},{"key":"head","value":96},{"key":"or","value":96},{"key":"What","value":95},{"key":"McGonagall","value":95},{"key":"yeh","value":94},{"key":"thought","value":94},{"key":"Potter","value":93},{"key":"than","value":93},{"key":"way","value":93},{"key":"how","value":91},{"key":"did","value":91},{"key":"even","value":90},{"key":"Quirrell","value":90},{"key":"told","value":90},{"key":"room","value":89},{"key":"next","value":88},{"key":"face","value":88},{"key":"other","value":88},{"key":"still","value":88},{"key":"though","value":86},{"key":"will","value":85},{"key":"my","value":85},{"key":"because","value":84},{"key":"which","value":84},{"key":"last","value":82},{"key":"people","value":82},{"key":"left","value":82},{"key":"boy","value":82},{"key":"where","value":82},{"key":"us","value":81},{"key":"Gryffindor","value":81},{"key":"Mr","value":80},{"key":"ter","value":78},{"key":"two","value":77},{"key":"turned","value":77},{"key":"Hogwarts","value":76},{"key":"wasnt","value":75},{"key":"Ive","value":75},{"key":"heard","value":75},{"key":"came","value":75},{"key":"behind","value":74},{"key":"much","value":74},{"key":"house","value":74},{"key":"well","value":72},{"key":"seemed","value":72},{"key":"say","value":72},{"key":"come","value":72},{"key":"some","value":72},{"key":"can","value":72},{"key":"toward","value":71},{"key":"went","value":71},{"key":"long","value":71},{"key":"away","value":70},{"key":"really","value":70},{"key":"anything","value":70},{"key":"want","value":69},{"key":"found","value":68},{"key":"little","value":67},{"key":"once","value":67},{"key":"hand","value":67},{"key":"There","value":67},{"key":"Well","value":66},{"key":"suddenly","value":66},{"key":"made","value":66},{"key":"tell","value":65},{"key":"himself","value":65},{"key":"bit","value":65},{"key":"Its","value":64},{"key":"good","value":63},{"key":"trying","value":63},{"key":"school","value":62},{"key":"knew","value":62},{"key":"saw","value":62},{"key":"wand","value":62},{"key":"tried","value":62},{"key":"took","value":62},{"key":"any","value":61},{"key":"Oh","value":61},{"key":"No","value":61},{"key":"take","value":60},{"key":"asked","value":59},{"key":"day","value":59},{"key":"voice","value":59},{"key":"Quidditch","value":59},{"key":"She","value":58},{"key":"put","value":58},{"key":"cloak","value":57},{"key":"Petunia","value":57},{"key":"ever","value":56},{"key":"old","value":56},{"key":"let","value":56},{"key":"open","value":56},{"key":"few","value":55},{"key":"inside","value":54},{"key":"must","value":54},{"key":"find","value":53},{"key":"Stone","value":53},{"key":"seen","value":53},{"key":"cant","value":53},{"key":"hadnt","value":53},{"key":"might","value":52},{"key":"Dursley","value":52},{"key":"Dursleys","value":52},{"key":"feet","value":52},{"key":"things","value":52},{"key":"Aunt","value":52},{"key":"while","value":52},{"key":"front","value":51},{"key":"years","value":51},{"key":"So","value":51},{"key":"three","value":51},{"key":"large","value":51},{"key":"pulled","value":51},{"key":"keep","value":50},{"key":"gone","value":49},{"key":"after","value":49},{"key":"started","value":49},{"key":"Wood","value":49},{"key":"another","value":49},{"key":"felt","value":49},{"key":"thats","value":49},{"key":"All","value":48},{"key":"floor","value":48},{"key":"Slytherin","value":48},{"key":"Then","value":48},{"key":"hes","value":48},{"key":"thing","value":48},{"key":"make","value":48},{"key":"wouldnt","value":47},{"key":"lot","value":47},{"key":"enough","value":47},{"key":"Weasley","value":47},{"key":"yer","value":47},{"key":"air","value":47},{"key":"black","value":47},{"key":"moment","value":47},{"key":"Filch","value":47},{"key":"almost","value":47},{"key":"end","value":47},{"key":"walked","value":46},{"key":"fell","value":46},{"key":"mind","value":46},{"key":"Mrs","value":46},{"key":"sat","value":45},{"key":"great","value":45},{"key":"letter","value":45},{"key":"night","value":45},{"key":"called","value":44},{"key":"quickly","value":44},{"key":"until","value":44},{"key":"points","value":44},{"key":"Ill","value":44},{"key":"done","value":44},{"key":"course","value":44},{"key":"dark","value":44},{"key":"wanted","value":44},{"key":"How","value":44},{"key":"saying","value":44},{"key":"This","value":43},{"key":"Yes","value":43},{"key":"nothing","value":43},{"key":"already","value":43},{"key":"bed","value":43},{"key":"later","value":43},{"key":"past","value":43},{"key":"sure","value":42},{"key":"name","value":42},{"key":"As","value":42},{"key":"books","value":42},{"key":"read","value":42},{"key":"youre","value":41},{"key":"Now","value":41},{"key":"second","value":41},{"key":"His","value":41},{"key":"why","value":41},{"key":"without","value":41},{"key":"owl","value":41},{"key":"stop","value":39},{"key":"mirror","value":39},{"key":"table","value":38},{"key":"across","value":38},{"key":"under","value":38},{"key":"onto","value":38},{"key":"caught","value":38},{"key":"being","value":38},{"key":"always","value":38},{"key":"should","value":38},{"key":"try","value":38},{"key":"remember","value":38},{"key":"gave","value":37},{"key":"better","value":37},{"key":"wizard","value":37},{"key":"our","value":37},{"key":"When","value":37},{"key":"We","value":37},{"key":"stood","value":37},{"key":"reached","value":37},{"key":"every","value":37},{"key":"Madam","value":36},{"key":"same","value":36},{"key":"hair","value":36},{"key":"full","value":36},{"key":"kept","value":36},{"key":"fire","value":36},{"key":"wall","value":36},{"key":"everyone","value":36},{"key":"new","value":36},{"key":"else","value":36},{"key":"Percy","value":36},{"key":"stared","value":35},{"key":"hat","value":35},{"key":"outside","value":35},{"key":"whispered","value":35},{"key":"top","value":34},{"key":"hall","value":34},{"key":"high","value":34},{"key":"theyd","value":34},{"key":"life","value":34},{"key":"Hagrids","value":34},{"key":"quite","value":34},{"key":"Dont","value":34},{"key":"hands","value":34},{"key":"broom","value":34},{"key":"magic","value":34},{"key":"place","value":34},{"key":"mean","value":34},{"key":"Fred","value":34},{"key":"ground","value":34},{"key":"doing","value":33},{"key":"ask","value":33},{"key":"forest","value":33},{"key":"coming","value":33},{"key":"these","value":33},{"key":"whole","value":33},{"key":"yet","value":33},{"key":"each","value":33},{"key":"forward","value":33},{"key":"Thats","value":32},{"key":"hear","value":32},{"key":"small","value":32},{"key":"train","value":32},{"key":"along","value":32},{"key":"anyone","value":32},{"key":"own","value":32},{"key":"Peeves","value":32},{"key":"window","value":32},{"key":"man","value":32},{"key":"happened","value":31},{"key":"side","value":31},{"key":"Id","value":31},{"key":"minutes","value":31},{"key":"silver","value":31},{"key":"morning","value":31},{"key":"standing","value":31},{"key":"In","value":31},{"key":"has","value":31},{"key":"nose","value":31},{"key":"against","value":30},{"key":"troll","value":30},{"key":"getting","value":30},{"key":"white","value":30},{"key":"Voldemort","value":30},{"key":"year","value":30},{"key":"George","value":29},{"key":"lost","value":29},{"key":"hard","value":29},{"key":"shouted","value":29},{"key":"four","value":29},{"key":"suppose","value":29},{"key":"stopped","value":29},{"key":"half","value":29},{"key":"best","value":29},{"key":"noticed","value":29},{"key":"corridor","value":29},{"key":"both","value":29},{"key":"hundred","value":29},{"key":"talking","value":28},{"key":"team","value":28},{"key":"big","value":28},{"key":"nearly","value":28},{"key":"work","value":28},{"key":"taken","value":28},{"key":"fer","value":28},{"key":"o","value":28},{"key":"gold","value":28},{"key":"everything","value":28},{"key":"mother","value":27},{"key":"trouble","value":27},{"key":"bad","value":27},{"key":"father","value":27},{"key":"most","value":27},{"key":"need","value":27},{"key":"green","value":27},{"key":"Great","value":27},{"key":"Gringotts","value":27},{"key":"Hes","value":27},{"key":"broomstick","value":27},{"key":"Snapes","value":27},{"key":"theyre","value":27},{"key":"family","value":27},{"key":"help","value":27},{"key":"Not","value":26},{"key":"dragon","value":26},{"key":"werent","value":26},{"key":"many","value":26},{"key":"able","value":26},{"key":"yes","value":26},{"key":"sort","value":26},{"key":"holding","value":25},{"key":"corner","value":25},{"key":"sitting","value":25},{"key":"give","value":25},{"key":"Fluffy","value":25},{"key":"five","value":25},{"key":"robes","value":25},{"key":"sight","value":25},{"key":"light","value":25},{"key":"rest","value":25},{"key":"Why","value":25},{"key":"snapped","value":25},{"key":"Christmas","value":25},{"key":"straight","value":25},{"key":"feeling","value":24},{"key":"set","value":24},{"key":"youll","value":24},{"key":"cold","value":24},{"key":"Flamel","value":24},{"key":"ten","value":24},{"key":"heart","value":24},{"key":"passed","value":24},{"key":"move","value":24},{"key":"words","value":24},{"key":"giant","value":24},{"key":"match","value":24},{"key":"Look","value":24},{"key":"week","value":24},{"key":"round","value":23},{"key":"castle","value":23},{"key":"Granger","value":23},{"key":"parents","value":23},{"key":"Norbert","value":23},{"key":"red","value":23},{"key":"began","value":23},{"key":"staring","value":23},{"key":"somewhere","value":23},{"key":"Dudleys","value":23},{"key":"funny","value":23},{"key":"either","value":23},{"key":"world","value":23},{"key":"library","value":23},{"key":"One","value":23},{"key":"sorry","value":23},{"key":"wont","value":23},{"key":"empty","value":23},{"key":"does","value":23},{"key":"note","value":23},{"key":"arms","value":23},{"key":"cat","value":23},{"key":"catch","value":23},{"key":"dead","value":23},{"key":"except","value":23},{"key":"twins","value":23},{"key":"Come","value":22},{"key":"moved","value":22},{"key":"noise","value":22},{"key":"between","value":22},{"key":"common","value":22},{"key":"Muggle","value":22},{"key":"stone","value":22},{"key":"students","value":22},{"key":"answer","value":22},{"key":"theres","value":22},{"key":"those","value":22},{"key":"Goyle","value":22},{"key":"dog","value":22},{"key":"far","value":22},{"key":"Quirrells","value":22},{"key":"class","value":22},{"key":"youve","value":22},{"key":"reason","value":22}]

export default class App extends Component {
  render () {
    return (
      <div>
        <WordCloud
          data={data.slice(0,10)}
          spiral="rectangular"
        />

        <WordCloud
          data={data.slice(0,50)}
          spiral="rectangular"
        />

        <WordCloud
          data={data.slice(0,100)}
          spiral="rectangular"
        />

        <WordCloud
          data={data.slice(0,200)}
          spiral="rectangular"
        />

        <WordCloud
          data={data.slice(0,400)}
          spiral="rectangular"
        />
      </div>
    )
  }
}
