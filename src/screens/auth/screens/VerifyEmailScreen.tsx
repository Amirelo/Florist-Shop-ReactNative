import {StyleSheet, View} from 'react-native';
import {langText} from '../../../utils/Utils';
import React, {useState} from 'react';
import {CustomInput} from '../../../components/molecules';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {TextButton} from '../../../components/molecules/buttons';
import {sendPasswordChangeEmail} from '../AuthService';
import CustomImage from '../../../components/atoms/CustomImage';
import { IMAGE_AUTH_BACKGROUND } from '../../../constants/AppConstants';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const VerifyEmailScreen = () => {
  // Navigation
  const navigation = useNavigation<NavigationProp<any>>()
  
  // Fields
  const [email, setEmail] = useState('');

  // Send email and navigate to Action Complete Screen when finish
  const onSendEmailPressed = () => {
    email != ''
      ? [sendPasswordChangeEmail(email), navigation.navigate('Complete', {title: 'Email Sent', description:'Please check your email for password change'})]
      : console.log('Fields cannot be empty');
  };

  return (
    <View>
      <View style={{position: 'absolute', width: '100%', height: '100%'}}>
        <CustomImage type="background" source={IMAGE_AUTH_BACKGROUND} />
      </View>
      <View style={styles.body}>
        <CustomInput
          marginBottom={20}
          onChangeText={setEmail}
          placeholder={langText('edEmail')}
          icon={faEnvelope}
        />

        <TextButton type="primary" onPressed={onSendEmailPressed}>
          {langText('buttonVerify')}
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
