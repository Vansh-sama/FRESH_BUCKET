import React, {useRef, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

import OnboardingItem from '../../components/onboarding/OnboardingItem';
import Pagination from '../../components/onboarding/Pagination';
import BottomButtons from '../../components/onboarding/BottomButtons';
import {onboardingData} from '../../data/onboardingData';
import {
  Colors,
  Spacing,
  Typography,
} from '../../theme';

// onDone comes from AppNavigator - calling it flips isFirstLaunch to
// false, moving the user into the Auth stack. This screen only handles
// slide state; it doesn't know or care what happens after onDone fires.
const OnboardingScreen = ({onDone}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef(null);

  const isLastSlide = activeIndex === onboardingData.length - 1;

  const handleScroll = event => {
    const {contentOffset, layoutMeasurement} = event.nativeEvent;
    const index = Math.round(contentOffset.x / layoutMeasurement.width);
    setActiveIndex(index);
  };

  const handleNext = () => {
    if (isLastSlide) {
      onDone && onDone();
      return;
    }
    listRef.current?.scrollToIndex({index: activeIndex + 1});
  };

  return (
    <View style={styles.container}>
      {!isLastSlide && (
        <TouchableOpacity style={styles.skipButton} onPress={onDone}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      <FlatList
        ref={listRef}
        data={onboardingData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({item}) => <OnboardingItem item={item} />}
      />

      <Pagination count={onboardingData.length} activeIndex={activeIndex} />

      <BottomButtons isLastSlide={isLastSlide} onPress={handleNext} />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  skipButton: {
    alignSelf: 'flex-end',
    padding: Spacing.lg,
  },
  skipText: {
    ...Typography.bodyBold,
    color: Colors.textSecondary,
  },
});
