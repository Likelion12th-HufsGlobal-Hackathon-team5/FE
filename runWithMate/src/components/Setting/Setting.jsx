import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const HostDiv = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(128, 128, 128, 0.5);
    z-index: 1; 
`;

const SettingButton = styled.div`
    background: ${props => props.active ? "#217EEF" : "#FFF"};
    color: ${props => props.active ? "#FFF" : "#217EEF"};
    width: 100%;
    padding: 0.8vh 1.1vh;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5vh;
    border: 0.1vh solid #217EEF;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s, border 0.3s;
    font-size: 2vh;

    &:hover {
        background: #1B63BB;
        color: #FFF;
    }
`;

const SettingForm = styled.form`
    width: 85%;
    height: 100%;
    padding: 3vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 2vh;
    border: 0.7vh solid #217EEF;
    background: #FFF;
    position: relative;
    top: 6vh;
    left: 4vh;
`;

const SetTitle = styled.h2`
    color: #000;
    font-family: Inter;
    font-size: 4vh;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const SetSubtitle = styled.p`
    color: #000;
    font-family: Inter;
    font-size: 2vh;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-top: 2.5vh;
`;

const PontInput = styled.input`
    width: 100%;
    padding: 2vh;
    justify-content: flex-end;
    align-items: center;
    align-self: stretch;
    border-radius: 1vh;
    border: 0.2vh solid black;
    direction: rtl;
    color: #217EEF;

    &:hover {
        border: 0.2vh solid #217EEF;
    }
`;

const MypointTitle = styled.p`
    color: #4B4B4B;
    text-align: right;
    font-family: Inter;
    font-size: 1.2vh;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    align-self: stretch;
    position: relative;
    right: 8vh;
    top: 1vh;
`;

const ViewPoint = styled.p`
    color: #4B4B4B;
    text-align: right;
    font-family: Inter;
    font-size: 2vh;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    align-self: stretch;
    position: relative;
    bottom: 1.5vh;
`;

const HorizontalLine = styled.div`
    border-top: 0.1vh solid black;
    width: 100%;
    color: #217EEF;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1.5vh;
    margin-top: 1vh;
`;

const SettingInput = styled.input`
    width: 100%;
    padding: 1.5vh 2vh;
    margin-top: 1vh;
    justify-content: center;
    align-items: center;
    border-radius: 0.5vh;
    border: 0.1vh solid #217EEF;
    background: #FFF;
    color: #217EEF;
    font-size: 2vh;
    display: ${props => props.show ? 'block' : 'none'};
`;

const SaveSetting = styled.button`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    gap: 1vh;
    align-self: stretch;
    border-radius: 1vh;
    border: 0.5vh solid #217EEF;
    background: #217EEF;
    color: white;
    margin-top: 2vh;
`;

export default function Setting({ Mypoint, receivedData, wsInstance }) {
    const [nowDiv, setnowDiv] = useState(false);
    const [betting, setBetting] = useState(0);
    const [initpoint, setInitPoint] = useState(Mypoint);
    const [activeButton, setActiveButton] = useState("");
    const [timeLimit, setTimeLimit] = useState(0);
    const [customTime, setCustomTime] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        setnowDiv(localStorage.getItem("look"));
        localStorage.removeItem("look");
    }, []);

    useEffect(() => {
        if (receivedData.type === "room_joined") {
            setBetting(receivedData.bet_point);
            setTimeLimit(receivedData.time_limit);
            const button = buttons.find(button => button.id * 1000 === receivedData.time_limit);
            if (button) {
                setActiveButton(button.id);
                setCustomTime("");
            } else {
                setActiveButton("custom");
                setCustomTime(receivedData.time_limit);
            }
        }
    }, [receivedData]);

    const handleInputChange = (e) => {
        const value = e.target.value === '' ? '' : parseInt(e.target.value, 10);
        setBetting(value);
    };

    useEffect(() => {
        const bettingValue = betting === '' ? 0 : betting;
        setInitPoint(Mypoint - bettingValue);
    }, [betting, Mypoint]);

    const handleButtonClick = (id) => {
        setActiveButton(id);
        setTimeLimit(id * 1000);
        setCustomTime("");
    };

    const InputTime = (e) => {
        const value = e.target.value === '' ? '' : parseInt(e.target.value, 10)
        setTimeLimit(value);
        setActiveButton('custom'); // input 액티브 시 버튼 액티브 해제
        setCustomTime(e.target.value);
    };

    const buttons = [
        { id: 180, label: '3분' },
        { id: 300, label: '5분' },
        { id: 600, label: '10분' },
        { id: 'custom', label: '수동입력' }
    ];

    const Sendsetting = () => {
        const data = {
            bet_point: betting,
            time_limit: timeLimit
        };
        wsInstance("update_setting", data);
    }

    return (
        <>
            <SettingForm>
                {!nowDiv && <HostDiv />}
                <SetTitle>게임 설정</SetTitle>
                <SetSubtitle>배팅 포인트</SetSubtitle>
                <PontInput 
                    placeholder='포인트를 입력해주세요 P' 
                    value={betting} 
                    onChange={handleInputChange} 
                />
                <MypointTitle>내 잔여 포인트</MypointTitle>
                <ViewPoint>{initpoint}P</ViewPoint>
                <HorizontalLine />
                <SetSubtitle>시간제한</SetSubtitle>
                <ButtonContainer>
                    {buttons.map(button => (
                        <SettingButton 
                            key={button.id}
                            active={activeButton === button.id}
                            onClick={() => handleButtonClick(button.id)}
                        >
                            {button.label}
                        </SettingButton>
                    ))}
                </ButtonContainer>
                <SettingInput
                    placeholder='수동설정 (초)'
                    value={customTime}
                    onChange={InputTime}
                    show={activeButton === 'custom'}
                />
                <SaveSetting onClick={Sendsetting}>설정 저장</SaveSetting>
            </SettingForm>
        </>
    );
}