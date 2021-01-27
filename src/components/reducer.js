const listReducer = ( state = [], action) => {
    switch(action.type){
        case 'ADD':
            return [...state, action.payload]
        case 'REMOVE':
            return []
        default:
            return state
    }
}

export default listReducer;