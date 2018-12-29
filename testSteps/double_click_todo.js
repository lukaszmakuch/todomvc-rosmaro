import {fireEvent} from 'snabbdom-testing-library';
import {consumeActionsWithEffects} from 'rosmaro-testing-library';

export default ({value}) => ({testContext}) => ({
  feed: {type: 'RENDER'},
  consume: ({result}) => {
    testContext.store.clearActions();
    const {getByText} = testContext.render(result.data);
    const todo = getByText(value);
    fireEvent.dblClick(todo);
    return {step: consumeActionsWithEffects(testContext.store.getActions())};
  }
});