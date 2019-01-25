import {
  callChildren,
  sliceLens,
  initialValueLens,
} from 'rosmaro-binding-utils';
import { makeHandler } from '~/js/utils/handlers';
import {
  keys,
  filter,
  flatten,
  complement,
  isNil,
  reverse,
  map,
  prop,
  reduce,
  compose,
  reject,
  findIndex,
  propEq,
  values,
  without,
  countBy,
  identity,
  pipe,
} from 'ramda';
import { h } from '~/js/utils/vdom';
import pluralize from 'pluralize';

const getStateAction = { type: 'GET_STATE' };

const readStats = ({ context, children }) => {
  const childrenResults = callChildren({
    context,
    children,
    action: getStateAction,
  });
  return pipe(
    values,
    map(prop('data')),
    reduce(
      (soFar, state) => ({
        ...soFar,
        [state]: soFar[state] + 1,
      }),
      { active: 0, completed: 0 }
    )
  )(childrenResults.result);
};

const buildEffects = stats => {
  if (stats.completed && !stats.active) {
    return [{ type: 'DISPATCH', action: { type: 'ALL_TODOS_COMPLETED' } }];
  }

  if (stats.completed) {
    return [{ type: 'DISPATCH', action: { type: 'SOME_TODOS_COMPLETED' } }];
  }

  if (stats.active) {
    return [{ type: 'DISPATCH', action: { type: 'NO_TODOS_COMPLETED' } }];
  }

  return [{ type: 'DISPATCH', action: { type: 'NO_TODOS' } }];
};

const TRANSPARENT_WITH_EVENTS = ({ context, action, children }) => {
  const childrenResults = callChildren({ context, action, children });

  const effect = pipe(
    values,
    filter(complement(isNil)),
    map(prop('effect')),
    filter(complement(isNil))
  )(childrenResults.result);

  return {
    ...childrenResults,
    result: {
      data: childrenResults.result,
      effect: [
        ...flatten(effect),
        { type: 'DISPATCH', action: { type: 'DISPATCH_EVENTS' } },
      ],
    },
  };
};

export default ({}) => ({
  nodes: ({ context: { todos } }) => map(prop('id'))(todos),

  lens: () =>
    compose(
      sliceLens('list'),
      initialValueLens({ todos: [], lastId: 0 })
    ),

  handler: makeHandler({
    DISPATCH_EVENTS: ({ context, action, children }) => {
      const stats = readStats({ context, children });
      const effect = buildEffects(stats);
      return { effect };
    },

    TODO_ADD: ({ context, action: { content } }) => {
      const newId = context.lastId + 1;
      const todo = { content, id: newId };
      return {
        arrow: 'added a todo',
        context: {
          ...context,
          lastId: newId,
          todos: [todo, ...context.todos],
        },
        effect: { type: 'DISPATCH', action: { type: 'DISPATCH_EVENTS' } },
      };
    },

    TOGGLE: TRANSPARENT_WITH_EVENTS,
    MARK_NOT_COMPLETED: TRANSPARENT_WITH_EVENTS,
    MARK_COMPLETED: TRANSPARENT_WITH_EVENTS,

    TODO_REMOVE: ({ context, action: { id } }) => ({
      arrow: 'removed a todo',
      context: {
        ...context,
        todos: reject(propEq('id', id), context.todos),
      },
      effect: { type: 'DISPATCH', action: { type: 'DISPATCH_EVENTS' } },
    }),

    RENDER: ({ children, action, context }) => {
      const childrenResults = callChildren({ action, context, children });
      const list = selectTodos =>
        h(
          'ul.todo-list',
          pipe(
            values,
            map(prop('data')),
            selectTodos,
            reverse
          )(childrenResults.result)
        );
      const numerOfActive = readStats({ context, children }).active;
      const counter = h('span.todo-count', [
        h('strong', numerOfActive),
        ` ${pluralize('item', numerOfActive)} left`,
      ]);
      return { list, counter };
    },
  }),
});
