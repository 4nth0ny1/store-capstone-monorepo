import { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { fetchStores } from "../redux/reducers/actions/storeActions";
import type { RootState } from "../redux/reducers/rootReducer";

type Store = {
  id?: number | null;
  storeNumber?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  manager?: string | null;
};

type Props = {
  loading: boolean;
  error: string | null;
  stores: Store[] | undefined;
  fetchStores: () => void;
};

function StoresPage({ loading, error, stores, fetchStores }: Props) {
  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  if (loading) return <div>Loading data ...</div>;
  if (error) return <div>Error: {error}</div>;

  const safeStores = Array.isArray(stores) ? stores : [];

  console.log("Stores from Redux:", safeStores);

  if (safeStores.length === 0) {
    return <div>No stores found.</div>;
  }

  return (
    <>
      <h2>Stores Page</h2>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="pr-4">Id</th>
            <th>Store Number</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {safeStores.map((store, index) => {
            // Log each row so we can see exactly what it looks like
            console.log("Row", index, "store =", store);

            // If a store somehow has no id, do NOT render an Inventory link for it
            if (!store || store.id == null) {
              console.warn("Store without id, skipping inventory link:", store);
              return (
                <tr key={`no-id-${index}`}>
                  <td>-</td>
                  <td>{store?.storeNumber ?? "(no storeNumber)"}</td>
                  <td>{store?.address ?? "(no address)"}</td>
                </tr>
              );
            }

            // Normal, valid store row
            return (
              <tr key={store.id}>
                <td>{store.id}</td>
                <td>
                  <Link to={`/inventory/store/${store.id}`}>
                    {store.storeNumber}
                  </Link>
                </td>
                <td>{store.address}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

const mapStateToProps = (state: RootState) => ({
  loading: state.store.loading,
  error: state.store.error,
  stores: state.store.list,
});

export default connect(mapStateToProps, { fetchStores })(StoresPage);
