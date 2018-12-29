import render from '~/testUtils/render';
import {fireEvent} from 'snabbdom-testing-library';
import {is, map, pipe, filter, flatten, propEq} from 'ramda';
import {consumeActionsWithEffects} from 'rosmaro-testing-library';

export default ([

  ({testContext}) => ({
    feed: {type: 'RENDER'},
    consume: ({result}) => {
      testContext.store.clearActions();
      const {queryByText} = testContext.render(result.data);
      const clearCompletedButton = queryByText('Clear completed');
      fireEvent.click(clearCompletedButton);
      const actions = testContext.store.getActions();
      expect(actions).toHaveLength(1);
      return {
        testContext: {...testContext, actionToDispatch: actions[0]},
        step: consumeActionsWithEffects(actions),
      };
    }
  }),

]);