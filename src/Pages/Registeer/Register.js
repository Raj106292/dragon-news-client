import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

const Register = () => {

    const { createUser, updateUser, verifyEmail } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [isAccepted, setIsAccepted] = useState(false);

    const handleRegisterForm = (event) => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const photoURL = form.photoURL.value;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email, password)
            .then(result => {
                const user = result.user;
                updateUser(name, photoURL)
                    .then(() => {
                        console.log('user updated');
                    })
                    .catch(error => {
                        console.error(error);
                    })
                console.log(user);
                verifyEmail()
                    .then(() => {
                        console.log('verification mail sent');
                        toast.success('verification mail sent');
                    })
                    .catch(error => {
                        console.error(error);
                    })
                form.reset();
                setError('');
                setIsAccepted(false);
            })
            .catch(error => {
                const errorMessage = error.message;
                setError(errorMessage);
            })
    }

    const handleAccepted = (event) => {
        setIsAccepted(event.target.checked);
    }

    return (
        <Form onSubmit={handleRegisterForm}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control name='name' type="text" placeholder="Enter your name" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhotoURL">
                <Form.Label>Photo URL</Form.Label>
                <Form.Control name='photoURL' type="text" placeholder="photo url" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name='email' type="email" placeholder="Enter email" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name='password' type="password" placeholder="Password" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                    onClick={handleAccepted}
                    type="checkbox"
                    label={<>Accept <Link to='/terms'>Terms and Conditions</Link></>} />
            </Form.Group>
            <Form.Group>
                <Form.Text className="text-danger">
                    {error}
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!isAccepted}>
                Register
            </Button>
        </Form>
    );
};

export default Register;