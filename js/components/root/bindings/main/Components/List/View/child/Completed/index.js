import { makeBindings } from './../lib/filtering';

export default makeBindings({
  state: 'completed',
  renderWhen: ['all', 'completed'],
  spread: {
    CLEAR_COMPLETED: ({ context: { id } }) => ({
      effect: [{ type: 'DISPATCH', action: { type: 'TODO_REMOVE', id } }],
    }),
  },
});
