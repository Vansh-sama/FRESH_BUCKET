import React, {useRef, useState} from 'react';

import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import OnboardingItem from '../../components/onboarding/OnboardingItem';
import Pagination from '../../components/onboarding/Pagination';
import BottomButtons from '../../components/onboarding/BottomButtons';

import {onboardingData} from '../../data/onboardingData';

import {
  Colors,
  Spacing,
  Typography,
} from '../../theme';

const OnboardingScreen = ({onDone}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const listRef = useRef(null);

  const isLastSlide =
    activeIndex === onboardingData.length - 1;

  const handleScroll = event => {
    const offsetX =
      event.nativeEvent.contentOffset.x;

    const width =
      event.nativeEvent.layoutMeasurement.width;

    if (!width) {
      return;
    }

    const index = Math.round(offsetX / width);

    if (
      index >= 0 &&
      index < onboardingData.length &&
      index !== activeIndex
    ) {
      setActiveIndex(index);
    }
  };

  const handleNext = () => {
    if (isLastSlide) {
      onDone?.();
      return;
    }

    listRef.current?.scrollToIndex({
      index: activeIndex + 1,
      animated: true,
    });
  };

  const handleSkip = () => {
    onDone?.();
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top', 'bottom']}>

      {/* SKIP */}

      {!isLastSlide && (
        <TouchableOpacity
          style={styles.skipButton}
          onPress={handleSkip}
          activeOpacity={0.7}>

          <Text style={styles.skipText}>
            Skip
          </Text>

        </TouchableOpacity>
      )}

      {/* SLIDES */}

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

        showsHorizontalScrollIndicator={false}

        onScroll={handleScroll}
        scrollEventThrottle={16}

        getItemLayout={(data, index) => ({
          length: data?.length
            ? undefined
            : 0,
          offset: 0,
          index,
        })}
      />

      {/* BOTTOM */}

      <View style={styles.bottomSection}>

        <Pagination
          count={onboardingData.length}
          activeIndex={activeIndex}
        />

        <BottomButtons
          isLastSlide={isLastSlide}
          onPress={handleNext}
        />

      </View>

    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.background,
  },

  skipButton: {
    position: 'absolute',

    top: 12,
    right: 20,

    zIndex: 20,

    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },

  skipText: {
    ...Typography.bodySmall,

    fontWeight: '700',

    color: Colors.primary,
  },

  bottomSection: {
    backgroundColor: Colors.background,

    paddingTop: Spacing.sm,
  },
});