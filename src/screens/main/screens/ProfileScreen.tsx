import {StyleSheet, View} from 'react-native';
import {ItemProfile} from '../../../components/molecules';
import {
  faEnvelope,
  faLock,
  faPhone,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {CustomButton, CustomImage} from '../../../components/atoms';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ImageLibraryOptions, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import React from 'react';

const ProfileScreen = () => {
  const [userImage, setUserImage] = React.useState('https://images.pexels.com/photos/19899425/pexels-photo-19899425/free-photo-of-mt-machhapuchree.jpeg')
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const onProfileTabPressed = (type: string) => {
    navigation.navigate('UpdateInfo', {type: type});
  };

  const onImagePressed = () => {
    const options:ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('Cancelled');
      } else {
        var imageUri = response.assets?.[0].uri
        setUserImage(imageUri ? imageUri : userImage)
        console.log('OK');
      }
    });
  };
  return (
    <View style={styles.view}>
      <CustomButton onPressed={onImagePressed}>
        <CustomImage
          type="profile"
          source={userImage}
          marginTop={30}
          marginBottom={20}
        />
      </CustomButton>
      <ItemProfile
        title="Username"
        data="Miron"
        icon={faUser}
        marginBottom={12}
        onPressed={() => onProfileTabPressed('USERNAME')}
      />
      <ItemProfile
        title="Email"
        data="miron@gmail.com"
        icon={faEnvelope}
        marginBottom={12}
        onPressed={() => onProfileTabPressed('EMAIL')}
      />
      <ItemProfile
        title="Phone Number"
        data="0548376271"
        icon={faPhone}
        marginBottom={12}
        onPressed={() => onProfileTabPressed('PHONE')}
      />

      <ItemProfile
        title="Password"
        data="**********"
        icon={faLock}
        marginBottom={12}
        onPressed={() => onProfileTabPressed('PASSWORD')}
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
