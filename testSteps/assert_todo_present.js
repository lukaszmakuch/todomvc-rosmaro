import assertNewTodoInputValue from './assert_new_todo_input_value';

export default ({expectedContent}) => ({testContext}) => ({
  feed: {type: 'RENDER'},
  consume: ({result}) => {
    const {queryByText, container} = testContext.render(result.data);
    const todo = queryByText(expectedContent);
    expect(todo).toBeVisible();
  }
});