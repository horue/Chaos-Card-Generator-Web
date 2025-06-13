import { StyleSheet, Text, View, TextInput, ImageBackground, Image} from 'react-native';
import { useState } from 'react';


export default function MainScreen() {
    const [name, setName] = useState(' ');
    const [effect, setEffect] = useState(' ');
    const [rank, setRank] = useState(' ');
    const [power, setPower] = useState(' ');

    



  return (
    <>
    <View style={[styles.toolbar]}>
        <View style={[styles.container,{flexDirection: 'row'}]}>


            <View style={[styles.cardSettings]}>
                <Text style={[styles.header]}>General Settings</Text>
                <Text>Card Name</Text>
                <TextInput style={[styles.inputBox]} onChangeText={setName} value={name}></TextInput>
                <Text>Card Rank</Text>
                <TextInput style={[styles.inputBox]} onChangeText={setRank} value={rank}></TextInput>
                <Text>Card Info</Text>
                <TextInput style={[styles.inputBox]}></TextInput>
                <Text>Card Effect</Text>
                <TextInput multiline numberOfLines={4} style={[styles.inputBox]} onChangeText={setEffect} value={effect}></TextInput>
                <Text>Card Power</Text>
                <TextInput style={[styles.inputBox]} onChangeText={setPower} value={power}></TextInput>
                <Text>Card ID</Text>
                <TextInput style={[styles.inputBox]}></TextInput>
                <Text>Card Date</Text>
                <TextInput style={[styles.inputBox]}></TextInput>
            </View>


            <View style={{flex: 2, backgroundColor: 'darkblue', paddingLeft: 60}}>
                <ImageBackground style={styles.card} source={require('../assets/template.png')} resizeMode='contain'>
                    <Text style={[styles.name]}>{name}</Text>
                    <Text style={[styles.rank]}>{rank}</Text>
                    <Text style={[styles.effect]}>{effect}</Text>
                    <Text style={[styles.power]}>{power}</Text>
                </ImageBackground>    
            </View>


        </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
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
    },
    cardSettings:{
        flex: 1,
        backgroundColor: 'white',
        gap: 12,
        padding: 24,
        paddingTop: '10%',
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
