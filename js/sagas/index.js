import {isEffect} from 'rosmaro-redux';
import {put, takeEvery, all} from 'redux-saga/effects';
const matchEffect = type => action => isEffect(action) && action.type === type;

const dispatch = function* ({action}) {
  yield put(action);
};

const watchDispatch = function* () {
  yield takeEvery(matchEffect('DISPATCH'), dispatch);
};

export default function* () {
  yield all([
    watchDispatch()
  ]);
};