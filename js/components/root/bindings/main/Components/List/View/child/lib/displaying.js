import {makeHandler} from '~/js/utils/handlers';
import {h} from '~/js/utils/vdom';

export const MARK_COMPLETED = () => ({arrow: 'marked as completed'});

export const MARK_NOT_COMPLETED = () => ({arrow: 'marked as not completed'});

export const RENDER = ({classes, checked}) => ({dispatch}) => ({toNode, context}) => 
  h('li', {class: classes}, [
    h('div.view', [
      h('input.toggle', {
        props: {type: 'checkbox', checked},
        on: {
          change: ({target: {checked}}) => dispatch(toNode({type: 'TOGGLE'})),
        }
      }),
      h('label', {
        on: {
          dblclick: () => dispatch(toNode({type: 'EDIT'}))
        }
      }, context.content),
      h('button.destroy', {
        on: {
          click: () => dispatch({type: 'TODO_REMOVE', id: context.id})
        }
      }),
    ])
  ]);

export const makeBinding = ({RENDER, TOGGLE, spread}) => ({dispatch}) => ({
    
  handler: makeHandler({

    RENDER: RENDER({dispatch}),

    TOGGLE,

    ...spread,

    EDIT: ({context}) => ({
      arrow: 'started editing',
      context: {...context, newContent: context.content},
    }),
  
  })

});