import React, {
  useRef,
  useState,
} from 'react';

import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Animated,
} from 'react-native';

import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import Ionicons from '@react-native-vector-icons/ionicons';

import OnboardingItem, {
  CIRCLE_SIZE,
} from '../../components/onboarding/OnboardingItem';

import Pagination from '../../components/onboarding/Pagination';

import BottomButtons from '../../components/onboarding/BottomButtons';

import {onboardingData} from '../../data/onboardingData';

import {
  Colors,
  Spacing,
  Typography,
} from '../../theme';

const {width, height} = Dimensions.get('window');

const SLIDE_HEIGHT = CIRCLE_SIZE + 165;

const OnboardingScreen = ({navigation}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const insets = useSafeAreaInsets();

  const listRef = useRef(null);

  const slideEnter = useRef(new Animated.Value(0)).current;

  const blobOneFloat = useRef(new Animated.Value(0)).current;
  const blobTwoFloat = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blobOneFloat, {
          toValue: 1,
          duration: 2600,
          useNativeDriver: true,
        }),
        Animated.timing(blobOneFloat, {
          toValue: 0,
          duration: 2600,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(blobTwoFloat, {
          toValue: 1,
          duration: 3200,
          useNativeDriver: true,
        }),
        Animated.timing(blobTwoFloat, {
          toValue: 0,
          duration: 3200,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [blobOneFloat, blobTwoFloat]);

  React.useEffect(() => {
    slideEnter.setValue(0);
    Animated.timing(slideEnter, {
      toValue: 1,
      duration: 380,
      useNativeDriver: true,
    }).start();
  }, [activeIndex, slideEnter]);

  const isLastSlide =
    activeIndex === onboardingData.length - 1;

  const handleScroll = event => {
    const offsetX =
      event.nativeEvent.contentOffset.x;

    const index = Math.round(offsetX / width);

    if (
      index !== activeIndex &&
      index >= 0 &&
      index < onboardingData.length
    ) {
      setActiveIndex(index);
    }
  };

  const handleNext = () => {
    if (isLastSlide) {
      navigation.replace('Auth', {
  screen: 'Signup',
});
      return;
    }

    listRef.current?.scrollToIndex({
      index: activeIndex + 1,
      animated: true,
    });
  };

  const handleSkip = () => {
    navigation.replace('Auth', {
  screen: 'Signup',
});
  };

  const blobOneTranslateY = blobOneFloat.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -14],
  });

  const blobTwoTranslateY = blobTwoFloat.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 12],
  });

  const slideOpacity = slideEnter;
  const slideTranslateY = slideEnter.interpolate({
    inputRange: [0, 1],
    outputRange: [12, 0],
  });

  return (
    <SafeAreaView
      style={styles.container}
      edges={[
        'top',
        'left',
        'right',
        'bottom',
      ]}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.onboardingBg}
      />

      <Animated.View
        style={[
          styles.blob,
          styles.blobOne,
          {transform: [{translateY: blobOneTranslateY}]},
        ]}
      />
      <Animated.View
        style={[
          styles.blob,
          styles.blobTwo,
          {transform: [{translateY: blobTwoTranslateY}]},
        ]}
      />

      {!isLastSlide && (
        <TouchableOpacity
          style={[
            styles.skipButton,
            {top: insets.top + 12},
          ]}
          activeOpacity={0.8}
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

      {/* content is split into two zones: the slide block centers
          itself in the remaining space (flex:1), while pagination +
          button are pinned as the very last elements at the bottom,
          right above the safe-area inset — no dead gap beneath them */}
      <View style={styles.content}>

        <Animated.View
          style={[
            styles.slideArea,
            {
              opacity: slideOpacity,
              transform: [{translateY: slideTranslateY}],
            },
          ]}>
          <FlatList
            ref={listRef}

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

            style={styles.flatList}
          />
        </Animated.View>

        {/* PAGINATION + BUTTON — bottom-anchored block */}
        <View style={styles.bottomBlock}>

          <View style={styles.paginationWrapper}>
            <Pagination
              count={onboardingData.length}
              activeIndex={activeIndex}
            />
          </View>

          <View
            style={[
              styles.buttonWrapper,
              {marginBottom: Math.max(insets.bottom, 12)},
            ]}>
            <BottomButtons
              isLastSlide={isLastSlide}
              onPress={handleNext}
            />
          </View>

        </View>

      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.onboardingBg,
  },

  blob: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },

  blobOne: {
    width: 110,
    height: 110,
    top: -30,
    left: -30,
  },

  blobTwo: {
    width: 90,
    height: 90,
    bottom: -30,
    right: -20,
  },

  skipButton: {
    position: 'absolute',

    right: 14,

    zIndex: 50,

    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 8,
    paddingLeft: 14,
    paddingRight: 10,

    borderRadius: 999,

    backgroundColor: Colors.primarySoft,

    gap: 3,
  },

  skipText: {
    ...Typography.bodySmall,
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },

  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 56,
  },

  slideArea: {
    flex: 1,
    justifyContent: 'center',
  },

  flatList: {
    flexGrow: 0,
    height: SLIDE_HEIGHT,
  },

  bottomBlock: {
    width: '100%',
  },

  paginationWrapper: {
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },

  buttonWrapper: {
    width: '100%',
    paddingHorizontal: Spacing.xxl,
    marginTop: 20,
  },
});