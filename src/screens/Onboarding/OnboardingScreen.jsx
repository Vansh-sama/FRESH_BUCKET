import React, {
  useRef,
  useState,
  useEffect,
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
  Easing,
} from 'react-native';

import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import Ionicons from '@react-native-vector-icons/ionicons';

import OnboardingItem, {
  IMAGE_SIZE,
} from '../../components/onboarding/OnboardingItem';

import Pagination from '../../components/onboarding/Pagination';

import BottomButtons from '../../components/onboarding/BottomButtons';

import {onboardingData} from '../../data/onboardingData';

import {
  Colors,
  Typography,
  Spacing,
  Radius,
}from '../../theme';


const {width} = Dimensions.get('window');


const OnboardingScreen = ({navigation}) => {

  const [activeIndex, setActiveIndex] = useState(0);

  const listRef = useRef(null);

  const insets = useSafeAreaInsets();

  const skipOpacity = useRef(
    new Animated.Value(1),
  ).current;


  /*
   * ========================================================
   * SKIP VISIBILITY
   * ========================================================
   */

  useEffect(() => {
    Animated.timing(skipOpacity, {
      toValue:
        activeIndex === onboardingData.length - 1
          ? 0
          : 1,

      duration: 220,

      easing: Easing.out(Easing.ease),

      useNativeDriver: true,
    }).start();
  }, [activeIndex, skipOpacity]);


  const isLastSlide =
    activeIndex === onboardingData.length - 1;


  /*
   * ========================================================
   * SLIDE CHANGE
   * ========================================================
   */

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


  /*
   * ========================================================
   * NEXT BUTTON
   * ========================================================
   */

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


  /*
   * ========================================================
   * SKIP
   * ========================================================
   */

  const handleSkip = () => {
    navigation.replace('Signup');
  };


  /*
   * ========================================================
   * RENDER
   * ========================================================
   */

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


      {/* ==================================================
          TOP NAVIGATION
      ================================================== */}

      <View
        style={[
          styles.topBar,
          {
            paddingTop: 7,
          },
        ]}>

        {/* Mini brand */}

        <View style={styles.brandContainer}>

          <View style={styles.brandIcon} />

          <Text style={styles.brandText}>
            Fresh Basket
          </Text>

        </View>


        {/* Skip */}

        {!isLastSlide && (
          <Animated.View
            style={{
              opacity: skipOpacity,
            }}>

            <TouchableOpacity
              style={styles.skipButton}
              activeOpacity={0.75}
              onPress={handleSkip}>

              <Text style={styles.skipText}>
                Skip
              </Text>

              <Ionicons
                name="chevron-forward"
                size={13}
                color={Colors.textSecondary}
              />

            </TouchableOpacity>

          </Animated.View>
        )}

      </View>


      {/* ==================================================
          SLIDES
      ================================================== */}

      <View style={styles.content}>

        <FlatList
          ref={listRef}

          data={onboardingData}

          horizontal

          pagingEnabled

          showsHorizontalScrollIndicator={false}

          showsVerticalScrollIndicator={false}

          bounces={false}

          decelerationRate="fast"

          scrollEventThrottle={16}

          onScroll={handleScroll}

          keyExtractor={item => item.id}

          renderItem={({item, index}) => (
            <OnboardingItem
              item={item}
              isActive={index === activeIndex}
            />
          )}

          getItemLayout={(_, index) => ({
            length: width,

            offset: width * index,

            index,
          })}

          style={styles.flatList}

          contentContainerStyle={styles.listContent}
        />

      </View>


      {/* ==================================================
          BOTTOM ACTION AREA
      ================================================== */}

      <View
        style={[
          styles.bottomArea,
          {
            paddingBottom:
              Math.max(insets.bottom, 10),
          },
        ]}>

        {/* Pagination */}

        <Pagination
          count={onboardingData.length}
          activeIndex={activeIndex}
        />


        {/* Main CTA */}

        <View style={styles.buttonWrapper}>

          <BottomButtons
            isLastSlide={isLastSlide}
            onPress={handleNext}
          />

        </View>


        {/* Trust / supporting text */}

        <Text style={styles.bottomText}>
          Fresh groceries. Easy ordering. Fast delivery.
        </Text>

      </View>

    </SafeAreaView>
  );
};


export default OnboardingScreen;


const styles = StyleSheet.create({

  /*
   * ========================================================
   * SCREEN
   * ========================================================
   */

  container: {
    flex: 1,

    backgroundColor: Colors.onboardingBg,
  },


  /*
   * ========================================================
   * TOP BAR
   * ========================================================
   */

  topBar: {
    minHeight: 50,

    width: '100%',

    paddingHorizontal: Spacing.xxl,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',
  },

  brandContainer: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  brandIcon: {
    width: 8,

    height: 8,

    borderRadius: 4,

    backgroundColor: Colors.primary,

    marginRight: 7,
  },

  brandText: {
    ...Typography.bodyBold,

    fontSize: 13,

    color: Colors.primaryDark,

    letterSpacing: 0.05,
  },

  skipButton: {
    height: 34,

    paddingHorizontal: 13,

    borderRadius: Radius.pill,

    backgroundColor: 'rgba(255,255,255,0.78)',

    borderWidth: 1,

    borderColor: 'rgba(46,125,50,0.08)',

    flexDirection: 'row',

    alignItems: 'center',

    gap: 3,
  },

  skipText: {
    ...Typography.bodySmall,

    fontSize: 12,

    fontWeight: '600',

    color: Colors.textSecondary,
  },


  /*
   * ========================================================
   * CONTENT
   * ========================================================
   */

  content: {
    flex: 1,

    justifyContent: 'center',
  },

  flatList: {
    flexGrow: 0,

    height: IMAGE_SIZE + 126,
  },

  listContent: {
    alignItems: 'center',
  },


  /*
   * ========================================================
   * BOTTOM
   * ========================================================
   */

  bottomArea: {
    width: '100%',

    paddingHorizontal: Spacing.xxl,

    alignItems: 'center',
  },

  buttonWrapper: {
    width: '100%',

    marginTop: 17,
  },

  bottomText: {
    ...Typography.caption,

    fontSize: 10,

    color: Colors.textLight,

    textAlign: 'center',

    marginTop: 11,

    letterSpacing: 0.15,
  },

});