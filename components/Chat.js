import React, { Component } from 'react';
import {
    Platform,
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';
import { GiftedChat } from "react-native-gifted-chat";
import Fire from "../Fire";
import firebase from 'react-native-firebase';

class Chat extends React.Component {
    

    state = {
       
    }

    get user(){
        return{
            _id:Fire.uid,
            name:this.props.navigation.state.params.name
        }
    }

    componentDidMount() {
        Fire.get(message=>
        this.setState(  //此寫法和官網依樣
            previous=>({
                messages:GiftedChat.append(previous.messages,message)
            })
        ));
    }

    componentWillUnmount(){
        Fire.off();
    }


    render() {
        
        const chat = <GiftedChat messages={this.state.messages} onSend={Fire.send} user={this.user}/>;

        return (
            <SafeAreaView style={{ flex:1 }}>
                {chat}
            </SafeAreaView>
        )
    }
}



const styles = StyleSheet.create({
});

export default Chat;
