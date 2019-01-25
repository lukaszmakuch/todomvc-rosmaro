import { transparentHandler } from '~/js/utils/handlers';
import { lens, update, find, propEq, findIndex } from 'ramda';

export default ({}) => ({
  lens: ({ localNodeName }) => {
    const thisTodo = propEq('id', parseInt(localNodeName));
    return lens(
      context => find(thisTodo)(context.todos),
      (todo, context) => ({
        ...context,
        todos: update(findIndex(thisTodo)(context.todos), todo, context.todos),
      })
    );
  },

  handler: transparentHandler,
});
