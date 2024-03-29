import React,{ Component } from 'react';
import './Navbar.scss';

class Navbar extends Component{
	constructor(){
		super();
	}

	render(){
		return(
			<span className="Navbar">
					<div className="nav-item nav-icon" >
						<svg className="hamburger-menu" viewBox="0 0 20 20" uk-toggle="target: #offcanvas-overlay">
							<path fill="white" d="M3.314,4.8h13.372c0.41,0,0.743-0.333,0.743-0.743c0-0.41-0.333-0.743-0.743-0.743H3.314
								c-0.41,0-0.743,0.333-0.743,0.743C2.571,4.467,2.904,4.8,3.314,4.8z M16.686,15.2H3.314c-0.41,0-0.743,0.333-0.743,0.743
								s0.333,0.743,0.743,0.743h13.372c0.41,0,0.743-0.333,0.743-0.743S17.096,15.2,16.686,15.2z M16.686,9.257H3.314
								c-0.41,0-0.743,0.333-0.743,0.743s0.333,0.743,0.743,0.743h13.372c0.41,0,0.743-0.333,0.743-0.743S17.096,9.257,16.686,9.257z"></path>
						</svg>
					</div>
					<div className="nav-item"></div>
					<div className="nav-item nav-title" >NewsIntegration</div>
					<div className="nav-item" >Wilson</div>
					<div className="nav-item">Partical</div>
			</span>
		)
	}
}

export default Navbar;