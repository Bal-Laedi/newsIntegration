import React,{ Component } from 'react';
import './Pagination.css'

class Pagination extends Component{
	constructor(props){
		super(props);
	}

	gotoPage(evt){
		console.log("go to page: ",evt.target.textContent);
	}

	render(){
		let buttonList = [];
		for(var i=1; i<=this.props.pageNum; i=i+1){
			buttonList.push(<button onClick={this.props.whichData} >{i}</button>)
		}
		return(
			<div className="Pagination">
				{buttonList}
			</div>
		)
	}
}

export default Pagination;