import {faSquare, faSquareCheck} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomButton, CustomText} from '../atoms';

interface Props {
  children: string;
  onPressed(title: string, status: boolean): any;
  isClear: boolean;
}

const ItemPick = (props: Props) => {
  const [status, setStatus] = React.useState(false);

  const onCategoryPressed = () => {
    setStatus(!status);
  };

  React.useEffect(()=> {
    props.onPressed(props.children, status)
  },[status])

  React.useEffect(()=>{
      setStatus(false)
  },[props.isClear])

  return (
    <CustomButton onPressed={onCategoryPressed} style={{width: '33%'}}>
      <View style={styles.view}>
        <FontAwesomeIcon size={20} icon={status ? faSquareCheck : faSquare} />
        <CustomText type="subTitle">{props.children}</CustomText>
      </View>
    </CustomButton>
  );
};

export default ItemPick;

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
