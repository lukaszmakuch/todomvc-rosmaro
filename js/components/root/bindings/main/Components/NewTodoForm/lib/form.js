import {h} from '~/js/utils/vdom';
import {makeHandler} from '~/js/utils/handlers';
import {trim} from 'ramda';

export const ADD = ({context: {content}}) => ({
  context: {content: ''},
  arrow: 'cleared',
  effect: [{type: 'DISPATCH', action: {type: 'TODO_ADD', content}}],
});

export const makeBinding = ({ADD}) => ({dispatch}) => ({

  handler: makeHandler({

    ADD,

    RENDER: ({toNode, context}) =>
      h('input.new-todo', {
        props: {
          placeholder: 'What needs to be done?',
          value: context.content,
        },
        hook: {
          insert: ({elm}) => elm.focus()
        },
        on: {
          keydown: ({key}) => key === "Enter" 
            ? dispatch(toNode({type: 'ADD'})) 
            : undefined,
          input: ({target: {value}}) => dispatch(toNode({type: 'TYPE', value}))
        }
      }),

    TYPE: ({action: {value}, context}) => {
      const content = trim(value);
      const arrow = content ? 'changed' : 'cleared';
      return {
        arrow: arrow,
        context: {...context, content}
      };
    },

  })

});