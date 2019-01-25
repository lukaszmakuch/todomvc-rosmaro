import {
	allTodosButton,
	completedTodosButton,
	activeTodosButton,
	makeBinding,
} from './../lib/templates';

export default makeBinding({
	selected: 'all',
	buttons: {
		allTodosButton: allTodosButton.selected,
		completedTodosButton: completedTodosButton.notSelected,
		activeTodosButton: activeTodosButton.notSelected,
	},
});
