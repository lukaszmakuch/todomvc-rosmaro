import { fireEvent } from 'snabbdom-testing-library';
import { consumeActionsWithEffects } from 'rosmaro-testing-library';

export default ({ todo }) => ({ testContext }) => ({
	feed: { type: 'RENDER' },
	consume: ({ result }) => {
		testContext.store.clearActions();
		const { getByText } = testContext.render(result.data);
		const destroyButton = getByText(todo)
			.closest('li')
			.querySelector('.destroy');
		fireEvent.click(destroyButton);
		const actions = testContext.store.getActions();
		return { step: consumeActionsWithEffects(actions) };
	},
});
