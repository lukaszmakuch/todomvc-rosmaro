export default ({count}) => ({testContext}) => ({
  feed: {type: 'RENDER'},
  consume: ({result}) => {
    const {container} = testContext.render(result.data);
    const todos = container.querySelectorAll('.todo-list li');
    expect(todos).toHaveLength(count);
  }
});