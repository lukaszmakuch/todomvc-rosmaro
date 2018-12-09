import {h} from '~/js/utils/vdom';

export const RENDER = ({checked, ON_CHANGE, dispatch}) => () => ([
  h('input#toggle-all.toggle-all', {
    props: {type: 'checkbox', checked},
    on: {
      change: () => dispatch({type: ON_CHANGE}),
    }
  }),
  h('label', {attrs: {for: 'toggle-all'}}, 'Mark all as complete'),
]);