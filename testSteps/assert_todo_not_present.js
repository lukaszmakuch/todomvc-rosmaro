export default ({ value }) => ({ testContext }) => ({
  feed: { type: 'RENDER' },
  consume: ({ result }) => {
    const { queryByText } = testContext.render(result.data);
    const todo = queryByText(value);
    expect(todo).toBeNull();
  },
});
