import React, { Component } from 'react';
import './App.css';

const URL = 'https://shangshungfoundation.github.io/tib_learn_app/'

const Tip = ({wy, dra, spel}) => 
	<div className="tip">
		<p className="wy">{wy}</p>
		<p className="dra">{dra}</p>
		{ (spel !== '' ) &&
		<audio autoPlay key={wy}>
			<source src={`${URL}assets/mp3/sylabes/${encodeURIComponent(spel)}`} type="audio/mpeg" />
		</audio>
		}
	</div>


class Syllabe extends Component {
	constructor(props) {
		super(props);
		this.state = {showTip: false}
	}
	toogleTip = () => {
	    this.setState({showTip: !this.state.showTip})
	}
	render() {
		const {tib, wy, dra, spel} = this.props
		if (this.props.wy === undefined)
			return(
				<div className="syll"><a className="tib notFound">{tib}</a></div>
			);
		else
			return(
				<div className="syll">
					{this.state.showTip && <a onClick={this.toogleTip}>
						<Tip wy={wy} dra={dra} spel={spel} /></a>}
					<a onClick={this.toogleTip} className="tib">{tib}</a>
				</div>
			);
	}
}

export default Syllabe;