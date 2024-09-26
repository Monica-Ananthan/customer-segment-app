import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';


const CreateSegment = () => {
  const [showModal, setShowModal] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [newSchema, setNewSchema] = useState('');
  const [newDropdownSchemas, setNewDropdownSchemas] = useState([]);
  const [webhookUrl, setWebhookUrl] = useState('https://webhook.site/5929f67e-6657-4efb-92d3-6c55bcaae714');
  const availableSchema = [
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' },
  ];

  const sendSegmentDataToServer = () => {
    const segmentData = {
      segment_name: segmentName,
      schema: selectedSchemas.map(schema => ({ [schema]: availableSchema.find(item => item.value === schema).label }))
    };

    fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(segmentData)
    })
      .then(response => {
        if (response.ok) {
          alert('Segment data sent successfully!');
        }
      })
      .catch(error => {
        alert('Error: ' + error.message);
      });
  };

  const handleAddNewSchema = () => {
    if (newSchema && !selectedSchemas.includes(newSchema)) {
      setSelectedSchemas([...selectedSchemas, newSchema]);
      setNewSchema(''); 
    }
  };

  const handleSchemaChange = (index, value) => {
    const updatedSchemas = [...selectedSchemas];
    updatedSchemas[index] = value;
    setSelectedSchemas(updatedSchemas);
  };

  const getUnselectedOptions = () => {
    return availableSchema.filter(schema => !selectedSchemas.includes(schema.value));
  };


  const handleSaveSegment = () => {
    setSegmentName('');
    sendSegmentDataToServer();
    setShowModal(false);
  };


  return (
    <div className='main-wrap'>
      <Container>
        <Button variant='' className='prim-btn' onClick={() => setShowModal(true)}>Save segment</Button>

        <Modal className='segment-mod' show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Saving Segment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='form-group'>
              <label>Enter the Name of the Segment</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name of the segment"
                value={segmentName}
                onChange={(e) => setSegmentName(e.target.value)}
              />
              <p className='mt-3'>To save your segment, you need to add the schemas to build the query</p>
            </div>

            <div className='form-group'>
              {selectedSchemas.map((selectedSchema, index) => (
                <select
                  key={index}
                  className='form-select mb-3'
                  value={selectedSchema}
                  onChange={(e) => handleSchemaChange(index, e.target.value)}
                >
                  <option value="">{availableSchema.find(item => item.value === selectedSchema)?.label}</option>
                  {getUnselectedOptions().map((available) => (
                    <option key={available.value} value={available.value}>{available.label}</option>
                  ))}
                </select>
              ))}
            </div>

            <select value={newSchema} onChange={(e) => setNewSchema(e.target.value)} className='form-select'>
              <option value="">Add schema to segment</option>
              {getUnselectedOptions().map((schema) => (
                <option key={schema.value} value={schema.value}>
                  {schema.label}
                </option>
              ))}
            </select>

            <button onClick={handleAddNewSchema} className='link-btn'>+ Add new schema</button>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="" className='btn-save' onClick={handleSaveSegment}>Save Segment</Button>
            <Button variant="" className='btn-cancel' onClick={() => setShowModal(false)}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default CreateSegment;