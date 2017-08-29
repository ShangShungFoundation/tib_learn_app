import React, { Component } from 'react';
import './App.css';
import TibText from './TibText.js'


class SpellChecker extends Component {
	constructor(props) {
		super(props);
		let query = decodeURIComponent(this.props.location.search).substring(1)
		this.state = {query: query}
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

				{isQuery && <TibText text={query} /> }
			</div>
		);
	}
}

export default SpellChecker;