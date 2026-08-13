import React, {useRef, useState} from 'react';

import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';

import OnboardingItem from '../../components/onboarding/OnboardingItem';
import Pagination from '../../components/onboarding/Pagination';
import BottomButtons from '../../components/onboarding/BottomButtons';

import {onboardingData} from '../../data/onboardingData';

import {
  Colors,
  Spacing,
  Typography,
} from '../../theme';

const {width} = Dimensions.get('window');

const OnboardingScreen = ({onDone}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const listRef = useRef(null);

  const isLastSlide =
    activeIndex === onboardingData.length - 1;

  /* =========================================
     HANDLE SLIDE CHANGE
  ========================================= */

  const handleScroll = event => {
    const offsetX =
      event.nativeEvent.contentOffset.x;

    const screenWidth =
      event.nativeEvent.layoutMeasurement.width;

    const index = Math.round(
      offsetX / screenWidth,
    );

    if (
      index >= 0 &&
      index < onboardingData.length &&
      index !== activeIndex
    ) {
      setActiveIndex(index);
    }
  };

  /* =========================================
     NEXT BUTTON
  ========================================= */

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

  /* =========================================
     SKIP BUTTON
  ========================================= */

  const handleSkip = () => {
    const lastIndex =
      onboardingData.length - 1;

    listRef.current?.scrollToIndex({
      index: lastIndex,
      animated: true,
    });

    setActiveIndex(lastIndex);
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* =====================================
          SKIP BUTTON
      ====================================== */}

      {!isLastSlide && (
        <TouchableOpacity
          style={styles.skipButton}
          onPress={handleSkip}
          activeOpacity={0.7}
          hitSlop={{
            top: 10,
            bottom: 10,
            left: 10,
            right: 10,
          }}>

          <Text style={styles.skipText}>
            Skip
          </Text>

        </TouchableOpacity>
      )}

      {/* =====================================
          ONBOARDING SLIDES
      ====================================== */}

      <FlatList
        ref={listRef}
        data={onboardingData}

        renderItem={({item}) => (
          <View style={styles.slide}>
            <OnboardingItem item={item} />
          </View>
        )}

        keyExtractor={item =>
          item.id.toString()
        }

        horizontal
        pagingEnabled

        bounces={false}

        showsHorizontalScrollIndicator={false}

        onScroll={handleScroll}
        scrollEventThrottle={16}

        // Makes the list behave correctly
        // when moving directly to the last slide.
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}

        initialNumToRender={1}
        maxToRenderPerBatch={2}
        windowSize={3}
      />

      {/* =====================================
          BOTTOM SECTION
      ====================================== */}

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


/* ===========================================
   STYLES
=========================================== */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  /* =========================================
     SLIDE
  ========================================= */

  slide: {
    width: width,
    flex: 1,
  },

  /* =========================================
     SKIP BUTTON
  ========================================= */

  skipButton: {
    position: 'absolute',

    top: 18,
    right: 20,

    zIndex: 20,

    paddingHorizontal: 14,
    paddingVertical: 9,

    borderRadius: 999,

    backgroundColor: Colors.surface,

    borderWidth: 1,
    borderColor: Colors.border,

    elevation: 2,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },

  skipText: {
    ...Typography.body,

    fontWeight: '600',

    color: Colors.textSecondary,
  },

  /* =========================================
     BOTTOM SECTION
  ========================================= */

  bottomSection: {
    paddingTop: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,

    backgroundColor: Colors.background,
  },

});