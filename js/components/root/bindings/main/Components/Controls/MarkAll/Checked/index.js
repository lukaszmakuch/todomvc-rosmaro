import {h} from '~/js/utils/vdom';
import {makeHandler} from '~/js/utils/handlers';

const someIncompleted = () => ({arrow: 'not all are completed'});

export default ({dispatch}) => ({

  handler: makeHandler({

    SOME_TODOS_COMPLETED: someIncompleted,
    NO_TODOS_COMPLETED: someIncompleted,
    NO_TODOS: someIncompleted,

    RENDER: () =>
      [
        h('input#toggle-all.toggle-all', {
          props: {type: 'checkbox', checked: true},
          on: {
            change: ({target: {checked}}) => dispatch({type: 'MARK_NOT_COMPLETED'}),
          }
        }),
        h('label', {attrs: {for: 'toggle-all'}}, 'Mark all as complete'),
      ]

  })

})
