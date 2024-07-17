import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;

    flex-wrap: wrap;
    /* gap:1vw; */
`;

const Content = styled.div`
    position: relative;
    width: 100%;
    /* max-width: 428px; */
    max-width: 393px;
    min-height: 100vh;
    overflow: auto;
    box-shadow: 0px 0px 32px #0000002f;
    background-color: #ffffff;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    padding: 25px;
`;


const Logo = styled.img`
    width: 135px;
    height: 60px;
`;

const Footer = styled.div`
    position: absolute;
    bottom: 0;
    display: flex;

    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:1vw 0vw;
    
`;

const Text = styled.div`
    width: 100%;
    text-align: center;

    font-weight: 500;
    color:${({theme})=>theme.colors.black};
`;

const Mobile = () => {
    const navigate=useNavigate();

    const location = useLocation();
    
    return (
        <>
            <Container>
                <Content>
                    <Outlet />
                </Content>
            </Container>
        </>
    );
};

export default Mobile;