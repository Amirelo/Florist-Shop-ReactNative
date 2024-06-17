// React and libs
import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  faArrowLeft,
  faEnvelope,
  faLock,
} from '@fortawesome/free-solid-svg-icons';

// Constants
import {
  IMAGE_AUTH_BACKGROUND,
  MSG_FIELDS_EMPTY,
  MSG_PASSWORDS_MISMATCH,
  MSG_SIGNUP_FAIL,
  MSG_SIGNUP_SUCCESS,
  NAVIGATION_AUTH_ACTIONCOMPLETE,
} from '../../../constants/AppConstants';

// Services
import {passwordSignUp} from '../AuthService';

// Components
import {CustomImage, CustomText, CustomView} from '../../../components/atoms';
import {CustomInput} from '../../../components/molecules';
import {ImageButton, TextButton} from '../../../components/molecules/buttons';

// Preferences
import lang from '../../../language/lang';
import { addMessage } from '../../../redux/actions/PreferenceAction';

const SignUpScreen = () => {
  // Initial
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch()

  // Fields
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  // Saved language
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );

  // Check if all fields are not empty
  const checkFields = () => {
    var status = true
    if (email.length <= 0 &&
      password.length <= 0 && 
      confirmPassword.length <= 0){
        dispatch(addMessage(MSG_FIELDS_EMPTY));
        status = false
      }  
      if(password != confirmPassword){
        dispatch(addMessage(MSG_PASSWORDS_MISMATCH));
        status = false
      } 
    return status;
  };

  // Go back to Sign In Screen
  const onBackButtonPressed = () => {
    navigation.goBack();
  };

  // Sign Up on pressed
  const onSignUpPressed = async() => {
    if(checkFields()){
      const res = await passwordSignUp(email, password)
      if (res == true){
        dispatch(addMessage(MSG_SIGNUP_SUCCESS))
      } else{
        dispatch(addMessage(MSG_SIGNUP_FAIL));
      }
      navigation.navigate(NAVIGATION_AUTH_ACTIONCOMPLETE, {
        title: lang[langPref]['complete_signup_title'],
        description: lang[langPref]['complete_signup_description'],
      })
    } else{
    }
    
  };

  return (
    <CustomView>
      {/* Background Image */}
      <CustomView type={'backgroundImage'}>
        <CustomImage
          type="background"
          resizeMode="cover"
          source={IMAGE_AUTH_BACKGROUND}
        />
      </CustomView>
      {/* Authentication card */}
      <CustomView type={'authCard'}>
        {/* Title and back button */}
        <CustomView type={'itemRow'} marignBottom={20}>
          <ImageButton icon={faArrowLeft} onPressed={onBackButtonPressed} />
          <CustomText type="title" fontWeight="bold">
            {lang[langPref]['signup_title']}
          </CustomText>
        </CustomView>

        {/* Input - email */}
        <CustomInput
          marginBottom={12}
          onChangeText={setEmail}
          placeholder={lang[langPref]['edEmail']}
          icon={faEnvelope}
        />

        {/* Input - password */}
        <CustomInput
          marginBottom={12}
          onChangeText={setPassword}
          placeholder={lang[langPref]['edPass']}
          icon={faLock}
          hidden={true}
        />

        {/* Input - confirm password */}
        <CustomInput
          marginBottom={20}
          onChangeText={setConfirmPassword}
          placeholder={lang[langPref]['edConPass']}
          icon={faLock}
          hidden={true}
        />

        {/* Button - Sign Up */}
        <TextButton
          marginBottom={20}
          type="primary"
          onPressed={onSignUpPressed}>
          {lang[langPref]['buttonSignUp']}
        </TextButton>

        {/* Button - already have account */}
        <TextButton
          onPressed={onBackButtonPressed}
          textDecorationLine="underline"
          fontSize="subTitle"
          alignSelf="center"
          marginBottom={20}>
          {lang[langPref]['signup_have_account']}
        </TextButton>
      </CustomView>
    </CustomView>
  );
};

export default SignUpScreen;
