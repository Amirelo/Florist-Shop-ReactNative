import {StyleSheet, View} from 'react-native';
import {CustomText} from '../../../components/atoms';
import {TextButton} from '../../../components/molecules/buttons';
import {NavigationProp, RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';

const ActionCompleteScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<any>>();
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')

  const onGoBackPressed = () => {
    navigation.navigate('SignIn');
  };

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
        Click here to go back
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