import { makeHandler } from '~/js/utils/handlers';

export default opts => ({
  handler: makeHandler({
    CLEAR_COMPLETED: ({ context: { id } }) => ({
      effect: { type: 'DISPATCH', action: { type: 'TODO_REMOVE', id } },
    }),

    PREPARE_FOR_PERSISTENCE: () => ({ arrow: 'finished editing' }),
  }),
});
