import testFlow from '~/testUtils/testFlow';
import typeInNewTodo from '~/testSteps/type_in_new_todo';
import assertEnterDoesNotAddTodo from '~/testSteps/assert_enter_does_not_add_todo';

test('empty todos are not added', testFlow([
  typeInNewTodo({value: '       '}),
  assertEnterDoesNotAddTodo,
]));