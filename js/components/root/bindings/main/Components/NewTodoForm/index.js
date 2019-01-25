import { transparentHandler } from '~/js/utils/handlers';
import { initialValueLens, sliceLens } from 'rosmaro-binding-utils';
import { compose } from 'ramda';

export default opts => ({
	lens: () =>
		compose(
			sliceLens('newTodoForm'),
			initialValueLens({ content: '' })
		),
	handler: transparentHandler,
});
