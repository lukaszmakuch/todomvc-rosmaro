export default ({ content }) => ({ testContext }) => ({
	feed: { type: 'RENDER' },
	consume: ({ result }) => {
		const { queryByText } = testContext.render(result.data);
		const todo = queryByText(content);
		expect(todo).toBeNull();
	},
});
