import React,{ Component } from 'react';
import Navbar from './Navbar';
import './Navbar.css';
import './Project.css';

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");


var firebaseConfig = {
    apiKey: "AIzaSyA3a7JPso-jCL06Eepb3D4sTWpM2nMqfRQ",
    authDomain: "newsintegration.firebaseapp.com",
    databaseURL: "https://newsintegration.firebaseio.com",
    projectId: "newsintegration",
    storageBucket: "newsintegration.appspot.com",
    messagingSenderId: "1025719057822",
    appId: "1:1025719057822:web:36037bcb29a8e67e5b6a8f",
    measurementId: "G-NJ0250XDSR"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 //firebase.analytics();

/*firebase.initializeApp({
  apiKey: 'AIzaSyA3a7JPso-jCL06Eepb3D4sTWpM2nMqfRQ',
  authDomain: 'newsintegration.firebaseapp.com',
  projectId: 'newsintegration'
});*/

var db = firebase.firestore();




class Project extends Component{
	constructor(props){
		super(props);
		this.state = {like: false}
		this.like = this.like.bind(this);	//為了讓this`能在like中被使用
	}

	componentDidMount(){
		let likeMatch = db.collection("like").where("title", "==", this.props.title).get()
		.then((querySnapshot) =>{
			if(querySnapshot.size === 0){
				this.setState({like: false});
			}
			else{
				this.setState({like: true});
			}
		});
		
	}

	like(){
		
		if(!this.state.like){
			db.collection("like").doc(this.props.cardId).set({
				'href': this.props.href,
				'image': this.props.image,
				'title': this.props.title,
				'date': this.props.date
			})
			.then(()=>{
				this.setState({like: !this.state.like});
			    alert("已收藏");
			})
	    }
	    else{
	    	db.collection("like").doc(this.props.cardId).delete().then(()=>{
	    		this.setState({like: !this.state.like});
    			alert("已取消收藏");
			})
	    }

	}

	render(){
		let likeButton;
		if(!this.state.like){
			likeButton = <button onClick={this.like}><img src="https://img.icons8.com/material-outlined/24/000000/filled-like.png"/></button>;
		}
		else{
			likeButton = <button onClick={this.like}><img src="https://img.icons8.com/cute-clipart/64/000000/like.png"/></button>;
		}
		return(
			<div className = 'Project'>
				<div>未來商務關鍵科技</div>
					<img src = {this.props.image} />
					<div>{this.props.title}</div>
					<div>
						{likeButton}
						<button><a href={this.props.href}><img src="https://img.icons8.com/ios-glyphs/30/000000/read.png"/></a></button>
					</div>
			</div>
		);
	}
}


//////////////////////////////////////////////////////////////////////////
//solution: https://stackoverflow.com/questions/27192621/reactjs-async-rendering-of-components
//////////////////////////////////////////////////////////////////////////
class Projects extends Component{//prop 給collection名稱
	constructor(){
		super();
		this.state = {testArr: [],data: "fc_keyTech"};
		this.whichData = this.whichData.bind(this);
	}

	componentDidMount(){
		console.log("in componentDidMount")
		db.collection(this.state.data).orderBy("date", "desc").limit(10).get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
    			this.setState(state => {
    				//不能用push https://www.robinwieruch.de/react-state-array-add-update-remove
    				const testArr = this.state.testArr.concat({'id':doc.id ,'href':doc.data().href,'image':doc.data().image,'title':doc.data().title, 'date':doc.data().date});
    				return {testArr};
    			})
			})
    	})
	}

	componentDidUpdate(prevProps, prevState){
		if(this.state.data !== prevState.data){
			db.collection(this.state.data).orderBy("date", "desc").limit(10).get().then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
    				this.setState(state => {
    					//不能用push https://www.robinwieruch.de/react-state-array-add-update-remove
    					const testArr = this.state.testArr.concat({'id':doc.id ,'href':doc.data().href,'image':doc.data().image,'title':doc.data().title, 'date':doc.data().date});
    					return {testArr};
    				})
				})
    		})
		}
	}


	whichData(evt){
		console.log("click",evt.target.textContent);
		if(this.state.data !== evt.target.textContent){
			this.setState({testArr: [], data: evt.target.textContent});
		}
	}

	render(){
		
    	if(this.state.testArr.length > 0){
			return(
				<div className='container'>
					<Navbar whichData={this.whichData}/>
					<div className='Projects'>
						{	
							this.state.testArr.map((doc) => {				
    							return(
									<Project cardId={doc.id} image={doc.image} title={doc.title} href={doc.href} date={doc.date}/>
    							)
    						})	
						}
					</div>
				</div>
			)
		}
		else{
			return( 
				<div>
				<Navbar whichData={this.whichData}/>
				<div>Loading</div>
				</div>
			)
		}
	}
}

export default Projects;