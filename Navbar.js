import React,{ Component } from 'react';
import './Navbar.css';

class Navbar extends Component{
	constructor(){
		super();
	}

	render(){
		return(
			<span className="Navbar">
					<div className="nav-item" uk-toggle="target: #offcanvas-overlay">icon</div>
					<div className="nav-item nav-title" >NewsIntegration</div>
					<div className="nav-item" >Wilson</div>
					<div className="nav-item">Partical</div>
			</span>
		)
	}
}

export default Navbar;