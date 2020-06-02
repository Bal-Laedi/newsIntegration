import React,{ Component } from 'react';
import db from './initial_firebase';

class Sidebar_item extends Component{
	constructor(props){
		super(props);
		this.state = {check: true};
		this.toggle_dataSrc = this.toggle_dataSrc.bind(this);
	}

	toggle_dataSrc(evt){
		this.props.change_dataSrc_arr(this.state.check,evt.target.getAttribute("collection"))
		this.setState({check: !this.state.check}, ()=>{console.log("hwbjahbfkbf")} );
		//;//Maybe need to use callback after setState
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
		console.log('in sidebar ctr')
		super();
		this.state = {data_source_arr: []};
		this.change_dataSrc_arr = this.change_dataSrc_arr.bind(this);
		let all_data_src = [];
		db.collection('data_source').get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
   				this.setState(state => {
    				//不能用push https://www.robinwieruch.de/react-state-array-add-update-remove
   					const data_source_arr = this.state.data_source_arr.concat({'id':doc.id , 'collection':doc.data().collection , 'name':doc.data().name, 'check': true});
   					all_data_src.push(doc.data().collection)
   					return {data_source_arr};
   				})
			})
			//this.props.choose_DataSrc(all_data_src)
		})
	}

	componentDidMount(){
		console.log('in sidebar componentDidMount')
	}

	change_dataSrc_arr(check, changed_collection){

		//change state data_source_arr 
		for(let i=0; i<this.state.data_source_arr.length; i=i+1){
			if(changed_collection === this.state.data_source_arr[i].collection){
				this.state.data_source_arr[i].check = !check;
				console.log(this.state.data_source_arr[i].check, changed_collection)
				break;
			}
		}

		let check_dataSrc = []
		for(let i=0; i<this.state.data_source_arr.length; i=i+1){
			if(this.state.data_source_arr[i].check){
				check_dataSrc.push(this.state.data_source_arr[i].collection);
			}
		}
		this.props.choose_DataSrc(check_dataSrc);
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
								<Sidebar_item key={doc.id} collection={doc.collection} data_source={doc.name} change_dataSrc_arr={this.change_dataSrc_arr}/>
    						)
    					})	
					}
        			
    			</div>
			</div>
				
		);
	}


}

export default Sidebar;