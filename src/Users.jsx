import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function Users() {
    const [users, setUsers] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        axios.get('http://192.168.1.3:3001/home')
            .then(result => {
                setUsers(result.data);
                setFilteredUsers(result.data);
            })
            .catch(err => console.log('sha3421', err));
    }, []);

    const navigate = useNavigate();

 

    const handleSearchInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchInput(searchTerm);
        filterUsers(searchTerm);
    }

    const filterUsers = (searchTerm) => {
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phone.toString().includes(searchTerm) ||
            user.place.toLowerCase().includes(searchTerm.toLowerCase())
            
        );
        console.log(filtered,'jd')
        setFilteredUsers(filtered);
    }

    return (
        <div className='container-fluid bg-white'>
         
        <div className='row justify-content-center'>
      
        <div className='col-12 p-3 shadow bg-white rounded mt-0 d-flex align-items-center justify-content-between'>
    <h1 className="text-start font-weight-bold mb-0">Bismi</h1>
<div>
<Link to="/create" className='btn btn-success mx-3'>Add+</Link>
    <Link to="/create" className='btn btn-warning'>{filteredUsers.length}</Link>
</div>
</div>

            <div className='col-12  col-md-8 shadow p-1 mb-5 bg-white rounded mt-3'>
              
               
                <div className='table'>
                <input
                        type="text"
                        className="form-control mb-1"
                        placeholder="Search by name, phone, or place"
                        value={searchInput}
                        onChange={handleSearchInputChange}
                    />
                    <table className='table table-stripe'>  
                        
                        <thead className="thead-dark">
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Place</th>
                                <th>Status</th>
                              
                            </tr>
                        </thead>
                        <tbody>
  {filteredUsers.length === 0 ? (
    <tr>
      <td colSpan="4">No users found</td>
    </tr>
  ) : (
    filteredUsers.map((user) => (
        <tr key={user._id}>
        <td>{user.name}</td>
        <td>{user.phone}</td>
        <td>{user.place}</td>
        <td>
          <Link to={`/update/${user._id}`} className='btn btn-outline-success btn-sm mr-2'>{user.status}</Link>
        </td>
       
      </tr>
      
    ))
  )}
</tbody>

                    </table>
                </div>
            </div>
        </div>
    </div>
    
    );
}

export default Users;
