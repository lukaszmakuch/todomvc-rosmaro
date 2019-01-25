export default ({ value }) => ({ testContext }) => ({
  feed: { type: 'RENDER' },
  consume: ({ result }) => {
    const { getByDisplayValue } = testContext.render(result.data);
    const todoLi = getByDisplayValue(value).closest('li');
    expect(todoLi).toHaveClass('editing');
  },
});
