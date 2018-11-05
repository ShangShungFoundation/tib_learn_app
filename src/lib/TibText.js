import React, { Component } from 'react';
import Find from './Find.js'
import Syllabe from './Syllabe.js'
import { Link } from 'react-router-dom'

class tibText extends Component {
  constructor(props) {
    super(props);
    this.textArray = []
    this.wylieArray = []
    this.isWylie = false  //this.isLatin(props.text)
    this.foundSylabes = {}
    this.syllabes = props.syllabes
    this.showExport = props.showExport || false
    // debugger
  }
  isLatin(text) {
    return /[\u00BF-\u1FFF\u2C00-\uD7FF\w]/.test(text)
  }
  toSyllabes(text){
    let textWhiteSpaceArray = text.split(/[ ]+/g)
    let syllArray = textWhiteSpaceArray.map((w) => w.split('་').map((s, i) => this.renderSylabe(s, i)))
    let spacer = (this.props.spacer)? <span>&nbsp;</span> : [];
    return syllArray.map((a, i) => [...a, spacer])
  }

  renderSylabe(s, i) {
    let tib = ''
    if (s === '')
      return ''
    var syl = Find(this.syllabes, s, this.isWylie)
    if (syl) this.foundSylabes[syl.tib] = syl
    if (!this.isWylie) {
      this.wylieArray.push(syl.wy || s)
      tib = s.endsWith('།')? s : `${s}་`;
    } else {
      tib = syl.tib
    }
    return (<Syllabe tib={tib} key={i} wy={syl.wy} dra={syl.dra} spel={syl.spel} />)
  }

  render() {
    const syllabes = this.toSyllabes(this.props.text)
    const wylie = this.wylieArray.join(' ')
    const foundSylabes = JSON.stringify(this.foundSylabes, null, 0)
    const showExport = this.showExport
    // const querStr = "?txt=" + this.props.text + "&syl=" + foundSylabes
    
    return(
      <div className='tib'>
        {syllabes}
        {this.props.wylie && <p className='wylie'>{wylie}</p>}
        { showExport && <p>
          <Link className="exportBtn" to={{pathname: '/widget', query: {text: this.props.text, syllabes: foundSylabes} }}>Export to Widget</Link>
        </p>}
      </div>
    );
  }
}

export default tibText;