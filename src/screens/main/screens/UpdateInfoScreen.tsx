import {StyleSheet, View} from 'react-native';
import {CustomInput} from '../../../components/molecules';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {TextButton} from '../../../components/molecules/buttons';
import {
  passwordSignUp,
  sendPasswordChangeEmail,
  updateUserInfo,
} from '../../auth/AuthService';
import {useDispatch, useSelector} from 'react-redux';
import {ReduxUpdateUser} from '../../../redux/actions/LoginAction';
const UpdateInfoScreen = () => {
  // Fields
  const [title, setTitle] = React.useState('');
  const [data, setData] = React.useState('');

  // Initial
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<any>();
  const email: string = useSelector((store: any) => store.isLoggedIn.userEmail);
  const userInfo = useSelector((store: any) => store.isLoggedIn.userInfo);

  // Get data from route
  React.useEffect(() => {
    if (route.params?.type) {
      setTitle(route.params.type);
    }
    if (route.params?.data) {
      setData(route.params.data);
    }
  }, []);

  const onUpdatepressed = async () => {
    if (title != 'EMAIL') {
      await updateUserInfo(title, data, email);
      dispatch(ReduxUpdateUser(title, data));
      console.log('Update completed:', userInfo);
      navigation.goBack();
    } else {
      // If input correct email
      if (email == data) {
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
          console.log('New Auth User created')
         
        } else {
          console.log('User already existed, send password changeEmail');
        }
        sendPasswordChangeEmail(email);
        navigation.goBack();
      } else {
        console.log('Email does not match account');
      }
    }
  };

  return (
    <View style={styles.view}>
      <CustomInput
        value={data}
        onChangeText={setData}
        marginTop={20}
        marginBottom={20}
        placeholder={title}
      />

      <TextButton type="primary" onPressed={onUpdatepressed}>
        {title == 'EMAIL' ? 'Send Update Password Email' : 'Update'}
      </TextButton>
    </View>
  );
};

export default UpdateInfoScreen;

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 16,
  },
});
