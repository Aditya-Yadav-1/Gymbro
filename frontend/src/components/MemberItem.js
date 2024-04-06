import React, { useContext, useState } from 'react'
import MemberProfileIcon from './Images/profile_icon.png';
import deleteIcon from './Images/deleteIcon.png';
import editIcon from './Images/editIcon.png';
import { membercontext } from '../contexts/Memberdata';
import DeleteMemberModal from './DeleteMemberModal';
import UpdateMemberModal from './UpdateMemberModal';

const MemberItem = ({index, validity, member}) => {

  const originalDate = new Date(member.fee_paid_date);
  const year = originalDate.getFullYear();
  const month = ('0' + (originalDate.getMonth() + 1)).slice(-2); // Month is zero-based, so we add 1 and pad with '0' if necessary
  const day = ('0' + originalDate.getDate()).slice(-2); // Pad with '0' if necessary
  const formattedDateString = `${day}-${month}-${year}`;

  const {deleteMember} = useContext(membercontext);
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setisUpdateModalOpen] = useState(false);

  const OpenDeleteModal = () => {
    setisDeleteModalOpen(true);
  }

  const CloseDeleteModal = () => {
    setisDeleteModalOpen(false);
  }

  const OpenUpdateModal = () => {
    setisUpdateModalOpen(true);
  }

  const CloseUpdateModal = () => {
    setisUpdateModalOpen(false);
  }

  return (
    <div className='member-card'>
      <img id="profile-icon"src = {MemberProfileIcon}/>
      <div className='member-name'>{member.name}</div>
      <div className="member-email">{member.email}</div>
      <div className="member-phone">{member.phone_no}</div>
      <div className="member-fee-date">{formattedDateString}</div>
      {validity == 'Valid'? <div className="valid">Active</div>:<div className="expired">Expired</div>}
      
      <div className="edit-icon">
        <img className='delete-update' src = {editIcon} onClick={OpenUpdateModal}/>
        {isUpdateModalOpen && (<UpdateMemberModal  member = {member} onClose={CloseUpdateModal}/>)}
      </div>
      <div className="delete-icon">
        <img className='delete-update' src = {deleteIcon} onClick={OpenDeleteModal}/>
        {isDeleteModalOpen && (<DeleteMemberModal member = {member} onClose={CloseDeleteModal}/>)}
      </div>
    </div>
  )
}

export default MemberItem
