import React, { Component } from 'react';
import './App.css';
import TibText from './TibText.js'


class SpellChecker extends Component {
	constructor(props) {
		super(props);
		this.state = {query: ''}
	}
	doSpell = (e) => {
    	this.setState({query: e.currentTarget.value})
	}
	render() {
		const query = this.state.query
		const isQuery = (this.state.query !== '')
		return(
			<div className="search">
				<h2>Tibetan spell check</h2>
				<p className="info">Copy/Paste line of tibetan text into the box below</p>
				<p className="query">
					<input type="text" placeholder="Tib. text to spellcheck" onChange={this.doSpell} className="queryInput"/>
				</p>

				{isQuery && <TibText text={query} /> }
			</div>
		);
	}
}

export default SpellChecker;