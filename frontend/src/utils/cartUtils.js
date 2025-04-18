export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state, item) => {


  // If item is provided, handle updates (e.g., adding or updating an item)
  if (item) {
    const existItem = state.cartItems.find((x) => x._id === item._id);

    if (existItem) {
      state.cartItems = state.cartItems.map((x) =>
        x._id === existItem._id ? item : x
      );
    } else {
      state.cartItems = [...state.cartItems, item];
    }
  }

  // Calculate the items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calculate the shipping price
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // Calculate the tax price
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

  // Calculate the total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  // Save the cart to localStorage
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
