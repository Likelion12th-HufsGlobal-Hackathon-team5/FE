import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

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
    gap: 1.5vh;
    margin-top: 1vh;
`;

const SettingButton = styled.button`
    width: 100%;
    padding: 0.8vh 1.1vh;
    justify-content: center;
    align-items: center;
    border-radius: 0.5vh;
    border: 0.1vh solid #217EEF;
    background: ${props => (props.active ? '#217EEF' : '#FFF')};
    color: ${props => (props.active ? '#FFF' : '#217EEF')};
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s, border 0.3s;

    &:hover {
        background: #1B63BB;
        color: #FFF;
    }
`;

const SettingInput = styled.input`
    width: 100%;
    padding: 1vh 1vh;
    justify-content: center;
    align-items: center;
    gap: 1vh;
    border-radius: 0.5vh;
    border: 0.1vh solid #217EEF;
    background: #FFF;
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

export default function Setting({ Mypoint, setMypoint , setActiveButton , activeButton}) {
    const [betting, setBetting] = useState('');
    const [initpoint, setinitpoint] = useState(Mypoint);

    const handleInputChange = (e) => {
        const value = e.target.value === '' ? '' : parseInt(e.target.value, 10);
        setBetting(value);
    };

    useEffect(() => {
        const bettingValue = betting === '' ? 0 : betting;
        setinitpoint(Mypoint - bettingValue);
    }, [betting, Mypoint]);

    const handleButtonClick = (id) => {
        setActiveButton(id); // 클릭된 버튼의 ID를 상태로 설정
        console.log(activeButton);
    };

    return (
        <SettingForm>
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
            <SetSubtitle>시간제한 분</SetSubtitle>
            <ButtonContainer>
                <SettingButton 
                    id='Three'
                    active={activeButton === 'Three'} // 활성화된 버튼에 대한 스타일 적용
                    onClick={() => handleButtonClick('Three')}
                >
                    3분
                </SettingButton>
                <SettingButton 
                    id='Five'
                    active={activeButton === 'Five'}
                    onClick={() => handleButtonClick('Five')}
                >
                    5분
                </SettingButton>
                <SettingButton 
                    id='Ten'
                    active={activeButton === 'Ten'}
                    onClick={() => handleButtonClick('Ten')}
                >
                    10분
                </SettingButton>
                <SettingInput placeholder='수동설정' />
            </ButtonContainer>
            <SaveSetting>설정 저장</SaveSetting>
        </SettingForm>
    );
}
