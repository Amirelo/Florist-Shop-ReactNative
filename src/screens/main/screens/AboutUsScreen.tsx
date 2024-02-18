import {StyleSheet, View} from 'react-native';
import {
  CustomText,
  CustomView,
  Divider,
  ItemRow,
} from '../../../components/atoms';
import themes from '../../../themes/themes';
import {useSelector} from 'react-redux';
import lang from '../../../language/lang';

const AboutUsScreen = () => {
  const currentTheme: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );
  const langPref: keyof typeof lang = useSelector((store:any) => store.preference.language)
  return (
    <CustomView type="fullscreen">
      <CustomView type="body">
        <CustomView
          type="itemPadding"
          backgroundColor={themes[currentTheme].tertiaryColor}>
          <ItemRow marginBottom={12}>
            <CustomText type="subTitle">{lang[langPref].text_creator}</CustomText>
            <CustomText type="subTitle">Trần Vũ Minh Đăng</CustomText>
          </ItemRow>
          <Divider marginBottom={12} />
          <ItemRow marginBottom={12}>
            <CustomText type="subTitle">{lang[langPref].text_graduate}</CustomText>
            <CustomText type="subTitle">FPT Polytechnic</CustomText>
          </ItemRow>
          <Divider marginBottom={12} />
          <ItemRow marginBottom={12}>
            <CustomText type="subTitle">{lang[langPref].text_major}</CustomText>
            <CustomText type="subTitle">Computer Science</CustomText>
          </ItemRow>
          <Divider marginBottom={12} />
          <ItemRow marginBottom={12}>
            <CustomText type="subTitle">{lang[langPref].text_creator_phone}</CustomText>
            <CustomText type="subTitle">(+84) 58 281 4653</CustomText>
          </ItemRow>
          <Divider marginBottom={12} />
          <ItemRow marginBottom={12}>
            <CustomText type="subTitle">Frontend:</CustomText>
            <CustomText type="subTitle">React Native (TypeScript)</CustomText>
          </ItemRow>
          <Divider marginBottom={12} />
          <ItemRow marginBottom={12}>
            <CustomText type="subTitle">Backend:</CustomText>
            <CustomText type="subTitle">Firebase (Firestore)</CustomText>
          </ItemRow>
          <Divider marginBottom={12} />
          <CustomText type="subTitle">
          {lang[langPref].text_creator_description}
          </CustomText>
        </CustomView>
      </CustomView>
    </CustomView>
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
