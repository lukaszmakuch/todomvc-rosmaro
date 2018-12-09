import {h} from '~/js/utils/vdom';
import {makeHandler} from '~/js/utils/handlers';

const someCompleted = () => ({arrow: 'some are completed'});

export default ({dispatch}) => ({

  handler: makeHandler({

    ALL_TODOS_COMPLETED: someCompleted,
    SOME_TODOS_COMPLETED: someCompleted,

    RENDER: () => ''

  })

});