import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux'
import Firebase from '../config/Firebase'

class Profile extends React.Component {
    handleSignout = () => {
        Firebase.auth().signOut()
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Profile
                </Text>
                <Text style={styles.text}>Welcome, {this.props.user.email}</Text>
                <Button title='Logout' color="#1ecbe1" onPress={this.handleSignout} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 80,
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        padding: 10,
    },
    text: {
        fontSize: 18,
        paddingBottom: 15,
        paddingTop: 175
    },
})

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Profile)
