import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Icon from '/img/NoBgIcon.png';
import { BsPersonFill } from 'react-icons/bs';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border-bottom: 3px solid #2E2929;

    .myPage {
        /* margin-left: 10vh; */
        margin-left: 8rem;
        /* margin-right: 3vh; */
        margin-right: 3rem;
        width:4rem;
        height: auto;
        color: #2E2929;
    }
`;

const Background = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    padding: 1.5vh;
    flex-wrap: wrap;
    gap: 1.2vw;
    color: white;
    font-weight: 700;
    width: 110%;
    background-color: #2E2929;
    clip-path: polygon(0 0, 60% 0, 70% 100%, 0% 100%);

    img {
        margin-left: 1vh;
        width: 4.5vh;
        height: auto;
    }
`;

const Text = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    font-size: 18px;
    text-align: left;
    line-height: 0.65;
    height: auto;

    p {
        font-size: 18px;
    }

    .with {
        font-size: 10px;
    }
`;

const StyledLink = styled(Link)`
    display: flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;
    margin: 0;
    width: 100%;

    flex-wrap: wrap;
    gap: 1rem;
`;

function Header() {
    const navigate = useNavigate();
    const [icon, setIcon] = useState(false);

    const handleIcon = () => {
        setIcon(!icon);
    };

    const handleMypage=()=>{
        navigate('/mypage');
    }

    return (
        <Container>
            <Background onClick={handleIcon}>
                <StyledLink to={'/main'}>
                    <img src={Icon} /> 
                    <Text>
                        <p>
                            Run
                            <span className='with'>with</span>
                        </p> 
                        <br />
                         Mate<br />
                    </Text>
                </StyledLink>
            </Background>
            <BsPersonFill onClick={handleMypage} className='myPage' />
        </Container>
    );
}

export default Header;