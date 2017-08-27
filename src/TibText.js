import React, { Component } from 'react';
// import Find from './lib/Find.js'
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
  }
  toSyllabes(text){
    if (text.endsWith('་'))
      text = `${text.slice(0, -1)}་`
    this.textArray = text.split('་')
    return this.textArray.map((s, i) => this.renderSylabe(s, i))
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
    var find = this.search(s)
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