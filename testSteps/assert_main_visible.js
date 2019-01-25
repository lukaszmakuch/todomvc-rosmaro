export default ({ testContext }) => ({
  feed: { type: 'RENDER' },
  consume: ({ result }) => {
    const { queryByTestId } = testContext.render(result.data);
    expect(queryByTestId('main')).toBeVisible();
  },
});
