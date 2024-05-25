// src/components/UsuariosConectados.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, ListGroup } from 'react-bootstrap';

const UsuariosConectados = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('');
    const [conectados, setConectados] = useState([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get('http://localhost:8000/informe_estadistico/');
                setUsuarios(response.data);
            } catch (error) {
                console.error('Error fetching usuarios:', error);
            }
        };

        fetchUsuarios();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8000/usuarios_conectados/${usuarioSeleccionado}/`);
            setConectados(response.data);
        } catch (error) {
            console.error('Error fetching connected usuarios:', error);
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="usuarioSeleccionado">
                    <Form.Label>Seleccione un Usuario</Form.Label>
                    <Form.Control
                        as="select"
                        value={usuarioSeleccionado}
                        onChange={(e) => setUsuarioSeleccionado(e.target.value)}
                        required
                    >
                        <option value="">Seleccione un usuario</option>
                        {usuarios.map((usuario) => (
                            <option key={usuario.usuario_id} value={usuario.usuario_id}>
                                {usuario.nombre}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-2">
                    Ver Usuarios Conectados
                </Button>
            </Form>
            <ListGroup className="mt-4">
                {conectados.map((usuario) => (
                    <ListGroup.Item key={usuario.id}>{usuario.nombre}</ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );
};

export default UsuariosConectados;
