// redux/reducers/productReducer.ts

export type Product = {
  id: number;
  name: string;
  price: number;
};

export type ProductState = {
  loading: boolean;
  error: string | null;
  data: Product[];
  selected: Product | null;
};

export type ProductAction =
  | { type: "FETCH_PRODUCTS_REQUEST" }
  | { type: "FETCH_PRODUCTS_SUCCESS"; payload: Product[] }
  | { type: "FETCH_PRODUCTS_FAILURE"; payload: string }
  | { type: "FETCH_PRODUCT_BY_ID_REQUEST" }
  | { type: "FETCH_PRODUCT_BY_ID_SUCCESS"; payload: Product }
  | { type: "FETCH_PRODUCT_BY_ID_FAILURE"; payload: string };

const initialState: ProductState = {
  loading: false,
  error: null,
  data: [],
  selected: null,
};

const productReducer = (
  state: ProductState = initialState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case "FETCH_PRODUCTS_REQUEST":
      return { ...state, loading: true, error: null };

    case "FETCH_PRODUCTS_SUCCESS":
      return { ...state, loading: false, data: action.payload };

    case "FETCH_PRODUCTS_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "FETCH_PRODUCT_BY_ID_REQUEST":
      return { ...state, loading: true, error: null };

    case "FETCH_PRODUCT_BY_ID_SUCCESS":
      return { ...state, loading: false, selected: action.payload };

    case "FETCH_PRODUCT_BY_ID_FAILURE":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default productReducer;
