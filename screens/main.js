import { StyleSheet, Text, View, TextInput, ImageBackground} from 'react-native';
import { useState } from 'react';


export default function MainScreen() {
  return (
    <>
    <View style={[styles.toolbar]}>
        <View style={[styles.container,{flexDirection: 'row'}]}>

            
            <View style={[styles.cardSettings]}>
                <Text style={[styles.header]}>General Settings</Text>
                <Text>Card Name</Text>
                <TextInput style={[styles.inputBox]}></TextInput>
                <Text>Card Info</Text>
                <TextInput style={[styles.inputBox]}></TextInput>
                <Text>Card Effect</Text>
                <TextInput multiline numberOfLines={4} style={[styles.inputBox]}></TextInput>
                <Text>Card ID</Text>
                <TextInput style={[styles.inputBox]}></TextInput>
                <Text>Card Date</Text>
                <TextInput style={[styles.inputBox]}></TextInput>
            </View>


            <View style={{flex: 2, backgroundColor: 'darkblue', paddingLeft: 60}}>
                <ImageBackground style={styles.card} source={require('../assets/template.png')} resizeMode='contain'>
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
    },
});
