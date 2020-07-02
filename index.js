import React from 'react';
import ReactDOM from 'react-dom';
import GetNewsList from './containers/GetNewsList';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import rootReducer from './reducers/combineReducers'
import Navbar from './Navbar'
import Sidebar from './Sidebar'



const store = createStore(rootReducer);

ReactDOM.render(
	<Provider store={store}>
		<Navbar />
		{/*}<Sidebar />{*/}
		<GetNewsList />
		
	</Provider>, 
	document.getElementById('root')
);
