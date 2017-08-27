import React, { Component } from 'react';
import './App.css';

const URL = 'https://shangshungfoundation.github.io/tib_learn_app/'

const Tip = ({wy, dra, spel}) => 
	<div className="tip">
		<p className="wy">{wy}</p>
		<p className="dra">{dra}</p>
		<audio autoPlay>
			<source src={spel} type="audio/mpeg" />
		</audio>
	</div>


class Syllabe extends Component {
	constructor(props) {
		super(props);
		this.props = props
		this.spel = `${URL}assets/mp3/sylabes/${encodeURIComponent(props.spel)}`
		this.state = {showTip: false}
	}
	toogleTip = () => {
	    this.setState({showTip: !this.state.showTip})
	}
	render() {
		const {tib, wy, dra} = this.props
		return(
			<div className="syll">
				{this.state.showTip && <a onClick={this.toogleTip}><Tip wy={wy} dra={dra} spel={this.spel}/></a>}
				<a onClick={this.toogleTip} className="tib">{tib}</a>
			</div>
		);
	}
}

export default Syllabe;