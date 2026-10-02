import api from './api';

const mapCategory = item => ({
  id: item.id || item._id,
  _id: item._id || item.id,
  label: item.label || item.name,
  name: item.name || item.label,
  description: item.description || '',
  image: item.image || null,
});

const mapProduct = item => ({
  ...item,
  id: item.id || item._id,
  _id: item._id || item.id,
  name: item.name || '',
  price: Number(item.price ?? item.sellingPrice ?? 0),
  sellingPrice: Number(item.sellingPrice ?? item.price ?? 0),
  rating: Number(item.rating ?? 0),
  reviewCount: Number(item.reviewCount ?? 0),
  categoryId: item.categoryId || item.category?._id || item.category,
  category: item.category?.name || item.category || null,
  image: item.image
    ? {uri: item.image}
    : null,
});

export const getCategoriesApi = async () => {
  const response = await api.get('/customer/categories');
  return (response.data?.data || []).map(mapCategory);
};

export const getProductsApi = async params => {
  const response = await api.get('/customer/products', {
    params,
  });

  const payload = response.data?.data || {};

  return {
    products: (payload.data || []).map(mapProduct),
    pagination: payload.pagination || null,
  };
};

export const getProductApi = async id => {
  const response = await api.get(`/customer/products/${id}`);
  return mapProduct(response.data?.data);
};

export const createOrderApi = async payload => {
  const response = await api.post(
    '/customer/orders',
    payload,
  );

  return response.data?.data;
};

export const getOrdersApi = async () => {
  const response = await api.get('/customer/orders');
  return response.data?.data || [];
};

export const getOrderApi = async id => {
  const response = await api.get(`/customer/orders/${id}`);
  return response.data?.data;
};
