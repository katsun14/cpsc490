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
                <View style={styles.containerTouchIcon}>
                    <TouchIcon
                        icon={<Feather name="chevron-left" />}
                        onPress={() => this.props.navigation.goBack(null)}
                    />
                </View>
                <Text style={styles.text}>
                    Connections
                </Text>
                <Button
                    title="Add someone"
                    color="#1ecbe1"
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
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 80,
    },
    containerConnections: {
        alignItems: 'center',
        minHeight: 540,
    },
    containerScroll: {
        marginTop: 5,
    },
    containerTouchIcon: {
        alignSelf: "flex-start",
        padding: 10,
    },
    text: {
        fontSize: 24,
        padding: 10
    },
})

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Circle)
