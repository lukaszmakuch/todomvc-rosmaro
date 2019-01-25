export default ({ testContext }) => ({
	feed: { type: 'RENDER' },
	consume: ({ result }) => {
		const { queryByText } = testContext.render(result.data);
		expect(queryByText('Clear completed')).toBeNull();
	},
});
