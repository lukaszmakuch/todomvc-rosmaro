import testFlow from '~/testUtils/testFlow';
import assertTheFooterIsInvisible from '~/testSteps/assert_the_footer_is_invisible';
import assertTheFooterIsVisible from '~/testSteps/assert_the_footer_is_visible';
import assertMainIsInvisible from '~/testSteps/assert_main_is_invisible';
import assertMainIsVisible from '~/testSteps/assert_main_is_visible';
import addTodo from '~/testSteps/add_todo';
import assertNewTodoFormIsFocused from '~/testSteps/assert_new_todo_form_is_focused';
import assertMarkAllAsCompletedNotVisible from '~/testSteps/assert_mark_all_as_completed_not_visible';
import assertTodoPresent from '~/testSteps/assert_todo_present';
import assertTodoActive from '~/testSteps/assert_todo_active';

test('adding a todo', testFlow([
  assertTheFooterIsInvisible,
  assertMainIsInvisible,
  assertNewTodoFormIsFocused,
  assertMarkAllAsCompletedNotVisible,
  addTodo({value: 'new todo'}),
  assertTodoPresent({expectedContent: 'new todo'}),
  assertTodoActive({value: 'new todo'}),
  assertTheFooterIsVisible,
  assertMainIsVisible,
]));