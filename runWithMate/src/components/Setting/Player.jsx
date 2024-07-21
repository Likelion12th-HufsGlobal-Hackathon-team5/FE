// 사용자 정보를 어떻게 가져오냐에 따라 Lobby 하위로 들어갈 수 있음

import styled from '@emotion/styled';
import { MdOutlinePerson } from "react-icons/md";

const PlayerContainer = styled.div`
    display : flex;
    margin-top : 3vh;
    margin-left : 2vh;
    width : 100%;
    height : 100%;
`

const UserName = styled.p`
    margin-left : 1.5vh;
    margin-top : 1vh;
    width : 20%;
    height : 5%;

`

const Host = styled.div`
    display: flex;
    width : 12vh;
    height : 5vh;
    justify-content: center;
    align-items: center;
    border-radius: 1vh;
    background: var(--Grays-Gray-4, #D1D1D6);
    margin-left: 10vh;
`



export default function Player(){
    return(
        <PlayerContainer>
            <MdOutlinePerson size='30' />
            <UserName>000님</UserName>
            <Host>
                <p>Host</p>
            </Host>
        </PlayerContainer>
    );
}