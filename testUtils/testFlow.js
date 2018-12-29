import makeRoot from '~/js/components/root/index';
import {testFlow} from 'rosmaro-testing-library';
import configureStore from 'redux-mock-store';
import rosmaro from 'rosmaro';
import {flatten, pipe, map} from 'ramda';
import render from '~/testUtils/render';

export default flow => () => {
  let store = configureStore([])({});
  const model = rosmaro(makeRoot({...store}));
  testFlow({model, flow, initialTestContext: {render: render(), store}});
};