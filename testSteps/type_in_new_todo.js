import { fireEvent } from 'snabbdom-testing-library';
import { consumeActionsWithEffects } from 'rosmaro-testing-library';

export default ({ value }) => ({ testContext }) => ({
  feed: { type: 'RENDER' },
  consume: ({ result }) => {
    testContext.store.clearActions();
    const { getByPlaceholderText } = testContext.render(result.data);
    const input = getByPlaceholderText('What needs to be done?');
    fireEvent.input(input, { target: { value } });
    const actions = testContext.store.getActions();
    return { step: consumeActionsWithEffects(actions) };
  },
});
