// React and libs
import React from 'react';
import {FlexStyle, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {faSquare, faSquareCheck} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

// Components
import {CustomButton, CustomText} from '../atoms';

// User Preferences
import themes from '../../themes/themes';

interface Props {
  children: string;
  onPressed(title: string, status: boolean): any;
  isClear?: boolean;
  status: boolean;
  marginBottom?: FlexStyle['marginBottom'];
}

const ItemPick = (props: Props) => {
  const currentTheme: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );

  const [status, setStatus] = React.useState(false);
  const [swap, setSwap] = React.useState(false);
  const [count, setCount] = React.useState(0);

  const onCategoryPressed = () => {
    setStatus(!status);
    setSwap(!swap);
  };

  React.useEffect(() => {
    if (count > 0) {
      console.log('Status changed', status, props.children);
      props.onPressed(props.children, status);
    }
    setCount(prev => prev + 1);
  }, [swap]);

  React.useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  return (
    <CustomButton onPressed={onCategoryPressed} style={{width: '33%'}}>
      <View style={[styles.view, {marginBottom: props.marginBottom}]}>
        <FontAwesomeIcon
          color={themes[currentTheme].textColor}
          size={20}
          icon={status ? faSquareCheck : faSquare}
        />
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
