import React,{ Component } from 'react';


class Navbar extends Component{
	constructor(props){
		super(props);
		console.log('in navbar ctr')
	}

	render(){
		return(
			<div className="Navbar">
				<div>
					<span className="nav-item" data-uk-toggle="target: #offcanvas-overlay">filter</span>
					<span className="nav-item" onClick={this.props.whichData}>like</span>
					<span className="nav-item" >history</span>
					<span className="nav-item">Signin</span>
				</div>
			</div>
		)
	}
}

export default Navbar;