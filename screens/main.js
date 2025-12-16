import { StyleSheet, Text, View, TextInput, ImageBackground, CheckBox, ScrollView, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useRef, useEffect  } from 'react';
import Cropper from 'react-easy-crop'
import { StrokedText } from '../components/strokedtext';
import { CustomButton } from '../components/button';

import { images } from '../lists/elements';
import { Expoerter } from '../modules/export';
import { CardImage } from '../modules/image';
import { getCroppedImg } from '../modules/crop';
import { Downloader } from '../modules/download';
import { Id } from '../modules/cardId';

export default function MainScreen() {
    const viewRef = useRef(null);
    const [name, setName] = useState('');
    const [effect, setEffect] = useState(' ');
    const [rank, setRank] = useState(' ');
    const [power, setPower] = useState(' ');
    const [info, setInfo] = useState(' ');
    const [id, setId] = useState(' ');
    const [date, setDate] = useState(' ');


    const [imageUri, setImageUri] = useState(' ');

    const [zoom, setZoom] = useState(1);
    const [zoomInput, setZoomInput] = useState(' ');
    const [yPos, setY] = useState('0');
    const [xPos, setX] = useState('0');


    const [xOffset, setXOffset] = useState('0');
    const [isSelected, setSelection] = useState(false);


    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('typeless');
    const [items, setItems] = useState([
        {label: 'Typeless', value: 'typeless'},
        {label: 'Fire', value: 'fire'},
        {label: 'Water', value: 'nameless'},
        {label: 'Grass', value: 'grass'},
        {label: 'Dark', value: 'dark'},
        {label: 'Light', value: 'light'},
        {label: 'Rock', value: 'rock'}
    ]);



    const handleSubmit = () => {
        setZoom(zoomInput)
    }

    const handleImageUpdate = async () => {
        const uri = await CardImage.openImage();
        setImageUri(uri);
    }


    const clearAll = () => {
        setName(' ')
        setEffect(' ')
        setRank(' ')
        setPower(' ')
        setInfo(' ')
        setId(' ')
        setDate(' ')
        setCroppedImage(null)
    }

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [cropperZoom, setCropperZoom] = useState(1)
    const [croppedImage, setCroppedImage] = useState(null)

    const onCropComplete = async (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels); // opcional
    if (!imageUri || !croppedAreaPixels) return;

    const cropped = await getCroppedImg(imageUri, croppedAreaPixels);
    setCroppedImage(cropped); // aqui a preview é atualizada em tempo real
    };



  return (
    <>
    <View style={[styles.toolbar]}>
        <View style={[styles.container,{flexDirection: 'row'}]}>


            <ScrollView style={[styles.cardSettings]}>
                <View style={[styles.innerContainer]}>
                    
                    <CustomButton buttonText='Clear All' buttonColor={'darkblue'} textColor={'white'} onPress={clearAll}></CustomButton>

                    <View style={[styles.contentContainer, {zIndex: 1000}]}>
                        <Text style={[styles.header]}>Card Type</Text>

                        <Text>Supertype</Text>
                        <DropDownPicker
                        />

                        <Text>Card Element</Text>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                        />
                    </View>


                    <View style={[styles.contentContainer]}>
                        <Text style={[styles.header]}>Basics</Text>

                        <Text>Card Name</Text>
                        <TextInput style={[styles.inputBox]} onChangeText={setName} value={name}></TextInput>


                        <Text>Card Rank</Text>
                        <TextInput style={[styles.inputBox]} onChangeText={setRank} value={rank}></TextInput>

                    
                        <Text>X Offset</Text>
                        <View style={[{flexDirection: 'row', justifyContent: 'space-between'}]}>
                            <TextInput style={[styles.inputBox, {width: 55}]} onChangeText={setXOffset} value={xOffset}></TextInput>
                        </View>
                    </View>


                    <View style={[styles.contentContainer, {flexDirection: 'column'}]}>
                        <Text style={[styles.header]}>Images</Text>


                        <View style={styles.cropperContainer}>
                        <Cropper
                            image={imageUri}
                            crop={crop}
                            zoom={zoom}
                            aspect={3 / 4}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                        </View>
                        <CustomButton buttonText='Upload Image' buttonColor={'darkblue'} textColor={'white'} onPress={() => handleImageUpdate()}></CustomButton>


                        <Text>Zoom</Text>
                        <TextInput style={[styles.inputBox]} onChangeText={setZoomInput} value={zoomInput} onSubmitEditing={handleSubmit}></TextInput>
                        <View style={[{flexDirection: 'row', justifyContent: 'space-between'}]}>
                            <CustomButton buttonText='+' buttonColor={'darkblue'} textColor={'white'} style={{ width: "49%"}} onPress={() => setZoom(zoom+1)}></CustomButton>
                            <CustomButton buttonText='-' buttonColor={'darkblue'} textColor={'white'} style={{ width: "49%"}} onPress={() => setZoom(zoom-1)}></CustomButton>
                        </View>
                    </View>

                    <View style={[styles.contentContainer]}>
                        <Text style={[styles.header]}>Effect/Power</Text>

                        <Text>Card Info</Text>
                        <TextInput style={[styles.inputBox]} onChangeText={setInfo} value={info}></TextInput>


                        <Text>Card Effect</Text>
                        <TextInput multiline numberOfLines={4} style={[styles.inputBox, {height: 150}]} onChangeText={setEffect} value={effect}></TextInput>


                        <Text>Card Power</Text>
                        <TextInput style={[styles.inputBox]} onChangeText={setPower} value={power}></TextInput>
                    </View>


                    <View style={[styles.contentContainer]}>
                        <Text style={[styles.header]}>Card Data</Text>

                        <Text>Card ID</Text>
                        <TextInput style={[styles.inputBox]}  onChangeText={setId} value={id}></TextInput>

                        <CustomButton buttonText='Generate ID' buttonColor={'darkblue'} textColor={'white'} onPress={() => setId(Id.generate())}></CustomButton>



                        <Text>Card Date</Text>
                        <TextInput style={[styles.inputBox]} onChangeText={setDate} value={date}></TextInput>
                    </View>

                    <View style={[styles.contentContainer]}>
                        <CustomButton buttonText='Download' buttonColor={'darkblue'} textColor={'white'} onPress={() => Downloader.downloadCard(viewRef, `${name}.png`)}></CustomButton>
                        <CustomButton buttonText='Export as Text' buttonColor={'darkblue'} textColor={'white'} onPress={() => Expoerter.ctcgExportHandler('-', value, name, rank, info, effect, power, id, date)}></CustomButton>
                        <CustomButton buttonText='Export all' buttonColor={'darkblue'} textColor={'white'} onPress={() =>  {Downloader.downloadCard(viewRef, `${name}.png`); Expoerter.ctcgExportHandler('-', value, name, rank, info, effect, power, id, date)}}></CustomButton>
                    </View>



                    <View style={[styles.contentContainer]}>
                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                value={isSelected}
                                onValueChange={setSelection}
                                style={styles.checkbox}
                            />
                            <Text>Advenced Import/Export</Text>
                        </View>


                        {isSelected ? (
                        <>
                        <Text>EXPERIMENTAL: This allows you to import and export your card as a JSON-object to or from your clipboard</Text>    
                        <CustomButton buttonText='Export JSON' buttonColor={'darkblue'} textColor={'white'} onPress={() => JSONExportHandler('-', value, name, rank, info, effect, power, id, date)}></CustomButton>
                        <CustomButton buttonText='Import JSON' buttonColor={'darkblue'} textColor={'white'}></CustomButton>
                        </>
                        ) : 
                            
                        <></>}
                    </View>



                </View>
                <Text style={{paddingTop: 20, color: '#696969', textAlign: 'center', fontSize: 12, userSelect: 'none'}}>© 2025 Karasu System Development Group. Card Generator Powered by Karasu Systems Solutions / Karasu Dev Group. Chaos TCG Developed by Karasu Game Studio & Karasu Design & Visuals.</Text>
            </ScrollView>


            <View style={{flex: 2, backgroundColor: 'darkblue', paddingLeft: 60}} ref={viewRef}>
                <ImageBackground key={`frame-${value}`} style={[styles.card,{zIndex: 2}]} source={images[value]} resizeMode='contain' id="card-frame">
                    <StrokedText text={name} top={54} left={41} fontSize={37} strokeWidth={6} font='Mongolian Baiti'/>
                    <StrokedText text={rank} top={42} left={643+Number(xOffset)} fontSize={55} strokeWidth={6} font='Mongolian Baiti'/>
                    <StrokedText text={info} top={617} left={40} fontSize={38} strokeWidth={4} font='Mongolian Baiti'/>
                    <StrokedText text={effect} top={673} left={53} fontSize={24} strokeWidth={4} font='Mongolian Baiti'/>
                    <StrokedText text={power} top={905} left={647} fontSize={50} strokeWidth={5} font='Mongolian Baiti'/>
                    <StrokedText text={id.toUpperCase()} top={954} left={47} fontSize={15} strokeWidth={0} font='Bahnschrift'/>
                    <StrokedText text={`${date} - © CHAOS TCG - PT-BR`} top={972} left={47} fontSize={15} strokeWidth={0} font='Bahnschrift'/>
                </ImageBackground>    
                <Image style={{position: 'absolute', height: Number(images[value].height), width: Number(images[value].width)}} source={{uri: croppedImage}}></Image>
            </View>


        </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    toolbar:{
        flex: 1,
        flexDirection: 'column',
        height: '100%',
    },
    container: {
        flex: 1,
        height: 300,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    inputBox:{
        borderColor: 'black',
        borderRadius: 6,
        borderWidth: 1,
        height: 48,
        backgroundColor: 'white',
    },
    innerContainer: {
        padding: 34,
        gap: 24,
        backgroundColor: '#ebf1ff',
        borderRadius: 20
    },
    contentContainer:{
        padding: 34,
        gap: 12,
        backgroundColor: '#d6e2ff',
        borderRadius: 20,
    },
    cardSettings:{
        flex: 1,
        backgroundColor: 'white',
        gap: 24,
        padding: 24,
        paddingTop: '2%',
    },
    card: {
        justifyContent: 'space-between',
        padding: 16,
        position: 'relative',
    },
    name: {
        position: 'absolute',
        top: 54,
        left: 33,
        fontSize: 41,
        color: 'white',
        fontFamily: 'Mongolian Baiti'
    },
    rank: {
        position: 'absolute',
        top: 48,
        left: 636,
        fontSize: 57,
        color: 'white',
        fontFamily: 'Mongolian Baiti'
    },
    power: {
        position: 'absolute',
        top: 911,
        left: 639,
        fontSize: 50,
        color: 'white',
        fontFamily: 'Mongolian Baiti'
    },
    effect: {
        position: 'absolute',
        top: 674,
        left: 51,
        fontSize: 26,
        color: 'white',
        fontFamily: 'Mongolian Baiti'
    },
    cropperContainer: {
        padding: 34,
        gap: 12,
        backgroundColor: '#c2d4ffff',
        borderRadius: 20,
        height: 450,
    },
});
