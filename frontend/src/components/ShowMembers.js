import React, { useContext, useEffect } from 'react'
import { membercontext } from '../contexts/Memberdata';
import MemberItem from './MemberItem';

function checkValidity(date1, date2) {
  // day1 -> saved data, day2 -> current data
  const [day1, month1, year1] = date1.split('-').map(Number);
  const [day2, month2, year2] = date2.split('-').map(Number);

  if(year1 === year2 && (((month2 === month1 + 1) && date1 > date2) || (month2 === month1))){
    return 1;
  }
  else if(year1 + 1 === year2 && ((month1 === 12 && month2 === 1) && (date1 > date2))){
    return 1;
  }
  return 0;
}

const ShowMembers = (props) =>{
  const { members , getMembers } = useContext(membercontext);
  const {whichMembersToShow, searchValue} = props;
  useEffect(()=>{
    getMembers();
  },[]);

  const currentDate = new Date(Date.now());
  const curr_year = currentDate.getFullYear();
  const curr_month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Month is zero-based, so we add 1 and pad with '0' if necessary
  const curr_day = ('0' + currentDate.getDate()).slice(-2); // Pad with '0' if necessary
  const curr_formattedDateString = `${curr_day}-${curr_month}-${curr_year}`;

  return (
    <div className='member-block'>
      {members.length === 0 && <p>No Members</p>} 

      {searchValue !== '' && members.map((member,i) => {

        let validity = '';
        const originalDate = new Date(member.fee_paid_date);
        let year = originalDate.getFullYear();
        let month = ('0' + (originalDate.getMonth() + 1)).slice(-2); // Month is zero-based, so we add 1 and pad with '0' if necessary
        let day = ('0' + originalDate.getDate()).slice(-2); // Pad with '0' if necessary
        let formattedDateString = `${day}-${month}-${year}`;

        if(checkValidity(formattedDateString, curr_formattedDateString) === 1){
          validity = 'Valid';
        }else{
          validity = 'Expired';
        }

        const smallCaseName = member.name.toLowerCase();
        const smallCaseSearchValue = searchValue.toLowerCase();
        if(smallCaseName.includes(smallCaseSearchValue)){
          {return <MemberItem key = {i} index = {i}  validity = {validity} member={member}/>}
        }
      })}

      {searchValue === '' && members.length > 0 && members.map((member, i) => {

        let validity = '';
        const originalDate = new Date(member.fee_paid_date);
        const year = originalDate.getFullYear();
        const month = ('0' + (originalDate.getMonth() + 1)).slice(-2); // Month is zero-based, so we add 1 and pad with '0' if necessary
        const day = ('0' + originalDate.getDate()).slice(-2); // Pad with '0' if necessary
        const formattedDateString = `${day}-${month}-${year}`;

        if(checkValidity(formattedDateString, curr_formattedDateString) === 1){
          validity = 'Valid';
        }else{
          validity = 'Expired';
        }

        if(whichMembersToShow === 0) {return <MemberItem key = {i} index = {i}  validity = {validity} member={member}/>;}
        else if(whichMembersToShow === 1 && validity === 'Valid') {return <MemberItem key = {i} index = {i}  validity = {validity} member={member}/>;}
        else if(whichMembersToShow === 2 && validity === 'Expired') {return <MemberItem key = {i} index = {i}  validity = {validity} member={member}/>;}
      })}
    </div>
  );
}

export default ShowMembers
