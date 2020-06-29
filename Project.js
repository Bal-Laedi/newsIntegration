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
		this.myRef = React.createRef();
		this.loadedGridNum = 3;
		this.lastLoadedNews = null;
	}

	componentDidMount(){
		console.log("in componentDidMount")
		
		window.addEventListener('scroll', function(e) {
			//https://stackoverflow.com/questions/2481350/how-to-get-scrollbar-position-with-javascript
			let Projects_scrollx;
			//if(this.myRef !== null){
			if(this.myRef.current !== undefined){
			
				Projects_scrollx = window.scrollX - this.myRef.current.offsetLeft;
				//console.log('Projects_scrollx', Projects_scrollx);
				
				let nineGridWidth = this.myRef.current.childNodes[0].offsetWidth;
				//console.log('now at page', Math.ceil(Projects_scrollx/nineGridWidth));
				
				let atPage = Math.ceil(Projects_scrollx/nineGridWidth);
				if((atPage + 6) > this.loadedGridNum){
					//console.log('need to load news to ',atPage + 6)
					db.collection(this.state.data).orderBy("date", "desc").startAfter(this.lastLoadedNews).limit(((atPage + 6) - this.loadedGridNum)*9)
					.get().then((querySnapshot) => {
						let page = (atPage + 6) - this.loadedGridNum;
						let nineNews = [];
						for(let i=0;i<page;i++){
							for(let j=0;j<9;j++){
								let doc = querySnapshot.docs[i*9+j];
								nineNews.push({'id':doc.id ,'href':doc.data().href,'image':doc.data().image,'title':doc.data().title, 'date':doc.data().date, 'data_src': doc.data().data_src});
    						}
    						this.props.addNews(nineNews);
    						nineNews = [];
						}
						this.lastLoadedNews = querySnapshot.docs[querySnapshot.docs.length-1];
						//console.log(this.lastLoadedNews.data().title)
						this.loadedGridNum = atPage + 6;
					})
				}
			}

		}.bind(this))

		
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
			this.lastLoadedNews = querySnapshot.docs[page*9-1];
			console.log('this.lastLoadedNews',this.lastLoadedNews.data())

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
    	
		//if(this.myRef.current !== null){console.log("Projects",this.myRef.current.offsetWidth);}//,offsetWidth
    }

    


	render(){
		
    	if(this.props.newsList.length > 0){
			return(
				<div className='Projects' ref={this.myRef}>
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
				<div ref={this.myRef}>
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