import React, { useEffect, useState } from 'react';
import { useParams, useNavigate,Link } from 'react-router-dom';
import axios from 'axios';

function UpdateUser() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [place, setPlace] = useState('');
  const [count, setCount] = useState('');
  const [status, setStatus] = useState('');
  const [off, setOff] = useState('');
  const [started, setStarted] = useState('');
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
        setCount(result.data.count);
        setOff(result.data.off);
        setStatus(result.data.status);
        const startDate = new Date(result.data.start);
        const startYear = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
        setStarted(startYear);
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

  const calculateDays = () => {
    if (status === 'Leave') {
 
      return 'On leave'; 
  
  } else {


    const startedDate = new Date(started);
    const today = new Date();
    const timeDiff = today.getTime() - startedDate.getTime();
    const days = timeDiff / (1000 * 3600 * 24);
    const remOrd = 30 - days - off;
    return isNaN(days) ? 'NAN' : remOrd.toFixed(0); 
  };
}




  return (
    <div className='d-flex vh-100 bg-light justify-content-center align-items-center'>
      
      <div className='m-3 bg-white shadow rounded p-3'>
        <form onSubmit={handleUpdate}>
        <div className='col-12   mt-0 d-flex align-items-center justify-content-between'>
        <h1 className="text-start font-weight-bold mb-0 ">{name}<h6>{place}</h6></h1>

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
            <label htmlFor='name'>started on</label>
            <input
              type=''
              id=''
              className='form-control'
              value={started}
            />
     
          </div>
          <div className='mb-2 col-4 mx-1'>
          <label htmlFor='numberOfDays'>Remaing</label>
          <input
  type='text' 
  id='numberOfDays'
  className='form-control'
  value={calculateDays()} 
  readOnly
  onChange={() => {}} 
/>

   
          </div>
          
          <div className='mb-2 col-4'>
            <label htmlFor='place'>Total off</label>
            <input
              type='text'
              id='place'
              placeholder='Enter place'
              className='form-control'
              value={off}
              onChange={(e) => setplace(e.target.value)}
            />
           
          </div>
      </div>
          
          <div className='col-12  mt-3 d-flex align-items-center justify-content-between'>
          <button className='btn btn-success'>save</button>
         
        <div>
        <Link to={`/settings/${id}`} className='btn btn-outline-success btn-sm mx-2'>Edit</Link>
          <button className='btn btn-outline-danger btn-sm ' onClick={() => handleDownloadPdf(id)}>download</button>
        </div>
          
</div>
     
         
        </form>
     
                                      
                             
      </div>
    </div>
  );
}

export default UpdateUser;
