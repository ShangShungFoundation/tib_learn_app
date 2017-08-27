import React, { Component } from 'react';
import './App.css';
import syllabes from './syllabes.json'
import Syllabe from './Syllabe.js'

const URL = 'https://raw.githubusercontent.com/ShangShungFoundation/tib_learn_app/master/src/'


const Tip = ({wy, dra, spel}) => 
	<div className="tip">
		<p className="wy">{wy}</p>
		<p className="dra">{dra}</p>
		<audio autoPlay>
			<source src={spel} type="audio/mpeg" />
		</audio>
	</div>


class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {query: '', found: false}
	}
	search = (string, wylie) => {
		if (!string.endsWith('་')) 
			string = `${string}་`
		let rows = syllabes.values;
		for(var row in rows){
			if (rows[row][0] === string) {
				let res = rows[row]
				let spel = `${URL}assets/mp3/sylabes/${res[2]}`
				return {tib: res[0], wy: res[1], spel: spel, dra: res[3]}
			}
		}
		return false
	}
	doSearch = (e) => {
		let string = e.currentTarget.value;
		let found = this.search(string, 0)
    	this.setState({found: found})
	}
	render() {
		const query = this.state.query
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
					<audio autoPlay>
						<source src={spel} type="audio/mpeg" />
					</audio>
				</div>}
			</div>
		);
	}
}

export default Search;