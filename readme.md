# [Rosmaro](https://rosmaro.js.org) • [TodoMVC](http://todomvc.com)

Rosmaro is a visual automata-based programming framework.

It's all about associating functions with (state machine) graph nodes.

## Resources

- [Website](https://rosmaro.js.org)
- [Documentation](https://rosmaro.js.org/doc/)

### Articles

- [Decomposing the TodoMVC app with state diagrams](https://lukaszmakuch.pl/post/decomposing-the-todomvc-app-with-state-diagrams/)

- [An overview of the Rosmaro-TodoMVC app codebase](https://lukaszmakuch.pl/post/an-overview-of-the-rosmaro-todomvc-app-codebase)

- [Testing the TodoMVC app](https://lukaszmakuch.pl/post/testing-the-todomvc-app)

- [A JavaScript framework for functions of state and action](https://lukaszmakuch.pl/post/a-javascript-framework-for-functions-of-state-and-action/)

### Support

- [Twitter](https://twitter.com/zopsesen)

*Let us [know](https://github.com/lukaszmakuch/rosmaro/issues) if you discover anything worth sharing.*

## Implementation

The whole app is a single `({state, action}) => ({state, result})` function made of a graph drawn in the [Rosmaro editor](https://rosmaro.js.org/editor/) and code utilising the [rosmaro-binding-utils](https://github.com/lukaszmakuch/rosmaro-binding-utils) bound to it using the [Rosmaro CLI tools](https://github.com/lukaszmakuch/rosmaro-tools).

Here's part of the graph visible in the editor:
![Item graph](https://lukaszmakuch.pl/static/clear_completed_graph-1cac2283e5b3f1fc3d4f624c45ad9588-df0f0.png)

Here's a piece of code:
```js
const noneCompleted = () => ({ arrow: 'none are completed' });

export default ({ dispatch }) => ({
  handler: makeHandler({
    NO_TODOS_COMPLETED: noneCompleted,
    NO_TODOS: noneCompleted,

    RENDER: () =>
      h(
        'button.clear-completed',
        {
          on: { click: () => dispatch({ type: 'CLEAR_COMPLETED' }) },
        },
        'Clear completed'
      ),
  }),
});
```

And here's a test:
```js
describe('clear completed', () => {
  it('is not visible when there are no completed todos', () =>
    testFlow([
      addTodo({ value: 'todo A' }),
      addTodo({ value: 'todo B' }),
      addTodo({ value: 'todo C' }),

      clearCompletedInvisible,
    ]));

  it('is visible when there is at least one completed todo', () =>
    testFlow([
      addTodo({ value: 'todo A' }),

      addTodo({ value: 'todo B' }),
      toggleTodo({ value: 'todo B' }),

      addTodo({ value: 'todo C' }),

      clearCompletedVisible,
    ]));

  it('removes completed todos when clicked', () =>
    testFlow([
      addTodo({ value: 'todo A' }),

      addTodo({ value: 'todo B' }),
      toggleTodo({ value: 'todo B' }),

      addTodo({ value: 'todo C' }),

      addTodo({ value: 'todo D' }),
      toggleTodo({ value: 'todo D' }),

      clearCompletedVisible,
      clickClearCompleted,
      clearCompletedInvisible,

      assertTodoActive({ value: 'todo A' }),
      assertTodoNotPresent({ value: 'todo B' }),
      assertTodoActive({ value: 'todo C' }),
      assertTodoNotPresent({ value: 'todo D' }),
    ]));
});
```

The user flows are tested using the [rosmaro-testing-library](https://github.com/lukaszmakuch/rosmaro-testing-library).

The state of the app lives in a [Redux](https://redux.js.org) store connected to [Redux-Saga](http://redux-saga.js.org).

The UI itself is built using [Snabbdom](https://github.com/snabbdom/snabbdom) with the [snabbdom-signature](https://github.com/lukaszmakuch/snabbdom-signature) module for protection and tested with [snabbdom-testing-library](https://github.com/lukaszmakuch/snabbdom-testing-library) based on the wonderful [dom-testing-library](https://github.com/kentcdodds/dom-testing-library).

## Credit

Created by [Łukasz Makuch](https://lukaszmakuch.pl)
