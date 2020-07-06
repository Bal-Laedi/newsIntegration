import React,{ Component } from 'react';
import db from './initial_firebase';
import Pagination from './Pagination';
import GridContainer from './GridContainer';
import './Project.css';








//////////////////////////////////////////////////////////////////////////
//solution: https://stackoverflow.com/questions/27192621/reactjs-async-rendering-of-components
//////////////////////////////////////////////////////////////////////////
class Projects extends Component{
	constructor(props){	
		super(props);	//props: newsList, addNews(redux)
		this.state = {data: "all_news",page: 1, totalPage: 1};
		this.myRef = React.createRef();
		this.loadedGridNum = 3;
		this.lastLoadedNews = null;

		db.collection('data_source').get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				this.props.addDataSource({'id':doc.id , 'collection':doc.data().collection , 'name':doc.data().name, 'check': true});	
   			})
		})
	}

	componentDidMount(){
		
		window.addEventListener('scroll', function(e) {
			//https://stackoverflow.com/questions/2481350/how-to-get-scrollbar-position-with-javascript
			let Projects_scrollx;
			if(this.myRef.current !== undefined){
			
				Projects_scrollx = window.scrollX - this.myRef.current.offsetLeft;
				let nineGridWidth = this.myRef.current.childNodes[0].offsetWidth;
				let atPage = Math.ceil(Projects_scrollx/nineGridWidth);

				if((atPage + 6) > this.loadedGridNum){
					
					db.collection(this.state.data).orderBy("date", "desc").startAfter(this.lastLoadedNews).where('data_src', 'in', this.props.data_src_arr).limit(((atPage + 6) - this.loadedGridNum)*9)
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
						this.loadedGridNum = atPage + 6;
					})
				}
			}

		}.bind(this))

		let page = 3;
		let nineNews = [];
		db.collection(this.state.data).orderBy("date", "desc").limit(page*9).get().then((querySnapshot) => {

			for(let i=0;i<page;i++){
				for(let j=0;j<9;j++){
					let doc = querySnapshot.docs[i*9+j];
					nineNews.push({'id':doc.id ,'href':doc.data().href,'image':doc.data().image,'title':doc.data().title, 'date':doc.data().date, 'data_src': doc.data().data_src});
    				
    			}
    			this.props.addNews(nineNews)
    			nineNews = [];
			}
			this.lastLoadedNews = querySnapshot.docs[page*9-1];
			this.loadedGridNum = 3;
    	})
    }

    componentDidUpdate(prevProps){

    	if(this.props.newsList.length === 0 && prevProps.newsList.length > 0){	//change data_src_arr
    		let page = 3;
			let nineNews = [];

    		db.collection(this.state.data).orderBy("date", "desc").where('data_src', 'in', this.props.data_src_arr).limit(page*9).get().then((querySnapshot) => {	
				for(let i=0;i<page;i++){
					for(let j=0;j<9;j++){
						let doc = querySnapshot.docs[i*9+j];
						nineNews.push({'id':doc.id ,'href':doc.data().href,'image':doc.data().image,'title':doc.data().title, 'date':doc.data().date, 'data_src': doc.data().data_src});
    				
    				}
    				this.props.addNews(nineNews)
    				nineNews = [];
				}
				this.lastLoadedNews = querySnapshot.docs[page*9-1];
				this.loadedGridNum = 3;
    		})
    	}
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

export default Projects;