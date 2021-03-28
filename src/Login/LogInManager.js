import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
export const initializeLogInFramwork = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
}
// ===================== Google sign in =======================
export const handleGoogleSignIn = () => {
  const gProvider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth()
    .signInWithPopup(gProvider)
    .then(result => {
      const { displayName, photoURL, email } = result.user
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      }
      return signedInUser
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
}
// =================== Facebook sign in function =====================
export const handleFbSignIn = () => {
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
      var user = result.user;
      user.success = true
      return user
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);

    });
}
//  Sign in function 
export const handleSignOut = () => {
  return firebase.auth().signOut()
    .then((res) => {
      // Sign-out successful.
      const signedOutUser = {
        isSignedIn: false,
        displayName: "",
        email: "",
        photo: ""
      }
      return signedOutUser
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
}
// ================== Create user  with email and password function ===================
export const createUserWithEmailAndPassword = (name, email, password ) => {
  return firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.success = true;
      newUserInfo.error = "";
      updatUserInfo(name)
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    })
}
 //================== Sign in with email and password function =================== 
export const signInWithEmailAndPassword = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email,password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.success = true;
      newUserInfo.error = "";
      return newUserInfo;

    })
    .catch((error) => {
      const newUserInfo = { };
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
}

const updatUserInfo = (name) => {
  var user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: name,
  }).then(() => {
    console.log("user name updated successfully");
  }).catch((error) => {
    console.log(error);
  });
}