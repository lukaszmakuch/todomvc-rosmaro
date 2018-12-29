import {fireEvent} from 'snabbdom-testing-library';

export default ({todo}) => ([

  ({testContext}) => ({
    feed: {type: 'RENDER'},
    consume: ({result}) => {
      testContext.store.clearActions();
      const {getByText} = testContext.render(result.data);
      const destroyButton = getByText(todo)
        .closest('li')
        .querySelector('.destroy');
      fireEvent.click(destroyButton);
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