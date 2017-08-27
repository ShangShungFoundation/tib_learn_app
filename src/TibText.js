import React, { Component } from 'react';
import Find from './lib/Find.js'
import Syllabe from './Syllabe.js'


class tibText extends Component {
  constructor(props) {
    super(props);
    this.text = props.text
    this.textArray = []
  }

  toSyllabes(text){
    if (text.endsWith('་'))
      text = `${text.slice(0, -1)}་`
    this.textArray = text.split('་')
    return this.textArray.map((s, i) => this.renderSylabe(s, i))
  }

  renderSylabe(s, i) {
    var find = Find(s, 0)
    if (s === '')
    	return ''
    let tib = `${this.textArray[i]}་`
    if (!find) {
      return <Syllabe tib={tib} key={i} className='notFound'/>
    } else {
      return <Syllabe tib={tib} wy={find.wy} dra={find.dra} spel={find.spel} key={i}/>
    }
  }

  render() {
    const syllabes = this.toSyllabes(this.text)
    return(
      <div className='tib'>
        {syllabes}
      </div>
    );
  }
}

export default tibText;