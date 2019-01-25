import addTodo from '~/testSteps/add_todo';
import toggleTodo from '~/testSteps/toggle_todo';
import testFlow from '~/testUtils/testFlow';
import assertTodoPresent from '~/testSteps/assert_todo_present';
import assertTodoNotPresent from '~/testSteps/assert_todo_not_present';
import assertTodoActive from '~/testSteps/assert_todo_active';
import assertTodoCompleted from '~/testSteps/assert_todo_completed';
import navigateToAll from '~/testSteps/navigate_to_all';
import navigateToActive from '~/testSteps/navigate_to_active';
import navigateToCompleted from '~/testSteps/navigate_to_completed';

describe('routing', () => {
	const addTodos = [
		addTodo({ value: 'todo A' }),
		toggleTodo({ value: 'todo A' }),

		addTodo({ value: 'todo B' }),
		toggleTodo({ value: 'todo B' }),

		addTodo({ value: 'todo C' }),
		addTodo({ value: 'todo D' }),
		addTodo({ value: 'todo E' }),
	];

	it(
		'shows all todos when on the ALL tab',
		testFlow([
			addTodos,

			navigateToAll,

			assertTodoPresent({ expectedContent: 'todo A' }),
			assertTodoCompleted({ value: 'todo A' }),

			assertTodoPresent({ expectedContent: 'todo B' }),
			assertTodoCompleted({ value: 'todo B' }),

			assertTodoPresent({ expectedContent: 'todo C' }),
			assertTodoActive({ value: 'todo C' }),

			assertTodoPresent({ expectedContent: 'todo D' }),
			assertTodoActive({ value: 'todo D' }),

			assertTodoPresent({ expectedContent: 'todo E' }),
			assertTodoActive({ value: 'todo E' }),
		])
	);

	it(
		'shows only active todos when on the ACTIVE tab',
		testFlow([
			addTodos,

			navigateToActive,

			assertTodoNotPresent({ content: 'todo A' }),

			assertTodoNotPresent({ content: 'todo B' }),

			assertTodoPresent({ expectedContent: 'todo C' }),
			assertTodoActive({ value: 'todo C' }),

			assertTodoPresent({ expectedContent: 'todo D' }),
			assertTodoActive({ value: 'todo D' }),

			assertTodoPresent({ expectedContent: 'todo E' }),
			assertTodoActive({ value: 'todo E' }),
		])
	);

	it(
		'shows only completed todos when on the COMPLETED tab',
		testFlow([
			addTodos,

			navigateToCompleted,

			assertTodoPresent({ expectedContent: 'todo A' }),
			assertTodoCompleted({ value: 'todo A' }),

			assertTodoPresent({ expectedContent: 'todo B' }),
			assertTodoCompleted({ value: 'todo B' }),

			assertTodoNotPresent({ content: 'todo C' }),

			assertTodoNotPresent({ content: 'todo D' }),

			assertTodoNotPresent({ content: 'todo E' }),
		])
	);

	it(
		'preserves todos between tabs',
		testFlow([
			addTodos,

			navigateToActive,

			addTodo({ value: 'new todo' }),
			assertTodoPresent({ expectedContent: 'new todo' }),
			assertTodoActive({ value: 'new todo' }),

			navigateToAll,

			assertTodoPresent({ expectedContent: 'todo A' }),
			assertTodoCompleted({ value: 'todo A' }),

			assertTodoPresent({ expectedContent: 'todo B' }),
			assertTodoCompleted({ value: 'todo B' }),

			assertTodoPresent({ expectedContent: 'todo C' }),
			assertTodoActive({ value: 'todo C' }),

			assertTodoPresent({ expectedContent: 'todo D' }),
			assertTodoActive({ value: 'todo D' }),

			assertTodoPresent({ expectedContent: 'todo E' }),
			assertTodoActive({ value: 'todo E' }),

			assertTodoPresent({ expectedContent: 'new todo' }),
			assertTodoActive({ value: 'new todo' }),
		])
	);

	it(
		'always makes new todos active',
		testFlow([
			addTodos,

			navigateToCompleted,

			addTodo({ value: 'new todo' }),
			// The todo is not present, because we added it on the "completed" tab
			// and every new todo is active.
			assertTodoNotPresent({ content: 'new todo' }),

			navigateToActive,

			assertTodoNotPresent({ content: 'todo A' }),

			assertTodoNotPresent({ content: 'todo B' }),

			assertTodoPresent({ expectedContent: 'todo C' }),
			assertTodoActive({ value: 'todo C' }),

			assertTodoPresent({ expectedContent: 'todo D' }),
			assertTodoActive({ value: 'todo D' }),

			assertTodoPresent({ expectedContent: 'todo E' }),
			assertTodoActive({ value: 'todo E' }),

			// This is the todo we added on the "completed" tab.
			assertTodoPresent({ expectedContent: 'new todo' }),
			assertTodoActive({ value: 'new todo' }),

			toggleTodo({ value: 'new todo' }),

			assertTodoNotPresent({ content: 'new todo' }),

			navigateToAll,

			assertTodoPresent({ expectedContent: 'new todo' }),
			assertTodoCompleted({ value: 'new todo' }),
		])
	);
});
