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


const TibWord = ({w1, w2}) =>   
  <em className='tib'><span className={(w2 === '' || w2 === undefined)?'dimm':'highlight'}>{w1}</span></em>


class Sentence extends Component {
  constructor(props) {
    super(props);
    this.example = prepareData(example.values)
    this.sentenceQty = this.example.length
    this.state = {
        currSentence: this.example[0],
        currSentenceNum: 0,
        showTrans: false,
        showMeaning: false,
        showCls: false}
  }

  toogleMeaning = () => {
    this.setState({showMeaning: !this.state.showMeaning})
  }
  toogleTranslation = () => {
    this.setState({showTrans: !this.state.showTrans})
  }
  toogleCls = () => {
    this.setState({showCls: !this.state.showCls})
  }
  showAll = () => {
    this.setState({showTrans: true, showCls:true, showMeaning: true})
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

  renderSentence =() =>{
    let fullSentence = this.example[0].sentence
    let {sentence, funct, meaning} = this.state.currSentence;
    if (funct === undefined) {
      funct = []
    }
    return fullSentence.map((s, i) => 
      <div className="syl" key={i} >
          <TibWord w1={s} w2={sentence[i]}/>
          {this.state.showCls && <span className="cls">{funct[i]}</span>}
          {this.state.showMeaning && <span className="gls">{meaning[i]}</span>}
      </div>)
  }

  render() {
    const display = this.renderSentence()
    const translation = (this.state.showTrans)? this.state.currSentence.translation: ""
    const isNotFirtSentence = (this.state.currSentenceNum === 0)? false : true;
    const isNotLastSentence = (this.state.currSentenceNum === this.sentenceQty - 1 )? false: true;
    return (
      <div className="sentence">
        <div className="nextprev">
          <p>
            {isNotFirtSentence && <button onClick={this.previous}>◀</button>}
            {isNotLastSentence && <button onClick={this.next}>►</button>}
          </p>
        </div>
        <div className="translation">{translation}</div>
        <div className="display">{display}
          <div className="menu">
            <ul>
              <li><button onClick={this.toogleCls}>grammar</button></li>
              <li><button onClick={this.toogleMeaning}>word meaning</button></li>
              <li><button onClick={this.toogleTranslation}>show translation</button></li>
              <li><button onClick={this.showAll}>all</button></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Sentence;