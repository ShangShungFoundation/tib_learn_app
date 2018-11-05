import React, { Component } from 'react';
import TibText from '../lib/TibText.js'
// import Fetcher from './Fetcher'

const URL = 'https://sheets.googleapis.com/v4/spreadsheets/1D6NW7phdjwmz7bnncNgJcwNVgwn39SsOCVvZ403VilE/values/syllables_unique!A2:D4045?key=AIzaSyCSZo1p3NxY73vcsDo554y3chNSTp4uhqY'

// const qs = require('query-string');


class SpellChecker extends Component {
	constructor(props) {
		super(props);
		// const query = qs.parse(this.props.location.search);
		let tibText = decodeURIComponent(this.props.location.search).substring(1)
		this.state = {query: tibText, loaded: false}
		
	}
	
	componentDidMount() {
		fetch(URL)
			.then((response) => response.json())
			.then((json) =>{ this.syllabes = json
				this.setState({loaded: true}) })
			.catch((error) => console.log('error', error))
	}

	doSpell = (e) => {
		//e.preventDefault();
    	this.setState({query: e.currentTarget.value})
	}
	render() {
		const query = this.state.query.trim()
		const isQuery = (this.state.query !== '')
		const syllabes = this.syllabes
		return(
			<div className="search">
				<h2>Tibetan spell check</h2>
				<p className="info">Copy/Paste line of tibetan text into the box below</p>
				<p className="query">
					<input type="text" placeholder="Tib. text to spellcheck" onChange={this.doSpell} defaultValue={this.state.query} className="queryInput"/>
				</p>
				{isQuery && this.state.loaded && <TibText text={query} syllabes={syllabes} spacer wylie /> }
				<p>
					You can spell tibetan text putting it at the end of this page direction
					<a href="?ཞལ་གདམས་མདོར་བསྡུས།" >ཞལ་གདམས་མདོར་བསྡུས།</a>
				</p>
			</div>
		);
	}
}

export default SpellChecker;