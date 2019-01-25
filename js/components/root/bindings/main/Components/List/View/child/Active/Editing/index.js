import { makeHandler } from '~/js/utils/handlers';

export default () => ({
  handler: makeHandler({
    PREPARE_FOR_PERSISTENCE: () => ({ arrow: 'finished editing' }),
  }),
});
