import {ref} from 'config/constants';

function saveToDucks (duck) {
  const duckId = ref.child('ducks').push().key;
  const duckPromise = ref.child(`ducks/${duckId}`).set({...duck, duckId});
  return {duckId, duckPromise};
}

function saveToUserDucks (duck, duckId) {
  return ref.child(`usersDucks/${duck.uid}/${duckId}`).set({...duck, duckId});
}

function saveLikeCount (duckId) {
  return ref.child(`likeCount/${duckId}`).set(0);
}

export function saveDuck (duck) {
  const {duckId, duckPromise} = saveToDucks(duck);

  return Promise.all([
    duckPromise,
    saveToUserDucks(duck, duckId),
    saveLikeCount(duckId)
  ]).then(() => ({...duck, duckId}));
}
