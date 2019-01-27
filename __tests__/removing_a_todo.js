import testFlow from '~/testUtils/testFlow';
import addTodo from '~/testSteps/add_todo';
import toggleTodo from '~/testSteps/toggle_todo';
import assertTodoActive from '~/testSteps/assert_todo_active';
import assertTodoCompleted from '~/testSteps/assert_todo_completed';
import assertTodoPresent from '~/testSteps/assert_todo_present';
import assertTodoNotPresent from '~/testSteps/assert_todo_not_present';
import clickDestroy from '~/testSteps/click_destroy';

test('removing a todo', () =>
  testFlow([
    addTodo({ value: 'todo A' }),
    toggleTodo({ value: 'todo A' }),

    addTodo({ value: 'todo B' }),

    addTodo({ value: 'todo C' }),

    assertTodoPresent({ value: 'todo A' }),
    assertTodoCompleted({ value: 'todo A' }),

    clickDestroy({ todo: 'todo B' }),

    assertTodoNotPresent({ content: 'todo B' }),

    assertTodoPresent({ value: 'todo C' }),
    assertTodoActive({ value: 'todo C' }),
  ]));
