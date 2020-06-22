//Projects
export const toggleNewSource = filter => ({
	type: 'TOGGLE_NEWS_SOURCE',
	filter	
})

export const addDataSource = filter => ({
	type: 'ADD_DATASOURCE',
	filter	
})

export const addNews = news => ({
	type: 'ADD_NEWS',
	news
})

export const emptyNews = news => ({
	type: 'EMPTY_NEWS'
})


//Project
/*export const toggleLike = like => (
	type: 'TOGGLE_LIKE',
	like
})*/