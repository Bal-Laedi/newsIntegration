import { combineReducers } from 'redux';
import newsList from './newsList';
import dataSrcFilter from './dataSrcFilter';

export default combineReducers({
  newsList,
  dataSrcFilter
})