import testFlow from '~/testUtils/testFlow';
import addTodo from '~/testSteps/add_todo';
import toggleTodo from '~/testSteps/toggle_todo';
import clearCompletedNotVisible from '~/testSteps/clear_completed_not_visible';
import clearCompletedVisible from '~/testSteps/clear_completed_visible';
import clickClearCompleted from '~/testSteps/click_clear_completed';
import assertTodoPresent from '~/testSteps/assert_todo_present';
import assertTodoNotPresent from '~/testSteps/assert_todo_not_present';
import assertTodoActive from '~/testSteps/assert_todo_active';
import assertTodoCompleted from '~/testSteps/assert_todo_completed';

describe('clear completed', () => {

  it('is not visible when there are no completed todos', testFlow([
    addTodo({value: 'todo A'}),
    addTodo({value: 'todo B'}),
    addTodo({value: 'todo C'}),

    clearCompletedNotVisible
  ]));

  it('is visible when there is at least one completed todo', testFlow([
    addTodo({value: 'todo A'}),

    addTodo({value: 'todo B'}),
    toggleTodo({value: 'todo B'}),

    addTodo({value: 'todo C'}),

    clearCompletedVisible,
  ]));

  it('removes completed todos when clicked', testFlow([
    addTodo({value: 'todo A'}),

    addTodo({value: 'todo B'}),
    toggleTodo({value: 'todo B'}),

    addTodo({value: 'todo C'}),

    addTodo({value: 'todo D'}),
    toggleTodo({value: 'todo D'}),

    clearCompletedVisible,
    clickClearCompleted,
    clearCompletedNotVisible,

    assertTodoActive({value: 'todo A'}),
    assertTodoNotPresent({content: 'todo B'}),
    assertTodoActive({value: 'todo C'}),
    assertTodoNotPresent({content: 'todo D'}),
  ]));

});