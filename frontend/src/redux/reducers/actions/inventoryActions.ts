export const fetchInventoryByStore = (storeId: number) => {
  return async (dispatch: any) => {
    dispatch({ type: "FETCH_INVENTORY_REQUEST" });

    try {
      const res = await fetch(
        `http://localhost:8080/api/inventory/store/${storeId}`
      );

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      const data = await res.json();

      dispatch({
        type: "FETCH_INVENTORY_SUCCESS",
        inventory: data,
      });
    } catch (error: any) {
      dispatch({
        type: "FETCH_INVENTORY_FAILURE",
        error: error.message,
      });
    }
  };
};
