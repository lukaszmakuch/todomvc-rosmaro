import enterInNewTodoInput from './enter_in_new_todo_input';
import {fireEvent} from 'snabbdom-testing-library';

export default ([

  enterInNewTodoInput,

  ({testContext}) => ({
    feed: testContext.addTodoAction,
    consume: ({result: {effect}}) => {
      expect(effect).toEqual([]);
    }
  }),

]);