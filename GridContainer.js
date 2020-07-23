import React,{ Component } from 'react';
import db from './initial_firebase';

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
			<div className = 'Project' style = {{ backgroundImage: "url(" + this.props.image + ")" }}>
				<a className = 'mask' href = {this.props.href} target = "_blank">
				<div className = "news-content Project-title"><strong>{this.props.title}</strong></div>
				<div className = "description-parent">
					<div className = "news-content Project-description">{this.props.description}</div>
				</div>
				</a>
					{/*}<div>{this.props.data_src}</div>
					<div>
						{likeButton}
						<button><a href={this.props.href}><img src="https://img.icons8.com/ios-glyphs/30/000000/read.png"/></a></button>
					</div>{*/}
			</div>
		);
	}
}



class GridContainer extends Component{
	constructor(props){	
		super(props);
	}

	render(){
		return(
		<div className='GridContainer'>
			{
				this.props.nineNews.map((doc) => {

    				return(
						<Project key={doc.id} cardId={doc.id} image={doc.image} title={doc.title} href={doc.href} date={doc.date} data_src={doc.data_src} description={doc.description}/>
    				)
 				})
 			}
		</div>
		)
	}
}

 export default GridContainer;