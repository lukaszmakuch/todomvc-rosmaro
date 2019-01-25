import { makeHandler } from '~/js/utils/handlers';
import { RENDER } from './../lib/view';

export default ({ dispatch }) => ({
	handler: makeHandler({
		ALL_TODOS_COMPLETED: () => ({ arrow: 'all are completed' }),
		RENDER: RENDER({ dispatch, checked: false, ON_CHANGE: 'MARK_COMPLETED' }),
	}),
});
