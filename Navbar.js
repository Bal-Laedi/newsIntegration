import React,{ Component } from 'react';
import './Navbar.css';

class Navbar extends Component{
	constructor(){
		super();
	}

	render(){
		return(
			<span className="Navbar">
					{/*}<div className="nav-item" data-uk-toggle="target: #offcanvas-overlay">filter</div>{*/}
					<div className="nav-item" >icon</div>
					<div className="nav-item" >NewsIntegration</div>
					<div className="nav-item" >Wilson</div>
					<div className="nav-item">Partical</div>
			</span>
		)
	}
}

export default Navbar;