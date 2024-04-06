import React, { useContext } from 'react'
import { membercontext } from '../contexts/Memberdata';

const DeleteMemberModal = ({id, member, onClose}) => {
    const {deleteMember} = useContext(membercontext);
    const handleOnClick = (e) => {
        // e.preventDefault();
        deleteMember(member._id);
        onClose();
    }
  return (
    <div className='modal-overlay'>
      <div className="modal">
        <p>Do you want to delete {member.name}</p>
        <div className="form-group-delete">
            <button className="modal-button" type="button" style={{backgroundColor:"red"}} onClick={handleOnClick}>Delete</button>
            <button className="modal-button" type="button" onClick={onClose}>Cancel</button>
          </div>
      </div>
    </div>
  )
}

export default DeleteMemberModal

// WORK HERE
