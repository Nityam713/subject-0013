export function createStore(initialState) {
  var state = { ...initialState };
  var listeners = [];

  function getState() {
    return state;
  }

  function setState(partialState) {
    state = { ...state, ...partialState };
    listeners.forEach(function (listener) {
      listener(state);
    });
  }

  function subscribe(listener) {
    listeners.push(listener);
    return function unsubscribe() {
      listeners = listeners.filter(function (fn) {
        return fn !== listener;
      });
    };
  }

  return {
    getState,
    setState,
    subscribe
  };
}
