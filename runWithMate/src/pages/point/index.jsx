import { useEffect, useState } from 'react';

import styled from '@emotion/styled'
import Header from '../../components/Header';
import MyPointBox from '../../components/point/MyPointBox';
import AttendanceBtn from '../../components/point/AttendanceBtn';
import PointMarket from '../../components/point/PointMarket';
import MyWallet from '../../components/point/MyWallet';

import postAttendance from '../../server/user/postAttendance';

const mockData={
    id:'runwmate01',
    nickname:"김런메",
    profile_image:"/img/profile",
    point:12345,
    last_check:"2020-01-01T22:10"
}

function Point(){
    const [checkedAttendance,setCheckedAttendance]=useState(false);
    const [state,setState]=useState('');
    const [type,setType]=useState('');
    const [message,setMessage]=useState('');

    const handleAttendance=async()=>{
        setCheckedAttendance((prev) => !prev);
        const attendanceMessage = await postAttendance();
        setState(attendanceMessage.state);
        setType(attendanceMessage.type);
        setMessage(attendanceMessage.message);
    };

    useEffect(()=>{
        alert(message);
    },[state])

    return(
        <>
            <Header />
            <Container> 
                    <MyPointBox />
                    <AttendanceBtn onClick={handleAttendance}/>
                    <PointMarket />
                    <MyWallet />
            </Container>
            
        </>
    )   
}

export default Point;


const Container=styled.div`
    margin: 4vh;
    display: flex;
    flex-direction: column;
    gap: 3vh;
`;