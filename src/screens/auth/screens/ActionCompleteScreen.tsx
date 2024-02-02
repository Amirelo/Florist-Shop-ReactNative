import {StyleSheet, View} from 'react-native';
import {CustomText} from '../../../components/atoms';
import {TextButton} from '../../../components/molecules/buttons';
import {NavigationProp, RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import lang from '../../../language/lang';
import { useSelector } from 'react-redux';

const ActionCompleteScreen = () => {
  // Initial
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<any>>();

  // Fields
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')

  // Saved language
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );

  // Navigate to Sign In
  const onGoBackPressed = () => {
    navigation.navigate('SignIn');
  };

  // Get data from route
  React.useEffect(() => {
    if(route.params?.title){
        setTitle(route.params.title)
    }
    if(route.params?.description){
        setDescription(route.params.description)
    }
  }, []);

  return (
    <View style={styles.view}>
        <View style={styles.body}>
      <CustomText marginBottom={20} type="title">
        {title}
      </CustomText>
      <CustomText marginBottom={30} type="subTitle">
        {description}
      </CustomText>
      </View>
      <TextButton onPressed={onGoBackPressed} type="primary">
        {lang[langPref]['buttonGoBack_long']}
      </TextButton>
    </View>
  );
};

export default ActionCompleteScreen;

const styles = StyleSheet.create({
    view:{
        paddingHorizontal: 16,
        paddingTop: 30
    },
    body:{
        alignItems:'center'
    }
})