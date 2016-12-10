export default function auth () {
  return new Promise(resolve => {
    setTimeout(() => resolve({
      name: 'Vitaly',
      avatar: 'https://avatars2.githubusercontent.com/u/3257149?v=3&s=460',
      uid: 'm0t0r'
    }), 2000);
  });
}

export function checkIfAuthed(store) {
  return store.getState().isAuthed;
};

export function logout() {
  console.log('logged out!');
}