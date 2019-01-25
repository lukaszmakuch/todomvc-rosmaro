export default ({ value }) => ({ testContext }) => ({
  feed: { type: 'RENDER' },
  consume: ({ result }) => {
    const { getByText } = testContext.render(result.data);
    const todoLi = getByText(value).closest('li');
    expect(todoLi).not.toHaveClass('completed');
  },
});
