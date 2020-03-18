import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TextInput,
    TouchableOpacity,
} from 'react-native';


class Main extends React.Component {
    static navigationOptions = {
        title:'Chatter'
    };

    state = {
        name:'',
    };

    onPress =() =>{
        console.log(this.state.name);
        this.props.navigation.navigate('Chat',{name:this.state.name})
    }

    onChangeText = name => this.setState({name});

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.title}>Enter your name : </Text>
                <TextInput 
                    style={styles.nameInput}
                    placeholder='Amy'
                    onChangeText={this.onChangeText}
                    value={this.state.name}/>
                    <TouchableOpacity onPress={this.onPress}>
                        <Text style={styles.buttonnText}>Next</Text>
                    </TouchableOpacity>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    title:{
        fontSize:20,
    },
    nameInput:{
        marginTop:16,
        borderColor:'black',
        borderWidth:1,
        padding:8,
        width:200
    },
    buttonnText:{
        marginTop:16,
        fontSize:24,
        
    },
});

export default Main;
