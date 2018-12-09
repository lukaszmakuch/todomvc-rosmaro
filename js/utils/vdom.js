import {denyUnlessSigned, signingH} from 'snabbdom-signature';
export const h = signingH(require('snabbdom/h').default);
const snabbdom = require('snabbdom');
export const patch = snabbdom.init([
  denyUnlessSigned,
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/props').default,
  require('snabbdom/modules/attributes').default,
  require('snabbdom/modules/style').default,
  require('snabbdom/modules/eventlisteners').default,
]);

