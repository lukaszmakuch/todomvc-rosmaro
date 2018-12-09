import {defaultHandler} from 'rosmaro-binding-utils';
import {lens, update, find, reject, isEmpty, prop, propEq, findIndex, trim, pipe, omit} from 'ramda';

export default ({}) => ({

  lens: ({localNodeName}) => {
    const thisTodo = propEq('id', parseInt(localNodeName));
    return lens(
        (context) => find(thisTodo)(context.todos),
        (todo, context) => ({
          ...context, 
          todos: update(findIndex(thisTodo)(context.todos), todo, context.todos)
        })
      )
  },
    
  handler: defaultHandler,

});