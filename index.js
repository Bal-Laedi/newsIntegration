import React from 'react';
import ReactDOM from 'react-dom';
import GetNewsList from './containers/GetNewsList';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import rootReducer from './reducers/combineReducers'
import Navbar from './Navbar'

const store = createStore(rootReducer);
console.log("hello my friend")

//ReactDOM.render(<Navbar />,  document.getElementById('root'));
ReactDOM.render(
	<Provider store={store}>
		<Navbar />
		<Sidebar />
		<GetNewsList />

	</Provider>, 
	document.getElementById('root')
);