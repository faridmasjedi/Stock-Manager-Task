import {createStore, combineReducers } from 'redux'; 
import listReducer from '../components/reducer';

function saveToLocalStorage(state){
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    }
    catch(err) {
        console.log(err);
    }
}

function loadFromLocalStorage() {
    try{
        const serializedState = localStorage.getItem('state');
        if (serializedState === null || serializedState === {"list":[]}) {
            return {list:[{mySharesTicker:['goog','aapl'],mySharesQuantity:[2,4],budget:350}]}
        }
        return JSON.parse(serializedState);
    }
    catch(err){
        console.log(err);
        return {list:[{mySharesTicker:['goog','aapl'],mySharesQuantity:[2,4],budget:350}]}
    }
}

const rootReducer = combineReducers({
    list: listReducer
})

let persistedState = loadFromLocalStorage();

if (persistedState.list.length === 0) { 
    persistedState = {list:[{mySharesTicker:['goog','aapl'],mySharesQuantity:[2,4],budget:350}]}
}

const store = createStore(
    rootReducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

)

store.subscribe( () => saveToLocalStorage(store.getState()));

export default store;