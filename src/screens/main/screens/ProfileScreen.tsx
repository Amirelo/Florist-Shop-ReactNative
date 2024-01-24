import {StyleSheet, View} from 'react-native';
import {ItemProfile} from '../../../components/molecules';
import {faEnvelope, faLock, faPhone, faUser} from '@fortawesome/free-solid-svg-icons';
import {CustomImage} from '../../../components/atoms';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const onProfileTabPressed = (type:string) => {
        navigation.navigate('UpdateInfo' as never)
    }
  return (
    <View style={styles.view}>
      <CustomImage
        type="profile"
        source="https://images.pexels.com/photos/19899425/pexels-photo-19899425/free-photo-of-mt-machhapuchree.jpeg"
        marginTop={30}
        marginBottom={20}
      />
      <ItemProfile
        title="Username"
        data="Miron"
        icon={faUser}
        marginBottom={12}
        onPressed={()=> onProfileTabPressed('USERNAME')}
      />
      <ItemProfile
        title="Email"
        data="miron@gmail.com"
        icon={faEnvelope}
        marginBottom={12}
        onPressed={()=> onProfileTabPressed('EMAIL')}
      />
      <ItemProfile
        title="Phone Number"
        data="0548376271"
        icon={faPhone}
        marginBottom={12}
        onPressed={()=> onProfileTabPressed('PHONE')}
      />

<ItemProfile
        title="Password"
        data="**********"
        icon={faLock}
        marginBottom={12}
        onPressed={()=> onProfileTabPressed('PASSWORD')}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 16,
  },
});
