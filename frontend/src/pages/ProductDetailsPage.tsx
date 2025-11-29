import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { fetchProductById } from "../redux/reducers/actions/productActions";

type ProductDetailsPageProps = {
  product: any;
  loading: boolean;
  error: string | null;
  fetchProductById: (id: number) => void; // guess; adjust to your real signature
};

type RouteParams = {
  id: string;
};

function ProductDetailsPage({
  product,
  loading,
  error,
  fetchProductById,
}: ProductDetailsPageProps) {
  const { id } = useParams<RouteParams>();

  useEffect(() => {
    if (id) {
      const numericId = Number(id); // convert string -> number
      fetchProductById(numericId);
    }
  }, [id, fetchProductById]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found</div>;

  return (
    <div>
      <h2>Product Details</h2>

      <p>
        <strong>ID:</strong> {product.id}
      </p>
      <p>
        <strong>Name:</strong> {product.name}
      </p>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  product: state.products.selected,
  loading: state.products.loading,
  error: state.products.error,
});

const mapDispatchToProps = {
  fetchProductById,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsPage);
