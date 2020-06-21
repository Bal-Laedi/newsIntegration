import { connect } from 'react-redux';
import { addNews } from '../actions/action';
import Projects from '../Project';

const getNewsList = (newsList, filter) =>{
	switch(filter){
		case 'SHOW_ALL':
			return newsList
		default:
			throw new Error('Unknown filter: ' + filter)
	}
}

const mapStateToProps = state => ({
	newsList: state.newsList
})

const mapDispatchToProps = dispatch => ({
	addNews: news => dispatch(addNews(news))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Projects)