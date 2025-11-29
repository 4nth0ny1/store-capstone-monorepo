// redux/reducers/storeReducer.ts
export type Store = {
  id: number;
  storeNumber: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  manager: string;
};

type StoreState = {
  loading: boolean;
  error: string | null;
  list: Store[]; // call it "list" to avoid stores.stores confusion
};

type StoreAction =
  | { type: "FETCH_STORES_REQUEST" }
  | { type: "FETCH_STORES_SUCCESS"; stores: Store[] }
  | { type: "FETCH_STORES_FAILURE"; error: string };

const initialState: StoreState = {
  loading: false,
  error: null,
  list: [], // IMPORTANT: no placeholder object here
};

export default function storeReducer(
  state: StoreState = initialState,
  action: StoreAction
): StoreState {
  switch (action.type) {
    case "FETCH_STORES_REQUEST":
      return { ...state, loading: true, error: null };

    case "FETCH_STORES_SUCCESS":
      return {
        ...state,
        loading: false,
        list: action.stores, // replace with fresh data
      };

    case "FETCH_STORES_FAILURE":
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
}
