import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux'
import Firebase from '../config/Firebase'

class Home extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Home Screen</Text>
                <Text>{this.props.user.email}</Text>
                <Button
                    title="Go to Circle"
                    onPress={() => this.props.navigation.navigate('Circle')}
                />
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
    }
})

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Home)
