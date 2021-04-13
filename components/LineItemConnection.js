import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

const LineItemConnection = ({ name }) => {

  return (
    <View style={styles.container}>
        <Text style={styles.title}>
          {name}
        </Text>
      <View style={styles.containerRight}>
        <Feather name="more-horizontal" size={20} />
      </View>
    </View>
  );
};

// LineItemConnection.propTypes = {
//   // required
//   name: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     artist: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
//     length: PropTypes.number.isRequired,
//     title: PropTypes.string.isRequired
//   }).isRequired,
// };

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    width: '100%'
  },
  title: {
    marginBottom: 4
  },
  containerRight: {
    alignItems: 'flex-end',
    flex: 1
  }
});

export default LineItemConnection;