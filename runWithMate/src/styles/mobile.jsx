import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    /* flex-wrap: wrap; */
    /* gap:1vw; */
    &::-webkit-scrollbar {
    display: none;
  }
`;

const Content = styled.div`
    position: relative;
    width: 100%;
    max-width: 393px;
    max-height: 100vh;
    box-shadow: 0px 0px 32px #0000002f;
    
    overflow-x: hidden;
    overflow-y: scroll;
    &::-webkit-scrollbar {
    display: none;
  }
`;

const Mobile = () => {
    
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