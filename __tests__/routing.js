import addTodo from '~/testSteps/add_todo';
import toggleTodo from '~/testSteps/toggle_todo';
import testFlow from '~/testUtils/testFlow';
import assertTodoPresent from '~/testSteps/assert_todo_present';
import assertTodoNotPresent from '~/testSteps/assert_todo_not_present';
import assertTodoActive from '~/testSteps/assert_todo_active';
import assertTodoCompleted from '~/testSteps/assert_todo_completed';
import navigateToAll from '~/testSteps/navigate_to_all';
import navigateToActive from '~/testSteps/navigate_to_active';
import navigateToCompleted from '~/testSteps/navigate_to_completed';

describe('routing', () => {
  const addTodos = [
    addTodo({ value: 'todo A' }),
    toggleTodo({ value: 'todo A' }),

    addTodo({ value: 'todo B' }),
    toggleTodo({ value: 'todo B' }),

    addTodo({ value: 'todo C' }),
    addTodo({ value: 'todo D' }),
    addTodo({ value: 'todo E' }),
  ];

  it('shows all todos when on the ALL tab', () =>
    testFlow([
      addTodos,

      navigateToAll,

      assertTodoPresent({ value: 'todo A' }),
      assertTodoCompleted({ value: 'todo A' }),

      assertTodoPresent({ value: 'todo B' }),
      assertTodoCompleted({ value: 'todo B' }),

      assertTodoPresent({ value: 'todo C' }),
      assertTodoActive({ value: 'todo C' }),

      assertTodoPresent({ value: 'todo D' }),
      assertTodoActive({ value: 'todo D' }),

      assertTodoPresent({ value: 'todo E' }),
      assertTodoActive({ value: 'todo E' }),
    ]));

  it('shows only active todos when on the ACTIVE tab', () =>
    testFlow([
      addTodos,

      navigateToActive,

      assertTodoNotPresent({ value: 'todo A' }),

      assertTodoNotPresent({ value: 'todo B' }),

      assertTodoPresent({ value: 'todo C' }),
      assertTodoActive({ value: 'todo C' }),

      assertTodoPresent({ value: 'todo D' }),
      assertTodoActive({ value: 'todo D' }),

      assertTodoPresent({ value: 'todo E' }),
      assertTodoActive({ value: 'todo E' }),
    ]));

  it('shows only completed todos when on the COMPLETED tab', () =>
    testFlow([
      addTodos,

      navigateToCompleted,

      assertTodoPresent({ value: 'todo A' }),
      assertTodoCompleted({ value: 'todo A' }),

      assertTodoPresent({ value: 'todo B' }),
      assertTodoCompleted({ value: 'todo B' }),

      assertTodoNotPresent({ value: 'todo C' }),

      assertTodoNotPresent({ value: 'todo D' }),

      assertTodoNotPresent({ value: 'todo E' }),
    ]));

  it('preserves todos between tabs', () =>
    testFlow([
      addTodos,

      navigateToActive,

      addTodo({ value: 'new todo' }),
      assertTodoPresent({ value: 'new todo' }),
      assertTodoActive({ value: 'new todo' }),

      navigateToAll,

      assertTodoPresent({ value: 'todo A' }),
      assertTodoCompleted({ value: 'todo A' }),

      assertTodoPresent({ value: 'todo B' }),
      assertTodoCompleted({ value: 'todo B' }),

      assertTodoPresent({ value: 'todo C' }),
      assertTodoActive({ value: 'todo C' }),

      assertTodoPresent({ value: 'todo D' }),
      assertTodoActive({ value: 'todo D' }),

      assertTodoPresent({ value: 'todo E' }),
      assertTodoActive({ value: 'todo E' }),

      assertTodoPresent({ value: 'new todo' }),
      assertTodoActive({ value: 'new todo' }),
    ]));

  it('always makes new todos active', () =>
    testFlow([
      addTodos,

      navigateToCompleted,

      addTodo({ value: 'new todo' }),
      // The todo is not present, because we added it on the "completed" tab
      // and every new todo is active.
      assertTodoNotPresent({ value: 'new todo' }),

      navigateToActive,

      assertTodoNotPresent({ value: 'todo A' }),

      assertTodoNotPresent({ value: 'todo B' }),

      assertTodoPresent({ value: 'todo C' }),
      assertTodoActive({ value: 'todo C' }),

      assertTodoPresent({ value: 'todo D' }),
      assertTodoActive({ value: 'todo D' }),

      assertTodoPresent({ value: 'todo E' }),
      assertTodoActive({ value: 'todo E' }),

      // This is the todo we added on the "completed" tab.
      assertTodoPresent({ value: 'new todo' }),
      assertTodoActive({ value: 'new todo' }),

      toggleTodo({ value: 'new todo' }),

      assertTodoNotPresent({ value: 'new todo' }),

      navigateToAll,

      assertTodoPresent({ value: 'new todo' }),
      assertTodoCompleted({ value: 'new todo' }),
    ]));
});
