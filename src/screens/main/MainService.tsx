import firestore from '@react-native-firebase/firestore'
import { CategoryModel } from '../../models';

const getCategories = async() => {
    const listCategories = []
    const snapshot = await firestore().collection('categories').get()
    return snapshot.docs.map(doc => new CategoryModel(doc.id,doc.data().name, doc.data().image));
}

export {getCategories}