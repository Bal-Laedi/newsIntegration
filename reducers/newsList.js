const newsList = (state = [], action) => {
	switch(action.type) {
		case 'ADD_NEWS':
			return [
				...state,
				action.news.map((doc) => {
					return(
						{
							'id': doc.id,
							'href': doc.href,
							'image': doc.image,
							'title': doc.title,
							'date': doc.date,
							'data_src': doc.data_src,
							'description': doc.description
						}
					)
						
				})
			]
		case 'EMPTY_NEWS':
			return []
		default:
			return state
	}	
}



export default newsList;