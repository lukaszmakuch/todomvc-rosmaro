import testFlow from '~/testUtils/testFlow';
import addTodo from '~/testSteps/add_todo';
import assertCounterValue from '~/testSteps/assert_counter_value';
import toggleTodo from '~/testSteps/toggle_todo';

test(
	'the counter shows "0 items left"',
	testFlow([
		addTodo({ value: 'new todo' }),
		toggleTodo({ value: 'new todo' }),
		assertCounterValue({ expectedValue: '0 items left' }),
	])
);
