export function reducer(state, { type, payload }) {
  switch (type) {
    case "SET_GOODS":
      return {
        ...state,
        goods: payload || [],
        loading: false,
      };
    case "ADD_TO_BASKET": {
      const itemIndex = state.order.findIndex(
        (orderItem) => orderItem.offerId === payload.offerId
      );
      let newOrder = null;
      if (itemIndex < 0) {
        const newItem = {
          ...payload,
          quantity: 1,
        };
        newOrder = [...state.order, newItem];
      } else {
        newOrder = state.order.map((orderItem, index) => {
          if (index === itemIndex) {
            return {
              ...orderItem,
              quantity: orderItem.quantity + 1,
            };
          } else {
            return orderItem;
          }
        });
      }

      return {
        ...state,
        order: newOrder,
        alertName: payload.displayName,
      };
    }
    case "REMOVE_FROM_BASKET":
      return {
        ...state,
        order: state.order.filter((el) => el.offerId !== payload.id),
      };
    case "CLOSE_ALERT":
      return {
        ...state,
        alertName: "",
      };
    case "INCREMENT_QUANTITY":
      return {
        ...state,
        order: state.order.map((el) => {
          if (el.offerId === payload.id) {
            const newQuantity = el.quantity + 1;
            return {
              ...el,
              quantity: newQuantity,
            };
          } else {
            return el;
          }
        }),
      };
    case "DECREMENT_QUANTITY":
      return {
        ...state,
        order: state.order.map((el) => {
          if (el.offerId === payload.id && el.quantity > 1) {
            const newQuantity = el.quantity - 1;
            return {
              ...el,
              quantity: newQuantity,
            };
          } else {
            return el;
          }
        }),
      };
    case "TOGGLE_BASKET":
      return {
        ...state,
        isBasketShow: !state.isBasketShow,
      };
    default:
      return state;
  }
}
