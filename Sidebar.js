import React,{ Component } from 'react';
import db from './initial_firebase';
import { connect } from 'react-redux';
import { toggleNewSource, addDataSource, emptyNews} from './actions/action';
import './Sidebar.css';

class Sidebar_item extends Component{
	constructor(props){
		super(props);
	}

	render(){
		let chooseMark;
		let fontColor;
		if(this.props.check){
        	chooseMark = 
        		<svg className="svg-icon"  viewBox="0 0 20 20" choose="true"  style = {{ fill : "#DBA513" }}>						
					<line x1="8" y1="0" x2="8" y2="20"/>
				</svg>
			fontColor = "#DBA513";
		}
        else{
        	chooseMark = 
        		<svg className="svg-icon" width="0" height="0" viewBox="0 0 20 20" choose="false">							
				</svg>
			fontColor = "#FFF";
        }
		return(
			<div className="Sidebar_item" collection={this.props.collection} onClick={this.props.toggleNewSource} style = {{ color : fontColor}}>
        		{chooseMark}
        		<div>{this.props.data_source}</div>
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
        			<div className='Sidebar-title'>Sources</div>
        			{	
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
