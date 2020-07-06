import { connect } from 'react-redux';
import { addNews, addDataSource } from '../actions/action';
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
	newsList: state.newsList,
	data_src_arr: state.dataSrcFilter.filter(dataSrc => dataSrc.check === true)
									 .map(obj => obj.collection)
})

const mapDispatchToProps = dispatch => ({
	addNews: news => dispatch(addNews(news)),
	addDataSource: dataSrc => dispatch(addDataSource(dataSrc))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Projects)