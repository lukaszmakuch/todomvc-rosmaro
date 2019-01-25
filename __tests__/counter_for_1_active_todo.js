import testFlow from '~/testUtils/testFlow';
import addTodo from '~/testSteps/add_todo';
import assertCounterValue from '~/testSteps/assert_counter_value';
import toggleTodo from '~/testSteps/toggle_todo';

test('the counter shows "1 item left"', () =>
	testFlow([
		addTodo({ value: 'todo A' }),
		addTodo({ value: 'todo B' }),
		toggleTodo({ value: 'todo A' }),
		assertCounterValue({ expectedValue: '1 item left' }),
	]));
