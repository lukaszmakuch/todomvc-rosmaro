import {callChildren} from 'rosmaro-binding-utils';
import {makeHandler} from '~/js/utils/handlers';
import {values, xprod, fromPairs} from 'ramda';

const allFilters = ['all', 'completed', 'active'];

export const makeBindings = ({state, renderWhen, spread}) => () => ({

  handler: makeHandler({
    GET_STATE: () => state,
    RENDER: ({context, action, children}) => {
      const rendered = values(callChildren({context, action, children}).result)[0].data;
      return {
        ...fromPairs(xprod(allFilters, [''])),
        ...fromPairs(xprod(renderWhen, [rendered]))
      }
    },
    ...spread,
  }),

});