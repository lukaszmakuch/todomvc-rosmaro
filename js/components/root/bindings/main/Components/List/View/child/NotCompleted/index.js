import {makeBindings} from './../lib/filtering';

export default makeBindings({
  state: 'notCompleted',
  renderWhen: ['all', 'active'],
});