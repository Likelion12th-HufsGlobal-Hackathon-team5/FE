import styled from '@emotion/styled'
import Header from '../../components/Header';
import LogoutIcon from '/img/LogoutIcon.png';
import { MdNavigateNext } from "react-icons/md";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    flex-wrap: wrap;
    gap: 16px;

    min-height: 889px;
    max-height: 100vh;
`;

const Logout = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;

    padding: 4vh 4vh;
    width: 80%;

    color: white;
    background-color: #2E2929;
    border-radius: 15px;
    cursor: pointer;

    .logoutIcon {
        width: 38px;
        height: auto;
    }
`;

const LogoutText = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 1vh;

    margin-left: 3vh;
    text-align: left;
    line-height: 1.2;
`;

const LogoutHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    flex-wrap: wrap;
    gap: 1vh;
    font-size: 20px;
    font-weight: 650;
`;

function Mypage() {
    return (
        <>
            <Container>
                <Header />
                <Logout>
                    <img src={LogoutIcon} className='logoutIcon' />
                    <LogoutText>
                        <LogoutHeader>
                            로그아웃 하기
                            <MdNavigateNext size={15} />
                        </LogoutHeader>
                        카카오 계정을 로그아웃 합니다. 
                    </LogoutText>
                </Logout>
            </Container>
        </>
    )
}

export default Mypage;
