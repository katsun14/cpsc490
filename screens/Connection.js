import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button } from 'react-native'
import Firebase, { db } from '../config/Firebase.js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addConnection } from '../actions/user'
import TouchIcon from '../components/TouchIcon'
import { Feather } from '@expo/vector-icons'

class Connection extends React.Component {
    state = {
        // name: '',
        email: ''
    }

    handleAddConnection = () => {
        this.props.addConnection(this.state.email)
        this.props.navigation.goBack(null)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerTouchIcon}>
                    <TouchIcon
                        icon={<Feather name="chevron-left" />}
                        onPress={() => this.props.navigation.goBack(null)}
                    />
                </View>
                <Text style={styles.text}>Add a new connection!</Text>
                {/* <TextInput
                    style={styles.inputBox}
                    value={this.state.name}
                    onChangeText={name => this.setState({name: name})}
                    placeholder='Name'
                /> */}
                <TextInput
                    style={styles.inputBox}
                    value={this.state.email}
                    onChangeText={email => this.setState({email: email})}
                    placeholder='Email'
                    autoCapitalize='none'
                />
                <TouchableOpacity style={styles.button} onPress={this.handleAddConnection}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
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
    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center',
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#1ecbe1',
        borderColor: '#1ecbe1',
        borderWidth: 1,
        borderRadius: 5,
        width: 200,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    },
    text: {
        fontSize: 20,
    },
    containerTouchIcon: {
        alignSelf: "flex-start",
        padding: 10,
    },
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ addConnection }, dispatch)
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Connection)
