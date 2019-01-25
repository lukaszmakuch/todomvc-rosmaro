import { fireEvent } from 'snabbdom-testing-library';
import { consumeActionsWithEffects } from 'rosmaro-testing-library';

export default ({ testContext }) => ({
	feed: { type: 'RENDER' },
	consume: ({ result }) => {
		testContext.store.clearActions();
		const { queryByLabelText } = testContext.render(result.data);
		const checkbox = queryByLabelText('Mark all as complete');
		fireEvent.click(checkbox);
		const actions = testContext.store.getActions();
		return { step: consumeActionsWithEffects(actions) };
	},
});
