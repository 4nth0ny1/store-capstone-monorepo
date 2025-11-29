import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventoryByStore } from "../redux/reducers/actions/inventoryActions";
import type { RootState } from "../redux/reducers/rootReducer";

export default function InventoryPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const inventoryState = useSelector((state: RootState) => state.inventory);

  useEffect(() => {
    console.log("Route param id:", id);

    if (!id) {
      // no id in URL at all
      return;
    }

    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
      // e.g. "undefined" -> NaN, do not call API
      console.warn("Invalid store id in route:", id);
      return;
    }

    dispatch(fetchInventoryByStore(numericId) as any);
  }, [id, dispatch]);

  if (inventoryState.loading) {
    return <div>Loading inventory...</div>;
  }

  if (inventoryState.error) {
    return <div>Error: {inventoryState.error}</div>;
  }

  return (
    <div>
      <h1>Inventory for Store {id}</h1>
      <pre>{JSON.stringify(inventoryState.data, null, 2)}</pre>
    </div>
  );
}
