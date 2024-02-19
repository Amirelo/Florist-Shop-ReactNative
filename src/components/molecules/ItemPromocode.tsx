import React from 'react';
import {useSelector} from 'react-redux';
import {PromocodeModel} from '../../models';
import {CustomImage, CustomText, CustomView, ItemRow} from '../atoms';
import themes from '../../themes/themes';
import {promoEffectFormat} from '../../utils/Utils';

interface Props {
  item: PromocodeModel;
}

const ItemPromocode = (props: Props) => {
  // Get theme
  const currentTheme: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );

  // Fields
  const [sale, setSale] = React.useState('');
  const [status, setStatus] = React.useState(props.item.status);

  // Set effect description string
  React.useEffect(() => {
    const effectText = promoEffectFormat(props.item.effect, props.item.amount);
    setSale(effectText);
  }, []);

  return (
    <CustomView
      type={'itemCardRow'}
      backgroundColor={themes[currentTheme].tertiaryColor}>
      {/* Promo Image */}
      <CustomImage type="tabImage" source={props.item.image} marginRight={12} />
      <CustomView type="fullscreen" backgroundColor={'#00000000'}>
        <ItemRow>
          {/* Title */}
          <CustomText type="title">{props.item.title}</CustomText>
          {/* Status */}
          <CustomText
            fontWeight="bold"
            type="title"
            color={
              status == 'ACTIVE'
                ? themes[currentTheme].primaryColor
                : themes[currentTheme].errorcolor
            }>
            {status.toLocaleLowerCase()}
          </CustomText>
        </ItemRow>

        {/* Effect description */}
        <CustomText>{`All items ${sale}`}</CustomText>
      </CustomView>
    </CustomView>
  );
};

export default ItemPromocode;
