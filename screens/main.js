import { StyleSheet, Text, View, TextInput, ImageBackground, CheckBox, ScrollView, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';
import { StrokedText } from '../components/strokedtext';
import { CustomButton } from '../components/button';

import { images } from '../lists/elements';
import { ctcgExportHandler, JSONExportHandler } from '../modules/export';

export default function MainScreen() {
    const [name, setName] = useState(' ');
    const [effect, setEffect] = useState(' ');
    const [rank, setRank] = useState(' ');
    const [power, setPower] = useState(' ');
    const [info, setInfo] = useState(' ');
    const [id, setId] = useState(' ');
    const [date, setDate] = useState(' ');


    const [zoom, setZoom] = useState('0');
    const [zoomInput, setZoomInput] = useState(' ');
    const [yPos, setY] = useState('0');
    const [xPos, setX] = useState('0');


    const [xOffset, setXOffset] = useState('0');
    const [isSelected, setSelection] = useState(false);


    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('typeless');
    const [items, setItems] = useState([
        {label: 'Typeless', value: 'typeless'},
        {label: 'Nameless', value: 'nameless'},
        {label: 'Dark', value: 'dark'},
    ]);


    const handleSubmit = () => {
        setZoom(zoomInput)
    }


    const clearAll = () => {
        setName(' ')
        setEffect(' ')
        setRank(' ')
        setPower(' ')
        setInfo(' ')
        setId(' ')
        setDate(' ')
    }




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

                        <CustomButton buttonText='Upload Image' buttonColor={'darkblue'} textColor={'white'}></CustomButton>

                        <Text>Zoom</Text>
                        <TextInput style={[styles.inputBox]} onChangeText={setZoomInput} value={zoomInput} onSubmitEditing={handleSubmit}></TextInput>
                        <View style={[{flexDirection: 'row', justifyContent: 'space-between'}]}>
                            <CustomButton buttonText='+' buttonColor={'darkblue'} textColor={'white'} style={{ width: "49%"}} onPress={() => setZoom(zoom+1)}></CustomButton>
                            <CustomButton buttonText='-' buttonColor={'darkblue'} textColor={'white'} style={{ width: "49%"}} onPress={() => setZoom(zoom-1)}></CustomButton>
                        </View>

                        <Text>Y Position</Text>
                        <TextInput style={[styles.inputBox]}></TextInput>
                        <View style={[{flexDirection: 'row', justifyContent: 'space-between'}]}>
                            <CustomButton buttonText='+' buttonColor={'darkblue'} textColor={'white'} style={{ width: "49%"}} onPress={() => setY(yPos+1)}></CustomButton>
                            <CustomButton buttonText='-' buttonColor={'darkblue'} textColor={'white'} style={{ width: "49%"}} onPress={() => setY(yPos-1)}></CustomButton>
                        </View>

                        <Text>X Position</Text>
                        <TextInput style={[styles.inputBox]}></TextInput>
                        <View style={[{flexDirection: 'row', justifyContent: 'space-between'}]}>
                            <CustomButton buttonText='+' buttonColor={'darkblue'} textColor={'white'} style={{ width: "49%"}} onPress={() => setX(xPos+1)}></CustomButton>
                            <CustomButton buttonText='-' buttonColor={'darkblue'} textColor={'white'} style={{ width: "49%"}} onPress={() => setX(xPos-1)}></CustomButton>
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


                        <Text>Card Date</Text>
                        <TextInput style={[styles.inputBox]} onChangeText={setDate} value={date}></TextInput>
                    </View>

                    <View style={[styles.contentContainer]}>
                        <CustomButton buttonText='Download' buttonColor={'darkblue'} textColor={'white'}></CustomButton>
                        <CustomButton buttonText='Export as Text' buttonColor={'darkblue'} textColor={'white'} onPress={() => ctcgExportHandler('-', value, name, rank, info, effect, power, id, date)}></CustomButton>
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


            <View style={{flex: 2, backgroundColor: 'darkblue', paddingLeft: 60}}>
                <ImageBackground style={[styles.card,{zIndex: 2}]} source={images[value]} resizeMode='contain'>
                    <StrokedText text={name} top={54} left={41} fontSize={37} strokeWidth={6} font='Mongolian Baiti'/>
                    <StrokedText text={rank} top={42} left={643+Number(xOffset)} fontSize={55} strokeWidth={6} font='Mongolian Baiti'/>
                    <StrokedText text={info} top={617} left={40} fontSize={38} strokeWidth={4} font='Mongolian Baiti'/>
                    <StrokedText text={effect} top={673} left={53} fontSize={24} strokeWidth={4} font='Mongolian Baiti'/>
                    <StrokedText text={power} top={905} left={647} fontSize={50} strokeWidth={5} font='Mongolian Baiti'/>
                    <StrokedText text={id.toUpperCase()} top={954} left={47} fontSize={15} strokeWidth={0} font='Bahnschrift'/>
                    <StrokedText text={`${date} - © CHAOS TCG - PT-BR`} top={972} left={47} fontSize={15} strokeWidth={0} font='Bahnschrift'/>
                </ImageBackground>    
                <Image style={{position: 'absolute', height: Number(zoom), width: Number(zoom), top: Number(yPos), left: Number(xPos)}} source={require('../assets/test.png')}></Image>
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
});
