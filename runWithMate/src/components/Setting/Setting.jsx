import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

const SettingForm = styled.form`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    border-radius: 1.2rem;
    border: 0.4rem solid #217EEF;
    background: #FFF;

    width: 85%;
    padding: 2rem;
    gap: 1rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-top: 0.6rem;
`;

const HostDiv = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(128, 128, 128, 0.5);
    z-index: 1;
    margin: -2rem;
`;

const MypointBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    width: 100%;
    gap: 1rem;
`;

const BetPointBox = styled.div`
    display: flex;
    flex-direction: column;
    
    width: 100%;
    gap: 1rem;
`;

const TimeSetBox = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    gap: 1rem;
`;

//----
const SetTitle = styled.h2`
    color: #000;
    font-family: Inter;
    font-size: 3rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const SetSubtitle = styled.p`
    color: #000;
    font-family: Inter;
    font-size: 1.7rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-top: 1.5rem;
`;

const PontInput = styled.input`
    width: 100%;
    padding: 1.2rem;
    border-radius: 0.6rem;
    border: 0.12rem solid black;
    color: #217EEF;

    &:hover {
        border: 1px solid #217EEF;
    }
`;

const SettingButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    
    width: 100%;
    height: 40px;
    border-radius: 0.3rem;
    border: 0.07rem solid #217EEF;
    background: ${props => props.active ? "#217EEF" : "#FFF"};

    color: ${props => props.active ? "#FFF" : "#217EEF"};
    font-size: 1.2rem;

    cursor: pointer;
    transition: background-color 0.3s, color 0.3s, border 0.3s;

    &:hover {
        background: #1B63BB;
        color: #FFF;
    }
`;

const MypointTitle = styled.p`
    color: #4B4B4B;
    text-align: right;
    font-family: Inter;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const ViewPoint = styled(MypointTitle)`
    
`

const HorizontalLine = styled.div`
    border-top: 0.07rem solid black;
    width: 100%;
    color: #217EEF;
`;

const SettingInput = styled.input`
    width: 100%;
    padding: 1rem 1.2rem;
    margin-top: 0.6rem;
    border-radius: 0.3rem;
    border: 0.07rem solid #217EEF;
    background: #FFF;
    color: #217EEF;
    font-size: 1.2rem;
    display: ${props => props.show ? 'block' : 'none'};
`;

const SaveSetting = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 40px;

    color: white;
    font-size: 20px;
    font-weight: 400;

    background: #217EEF;
    border-radius: 0.6rem;    
    &:hover{
        transition: background-color 0.3s, color 0.3s, border 0.2s;
        background: #1B63BB;
    }
    &:active{
        transition: background-color 0.3s, color 0.3s, border 0.2s, font 0.2s;
        font-weight: 600;
        background: #217EEF;
        border: 0.3rem solid #1B63BB;
    }
`;

export default function Setting({ betPoint, setBetPoint, receivedData, wsInstance }) {
    const [nowDiv, setnowDiv] = useState(localStorage.getItem('look'));
    const [initPoint, setInitPoint] = useState(0);
    
    const [activeButton, setActiveButton] = useState("");
    const [timeLimit, setTimeLimit] = useState(0);
    const [customTime, setCustomTime] = useState("");

    useEffect(() => {
        if (receivedData.type === "room_joined") {
            setTimeLimit(receivedData.time_limit);
            setInitPoint(receivedData.user1_point);
            const button = buttons.find(button => button.id === receivedData.time_limit);
            if (button) {
                setActiveButton(buttons.id);
                setCustomTime("");
            } else {
                setActiveButton("custom");
                // setCustomTime(receivedData.time_limit);
                setCustomTime(receivedData.time_limit ? receivedData.time_limit.toString() : "");
            }
        }
    }, [receivedData]);

    useEffect(() => {
        if (receivedData.type === "room_updated") {
            setBetPoint(receivedData.bet_point);
            setTimeLimit(receivedData.time_limit);
            const button = buttons.find(button => button.id === receivedData.time_limit);
            if (button) {
                setActiveButton(buttons.id);
                setCustomTime("");
            } else {
                setActiveButton("custom");
                // setCustomTime(receivedData.time_limit);
                setCustomTime(receivedData.time_limit ? receivedData.time_limit.toString() : "");
            }
        }
    }, [receivedData]);

    const handleInputChange = (e) => {
        const value = e.target.value;
    
        // 숫자로 변환 가능한지 확인
        if (/^\d*$/.test(value)) {
            const inputValue = value === '' ? 0 : parseInt(value, 10); // const 키워드로 변경
            setBetPoint(inputValue); // inputValue로 setBetting 호출
        }
    };
    
    const InputTime = (e) => {
        const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10)
        setTimeLimit(value);
        setActiveButton('custom'); // input 액티브 시 버튼 액티브 해제
        setCustomTime(e.target.value);
    };
    
    const handleSettingSave = (id) => {
        setActiveButton(id);
        setTimeLimit(id);
        setCustomTime("");
    };

    const buttons = [
        { id: 180, label: '3분' },
        { id: 300, label: '5분' },
        { id: 600, label: '10분' },
        { id: 'custom', label: '수동\n입력' }
    ];

    const Sendsetting = () => {
        wsInstance("update_room", { bet_point: betPoint, time_limit: timeLimit });
    }

    

    return (
        <>
            <SettingForm>
                {!nowDiv && <HostDiv />}
                <SetTitle>게임 설정</SetTitle>

                <BetPointBox>
                    <SetSubtitle>배팅 포인트</SetSubtitle>
                    <PontInput 
                        type="text"
                        placeholder='포인트를 입력해주세요 P' 
                        value={betPoint === 0 ? '' : betPoint}
                        onChange={handleInputChange} 
                    />
                    <MypointBox>
                        <MypointTitle>방장 포인트</MypointTitle>
                        <ViewPoint>{initPoint-betPoint}P</ViewPoint>
                    </MypointBox>
                </BetPointBox>

                <HorizontalLine />

                <TimeSetBox>
                    <SetSubtitle>시간제한 : {timeLimit} 초</SetSubtitle>
                    <ButtonContainer>
                        {buttons.map(buttons => (
                            <SettingButton 
                                key={buttons.id}
                                active={activeButton === buttons.id}
                                onClick={() => handleSettingSave(buttons.id)}
                            >
                                {buttons.label}
                            </SettingButton>
                        ))}
                    </ButtonContainer>
                    <SettingInput
                        placeholder='수동설정 (초)'
                        value={customTime}
                        onChange={InputTime}
                        show={activeButton === 'custom'}
                    />
                </TimeSetBox>
                <SaveSetting Role = "button" onClick={Sendsetting}>설정 저장</SaveSetting>
            </SettingForm>
        </>
    );
}