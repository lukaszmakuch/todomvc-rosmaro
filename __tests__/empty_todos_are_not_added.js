import testFlow from '~/testUtils/testFlow';
import typeInNewTodo from '~/testSteps/type_in_new_todo';
import enterInNewTodoInput from '~/testSteps/enter_in_new_todo_input';
import assertTodoCount from '~/testSteps/assert_todo_count';

test('empty todos are not added', () =>
	testFlow([
		typeInNewTodo({ value: '       ' }),
		enterInNewTodoInput,
		assertTodoCount({ count: 0 }),
	]));
