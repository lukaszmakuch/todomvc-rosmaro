export default ({ expectedValue }) => ({ testContext }) => ({
  feed: { type: 'RENDER' },
  consume: ({ result }) => {
    const { container } = testContext.render(result.data);
    const counter = container.querySelector('span.todo-count');
    expect(counter).toHaveTextContent(expectedValue);
  },
});
