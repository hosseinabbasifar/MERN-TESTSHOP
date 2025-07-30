import { Table, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import Message from '../components/Message';
import Loading from '../components/Loading';
import { useGetOrdersQuery } from '../slices/orderApiSlice';
import { NavLink, useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';

const OrderListScreen = () => {
  const { PageNumber } = useParams();
  const { data, isLoading, error, isFetching } = useGetOrdersQuery({
    PageNumber,
  });

  return (
    <>
      <h1>Orders</h1>
      {isLoading || isFetching ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <NavLink to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Paginate
        pages={data.pages}
        page={data.page}
        isAdmin={true}
        pageType="orders"
      />
    </>
  );
};

export default OrderListScreen;
