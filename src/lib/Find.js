import syllabes from '../syllabes.json'

const Find = (string, wylie) => {
	string = string.trim()
	if (string.endsWith('།'))
		string = `${string.slice(0, -1)}་`
	if (!string.endsWith('་'))
		string = `${string}་`
	let rows = syllabes.values;
	for(var row in rows){
		if (rows[row][0] === string) {
			let res = rows[row]
			// let spel = `${URL}assets/mp3/sylabes/${encodeURIComponent(res[2])}`
			return {tib: res[0], wy: res[1], spel: res[2], dra: res[3]}
		}
	}
	return false
}

export default Find;