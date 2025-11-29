import { Link } from "react-router";

export default function Navbar() {
  return (
    <div className="flex justify-between">
      <Link className="" to="/">
        Logo
      </Link>
      <div className="flex gap-4 font-body">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/stores">Stores</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <Link className="" to="/">
        <button className="bg-[var(--primary)] text-white px-4 py-2 rounded">
          Sign In
        </button>
      </Link>
    </div>
  );
}
