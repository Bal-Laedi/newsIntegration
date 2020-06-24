import React,{ Component } from 'react';
import db from './initial_firebase';
import Pagination from './Pagination';
import GridContainer from './GridContainer';
import './Project.css';








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
			
			let page = 3;
			let nineNews = [];
			for(let i=0;i<page;i++){
				for(let j=0;j<9;j++){
					let doc = querySnapshot.docs[i*9+j];
					nineNews.push({'id':doc.id ,'href':doc.data().href,'image':doc.data().image,'title':doc.data().title, 'date':doc.data().date, 'data_src': doc.data().data_src});
    				
    			}
    			this.props.addNews(nineNews)
    			nineNews = [];
			}	

    	})
    }

    componentDidUpdate(prevProps){
    	if(this.props.newsList.length === 0 && prevProps.newsList.length > 0){	//change data_src_arr
    		db.collection(this.state.data).orderBy("date", "desc").where('data_src', 'in', this.props.data_src_arr).get().then((querySnapshot) => {	
				for(let i=0;i<9;i++){
					let doc = querySnapshot.docs[i];
    				this.props.addNews({'id':doc.id ,'href':doc.data().href,'image':doc.data().image,'title':doc.data().title, 'date':doc.data().date, 'data_src': doc.data().data_src})
				}
    		})
    	}
    }


	render(){
		
    	if(this.props.newsList.length > 0){
			return(
				<div className='Projects'>
					{
						this.props.newsList.map((nineNews)=>{
							return(
								<GridContainer nineNews={nineNews}/>
							)
						})
					}
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