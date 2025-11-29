type InventoryItem = {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
  };
  store: {
    id: number;
    name: string;
  };
};

type InventoryState = {
  loading: boolean;
  error: string | null;
  data: InventoryItem[];
};

type InventoryAction =
  | { type: "FETCH_INVENTORY_REQUEST" }
  | { type: "FETCH_INVENTORY_SUCCESS"; inventory: InventoryItem[] }
  | { type: "FETCH_INVENTORY_FAILURE"; error: string };

const initialState: InventoryState = {
  loading: false,
  error: null,
  data: [],
};

export default function inventoryReducer(
  state = initialState,
  action: InventoryAction
): InventoryState {
  switch (action.type) {
    case "FETCH_INVENTORY_REQUEST":
      return { ...state, loading: true, error: null };

    case "FETCH_INVENTORY_SUCCESS":
      return { ...state, loading: false, data: action.inventory };

    case "FETCH_INVENTORY_FAILURE":
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
}
