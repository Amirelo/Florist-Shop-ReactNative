import React from "react"
import { View } from "react-native"
import { ItemProduct } from "../../../components/molecules"
import { ProductModel } from "../../../components/models"

const ExploreScreen = () => {
    const testProduct = new ProductModel('Spark', 90, 'A bouquet', 2.4, 1, [
        'https://cdn.pixabay.com/photo/2024/01/12/21/23/cortina-dampezzo-8504755_1280.jpg',
      ]);
    return(
        <View>
            <ItemProduct product={testProduct}/>
        </View>
    )
}

export default ExploreScreen;