import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ClientList = ({ clientes, onEdit, onDelete }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [modalType, setModalType] = useState(null);

  const handleOpenModal = (cliente, type) => {
    setSelectedClient(cliente);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setSelectedClient(null);
    setModalType(null);
  };

  // Función para generar y descargar el reporte en formato Excel
  const generateExcelReport = () => {
    const data = clientes.map((cliente) => {
      const direcciones = cliente.direcciones
        .map((d) => `${d.direccion} (${d.ciudad}, ${d.estado}, ${d.codigopostal})`)
        .join(' | ');

      const documentos = cliente.documentos
        .map((d) => `${d.tipodocumento}: ${d.numerodocumento}`)
        .join(' | ');

      return {
        ClienteID: cliente.clienteid,
        Nombre: cliente.nombre,
        Apellido: cliente.apellido,
        Teléfono: cliente.telefono,
        CorreoElectrónico: cliente.correoelectronico,
        Direcciones: direcciones,
        Documentos: documentos,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Clientes');

    // Generar y descargar el archivo
    XLSX.writeFile(workbook, 'reporte_clientes.xlsx');
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h2>Listado de Clientes</h2>
        <button
                  className="btn btn-sm"
                  onClick={generateExcelReport}
                  title="Editar"
                  style={{ backgroundColor: 'green', color: 'white', border: 'solid 1px', height:'100%'}}
                >
                  <i class="bi bi-file-earmark-excel"></i>
                </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Teléfono</th>
            <th>Correo Electrónico</th>
            <th className="text-center">Direcciones</th>
            <th className="text-center">Documentos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.clienteid}>
              <td>{cliente.nombre}</td>
              <td>{cliente.apellido}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.correoelectronico}</td>
              <td className="text-center">
                <button
                  className="btn btn-link text-primary"
                  onClick={() => handleOpenModal(cliente, 'direcciones')}
                  title="Ver Direcciones"
                  style={{ textDecoration: 'none', color: '#019df4' }}
                >
                  <i className="bi bi-geo-alt-fill" style={{ color: '#019df4' }}></i> {cliente.direcciones.length}
                </button>
              </td>
              <td className="text-center">
                <button
                  className="btn btn-link text-primary"
                  onClick={() => handleOpenModal(cliente, 'documentos')}
                  title="Ver Documentos"
                  style={{ textDecoration: 'none' }}
                >
                  <i className="bi bi-file-earmark-text-fill" style={{ color: '#019df4' }}></i> {cliente.documentos.length}
                </button>
              </td>
              <td>
                <button
                  className="btn btn-sm me-2 "
                  onClick={() => onEdit(cliente)}
                  title="Editar"
                  style={{ backgroundColor: 'white', color: '#019df4', border: 'solid 1px' }}
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  className="btn btn-sm"
                  onClick={() => onDelete(cliente.clienteid)}
                  title="Eliminar"
                  style={{ backgroundColor: '#019df4', color: 'white' }}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedClient && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg animate__animated animate__fadeInDown" role="document">
            <div className="modal-content">
              <div className="modal-header" style={{ backgroundColor: '#019df4', color: 'white' }}>
                <h5 className="modal-title">
                  {modalType === 'direcciones' ? 'Direcciones' : 'Documentos'} - {selectedClient.nombre} {selectedClient.apellido}
                </h5>
                <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Cerrar"></button>
              </div>
              <div className="modal-body">
                {modalType === 'direcciones' && (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Dirección</th>
                        <th>Ciudad</th>
                        <th>Estado</th>
                        <th>Código Postal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedClient.direcciones.map((direccion) => (
                        <tr key={direccion.direccionid}>
                          <td>{direccion.direccion}</td>
                          <td>{direccion.ciudad}</td>
                          <td>{direccion.estado}</td>
                          <td>{direccion.codigopostal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {modalType === 'documentos' && (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Tipo de Documento</th>
                        <th>Número</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedClient.documentos.map((documento) => (
                        <tr key={documento.documentoid}>
                          <td>{documento.tipodocumento}</td>
                          <td>{documento.numerodocumento}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClientList;
