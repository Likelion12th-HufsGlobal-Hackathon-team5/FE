import styled from '@emotion/styled';

const Container = styled.div`
    display : flex;
    flex-direction: column;
    width : 100%;
    height : 100%;
`

const GameRoom = styled.h1`
    color: #000;
    text-align: center;
    font-family: var(--Display-Medium-Font, Roboto);
    font-size: 4rem;
    font-style: normal;
    font-weight: 700;
`

const RoomInfo = styled.p`
    color: #47494C;
    text-align: center;
    font-family: var(--Title-Medium-Font, Roboto);
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 600;
`

export default function Content(){
    return (
        <Container>
            <GameRoom>GameRoom</GameRoom>
            <RoomInfo>게임을 생성하고, 친구들을 초대해볼까요?</RoomInfo>
        </Container>
    );
}
