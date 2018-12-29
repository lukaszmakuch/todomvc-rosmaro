import testFlow from '~/testUtils/testFlow';
import typeInNewTodo from '~/testSteps/type_in_new_todo';
import assertEnterDoesNotAddATodo from '~/testSteps/assert_enter_does_not_add_a_todo';

test('empty todos are not added', testFlow([
  typeInNewTodo({value: '       '}),
  assertEnterDoesNotAddATodo,
]));