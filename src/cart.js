function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, quantity) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new RangeError('Некорректное количество');
  }

  const existingItem = cart.find(
    (item) => item.id === product.id
  );

  if (existingItem) {
    return changeQuantity(
      cart,
      product.id,
      existingItem.quantity + quantity
    );
  }

  if (quantity > product.stock) {
    throw new RangeError('Недостаточно товара');
  }

  return [...cart, { ...product, quantity }];
}

function changeQuantity(cart, productID, quantity) {
  quantity = Number(quantity);

  if (quantity <= 0) {
    throw new RangeError('Количество должно быть больше нуля');
  }

  return cart.map((item) => {
    if (item.id === productID) {
      if (quantity > item.stock) {
        throw new RangeError('Недостаточно товара');
      }

      return { ...item, quantity };
    }

    return item;
  });
}

function removeFromCart(cart, productID) {
  return cart.filter((item) => item.id !== productID);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function calculateOrderTotal(cart, promoCode) {
  let delivery = 0;
  const subtotal = calculateCartSubtotal(cart);
  if (subtotal < 50000) {
    delivery = 30000;
  }
  const discount =
    promoCode === 'SAVE10' && subtotal >= 20000
      ? subtotal * 0.1
      : 0;
  const total = subtotal - discount + delivery;

  return {
    subtotal,
    discount,
    delivery,
    total
  };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
