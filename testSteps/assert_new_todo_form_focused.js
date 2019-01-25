export default ({ testContext }) => ({
	feed: { type: 'RENDER' },
	consume: ({ result }) => {
		const { getByPlaceholderText } = testContext.render(result.data);
		const input = getByPlaceholderText('What needs to be done?');
		expect(document.activeElement).toBe(input);
	},
});
