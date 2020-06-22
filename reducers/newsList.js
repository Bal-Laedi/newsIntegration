const newsList = (state = [], action) => {
	switch(action.type) {
		case 'ADD_NEWS':
			return [
				...state,
				{
					'id': action.news.id,
					'href': action.news.href,
					'image': action.news.image,
					'title': action.news.title,
					'date': action.news.date,
					'data_src': action.news.data_src
				}
			]
		case 'EMPTY_NEWS':
			return []
		default:
			return state
	}	
}



export default newsList;