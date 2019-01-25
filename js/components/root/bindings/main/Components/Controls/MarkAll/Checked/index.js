import { makeHandler } from '~/js/utils/handlers';
import { RENDER } from './../lib/view';

const someIncompleted = () => ({ arrow: 'not all are completed' });

export default ({ dispatch }) => ({
  handler: makeHandler({
    SOME_TODOS_COMPLETED: someIncompleted,
    NO_TODOS_COMPLETED: someIncompleted,
    NO_TODOS: someIncompleted,
    RENDER: RENDER({
      dispatch,
      checked: true,
      ON_CHANGE: 'MARK_NOT_COMPLETED',
    }),
  }),
});
