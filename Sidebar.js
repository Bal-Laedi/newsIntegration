import React,{ Component } from 'react';
import db from './initial_firebase';
import { connect } from 'react-redux';
import { toggleNewSource, addDataSource, emptyNews} from './actions/action';
import './Sidebar.css';

class Sidebar_item extends Component{
	constructor(props){
		super(props);
		this.state = {hover: false}
		this.toggleHover = this.toggleHover.bind(this);
		this.toggleCheck = this.toggleCheck.bind(this);
	}

	toggleHover(){
		this.setState({
			hover: !this.state.hover
		})
	}

	toggleCheck(){
		if((this.props.data_src_arr.length > 1) || (this.props.check === false)){
			this.props.toggleNewSource();
		}
	}

	render(){
		let chooseMark;
		let fontColor;
		let mobile_viewport = window.matchMedia("(max-width: 641px)");
		if(this.props.check){
			if(!this.state.hover || mobile_viewport.matches){
        		chooseMark = 
        			<svg className="svg-icon" onClick={this.toggleCheck} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} viewBox="0 0 20 20" style = {{ fill : "#DBA513" }}>						
						<line x1="10" y1="0" x2="10" y2="20"/>
					</svg>
				fontColor = "#DBA513";
			}
			else{
				chooseMark = 
        			<svg className="svg-icon" onClick={this.toggleCheck} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} viewBox="0 0 25 25">
						<path fill="#D8BD71" d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
					</svg>
				fontColor = "#D8BD71";
			}
		}
        else{
        	if(!this.state.hover || mobile_viewport.matches){
        		chooseMark = 
        			<svg className="svg-icon" onClick={this.toggleCheck} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} width="0" height="0" viewBox="0 0 20 20">							
					</svg>
				fontColor = "#FFF";
			}
			else{
				chooseMark =
					<svg className="svg-icon" onClick={this.toggleCheck} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} viewBox="0 0 20 20">
						<path fill="#D8BD71" d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"></path>
					</svg>
				fontColor = "#D8BD71";
			}
        }

        

		return(
			<div className="Sidebar_item" collection={this.props.collection} >
        		{chooseMark}
        		<div className="news-source" onClick={this.toggleCheck} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} style={{ color: fontColor}}>
        			{this.props.data_source}
        		</div>
        	</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
	//ownProps.key always undefined(don't know why) 
	check: state.dataSrcFilter.filter(dataSrc => dataSrc.id === ownProps.id)[0].check,
	data_src_arr: state.dataSrcFilter.filter(dataSrc => dataSrc.check === true)
									 .map(obj => obj.collection)
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
