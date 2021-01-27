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
        if (serializedState === null) {
            return JSON.stringify({mySharesTicker:[],mySharesQuantity:[],budget:0});
        }
        return JSON.parse(serializedState);
    }
    catch(err){
        console.log(err);
        return JSON.stringify({mySharesTicker:[],mySharesQuantity:[],budget:0});
    }
}

const rootReducer = combineReducers({
    list: listReducer
})

const persistedState = loadFromLocalStorage();

const store = createStore(
    rootReducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

)

store.subscribe( () => saveToLocalStorage(store.getState()));

export default store;