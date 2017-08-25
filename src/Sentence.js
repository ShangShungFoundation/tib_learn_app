import React, { Component } from 'react';
import './App.css';
import sentence from './sentence2.json'


function arr2obj(json){
  let res = {}
  for(var row in json){
    res[json[row][0]] = json[row].slice(1);
  }
  return res
}

const Syl = ({tib, cls, gls}) => 
  <div className="syl">
    <span className="tib">{tib}</span>
    <span className="cls">{cls}</span>
    <span className="gls">{gls}</span>
  </div>


class Sentence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: arr2obj(sentence.values)
    };
  }

  renderSentence =() =>{
    let snt = this.state.data.sentence;
    let cls = this.state.data.cls;
    let gls = this.state.data.gls;
    return snt.map((s, i) => <Syl tib={s} cls={cls[i]} gls={gls[i]} key={i} /> )
  }

  render() {
    return (
      <div className="sentence">
        <h1>{this.renderSentence()}</h1>
      </div>
    );
  }
}

export default Sentence;