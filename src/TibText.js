import React, { Component } from 'react';
import Find from './lib/Find.js'
import Syllabe from './Syllabe.js'
import axios from 'axios';

const syllabesURL = 'https://sheets.googleapis.com/v4/spreadsheets/1D6NW7phdjwmz7bnncNgJcwNVgwn39SsOCVvZ403VilE/values/syllabes-unique!A2%3AC4056?key=AIzaSyCSZo1p3NxY73vcsDo554y3chNSTp4uhqY'


class tibText extends Component {
  constructor(props) {
    super(props);
    this.text = props.text
    this.textArray = []
    this.syllabes = []
  }
  componentDidMount() {
    axios.get(syllabesURL)
      .then(res => {
        this.syllabes = res.data.values;
      });
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
  search(string) {
      string = string.trim()
    if (string.endsWith('།'))
      string = `${string.slice(0, -1)}་`
    if (!string.endsWith('་'))
      string = `${string}་`
    let rows = this.syllabes;
    for(var row in rows){
      if (rows[row][0] === string) {
        let res = rows[row]
        return {tib: res[0], wy: res[1], spel: res[2], dra: res[3]}
      }
    }
    return false
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