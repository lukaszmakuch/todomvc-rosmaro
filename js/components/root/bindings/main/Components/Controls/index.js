import { makeHandler } from '~/js/utils/handlers';
import { callChildren } from 'rosmaro-binding-utils';
import { h } from '~/js/utils/vdom';

export default opts => ({
	handler: makeHandler({
		RENDER: ({ action, context, children }) => {
			const childrenResults = callChildren({ action, context, children });
			return {
				MarkAll: childrenResults.result.MarkAll.data,
				ClearCompleted: childrenResults.result.ClearCompleted.data,
				Navigation: childrenResults.result.Navigation.data,
			};
		},
	}),
});
