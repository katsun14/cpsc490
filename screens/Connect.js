import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native'
import { connect } from 'react-redux'
import Firebase from '../config/Firebase'
import TwilioVoice from 'react-native-twilio-programmable-voice'

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const apiKey = process.env.TWILIO_API_KEY;
const apiSecret = process.env.TWILIO_API_SECRET;
const outgoingApplicationSid = process.env.TWILIO_APP_SID;

class Connect extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount(){
        this.initTelephony()
        // add listeners (flowtype notation)
    }

    listenEvents=()=>{
        TwilioVoice.addEventListener('deviceReady', function() {
            // no data
        })
        TwilioVoice.addEventListener('deviceNotReady', function(data) {
            console.log(data)
            // {
            //     err: string
            // }
        })
        TwilioVoice.addEventListener('connectionDidConnect', function(data) {
            console.log(data)
            // Android
            // {
            //     call_sid: string,  // Twilio call sid
            //     call_state: 'PENDING' | 'CONNECTED' | 'ACCEPTED' | 'CONNECTING' 'DISCONNECTED' | 'CANCELLED',
            //     call_from: string, // "+441234567890"
            //     call_to: string,   // "client:bob"
            // }
            // iOS
            // {
            //     call_sid: string,  // Twilio call sid
            //     call_state: 'PENDING' | 'CONNECTED' | 'ACCEPTED' | 'CONNECTING' 'DISCONNECTED' | 'CANCELLED',
            //     from: string,      // "+441234567890" // issue 44 (https://github.com/hoxfon/react-native-twilio-programmable-voice/issues/44)
            //     to: string,        // "client:bob"    // issue 44 (https://github.com/hoxfon/react-native-twilio-programmable-voice/issues/44)
            // }
        })
        TwilioVoice.addEventListener('connectionDidDisconnect', function(value) {
            console.log(value)
            //   | null
            //   | {
            //       err: string
            //     }
            //   | Android
            //     {
            //         call_sid: string,  // Twilio call sid
            //         call_state: 'PENDING' | 'CONNECTED' | 'ACCEPTED' | 'CONNECTING' 'DISCONNECTED' | 'CANCELLED',
            //         call_from: string, // "+441234567890"
            //         call_to: string,   // "client:bob"
            //         err?: string,
            //     }
            //   | iOS
            //     {
            //         call_sid: string,  // Twilio call sid
            //         call_state: 'PENDING' | 'CONNECTED' | 'ACCEPTED' | 'CONNECTING' 'DISCONNECTED' | 'CANCELLED',
            //         call_from?: string, // "+441234567890"
            //         call_to?: string,   // "client:bob"
            //         from?: string,      // "+441234567890" // issue 44 (https://github.com/hoxfon/react-native-twilio-programmable-voice/issues/44)
            //         to?: string,        // "client:bob"    // issue 44 (https://github.com/hoxfon/react-native-twilio-programmable-voice/issues/44)
            //         error?: string,                        // issue 44 (https://github.com/hoxfon/react-native-twilio-programmable-voice/issues/44)
            //     }
        })

        // iOS Only
        TwilioVoice.addEventListener('callRejected', function(value) {
            console.log(value)
        })

        // Android Only
        // TwilioVoice.addEventListener('deviceDidReceiveIncoming', function(data) {
        //     console.log(data)
        //     // {
        //     //     call_sid: string,  // Twilio call sid
        //     //     call_state: 'PENDING' | 'CONNECTED' | 'ACCEPTED' | 'CONNECTING' 'DISCONNECTED' | 'CANCELLED',
        //     //     call_from: string, // "+441234567890"
        //     //     call_to: string,   // "client:bob"
        //     // }
        // })
        // // Android Only
        // TwilioVoice.addEventListener('proximity', function(data) {
        //     console.log(data)
        //     // {
        //     //     isNear: boolean
        //     // }
        // })
        // // Android Only
        // TwilioVoice.addEventListener('wiredHeadset', function(data) {
        //     console.log(data)
        //     // {
        //     //     isPlugged: boolean,
        //     //     hasMic: boolean,
        //     //     deviceName: string
        //     // }
        // })

        // ...

        // // start a call
        

        // // hangup
        // TwilioVoice.disconnect()

        // // accept an incoming call (Android only, in iOS CallKit provides the UI for this)
        // TwilioVoice.accept()

        // // reject an incoming call (Android only, in iOS CallKit provides the UI for this)
        // TwilioVoice.reject()

        // // ignore an incoming call (Android only)
        // TwilioVoice.ignore()

        // // mute or un-mute the call
        // // mutedValue must be a boolean
        // TwilioVoice.setMuted(mutedValue)

        // TwilioVoice.sendDigits(digits)

        // should be called after the app is initialized
        // to catch incoming call when the app was in the background
        // TwilioVoice.getActiveCall()
        //     .then(incomingCall => {
        //         if (incomingCall){
        //             _deviceDidReceiveIncoming(incomingCall)
        //         }
        //     })
    }

    // async getAccessTokenFromServer(){
    //     try {
    //         const AccessToken = require('twilio').jwt.AccessToken;
    //         const VoiceGrant = AccessToken.VoiceGrant;

    //         // Create a "grant" which enables a client to use Voice as a given user
    //         const voiceGrant = new VoiceGrant({
    //             outgoingApplicationSid: outgoingApplicationSid,
    //             incomingAllow: true, // Optional: add to allow incoming calls
    //         });

    //         // Create an access token which we will sign and return to the client,
    //         // containing the grant we just created
    //         const token = new AccessToken(
    //             accountSid,
    //             apiKey,
    //             apiSecret,
    //             {identity: 'user'}
    //         );
    //         token.addGrant(voiceGrant);

    //         // Serialize the token to a JWT string
    //         console.log(token.toJwt());
    //         return token;
    //     } catch (err) {
    //         console.error(err)
    //     }
    // }

    async initTelephony() {
        try {
            const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzEzOGVkNDJmMDZmNjRmYzk2NzZiYmVkOGM4M2M0YjY0LTE2MTkzODgyODciLCJncmFudHMiOnsiaWRlbnRpdHkiOiJrYXRzdW4xNCIsInZvaWNlIjp7ImluY29taW5nIjp7ImFsbG93Ijp0cnVlfSwib3V0Z29pbmciOnsiYXBwbGljYXRpb25fc2lkIjoiQVA0NDc3OTE5ZTNhNjVkYjNlZThlNjEzZjFmZTM4MDBkNSJ9fX0sImlhdCI6MTYxOTM4ODI4NywiZXhwIjoxNjE5MzkxODg3LCJpc3MiOiJTSzEzOGVkNDJmMDZmNjRmYzk2NzZiYmVkOGM4M2M0YjY0Iiwic3ViIjoiQUNiMzE0MWJlMzcwMjA0MTY1ZGRjOTVmOGQ4NzQ1N2NkMSJ9.I_nW_dVxtQU3i7_FjJEO6vPE7zBYzOEMrU9xYRSyiLk'
            const success = await TwilioVoice.initWithToken(accessToken)
            console.log("SUCCESS:")
            console.log(success)
        } catch (err) {
            console.error(err)
        }
    }

    StartCall=()=>{
       
        // start a call
        try {
            const success = TwilioVoice.connect({To: '+14088059857'})
            console.log("CALL:")
            console.log(success)
        } catch (err) {
            console.error(err)
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Connect Screen</Text>
                <Text>{this.props.user.email}</Text>
                <SafeAreaView>
                    <Button
                        title={'Call Now'}
                        onPress={this.StartCall}
                    />
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
})

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Connect)
