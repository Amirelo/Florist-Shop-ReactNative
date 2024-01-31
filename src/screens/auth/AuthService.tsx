import auth, {FirebaseAuthTypes, firebase} from '@react-native-firebase/auth';

export const sendVerificationEmail = async (user: FirebaseAuthTypes.User) => {
  await user
    .sendEmailVerification()
    .then(() => console.log('Email sent'))
    .catch(error => console.log('Error sending email:', error.code));
};

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
    .then(async (credential) => {
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

export const logout = async () => {
  return await auth()
    .signOut()
    .then(() => console.log('Logout'));
};
