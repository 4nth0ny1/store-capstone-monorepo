import { useEffect } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { fetchProducts } from "../redux/reducers/actions/productActions.ts";

type Product = {
  id: number;
  name: string;
  price: number;
};

type Props = {
  loading: boolean;
  error: string | null;
  products: Product[];
  fetchProducts: () => void;
};

function ProductPage({ loading, error, products, fetchProducts }: Props) {
  useEffect(() => {
    fetchProducts(); // same as componentDidMount
  }, [fetchProducts]);

  if (loading) return <div>Loading data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h2>Product Page</h2>

      <table className="table-auto">
        <thead>
          <tr>
            <th>Id</th>
            <th>Product Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <Link to={`/products/${item.id}`}>{item.name}</Link>
              </td>
              <td>{item.price}</td>
              <td>
                <button className="bg-[var(--primary)] text-white px-4 py-2 rounded-2xl">
                  Add to Inventory{" "}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

const mapStateToProps = (state: any) => ({
  loading: state.products.loading,
  error: state.products.error,
  products: state.products.data,
});

const mapDispatchToProps = {
  fetchProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
