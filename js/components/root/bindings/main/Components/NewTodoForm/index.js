import {defaultHandler} from 'rosmaro-binding-utils';
import {initialValueLens, sliceLens} from 'rosmaro-binding-utils';
import {compose} from 'ramda';

export default opts => ({
  lens: () => compose(
    sliceLens('newTodoForm'), 
    initialValueLens({content: ''}
  )),
  handler: defaultHandler,
});