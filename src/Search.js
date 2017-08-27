import React, { Component } from 'react';
import './App.css';
import Find from './lib/Find.js'


class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {query: '', found: false}
	}
	search = Find
	doSearch = (e) => {
		let string = e.currentTarget.value;
		let found = this.search(string, 0)
    	this.setState({found: found})
	}
	render() {
		const isFound = this.state.found
		const {tib, wy, spel, dra} = this.state.found
		return(
			<div className="search">
				<p className="query">
					<input type="text" placeholder="query Tib. syllabe" onChange={this.doSearch} className="queryInput"/>
				</p>

				{isFound && <div className="found" >
					<h2>
						<span className="ex">found:</span> <span className="tib">{tib}</span> &nbsp;
						<span className="ex">wylie:</span>  <em>{wy}</em> &nbsp;
						<span className="ex">drajyig:</span> {dra}
					</h2>
					<audio autoPlay id={wy}>
						<source src={spel} type="audio/mpeg" />
					</audio>
				</div>}
			</div>
		);
	}
}

export default Search;