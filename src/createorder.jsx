import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateOrder() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [place, setPlace] = useState('');
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = 'Name is required';
    }

    if (!phone) {
      errors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = 'Phone is invalid';
    }

    if (!place.trim()) {
      errors.place = 'Place is required';
    }
    if (!status.trim()) {
      errors.status = 'status is required';
    }
    
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .post('http://localhost:3001/createorder', { name, phone, place,status })
        .then((result) => navigate('/home'))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className='d-flex mt-5 bg-white justify-content-center align-items-center'>
      <div className='w-75 bg-white rounded p-3 shadow '>
        <form onSubmit={handleSubmit}>
          <h2 className="mb-4">Add Order</h2>
          <div className='mb-3'>
            <label htmlFor='name' className="form-label">Name</label>
            <input
              type='text'
              id='name'
              placeholder='Enter name'
              className='form-control'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <div className='text-danger'>{errors.name}</div>}
          </div>
          <div className='mb-3'>
            <label htmlFor='phone' className="form-label">Phone</label>
            <input
              type='number'
              id='phone'
              placeholder='Enter phone'
              className='form-control'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <div className='text-danger'>{errors.phone}</div>}
          </div>
          <div className='mb-3'>
            <label htmlFor='place' className="form-label">Place</label>
            <input
              type='text'
              id='place'
              placeholder='Enter place'
              className='form-control'
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
            {errors.place && <div className='text-danger'>{errors.place}</div>}
          </div>
          <div className='mb-3'>
  <label htmlFor='status' className="form-label">Status</label>
  <select
    id='status'
    className='form-control'
    value={status}
    onChange={(e) => setStatus(e.target.value)}
  >
    <option value='' hidden>Select a place</option>
    <option value='Active'>Active</option>
    <option value='Leave'>Leave</option>
    <option value='Block'>Block</option>

  </select>
  {errors.status && <div className='text-danger'>{errors.status}</div>}
</div>

          <button className='btn btn-success'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateOrder;
