import React, { Component } from 'react';
import Find from './Find.js'
import Syllabe from './Syllabe.js'


class tibText extends Component {
  constructor(props) {
    super(props);
    this.textArray = []
    this.wylieArray = []
    this.isWylie = false  //this.isLatin(props.text)
    this.foundSylabes = []
    this.syllabes = props.syllabes
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
    var find = Find(this.syllabes, s, this.isWylie)
    this.foundSylabes.push(find);
    if (!this.isWylie) {
      this.wylieArray.push(find.wy || s)
      tib = s.endsWith('།')? s : `${s}་`;
    } else {
      tib = find.tib
    }
    return (<Syllabe tib={tib} key={i} wy={find.wy} dra={find.dra} spel={find.spel} />)
  }

  render() {
    const syllabes = this.toSyllabes(this.props.text)
    const wylie = this.wylieArray.join(' ')
    const foundSylabes = this.foundSylabes.toString()
    console.log(foundSylabes)
    return(
      <div className='tib'>
        {syllabes}
        {this.props.wylie && <p className='wylie'>{wylie}</p>}
        {/* <h1>{foundSylabes}</h1> */}
      </div>
    );
  }
}

export default tibText;