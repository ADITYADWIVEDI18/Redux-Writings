
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake());

/* INSTEAD OF THIS USED THIS BIND CREATORS. IT IS NOT REALLY NECESSARY. */

const bindActionCreators = redux.bindActionCreators (In Starting)

const actions = bindActionCreators({orderCake, restockCake},stock.dispatch);
actions.orderCake();
actions.orderCake();
actions.restockCake();