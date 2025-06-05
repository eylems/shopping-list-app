import { useState } from 'react';
import './App.css';
import { ProductParams } from './types/types';
import { Button, Form, FormCheck } from 'react-bootstrap';
import { categories, shops } from './data/data';
import { nanoid } from 'nanoid';
import TableComponent from './assets/components/TableComponent';

function App() {
  const [products, setProducts] = useState<ProductParams[]>([]);
  const [productName, setProductName] = useState<string>('');
  const [productShop, setProductShop] = useState<string>('');
  const [productCategory, setProductCategory] = useState<string>('');
  const [filteredName, setFilteredName] = useState<string>('');
  const [filteredShop, setFilteredShop] = useState<string>('');
  const [filteredCategory, setFilteredCategory] = useState<string>('');
  const [filteredStatus, setFilteredStatus] = useState<'all' | 'bought' | 'not-bought'>('all');

  // ✅ Ürün ekleme
  const handleAddProduct = () => {
    if (!productName || !productShop || !productCategory) {
      alert("Lütfen bütün alanları doldurunuz.");
      return;
    }

    const newProduct: ProductParams = {
      id: nanoid(),
      name: productName,
      shop: productShop,
      category: productCategory,
      isBought: false, // Bu önemli!
    };

    setProducts([...products, newProduct]);
    setProductName('');
    setProductShop('');
    setProductCategory('');
  };

  // ✅ Ürünleri filtrele
  const filteredProducts = products.filter((product) => {
    const nameMatch = product.name.toLowerCase().includes(filteredName.toLowerCase());
    const shopMatch = filteredShop === '' || product.shop === filteredShop;
    const categoryMatch = filteredCategory === '' || product.category === filteredCategory;
    const statusMatch =
      filteredStatus === 'all' ||
      (filteredStatus === 'bought' && product.isBought) ||
      (filteredStatus === 'not-bought' && !product.isBought);

    return nameMatch && shopMatch && categoryMatch && statusMatch;
  });

  // ✅ Satın alındı olarak işaretleme
  const handleToggleBought = (productId: string) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, isBought: !product.isBought }
          : product
      )
    );
  };

  // ✅ Ürünü silme
  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  return (
    <div className="container d-flex justify-content-center gap-5 mt-4">
      {/* Ürün Ekleme Formu */}
      <Form style={{ width: '300px' }}>
        <h4>Ürün Ekle</h4>
        <Form.Group controlId="productName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            type="text"
            placeholder="Enter a product name"
          />
        </Form.Group>

        <Form.Group controlId="productShop">
          <Form.Label>Shop</Form.Label>
          <Form.Control
            as="select"
            value={productShop}
            onChange={(e) => setProductShop(e.target.value)}
          >
            <option value="">Select a shop</option>
            {shops.map((shop) => (
              <option key={shop.id} value={shop.name}>{shop.name}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="productCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="secondary" onClick={handleAddProduct} className="mt-2">
          Add Product
        </Button>
      </Form>

      {/* Filtre Formu */}
      <Form style={{ width: '300px' }}>
        <h4>Filtrele</h4>
        <Form.Group controlId="filteredName">
          <Form.Label>Filter by Name</Form.Label>
          <Form.Control
            value={filteredName}
            onChange={(e) => setFilteredName(e.target.value)}
            type="text"
            placeholder="Enter a product name"
          />
        </Form.Group>

        <Form.Group controlId="filteredShop">
          <Form.Label>Filter by Shop</Form.Label>
          <Form.Control
            as="select"
            value={filteredShop}
            onChange={(e) => setFilteredShop(e.target.value)}
          >
            <option value="">All shops</option>
            {shops.map((shop) => (
              <option key={shop.id} value={shop.name}>{shop.name}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="filteredCategory">
          <Form.Label>Filter by Category</Form.Label>
          <Form.Control
            as="select"
            value={filteredCategory}
            onChange={(e) => setFilteredCategory(e.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <FormCheck
            type="radio"
            label="All"
            name="statusFilter"
            value="all"
            checked={filteredStatus === "all"}
            onChange={() => setFilteredStatus("all")}
          />
          <FormCheck
            type="radio"
            label="Bought"
            name="statusFilter"
            value="bought"
            checked={filteredStatus === "bought"}
            onChange={() => setFilteredStatus("bought")}
          />
          <FormCheck
            type="radio"
            label="Not Bought"
            name="statusFilter"
            value="not-bought"
            checked={filteredStatus === "not-bought"}
            onChange={() => setFilteredStatus("not-bought")}
          />
        </Form.Group>
      </Form>

      {/* Tablo Bileşeni */}
      <TableComponent
        products={filteredProducts}
        onDeleteProduct={handleDeleteProduct}
        onToggleBought={handleToggleBought}
      />
    </div>
  );
}

export default App;
