import {defaultHandler, callChildren, sliceLens, initialValueLens} from 'rosmaro-binding-utils';
import {makeHandler} from '~/js/utils/handlers';
import {keys, reverse, map, prop, reduce, compose, reject, findIndex, propEq, values, without, countBy, identity, pipe} from 'ramda';
import {h} from '~/js/utils/vdom';
import pluralize from 'pluralize';

const getStateAction = {type: 'GET_STATE'};

const readStats = ({context, children}) => {
  const childrenResults = callChildren({context, children, action: getStateAction});
  return pipe(
    map(prop('data')),
    reduce((soFar, state) => ({
      ...soFar,
      [state]: soFar[state] + 1
    }), {notCompleted: 0, completed: 0})
  )(values(childrenResults.result));
};

const buildEffects = stats => {
  if (stats.completed && !stats.notCompleted) {
    return [{type: 'DISPATCH', action: {type: 'ALL_TODOS_COMPLETED'}}];
  }

  if (stats.completed) {
    return [{type: 'DISPATCH', action: {type: 'SOME_TODOS_COMPLETED'}}];
  }

  if (stats.notCompleted) {
    return [{type: 'DISPATCH', action: {type: 'NO_TODOS_COMPLETED'}}];
  }

  return [{type: 'DISPATCH', action: {type: 'NO_TODOS'}}];
};

export default ({}) => ({

  nodes: ({context: {todos}}) => map(prop('id'))(todos),

  lens: () => compose(
    sliceLens('list'),
    initialValueLens({todos: [], lastId: 0})
  ),

  handler: makeHandler({

    DISPATCH_EVENTS: ({context, action, children}) => {
      const stats = readStats({context, children});
      const effect = buildEffects(stats);
      return {effect};
    },

    TODO_ADD: ({context, action: {content}}) => {
      const newId = context.lastId + 1;
      const todo = {
        content,
        id: newId,
      };
      return {
        arrow: 'added a todo',
        context: {
          ...context,
          lastId: newId,
          todos: [todo, ...context.todos]
        },
        effect: {type: 'DISPATCH', action: {type: 'DISPATCH_EVENTS'}}
      };
    },

    TODO_REMOVE: ({context, action: {id}}) => ({
      arrow: 'removed a todo',
      context: {
        ...context,
        todos: reject(propEq('id', id), context.todos),
      },
      effect: {type: 'DISPATCH', action: {type: 'DISPATCH_EVENTS'}}
    }),

    RENDER: ({children, action, context}) => {
      const childrenResults = callChildren({action, context, children});
      const list = selectTodos => h("ul.todo-list", pipe(
        values,
        map(prop('data')),
        selectTodos,
        reverse
      )(childrenResults.result));
      const numerOfNotCompleted = readStats({context, children}).notCompleted;
      const counter = h('span.todo-count', [
        h('strong', numerOfNotCompleted),
        ` ${pluralize('item', numerOfNotCompleted)} left`
      ])
      return {list, counter};
    },

  }),

});