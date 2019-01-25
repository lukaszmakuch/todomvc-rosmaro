import { makeHandler } from '~/js/utils/handlers';
import { h } from '~/js/utils/vdom';
import { trim } from 'ramda';

export const SAVE_CHANGES = ({ context }) => ({
  arrow: 'finished editing',
  context: {
    ...context,
    content: context.newContent,
  },
});

export const REMOVE = ({ context: { id } }) => ({
  effect: [{ type: 'DISPATCH', action: { type: 'TODO_REMOVE', id } }],
});

export const makeBinding = ({ FINISH }) => ({ dispatch }) => ({
  handler: makeHandler({
    TYPE: ({ action: { value }, context }) => {
      const newContent = trim(value);
      const arrow = newContent ? 'changed' : 'cleared';
      return {
        arrow: arrow,
        context: { ...context, newContent },
      };
    },

    DISCARD: ({ context }) => ({ arrow: 'finished editing' }),

    FINISH,

    RENDER: ({ toNode, context }) => {
      const finish = () => dispatch(toNode({ type: 'FINISH' }));
      return h('li.editing', [
        h('input.edit', {
          attrs: { value: context.newContent },
          hook: {
            insert: ({ elm }) => elm.focus(),
          },
          on: {
            blur: finish,
            keydown: ({ key }) => {
              if (key === 'Enter') finish();
              if (key === 'Escape') dispatch(toNode({ type: 'DISCARD' }));
            },
            input: ({ target: { value } }) =>
              dispatch(toNode({ type: 'TYPE', value })),
          },
        }),
      ]);
    },
  }),
});
