const dataSrcFilter = (state = [], action) => {
	switch(action.type) {
		case 'TOGGLE_NEWS_SOURCE':
			return state.map(dataSrc =>
				(dataSrc.id === action.filter.id)
				? {...dataSrc, check: !dataSrc.check}
				: dataSrc
			)
		case 'ADD_DATASOURCE':
			return [
				...state,
				{
					'id': action.filter.id,
					'collection': action.filter.collection,
					'name': action.filter.name,
					'check': action.filter.check,
				}
			]
		default:
			return state
	}
}

export default dataSrcFilter;