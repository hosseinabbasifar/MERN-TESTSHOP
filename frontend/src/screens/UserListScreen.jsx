import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaTrash, FaEdit, FaCheck, FaTimes, FaPlus } from 'react-icons/fa';
import Message from '../components/Message';
import Loading from '../components/Loading';
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from '../slices/userApiSlice';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import Paginate from '../components/Paginate';

const UserListScreen = () => {
  const { PageNumber } = useParams();
  const { data, isLoading, isFetching, error, refetch } = useGetUsersQuery({
    PageNumber,
  });
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const navigate = useNavigate();

  const createUserHandler = () => {
    navigate('/admin/users/create');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id).unwrap();
        refetch();
        toast.success('User deleted successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Users</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createUserHandler}>
            <FaPlus /> Create User
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loading />}
      {isLoading || isFetching ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.users?.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <FaCheck style={{ color: 'green' }} />
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    <NavLink to={`/admin/users/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </NavLink>
                    <Button
                      variant="outline-danger"
                      className="btn-sm"
                      onClick={() => handleDelete(user._id)}
                    >
                      <FaTrash style={{ color: 'red' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            pages={data.pages}
            page={data.page}
            isAdmin={true}
            pageType="users"
          />
        </>
      )}
    </>
  );
};

export default UserListScreen;
