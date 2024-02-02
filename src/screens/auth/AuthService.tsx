import auth, {FirebaseAuthTypes, firebase} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// Config for signing in with Google
GoogleSignin.configure({
  scopes: [],
  webClientId:
    '1062427919397-kol5gfgtpsupm9j9l4gqrjvbf2ehgv76.apps.googleusercontent.com',
  offlineAccess: true,
});

// Send verification email if signing in with email and password
export const sendVerificationEmail = async (user: FirebaseAuthTypes.User) => {
  await user
    .sendEmailVerification()
    .then(() => console.log('Email sent'))
    .catch(error => console.log('Error sending email:', error.code));
};

// Check if user has sign in before with google sign in
export const checkIsSignIn = async() => {
  var status = false
  await GoogleSignin.isSignedIn() ? status = true : '';
  return status;
}

// Sign in user with email and password
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

// Sign up with email and password
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

// Sign in with google
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

// Logout of google sign in
export const googleLogout = async () => {
  (await GoogleSignin.isSignedIn()) ? GoogleSignin.signOut() : '';
  auth().currentUser != null ? auth().signOut() : '';
  return true;
};

// Send email to change password
export const sendPasswordChangeEmail = async (email: string) => {
  return await auth()
    .sendPasswordResetEmail(email)
    .then(() => console.log('Change password email sent'))
    .catch((error: any) => console.log('Error sending email:', error.code));
};

