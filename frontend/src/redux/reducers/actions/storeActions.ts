export const fetchStores = () => {
  return async (dispatch: any) => {
    dispatch({ type: "FETCH_STORES_REQUEST" });

    try {
      const res = await fetch("http://localhost:8080/api/stores");
      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      const data = await res.json();

      dispatch({
        type: "FETCH_STORES_SUCCESS",
        stores: data,
      });
    } catch (err: any) {
      dispatch({
        type: "FETCH_STORES_FAILURE",
        error: err.message ?? "Unknown error",
      });
    }
  };
};
