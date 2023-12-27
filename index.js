console.log("Redux Welcome");

const redux = require("redux");

// Redux library provides a method called a CreateStore which we used 
// for creating the Store.

const createStore = redux.createStore


const CAKE_ORDERED = 'CAKE_ORDERED'

// Actions
// {
//     type: CAKE_ORDERED ,
//     quantity: 1 , 
// }

//Action Creator

function orderCake()
{
    return {
        type:CAKE_ORDERED,
        quantity:1 ,
    }
}

//(previousState , action) => newState

//Reducers

const initialState = {
    numOfCakes : 10,
}

const reducer = (state = initialState, action) => {
    switch(action.type)
    {
        case CAKE_ORDERED :
            return {
                ...state , 
                numOfCakes : state.numOfCakes -1
            }
        default :
            return state
    }
}

// Redux Store holding applicatioon state.
const store = createStore(reducer)

// Get State gives initial State of your application.
console.log("Initial State", store.getState());

// Allow the app to Subscribe the changes in the store.
const unsubscribe = store.subscribe(()=> console.log("Update State", store.getState()))

//Store provides dispatch method to update the step.
// It takes action as parameter.
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());

// To unsubscribe from the store by calling function returned by the store.
unsubscribe();