const redux = require('redux');
// Redux library provides a method called a CreateStore which we used 
// for creating the Store.
const createStore = redux.createStore

const applyMiddleware = redux.applyMiddleware


const reduxLoggger = require('redux-logger')
const logger = reduxLoggger.createLogger()


const bindActionCreators = redux.bindActionCreators //(In Starting)
const combineReducers = redux.combineReducers


const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'

function orderCake(){
    return {
        type: CAKE_ORDERED, 
        payload: 1
    }
}
function restockCake(qty=4){
    return {
        type: CAKE_RESTOCKED,
        payload: qty
    }
}
function orderIceCream() {
    return {
        type : ICECREAM_ORDERED,
        payload : 1
    }
}
function restockIceCream(qty=4){
    return {
        type:ICECREAM_RESTOCKED,
        payload:qty
    }
}

const initialCakeState = {
    numOfCakes : 10,
}
const initialIceCreamState = {
    numOfIceCream : 15
}

const cakeReducer = (state = initialCakeState, action)=> {

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
                        numOfCakes : state.numOfCakes + action.payload
                }
                
                default :
                     return state 
        }
}

const iceCreamReducer = (state = initialIceCreamState, action)=> {

    switch(action.type)
    {
        case ICECREAM_ORDERED :
                    return {
                        ...state,
                            numOfIceCream : state.numOfIceCream - 1,
                    }
                
                case ICECREAM_RESTOCKED : 
                    return {
                        ...state,
                            numOfIceCream : state.numOfIceCream + action.payload
                    }
            
            default :
                 return state 
    }
}


// Redux Store holding applicatioon state.
const rootReducer =combineReducers ({
        cake : cakeReducer,
        iceCream : iceCreamReducer
})
const store = createStore(rootReducer , applyMiddleware(logger))

const actions = bindActionCreators({orderCake, restockCake,orderIceCream,restockIceCream},store.dispatch);

console.log("Initial State", store.getState());

const unsubscribe = store.subscribe(()=> { });

actions.orderCake();
actions.orderCake();
actions.restockCake();
actions.orderIceCream();
actions.orderIceCream();
actions.restockIceCream();

unsubscribe();


