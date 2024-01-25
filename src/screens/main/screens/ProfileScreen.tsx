import {StyleSheet, View} from 'react-native';
import {ItemProfile, OptionsPanel} from '../../../components/molecules';
import {
  faEnvelope,
  faLock,
  faPhone,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {CustomButton, CustomImage, CustomText} from '../../../components/atoms';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
} from 'react-native-image-picker';
import React from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';

const ProfileScreen = () => {
  const [userImage, setUserImage] = React.useState(
    'https://images.pexels.com/photos/19899425/pexels-photo-19899425/free-photo-of-mt-machhapuchree.jpeg',
  );

  const [active, setActive] = React.useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const onProfileTabPressed = (type: string) => {
    navigation.navigate('UpdateInfo', {type: type});
  };

  const onImagePressed = () => {
    setActive(true);
  };

  const onStoragePressed = () => {
    setActive(false);
    ImageCropPicker.openPicker({
      width: 100,
      height: 100,
      mediaType: 'photo',
      cropping: true,
    }).then(image => {
      console.log(image);
      setUserImage(image.path);
    });
  };

  const onCameraPressed = () => {
    setActive(false);
    const options: CameraOptions = {
      mediaType: 'photo',
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('Cancel');
      } else {
        var imageUri =  response.assets![0].uri;
        console.log('OK');
        imageUri != null ? (
          ImageCropPicker.openCropper({
            path: imageUri,
            width: 100,
            height: 100,
            mediaType:'photo',
          }).then(image => {
            setUserImage(image.path);
          })
        ) : (
          <></>
        );
      }
    });

    ImageCropPicker.openCamera({
      width: 100,
      height: 100,
      mediaType: 'photo',
      cropping: true,
    }).then(image => {
      console.log(image);
      setUserImage(image.path);
    });
  };

  return (
    <View style={styles.view}>
      <View style={styles.body}>
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
      {active ? (
        <OptionsPanel title="Select picture" setActive={setActive}>
          <CustomButton onPressed={onStoragePressed}>
            <CustomText marginBottom={20}>Storage</CustomText>
          </CustomButton>
          <CustomButton onPressed={onCameraPressed}>
            <CustomText marginBottom={20}>Camera</CustomText>
          </CustomButton>
        </OptionsPanel>
      ) : (
        <></>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: '100%',
  },
  body: {
    paddingHorizontal: 16,
  },
});
