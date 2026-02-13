export const formatTitle = (title: string) => {
  return title
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'usd',
  }).format(price);
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const formatDateTime = (datetime: string) => {
  return new Date(datetime).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatDiscount = (discount: number, total: number) => {
  const newTotal = total - (total * discount) / 100;
  return formatPrice(newTotal);
};
