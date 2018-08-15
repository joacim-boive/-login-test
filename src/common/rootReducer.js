import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import homeReducer from '../features/home/redux/reducer';
import commonReducer from '../features/common/redux/reducer';
import accountReducer from '../features/account/redux/reducer';
import authenticationReducer from '../features/authentication/redux/reducer';
import customerReducer from '../features/customer/redux/reducer';
import loanReducer from '../features/loan/redux/reducer';
import invoiceReducer from '../features/invoice/redux/reducer';
import cardReducer from '../features/card/redux/reducer';

// NOTE 1: DO NOT CHANGE the 'reducerMap' name and the declaration pattern.
// This is used for Rekit cmds to register new features, remove features, etc.
// NOTE 2: always use the camel case of the feature folder name as the store branch name
// So that it's easy for others to understand it and Rekit could manage theme.

const reducerMap = {
    router: routerReducer,
    home: homeReducer,
    common: commonReducer,
    account: accountReducer,
    authentication: authenticationReducer,
    customer: customerReducer,
    loan: loanReducer,
  invoice: invoiceReducer,
  card: cardReducer,
};

export default combineReducers(reducerMap);
