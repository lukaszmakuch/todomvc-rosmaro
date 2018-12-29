import testFlow from '~/testUtils/testFlow';
import addTodo from '~/testSteps/add_todo';
import assertCounterValue from '~/testSteps/assert_counter_value';
import toggleTodo from '~/testSteps/toggle_todo';

test('the counter shows "2 items left"', testFlow([
  addTodo({value: 'todo A'}),
  addTodo({value: 'todo B'}),
  addTodo({value: 'todo C'}),
  toggleTodo({value: 'todo C'}),
  assertCounterValue({expectedValue: '2 items left'}),
]));