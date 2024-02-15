import {StyleSheet, View} from 'react-native';
import {ItemProfile, OptionsPanel} from '../../../components/molecules';
import {
  faEnvelope,
  faLock,
  faPhone,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {CustomButton, CustomImage, CustomText} from '../../../components/atoms';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CameraOptions, launchCamera} from 'react-native-image-picker';
import React from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {UserModel} from '../../../models';
import {updateImage, updateUserInfo} from '../../auth/AuthService';
import {UPDATE_USER_PROFILE_PICTURE} from '../../../constants/AppConstants';
import {ReduxUpdateUser} from '../../../redux/actions/LoginAction';

const ProfileScreen = () => {
  // Fields
  const [userImage, setUserImage] = React.useState('');
  const [user, setUser] = React.useState<UserModel>();
  const [email, setEmail] = React.useState('');

  // Set to display option menu for image
  // (get image from storage or camera)
  const [active, setActive] = React.useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute<RouteProp<any>>();
  const dispatch = useDispatch();
  const userInfo = useSelector((store: any) => store.isLoggedIn.userInfo);

  const onProfileTabPressed = (type: string, data: string) => {
    console.log('data:', data);
    navigation.navigate('UpdateInfo', {type: type, data: data});
  };

  // Show option menu when image pressed
  const onImagePressed = () => {
    setActive(true);
  };

  // Get picture from storage and crop
  const onStoragePressed = () => {
    setActive(false);
    ImageCropPicker.openPicker({
      width: 100,
      height: 100,
      mediaType: 'photo',
      cropping: true,
    }).then(async image => {
      console.log(image);
      const picture = await updateImage(email, image.path);
      dispatch(ReduxUpdateUser('IMAGE', picture));
    });
  };

  // Take picture and crop
  const onCameraPressed = () => {
    setActive(false);
    const options: CameraOptions = {
      mediaType: 'photo',
    };
    // Take picture
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('Cancel');
      } else {
        var imageUri = response.assets![0].uri;
        console.log('OK');
        imageUri != null ? (
          // Crop
          ImageCropPicker.openCropper({
            path: imageUri,
            width: 100,
            height: 100,
            mediaType: 'photo',
          }).then(async image => {
            const picture = await updateImage(email, image.path);
            dispatch(ReduxUpdateUser('IMAGE', picture));
          })
        ) : (
          <></>
        );
      }
    });
  };

  React.useEffect(() => {
    if (route.params?.email) {
      setEmail(route.params.email);
    }
    if (route.params?.user) {
      setUser(route.params.user);
      setUserImage(route.params.user.image);
    }
    console.log('User info:', userInfo);
  }, []);

  React.useEffect(() => {
    console.log('User info changed');
    setUser(userInfo);
    setUserImage(userInfo.image);
  }, [userInfo]);

  return (
    <View style={styles.view}>
      <View style={styles.body}>
        <CustomButton onPressed={onImagePressed}>
          <CustomImage
            type="profile"
            source={
              userImage
                ? userImage
                : 'https://images.pexels.com/photos/19933488/pexels-photo-19933488/free-photo-of-a-pastry-with-a-cup-of-coffee-on-a-table.jpeg'
            }
            marginTop={30}
            marginBottom={20}
          />
        </CustomButton>
        <ItemProfile
          title="Email"
          data={email}
          icon={faEnvelope}
          marginBottom={12}
          viewOnly={true}
        />
        <ItemProfile
          title="Username"
          data={user ? user.username! : ''}
          icon={faUser}
          marginBottom={12}
          onPressed={data => onProfileTabPressed('USERNAME', data)}
        />

        <ItemProfile
          title="Phone Number"
          data={user ? user.phoneNumber! : ''}
          icon={faPhone}
          marginBottom={12}
          onPressed={data => onProfileTabPressed('PHONENUMBER', data)}
        />

        <ItemProfile
          title="Password"
          data="**********"
          icon={faLock}
          marginBottom={12}
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
