// redux/reducers/actions/productActions.ts

import type { Product } from "../productReducer";

export const fetchProducts = () => {
  return async (dispatch: (action: any) => void) => {
    dispatch({ type: "FETCH_PRODUCTS_REQUEST" });

    try {
      const response = await fetch("http://localhost:8080/api/products");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const products: Product[] = await response.json();

      dispatch({
        type: "FETCH_PRODUCTS_SUCCESS",
        payload: products,
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Unknown error fetching products";

      dispatch({
        type: "FETCH_PRODUCTS_FAILURE",
        payload: message,
      });
    }
  };
};

export const fetchProductById = (id: string | number) => {
  return async (dispatch: (action: any) => void) => {
    dispatch({ type: "FETCH_PRODUCT_BY_ID_REQUEST" });

    try {
      const response = await fetch(`http://localhost:8080/api/products/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const product: Product = await response.json();

      dispatch({
        type: "FETCH_PRODUCT_BY_ID_SUCCESS",
        payload: product,
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Unknown error fetching product";

      dispatch({
        type: "FETCH_PRODUCT_BY_ID_FAILURE",
        payload: message,
      });
    }
  };
};
