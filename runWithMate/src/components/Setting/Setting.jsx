import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import UseStomp from "../../hooks/useStomp";

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
    direction: rtl;
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

const SaveSetting = styled.button`
    width: 100%;
    height: 40px;
    border-radius: 0.6rem;
    border: 0.3rem solid #217EEF;
    background: #217EEF;
    color: white;
`;

export default function Setting({ Mypoint, receivedData, wsInstance }) {
    const [nowDiv, setnowDiv] = useState(false);
    const [betting, setBetting] = useState(0);
    const [initpoint, setInitPoint] = useState(Mypoint || 0);
    const [activeButton, setActiveButton] = useState("");
    const [timeLimit, setTimeLimit] = useState(0);
    const [customTime, setCustomTime] = useState(0);

    const {connected, send, disconnec} = UseStomp(onMessageReceived);

    // settingGame 페이지로 넘어갈때
    // connected가 바뀔때마다
    // localStorage에 저장된 userId가 message로 받은 user1의 아이디와 같다면
    // setNowDiv 상태 유지
    // 아니라면 setnowDiv의 상태를 반대로 설정.
    useEffect(()=>{
        const roomData=JSON.parse(message.body);
        if(localStorage.getItem("userId")===roomData.user1){
            setnowDiv(localStorage.getItem("look"));
            // return;
        }else if(localStorage.getItem("userId")!==roomData.user1){
            setnowDiv(!localStorage.getItem("look"));
        }
    },[connected, betting, timeLimit]);

    useEffect(() => {
        if (receivedData.type === "room_joined") {
            setBetting(receivedData.bet_point);
            setTimeLimit(receivedData.time_limit);
            const button = buttons.find(button => button.id === receivedData.time_limit);
            if (button) {
                setActiveButton(button.id);
                setCustomTime("");
            } else {
                setActiveButton("custom");
                setCustomTime(receivedData.time_limit);
            }
        }
    }, [receivedData]);

    useEffect(() => {
        const bettingValue = betting === '' ? 0 : betting;
        setInitPoint(Mypoint - bettingValue);
    }, [betting, Mypoint]);

    const handleInputChange = (e) => {
        const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
        setBetting(value);
    };

    const handleButtonClick = (id) => {
        setActiveButton(id);
        setTimeLimit(id);
        setCustomTime("");
    };

    const InputTime = (e) => {
        const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10)
        setTimeLimit(value);
        setActiveButton('custom'); // input 액티브 시 버튼 액티브 해제
        setCustomTime(e.target.value);
    };

    const buttons = [
        { id: 180, label: '3분' },
        { id: 300, label: '5분' },
        { id: 600, label: '10분' },
        { id: 'custom', label: '수동\n입력' }
    ];

    // Goto 버튼 클릭시 맨 처음으로 실행됨. setBetting, setTimerLimit 때문.
    // useEffect(()=>{
    //     const data = {
    //         bet_point: betting,
    //         time_limit: timeLimit
    //     };
    //     localStorage.setItem("test01", JSON.stringify(data));
    //     console.log("settingGame - change setting(근데 게임하기 버튼 누르면 이게 출력됨) : ", JSON.parse(localStorage.getItem('test01')));
    // },[setBetting,setTimeLimit]);

    const Sendsetting = () => {
        const localStorage_betPoint=localStorage.getItem("gameResult").bet_point;
        const localStorage_timeLimit=localStorage.getItem("gameResult").time_limit;
        
        const data = {
            bet_point: localStorage_betPoint,
            time_limit: localStorage_timeLimit
        };
        console.log(`update_setting : ${data}`);
        wsInstance("update_setting", data);
    }

    return (
        <>
            <SettingForm>
                {!nowDiv && <HostDiv />}
                <SetTitle>게임 설정</SetTitle>

                <BetPointBox>
                    <SetSubtitle>배팅 포인트</SetSubtitle>
                    <PontInput 
                        placeholder='포인트를 입력해주세요 P' 
                        value={betting} 
                        onChange={handleInputChange} 
                    />
                    <MypointBox>
                        <MypointTitle>내 포인트</MypointTitle>
                        <ViewPoint>{initpoint}P</ViewPoint>
                    </MypointBox>
                </BetPointBox>

                <HorizontalLine />

                <TimeSetBox>
                    <SetSubtitle>시간제한 : {timeLimit} 초</SetSubtitle>
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
                </TimeSetBox>
                <SaveSetting onClick={Sendsetting}>설정 저장</SaveSetting>
            </SettingForm>
        </>
    );
}