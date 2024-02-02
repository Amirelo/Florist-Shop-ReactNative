import {StyleSheet, View} from 'react-native';
import {CustomText, Divider, ItemRow} from '../../../components/atoms';

const AboutUsScreen = () => {
  return (
    <View style={styles.view}>
      <View style={styles.tab}>
        <ItemRow marginBottom={12}>
          <CustomText type="subTitle">Creator:</CustomText>
          <CustomText type="subTitle">Trần Vũ Minh Đăng</CustomText>
        </ItemRow>
        <Divider marginBottom={12} />
        <ItemRow marginBottom={12}>
          <CustomText type="subTitle">Undergraduate from:</CustomText>
          <CustomText type="subTitle">FPT Polytechnic</CustomText>
        </ItemRow>
        <Divider marginBottom={12} />
        <ItemRow marginBottom={12}>
          <CustomText type="subTitle">Major:</CustomText>
          <CustomText type="subTitle">Computer Science</CustomText>
        </ItemRow>
        <Divider marginBottom={12} />
        <ItemRow marginBottom={12}>
          <CustomText type="subTitle">Phone:</CustomText>
          <CustomText type="subTitle">0582814653</CustomText>
        </ItemRow>
        <Divider marginBottom={12} />
        <ItemRow marginBottom={12}>
          <CustomText type="subTitle">Technologies:</CustomText>
          <CustomText type="subTitle">React Native</CustomText>
        </ItemRow>
      </View>
    </View>
  );
};

export default AboutUsScreen;

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  tab: {
    backgroundColor: 'white',
    borderRadius: 7,
    padding: 12,
  },
});
