import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import OfferBanner from '../../components/OfferBanner';
import Categories from '../../components/Categories';

const HomeScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#F8F7F3',
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <Header />

        <SearchBar />

        <OfferBanner />

        <Categories />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;