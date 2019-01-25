import testFlow from '~/testUtils/testFlow';
import addTodo from '~/testSteps/add_todo';
import assertTodoPresent from '~/testSteps/assert_todo_present';
import assertTodoNotPresent from '~/testSteps/assert_todo_not_present';
import doubleClickTodo from '~/testSteps/double_click_todo';
import assertEditingTodo from '~/testSteps/assert_editing_todo';
import assertNotEditingTodo from '~/testSteps/assert_not_editing_todo';
import typeInEditField from '~/testSteps/type_in_edit_field';
import keyInEditField from '~/testSteps/key_in_edit_field';
import blurEditField from '~/testSteps/blur_edit_field';
import assertTodoCount from '~/testSteps/assert_todo_count';

describe('editing', () => {
	const addTodos = [
		addTodo({ value: 'todo A' }),
		addTodo({ value: 'todo B' }),

		assertTodoCount({ count: 2 }),

		assertNotEditingTodo({ value: 'todo A' }),
		assertNotEditingTodo({ value: 'todo B' }),
	];

	describe('changing the content if the new one is not empty', () => {
		const startEditing = [
			addTodos,

			doubleClickTodo({ value: 'todo B' }),
			assertEditingTodo({ value: 'todo B' }),
			assertNotEditingTodo({ value: 'todo A' }),

			typeInEditField({ oldValue: 'todo B', newValue: 'updated todo B' }),
		];

		it('finishes when Enter is pressed', () =>
			testFlow([
				startEditing,
				keyInEditField({ value: 'updated todo B', key: 'Enter' }),
				assertNotEditingTodo({ value: 'updated todo B' }),
			]));

		it('finishes when focus is lost', () =>
			testFlow([
				startEditing,
				blurEditField({ value: 'updated todo B' }),
				assertNotEditingTodo({ value: 'updated todo B' }),
			]));
	});

	describe('removing the todo if the field is empty', () => {
		const enterEmptyContent = [
			addTodos,
			doubleClickTodo({ value: 'todo B' }),
			typeInEditField({ oldValue: 'todo B', newValue: '' }),
		];

		const assertTodoRemoved = [
			assertTodoNotPresent({ content: 'todo B' }),
			assertTodoPresent({ expectedContent: 'todo A' }),
			assertTodoCount({ count: 1 }),
		];

		it('removes the todo when Enter is pressed', () =>
			testFlow([
				enterEmptyContent,
				keyInEditField({ value: '', key: 'Enter' }),
				assertTodoRemoved,
			]));

		it('removes the todo when focus is lost', () =>
			testFlow([
				enterEmptyContent,
				blurEditField({ value: '' }),
				assertTodoRemoved,
			]));
	});

	it('discardes changes when Escape is pressed', () =>
		testFlow([
			addTodos,
			doubleClickTodo({ value: 'todo A' }),
			typeInEditField({ oldValue: 'todo A', newValue: 'updated todo A' }),
			keyInEditField({ value: 'updated todo A', key: 'Escape' }),
			assertTodoPresent({ expectedContent: 'todo A' }),
			assertTodoPresent({ expectedContent: 'todo B' }),
			assertNotEditingTodo({ value: 'todo A' }),
			assertTodoNotPresent({ content: 'updated todo A' }),
		]));
});
