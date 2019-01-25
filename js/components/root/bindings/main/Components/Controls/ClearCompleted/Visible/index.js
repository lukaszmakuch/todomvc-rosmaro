import { h } from '~/js/utils/vdom';
import { makeHandler } from '~/js/utils/handlers';

const noneCompleted = () => ({ arrow: 'none are completed' });

export default ({ dispatch }) => ({
	handler: makeHandler({
		NO_TODOS_COMPLETED: noneCompleted,
		NO_TODOS: noneCompleted,

		RENDER: () =>
			h(
				'button.clear-completed',
				{
					on: { click: () => dispatch({ type: 'CLEAR_COMPLETED' }) },
				},
				'Clear completed'
			),
	}),
});
