import React, { Component } from 'react';
import TibText from '../lib/TibText.js'
import syllabes from '../syllabes.json'

// const qs = require('query-string');


class SpellChecker extends Component {
	constructor(props) {
		super(props);
		// const query = qs.parse(this.props.location.search);
		let tibText = decodeURIComponent(this.props.location.search).substring(1)
		this.state = {query: tibText}
		this.syllabes = syllabes
		// if ('syllabes' in query) {
		// 	this.syllabes = query.syllabes
		// } else {

		// }
			
		// debugger
		
	}
	doSpell = (e) => {
		//e.preventDefault();
    	this.setState({query: e.currentTarget.value})

	}
	render() {
		const query = this.state.query.trim()
		const isQuery = (this.state.query !== '')
		return(
			<div className="search">
				<h2>Tibetan spell check</h2>
				<p className="info">Copy/Paste line of tibetan text into the box below</p>
				<p className="query">
					<input type="text" placeholder="Tib. text to spellcheck" onChange={this.doSpell} defaultValue={this.state.query} className="queryInput"/>
				</p>
				{isQuery && <TibText text={query} syllabes={syllabes} spacer wylie /> }
				<p>
					You can spell tibetan text putting it at the end of this page direction
					<a href="?ཞལ་གདམས་མདོར་བསྡུས།" >ཞལ་གདམས་མདོར་བསྡུས།</a>
				</p>
			</div>
		);
	}
}

export default SpellChecker;