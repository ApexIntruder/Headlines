import { useRoute } from '@react-navigation/native'
import moment from 'moment'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Header from '../components/Header'
import { commonStyles, screenHeight } from '../utils/commonStyles'
import Images from '../utils/Images'

const DetailScreen = ({ navigation }) => {
  const goBack = () => navigation.goBack();
  const { params } = useRoute();
  return (
    <View style={styles.container}>
      <Header leftImage={Images.Back} leftPress={goBack} />
      <View style={commonStyles.container}>
        <Text>{params.title}</Text>
        <Text>{params.author}</Text>
        <Text>{moment(params.publishedAt).format('lll')}</Text>
        <Image
          source={params.urlToImage ? { uri: params.urlToImage } : Images.Dummy}
          style={styles.newsImg}
          resizeMode='cover'
        />
        <Text>{params.description}</Text>
      </View>
    </View>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  newsImg: {
    height: screenHeight * 0.5,
    width: 'auto',
    borderRadius: 10
  }
})