import React, { Component } from 'react';
import Find from './lib/Find.js'
import Syllabe from './Syllabe.js'



class tibText extends Component {
  constructor(props) {
    super(props);
    this.textArray = []
    this.wylieArray = []
    this.isWylie = false  //this.isLatin(props.text)
  }
  isLatin(text) {
    return /[\u00BF-\u1FFF\u2C00-\uD7FF\w]/.test(text)
  }
  toSyllabes(text){
    let textWhiteSpaceArray = text.split(/[ ]+/g)
    let syllArray = textWhiteSpaceArray.map((w) => w.split('་').map((s, i) => this.renderSylabe(s, i)))
    return syllArray.map((a, i) => [...a, <span>&nbsp;</span>])
    // this.textArray = text.split('་')
    // return this.textArray.map((s, i) => this.renderSylabe(s, i))
  }

  renderSylabe(s, i) {
    let tib = ''
    if (s === '')
      return ''
    var find = Find(s, this.isWylie)
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
    return(
      <div className='tib'>
        {syllabes}
      </div>
    );
  }
}

export default tibText;