export default ({ testContext }) => ({
  feed: { type: 'RENDER' },
  consume: ({ result }) => {
    const { queryByLabelText } = testContext.render(result.data);
    expect(queryByLabelText('Mark all as complete')).toBeNull();
  },
});
