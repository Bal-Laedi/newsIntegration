import React,{ Component } from 'react';
import db,{storageRef} from './initial_firebase';
import Pagination from './Pagination';
import GridContainer from './GridContainer';
import './Project.css';
const fetch = require('node-fetch');









//////////////////////////////////////////////////////////////////////////
//solution: https://stackoverflow.com/questions/27192621/reactjs-async-rendering-of-components
//////////////////////////////////////////////////////////////////////////
class Projects extends Component{
	constructor(props){	
		super(props);	//props: newsList, addNews(redux)
		this.state = {data: "all_news",page: 1, totalPage: 1};
		this.myRef = React.createRef();
		this.loadedGridNum = 3;
		this.lastLoadedNews = 0;
		this.newsDataURL = 'https://storage.googleapis.com/newsintegration.appspot.com/news.json';
		
		storageRef.getDownloadURL().then( url => {
			fetch(url)
			.then(res => res.json())
			.then(json => {
				json.data_source.forEach((doc) => {
					this.props.addDataSource({'id':doc.id , 'collection':doc.collection , 'name':doc.name, 'check': true});
				})
			})
		})
	}

	componentDidMount(){
		
		window.addEventListener('scroll', function(e) {
			//https://stackoverflow.com/questions/2481350/how-to-get-scrollbar-position-with-javascript
			let Projects_scroll, atPage;
			let mobile_viewport = window.matchMedia("(max-width: 641px)");
			
			if(this.myRef.current !== undefined){
				
				if(mobile_viewport.matches){
					Projects_scroll = window.scrollY - this.myRef.current.offsetTop;
					let nineGridHeight = this.myRef.current.childNodes[0].offsetHeight;
					atPage = Math.ceil(Projects_scroll/nineGridHeight);
				}
				else{
					Projects_scroll = window.scrollX - this.myRef.current.offsetLeft;
					let nineGridWidth = this.myRef.current.childNodes[0].offsetWidth;
					atPage = Math.ceil(Projects_scroll/nineGridWidth);
				}

				if((atPage + 6) > this.loadedGridNum){

					storageRef.getDownloadURL().then( url => {
						fetch(url)
						.then(res => res.json())
						.then(json => {
							let nowIndex = this.lastLoadedNews + 1;
							let nineNews = [];
							let addNewsNum = 0;
							
							while(addNewsNum < (atPage + 6 - this.loadedGridNum)*9){
								let doc = json.all_news_rss[nowIndex];
								if(this.props.data_src_arr.includes(doc.data_src)){
									nineNews.push({'id':doc.id ,'href':doc.href,'image': doc.image,'title': doc.title, 'date': doc.date, 'data_src': doc.data_src, 'description': doc.description});
									addNewsNum = addNewsNum + 1;
									if(nineNews.length === 9){
										this.props.addNews(nineNews);
    									nineNews = [];
									}
								}
								nowIndex = nowIndex + 1;	
							}
							this.lastLoadedNews = nowIndex - 1;
							this.loadedGridNum = atPage + 6;
						})
					})
				}
			}

		}.bind(this))


    	storageRef.getDownloadURL().then( url => {
			fetch(url)
			.then(res => res.json())
			.then(json => {
				let page = 3;
				let nineNews = [];
				for(let i = 0; i < page; i++){
					for(let j=0;j<9;j++){
						let doc = json.all_news_rss[i*9+j];
						nineNews.push({'id':doc.id ,'href': doc.href,'image': doc.image,'title': doc.title, 'date': doc.date, 'data_src': doc.data_src, 'description': doc.description});
    				}
    				this.props.addNews(nineNews);
    				nineNews = [];
				}
				this.lastLoadedNews = page*9-1;
				this.loadedGridNum = 3;
			})
		})
    }

    componentDidUpdate(prevProps){

    	if(this.props.newsList.length === 0 && prevProps.newsList.length > 0){	//change data_src_arr

    		storageRef.getDownloadURL().then( url => {
    			fetch(url)
				.then(res => res.json())
				.then(json => {
					this.lastLoadedNews = -1;
					let nowIndex = this.lastLoadedNews + 1;
					let nineNews = [];
				    let addNewsNum = 0;
				    let page = 3;
					
					while(addNewsNum < page*9){
						let doc = json.all_news_rss[nowIndex];
						if(this.props.data_src_arr.includes(doc.data_src)){
							nineNews.push({'id':doc.id ,'href':doc.href,'image': doc.image,'title': doc.title, 'date': doc.date, 'data_src': doc.data_src, 'description': doc.description});
							addNewsNum = addNewsNum + 1;
							if(nineNews.length === 9){
								this.props.addNews(nineNews);
    							nineNews = [];
							}
						}
						nowIndex = nowIndex + 1;	
					}
					this.lastLoadedNews = nowIndex - 1;
					this.loadedGridNum = 3;
				})
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