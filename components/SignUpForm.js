import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

export default function SignUpForm() {
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [isSignin, setIsSignin] = useState(false);
    const baseUrl =
        'https://us-central1-one-time-password-154a8.cloudfunctions.net/';

    const onSignUpHandler = async () => {
        try {
            await axios.post(`${baseUrl}createUser`, { phone });
            await axios.post(`${baseUrl}requestOneTimePassword`, { phone });
            setIsSignin(true);
        } catch (err) {
            console.log(err);
        }
    };

    const onSignInHandler = async () => {
        try {
            const response = await axios.post(
                `${baseUrl}verifyOneTimePassword`,
                { phone, code }
            );
            const { token } = response.data;
            firebase.auth().signInWithCustomToken(token);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <View>
            {!isSignin ? (
                <View>
                    <Text style={{ marginTop: 30, marginBottom: 20 }} h3>
                        Sign Up
                    </Text>
                    <View style={{ marginBottom: 10 }}>
                        <Text>Enter Phone Number</Text>
                        <Input
                            value={phone}
                            placeholder="Enter your phone number"
                            onChangeText={(text) => setPhone(text)}
                        />
                    </View>
                    <Button title="Sign Up" onPress={onSignUpHandler} />
                </View>
            ) : (
                <View>
                    <Text style={{ marginTop: 30, marginBottom: 20 }} h3>
                        Sign In
                    </Text>
                    <View style={{ marginBottom: 10 }}>
                        <Text>Enter Phone Number</Text>
                        <Input
                            value={phone}
                            placeholder="Enter your phone number"
                            onChangeText={(text) => setPhone(text)}
                        />
                        <Text>Enter OTP</Text>
                        <Input
                            value={code}
                            placeholder="Enter your OTP"
                            onChangeText={(text) => setCode(text)}
                        />
                    </View>
                    <Button title="Sign In" onPress={onSignInHandler} />
                </View>
            )}
        </View>
    );
}
