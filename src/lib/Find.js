


function strip(string) {
	string = string.replace(/[༄༅།༼༽༈༾༿༴྾྾༑☸༎༔\- ]*/g, '')
	if (!string.endsWith('་'))
		string = `${string}་`
	return string
}


const Find = (syllabes, string, isWylie) => {
	let clean = (isWylie)? string : strip(string);
	let rows = syllabes.values;
	for(var row in rows){
		if (rows[row][isWylie * 1] === clean) {
			let res = rows[row]
			let tib = (isWylie)? res[0] : string
			return {tib: tib, wy: res[1], spel: res[3], dra: res[2], clean: clean}
		}
	}
	return false
}

export default Find;