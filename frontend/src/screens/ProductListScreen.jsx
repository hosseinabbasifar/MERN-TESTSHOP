import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import Loading from "../components/Loading";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../slices/productApiSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const ProductListScreen = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const [deleteProduct, { isLoading: Loadingdelete }] =
    useDeleteProductMutation();

  const navigate = useNavigate();
  const createProductHandler = () => {
    navigate("/admin/product/create");
  };
  const DeleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteProduct(id).unwrap();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createProductHandler}>
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>
      {Loadingdelete && <Loading />}
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error.data.message}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <NavLink to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </NavLink>
                    <Button variant="danger" className="btn-sm">
                      <FaTrash
                        style={{ color: "white" }}
                        onClick={() => DeleteHandler(product._id)}
                      />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
