import { Table } from "react-bootstrap";
import type { Product } from "../App";
import { shops } from "../Data/shops";
import { categories } from "../Data/categories";
import IconButton from "./IconButton";

interface ProductTableProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function ProductTable({ products, setProducts }: ProductTableProps) {
  const toggleBought = (id: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, isBought: !p.isBought } : p
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const getShopName = (id: number) => shops.find((s) => s.id === id)?.name || "";
  const getCategoryName = (id: number) =>
    categories.find((c) => c.id === id)?.name || "";

  return (
    <Table bordered hover responsive>
      <thead>
        <tr>
          <th>Ürün Adı</th>
          <th>Market</th>
          <th>Kategori</th>
          <th>Sil</th>
        </tr>
      </thead>
      <tbody>
        {products.length === 0 ? (
          <tr>
            <td colSpan={4} className="text-center text-muted py-4">
              📝 Henüz ürün eklenmemiş. Yukarıdan ürün ekleyerek başlayın!
            </td>
          </tr>
        ) : (
          products.map((product) => (
            <tr
              key={product.id}
              onClick={() => toggleBought(product.id)}
              style={{
                textDecoration: product.isBought ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              <td>{product.name}</td>
              <td>{getShopName(product.shop)}</td>
              <td>{getCategoryName(product.category)}</td>
              <td onClick={(e) => e.stopPropagation()}>
                <IconButton onClick={() => deleteProduct(product.id)} />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}
