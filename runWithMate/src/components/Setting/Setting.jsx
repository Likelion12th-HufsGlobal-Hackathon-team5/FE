import styled from '@emotion/styled';

const SettingForm = styled.form`
    width: 85%;
    height: 100%;
    padding: 3vh;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 2vh;
    border: 0.7vh solid #217EEF;
    background: #FFF;
    position: relative;
    top : 6vh;
    left : 4vh;
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
    margin-top : 2.5vh;
`;

const PontInput = styled.input`
    width : 100%;
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
    position : relative;
    right : 8vh; 
    top : 1vh;
`;

const Mypoint = styled.p`
    color: #4B4B4B;
    text-align: right;
    font-family: Inter;
    font-size: 2vh; 
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    align-self: stretch;
    position : relative;
    bottom : 1.5vh;  
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
    background: #FFF;
    color: #217EEF;
    cursor: pointer;

    &:hover {
        background: #217EEF;
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
`
const SaveSetting = styled.button`
    width : 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    gap: 1vh;
    align-self: stretch;
    border-radius: 1vh;
    border: 0.5vh solid #217EEF;
    background: #217EEF;
    color : white;
    margin-top : 2vh;
`
export default function Setting(){
    return(
        <SettingForm>
            <SetTitle>게임 설정</SetTitle>
            <SetSubtitle>배팅 포인트</SetSubtitle>
            <PontInput placeholder='포인트를 입력해주세요 P' />
            <MypointTitle>내 잔여 포인트</MypointTitle>
            <Mypoint>23500P</Mypoint>
            <HorizontalLine />
            <SetSubtitle>시간제한 분</SetSubtitle>
            <ButtonContainer>
                <SettingButton>3분</SettingButton>
                <SettingButton>5분</SettingButton>
                <SettingButton>10분</SettingButton>
                <SettingInput placeholder='수동설정'/>
            </ButtonContainer>
            <SaveSetting>설정 저장</SaveSetting>
        </SettingForm>
    );
}
