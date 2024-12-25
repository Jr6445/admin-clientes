import React, { useState } from 'react';

const ClientForm = ({ formData, onChange, onSave, onCancel, isEditing }) => {
  const [direcciones, setDirecciones] = useState(formData.direcciones || []);
  const [documentos, setDocumentos] = useState(formData.documentos || []);
  const [errors, setErrors] = useState({}); // Almacena los errores de validación

  // Manejar cambios en las direcciones
  const handleDireccionChange = (index, field, value) => {
    const updatedDirecciones = [...direcciones];
    updatedDirecciones[index][field] = value;
    setDirecciones(updatedDirecciones);
    onChange({ target: { name: 'direcciones', value: updatedDirecciones } });
  };

  const addDireccion = () => {
    setDirecciones([...direcciones, { direccion: '', ciudad: '', estado: '', codigopostal: '', pais: '' }]);
  };

  const removeDireccion = (index) => {
    const updatedDirecciones = direcciones.filter((_, i) => i !== index);
    setDirecciones(updatedDirecciones);
    onChange({ target: { name: 'direcciones', value: updatedDirecciones } });
  };

  // Validar teléfono (solo números)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'telefono' && !/^\d*$/.test(value)) return; // Solo permite números
    onChange(e);
  };

  // Manejar cambios en los documentos
  const handleDocumentoChange = (index, field, value) => {
    const updatedDocumentos = [...documentos];
    updatedDocumentos[index][field] = value;
    setDocumentos(updatedDocumentos);
    onChange({ target: { name: 'documentos', value: updatedDocumentos } });
  };

  const addDocumento = () => {
    setDocumentos([...documentos, { tipodocumento: 'Dui', numerodocumento: '', fechaemision: '' }]);
  };

  const removeDocumento = (index) => {
    const updatedDocumentos = documentos.filter((_, i) => i !== index);
    setDocumentos(updatedDocumentos);
    onChange({ target: { name: 'documentos', value: updatedDocumentos } });
  };

  // Validar formulario antes de guardar
  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre) newErrors.nombre = 'El nombre es obligatorio.';
    if (!formData.apellido) newErrors.apellido = 'El apellido es obligatorio.';
    if (!formData.telefono) newErrors.telefono = 'El teléfono es obligatorio.';
    if (!/^\d+$/.test(formData.telefono)) newErrors.telefono = 'El teléfono es obligatorio.';
    if (!formData.correoelectronico) newErrors.correoelectronico = 'El correo electrónico es obligatorio.';
    if (!/\S+@\S+\.\S+/.test(formData.correoelectronico)) newErrors.correoelectronico = 'El correo electrónico no es válido.';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(); // Solo guarda si la validación pasa
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header" style={{ backgroundColor: '#019df4', color: 'white' }}>
            <h5 className="modal-title">{isEditing ? 'Editar Cliente' : 'Registrar Cliente'}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onCancel}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="card p-4 shadow-sm" style={{ width: '100%' }}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={onChange}
                      required
                    />
                    {errors.nombre && <div className="text-danger">{errors.nombre}</div>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="apellido" className="form-label">Apellido</label>
                    <input
                      type="text"
                      className="form-control"
                      id="apellido"
                      name="apellido"
                      value={formData.apellido}
                      onChange={onChange}
                      required
                    />
                    {errors.apellido && <div className="text-danger">{errors.apellido}</div>}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="telefono" className="form-label">Teléfono</label>
                    <input
                      type="text"
                      className="form-control"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.telefono && <div className="text-danger">{errors.telefono}</div>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="correoelectronico" className="form-label">Correo Electrónico</label>
                    <input
                      type="email"
                      className="form-control"
                      id="correoelectronico"
                      name="correoelectronico"
                      value={formData.correoelectronico}
                      onChange={onChange}
                      required
                    />
                    {errors.correoelectronico && <div className="text-danger">{errors.correoelectronico}</div>}
                  </div>
                </div>
              </div>

              <div className="card p-4 shadow-sm mt-4" style={{ width: '100%' }}>
                <h5>Direcciones</h5>
                {direcciones.map((direccion, index) => (
                  <div key={index} className="border p-3 mb-3">
                    <div className="mb-2">
                      <label className="form-label">Calle</label>
                      <input
                        type="text"
                        className="form-control"
                        value={direccion.direccion}
                        onChange={(e) => handleDireccionChange(index, 'direccion', e.target.value)}
                        required
                      />
                    </div>
                    <div className="row">
                      <div className="col-md-4 mb-2">
                        <label className="form-label">Ciudad</label>
                        <input
                          type="text"
                          className="form-control"
                          value={direccion.ciudad}
                          onChange={(e) => handleDireccionChange(index, 'ciudad', e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-4 mb-2">
                        <label className="form-label">Estado</label>
                        <input
                          type="text"
                          className="form-control"
                          value={direccion.estado}
                          onChange={(e) => handleDireccionChange(index, 'estado', e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-4 mb-2">
                        <label className="form-label">Código Postal</label>
                        <input
                          type="text"
                          className="form-control"
                          value={direccion.codigopostal}
                          onChange={(e) => handleDireccionChange(index, 'codigopostal', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <button type="button" className="btn btn-danger btn-sm" onClick={() => removeDireccion(index)}>
                      Eliminar Dirección
                    </button>
                  </div>
                ))}
                <button type="button" className="btn btn-outline-primary btn-sm mb-3" onClick={addDireccion}>
                  + Agregar Dirección
                </button>
              </div>

              <div className="card p-4 shadow-sm mt-4" style={{ width: '100%' }}>
                <h5>Documentos</h5>
                {documentos.map((documento, index) => (
                  <div key={index} className="border p-3 mb-3">
                    <div className="mb-2">
                      <label className="form-label">Tipo de Documento</label>
                      <select
                        className="form-select"
                        value={documento.tipodocumento}
                        onChange={(e) => handleDocumentoChange(index, 'tipodocumento', e.target.value)}
                      >
                        <option value="Dui">Dui</option>
                        <option value="Nit">Nit</option>
                        <option value="Pasaporte">Pasaporte</option>
                      </select>
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Número de Documento</label>
                      <input
                        type="text"
                        className="form-control"
                        value={documento.numerodocumento}
                        onChange={(e) => handleDocumentoChange(index, 'numerodocumento', e.target.value)}
                        required
                      />
                    </div>
                    <button type="button" className="btn btn-danger btn-sm" onClick={() => removeDocumento(index)}>
                      Eliminar Documento
                    </button>
                  </div>
                ))}
                <button type="button" className="btn btn-outline-primary btn-sm mb-3" onClick={addDocumento}>
                  + Agregar Documento
                </button>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancelar
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave} style={{ backgroundColor: '#019df4' }}>
              {isEditing ? 'Guardar Cambios' : 'Registrar Cliente'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientForm;
