import React from 'react'
import { Animated, StyleSheet, Text, View, SafeAreaView, Button } from 'react-native'
import { connect } from 'react-redux'
import Firebase from '../config/Firebase'
import TwilioVoice from 'react-native-twilio-programmable-voice'
import LineItemCall from '../components/LineItemCall';


// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const apiKey = process.env.TWILIO_API_KEY;
// const apiSecret = process.env.TWILIO_API_SECRET;
// const outgoingApplicationSid = process.env.TWILIO_APP_SID;

class Connect extends React.Component {
    state = {
        scrollY: new Animated.Value(0),
    }


    // constructor(props){
    //     super(props)
    //     this.state = {

    //     }
    // }

    // componentDidMount = async() => {
    // }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    Connect
                </Text>
                <Animated.ScrollView
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                        { useNativeDriver: true }
                    )}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                    // stickyHeaderIndices={stickyArray}
                    style={styles.containerScroll}
                >
                    <View style={styles.containerCall}>
                        {this.props.user.connections &&
                        this.props.user.connections.map((connection, index) => (
                            <LineItemCall
                            name={connection}
                            key={index.toString()}
                            />
                        ))}
                    </View>
                </Animated.ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingTop: 80,
    },
    containerCall: {
        alignItems: 'center',
        minHeight: 540,
    },
    containerScroll: {
        paddingTop: 20,
    },
    text: {
        textAlign: 'center',
        fontSize: 24,
        padding: 10,
    },
})

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Connect)
