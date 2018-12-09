import {h} from '~/js/utils/vdom';
import {makeHandler} from '~/js/utils/handlers';

export default ({dispatch}) => ({

  handler: makeHandler({

    ALL_TODOS_COMPLETED: () => ({arrow: 'all are completed'}),

    RENDER: () =>
      [
        h('input#toggle-all.toggle-all', {
          props: {type: 'checkbox', checked: false},
          on: {
            change: ({target: {checked}}) => dispatch({type: 'MARK_COMPLETED'}),
          }
        }),
        h('label', {attrs: {for: 'toggle-all'}}, 'Mark all as complete'),
      ]

  })

})
