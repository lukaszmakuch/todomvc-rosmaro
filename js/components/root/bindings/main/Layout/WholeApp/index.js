import { callChildren, initialValueLens } from 'rosmaro-binding-utils';
import { h } from '~/js/utils/vdom';
import { makeHandler } from '~/js/utils/handlers';

const noTodos = () => ({ arrow: 'no todos left' });

export default ({ name }) => ({
	handler: makeHandler({
		NO_TODOS: noTodos,

		RENDER: () => ({ newTodoForm, list, controls }) =>
			h('section.todoapp', [
				h('header.header', [h('h1', 'todos'), newTodoForm]),
				h('section.main', { attrs: { 'data-testid': 'main' } }, [
					...controls.MarkAll,
					list.list(controls.Navigation.selectTodos),
				]),
				h('footer.footer', { attrs: { 'data-testid': 'footer' } }, [
					list.counter,
					controls.Navigation.ui,
					controls.ClearCompleted,
				]),
			]),
	}),
});
