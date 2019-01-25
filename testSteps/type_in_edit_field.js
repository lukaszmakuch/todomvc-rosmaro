import { fireEvent } from 'snabbdom-testing-library';
import { consumeActionsWithEffects } from 'rosmaro-testing-library';

export default ({ oldValue, newValue }) => ({ testContext }) => ({
  feed: { type: 'RENDER' },
  consume: ({ result }) => {
    testContext.store.clearActions();
    const { getByDisplayValue } = testContext.render(result.data);
    const input = getByDisplayValue(oldValue);
    fireEvent.input(input, { target: { value: newValue } });
    return { step: consumeActionsWithEffects(testContext.store.getActions()) };
  },
});
