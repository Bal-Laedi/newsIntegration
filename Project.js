import React,{ Component } from 'react';
import db from './initial_firebase';
import Pagination from './Pagination';
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
		this.state = {data: "all_news",page: 1, totalPage: 1};
	}

	componentDidMount(){
		console.log("in componentDidMount")

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

    componentDidUpdate(prevProps){
    	if(this.props.newsList.length === 0 && prevProps.newsList.length > 0){	//change data_src_arr
    		db.collection(this.state.data).orderBy("date", "desc").where('data_src', 'in', this.props.data_src_arr).get().then((querySnapshot) => {	
				for(let i=0;i<12;i++){
					let doc = querySnapshot.docs[i];
    				this.props.addNews({'id':doc.id ,'href':doc.data().href,'image':doc.data().image,'title':doc.data().title, 'date':doc.data().date, 'data_src': doc.data().data_src})
				}
    		})
    	}
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