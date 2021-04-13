import React from 'react'
import { Animated, View, Text, StyleSheet, Button } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Firebase, { db } from '../config/Firebase.js'
import TouchIcon from '../components/TouchIcon';
import { Feather } from '@expo/vector-icons';
import LineItemConnection from '../components/LineItemConnection';

class Circle extends React.Component {
    state = {
        scrollY: new Animated.Value(0),
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchIcon
                    icon={<Feather name="chevron-left" />}
                    onPress={() => this.props.navigation.goBack(null)}
                />
                <Text>Circle Screen</Text>
                <Text>{this.props.user.email}</Text>
                <Button
                    title="Add someone"
                    onPress={() => this.props.navigation.navigate('Connection')}
                />
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
                    <View style={styles.containerConnections}>
                        {this.props.user.connections &&
                        this.props.user.connections.map((connection, index) => (
                            <LineItemConnection
                            name={connection}
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
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 89
    },
    containerConnections: {
        alignItems: 'center',
        minHeight: 540
    },
    containerScroll: {
        paddingTop: 20
    },
})

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Circle)
