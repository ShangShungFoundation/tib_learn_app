import React, { Component } from 'react';
import './App.css';
import examples from './examples.json'
import TibText from './TibText.js'


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
  <div className={(w2 === '' || w2 === undefined)?'dimm':'highlight'}>
    <TibText text={w1} />
  </div>


class Sentence extends Component {
  constructor(props) {
    super(props);
    this.examples = examples.valueRanges
    this.exampleQty = this.examples.length
    this.state = this.initExample(0)
  }
  initExample(exampleNum) {
    this.example = prepareData(this.examples[exampleNum].values)
    this.sentenceQty = this.example.length
    return {
        currExampleNum: exampleNum,
        currSentence: this.example[0],
        currSentenceNum: 0,
        showTrans: false,
        showMeaning: false,
        showCls: false,
        showGrammar: false
    }
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
  toogleGrammar = () => {
    this.setState({showGrammar: !this.state.showGrammar})
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

  nextExample = () => {
    let nextExampleNum = this.state.currExampleNum + 1
    this.setState(this.initExample(nextExampleNum))
  }

  renderSentence =() =>{
    let fullSentence = this.example[0].sentence
    let {sentence, meaning} = this.state.currSentence;
    let cls = this.state.currSentence.class || []
    let grammar = this.state.currSentence.grammar || []
    return fullSentence.map((s, i) => 
      <div className="word" key={i} >
          <TibWord w1={s} w2={sentence[i]}/>
          <p className="cls">{cls[i]}</p>
          <p className="grm">{grammar[i]}</p>
          <p className="gls">{meaning[i]}</p>
      </div>)
  }

  render() {
    const display = this.renderSentence()
    const translation = (this.state.showTrans)? this.state.currSentence.translation: ""
    const isNotFirtSentence = (this.state.currSentenceNum === 0)? false : true;
    const isNotLastSentence = (this.state.currSentenceNum === this.sentenceQty - 1 )? false: true;
    const isNotLastExample = (this.state.currExampleNum === this.exampleQty - 1 )? false: true;
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
              <li><button onClick={this.toogleCls}>class</button></li>
              <li><button onClick={this.toogleGrammar}>grammar</button></li>
              <li><button onClick={this.toogleMeaning}>meaning</button></li>
              <li><button onClick={this.toogleTranslation}>translation</button></li>
              <li><button onClick={this.showAll}>all</button></li>
            </ul>
          </div>
        </div>
        <div className="nextprev">
          <p>
            {isNotLastExample && <button onClick={this.nextExample}> next example ►</button>}
          </p>
        </div>
      </div>
    );
  }
}

export default Sentence;