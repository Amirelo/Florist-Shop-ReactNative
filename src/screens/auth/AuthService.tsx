import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {PromocodeModel, UserModel} from '../../models';

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

// Check if user has Sign In before with google Sign In
export const checkIsSignIn = async () => {
  var status = false;
  (await GoogleSignin.isSignedIn()) ? (status = true) : '';
  // Return Sign In status
  return status;
};

// Sign In user with email and password
export const passwordLogin = async (email: string, password: string) => {
  var status = false;
  const res = await auth()
    .signInWithEmailAndPassword(email, password)
    .then(async () => {
      // Check if email is verified
      if (auth().currentUser?.emailVerified) {
        console.log('User Found, Verified');
        status = true;
      } else {
        console.log('Email not verified');
        return false;
      }
    })
    .catch((error: any) => {
      console.log('Error:', error.code);
    });
  console.log(status);
  return status;
};

// Register user to firestore
export const SaveUserFirestore = async (email: string) => {
  await firestore()
    .collection('users')
    // Set Id
    .doc(email)
    // Set parameters
    .set({
      username: email.split('@')[0],
      langPref: '',
      themePref: '',
      phoneNumber: '',
      image:
        'https://images.pexels.com/photos/20094356/pexels-photo-20094356/free-photo-of-tower-of-our-lady-of-fatima-chapel-in-portugal.jpeg',
    })
    .then(async () => {
      if (await signUpPromo(email)) {
        return true;
      }
    })
    .catch(error => {
      console.log('Save user to Firestore error:', error.code);
      return false;
    });
};

// Add New Arrival Promocodes
const signUpPromo = async (email: string) => {
  // Calculate promocode expiration date
  const curDate = new Date();
  const expDate = new Date();
  expDate.setDate(curDate.getDate() + 20);
  // Convert to string
  const expString =
    expDate.getFullYear().toString() +
    (expDate.getMonth().toString().length > 1
      ? expDate.getMonth().toString()
      : '0' + expDate.getMonth().toString()) +
    (expDate.getDay().toString().length > 1
      ? expDate.getDay().toString()
      : '0' + expDate.getDay().toString());
  console.log('exp date string:', expString);

  // Create Promocode
  const userPromo = new PromocodeModel(
    '',
    'New Arrival',
    'A gift for newly created user',
    '%',
    15,
    'https://images.pexels.com/photos/5650041/pexels-photo-5650041.jpeg',
    expDate.toString(),
    'ACTIVE',
  );

  // Add to Firestore
  return await firestore()
    .collection('users')
    .doc(email)
    .collection('promocodes')
    .add({
      title: userPromo.title,
      description: userPromo.description,
      effect: userPromo.effect,
      amount: userPromo.amount,
      image: userPromo.image,
      endDate: userPromo.endDate,
      status: userPromo.status,
    })
    .then(() => {
      console.log('Add arrival promocode success');
      return true;
    })
    .catch((error: any) => {
      console.log('Add arival promocode error:', error);
      return false;
    });
};

// Sign up with email and password
export const passwordSignUp = async (email: string, password: string) => {
  var status = false;
  // Create user with email and password
  const res = await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async credential => {
      console.log('User created');
      status = true;
      // Save user to Firestore
      const userInfo = await getUserInfo(email)
      if (userInfo == null){
        await SaveUserFirestore(email);
      }
      // Send email verification
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

// Sign In with google
export const SignInWithGoogle = async () => {
  try {
    // Get user email
    const userEmail = (await GoogleSignin.signIn()).user.email;
    console.log('user info:', userEmail);

    // Get all user
    const user = await firestore().collection('users').doc(userEmail).get();

    // Sign Up if user data not in Firestore
    user.data()
      ? console.log('User Found')
      : await SaveUserFirestore(userEmail);

    return userEmail;
  } catch (error: any) {
    console.log('error', error.code);
    return false;
  }
};

// Logout of google Sign In
export const googleLogout = async () => {
  // Logout of both google signin and auth
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

// Get user info
export const getUserInfo = async (email: string) => {
  const doc = await firestore().collection('users').doc(email).get();
  const data = doc.data();
  console.log('SERVICE - Get User Info:', data);
  if (data) {
    console.log('User Info found');
    console.log('Username:', data.username);
    const user = new UserModel(
      doc.id,
      data.username,
      data.image,
      data.phoneNumber,
      data.themePref,
      data.langPref,
    );
    return user;
  }
  console.log('User not found');
  return null;
};

// Update User Information base on type
export const updateUserInfo = async (
  type: string,
  data: string,
  email: string,
) => {
  type == 'USERNAME'
    ? await updateUsername(email, data)
    : type == 'PHONENUMBER'
    ? await updatePhoneNumber(email, data)
    : type == 'IMAGE'
    ? await updateImage(email, data)
    : console.log('Update action not found');
};

// Update Username
export const updateUsername = async (email: string, data: string) => {
  await firestore()
    .collection('users')
    .doc(email)
    .update({
      username: data,
    })
    .then(() => {
      console.log('Update username successful');
    })
    .catch(error => console.log('Update username error:', error));
};

// Update phone number
export const updatePhoneNumber = async (email: string, data: string) => {
  await firestore()
    .collection('users')
    .doc(email)
    .update({
      phoneNumber: data,
    })
    .then(() => {
      console.log('Update phone number successful');
    })
    .catch(error => console.log('Update phone number error:', error));
};

// Update User Profile Picture
export const updateImage = async (email: string, data: string) => {
  // Save image to Firebase Storage
  const reference = storage().ref(email + '.png');
  await reference.putFile(data);
  const url = await reference.getDownloadURL();
  console.log(url);
  // Update data in Firestore
  await firestore()
    .collection('users')
    .doc(email)
    .update({
      image: url,
    })
    .then(() => {
      console.log('Update image successful');
    })
    .catch(error => console.log('Update image error:', error));

  return url;
};
