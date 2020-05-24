import React,{ Component } from 'react';
import db from './initial_firebase';

class Sidebar_item extends Component{
	constructor(props){
		super(props);
		this.state = {check: true};
		this.toggle_dataSrc = this.toggle_dataSrc.bind(this);
	}

	toggle_dataSrc(){
		this.setState({check: !this.state.check});
	}

	render(){
		let checkMark;
		if(this.state.check){
        	checkMark = 
        		<svg className="svg-icon" width="24" height="24" viewBox="0 0 20 20">
					<path fill="green" d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"></path>						
				</svg>
        }
        else{
        	checkMark = 
        		<svg className="svg-icon" width="0" height="0" viewBox="0 0 20 20">
					<path fill="green" d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"></path>						
				</svg>
        }
		return(
			<div className="Sidebar_item" collection={this.props.collection} onClick={this.toggle_dataSrc}>
        		{this.props.data_source}
        		{checkMark}
        	</div>
		)
	}
}


class Sidebar extends Component{
	
	constructor(){
		super();
		this.state = {data_source_arr: []};
	}

	componentDidMount(){
		db.collection('data_source').get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
   				this.setState(state => {
    							//不能用push https://www.robinwieruch.de/react-state-array-add-update-remove
   					const data_source_arr = this.state.data_source_arr.concat({'id':doc.id , 'collection':doc.data().collection ,'name':doc.data().name});
   					return {data_source_arr};
   				})
			})			
		})
	}

	render(){

		return(
			
			<div id="offcanvas-overlay" data-uk-offcanvas="overlay: true">
    			<div className="uk-offcanvas-bar">
        			<button className="uk-offcanvas-close" type="button" data-uk-close></button>
        			<h3>新聞來源</h3>
        			{	
						this.state.data_source_arr.map((doc) => {				
    						return(
								<Sidebar_item key={doc.id} collection={doc.collection} data_source={doc.name}/>
    						)
    					})	
					}
        			
    			</div>
			</div>
				
		);
	}


}

export default Sidebar;