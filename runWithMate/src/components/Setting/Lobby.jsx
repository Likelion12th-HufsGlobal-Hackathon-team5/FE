import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Player from './Player';
import { BsLink45Deg } from "react-icons/bs";

const LobbyForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 85%;
    gap: 1rem;
    padding: 2rem;
    border-radius: 0.9rem;
    border: 0.3rem solid #217EEF;
    background: #FFF;
`;

const LobbyTitle = styled.h2`
    color: #000;
    font-family: Inter;
    font-size: 3rem; 
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const LobbySubtitle = styled.p`
    color: #000;
    font-family: Inter;
    font-size: 1.5rem; 
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

const LinkImg = styled(BsLink45Deg)`
    font-size: 2rem;
    color: #FFF;
    transition: color 0.3s;
`;

const CopyBtn = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    width: 100%;
    height: 40px;
    padding-left: 0.6rem;
    border: 0.18rem solid #000;
    border-radius: 0.6rem;
    background: #000;

    font-family: Inter;
    font-weight: 700;
    color: #FFF;
    
    &:hover {
        border-radius: 0.6rem;
        border: 0.18rem solid #141414;
        background: #4E4E4E;
    }

    &:active {
        border-radius: 0.48rem;
        background: #FFF;
        color: #000;

        .icon {
            color: black;
        }
    }
`;

const HorizontalLine = styled.div`
    border-top: 0.07rem solid black;  
    width: 100%;
    color: #217EEF;
    margin-top: 0.6rem;
`;

const ReadyContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 100%;
    height: 100%;
    gap: 5px;
`;

export default function Lobby({ receivedData }) {
    const [user1, setUser1] = useState("");
    const [user2, setUser2] = useState("");
    
    useEffect(() => {
        if (receivedData.type === "room_joined") {
            setUser1(receivedData.user1);
            setUser2(receivedData.user2);
        }
    }, [receivedData]);

    const handleCopyURL=()=>{
        navigator.clipboard.writeText(localStorage.getItem('invitedURL'))
            .then(()=>{
                alert('초대 링크가 복사되었습니다.');
            })
            .catch((err)=>{
                console.error('링크 복사 실패 : ',err)
            });
    }

    return (
        <LobbyForm>
            <LobbyTitle>게임 로비</LobbyTitle>
            <CopyBtn onClick={handleCopyURL}>
                <LinkImg className='icon' />
                <p>초대 링크 공유하기</p>
            </CopyBtn>
            <HorizontalLine />
            <LobbySubtitle>플레이어</LobbySubtitle>
            <ReadyContainer>
                <Player 
                    playermock={user1}
                    userType={"방장"}
                />
                <HorizontalLine />
                <Player 
                    playermock={user2} 
                    userType={"참가자"}
                />
            </ReadyContainer>
        </LobbyForm>
    );
}