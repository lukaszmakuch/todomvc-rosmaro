import assertNewTodoInputValue from './assert_new_todo_input_value';

export default ({content}) => ({testContext}) => ({
  feed: {type: 'RENDER'},
  consume: ({result}) => {
    const {queryByText, container} = testContext.render(result.data);
    const todo = queryByText(content);
    expect(todo).toBeNull();
  }
});