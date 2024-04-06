import React, { useContext, useState } from 'react';
import { membercontext } from '../contexts/Memberdata';

const AddMemberModal = ({ onClose }) => { // onclose, onaddmember banana hai

  const {addMember} = useContext(membercontext);

  const [formData, setFormData] = useState({
    name: "",
    phone_no: "",
    email: "",
    fee_paid_date: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMember(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add Member</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="modal-label">Name:</label>
            <input className="modal-input" type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="modal-label">Phone:</label>
            <input className="modal-input" type="text" id="phone_no" name="phone_no" value={formData.phone_no} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="modal-label">Email:</label>
            <input className="modal-input" type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="modal-label">Fee_Paid_Date:</label>
            <input className="modal-input" type="date" id="fee_paid_date" name="fee_paid_date" value={formData.fee_paid_date} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <button className="modal-button" type="submit" style={{backgroundColor:"green"}}>Add Member</button>
            <button className="modal-button" type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;
