import React,{ Component } from 'react';
import './Navbar.css';

class Navbar extends Component{
	constructor(){
		super();
	}

	render(){
		return(
			<div className="Navbar">
				<div>
					<span className="nav-item" data-uk-toggle="target: #offcanvas-overlay">filter</span>
					<span className="nav-item" >like</span>
					<span className="nav-item" >history</span>
					<span className="nav-item">Signin</span>
				</div>
			</div>
		)
	}
}

export default Navbar;