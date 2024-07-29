import styled from '@emotion/styled';


const GameRoom = styled.h1`
    color: #000;
    text-align: center;
    font-family: var(--Display-Medium-Font, Roboto);
    font-size: calc(45 / 1080 * 100vh);
    font-style: normal;
    font-weight: 700;
    line-height: calc(52 / 1080 * 100vh); 
    letter-spacing: var(--Display-Medium-Tracking, 0px);
    position: relative;
    top: calc(20 / 1080 * 100vh);
`

const RoomInfo = styled.p`
    color: #47494C;
    text-align: center;
    font-family: var(--Title-Medium-Font, Roboto);
    font-size: calc(16 / 1080 * 100vh);
    font-style: normal;
    font-weight: 600;
    line-height: calc(24 / 1080 * 100vh);
    position: relative;
    top: calc(21 / 1080 * 100vh);
`

export default function Content(){
    return (
        <>
            <GameRoom>GameRoom</GameRoom>
            <RoomInfo>게임을 생성하고, 친구들을 초대해볼까요?</RoomInfo>
        </>
    );
}
