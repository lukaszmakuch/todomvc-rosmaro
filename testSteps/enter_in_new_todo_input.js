import {fireEvent} from 'snabbdom-testing-library';

export default ({testContext}) => ({

  feed: {type: 'RENDER'},
  consume: ({result}) => {
    testContext.store.clearActions();
    const {getByPlaceholderText} = testContext.render(result.data);
    const input = getByPlaceholderText('What needs to be done?');
    fireEvent.keyDown(input, {key: 'Enter'});
    expect(testContext.store.getActions()).toHaveLength(1);
    const addTodoAction = testContext.store.getActions()[0];
    expect(addTodoAction).toMatchObject({type: 'ADD'});
    return {testContext: {...testContext, addTodoAction}};
  }
  
});