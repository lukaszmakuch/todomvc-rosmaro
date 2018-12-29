import {fireEvent} from 'snabbdom-testing-library';

export default ([

  ({testContext}) => ({
    feed:{type: 'RENDER'},
    consume: ({result}) => {
      testContext.store.clearActions();
      const {queryByLabelText} = testContext.render(result.data);
      const checkbox = queryByLabelText('Mark all as complete');
      fireEvent.click(checkbox);
      expect(testContext.store.getActions()).toHaveLength(1);
      const effect = testContext.store.getActions()[0];
      return {testContext: {...testContext, effect}};
    }
  }),

  ({testContext}) => ({
    feed: testContext.effect,
    consume: ({result}) => ({testContext: {...testContext, effect: result.effect[0].action}})
  }),

  ({testContext}) => ({
    feed: testContext.effect,
    consume: ({result}) => ({testContext: {...testContext, effect: result.effect[0].action}})
  }),

  ({testContext}) => ({
    feed: testContext.effect,
  }),

]);