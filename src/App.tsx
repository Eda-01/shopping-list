import { useState, useEffect, useMemo } from "react";
import { Container } from "react-bootstrap";
import ProductForm from "./Components/ProductForm";
import ProductTable from "./Components/ProductTable";
import FilterBox from "./Components/FilterBox";
import JSConfetti from "js-confetti";


import Fuse from "fuse.js";

export interface Product {
  id: string;
  name: string;
  shop: number;
  category: number;
  isBought: boolean;
}

function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('shopping-list-products');
    return saved ? JSON.parse(saved) : [];
  });
  
  const jsConfetti = new JSConfetti();

  // --- Filtre state’leri ---
  const [filteredShopId, setFilteredShopId] = useState<number | "all">("all");
  const [filteredCategoryId, setFilteredCategoryId] = useState<number | "all">(
    "all"
  );
  const [filteredStatus, setFilteredStatus] = useState<
    "all" | "bought" | "notBought"
  >("all");
  const [filteredName, setFilteredName] = useState("");

  // --- LocalStorage'a kaydet ---
  useEffect(() => {
    localStorage.setItem('shopping-list-products', JSON.stringify(products));
  }, [products]);

  // --- Alışveriş Tamamlandı kontrolü ---
  useEffect(() => {
    if (products.length > 0 && products.every((p) => p.isBought)) {
      alert("🎉 Alışveriş Tamamlandı!");
      jsConfetti.addConfetti();
    }
  }, [products]);

  // --- Fuzzy search için Fuse ---
  const fuse = useMemo(
    () =>
      new Fuse(products, {
        keys: ["name"],
        threshold: 0.3,
      }),
    [products]
  );

  // --- Filtrelenmiş ürünler ---
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // market filtresi
    if (filteredShopId !== "all") {
      result = result.filter((p) => p.shop === filteredShopId);
    }

    // kategori filtresi
    if (filteredCategoryId !== "all") {
      result = result.filter((p) => p.category === filteredCategoryId);
    }

    // status filtresi
    if (filteredStatus === "bought") {
      result = result.filter((p) => p.isBought);
    } else if (filteredStatus === "notBought") {
      result = result.filter((p) => !p.isBought);
    }

    // ürün adı fuzzy search
    if (filteredName.trim()) {
      result = fuse.search(filteredName).map((res) => res.item);
    }

    return result;
  }, [products, filteredShopId, filteredCategoryId, filteredStatus, filteredName, fuse]);

  return (
    <Container className="my-4">
      <h1 className="mb-4">🛒 Alışveriş Listesi</h1>

      {/* Ürün ekleme */}
      <ProductForm products={products} setProducts={setProducts} />

      {/* Filtre kutusu */}
      <FilterBox
        filteredShopId={filteredShopId}
        setFilteredShopId={setFilteredShopId}
        filteredCategoryId={filteredCategoryId}
        setFilteredCategoryId={setFilteredCategoryId}
        filteredStatus={filteredStatus}
        setFilteredStatus={setFilteredStatus}
        filteredName={filteredName}
        setFilteredName={setFilteredName}
      />

      {/* Tablo */}
      <ProductTable products={filteredProducts} setProducts={setProducts} />
    </Container>
  );
}

export default App;
