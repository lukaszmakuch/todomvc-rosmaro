export default ({ expectedContent }) => ({ testContext }) => ({
	feed: { type: 'RENDER' },
	consume: ({ result }) => {
		const { queryByText } = testContext.render(result.data);
		const todo = queryByText(expectedContent);
		expect(todo).toBeVisible();
	},
});
