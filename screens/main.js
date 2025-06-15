import { StyleSheet, Text, View, TextInput, ImageBackground, CheckBox, ScrollView} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';
import { StrokedText } from '../components/strokedtext';
import { CustomButton } from '../components/button';


export default function MainScreen() {
    const [name, setName] = useState(' ');
    const [effect, setEffect] = useState(' ');
    const [rank, setRank] = useState(' ');
    const [power, setPower] = useState(' ');

    const [isSelected, setSelection] = useState(false);


    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Test Template', value: 'template'},
        {label: 'Nameless', value: 'ps_template'}
    ]);

    const clearAll = () => {
        setName(' ')
        setEffect(' ')
        setRank(' ')
        setPower(' ')
    }
    



  return (
    <>
    <View style={[styles.toolbar]}>
        <View style={[styles.container,{flexDirection: 'row'}]}>


            <ScrollView style={[styles.cardSettings]}>
                <View style={[styles.innerContainer]}>
                    
                    <CustomButton buttonText='Clear All' buttonColor={'darkblue'} textColor={'white'} onPress={clearAll}></CustomButton>
                    <Text style={[styles.header]}>Card Type</Text>

                    <Text>Supertype</Text>

                    <Text>Card Element</Text>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                    />

                    <Text style={[styles.header]}>Basics</Text>

                    <Text>Card Name</Text>
                    <TextInput style={[styles.inputBox]} onChangeText={setName} value={name}></TextInput>


                    <Text>Card Rank</Text>
                    <TextInput style={[styles.inputBox]} onChangeText={setRank} value={rank}></TextInput>



                    <Text style={[styles.header]}>Effect/Power</Text>

                    <Text>Card Info</Text>
                    <TextInput style={[styles.inputBox]}></TextInput>


                    <Text>Card Effect</Text>
                    <TextInput multiline numberOfLines={4} style={[styles.inputBox]} onChangeText={setEffect} value={effect}></TextInput>


                    <Text>Card Power</Text>
                    <TextInput style={[styles.inputBox]} onChangeText={setPower} value={power}></TextInput>

                    <Text style={[styles.header]}>Card Data</Text>

                    <Text>Card ID</Text>
                    <TextInput style={[styles.inputBox]}></TextInput>


                    <Text>Card Date</Text>
                    <TextInput style={[styles.inputBox]}></TextInput>

                    <CustomButton buttonText='Export' buttonColor={'darkblue'} textColor={'white'}></CustomButton>


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
                    <CustomButton buttonText='Export JSON' buttonColor={'darkblue'} textColor={'white'}></CustomButton>
                    <CustomButton buttonText='Import JSON' buttonColor={'darkblue'} textColor={'white'}></CustomButton>
                    </>
                    ) : 
                        
                    console.log('test') }


                </View>
            </ScrollView>


            <View style={{flex: 2, backgroundColor: 'darkblue', paddingLeft: 60}}>
                <ImageBackground style={styles.card} source={require('../assets/ps_template.png')} resizeMode='contain'>
                    <StrokedText text={name} top={50} left={40} fontSize={41} strokeWidth={6}/>
                    <StrokedText text={rank} top={42} left={643} fontSize={55} strokeWidth={6} />
                    <StrokedText text={effect} top={671} left={53} fontSize={26} strokeWidth={3}/>
                    <StrokedText text={power} top={905} left={647} fontSize={50} strokeWidth={5} />
                </ImageBackground>    
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
        gap: 14,
        backgroundColor: '#ebf1ff',
        borderRadius: 20
    },
    cardSettings:{
        flex: 1,
        backgroundColor: 'white',
        gap: 24,
        padding: 24,
        paddingTop: '5%',
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
