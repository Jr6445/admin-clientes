import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import api from '../services/api';
import ClientForm from '../components/ClienteForm';
import ClientList from '../components/ClienteList';

const AdminPage = () => {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentCliente, setCurrentCliente] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    correoelectronico: '',
    direcciones: [],
    documentos: [],
  });

  const fetchClientes = async () => {
    try {
      const response = await api.get('/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Error al obtener clientes:', error.message);
    }
  };

  const handleEdit = (cliente) => {
    const normalizedCliente = {
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      telefono: cliente.telefono,
      correoelectronico: cliente.correoelectronico,
      direcciones: cliente.direcciones || [],
      documentos: cliente.documentos || [],
    };
    setFormData(normalizedCliente);
    setCurrentCliente(cliente.clienteid);
    setShowModal(true);
  };

  const handleDelete = async (clienteID) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al cliente de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/clientes/${clienteID}`);
          Swal.fire('¡Eliminado!', 'El cliente ha sido eliminado.', 'success');
          fetchClientes();
        } catch (error) {
          console.error('Error al eliminar cliente:', error.message);
          Swal.fire('Error', 'No se pudo eliminar al cliente.', 'error');
        }
      }
    });
  };

  const handleCancel = () => {
    setShowModal(false);
    setCurrentCliente(null);
    setFormData({
      nombre: '',
      apellido: '',
      telefono: '',
      correoElectronico: '',
      direcciones: [],
      documentos: [],
    });
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...formData,
        direcciones: formData.direcciones,
        documentos: formData.documentos,
      };

      if (currentCliente) {
        await api.put(`/clientes/${currentCliente}`, payload);
      } else {
        await api.post('/clientes', payload);
      }
      fetchClientes();
      setShowModal(false);
    } catch (error) {
      console.error('Error al guardar cliente:', error.message);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Administración de Clientes</h1>
      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowModal(true)}
        style={{ backgroundColor: '#019df4', border: 'none' }}
      >
        Agregar Cliente
      </button>
      <ClientList clientes={clientes} onEdit={handleEdit} onDelete={handleDelete} />
      {showModal && (
        <ClientForm
          formData={formData}
          onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          onSave={handleSave}
          onCancel={handleCancel}
          isEditing={!!currentCliente}
        />
      )}
    </div>
  );
};

export default AdminPage;
