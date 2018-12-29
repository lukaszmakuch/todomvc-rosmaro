import testFlow from '~/testUtils/testFlow';
import addTodo from '~/testSteps/add_todo';
import assertMarkAllAsCompletedChecked from '~/testSteps/assert_mark_all_as_completed_checked';
import assertMarkAllAsCompletedNotChecked from '~/testSteps/assert_mark_all_as_completed_not_checked';
import toggleTodo from '~/testSteps/toggle_todo';
import assertMarkAllAsCompletedNotVisible from '~/testSteps/assert_mark_all_as_completed_not_visible';
import clickMarkAllAsCompleted from '~/testSteps/click_mark_all_as_completed';
import assertTodoCompleted from '~/testSteps/assert_todo_completed';
import assertTodoActive from '~/testSteps/assert_todo_active';

describe('mark all as completed', () => {

  it('is checked when all todos are completed', testFlow([
    addTodo({value: 'todo A'}),
    toggleTodo({value: 'todo A'}),
    
    addTodo({value: 'todo B'}),
    toggleTodo({value: 'todo B'}),

    addTodo({value: 'todo C'}),
    toggleTodo({value: 'todo C'}),

    assertMarkAllAsCompletedChecked,
  ]));

  it('is not checked when there are some active todos', testFlow([
    addTodo({value: 'todo A'}),
    toggleTodo({value: 'todo A'}),
    
    addTodo({value: 'todo B'}),

    addTodo({value: 'todo C'}),
    toggleTodo({value: 'todo C'}),

    assertMarkAllAsCompletedNotChecked,
  ]));

  it('is not visible without todos', testFlow([
    assertMarkAllAsCompletedNotVisible
  ]));

  it('marks all todos as completed when clicked when not checked', testFlow([
    addTodo({value: 'todo A'}),
    toggleTodo({value: 'todo A'}),
    assertTodoCompleted({value: 'todo A'}),
    
    addTodo({value: 'todo B'}),
    assertTodoActive({value: 'todo B'}),

    addTodo({value: 'todo C'}),
    toggleTodo({value: 'todo C'}),
    assertTodoCompleted({value: 'todo C'}),

    addTodo({value: 'todo D'}),
    assertTodoActive({value: 'todo D'}),

    clickMarkAllAsCompleted,

    assertTodoCompleted({value: 'todo A'}),
    assertTodoCompleted({value: 'todo B'}),
    assertTodoCompleted({value: 'todo C'}),
    assertTodoCompleted({value: 'todo D'}),
  ]));

  it('marks all todos as active when clicked when checked', testFlow([
    addTodo({value: 'todo A'}),
    toggleTodo({value: 'todo A'}),
    assertTodoCompleted({value: 'todo A'}),
    
    addTodo({value: 'todo B'}),
    toggleTodo({value: 'todo B'}),
    assertTodoCompleted({value: 'todo B'}),

    clickMarkAllAsCompleted,

    assertTodoActive({value: 'todo A'}),
    assertTodoActive({value: 'todo B'}),
  ]));

});

