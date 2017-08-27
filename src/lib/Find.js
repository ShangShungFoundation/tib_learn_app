import React from 'react';
import axios from 'axios';
import syllabes from '../syllabes.json'

// const Find = (string, wylie) => {
// 	string = string.trim()
// 	if (string.endsWith('།'))
// 		string = `${string.slice(0, -1)}་`
// 	if (!string.endsWith('་'))
// 		string = `${string}་`
// 	let rows = syllabes.values;
// 	for(var row in rows){
// 		if (rows[row][0] === string) {
// 			let res = rows[row]
// 			return {tib: res[0], wy: res[1], spel: res[2], dra: res[3]}
// 		}
// 	}
// 	return false
// }

const syllabesURL = 'https://sheets.googleapis.com/v4/spreadsheets/1D6NW7phdjwmz7bnncNgJcwNVgwn39SsOCVvZ403VilE/values/syllabes-unique!A2%3AC4056?key=AIzaSyCSZo1p3NxY73vcsDo554y3chNSTp4uhqY'

class Find extends React.Component {
	constructor(props) {
	    super(props);
	    this.data = {}
	}
	componentDidMount() {
	    axios.get(`http://www.reddit.com/r/${this.props.subreddit}.json`)
	      .then(res => {
	        const posts = res.data.data.children.map(obj => obj.data);
	    });
	}
	search(string) {
	    string = string.trim()
		if (string.endsWith('།'))
			string = `${string.slice(0, -1)}་`
		if (!string.endsWith('་'))
			string = `${string}་`
		let rows = syllabes.values;
		for(var row in rows){
			if (rows[row][0] === string) {
				let res = rows[row]
				return {tib: res[0], wy: res[1], spel: res[2], dra: res[3]}
			}
		}
		return false
	}
}
export default Find;