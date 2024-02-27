// React and libs
import React from 'react';
import {useSelector} from 'react-redux';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

// Constants
import {NAVIGATION_AUTH_SIGNIN} from '../../../constants/AppConstants';

// Components
import {CustomText, CustomView} from '../../../components/atoms';
import {TextButton} from '../../../components/molecules/buttons';

// Preferences
import lang from '../../../language/lang';

const ActionCompleteScreen = () => {
  // Initial
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<any>>();

  // Fields
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  // Saved language
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );

  // Navigate to Sign In
  const onGoBackPressed = () => {
    navigation.navigate(NAVIGATION_AUTH_SIGNIN);
  };

  // Get data from route
  React.useEffect(() => {
    if (route.params?.title) {
      setTitle(route.params.title);
    }
    if (route.params?.description) {
      setDescription(route.params.description);
    }
  }, []);

  return (
    // Screen flex
    <CustomView type={'fullscreen'}>
      {/* Authentication Card */}
      <CustomView type={'authCard'}>
        {/* Title */}
        <CustomText alignSelf="center" marginBottom={20} type="title">
          {title}
        </CustomText>
        {/* Description */}
        <CustomText alignSelf="center" marginBottom={30} type="subTitle">
          {description}
        </CustomText>
        {/* Button to go back */}
        <TextButton onPressed={onGoBackPressed} type="primary">
          {lang[langPref]['buttonGoBack_long']}
        </TextButton>
      </CustomView>
    </CustomView>
  );
};

export default ActionCompleteScreen;
