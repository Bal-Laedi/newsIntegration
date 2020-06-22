const newsList = (state = [], action) => {
	switch(action.type) {
		case 'ADD_NEWS':
			return [
				...state,
				{
					'id': action.id, 
					'href': action.href,
					'image': action.image,
					'title': action.title, 
					'date': action.date, 
					'data_src': action.data_src
				}
			]
		default: 
			return state

	}	
}



export default newsList;