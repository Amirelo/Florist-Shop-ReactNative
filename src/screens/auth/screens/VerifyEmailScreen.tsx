import React from 'react';
import {useSelector} from 'react-redux';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  IMAGE_AUTH_BACKGROUND,
  NAVIGATION_AUTH_ACTIONCOMPLETE,
} from '../../../constants/AppConstants';
import {sendPasswordChangeEmail} from '../AuthService';
import {faArrowLeft, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {CustomText, CustomView, CustomImage} from '../../../components/atoms';
import {CustomInput} from '../../../components/molecules';
import {ImageButton, TextButton} from '../../../components/molecules/buttons';
import lang from '../../../language/lang';

const VerifyEmailScreen = () => {
  // Navigation
  const navigation = useNavigation<NavigationProp<any>>();

  // Fields
  const [email, setEmail] = React.useState('');

  // Saved language
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );

  // Send email and navigate to Action Complete Screen when finish
  const onSendEmailPressed = () => {
    email != ''
      ? [
          sendPasswordChangeEmail(email),
          navigation.navigate(NAVIGATION_AUTH_ACTIONCOMPLETE, {
            title: lang[langPref]['complete_changepass_title'],
            description: lang[langPref]['complete_changepass_description'],
          }),
        ]
      : console.log('Fields cannot be empty');
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
        <CustomView type={'itemRow'}>
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
