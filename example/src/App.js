import React, { Component } from 'react'

import WordCloud from 'word-cloud-d3-react'

const data = [{"key":"Harry","value":1213},{"key":"Ron","value":410},{"key":"all","value":348},{"key":"Hagrid","value":336},{"key":"back","value":258},{"key":"Hermione","value":257},{"key":"what","value":245},{"key":"one","value":230},{"key":"been","value":211},{"key":"not","value":204},{"key":"there","value":202},{"key":"an","value":201},{"key":"off","value":199},{"key":"if","value":198},{"key":"didnt","value":190},{"key":"like","value":189},{"key":"could","value":187},{"key":"so","value":186},{"key":"got","value":185},{"key":"know","value":185},{"key":"get","value":183},{"key":"Professor","value":180},{"key":"down","value":178},{"key":"her","value":175},{"key":"she","value":171},{"key":"its","value":170},{"key":"looked","value":169},{"key":"over","value":168},{"key":"see","value":162},{"key":"very","value":161},{"key":"just","value":161},{"key":"do","value":150},{"key":"who","value":149},{"key":"Snape","value":145},{"key":"by","value":143},{"key":"around","value":141},{"key":"when","value":140},{"key":"Dumbledore","value":140},{"key":"are","value":136},{"key":"no","value":134},{"key":"your","value":134},{"key":"going","value":134},{"key":"now","value":124},{"key":"think","value":121},{"key":"through","value":119},{"key":"something","value":118},{"key":"time","value":118},{"key":"hed","value":117},{"key":"then","value":117},{"key":"go","value":116},{"key":"we","value":115},{"key":"Dudley","value":115},{"key":"Harrys","value":113},{"key":"never","value":111},{"key":"Uncle","value":111},{"key":"And","value":110},{"key":"right","value":110},{"key":"dont","value":110},{"key":"But","value":110},{"key":"here","value":109},{"key":"Malfoy","value":109},{"key":"more","value":107},{"key":"Vernon","value":105},{"key":"door","value":105},{"key":"would","value":104},{"key":"eyes","value":104},{"key":"first","value":104},{"key":"couldnt","value":103},{"key":"Neville","value":102},{"key":"before","value":101},{"key":"only","value":101},{"key":"look","value":101},{"key":"again","value":101},{"key":"too","value":98},{"key":"looking","value":96},{"key":"head","value":96},{"key":"or","value":96},{"key":"What","value":95},{"key":"McGonagall","value":95},{"key":"yeh","value":94},{"key":"thought","value":94},{"key":"Potter","value":93},{"key":"than","value":93},{"key":"way","value":93},{"key":"how","value":91},{"key":"did","value":91},{"key":"even","value":90},{"key":"Quirrell","value":90},{"key":"told","value":90},{"key":"room","value":89},{"key":"next","value":88},{"key":"face","value":88},{"key":"other","value":88},{"key":"still","value":88},{"key":"though","value":86},{"key":"will","value":85},{"key":"my","value":85},{"key":"because","value":84},{"key":"which","value":84},{"key":"last","value":82},{"key":"people","value":82},{"key":"left","value":82},{"key":"boy","value":82},{"key":"where","value":82},{"key":"us","value":81},{"key":"Gryffindor","value":81},{"key":"Mr","value":80},{"key":"ter","value":78},{"key":"two","value":77},{"key":"turned","value":77},{"key":"Hogwarts","value":76},{"key":"wasnt","value":75},{"key":"Ive","value":75},{"key":"heard","value":75},{"key":"came","value":75},{"key":"behind","value":74},{"key":"much","value":74},{"key":"house","value":74},{"key":"well","value":72},{"key":"seemed","value":72},{"key":"say","value":72},{"key":"come","value":72},{"key":"some","value":72},{"key":"can","value":72},{"key":"toward","value":71},{"key":"went","value":71},{"key":"long","value":71},{"key":"away","value":70},{"key":"really","value":70},{"key":"anything","value":70},{"key":"want","value":69},{"key":"found","value":68},{"key":"little","value":67},{"key":"once","value":67},{"key":"hand","value":67},{"key":"There","value":67},{"key":"Well","value":66},{"key":"suddenly","value":66},{"key":"made","value":66},{"key":"tell","value":65},{"key":"himself","value":65},{"key":"bit","value":65},{"key":"Its","value":64},{"key":"good","value":63},{"key":"trying","value":63},{"key":"school","value":62},{"key":"knew","value":62},{"key":"saw","value":62},{"key":"wand","value":62},{"key":"tried","value":62},{"key":"took","value":62},{"key":"any","value":61},{"key":"Oh","value":61},{"key":"No","value":61},{"key":"take","value":60},{"key":"asked","value":59},{"key":"day","value":59},{"key":"voice","value":59},{"key":"Quidditch","value":59},{"key":"She","value":58},{"key":"put","value":58},{"key":"cloak","value":57},{"key":"Petunia","value":57},{"key":"ever","value":56},{"key":"old","value":56},{"key":"let","value":56},{"key":"open","value":56},{"key":"few","value":55},{"key":"inside","value":54},{"key":"must","value":54},{"key":"find","value":53},{"key":"Stone","value":53},{"key":"seen","value":53},{"key":"cant","value":53},{"key":"hadnt","value":53},{"key":"might","value":52},{"key":"Dursley","value":52},{"key":"Dursleys","value":52},{"key":"feet","value":52},{"key":"things","value":52},{"key":"Aunt","value":52},{"key":"while","value":52},{"key":"front","value":51},{"key":"years","value":51},{"key":"So","value":51},{"key":"three","value":51},{"key":"large","value":51},{"key":"pulled","value":51},{"key":"keep","value":50},{"key":"gone","value":49},{"key":"after","value":49},{"key":"started","value":49},{"key":"Wood","value":49},{"key":"another","value":49},{"key":"felt","value":49},{"key":"thats","value":49},{"key":"All","value":48},{"key":"floor","value":48},{"key":"Slytherin","value":48},{"key":"Then","value":48},{"key":"hes","value":48},{"key":"thing","value":48},{"key":"make","value":48},{"key":"wouldnt","value":47},{"key":"lot","value":47},{"key":"enough","value":47},{"key":"Weasley","value":47},{"key":"yer","value":47},{"key":"air","value":47},{"key":"black","value":47},{"key":"moment","value":47},{"key":"Filch","value":47},{"key":"almost","value":47},{"key":"end","value":47},{"key":"walked","value":46},{"key":"fell","value":46},{"key":"mind","value":46},{"key":"Mrs","value":46},{"key":"sat","value":45},{"key":"great","value":45},{"key":"letter","value":45},{"key":"night","value":45},{"key":"called","value":44},{"key":"quickly","value":44},{"key":"until","value":44},{"key":"points","value":44},{"key":"Ill","value":44},{"key":"done","value":44},{"key":"course","value":44},{"key":"dark","value":44},{"key":"wanted","value":44},{"key":"How","value":44},{"key":"saying","value":44},{"key":"This","value":43},{"key":"Yes","value":43},{"key":"nothing","value":43},{"key":"already","value":43},{"key":"bed","value":43},{"key":"later","value":43},{"key":"past","value":43},{"key":"sure","value":42},{"key":"name","value":42},{"key":"As","value":42},{"key":"books","value":42},{"key":"read","value":42},{"key":"youre","value":41},{"key":"Now","value":41},{"key":"second","value":41},{"key":"His","value":41},{"key":"why","value":41},{"key":"without","value":41},{"key":"owl","value":41},{"key":"stop","value":39},{"key":"mirror","value":39},{"key":"table","value":38},{"key":"across","value":38},{"key":"under","value":38},{"key":"onto","value":38},{"key":"caught","value":38},{"key":"being","value":38},{"key":"always","value":38},{"key":"should","value":38},{"key":"try","value":38},{"key":"remember","value":38},{"key":"gave","value":37},{"key":"better","value":37},{"key":"wizard","value":37},{"key":"our","value":37},{"key":"When","value":37},{"key":"We","value":37},{"key":"stood","value":37},{"key":"reached","value":37},{"key":"every","value":37},{"key":"Madam","value":36},{"key":"same","value":36},{"key":"hair","value":36},{"key":"full","value":36},{"key":"kept","value":36},{"key":"fire","value":36},{"key":"wall","value":36},{"key":"everyone","value":36},{"key":"new","value":36},{"key":"else","value":36},{"key":"Percy","value":36},{"key":"stared","value":35},{"key":"hat","value":35},{"key":"outside","value":35},{"key":"whispered","value":35},{"key":"top","value":34},{"key":"hall","value":34},{"key":"high","value":34},{"key":"theyd","value":34},{"key":"life","value":34},{"key":"Hagrids","value":34},{"key":"quite","value":34},{"key":"Dont","value":34},{"key":"hands","value":34},{"key":"broom","value":34},{"key":"magic","value":34},{"key":"place","value":34},{"key":"mean","value":34},{"key":"Fred","value":34},{"key":"ground","value":34},{"key":"doing","value":33},{"key":"ask","value":33},{"key":"forest","value":33},{"key":"coming","value":33},{"key":"these","value":33},{"key":"whole","value":33},{"key":"yet","value":33},{"key":"each","value":33},{"key":"forward","value":33},{"key":"Thats","value":32},{"key":"hear","value":32},{"key":"small","value":32},{"key":"train","value":32},{"key":"along","value":32},{"key":"anyone","value":32},{"key":"own","value":32},{"key":"Peeves","value":32},{"key":"window","value":32},{"key":"man","value":32},{"key":"happened","value":31},{"key":"side","value":31},{"key":"Id","value":31},{"key":"minutes","value":31},{"key":"silver","value":31},{"key":"morning","value":31},{"key":"standing","value":31},{"key":"In","value":31},{"key":"has","value":31},{"key":"nose","value":31},{"key":"against","value":30},{"key":"troll","value":30},{"key":"getting","value":30},{"key":"white","value":30},{"key":"Voldemort","value":30},{"key":"year","value":30},{"key":"George","value":29},{"key":"lost","value":29},{"key":"hard","value":29},{"key":"shouted","value":29},{"key":"four","value":29},{"key":"suppose","value":29},{"key":"stopped","value":29},{"key":"half","value":29},{"key":"best","value":29},{"key":"noticed","value":29},{"key":"corridor","value":29},{"key":"both","value":29},{"key":"hundred","value":29},{"key":"talking","value":28},{"key":"team","value":28},{"key":"big","value":28},{"key":"nearly","value":28},{"key":"work","value":28},{"key":"taken","value":28},{"key":"fer","value":28},{"key":"o","value":28},{"key":"gold","value":28},{"key":"everything","value":28},{"key":"mother","value":27},{"key":"trouble","value":27},{"key":"bad","value":27},{"key":"father","value":27},{"key":"most","value":27},{"key":"need","value":27},{"key":"green","value":27},{"key":"Great","value":27},{"key":"Gringotts","value":27},{"key":"Hes","value":27},{"key":"broomstick","value":27},{"key":"Snapes","value":27},{"key":"theyre","value":27},{"key":"family","value":27},{"key":"help","value":27},{"key":"Not","value":26},{"key":"dragon","value":26},{"key":"werent","value":26},{"key":"many","value":26},{"key":"able","value":26},{"key":"yes","value":26},{"key":"sort","value":26},{"key":"holding","value":25},{"key":"corner","value":25},{"key":"sitting","value":25},{"key":"give","value":25},{"key":"Fluffy","value":25},{"key":"five","value":25},{"key":"robes","value":25},{"key":"sight","value":25},{"key":"light","value":25},{"key":"rest","value":25},{"key":"Why","value":25},{"key":"snapped","value":25},{"key":"Christmas","value":25},{"key":"straight","value":25},{"key":"feeling","value":24},{"key":"set","value":24},{"key":"youll","value":24},{"key":"cold","value":24},{"key":"Flamel","value":24},{"key":"ten","value":24},{"key":"heart","value":24},{"key":"passed","value":24},{"key":"move","value":24},{"key":"words","value":24},{"key":"giant","value":24},{"key":"match","value":24},{"key":"Look","value":24},{"key":"week","value":24},{"key":"round","value":23},{"key":"castle","value":23},{"key":"Granger","value":23},{"key":"parents","value":23},{"key":"Norbert","value":23},{"key":"red","value":23},{"key":"began","value":23},{"key":"staring","value":23},{"key":"somewhere","value":23},{"key":"Dudleys","value":23},{"key":"funny","value":23},{"key":"either","value":23},{"key":"world","value":23},{"key":"library","value":23},{"key":"One","value":23},{"key":"sorry","value":23},{"key":"wont","value":23},{"key":"empty","value":23},{"key":"does","value":23},{"key":"note","value":23},{"key":"arms","value":23},{"key":"cat","value":23},{"key":"catch","value":23},{"key":"dead","value":23},{"key":"except","value":23},{"key":"twins","value":23},{"key":"Come","value":22},{"key":"moved","value":22},{"key":"noise","value":22},{"key":"between","value":22},{"key":"common","value":22},{"key":"Muggle","value":22},{"key":"stone","value":22},{"key":"students","value":22},{"key":"answer","value":22},{"key":"theres","value":22},{"key":"those","value":22},{"key":"Goyle","value":22},{"key":"dog","value":22},{"key":"far","value":22},{"key":"Quirrells","value":22},{"key":"class","value":22},{"key":"youve","value":22},{"key":"reason","value":22}]

const style = {border:"1px solid black"}

const slices = [10, 50, 100, 400]

export default class App extends Component {
  render () {
    return (
      <div>
        {slices.map(slice =>
          <div key={slice} style={style}>
            <WordCloud
              data={data.slice(0,slice)}
              height={500}
              spiral="rectangular"
            />
          </div>
        )}


        {/* {[10, 50, 100].map(slice =>
          <div key={slice} style={style}>
            <WordCloud
              data={gram2.slice(0,slice)}
              height={500}
              spiral="rectangular"
            />
          </div>
        )}


        {[10, 50, 100].map(slice =>
          <div key={slice} style={style}>
            <WordCloud
              data={gram4.slice(0,slice)}
              height={500}
              spiral="rectangular"
            />
          </div>
        )} */}

        {/* {[10, 20, 50, 100].map(slice =>
          <div key={slice} style={style}>
            <WordCloud
              data={gram5.slice(0,slice)}
              height={500}
              spiral="rectangular"
            />
          </div>
        )} */}
      </div>
    )
  }
}





const gram2 = [
  {
    "key": "issue related",
    "value": 268
  },
  {
    "key": "tax reform",
    "value": 69
  },
  {
    "key": "international trade",
    "value": 30
  },
  {
    "key": "related tax",
    "value": 30
  },
  {
    "key": "tax technology",
    "value": 30
  },
  {
    "key": "technology broadband",
    "value": 30
  },
  {
    "key": "international tax",
    "value": 22
  },
  {
    "key": "related mobile",
    "value": 20
  },
  {
    "key": "issue issue",
    "value": 19
  },
  {
    "key": "patent issue",
    "value": 19
  },
  {
    "key": "corporate tax",
    "value": 19
  },
  {
    "key": "student privacy",
    "value": 18
  },
  {
    "key": "trade commission",
    "value": 18
  },
  {
    "key": "commission patent",
    "value": 18
  },
  {
    "key": "technology innovation",
    "value": 18
  },
  {
    "key": "reform international",
    "value": 18
  },
  {
    "key": "copyright issue",
    "value": 17
  },
  {
    "key": "mobile payment",
    "value": 17
  },
  {
    "key": "regulation mobile",
    "value": 17
  },
  {
    "key": "market access",
    "value": 17
  },
  {
    "key": "cybersecurity encryption",
    "value": 17
  },
  {
    "key": "music licensing",
    "value": 16
  },
  {
    "key": "autonomous vehicle",
    "value": 16
  },
  {
    "key": "financial technology",
    "value": 16
  },
  {
    "key": "privacy cybersecurity",
    "value": 16
  },
  {
    "key": "economic development",
    "value": 16
  },
  {
    "key": "development need",
    "value": 16
  },
  {
    "key": "privacy issue",
    "value": 14
  },
  {
    "key": "related competition",
    "value": 14
  },
  {
    "key": "act hr",
    "value": 14
  },
  {
    "key": "online privacy",
    "value": 13
  },
  {
    "key": "litigation reform",
    "value": 13
  },
  {
    "key": "international taxation",
    "value": 13
  },
  {
    "key": "consumer privacy",
    "value": 12
  },
  {
    "key": "reform issue",
    "value": 12
  },
  {
    "key": "patent litigation",
    "value": 12
  },
  {
    "key": "foreign regulatory",
    "value": 12
  },
  {
    "key": "regulatory action",
    "value": 12
  },
  {
    "key": "accessibility issue",
    "value": 11
  },
  {
    "key": "related student",
    "value": 11
  },
  {
    "key": "tax cut",
    "value": 11
  },
  {
    "key": "cut job",
    "value": 11
  },
  {
    "key": "job act",
    "value": 11
  },
  {
    "key": "general consumer",
    "value": 10
  },
  {
    "key": "battery transportation",
    "value": 10
  },
  {
    "key": "transportation safety",
    "value": 10
  },
  {
    "key": "safety issue",
    "value": 10
  },
  {
    "key": "related government",
    "value": 10
  },
  {
    "key": "government request",
    "value": 10
  },
  {
    "key": "request data",
    "value": 10
  },
  {
    "key": "related distribution",
    "value": 10
  },
  {
    "key": "distribution video",
    "value": 10
  },
  {
    "key": "video programming",
    "value": 10
  },
  {
    "key": "general education",
    "value": 10
  },
  {
    "key": "education technology",
    "value": 10
  },
  {
    "key": "technology funding",
    "value": 10
  },
  {
    "key": "funding issue",
    "value": 10
  },
  {
    "key": "general patent",
    "value": 10
  },
  {
    "key": "patent reform",
    "value": 10
  },
  {
    "key": "general copyright",
    "value": 10
  },
  {
    "key": "mobile device",
    "value": 10
  },
  {
    "key": "device health",
    "value": 10
  },
  {
    "key": "related regulation",
    "value": 10
  },
  {
    "key": "mobile medical",
    "value": 10
  },
  {
    "key": "medical application",
    "value": 10
  },
  {
    "key": "application issue",
    "value": 10
  },
  {
    "key": "related privacy",
    "value": 10
  },
  {
    "key": "privacy health",
    "value": 10
  },
  {
    "key": "health data",
    "value": 10
  },
  {
    "key": "related diversity",
    "value": 10
  },
  {
    "key": "diversity workplace",
    "value": 10
  },
  {
    "key": "workplace issue",
    "value": 10
  },
  {
    "key": "tax issue",
    "value": 10
  },
  {
    "key": "related foreign",
    "value": 10
  },
  {
    "key": "standard technical",
    "value": 10
  },
  {
    "key": "technical barrier",
    "value": 10
  },
  {
    "key": "barrier trade",
    "value": 10
  },
  {
    "key": "trade market",
    "value": 10
  },
  {
    "key": "access including",
    "value": 10
  },
  {
    "key": "including tariff",
    "value": 10
  },
  {
    "key": "tariff nontariff",
    "value": 10
  },
  {
    "key": "nontariff barrier",
    "value": 10
  },
  {
    "key": "barrier issue",
    "value": 10
  },
  {
    "key": "related custom",
    "value": 10
  },
  {
    "key": "custom border",
    "value": 10
  },
  {
    "key": "border protection",
    "value": 10
  },
  {
    "key": "export control",
    "value": 10
  },
  {
    "key": "control regulation",
    "value": 10
  },
  {
    "key": "matter dealing",
    "value": 10
  },
  {
    "key": "dealing international",
    "value": 10
  },
  {
    "key": "new england",
    "value": 10
  },
  {
    "key": "related music",
    "value": 9
  },
  {
    "key": "mobile workforce",
    "value": 9
  },
  {
    "key": "trade issue",
    "value": 9
  },
  {
    "key": "technology issue",
    "value": 9
  },
  {
    "key": "issue research",
    "value": 9
  },
  {
    "key": "research technology",
    "value": 9
  },
  {
    "key": "privacy education",
    "value": 9
  },
  {
    "key": "education privacy",
    "value": 9
  },
  {
    "key": "issue patent",
    "value": 9
  }
]


const gram3 = [
  {
    "key": "issue related tax",
    "value": 30
  },
  {
    "key": "related tax technology",
    "value": 30
  },
  {
    "key": "tax technology broadband",
    "value": 30
  },
  {
    "key": "issue related mobile",
    "value": 20
  },
  {
    "key": "issue issue related",
    "value": 19
  },
  {
    "key": "corporate tax reform",
    "value": 19
  },
  {
    "key": "international trade commission",
    "value": 18
  },
  {
    "key": "trade commission patent",
    "value": 18
  },
  {
    "key": "commission patent issue",
    "value": 18
  },
  {
    "key": "tax reform international",
    "value": 18
  },
  {
    "key": "reform international tax",
    "value": 18
  },
  {
    "key": "economic development need",
    "value": 16
  },
  {
    "key": "issue related competition",
    "value": 14
  },
  {
    "key": "privacy cybersecurity encryption",
    "value": 14
  },
  {
    "key": "foreign regulatory action",
    "value": 12
  },
  {
    "key": "issue related student",
    "value": 11
  },
  {
    "key": "patent litigation reform",
    "value": 11
  },
  {
    "key": "tax cut job",
    "value": 11
  },
  {
    "key": "cut job act",
    "value": 11
  },
  {
    "key": "international tax reform",
    "value": 11
  },
  {
    "key": "general consumer privacy",
    "value": 10
  },
  {
    "key": "consumer privacy issue",
    "value": 10
  },
  {
    "key": "battery transportation safety",
    "value": 10
  },
  {
    "key": "transportation safety issue",
    "value": 10
  },
  {
    "key": "issue related government",
    "value": 10
  },
  {
    "key": "related government request",
    "value": 10
  },
  {
    "key": "government request data",
    "value": 10
  },
  {
    "key": "accessibility issue related",
    "value": 10
  },
  {
    "key": "issue related distribution",
    "value": 10
  },
  {
    "key": "related distribution video",
    "value": 10
  },
  {
    "key": "distribution video programming",
    "value": 10
  },
  {
    "key": "general education technology",
    "value": 10
  },
  {
    "key": "education technology funding",
    "value": 10
  },
  {
    "key": "technology funding issue",
    "value": 10
  },
  {
    "key": "funding issue related",
    "value": 10
  },
  {
    "key": "related student privacy",
    "value": 10
  },
  {
    "key": "general patent reform",
    "value": 10
  },
  {
    "key": "reform issue related",
    "value": 10
  },
  {
    "key": "general copyright issue",
    "value": 10
  },
  {
    "key": "related mobile payment",
    "value": 10
  },
  {
    "key": "related mobile device",
    "value": 10
  },
  {
    "key": "mobile device health",
    "value": 10
  },
  {
    "key": "issue related regulation",
    "value": 10
  },
  {
    "key": "related regulation mobile",
    "value": 10
  },
  {
    "key": "regulation mobile medical",
    "value": 10
  },
  {
    "key": "mobile medical application",
    "value": 10
  },
  {
    "key": "medical application issue",
    "value": 10
  },
  {
    "key": "application issue related",
    "value": 10
  },
  {
    "key": "issue related privacy",
    "value": 10
  },
  {
    "key": "related privacy health",
    "value": 10
  },
  {
    "key": "privacy health data",
    "value": 10
  },
  {
    "key": "issue related diversity",
    "value": 10
  },
  {
    "key": "related diversity workplace",
    "value": 10
  },
  {
    "key": "diversity workplace issue",
    "value": 10
  },
  {
    "key": "workplace issue related",
    "value": 10
  },
  {
    "key": "international tax issue",
    "value": 10
  },
  {
    "key": "issue related foreign",
    "value": 10
  },
  {
    "key": "related foreign regulatory",
    "value": 10
  },
  {
    "key": "standard technical barrier",
    "value": 10
  },
  {
    "key": "technical barrier trade",
    "value": 10
  },
  {
    "key": "barrier trade market",
    "value": 10
  },
  {
    "key": "trade market access",
    "value": 10
  },
  {
    "key": "market access including",
    "value": 10
  },
  {
    "key": "access including tariff",
    "value": 10
  },
  {
    "key": "including tariff nontariff",
    "value": 10
  },
  {
    "key": "tariff nontariff barrier",
    "value": 10
  },
  {
    "key": "nontariff barrier issue",
    "value": 10
  },
  {
    "key": "barrier issue related",
    "value": 10
  },
  {
    "key": "issue related custom",
    "value": 10
  },
  {
    "key": "related custom border",
    "value": 10
  },
  {
    "key": "custom border protection",
    "value": 10
  },
  {
    "key": "export control regulation",
    "value": 10
  },
  {
    "key": "matter dealing international",
    "value": 10
  },
  {
    "key": "dealing international taxation",
    "value": 10
  },
  {
    "key": "issue related music",
    "value": 9
  },
  {
    "key": "related music licensing",
    "value": 9
  },
  {
    "key": "international trade issue",
    "value": 9
  },
  {
    "key": "technology issue research",
    "value": 9
  },
  {
    "key": "issue research technology",
    "value": 9
  },
  {
    "key": "research technology innovation",
    "value": 9
  },
  {
    "key": "online privacy education",
    "value": 9
  },
  {
    "key": "privacy education privacy",
    "value": 9
  },
  {
    "key": "education privacy cybersecurity",
    "value": 9
  },
  {
    "key": "patent issue patent",
    "value": 9
  },
  {
    "key": "issue patent litigation",
    "value": 9
  },
  {
    "key": "technology innovation education",
    "value": 9
  },
  {
    "key": "tax reform issue",
    "value": 9
  },
  {
    "key": "copyright issue issue",
    "value": 8
  },
  {
    "key": "issue related autonomous",
    "value": 8
  },
  {
    "key": "related autonomous vehicle",
    "value": 8
  },
  {
    "key": "innovation education student",
    "value": 8
  },
  {
    "key": "education student privacy",
    "value": 8
  },
  {
    "key": "opioid abuse prevention",
    "value": 8
  },
  {
    "key": "safety issue issue",
    "value": 7
  },
  {
    "key": "issue related consumer",
    "value": 7
  },
  {
    "key": "related consumer fraud",
    "value": 7
  },
  {
    "key": "related competition mobile",
    "value": 7
  },
  {
    "key": "competition mobile technology",
    "value": 7
  },
  {
    "key": "mobile technology industry",
    "value": 7
  },
  {
    "key": "issue related workforce",
    "value": 7
  }
]
const gram4 = [
  {
    "key": "issue related tax technology",
    "value": 30
  },
  {
    "key": "related tax technology broadband",
    "value": 30
  },
  {
    "key": "international trade commission patent",
    "value": 18
  },
  {
    "key": "trade commission patent issue",
    "value": 18
  },
  {
    "key": "corporate tax reform international",
    "value": 18
  },
  {
    "key": "tax reform international tax",
    "value": 18
  },
  {
    "key": "tax cut job act",
    "value": 11
  },
  {
    "key": "general consumer privacy issue",
    "value": 10
  },
  {
    "key": "battery transportation safety issue",
    "value": 10
  },
  {
    "key": "issue related government request",
    "value": 10
  },
  {
    "key": "related government request data",
    "value": 10
  },
  {
    "key": "accessibility issue related distribution",
    "value": 10
  },
  {
    "key": "issue related distribution video",
    "value": 10
  },
  {
    "key": "related distribution video programming",
    "value": 10
  },
  {
    "key": "general education technology funding",
    "value": 10
  },
  {
    "key": "education technology funding issue",
    "value": 10
  },
  {
    "key": "technology funding issue related",
    "value": 10
  },
  {
    "key": "issue related student privacy",
    "value": 10
  },
  {
    "key": "issue related mobile payment",
    "value": 10
  },
  {
    "key": "issue related mobile device",
    "value": 10
  },
  {
    "key": "related mobile device health",
    "value": 10
  },
  {
    "key": "issue related regulation mobile",
    "value": 10
  },
  {
    "key": "related regulation mobile medical",
    "value": 10
  },
  {
    "key": "regulation mobile medical application",
    "value": 10
  },
  {
    "key": "mobile medical application issue",
    "value": 10
  },
  {
    "key": "medical application issue related",
    "value": 10
  },
  {
    "key": "application issue related privacy",
    "value": 10
  },
  {
    "key": "issue related privacy health",
    "value": 10
  },
  {
    "key": "related privacy health data",
    "value": 10
  },
  {
    "key": "issue related diversity workplace",
    "value": 10
  },
  {
    "key": "related diversity workplace issue",
    "value": 10
  },
  {
    "key": "diversity workplace issue related",
    "value": 10
  },
  {
    "key": "workplace issue related competition",
    "value": 10
  },
  {
    "key": "issue related foreign regulatory",
    "value": 10
  },
  {
    "key": "related foreign regulatory action",
    "value": 10
  },
  {
    "key": "standard technical barrier trade",
    "value": 10
  },
  {
    "key": "technical barrier trade market",
    "value": 10
  },
  {
    "key": "barrier trade market access",
    "value": 10
  },
  {
    "key": "trade market access including",
    "value": 10
  },
  {
    "key": "market access including tariff",
    "value": 10
  },
  {
    "key": "access including tariff nontariff",
    "value": 10
  },
  {
    "key": "including tariff nontariff barrier",
    "value": 10
  },
  {
    "key": "tariff nontariff barrier issue",
    "value": 10
  },
  {
    "key": "nontariff barrier issue related",
    "value": 10
  },
  {
    "key": "barrier issue related custom",
    "value": 10
  },
  {
    "key": "issue related custom border",
    "value": 10
  },
  {
    "key": "related custom border protection",
    "value": 10
  },
  {
    "key": "matter dealing international taxation",
    "value": 10
  },
  {
    "key": "issue related music licensing",
    "value": 9
  },
  {
    "key": "technology issue research technology",
    "value": 9
  },
  {
    "key": "issue research technology innovation",
    "value": 9
  },
  {
    "key": "online privacy education privacy",
    "value": 9
  },
  {
    "key": "privacy education privacy cybersecurity",
    "value": 9
  },
  {
    "key": "commission patent issue patent",
    "value": 9
  },
  {
    "key": "patent issue patent litigation",
    "value": 9
  },
  {
    "key": "issue patent litigation reform",
    "value": 9
  },
  {
    "key": "reform international tax issue",
    "value": 9
  },
  {
    "key": "reform international tax reform",
    "value": 9
  },
  {
    "key": "international tax reform issue",
    "value": 9
  },
  {
    "key": "tax reform issue related",
    "value": 9
  },
  {
    "key": "reform issue related foreign",
    "value": 9
  },
  {
    "key": "general copyright issue issue",
    "value": 8
  },
  {
    "key": "copyright issue issue related",
    "value": 8
  },
  {
    "key": "issue issue related music",
    "value": 8
  },
  {
    "key": "issue related autonomous vehicle",
    "value": 8
  },
  {
    "key": "technology innovation education student",
    "value": 8
  },
  {
    "key": "innovation education student privacy",
    "value": 8
  },
  {
    "key": "transportation safety issue issue",
    "value": 7
  },
  {
    "key": "safety issue issue related",
    "value": 7
  },
  {
    "key": "issue related consumer fraud",
    "value": 7
  },
  {
    "key": "issue related competition mobile",
    "value": 7
  },
  {
    "key": "related competition mobile technology",
    "value": 7
  },
  {
    "key": "competition mobile technology industry",
    "value": 7
  },
  {
    "key": "issue related financial technology",
    "value": 7
  },
  {
    "key": "related financial technology mobile",
    "value": 7
  },
  {
    "key": "financial technology mobile payment",
    "value": 7
  },
  {
    "key": "international trade issue international",
    "value": 7
  },
  {
    "key": "trade issue international trade",
    "value": 7
  },
  {
    "key": "issue international trade commission",
    "value": 7
  },
  {
    "key": "health technology issue research",
    "value": 7
  },
  {
    "key": "research technology innovation regulation",
    "value": 7
  },
  {
    "key": "technology innovation regulation mobile",
    "value": 7
  },
  {
    "key": "innovation regulation mobile health",
    "value": 7
  },
  {
    "key": "regulation mobile health application",
    "value": 7
  },
  {
    "key": "mobile health application health",
    "value": 7
  },
  {
    "key": "health application health privacy",
    "value": 7
  },
  {
    "key": "education privacy cybersecurity encryption",
    "value": 7
  },
  {
    "key": "privacy cybersecurity encryption financial",
    "value": 7
  },
  {
    "key": "cybersecurity encryption financial technology",
    "value": 7
  },
  {
    "key": "patent litigation reform copyright",
    "value": 7
  },
  {
    "key": "litigation reform copyright issue",
    "value": 7
  },
  {
    "key": "reform copyright issue music",
    "value": 7
  },
  {
    "key": "copyright issue music licensing",
    "value": 7
  },
  {
    "key": "economic development need opioid",
    "value": 7
  },
  {
    "key": "development need opioid abuse",
    "value": 7
  },
  {
    "key": "need opioid abuse prevention",
    "value": 7
  },
  {
    "key": "h2a agricultural guestworker reform",
    "value": 7
  },
  {
    "key": "everify border interior enforcement",
    "value": 7
  },
  {
    "key": "specialty crop farm bill",
    "value": 7
  },
  {
    "key": "crop farm bill program",
    "value": 7
  }
]
const gram5 = [
  {
    "key": "issue related tax technology broadband",
    "value": 30
  },
  {
    "key": "international trade commission patent issue",
    "value": 18
  },
  {
    "key": "corporate tax reform international tax",
    "value": 18
  },
  {
    "key": "issue related government request data",
    "value": 10
  },
  {
    "key": "accessibility issue related distribution video",
    "value": 10
  },
  {
    "key": "issue related distribution video programming",
    "value": 10
  },
  {
    "key": "general education technology funding issue",
    "value": 10
  },
  {
    "key": "education technology funding issue related",
    "value": 10
  },
  {
    "key": "issue related mobile device health",
    "value": 10
  },
  {
    "key": "issue related regulation mobile medical",
    "value": 10
  },
  {
    "key": "related regulation mobile medical application",
    "value": 10
  },
  {
    "key": "regulation mobile medical application issue",
    "value": 10
  },
  {
    "key": "mobile medical application issue related",
    "value": 10
  },
  {
    "key": "medical application issue related privacy",
    "value": 10
  },
  {
    "key": "application issue related privacy health",
    "value": 10
  },
  {
    "key": "issue related privacy health data",
    "value": 10
  },
  {
    "key": "issue related diversity workplace issue",
    "value": 10
  },
  {
    "key": "related diversity workplace issue related",
    "value": 10
  },
  {
    "key": "diversity workplace issue related competition",
    "value": 10
  },
  {
    "key": "issue related foreign regulatory action",
    "value": 10
  },
  {
    "key": "standard technical barrier trade market",
    "value": 10
  },
  {
    "key": "technical barrier trade market access",
    "value": 10
  },
  {
    "key": "barrier trade market access including",
    "value": 10
  },
  {
    "key": "trade market access including tariff",
    "value": 10
  },
  {
    "key": "market access including tariff nontariff",
    "value": 10
  },
  {
    "key": "access including tariff nontariff barrier",
    "value": 10
  },
  {
    "key": "including tariff nontariff barrier issue",
    "value": 10
  },
  {
    "key": "tariff nontariff barrier issue related",
    "value": 10
  },
  {
    "key": "nontariff barrier issue related custom",
    "value": 10
  },
  {
    "key": "barrier issue related custom border",
    "value": 10
  },
  {
    "key": "issue related custom border protection",
    "value": 10
  },
  {
    "key": "technology issue research technology innovation",
    "value": 9
  },
  {
    "key": "online privacy education privacy cybersecurity",
    "value": 9
  },
  {
    "key": "trade commission patent issue patent",
    "value": 9
  },
  {
    "key": "commission patent issue patent litigation",
    "value": 9
  },
  {
    "key": "patent issue patent litigation reform",
    "value": 9
  },
  {
    "key": "tax reform international tax issue",
    "value": 9
  },
  {
    "key": "tax reform international tax reform",
    "value": 9
  },
  {
    "key": "reform international tax reform issue",
    "value": 9
  },
  {
    "key": "international tax reform issue related",
    "value": 9
  },
  {
    "key": "tax reform issue related foreign",
    "value": 9
  },
  {
    "key": "reform issue related foreign regulatory",
    "value": 9
  },
  {
    "key": "general copyright issue issue related",
    "value": 8
  },
  {
    "key": "copyright issue issue related music",
    "value": 8
  },
  {
    "key": "issue issue related music licensing",
    "value": 8
  },
  {
    "key": "technology innovation education student privacy",
    "value": 8
  },
  {
    "key": "battery transportation safety issue issue",
    "value": 7
  },
  {
    "key": "transportation safety issue issue related",
    "value": 7
  },
  {
    "key": "issue related competition mobile technology",
    "value": 7
  },
  {
    "key": "related competition mobile technology industry",
    "value": 7
  },
  {
    "key": "issue related financial technology mobile",
    "value": 7
  },
  {
    "key": "related financial technology mobile payment",
    "value": 7
  },
  {
    "key": "international trade issue international trade",
    "value": 7
  },
  {
    "key": "trade issue international trade commission",
    "value": 7
  },
  {
    "key": "issue international trade commission patent",
    "value": 7
  },
  {
    "key": "health technology issue research technology",
    "value": 7
  },
  {
    "key": "issue research technology innovation regulation",
    "value": 7
  },
  {
    "key": "research technology innovation regulation mobile",
    "value": 7
  },
  {
    "key": "technology innovation regulation mobile health",
    "value": 7
  },
  {
    "key": "innovation regulation mobile health application",
    "value": 7
  },
  {
    "key": "regulation mobile health application health",
    "value": 7
  },
  {
    "key": "mobile health application health privacy",
    "value": 7
  },
  {
    "key": "privacy education privacy cybersecurity encryption",
    "value": 7
  },
  {
    "key": "education privacy cybersecurity encryption financial",
    "value": 7
  },
  {
    "key": "privacy cybersecurity encryption financial technology",
    "value": 7
  },
  {
    "key": "issue patent litigation reform copyright",
    "value": 7
  },
  {
    "key": "patent litigation reform copyright issue",
    "value": 7
  },
  {
    "key": "litigation reform copyright issue music",
    "value": 7
  },
  {
    "key": "reform copyright issue music licensing",
    "value": 7
  },
  {
    "key": "economic development need opioid abuse",
    "value": 7
  },
  {
    "key": "development need opioid abuse prevention",
    "value": 7
  },
  {
    "key": "specialty crop farm bill program",
    "value": 7
  },
  {
    "key": "crop farm bill program market",
    "value": 7
  },
  {
    "key": "farm bill program market access",
    "value": 7
  },
  {
    "key": "bill program market access program",
    "value": 7
  },
  {
    "key": "general patent reform general copyright",
    "value": 7
  },
  {
    "key": "patent reform general copyright issue",
    "value": 7
  },
  {
    "key": "reform general copyright issue issue",
    "value": 7
  },
  {
    "key": "workplace issue related competition online",
    "value": 7
  },
  {
    "key": "issue related competition online digital",
    "value": 7
  },
  {
    "key": "related competition online digital service",
    "value": 7
  },
  {
    "key": "related mobile device health issue",
    "value": 7
  },
  {
    "key": "mobile device health issue related",
    "value": 7
  },
  {
    "key": "device health issue related regulation",
    "value": 7
  },
  {
    "key": "health issue related regulation mobile",
    "value": 7
  },
  {
    "key": "matter dealing international taxation tax",
    "value": 7
  },
  {
    "key": "dealing international taxation tax reform",
    "value": 7
  },
  {
    "key": "international taxation tax reform hr",
    "value": 7
  },
  {
    "key": "congress tax reform act senate",
    "value": 7
  },
  {
    "key": "tax reform act senate finance",
    "value": 7
  },
  {
    "key": "reform act senate finance committee",
    "value": 7
  },
  {
    "key": "act senate finance committee tax",
    "value": 7
  },
  {
    "key": "senate finance committee tax reform",
    "value": 7
  },
  {
    "key": "finance committee tax reform process",
    "value": 7
  },
  {
    "key": "house republican tax reform plan",
    "value": 7
  },
  {
    "key": "safety issue issue related consumer",
    "value": 6
  },
  {
    "key": "issue issue related consumer fraud",
    "value": 6
  },
  {
    "key": "issue related immigration including highskilled",
    "value": 6
  },
  {
    "key": "related immigration including highskilled immigration",
    "value": 6
  },
  {
    "key": "related distribution video programming issue",
    "value": 6
  }
]


console.log("gram3",gram3.length,"gram4",gram4.length,"gram5",gram5.length)
