import {fireEvent} from 'snabbdom-testing-library';

export default ({value}) => ([

  ({testContext}) => ({
    feed: {type: 'RENDER'},
    consume: ({result}) => {
      testContext.store.clearActions();
      const {getByText} = testContext.render(result.data);
      const todoCheckbox = getByText(value)
        .closest('li')
        .querySelector('input[type="checkbox"]');
      fireEvent.click(todoCheckbox);
      expect(testContext.store.getActions()).toHaveLength(1);
      const effect = testContext.store.getActions()[0];
      expect(effect).toMatchObject({type: 'TOGGLE'});
      return {testContext: {...testContext, effect}};
    }
  }),

  ({testContext}) => ({
    feed: testContext.effect,
    consume: ({result: {effect}}) => {
      return {testContext: {...testContext, effect: effect[0].action}};
    }
  }),

  ({testContext}) => ({
    feed: testContext.effect,
    consume: ({result: {effect}}) => {
      return {testContext: {...testContext, effect: effect[0].action}};
    }
  }),

  ({testContext}) => ({
    feed: testContext.effect,
  }),

]);