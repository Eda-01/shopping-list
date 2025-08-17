import { Row, Col, Form } from "react-bootstrap";
import { shops } from "../Data/shops";
import { categories } from "../Data/categories";

interface FilterBoxProps {
  filteredShopId: number | "all";
  setFilteredShopId: (id: number | "all") => void;
  filteredCategoryId: number | "all";
  setFilteredCategoryId: (id: number | "all") => void;
  filteredStatus: "all" | "bought" | "notBought";
  setFilteredStatus: (s: "all" | "bought" | "notBought") => void;
  filteredName: string;
  setFilteredName: (n: string) => void;
}

export default function FilterBox({
  filteredShopId,
  setFilteredShopId,
  filteredCategoryId,
  setFilteredCategoryId,
  filteredStatus,
  setFilteredStatus,
  filteredName,
  setFilteredName,
}: FilterBoxProps) {
  return (
    <Row className="mb-3 g-3">
      <Col md={3}>
        <Form.Select
          value={filteredShopId}
          onChange={(e) =>
            setFilteredShopId(
              e.target.value === "all" ? "all" : Number(e.target.value)
            )
          }
        >
          <option value="all">Tüm Marketler</option>
          {shops.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </Form.Select>
      </Col>

   
      <Col md={3}>
        <Form.Select
          value={filteredCategoryId}
          onChange={(e) =>
            setFilteredCategoryId(
              e.target.value === "all" ? "all" : Number(e.target.value)
            )
          }
        >
          <option value="all">Tüm Kategoriler</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Form.Select>
      </Col>

     
      <Col md={3}>
        <div>
          <Form.Check
            inline
            type="radio"
            label="Tümü"
            checked={filteredStatus === "all"}
            onChange={() => setFilteredStatus("all")}
          />
          <Form.Check
            inline
            type="radio"
            label="Alınanlar"
            checked={filteredStatus === "bought"}
            onChange={() => setFilteredStatus("bought")}
          />
          <Form.Check
            inline
            type="radio"
            label="Alınmayanlar"
            checked={filteredStatus === "notBought"}
            onChange={() => setFilteredStatus("notBought")}
          />
        </div>
      </Col>

     
      <Col md={3}>
        <Form.Control
          type="text"
          placeholder="Ürün adı ara..."
          value={filteredName}
          onChange={(e) => setFilteredName(e.target.value)}
        />
      </Col>
    </Row>
  );
}
