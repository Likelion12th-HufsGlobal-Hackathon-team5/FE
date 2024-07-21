import styled from '@emotion/styled'
import Header from '../../components/Header';
import MyPointBox from '../../components/point/MyPointBox';
import AttendanceBtn from '../../components/point/AttendanceBtn';
import PointMarket from '../../components/point/PointMarket';
import MyWallet from '../../components/point/MyWallet';

function Point(){

    return(
        <>
        <Header></Header>
        <Container> 
                <MyPointBox></MyPointBox>
                <AttendanceBtn></AttendanceBtn>
                <PointMarket></PointMarket>
                <MyWallet></MyWallet>
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