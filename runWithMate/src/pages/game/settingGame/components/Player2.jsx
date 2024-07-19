import styled from '@emotion/styled';
import { MdOutlinePerson } from "react-icons/md";

const OtherPlayerContainer = styled.div`
    display : flex;
    margin-top : 3vh;
    margin-left : 2vh;
`

const OtherUserName = styled.p`
    margin-left : 1.5vh;
    margin-top : 1vh;

`

const Other = styled.div`
    display: flex;
    padding: 0.5vh 1vh;
    justify-content: center;
    align-items: center;
    gap: 2vh;
    border-radius: 1vh;
    background: var(--Grays-Gray-4, #D1D1D6);
    margin-left: 8.5vh;
`



export default function OtherPlayer(){
    return(
        <OtherPlayerContainer>
            <MdOutlinePerson size='30' />
            <OtherUserName>000님</OtherUserName>
            <Other>
                <p>참가 플레이어</p>
            </Other>
        </OtherPlayerContainer>
    );
}