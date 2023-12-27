const redux = require('redux');
// Redux library provides a method called a CreateStore which we used 
// for creating the Store.
const createStore = redux.createStore

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'

function orderCake(){
    return {
        type: CAKE_ORDERED, 
        quantity: 1
    }
}
function restockCake(qty=4){
    return {
        type: CAKE_RESTOCKED,
        quantity: qty
    }
}
const initialState = {
    numOfCakes : 10
}
const reducer = (state = initialState, action)=> {

        switch(action.type)
        {
            case CAKE_ORDERED :
                return {
                    ...state,
                        numOfCakes : state.numOfCakes - 1,
                }
            
            case CAKE_RESTOCKED : 
                return {
                    ...state,
                        numOfCakes : state.numOfCakes + action.quantity
                }
        
            default :
                return state 
        }
}

// Redux Store holding applicatioon state.
const store = createStore(reducer)

console.log("Initial State", store.getState());

const unsubscribe = store.subscribe(()=> { console.log("Updated State", store.getState())});

store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(restockCake());

unsubscribe();


