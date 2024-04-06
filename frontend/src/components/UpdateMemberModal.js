import React, { useContext, useState } from 'react'
import { membercontext } from '../contexts/Memberdata';

const UpdateMemberModal = ({member, onClose}) => {
    const {updateMember} = useContext(membercontext);

    const originalDate = new Date(member.fee_paid_date);
    const year = originalDate.getFullYear();
    const month = ('0' + (originalDate.getMonth() + 1)).slice(-2); // Month is zero-based, so we add 1 and pad with '0' if necessary
    const day = ('0' + originalDate.getDate()).slice(-2); // Pad with '0' if necessary
    const formattedDateString = `${year}-${month}-${day}`;

    const [formData, setFormData] = useState({
        name: member.name,
        phone_no: member.phone_no,
        email: member.email,
        fee_paid_date: formattedDateString
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
        updateMember(member._id, formData);
        onClose();
    };
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Update {member.name}'s Details</h3>
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
            <input className="modal-input" type="text" id="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="modal-label">Fee_Paid_Date:</label>
            <input className="modal-input" type="date" id="fee_paid_date" name="fee_paid_date" value={formData.fee_paid_date} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <button className="modal-button" type="submit" style={{backgroundColor:"yellow", color:"black"}}>Update Member</button>
            <button className="modal-button" type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateMemberModal
