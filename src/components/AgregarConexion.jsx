import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

const AgregarConexion = ({ onRefresh }) => {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioOrigen, setUsuarioOrigen] = useState('');
    const [usuarioDestino, setUsuarioDestino] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get('http://localhost:8000/informe_estadistico/');
                setUsuarios(response.data);
            } catch (error) {
                console.error('Error fetching usuarios:', error);
                setError('Error fetching usuarios');
            }
        };

        fetchUsuarios();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8000/agregar_conexion/', {
                usuario_origen: usuarioOrigen,
                usuario_destino: usuarioDestino,
            });
            alert('Conexión agregada con éxito');
            onRefresh(); // Llamar a la función de actualización
        } catch (error) {
            console.error('Error al agregar conexión:', error);
            setError('Error al agregar conexión');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group controlId="usuarioOrigen">
                <Form.Label>Usuario Origen</Form.Label>
                <Form.Control
                    as="select"
                    value={usuarioOrigen}
                    onChange={(e) => setUsuarioOrigen(e.target.value)}
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
            <Form.Group controlId="usuarioDestino">
                <Form.Label>Usuario Destino</Form.Label>
                <Form.Control
                    as="select"
                    value={usuarioDestino}
                    onChange={(e) => setUsuarioDestino(e.target.value)}
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
                Agregar Conexión
            </Button>
        </Form>
    );
};

export default AgregarConexion;
