const compose = (...fns) =>
  // fns.reduceRight((prevFn, nextFn) =>
  fns.reduce((prevFn, nextFn) =>
    (...args) => nextFn(prevFn(...args)),
    value => value
  );


export const withMiddleware = (state, dispatch) => (...middlewares) =>
  compose(...middlewares.map(mf => mf(state))) (dispatch);

export const logger = state => next => action => {
    if (typeof action === 'object') {
        console.log("Middleware logger, state, action ", state, action);
    }
  next(action);
};

// export const logger2 = state => next => action => {
//   next(action);
//   if (typeof action === 'object') {
//       console.log("Middleware logger2 logs after dispatch", state, action);
//   }
// };


export const thunk = state => next => action => {
    if (typeof action === 'function') {
        return action (next, () => state) // action (dispatch, getState) {...}
    }
    // console.log('inside of thunk, action=', action)
    return next(action)
}
