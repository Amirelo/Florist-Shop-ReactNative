import {StyleSheet, View} from 'react-native';
import {CustomInput} from '../../../components/molecules';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {TextButton} from '../../../components/molecules/buttons';
import {updateUserInfo} from '../../auth/AuthService';
import {useSelector} from 'react-redux';
const UpdateInfoScreen = () => {
  // Fields
  const [title, setTitle] = React.useState('');
  const [data, setData] = React.useState('');

  // Initial
  const route = useRoute<any>();
  const email: string = useSelector((store: any) => store.isLoggedIn.userEmail);

  // Get data from route
  React.useEffect(() => {
    if (route.params?.type) {
      setTitle(route.params.type);
    }
    if (route.params?.data) {
        setData(route.params.data)
    }
  }, []);

  const onUpdatepressed = async () => {
    await updateUserInfo(title, data, email);
  };

  return (
    <View style={styles.view}>
      <CustomInput value={data} onChangeText={setData} marginTop={20} marginBottom={20} placeholder={title} />

      <TextButton type="primary" onPressed={onUpdatepressed}>Update</TextButton>
    </View>
  );
};

export default UpdateInfoScreen;

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 16,
  },
});
