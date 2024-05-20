import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Settings() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [place, setPlace] = useState('');
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});
  let Id = null
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://192.168.1.3:3001/getuser/' + id)
      .then((result) => {
        setName(result.data.name);
        setPhone(result.data.phone);
        setPlace(result.data.place);
        setStatus(result.data.status);
        Id = result.data._id
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleDelete = (id) => {
    axios.delete(`http://192.168.1.3:3001/deleteOrder/${id}`)
    .then((result) => navigate('/home'))
    .catch((err) => console.log(err));
}


const validateForm = () => {
  const errors = {};

  if (!name.trim()) {
    errors.name = 'Name is required';
  }

  if (!phone) {
    errors.phone = 'Phone is required';
  } else if (isNaN(phone) || phone.toString().length !== 10) {
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

  const handleUpdate = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .put('http://192.168.1.3:3001/updateuser/' + id, { name, phone,place,status })
        .then((result) => navigate('/home'))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className='d-flex vh-100 bg-light justify-content-center align-items-center'>
      
      <div className='m-3 bg-white shadow rounded p-3'>
        <form onSubmit={handleUpdate}>
        <div className='col-12   mt-0 d-flex align-items-center justify-content-between'>
        <h1 className="text-start font-weight-bold mb-0 ">Update</h1>

    <div className='mb-2'>
  <label htmlFor='status' className="form-label"></label>

  <select
    id='status'
    className='form-control'
    value={status}
    onChange={(e) => setStatus(e.target.value)}
  >
    <option value='' hidden>Select a Status</option>
    <option value='Active'>Active</option>
    <option value='Leave'>Leave</option>
    <option value='Block'>Block</option>

  </select>
  {errors.status && <div className='text-danger'>{errors.status}</div>}
</div>

 
</div>
        
         
      <div className='col-12  mt-3 d-flex align-items-center justify-content-between'>
      <div className='mb-2 col-4'>
            <label htmlFor='name'>Name</label>
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
          <div className='mb-2 col-4 mx-1'>
            <label htmlFor='phone'>phone</label>
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
          
          <div className='mb-2 col-4'>
            <label htmlFor='place'>place</label>
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
      </div>
          
          <div className='col-12  mt-3 d-flex align-items-center justify-content-between'>
          <button className='btn btn-success'>Update</button>
          <button className='btn btn-outline-danger btn-sm ' onClick={() => handleDelete(id)}>Remove</button>
          
</div>
     
         
        </form>
     
                                      
                             
      </div>
    </div>
  );
}

export default Settings;
