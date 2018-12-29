import {fireEvent} from 'snabbdom-testing-library';
import assertNewTodoInputValue from './assert_new_todo_input_value';

export default ({value}) => ([

  ({testContext}) => ({
    feed: {type: 'RENDER'},
    consume: ({result}) => {
      testContext.store.clearActions();
      const {getByPlaceholderText} = testContext.render(result.data);
      const input = getByPlaceholderText('What needs to be done?');
      fireEvent.input(input, {target: {value}});
      expect(testContext.store.getActions()).toHaveLength(1);
      const typedAction = testContext.store.getActions()[0];
      expect(typedAction).toMatchObject({type: 'TYPE', value: value});
      return {testContext: {...testContext, typedAction}};
    }
  }),

  ({testContext}) => ({feed: testContext.typedAction}),

  assertNewTodoInputValue({expectedValue: value}),

]);