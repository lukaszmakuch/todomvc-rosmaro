import testFlow from '~/testUtils/testFlow';
import assertTheFooterIsInvisible from '~/testSteps/assert_the_footer_is_invisible';
import addTodo from '~/testSteps/add_todo';
import toggleTodo from '~/testSteps/toggle_todo';
import assertTodoActive from '~/testSteps/assert_todo_active';
import assertTodoCompleted from '~/testSteps/assert_todo_completed';

test('marking a todo as active', testFlow([
  addTodo({value: 'first todo'}),
  addTodo({value: 'second todo'}),

  toggleTodo({value: 'second todo'}),

  assertTodoCompleted({value: 'second todo'}),
  assertTodoActive({value: 'first todo'}),

  toggleTodo({value: 'second todo'}),
  
  assertTodoActive({value: 'first todo'}),
  assertTodoActive({value: 'second todo'}),
]));