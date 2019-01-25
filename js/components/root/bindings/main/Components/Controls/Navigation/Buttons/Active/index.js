import {
  allTodosButton,
  completedTodosButton,
  activeTodosButton,
  makeBinding,
} from './../lib/templates';

export default makeBinding({
  selected: 'active',
  buttons: {
    allTodosButton: allTodosButton.notSelected,
    completedTodosButton: completedTodosButton.notSelected,
    activeTodosButton: activeTodosButton.selected,
  },
});
