import React from 'react';
import axios from 'axios';
import syllabes from '../syllabes.json'

function strip(string) {
	string = string.replace(/[༄༅།༼༽༈༾༿༴྾྾༑☸༎༔༔ ]*/g, '')
	if (!string.endsWith('་'))
		string = `${string}་`
	return string
}


const Find = (string, isWylie) => {
	let clean = (isWylie)? string : strip(string);
	let rows = syllabes.values;
	for(var row in rows){
		if (rows[row][isWylie * 1] === clean) {
			let res = rows[row]
			let tib = (isWylie)? res[0] : string
			return {tib: tib, wy: res[1], spel: res[2], dra: res[3], clean: clean}
		}
	}
	return false
}
export default Find;