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

import Ionicons from 'react-native-vector-icons/Ionicons';

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

const OnboardingScreen = ({navigation}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const listRef = useRef(null);

  const isLastSlide =
    activeIndex === onboardingData.length - 1;


  /* ================================
     SCROLL
  ================================= */

  const handleScroll = event => {
    const offsetX =
      event.nativeEvent.contentOffset.x;

    const index = Math.round(
      offsetX / width,
    );

    if (
      index !== activeIndex &&
      index >= 0 &&
      index < onboardingData.length
    ) {
      setActiveIndex(index);
    }
  };


  /* ================================
     NEXT
     Route name must match AppNavigator —
     there is no 'Login' screen registered,
     only 'Signup'.
  ================================= */

  const handleNext = () => {

    if (isLastSlide) {
      navigation.replace('Signup');
      return;
    }

    listRef.current?.scrollToIndex({
      index: activeIndex + 1,
      animated: true,
    });

  };


  /* ================================
     SKIP
  ================================= */

  const handleSkip = () => {
    navigation.replace('Signup');
  };


  return (
    <SafeAreaView style={styles.container}>

      {/* ================================
          SKIP
      ================================= */}

      {!isLastSlide && (
        <TouchableOpacity
          style={styles.skipButton}
          activeOpacity={0.75}
          onPress={handleSkip}>

          <Text style={styles.skipText}>
            Skip
          </Text>

          <Ionicons
            name="chevron-forward"
            size={14}
            color={Colors.primary}
          />

        </TouchableOpacity>
      )}


      {/* ================================
          SLIDES
      ================================= */}

      <FlatList
        ref={listRef}

        style={styles.flatList}

        data={onboardingData}

        renderItem={({item}) => (
          <OnboardingItem item={item} />
        )}

        keyExtractor={item => item.id}

        horizontal

        pagingEnabled

        showsHorizontalScrollIndicator={false}

        bounces={false}

        onScroll={handleScroll}

        scrollEventThrottle={16}

        decelerationRate="fast"

        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />


      {/* ================================
          BOTTOM
      ================================= */}

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


/* =====================================================
   STYLES
===================================================== */

const styles = StyleSheet.create({

  container: {
    flex: 1,

    backgroundColor: Colors.background,
  },


  /* ================================
     SKIP
  ================================= */

  skipButton: {
    position: 'absolute',

    top: Spacing.lg,

    right: Spacing.lg,

    zIndex: 20,

    flexDirection: 'row',

    alignItems: 'center',

    paddingLeft: Spacing.md,

    paddingRight: Spacing.sm,

    paddingVertical: Spacing.sm,

    borderRadius: 20,

    backgroundColor: '#E8F5E9',
  },

  skipText: {
    ...Typography.bodySmall,

    fontWeight: '700',

    color: Colors.primary,

    marginRight: 2,
  },


  /* ================================
     SLIDES
  ================================= */

  flatList: {
    flex: 1,
  },


  /* ================================
     BOTTOM
  ================================= */

  bottomSection: {
    backgroundColor: Colors.background,

    paddingHorizontal: Spacing.xl,

    paddingTop: Spacing.xs,

    paddingBottom: Spacing.md,
  },

});