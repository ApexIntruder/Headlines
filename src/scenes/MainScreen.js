import React, { useEffect, useState } from 'react'
import Images from '../utils/Images'
import { useDispatch, useSelector } from 'react-redux';
import { commonStyles, screenHeight, screenWidth } from '../utils/commonStyles'
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { getHeadlinesRequest } from '../store/modules/headlines/actions';
import moment from 'moment';
import { Shorten } from '../utils/commonMethods';
import { DEFAULT_CATEGORY, DEFAULT_CAT_LIST, DEFAULT_COUNTRY } from '../utils/default';

const MainScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  const { headlines } = useSelector(state => ({
    headlines: state.HeadlineReducer?.headlines,
  }));

  const [state, setState] = useState({
    search: '',
    selected_cat: ''
  })

  const handleChange = (value, name) => {
    setState(prevState => ({ ...prevState, [name]: value }))
  }

  useEffect(() => {
    dispatch(getHeadlinesRequest(DEFAULT_COUNTRY, state.selected_cat == '' ? DEFAULT_CATEGORY : state.selected_cat, state.search))
  }, [state.search, state.selected_cat])

  const filterCat = (cat_name) => {
    setState(prevState => ({
      ...prevState,
      'selected_cat': prevState.selected_cat == cat_name ? '' : cat_name
    }))
  }

  const renderCategory = ({ item }) => {
    return (
      <TouchableOpacity style={[styles.catMain, { backgroundColor: state.selected_cat == item.key ? 'gray' : '#DAF7A6' }]} key={item.key} onPress={() => filterCat(item.key)}>
        <Text style={styles.catItem}>{item.name}</Text>
      </TouchableOpacity>
    )
  };

  const goToDetail = (details) => {
    navigation.navigate('DetailScreen', details);
  }

  const renderNews = ({ item }) => {
    return (
      <TouchableOpacity style={styles.newsMain} onPress={() => goToDetail(item)} key={item.id}>
        <Text>{item.title}</Text>
        <Text>{item.author}</Text>
        <Text>{moment(item.publishedAt).format('lll')}</Text>
        <Image
          source={item.urlToImage ? { uri: item.urlToImage } : Images.Dummy}
          style={styles.newsImg}
          resizeMode='cover'
        />
        <Text>{Shorten(item.description, 80)}</Text>
      </TouchableOpacity>
    )
  };

  return (
    <View style={commonStyles.container}>
      <TextInput
        placeholder='search text'
        placeholderTextColor='black'
        style={styles.searchField}
        value={state.search}
        onChangeText={text => handleChange(text, 'search')}
      />

      <View style={{ marginTop: 5, marginBottom: 5 }}>
        <FlatList
          numColumns={3}
          bounces={false}
          data={DEFAULT_CAT_LIST}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={{ flex: 5 }}>
        <FlatList
          renderItem={renderNews}
          data={headlines}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={{ alignItems: 'center' }}>
              <Text>No News Related to {state.search ? state.search : state.selected_cat}</Text>
            </View>
          )}
        />
      </View>
    </View>
  )
}

export default MainScreen

const styles = StyleSheet.create({
  searchField: {
    backgroundColor: '#E8B4B4',
    height: 40,
    borderRadius: 5,
    width: screenWidth * 0.6,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16
  },
  catMain: {
    flex: 1 / 3,
    justifyContent: 'space-between',
    backgroundColor: '#DAF7A6',
    margin: 5,
    borderRadius: 15
  },
  catItem: {
    textAlign: 'center',
    padding: 5,
    fontSize: 16
  },
  newsMain: {
    backgroundColor: 'lightgray',
    margin: 5,
    padding: 10,
    borderRadius: 15
  },
  newsItem: {
    fontSize: 16
  },
  newsImg: {
    height: screenHeight * 0.3,
    width: 'auto',
  }
})