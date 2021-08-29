import { createStore } from "vuex";

export default createStore({
  state: {
    cart: {
      items: [],
    },

    isAuthenticated: false,

    token: "",

    isLoading: false,
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem("cart")) {
        state.cart = JSON.parse(localStorage.getItem("cart"));
      } else {
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },

    addToCart(state, item) {
      console.log("clicked with product");
      const existingItem = state.cart.items.filter(
        (i) => i.product.id === item.product.id
      );
      if (existingItem.length) {
        existingItem[0].quantity =
          parseInt(existingItem[0].quantity) + parseInt(item.quantity);
      } else {
        state.cart.items.push(item);
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
  actions: {},
  modules: {},
});
