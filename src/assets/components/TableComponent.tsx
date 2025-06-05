import styled from "styled-components";
import { ProductParams } from "../../types/types";
import { Container, Table, Button } from "react-bootstrap";

interface TableComponentProps {
  products: ProductParams[];
  onToggleBought: (productId: string) => void;
  onDeleteProduct: (productId: string) => void;
}

const StyledTableData = styled.td<{ isBought?: boolean }>`
  text-decoration: ${(props) => (props.isBought ? "line-through" : "none")};
`;

const TableComponent: React.FC<TableComponentProps> = ({
  products,
  onToggleBought,
  onDeleteProduct,
}) => {
  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Shop</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <StyledTableData isBought={product.isBought}>
                {product.name}
              </StyledTableData>
              <StyledTableData isBought={product.isBought}>
                {product.shop}
              </StyledTableData>
              <StyledTableData isBought={product.isBought}>
                {product.category}
              </StyledTableData>
              <td>
                <Button
                  variant={product.isBought ? "success" : "outline-success"}
                  size="sm"
                  onClick={() => onToggleBought(product.id)}
                >
                  {product.isBought ? "Bought" : "Mark as Bought"}
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDeleteProduct(product.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TableComponent;
