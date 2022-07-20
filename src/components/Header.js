import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { screenHeight } from '../utils/commonStyles';

const Header = (props) => {
    const {
        leftImage,
        leftPress,
        title,
        rightImage,
        rightPress
    } = props;
    return (
        <View style={{ flexDirection: 'row', backgroundColor: 'white', height: screenHeight * 0.06, justifyContent: 'center' }}>
            <TouchableOpacity onPress={leftPress} style={[styles.imageStyle, styles.alignment]}>
                <Image source={leftImage} style={styles.icons} resizeMode='contain' />
            </TouchableOpacity>
            <View style={[styles.titleView, styles.alignment]}>
                <Text style={{ fontSize: 16 }}>{title}</Text>
            </View>
            <TouchableOpacity onPress={rightPress} style={[styles.imageStyle, styles.alignment]}>
                <Image source={rightImage} style={styles.icons} resizeMode='contain' />
            </TouchableOpacity>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    icons: {
        height: 35,
        width: 35
    },
    imageStyle: {
        flex: 0.15
    },
    titleView: {
        flex: 0.7
    },
    alignment: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})