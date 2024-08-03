import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Player from './Player';
import OtherPlayer from './Player2';
import { BsLink45Deg } from "react-icons/bs";
import UseStomp from '../../hooks/useStomp';

const LobbyForm = styled.form`
    width: 85%;
    height: 100%;
    padding: 3vh;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 2vh;
    border: 0.7vh solid #217EEF;
    background: #FFF;
    position: relative;
    top: 10vh;
    left: 4vh;
`;

const LobbyTitle = styled.h2`
    color: #000;
    font-family: Inter;
    font-size: 4vh; 
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const LobbySubtitle = styled.p`
    color: #000;
    font-family: Inter;
    font-size: 2vh; 
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

const CodeContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
`;

const LinkImg = styled(BsLink45Deg)`
    font-size: 4vh;
    color: #FFF;
    margin-right: 2vh; 
    transition: color 0.3s;


    
  `;

const CopyBtn = styled.div`
    width: 100%;
    height: 6vh;
    flex-shrink: 0;
    border-radius: 1vh;
    border: #000;
    background: #000;
    text-align: center;
    display: flex; /* Flexbox 사용 */
    align-items: center; /* 수직 중앙 정렬 */
    justify-content: flex-start; /* 수평 왼쪽 정렬 */
    padding-left: 1vh; /* 아이콘과 텍스트 사이에 여백 추가 */
    position: relative;
    margin-top: 1vh;
    margin-bottom: 1vh;
    color: #FFF;
    font-family: Inter;
    font-size: 40px; /* 글씨 크기 변경 */
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    
    &:hover {
        border-radius: 1vh;
        border: 3px solid #141414;
        background: #4E4E4E;
    }

    
  &:active {
    border-radius: 10px;
    background: #FFF;
    color : #000;

    .icon{
        color:black;
    }
  }

  /* .icon:active{
    color:black;
  } */
    
`;

// const CopyTitle = styled.h3`
//     color: #FFF;
//     font-family: Inter;
//     font-size: 16px;
//     font-style: normal;
//     font-weight: 700;
//     line-height: normal;
//     margin: 0; /* margin-top 제거 */
//     margin-left: 1vh; /* 아이콘과 텍스트 사이에 여백 추가 */
// `;

const HorizontalLine = styled.div`
    border-top: 0.2vh solid black;  
    width: 100%;
    color: #217EEF;
    margin-top: 1vh;
`;

const ReadyContainer = styled.div`
    width: 100%;
    height: 100%;
`;

export default function Lobby({receivedData}) {
    const [user1, setUser1] = useState("");
    const [user2, setUser2] = useState("");
    const [betPoint,setBetPoint]=useState("");
    const [timeLimit,setTimeLimit]=useState("");

    const roomId=localStorage.getItem(roomId);
    
    const onMessageReceived=(message)=>{
        const parsedMessage=JSON.parse(message.body);
        if(parsedMessage.type==='room_joined'){
            setUser1(parsedMessage.user1);
            setUser2(parsedMessage.user2);
            setBetPoint(parsedMessage.bet_point);
            setTimeLimit(parsedMessage.time_limit);
        }
    };
    
    const {connected, send } = UseStomp(onMessageReceived);
    
    useEffect(() => {
        if (receivedData.type === "room_joined") {
            setUser1(receivedData.user1);
            setUser2(receivedData.user2);
            setBetPoint(receivedData.bet_point);
            setTimeLimit(receivedData.time_limit);
        }
    },[receivedData]);

    useEffect(()=>{
        if(connected&&roomId){
            const message=JSON.stringify({
                type:'room_joined',
                user1,
                user2,
                bet_point:betPoint,
                time_limit:timeLimit
            });
            send(`/send/join_room/${roomId}`,{},message);
        }
    },[connected,send,roomId,user1,user2,betPoint,timeLimit]);
    
    const copyUrlToClipboard = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(`${currentUrl}?roomId=${localStorage.getItem("roomId")}`)
            .then(() => {
                alert('초대 링크가 복사되었습니다.');
            })
            .catch(err => {
                console.error('링크 복사 실패', err);
            });
    };

    return (
        <LobbyForm>
            <LobbyTitle>게임 로비</LobbyTitle>
            <CodeContainer>
                <CopyBtn 
                onClick={() => copyUrlToClipboard()}>
                    <LinkImg className='icon'/>
                    <h2>초대 링크 공유하기</h2>
                </CopyBtn>
            </CodeContainer>
            <HorizontalLine />
            <LobbySubtitle>플레이어</LobbySubtitle>
            <ReadyContainer>
                <Player playermock = {user1} />
                <HorizontalLine />
                <OtherPlayer  playermock = {user2}/>
            </ReadyContainer>
        </LobbyForm>
    );
}
