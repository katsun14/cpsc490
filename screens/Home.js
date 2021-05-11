import React from 'react'
import { Animated, View, Text, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux'
import Firebase from '../config/Firebase'
import LineItemConnection from '../components/LineItemConnection';

class Home extends React.Component {
    state = {
        scrollY: new Animated.Value(0),
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    Home
                </Text>
                <Button
                    title="Edit Connections"
                    color="#1ecbe1"
                    onPress={() => this.props.navigation.navigate('Circle')}
                />
                <Text style={styles.textCircle}>
                    All
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
    text: {
        textAlign: 'center',
        fontSize: 24,
        padding: 10,
    },
    textCircle: {
        textAlign: 'left',
        fontSize: 22,
        paddingTop: 20,
        paddingLeft: 25,
    },
})

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Home)
