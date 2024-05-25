// InformeEstadistico.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col } from 'react-bootstrap';

const InformeEstadistico = () => {
    const [usuarios, setUsuarios] = useState([]);

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

    return (
        <Container>
            <Row>
                {usuarios.map((usuario) => (
                    <Col key={usuario.usuario_id} sm={12} md={6} lg={4} className="mb-4">
                        <Card>
                            <Card.Body>                             
                                <Card.Title>{usuario.nombre}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">ID: {usuario.usuario_id}</Card.Subtitle>
                                <Card.Text>
                                    <strong>Conexiones Salientes:</strong>
                                    <ul>
                                        {usuario.conexiones_salientes.map((conexion) => (
                                            <li key={conexion.id}>{conexion.nombre}</li>
                                        ))}
                                    </ul>
                                    <strong>Conexiones Entrantes:</strong>
                                    <ul>
                                        {usuario.conexiones_entrantes.map((conexion) => (
                                            <li key={conexion.id}>{conexion.nombre}</li>
                                        ))}
                                    </ul>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default InformeEstadistico;
