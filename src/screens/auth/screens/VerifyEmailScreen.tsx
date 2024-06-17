// React and libs
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {faArrowLeft, faEnvelope} from '@fortawesome/free-solid-svg-icons';

// Constants
import {IMAGE_AUTH_BACKGROUND, MSG_FIELDS_EMPTY, MSG_PSCHANGE_NEW_USER, MSG_PSCHANGE_SUCCESS, MSG_USER_NOT_FOUND} from '../../../constants/AppConstants';

// Services
import {
  getUserInfo,
  passwordSignUp,
  sendPasswordChangeEmail,
} from '../AuthService';

// Components
import {CustomText, CustomView, CustomImage} from '../../../components/atoms';
import {CustomInput} from '../../../components/molecules';
import {ImageButton, TextButton} from '../../../components/molecules/buttons';

// User Preferences
import lang from '../../../language/lang';
import { addMessage } from '../../../redux/actions/PreferenceAction';

const VerifyEmailScreen = () => {
  // Initials
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch();

  // Fields
  const [email, setEmail] = React.useState('');

  // Saved language
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );

  // Send email and navigate to Action Complete Screen when finish
  const onSendEmailPressed = async () => {
    if (email.length > 0) {
      const userInfo = await getUserInfo(email);
      if (userInfo != null) {
        var charset = '';
        charset += 'abcdefghijklmnopqrstuvwxyz';
        charset += '0123456789';
        charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var randomPassword: string = '';
        for (let i = 0; i < 20; i++) {
          randomPassword += charset.charAt(
            Math.floor(Math.random() * charset.length),
          );
        }

        const signUpStatus = await passwordSignUp(email, randomPassword);
        if (signUpStatus) {
          dispatch(addMessage(MSG_PSCHANGE_NEW_USER))
          console.log('New Auth User created');
        } else {
          dispatch(addMessage(MSG_PSCHANGE_SUCCESS))
          console.log('User already existed, send password changeEmail');
        }
        sendPasswordChangeEmail(email);
        navigation.goBack();
      } else {
        dispatch(addMessage(MSG_USER_NOT_FOUND))
        console.log('User not found. Please go to create account');
      }
    } else {
      dispatch(addMessage(MSG_FIELDS_EMPTY))
      console.log('Fields cannot be empty');
    }
  };

  // Go back to Sign In Screen
  const onBackButtonPressed = () => {
    navigation.goBack();
  };

  return (
    <CustomView>
      {/* Background Image */}
      <CustomView type={'backgroundImage'}>
        <CustomImage type="background" source={IMAGE_AUTH_BACKGROUND} />
      </CustomView>
      {/* Authentication Card */}
      <CustomView type="authCard">
        {/* Title and back button */}
        <CustomView type={'itemRow'} style={{marginBottom:20}}>
          <ImageButton icon={faArrowLeft} onPressed={onBackButtonPressed} />
          <CustomText type="title" fontWeight="bold">
            {lang[langPref]['verify_title']}
          </CustomText>
        </CustomView>

        {/* Input - email */}
        <CustomInput
          marginBottom={20}
          onChangeText={setEmail}
          placeholder={lang[langPref]['edEmail']}
          icon={faEnvelope}
        />

        {/* Button - Send Change password email */}
        <TextButton type="primary" onPressed={onSendEmailPressed}>
          {lang[langPref]['buttonVerify']}
        </TextButton>
      </CustomView>
    </CustomView>
  );
};

export default VerifyEmailScreen;
