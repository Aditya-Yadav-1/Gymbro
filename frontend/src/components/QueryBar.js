import React, {useContext, useState} from 'react';
import crossicon from './Images/cross.jpg';
import addicon from './Images/addIcon.png';
import AddMemberModal from './AddMemberModal';

const QueryBar = (props) => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {whichMembersToShow, setwhichMembersToShow, setSearchValue, searchValue} = props;
    const [bgColor, setbgColor] = useState("#e8e8e8");

    const handleSearchChange = (e) => {
        e.preventDefault();
        setSearchValue(e.target.value);
    }

    // const handleCross = (e) => {
    //     setSearchValue('');
    // }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    } 

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const showAllMembers = (e) => {
        setSearchValue('');
        setwhichMembersToShow(0);
    }

    const showActiveMembers = (e) => {
        setSearchValue('');
        setwhichMembersToShow(1);
    }

    const showExpiredMembers = (e) => {
        setSearchValue('');
        setwhichMembersToShow(2);
    }
    // a5afb3
    return ( 
        <div className='querybar'>
            <div className="queries">
                {whichMembersToShow == 0 && (<div><button className='member-btn' onClick={showAllMembers} style={{backgroundColor:"black", color:"white"}}>All Member</button>
                <button className='member-btn' onClick={showActiveMembers} style={{backgroundColor:bgColor, color:"black"}}>Active Member</button>
                <button className='member-btn' onClick={showExpiredMembers} style={{backgroundColor:bgColor, color:"black"}}>Expired Member</button> </div>)}

                {whichMembersToShow == 1 && (<div><button className='member-btn' onClick={showAllMembers} style={{backgroundColor:bgColor, color:"black"}}>All Member</button>
                <button className='member-btn' onClick={showActiveMembers} style={{backgroundColor:"black", color:"white"}}>Active Member</button> 
                <button className='member-btn' onClick={showExpiredMembers} style={{backgroundColor:bgColor, color:"black"}}>Expired Member</button> </div>)}

                {whichMembersToShow == 2 && (<div><button className='member-btn' onClick={showAllMembers} style={{backgroundColor:bgColor, color:"black"}}>All Member</button>
                <button className='member-btn' onClick={showActiveMembers} style={{backgroundColor:bgColor, color:"black"}}>Active Member</button>
                <button className='member-btn' onClick={showExpiredMembers} style={{backgroundColor:"black", color:"white"}}>Expired Member</button></div>)}
            </div>
            <div className="SearchAndAddOption">
                <div className="add-member">
                    <img src = {addicon} onClick={handleOpenModal} alt = "addIcon"/>
                    {isModalOpen && (<AddMemberModal onClose={handleCloseModal}/>)}
                </div>
                <div className="SearchAndCross">
                    <input
                        className="search-bar"
                        type="text"
                        placeholder="Search"
                        value={searchValue}
                        onChange={handleSearchChange}
                    />
                    {/* <img id="cross-icon" src = {crossicon} onClick={handleCross} style={searchValue===''?{display:'none'}:{display:'block'}} alt = "addIcon"/> */}
                </div>
            </div>
        </div>
    )
}

export default QueryBar
