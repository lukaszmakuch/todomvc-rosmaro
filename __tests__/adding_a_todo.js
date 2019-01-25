import testFlow from '~/testUtils/testFlow';
import assertFooterInvisible from '~/testSteps/assert_footer_invisible';
import assertFooterVisible from '~/testSteps/assert_footer_visible';
import assertMainInvisible from '~/testSteps/assert_main_invisible';
import assertMainVisible from '~/testSteps/assert_main_visible';
import addTodo from '~/testSteps/add_todo';
import assertNewTodoFormFocused from '~/testSteps/assert_new_todo_form_focused';
import assertMarkAllAsCompletedInvisible from '~/testSteps/assert_mark_all_as_completed_invisible';
import assertTodoPresent from '~/testSteps/assert_todo_present';
import assertTodoActive from '~/testSteps/assert_todo_active';

test('adding a todo', testFlow([
  assertFooterInvisible,
  assertMainInvisible,
  assertNewTodoFormFocused,
  assertMarkAllAsCompletedInvisible,
  addTodo({value: 'new todo'}),
  assertTodoPresent({expectedContent: 'new todo'}),
  assertTodoActive({value: 'new todo'}),
  assertFooterVisible,
  assertMainVisible,
]));