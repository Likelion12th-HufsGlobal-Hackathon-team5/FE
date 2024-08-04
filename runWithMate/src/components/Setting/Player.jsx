// 사용자 정보를 어떻게 가져오냐에 따라 Lobby 하위로 들어갈 수 있음

import styled from '@emotion/styled';
import { MdOutlinePerson } from "react-icons/md";

const PlayerContainer = styled.div`
    display : flex;
    justify-content: space-between;
    align-items : center;
    width : 100%;
    height : 100%;
`

const PlayerBox = styled.div`
    display : flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items : center;
    
    height : 100%;
    gap: 1rem;
`

const UserName = styled.p`
    font-size : 1.5rem;
`

const Host = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width : 7rem;
    height : 3rem;

    font-size: 1.5rem;
    border-radius: 1vh;
    background: var(--Grays-Gray-4, #D1D1D6);
`



export default function Player({playermock, userType}){
    return(
        <PlayerContainer>
            <PlayerBox>
                <MdOutlinePerson size='30' />
                <UserName>{playermock} 님</UserName>
            </PlayerBox>
            <Host>{userType}</Host>
        </PlayerContainer>
    );
}