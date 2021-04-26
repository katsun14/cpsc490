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
                <TouchIcon
                    icon={<Feather name="chevron-left" />}
                    onPress={() => this.props.navigation.goBack(null)}
                />
                <Text>Connection Screen</Text>
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
        justifyContent: 'center'
    },
    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center'
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#EE1D52',
        borderColor: '#EE1D52',
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
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
