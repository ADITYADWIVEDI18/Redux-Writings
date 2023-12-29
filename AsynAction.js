const redux = require('redux')
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware

const initialState = {
  loading: false,
  users: [],
  error: ''
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUESTED
  }
}

const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users
  }
}

const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error
  }
}

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest())
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        // response.data is the users
        const users = response.data.map(user => user.id)
        dispatch(fetchUsersSuccess(users))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchUsersFailure(error.message))
      })
  }
}

const reducer = (state = initialState, action) => {
  console.log(action.type)
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case FETCH_USERS_SUCCEEDED:
      return {
        loading: false,
        users: action.payload,
        error: ''
      }
    case FETCH_USERS_FAILED:
      return {
        loading: false,
        users: [],
        error: action.payload
      }
  }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => {
  console.log(store.getState())
})
store.dispatch(fetchUsers())



Output If we got error --->
  
  Node.js v18.16.0

@@redux/INITl.g.l.u.m.q
FETCH_USERS_REQUESTED
{ loading: true, users: [], error: '' }
FETCH_USERS_SUCCEEDED
{
  loading: false,
  users: [
    1, 2, 3, 4,  5,
    6, 7, 8, 9, 10
  ],
  error: ''
}
PS C:\Users\ADITYA DWIVEDI\Desktop\sample_test> node AsynAction.js     
@@redux/INITb.b.r.u.0.l
FETCH_USERS_REQUESTED
{ loading: true, users: [], error: '' }
FETCH_USERS_FAILED
{
  loading: false,
  users: [],
  error: 'getaddrinfo ENOTFOUND jsonplaceholder.typicod.com'
}

Output If eveything goes right --->

@@redux/INIT1.6.n.y.d.n
FETCH_USERS_REQUESTED
{ loading: true, users: [], error: '' }
FETCH_USERS_SUCCEEDED
{
  loading: false,
  users: [
    1, 2, 3, 4,  5,
    6, 7, 8, 9, 10
  ],
  error: ''
}
