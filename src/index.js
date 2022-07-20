import { SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import Navigation from './navigation'
import { Provider } from 'react-redux';
import { configureStore } from './store';
const { store, persistor } = configureStore();
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Provider store={store}>
                <PersistGate loading={true} persistor={persistor}>
                    <Navigation />
                </PersistGate>
            </Provider>
        </SafeAreaView>
    )
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
