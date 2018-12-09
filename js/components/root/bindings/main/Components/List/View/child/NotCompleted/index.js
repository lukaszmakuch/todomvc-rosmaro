import {callChildren} from 'rosmaro-binding-utils';
import {makeHandler} from '~/js/utils/handlers';
import {values} from 'ramda';

export default () => ({
    
  handler: makeHandler({
    GET_STATE: () => 'notCompleted',
    RENDER: ({context, action, children}) => {
      const rendered = values(callChildren({context, action, children}).result)[0].data;
      return {
        all: rendered,
        completed: '',
        active: rendered
      };
    }
  }),

});