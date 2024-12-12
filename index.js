//\Full\flatReact\src\context\index.js

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.syncUserWithFirestore = functions.auth.user().onCreate((user) => {
  const userRef = admin.firestore().collection('users').doc(user.uid);

  return userRef.set({
    uid: user.uid,
    email: user.email,
    firstName: user.displayName ? user.displayName.split(' ')[0] : '',
    lastName: user.displayName ? user.displayName.split(' ')[1] : '',
    birthDate: '1111-11-11', // poți seta o dată default
    isAdmin: false // sau true, în funcție de logică
  });
});

exports.updateUserInFirestore = functions.auth.user().onUpdate((change) => {
  const user = change.after;
  const userRef = admin.firestore().collection('users').doc(user.uid);

  return userRef.update({
    email: user.email,
    firstName: user.displayName ? user.displayName.split(' ')[0] : '',
    lastName: user.displayName ? user.displayName.split(' ')[1] : ''
  });
});
