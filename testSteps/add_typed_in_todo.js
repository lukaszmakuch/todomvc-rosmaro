import {fireEvent} from 'snabbdom-testing-library';
import assertNewTodoInputValue from './assert_new_todo_input_value';
import enterInNewTodoInput from './enter_in_new_todo_input';

export default ([

  enterInNewTodoInput,

  ({testContext}) => ({
    feed: testContext.addTodoAction,
    consume: ({result: {effect}}) => {
      expect(effect).toHaveLength(1);
      expect(effect[0].type).toEqual('DISPATCH');
      const actionAfterTryingToAddTodo = effect[0].action;
      return {
        testContext: {...testContext, addTodoAction: actionAfterTryingToAddTodo}
      };
    }
  }),

  ({testContext}) => ({
    feed: testContext.addTodoAction,
    consume: ({result: {effect}}) => ({
      testContext: {...testContext, effect: effect[0].action}
    })
  }),

  ({testContext}) => ({
    feed: testContext.effect,
    consume: ({result: {effect}}) => ({
      testContext: {...testContext, effect: effect[0].action}
    })
  }),

  ({testContext}) => ({feed: testContext.effect}),

]);