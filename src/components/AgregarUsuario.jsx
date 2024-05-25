// En AgregarUsuario.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const AgregarUsuario = ({ onRefresh }) => {
    const [nombre, setNombre] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8000/agregar_usuario/', { nombre });
            alert('Usuario agregado con éxito');
            // Llamar a la función de actualización
            onRefresh();
        } catch (error) {
            console.error('Error al agregar usuario:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nombre">
                <Form.Label>Nombre del Usuario</Form.Label>
                <Form.Control
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-2">
                Agregar Usuario
            </Button>
        </Form>
    );
};

export default AgregarUsuario;
