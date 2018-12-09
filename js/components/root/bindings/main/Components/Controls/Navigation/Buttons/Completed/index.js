import {allTodosButton, completedTodosButton, activeTodosButton, makeBinding} from './../templates';

export default makeBinding({
  selected: 'completed',
  buttons: {
    allTodosButton: allTodosButton.notSelected, 
    completedTodosButton: completedTodosButton.selected, 
    activeTodosButton: activeTodosButton.notSelected,
  }
});