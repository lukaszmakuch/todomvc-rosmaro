import {
  typeHandler,
  // defaultHandler,
  partialReturns,
  targetedActions,
  callChildren
} from 'rosmaro-binding-utils';

import {map, prop, pipe, values, flatten} from 'ramda';

// TODO: extract this
const defaultHandler = (opts) => {
  const childrenResult = callChildren(opts);
  const numOfResults = Object.keys(childrenResult.result).length;
  if (numOfResults == 0) {
    return {
      ...childrenResult,
      result: undefined
    };
  } else if (numOfResults == 1) {
    return {
      ...childrenResult,
      result: Object.values(childrenResult.result)[0]
    };
  } else {
    const effect = flatten(map(pipe(prop('effect'), maybeEffect => maybeEffect || []))(values(childrenResult.result)));
    return {
      ...childrenResult,
      effect
    };
  }
}

export const makeHandler = handlerPlan => targetedActions()(partialReturns(typeHandler({defaultHandler})(handlerPlan)));