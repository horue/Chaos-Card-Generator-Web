import { launchImageLibrary } from 'react-native-image-picker';

export class CardImage{
    static async openImage(){
        const imagePath = await launchImageLibrary({mediaType: 'photo',includeBase64: false,});
        const uri = imagePath.assets[0].uri;
        console.log("Imagem escolhida:", uri);
        return uri;
    }
}