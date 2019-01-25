import { fireEvent } from 'snabbdom-testing-library';
import { consumeActionsWithEffects } from 'rosmaro-testing-library';

export default ({ value }) => ({ testContext }) => ({
	feed: { type: 'RENDER' },
	consume: ({ result }) => {
		testContext.store.clearActions();
		const { getByText } = testContext.render(result.data);
		const todoCheckbox = getByText(value)
			.closest('li')
			.querySelector('input[type="checkbox"]');
		fireEvent.click(todoCheckbox);
		const actions = testContext.store.getActions();
		return { step: consumeActionsWithEffects(actions) };
	},
});
