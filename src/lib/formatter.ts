export const formatTitle = (title: string) => {
  return `${title.slice(0, 1).toUpperCase()}${title.slice(1)}`;
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'usd',
  }).format(price);
};

export const formatDate = (date: string) => {
  return new Date().toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};
