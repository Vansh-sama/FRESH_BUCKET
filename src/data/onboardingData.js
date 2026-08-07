// data/onboardingData.js
// Content for the 3 onboarding slides. Kept separate from the screen so
// copy changes never require touching component/layout code.
//
// Once you've added grocery.png / delivery.png / tracking.png to
// src/assets/images/onboarding/, uncomment the matching `image:` line
// and delete the `icon:` fallback on that slide.

export const onboardingData = [
  {
    id: '1',
    title: 'Fresh Groceries\nDelivered Fast',
    description:
      'Choose from thousands of fresh fruits, vegetables and daily essentials.',
    icon: 'basket-outline',
    // image: require('../assets/images/onboarding/grocery.png'),
  },
  {
    id: '2',
    title: 'Lightning Fast\nDelivery',
    description: 'Your groceries arrive at your doorstep in just a few minutes.',
    icon: 'bicycle-outline',
    // image: require('../assets/images/onboarding/delivery.png'),
  },
  {
    id: '3',
    title: 'Track Every\nOrder',
    description:
      'Follow your order live and enjoy a seamless shopping experience.',
    icon: 'location-outline',
    // image: require('../assets/images/onboarding/tracking.png'),
  },
];
