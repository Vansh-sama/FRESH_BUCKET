// data/mockProducts.js
// Placeholder data so the UI is fully demoable before the backend exists.
// Once MongoDB/Express is up, this becomes a GET /api/products call, and
// `icon` gets replaced by a real `imageUrl` (Cloudinary) field.

export const mockProducts = [
  {
    id: 'p1',
    name: 'Fresh Strawberries',
    unit: '250g pack',
    price: 3.99,
    originalPrice: 4.99,
    icon: 'nutrition-outline',
    color: '#FCE4EC',
    rating: 4.6,
  },
  {
    id: 'p2',
    name: 'Organic Avocado',
    unit: '2 pieces',
    price: 2.49,
    originalPrice: null,
    icon: 'leaf-outline',
    color: '#E8F5E9',
    rating: 4.8,
  },
  {
    id: 'p3',
    name: 'Whole Milk',
    unit: '1 litre',
    price: 1.79,
    originalPrice: null,
    icon: 'water-outline',
    color: '#E3F2FD',
    rating: 4.5,
  },
  {
    id: 'p4',
    name: 'Sourdough Bread',
    unit: '1 loaf',
    price: 3.49,
    originalPrice: 3.99,
    icon: 'pizza-outline',
    color: '#FFF3E0',
    rating: 4.7,
  },
  {
    id: 'p5',
    name: 'Free-range Eggs',
    unit: '12 pack',
    price: 4.29,
    originalPrice: null,
    icon: 'egg-outline',
    color: '#FFFDE7',
    rating: 4.9,
  },
  {
    id: 'p6',
    name: 'Cherry Tomatoes',
    unit: '400g pack',
    price: 2.19,
    originalPrice: 2.79,
    icon: 'nutrition-outline',
    color: '#FFEBEE',
    rating: 4.4,
  },
];
