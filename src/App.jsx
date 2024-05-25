// En App.jsx

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AgregarUsuario from './components/AgregarUsuario';
import AgregarConexion from './components/AgregarConexion';
import UsuariosConectados from './components/UsuariosConectados';
import InformeEstadistico from './components/InformeEstadistico';

const App = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleRefresh = () => {
        // Incrementar la clave de actualización para forzar la actualización del componente
        setRefreshKey((prevKey) => prevKey + 1);
    };

    return (
        <Container className="my-4">
            <h1 className="mb-4">Gestión de Usuarios</h1>
            <Row>
                <Col md={6} className="mb-4">
                    <Card>
                        <Card.Body>
                            <Card.Title>Agregar Usuario</Card.Title>
                            <AgregarUsuario onRefresh={handleRefresh} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="mb-4">
                    <Card>
                        <Card.Body>
                            <Card.Title>Agregar Conexión</Card.Title>
                            <AgregarConexion onRefresh={handleRefresh} key={refreshKey}/>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="mb-4">
                    <Card>
                        <Card.Body>
                            <Card.Title>Usuarios Conectados</Card.Title>
                            <UsuariosConectados key={refreshKey}/>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="mb-4">
                    <Card>
                        <Card.Body>
                            <Card.Title>Informe Estadístico</Card.Title>
                            <InformeEstadistico key={refreshKey} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default App;
