import React, {useRef, useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import OnboardingItem from '../../components/onboarding/OnboardingItem';
import Pagination from '../../components/onboarding/Pagination';
import BottomButtons from '../../components/onboarding/BottomButtons';
import {onboardingData} from '../../data/onboardingData';

const OnboardingScreen = ({onDone}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const listRef = useRef(null);

  const isLastSlide =
    activeIndex === onboardingData.length - 1;

  const handleScroll = event => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width,
    );

    setActiveIndex(index);
  };

  const handleNext = () => {
    if (isLastSlide) {
      onDone && onDone();
      return;
    }

    listRef.current?.scrollToIndex({
      index: activeIndex + 1,
      animated: true,
    });
  };

  const handleSkip = () => {
    listRef.current?.scrollToIndex({
      index: onboardingData.length - 1,
      animated: true,
    });

    setActiveIndex(onboardingData.length - 1);
  };

  return (
    <View style={styles.container}>
      {!isLastSlide && (
        <TouchableOpacity
          style={styles.skipButton}
          activeOpacity={0.85}
          onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
          <Ionicons name="chevron-forward" size={16} color="#FF6B35" />
        </TouchableOpacity>
      )}

      <FlatList
        ref={listRef}
        data={onboardingData}
        renderItem={({item}) => (
          <OnboardingItem item={item} />
        )}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        bounces={false}
        decelerationRate="fast"
        initialNumToRender={3}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
      />

      <View style={styles.bottomContainer}>
        <Pagination
          count={onboardingData.length}
          activeIndex={activeIndex}
        />

        <BottomButtons
          isLastSlide={isLastSlide}
          onPress={handleNext}
        />
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7F3',
  },

  skipButton: {
    position: 'absolute',
    top: 55,
    right: 24,
    zIndex: 10,

    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,

    backgroundColor: 'rgba(255,255,255,0.85)',

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 2},
    elevation: 4,
  },

  skipText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#5C6B60',
    marginRight: 2,
  },

  bottomContainer: {
    paddingBottom: 35,
  },
});