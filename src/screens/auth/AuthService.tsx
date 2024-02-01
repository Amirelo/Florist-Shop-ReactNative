import auth, {FirebaseAuthTypes, firebase} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  scopes: [],
  webClientId:
    '1062427919397-kol5gfgtpsupm9j9l4gqrjvbf2ehgv76.apps.googleusercontent.com',
  offlineAccess: true,
});

export const sendVerificationEmail = async (user: FirebaseAuthTypes.User) => {
  await user
    .sendEmailVerification()
    .then(() => console.log('Email sent'))
    .catch(error => console.log('Error sending email:', error.code));
};

export const checkIsSignIn = async() => {
  var status = false
  await GoogleSignin.isSignedIn() ? status = true : '';
  return status;
}

export const passwordLogin = async (email: string, password: string) => {
  var status = false;
  const res = await auth()
    .signInWithEmailAndPassword(email, password)
    .then(async () => {
      console.log('User Found');
      status = true;
    })
    .catch((error: any) => {
      console.log('Error:', error.code);
    });
  console.log(status);
  return status;
};

export const passwordSignUp = async (email: string, password: string) => {
  var status = false;
  const res = await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async credential => {
      console.log('User created');
      status = true;
      await credential.user
        .sendEmailVerification()
        .then(() => console.log('Email sent'))
        .catch((error: any) => console.log('Error sending email:', error.code));
    })
    .catch(error => {
      console.log('Error creating user:', error);
    });
  console.log(status);
  return status;
};

export const googleLogout = async () => {
  (await GoogleSignin.isSignedIn()) ? GoogleSignin.signOut() : '';
  auth().currentUser != null ? auth().signOut() : '';
  return true;
};

export const sendPasswordChangeEmail = async (email: string) => {
  return await auth()
    .sendPasswordResetEmail(email)
    .then(() => console.log('Change password email sent'))
    .catch((error: any) => console.log('Error sending email:', error.code));
};

export const SignInWithGoogle = async () => {
  try {
    const userInfo = await GoogleSignin.signIn();
    console.log('user info:', userInfo);
    return true;
  } catch (error: any) {
    console.log('error', error.code);
    return false;
  }
};
