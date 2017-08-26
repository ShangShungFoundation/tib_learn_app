import React, { Component } from 'react';
import './App.css';
import example from './sentence2.json'


function prepareData(json){
  let sentences = []
  for(var row in json){
      if (sentences[json[row][0]] === undefined)
          sentences[json[row][0]] = {}

      sentences[json[row][0]][json[row][1]] = json[row].slice(2);
  }
  return sentences
}


class Sentence extends Component {
  constructor(props) {
    super(props);
    this.example = prepareData(example.values)
    this.sentenceQty = this.example.lenght
    this.state = {
        currSentence: this.example[0],
        currSentenceNum: 0,
        showTrans: false,
        showCls: false}
  }

  toogleTrans = () => {
    this.setState({showTrans: !this.state.showTrans})
  }

  toogleCls = () => {
    this.setState({showCls: !this.state.showCls})
  }

  showAll = () => {
    this.setState({showTrans: true, showCls:true})
  }

  renderSentence =() =>{
    let {sentence, funct, meaning} = this.state.currSentence;
    return sentence.map((s, i) => 
      <div className="syl" key={i} >
          <span className="tib">{s}</span>
          {this.state.showCls && <span className="cls">{funct[i]}</span>}
          {this.state.showTrans && <span className="gls">{meaning[i]}</span>}
      </div>)
  }

  previous = () => {
    let previousSentenceNum = this.state.currSentenceNum - 1
    this.setState({
      currSentence: this.example[previousSentenceNum],
      currSentenceNum: previousSentenceNum,}
    )
  }

  next = () => {
    let nextSentenceNum = this.state.currSentenceNum + 1
    this.setState({
      currSentence: this.example[nextSentenceNum],
      currSentenceNum: nextSentenceNum,}
    )
  }

  render() {
    const display = this.renderSentence()
    const isNotFirtSentence = (this.state.currSentenceNum === 0)? false : true;
    const isNotLastSentence = (this.state.currSentenceNum === this.sentenceQty )? false: true;
    return (
      <div className="sentence">
        <div className="display">{display}</div>
        <div className="menu">
          <p>Show</p>
          <ul>
            <li><button onClick={this.toogleCls}>grammar</button></li>
            <li><button onClick={this.toogleTrans}  href="#">word meaning</button></li>
            <li><button onClick={this.showAll}  href="#">all</button></li>
          </ul>
        </div>
        <div>
          <ul>
            {isNotFirtSentence && <li><button onClick={this.previous}  href="#">previous</button></li>}
            {isNotLastSentence &&<li><button onClick={this.next}  href="#">next</button></li>}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sentence;