import { fireEvent, getByDisplayValue } from 'snabbdom-testing-library';
import { consumeActionsWithEffects } from 'rosmaro-testing-library';

export default ({ value, key }) => [
  ({ testContext }) => ({
    feed: { type: 'RENDER' },
    consume: ({ result }) => {
      testContext.store.clearActions();
      const { container } = testContext.render(result.data);
      const allTodos = container.querySelector('.todo-list');
      const input = getByDisplayValue(allTodos, value);
      fireEvent.keyDown(input, { key });
      const actions = testContext.store.getActions();
      return { step: consumeActionsWithEffects(actions) };
    },
  }),
];
