import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignUpForm from './components/SignUpForm';
import firebase from 'firebase';

export default function App() {
    const firebaseConfig = {
        apiKey: 'AIzaSyCE-x_58AsEmzxXtHcLBe6IgeqtjIJcmQw',
        authDomain: 'one-time-password-154a8.firebaseapp.com',
        databaseURL:
            'https://one-time-password-154a8-default-rtdb.firebaseio.com',
        projectId: 'one-time-password-154a8',
        storageBucket: 'one-time-password-154a8.appspot.com',
        messagingSenderId: '845732121085',
        appId: '1:845732121085:web:a2e843d90d366d6bc47194',
    };

    useEffect(() => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app(); // if already initialized, use that one
        }
    });

    return (
        <View style={styles.container}>
            <SignUpForm />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 100,
        marginHorizontal: 20,
    },
});
