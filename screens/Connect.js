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

    componentDidMount = async() => {
        this.listenEvents()
        this.initTelephony()
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

    getAccessTokenFromServer() {
        const url = "https://quickstart-3283-dev.twil.io/access-token";
        return fetch(url)
          .then(response => response.text())
    
          .catch(error => {
            console.log(error);
          });
      }

    async initTelephony() {
        try {
            const accessToken = await this.getAccessTokenFromServer()
            const success = await TwilioVoice.initWithToken(accessToken)
            console.log("Init with Token:")
            console.log(success)
            TwilioVoice.configureCallKit({
                appName: 'magpie-twilio-app'
            })
        } catch (err) {
            console.error(err)
        }
    }

    StartCall=()=>{
       
        // start a call
        try {
            const success = TwilioVoice.connect({To: '+18004444444'})
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
