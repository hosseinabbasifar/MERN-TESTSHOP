import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useCreateUserMutation,
} from '../slices/userApiSlice';

import FormContainer from '../components/FormContainer';
import Loading from '../components/Loading';
import Message from '../components/Message';

const UsersFormScreen = () => {
  const { id: userId } = useParams();
  const isEditMode = Boolean(userId);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  const {
    data: user,
    isLoading,
    error,
  } = useGetUserDetailsQuery(userId, {
    skip: !isEditMode,
  });

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();
  const [createUser, { isLoading: loadingCreate }] = useCreateUserMutation();

  useEffect(() => {
    if (isEditMode && user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setIsAdmin(!!user.isAdmin);
    }
  }, [isEditMode, user]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        await updateUser({ _id: userId, name, email, isAdmin }).unwrap();
        toast.success('User updated successfully');
      } else {
        await createUser({ name, email, password, isAdmin }).unwrap();
        toast.success('User created successfully');
      }
      navigate('/admin/users');
    } catch (err) {
      toast.error(err?.data?.message || err.error || 'Something went wrong');
    }
  };

  return (
    <>
      <Link to="/admin/users" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>{isEditMode ? 'Edit User' : 'Create User'}</h1>
        {(loadingUpdate || loadingCreate) && <Loading />}
        {isLoading ? (
          <Loading />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error || 'An error occurred'}
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            {!isEditMode && (
              <Form.Group className="my-2" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
            )}

            <Form.Group className="my-2" controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              {isEditMode ? 'Update' : 'Create'}
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UsersFormScreen;
