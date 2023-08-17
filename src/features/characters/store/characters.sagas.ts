import { SagaIterator } from '@redux-saga/core'
import { call, put, takeEvery } from 'redux-saga/effects'

import {
  createCharacter,
  deleteCharacter,
  getCharacters,
  updateCharacter,
} from 'features/characters/api/index'
import { charactersAction } from 'features/characters/store/characters.slice'
import { Character } from 'features/characters/types/index'

// Worker Sagas
export function* onGetCharacters(): SagaIterator {
  const characters: Character[] = yield call(getCharacters)
  yield put(charactersAction.fetchAllSucceeded(characters))
}

function* onCreateCharacter({
  payload,
}: {
  type: typeof charactersAction.create
  payload: Character
}): SagaIterator {
  yield call(createCharacter, payload)
  yield put(charactersAction.fetchAll())
}

function* onUpdateCharacter({
  payload,
}: {
  type: typeof charactersAction.update
  payload: Character
}): SagaIterator {
  yield call(updateCharacter, payload)
  yield put(charactersAction.fetchAll())
}

function* onDeleteCharacter({
  id,
}: {
  type: typeof charactersAction.delete
  id: string
}): SagaIterator {
  yield call(deleteCharacter, id)
  yield put(charactersAction.fetchAll())
}

// Watcher Saga
export function* charactersWatcherSaga(): SagaIterator {
  yield takeEvery(charactersAction.fetchAll.type, onGetCharacters)
  yield takeEvery(charactersAction.create.type, onCreateCharacter)
  yield takeEvery(charactersAction.update.type, onUpdateCharacter)
  yield takeEvery(charactersAction.delete.type, onDeleteCharacter)
}

export default charactersWatcherSaga
