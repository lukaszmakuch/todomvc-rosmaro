import { fireEvent } from 'snabbdom-testing-library';
import { consumeActionsWithEffects } from 'rosmaro-testing-library';

export default ({ testContext }) => ({
  feed: { type: 'RENDER' },
  consume: ({ result }) => {
    testContext.store.clearActions();
    const { queryByText } = testContext.render(result.data);
    const clearCompletedButton = queryByText('Clear completed');
    fireEvent.click(clearCompletedButton);
    const actions = testContext.store.getActions();
    return { step: consumeActionsWithEffects(actions) };
  },
});
