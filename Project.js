import React,{ Component } from 'react';
import db from './initial_firebase';
import Navbar from './Navbar';
import Pagination from './Pagination';
import Sidebar from './Sidebar';
import './Navbar.css';
import './Project.css';




class Project extends Component{
	constructor(props){
		super(props);
		this.state = {like: false}
		this.like = this.like.bind(this);	//為了讓this`能在like中被使用
	}

	componentDidMount(){
		db.collection("like").where("title", "==", this.props.title).get()
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
				'date': this.props.date,
				'data_src': this.props.data_src
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
				<div>{this.props.data_src}</div>
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
	constructor(props){	
		super(props);	//props: newsList, addNews(redux)
		//this.state = {testArr: [],data: "all_news",page: 1, totalPage: 1, data_src: []};
		console.log("props: new",this.props.newsList)
		console.log("props: add", this.props.addNews)
		this.state = {data: "all_news",page: 1, totalPage: 1, data_src: []};
		this.whichData = this.whichData.bind(this);
		this.choose_DataSrc = this.choose_DataSrc.bind(this);
	}

	componentDidMount(){
		console.log("in componentDidMount")
		//var next;
		db.collection(this.state.data).orderBy("date", "desc").get().then((querySnapshot) => {
			/*let lastNews = querySnapshot.docs[querySnapshot.docs.length-1];
			console.log(lastNews.data().title);
			next = db.collection(this.state.data).orderBy("date", "desc").startAfter(lastNews).limit(12)*/
			this.setState({ totalPage: Math.ceil(querySnapshot.docs.length/12) });	//calculate total Page nember
			
			for(let i=0;i<12;i++){
				let doc = querySnapshot.docs[i];
				/*this.setState(state => {
    				//不能用push https://www.robinwieruch.de/react-state-array-add-update-remove
    				const testArr = this.state.testArr.concat({'id':doc.id ,'href':doc.data().href,'image':doc.data().image,'title':doc.data().title, 'date':doc.data().date, 'data_src': doc.data().data_src});
    				return {testArr};
    			})*/
    			this.props.addNews({'id':doc.id ,'href':doc.data().href,'image':doc.data().image,'title':doc.data().title, 'date':doc.data().date, 'data_src': doc.data().data_src})
			}

    	})
    	
    }

	/*componentDidUpdate(prevProps, prevState){
		
		if(this.state.data !== prevState.data){
			
			db.collection(this.state.data).orderBy("date", "desc").where('data_src', 'in', this.state.data_src).limit(12).get().then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
    				this.setState(state => {
    					//不能用push https://www.robinwieruch.de/react-state-array-add-update-remove
    					const testArr = this.state.testArr.concat({'id':doc.id ,'href':doc.data().href,'image':doc.data().image,'title':doc.data().title, 'date':doc.data().date, 'data_src': doc.data().data_src});
    					return {testArr};
    				})
				})
    		})
		}
		else if(this.state.page !== prevState.page || this.state.data_src !== prevState.data_src){
			console.log('in change page');
			let lastNews, nextPage;
			if(this.state.page !== 1){
				db.collection(this.state.data).orderBy("date", "desc").where('data_src', 'in', this.state.data_src).limit(12 * (this.state.page-1)).get().then((querySnapshot) => {
					lastNews = querySnapshot.docs[querySnapshot.docs.length-1];
					nextPage = db.collection(this.state.data).orderBy("date", "desc").where('data_src', 'in', this.state.data_src).startAfter(lastNews).limit(12);
				})
				.then(() =>{
    				nextPage.get().then((querySnapshot) => {
    					querySnapshot.forEach((doc) => {
    						this.setState(state => {
    							//不能用push https://www.robinwieruch.de/react-state-array-add-update-remove
   								const testArr = this.state.testArr.concat({'id':doc.id ,'href':doc.data().href,'image':doc.data().image,'title':doc.data().title, 'date':doc.data().date, 'data_src': doc.data().data_src});
   								return {testArr};
   							})				
    					})
    				})
    			})
			}
			else{	//this.state.page = 1
				db.collection(this.state.data).orderBy("date", "desc").where('data_src', 'in', this.state.data_src).limit(12).get().then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
    					this.setState(state => {
    						//不能用push https://www.robinwieruch.de/react-state-array-add-update-remove
   							const testArr = this.state.testArr.concat({'id':doc.id ,'href':doc.data().href,'image':doc.data().image,'title':doc.data().title, 'date':doc.data().date, 'data_src': doc.data().data_src});
   							return {testArr};
   						})				
    				})
    			})
			}
		}
		
	}*/


	whichData(evt){
		console.log("click",evt.target.textContent);
		
		if((isNaN(evt.target.textContent)) && (this.state.data !== evt.target.textContent)){		//change page between like | history | home
			this.setState({testArr: [], data: evt.target.textContent, page: 1, totalPage: 1});
		}
		else if(this.state.page != evt.target.textContent){	//change page number
			console.log('in setState page');
			this.setState({testArr: [], page: parseInt(evt.target.textContent)});
		}
	}

	choose_DataSrc(collection){
		console.log("Sidebar", collection);
		this.setState({testArr: [], data_src: collection.slice(), page: 1});
	}

	render(){
		
    	//if(this.state.testArr.length > 0){
    	if(this.props.newsList.length > 0){
			return(
				<div className='container'>
					
					<div className='Projects'>
						{	
							this.props.newsList.map((doc) => {				
    							return(
									<Project key={doc.id} cardId={doc.id} image={doc.image} title={doc.title} href={doc.href} date={doc.date} data_src={doc.data_src}/>
    							)
    						})	
						}
						
					</div>
					<Pagination pageNum={this.state.totalPage} whichData={this.whichData}/>
				</div>
			)
		}
		else{
			return( 
				<div>
					<div>Loading</div>
				</div>
			)
		}
	}//end of render()
}

/*Projects.propTypes = {
  	newsList: React.PropTypes.arrayOf(PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    href: React.PropTypes.string.isRequired,
	image: React.PropTypes.string.isRequired,
	title: React.PropTypes.string.isRequired,
	date: React.PropTypes.string.isRequired,
	data_src: React.PropTypes.string.isRequired
  }).isRequired).isRequired,
  addNews: React.PropTypes.func.isRequired
}*/

export default Projects;