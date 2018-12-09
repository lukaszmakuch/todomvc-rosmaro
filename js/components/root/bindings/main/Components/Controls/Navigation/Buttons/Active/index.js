import {allTodosButton, completedTodosButton, activeTodosButton, makeBinding} from './../templates';

export default makeBinding({
  selected: 'active',
  buttons: {
    allTodosButton: allTodosButton.notSelected, 
    completedTodosButton: completedTodosButton.notSelected, 
    activeTodosButton: activeTodosButton.selected,
  }
});