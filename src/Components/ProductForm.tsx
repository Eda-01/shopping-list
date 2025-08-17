import { useState } from "react";
import type { FormEvent } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { nanoid } from "nanoid";
import { shops } from "../Data/shops";
import { categories } from "../Data/categories";
import type { Product } from "../App";

interface ProductFormProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function ProductForm({ products, setProducts }: ProductFormProps) {
  const [name, setName] = useState("");
  const [shop, setShop] = useState<number>(shops[0].id);
  const [category, setCategory] = useState<number>(categories[0].id);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Lütfen ürün adını girin!");
      return;
    }

    const newProduct: Product = {
      id: nanoid(),
      name,
      shop,
      category,
      isBought: false,
    };

    setProducts([...products, newProduct]);

    
    setName("");
    setShop(shops[0].id);
    setCategory(categories[0].id);
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Row className="g-2">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Ürün adı..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Col>

        <Col md={3}>
          <Form.Select value={shop} onChange={(e) => setShop(Number(e.target.value))}>
            {shops.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col md={3}>
          <Form.Select
            value={category}
            onChange={(e) => setCategory(Number(e.target.value))}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col md={2}>
          <Button type="submit" variant="primary" className="w-100">
            Ekle
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
