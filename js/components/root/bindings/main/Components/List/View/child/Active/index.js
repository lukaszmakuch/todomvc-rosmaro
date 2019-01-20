import {makeBindings} from './../lib/filtering';

export default makeBindings({
  state: 'active',
  renderWhen: ['all', 'active'],
});