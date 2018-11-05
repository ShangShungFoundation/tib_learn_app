import React, { Component } from 'react';
import TibText from '../lib/TibText.js'

const URL = 'https://sheets.googleapis.com/v4/spreadsheets/1D6NW7phdjwmz7bnncNgJcwNVgwn39SsOCVvZ403VilE/values/syllables_unique!A2:D4045?key=AIzaSyCSZo1p3NxY73vcsDo554y3chNSTp4uhqY'
const examplesURL = 'https://sheets.googleapis.com/v4/spreadsheets/1D6NW7phdjwmz7bnncNgJcwNVgwn39SsOCVvZ403VilE/values:batchGet?ranges=sentence2!A1:L17&ranges=sentence3!A1:Q24&ranges=sentence4!A1:N6&ranges=sentence5!A1:K12&ranges=sentence4!A1:S6&majorDimension=ROWS&key=AIzaSyCSZo1p3NxY73vcsDo554y3chNSTp4uhqY'


function prepareData(json){
  let sentences = []
  for(var row in json){
      if (sentences[json[row][0]] === undefined)
          sentences[json[row][0]] = {}

      sentences[json[row][0]][json[row][1]] = json[row].slice(2);
  }
  return sentences
}


const TibWord = ({w1, w2, syllabes}) =>
  <div className={(w2 === '' || w2 === undefined)?'dimm':'highlight'}>
    <TibText text={w1} syllabes={syllabes} />
  </div>


class Sentence extends Component {
  constructor(props){
    super(props)
    this.state = {loadedExmaples: false, loadedSyllabes: false}
    this.syllabes = {}
  }
  

  componentDidMount() {
      Promise.all([
        fetch(examplesURL)
          .then((response) => response.json())
          .then(res => {
            this.examples = res.valueRanges;
            this.exampleQty = this.examples.length
          })
          .catch((error) => console.log('error', error)),
        fetch(URL)
          .then((response) => response.json())
          .then((json) =>  this.syllabes = json)
          .catch((error) => console.log('error', error))
      ]).then((e) =>{
        this.setState(this.initExample(0))
      })
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
        showGrammar: false,
        showFunction: false
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
  toogleFunction = () => {
    this.setState({showFunction: !this.state.showFunction})
  }
  showAll = () => {
    this.setState({
      showTrans: true, showCls:true, showGrammar: true,
      showMeaning: true, showFunction: true})
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
  prevExample = () => {
    let nextExampleNum = this.state.currExampleNum -1
    this.setState(this.initExample(nextExampleNum))
  }

  renderSentence =() =>{
    let fullSentence = this.example[0].sentence
    let {sentence, meaning} = this.state.currSentence;
    let cls = this.state.currSentence.class || []
    let grammar = this.state.currSentence.grammar || []
    let fun = this.state.currSentence.function || []
    return fullSentence.map((s, i) => 
      <div className="word" key={i} >
          <TibWord w1={s} w2={sentence[i]} syllabes={this.syllabes} />
          <p className="cls">{this.state.showCls && cls[i] }</p>
          <p className="grm">{this.state.showGrammar && grammar[i] }</p>
          <p className="fun">{this.state.showFunction && fun[i] }</p>
          <p className="gls">{this.state.showMeaning && meaning[i] }</p>
      </div>)
  }
  
  renderTranslation(){
    if (this.state.showTrans && 'translation' in this.state.currSentence) {
      let trans = this.state.currSentence.translation[0]
      return trans.split('&&').map((s,i) => <p key={i}>{s.trim()}</p>)
    } else {
      return ''
    } 
  }

  render() {
    if (!this.state) {
        return <p className="loading">Loading Examples...</p>
    }
    const sentance = this.state.currExampleNum && this.renderSentence()
    const translation = this.renderTranslation()
    const isNotFirtSentence = (this.state.currSentenceNum === 0)? false : true;
    const isNotLastSentence = (this.state.currSentenceNum === this.sentenceQty - 1 )? false: true;
    const isNotFirstExample = (this.state.currExampleNum === 0)? false: true;
    const isNotLastExample = (this.state.currExampleNum === this.exampleQty - 1 )? false: true;
    
    return (
      <div className="sentence">
        <p>
          {isNotFirstExample && <button onClick={this.prevExample} className="nextExam"> ◀ prev. example</button>}
          {isNotLastExample && <button onClick={this.nextExample} className="nextExam"> next example  ►</button>}
        </p>
        <div className="display">
          {sentance}
          <div className="word menu">
              <p><button className="butAll" onClick={this.showAll}>all</button></p>
              <p className={this.state.showCls && 'active'}><button className="cls" onClick={this.toogleCls}>class</button></p>
              <p className={this.state.showGrammar && 'active'}><button className="butGra" onClick={this.toogleGrammar}>grammar</button></p>
              <p className={this.state.showFunction && 'active'}><button className="fun" onClick={this.toogleFunction}>function</button></p>
              <p className={this.state.showMeaning && 'active'}><button className="gls" onClick={this.toogleMeaning}>meaning</button></p>
              <p className={this.state.showTrans && 'active'}><button className="butTra" onClick={this.toogleTranslation}>translation</button></p>
          </div>
        </div>
        {this.state.showTrans && <div className="translation">{translation}</div>}
        <div className="nextprev">
          <p>
            {isNotFirtSentence && <button onClick={this.previous}>◀</button>}
            {isNotLastSentence && <button onClick={this.next}>►</button>}
          </p>
        </div>
      </div>
    );
  }
}

export default Sentence;