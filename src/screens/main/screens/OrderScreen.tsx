import {StyleSheet, View} from 'react-native';
import { ItemOrder } from '../../../components/molecules';

const OrderScreen = () => {
  return (
    <View style={styles.view}>
      <ItemOrder marginTop={12}/>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
    view:{
        paddingHorizontal:16
    }
})
