import React,{ Component } from 'react';
import db from './initial_firebase';
import { connect } from 'react-redux';
import { toggleNewSource, addDataSource, emptyNews} from './actions/action';

class Sidebar_item extends Component{
	constructor(props){
		super(props);
	}

	render(){
		let checkMark;
		if(this.props.check){
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
			<div className="Sidebar_item" collection={this.props.collection} onClick={this.props.toggleNewSource}>
        		{this.props.data_source}
        		{checkMark}
        	</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
	//ownProps.key always undefined(don't know why) 
	check: state.dataSrcFilter.filter(dataSrc => dataSrc.id === ownProps.id)[0].check
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	toggleNewSource : () => {
		dispatch(toggleNewSource(ownProps))
		dispatch(emptyNews())
	}
})

let ChooseDataSrc = connect(
	mapStateToProps,
	mapDispatchToProps
)(Sidebar_item)


class Sidebar extends Component{
	
	constructor(props){
		super(props);
	}


	render(){

		return(
			
			<div id="offcanvas-overlay" data-uk-offcanvas="overlay: true">
    			<div className="uk-offcanvas-bar">
        			<button className="uk-offcanvas-close" type="button" data-uk-close></button>
        			<h3>新聞來源</h3>
        			{	
						//this.state.data_source_arr.map((doc) => {
						this.props.data_source_arr.map((doc) => {	
    						return(
								<ChooseDataSrc key={doc.id} id={doc.id} collection={doc.collection} data_source={doc.name}/>
    						)
    					})	
					}
        			
    			</div>
			</div>
				
		);
	}


}

const mapStateToProps_Sidebar = (state) => ({
	data_source_arr: state.dataSrcFilter
})

const mapDispatchToProps_Sidebar = (dispatch) => ({
	addDataSource : (dataSrc) => dispatch(addDataSource(dataSrc))
})

export default  connect(
	mapStateToProps_Sidebar,
	mapDispatchToProps_Sidebar
)(Sidebar)
