import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {CustomInput} from '../../../components/molecules';
import {faArrowLeft, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {ImageButton, TextButton} from '../../../components/molecules/buttons';
import {sendPasswordChangeEmail} from '../AuthService';
import CustomImage from '../../../components/atoms/CustomImage';
import {
  IMAGE_AUTH_BACKGROUND,
  NAVIGATION_AUTH_ACTIONCOMPLETE,
} from '../../../constants/AppConstants';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import lang from '../../../language/lang';
import {useSelector} from 'react-redux';
import {CustomText} from '../../../components/atoms';

const VerifyEmailScreen = () => {
  // Navigation
  const navigation = useNavigation<NavigationProp<any>>();

  // Fields
  const [email, setEmail] = useState('');

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
            title: 'Email Sent',
            description: 'Please check your email for password change',
          }),
        ]
      : console.log('Fields cannot be empty');
  };

  const onBackButtonPressed = () => {
    navigation.goBack();
  };

  return (
    <View>
      <View style={{position: 'absolute', width: '100%', height: '100%'}}>
        <CustomImage type="background" source={IMAGE_AUTH_BACKGROUND} />
      </View>
      <View style={styles.body}>
        <View
          style={{
            marginBottom: 30,
            flexDirection: 'row',
            gap: 8,
            alignItems: 'center',
          }}>
          <ImageButton icon={faArrowLeft} onPressed={onBackButtonPressed} />
          <CustomText type="title" fontWeight="bold">
            {lang[langPref]['verify_title']}
          </CustomText>
        </View>
        <CustomInput
          marginBottom={20}
          onChangeText={setEmail}
          placeholder={lang[langPref]['edEmail']}
          icon={faEnvelope}
        />

        <TextButton type="primary" onPressed={onSendEmailPressed}>
          {lang[langPref]['buttonVerify']}
        </TextButton>
      </View>
    </View>
  );
};

export default VerifyEmailScreen;

const styles = StyleSheet.create({
  body: {
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 7,
    marginTop: '30%',
    marginHorizontal: 16,
  },
});
