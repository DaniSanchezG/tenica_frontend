// AgregarConexion.test.jsx
import React from 'react';
import axios from 'axios';
import AgregarConexion from '../src/components/AgregarConexion';
import { render, fireEvent, waitFor } from "@testing-library/react";
import MockAdapter from 'axios-mock-adapter';

// Mock de axios para simular la llamada a la API
const mockAxios = new MockAdapter(axios);

describe('AgregarConexion', () => {
  beforeEach(() => {
    // Limpiamos el historial de llamadas antes de cada prueba
    mockAxios.reset();
  });

  it('debería cargar usuarios al montar el componente', async () => {
    // Configuramos la respuesta simulada para la solicitud GET
    const usuariosMock = [
      {
        usuario_id: 18,
        nombre: "Test1",
        conexiones_salientes: [{ id: 19, nombre: "Test2" }],
        conexiones_entrantes: [{ id: 19, nombre: "Test2" }]
      },
      {
        usuario_id: 19,
        nombre: "Test2",
        conexiones_salientes: [{ id: 18, nombre: "Test1" }],
        conexiones_entrantes: [{ id: 18, nombre: "Test1" }]
      }
    ];
    mockAxios.onGet('http://localhost:8000/informe_estadistico/').reply(200, usuariosMock);

    // Renderizamos el componente
    render(<AgregarConexion />);
  }),


  it('debería agregar una conexión cuando se envía el formulario', async () => {
    const onRefreshMock = jest.fn();
    const usuariosMock = [
      {
        usuario_id: 18,
        nombre: "Test1",
        conexiones_salientes: [{ id: 19, nombre: "Test2" }, { id: 19, nombre: "Test2" }],
        conexiones_entrantes: [{ id: 19, nombre: "Test2" }]
      },
      {
        usuario_id: 19,
        nombre: "Test2",
        conexiones_salientes: [{ id: 18, nombre: "Test1" }],
        conexiones_entrantes: [{ id: 18, nombre: "Test1" }, { id: 18, nombre: "Test1" }]
      }
    ];
    mockAxios.onGet('http://localhost:8000/informe_estadistico/').reply(200, usuariosMock);
    mockAxios.onPost('http://localhost:8000/agregar_conexion/').reply(200);

    const { getByLabelText, getByText } = render(<AgregarConexion onRefresh={onRefreshMock} />);
    
    // Esperamos a que los usuarios se carguen
    await waitFor(() => {
      expect(getByLabelText('Usuario Origen')).toBeInTheDocument();
      expect(getByLabelText('Usuario Destino')).toBeInTheDocument();
    });

    const usuarioOrigenInput = getByLabelText('Usuario Origen');
    const usuarioDestinoInput = getByLabelText('Usuario Destino');
    const agregarButton = getByText('Agregar Conexión');

    // Seleccionamos los valores en los campos de selección
    fireEvent.change(usuarioOrigenInput, { target: { value: '18' } });
    fireEvent.change(usuarioDestinoInput, { target: { value: '19' } });

    // Aseguramos que los valores se hayan actualizado
    await waitFor(() => {
      expect(usuarioOrigenInput.value).toBe('18');
      expect(usuarioDestinoInput.value).toBe('19');
    });

    // Enviamos el formulario
    fireEvent.click(agregarButton);

    // Verificamos que la solicitud POST se haya realizado
    await waitFor(() => {
      expect(mockAxios.history.post.length).toBe(1);
      expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({ usuario_origen: '18', usuario_destino: '19' });
    });

    // Verificamos que onRefresh haya sido llamado
    expect(onRefreshMock).toHaveBeenCalledTimes(1);
  });

  it('debería mostrar un mensaje de error si la llamada a la API de carga de usuarios falla', async () => {
    mockAxios.onGet('http://localhost:8000/informe_estadistico/').reply(500);

    const { getByText } = render(<AgregarConexion />);
    const agregarButton = getByText('Agregar Conexión');

    await waitFor(() => {
      expect(getByText('Error fetching usuarios')).toBeInTheDocument();
    });
  });

  it('debería mostrar un mensaje de error si la llamada a la API de agregar conexión falla', async () => {
    const usuariosMock = [
      {
        usuario_id: 18,
        nombre: "Test1",
        conexiones_salientes: [{ id: 19, nombre: "Test2" }, { id: 19, nombre: "Test2" }],
        conexiones_entrantes: [{ id: 19, nombre: "Test2" }]
      },
      {
        usuario_id: 19,
        nombre: "Test2",
        conexiones_salientes: [{ id: 18, nombre: "Test1" }],
        conexiones_entrantes: [{ id: 18, nombre: "Test1" }, { id: 18, nombre: "Test1" }]
      }
    ];
    mockAxios.onGet('http://localhost:8000/informe_estadistico/').reply(200, usuariosMock);
    mockAxios.onPost('http://localhost:8000/agregar_conexion/').reply(500);

    const { getByLabelText, getByText } = render(<AgregarConexion />);
    const usuarioOrigenInput = getByLabelText('Usuario Origen');
    const usuarioDestinoInput = getByLabelText('Usuario Destino');
    const agregarButton = getByText('Agregar Conexión');

    await waitFor(() => {
      expect(getByLabelText('Usuario Origen')).toBeInTheDocument();
      expect(getByLabelText('Usuario Destino')).toBeInTheDocument();
    });

    fireEvent.change(usuarioOrigenInput, { target: { value: '1' } });
    fireEvent.change(usuarioDestinoInput, { target: { value: '2' } });
    fireEvent.click(agregarButton);

    await waitFor(() => {
      expect(getByText('Error al agregar conexión')).toBeInTheDocument();
    });
  });
});


