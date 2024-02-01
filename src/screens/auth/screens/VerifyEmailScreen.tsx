import {StyleSheet, View} from 'react-native';
import {langText} from '../../../utils/Utils';
import React, {useState} from 'react';
import {CustomInput} from '../../../components/molecules';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {TextButton} from '../../../components/molecules/buttons';
import {sendPasswordChangeEmail} from '../AuthService';

const VerifyEmailScreen = () => {
  const [email, setEmail] = useState('');

  const onSendEmailPressed = () => {
    email != ''
      ? sendPasswordChangeEmail(email)
      : console.log('Fields cannot be empty');
  };

  return (
    <View style={styles.view}>
      <CustomInput
        marginBottom={12}
        onChangeText={setEmail}
        placeholder={langText('edEmail')}
        icon={faEnvelope}
      />

      <TextButton type="primary" onPressed={onSendEmailPressed}>Verify</TextButton>
    </View>
  );
};

export default VerifyEmailScreen;

const styles = StyleSheet.create({
    view:{
        paddingHorizontal: 16,
        paddingTop:30
    }
})
