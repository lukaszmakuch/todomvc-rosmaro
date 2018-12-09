import rosmaro from 'rosmaro';
import {createStore, applyMiddleware} from 'redux'
import makeRoot from './components/root/index';
import {composeWithDevTools} from 'redux-devtools-extension';
import {makeReducer, effectDispatcher} from 'rosmaro-redux';
import {patch} from '~/js/utils/vdom';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import Navigo from 'navigo';

const storageKey = 'rosmaro-todomvc';
const storage = {
  store(state) {
    localStorage.setItem(storageKey, JSON.stringify(state));
  },
  read() {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : undefined;
  }
};

var dispatchFn = () => {};
const dispatch = (action) => {
  dispatchFn(action);
};

const modelDescription = makeRoot({
  dispatch
});

const model = rosmaro(modelDescription);

const rootReducer = makeReducer(model);
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  storage.read(),
  composeWithDevTools(
    applyMiddleware(effectDispatcher, sagaMiddleware)
  )
);

sagaMiddleware.run(rootSaga);

dispatchFn = store.dispatch;

const container = document.getElementById('app-root');

let lastView = container;
const renderAction = {type: 'RENDER'};
const refreshView = () => {
  const {state} = store.getState();
  const newView = model({state, action: renderAction}).result.data;
  patch(lastView, newView);
  lastView = newView;
};

const persist = () => {
  const {state} = store.getState();
  storage.store(model({state, action: {type: 'PREPARE_FOR_PERSISTENCE'}}));
};

store.subscribe(refreshView);
store.subscribe(persist);

refreshView();

let router = new Navigo(null, true, '#');
// consider moving it closer to the consuming code
router
  .on('/', () => dispatchFn({type: 'NAVIGATE_TO_ALL'}))
  .on('/active', () => dispatchFn({type: 'NAVIGATE_TO_ACTIVE'}))
  .on('/completed', () => dispatchFn({type: 'NAVIGATE_TO_COMPLETED'}))
  .resolve();