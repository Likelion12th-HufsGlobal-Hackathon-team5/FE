import { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import useWsInstance from '../hooks/useWsInstance';
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
    const { disconnect } = useWsInstance();
    const navigate = useNavigate();
    const [icon, setIcon] = useState(false);
    const prevIconRef = useRef();
    const isInitialMount = useRef(true);

    const handleIcon = () => {
        setIcon(!icon);
    };
//
    useEffect(() => {
        if (prevIconRef.current !== icon&& location.pathname === '/main' ) {
            console.log('header click event - disconnect');
            disconnect();
            if(localStorage.getItem("roomId")){
                localStorage.clear("look");
                localStorage.clear("roomId");
            }
        }
    }, [icon, disconnect]);

    const handleLoginTrue = () => {
        // setIcon(!icon);
        setIsLogin(true);
    };

    const handleMypage=()=>{
        navigate('/mypage');
    }

    useEffect(() => {
        if (!isInitialMount.current) {
            console.log('header click event - disconnect');
            disconnect();
            if (localStorage.getItem("roomId")) {
                localStorage.removeItem("look");
                localStorage.removeItem("roomId");
            }
        } else {
            isInitialMount.current = false;
        }
    }, [icon, disconnect, location.pathname]);

    return (
        <Container>
            {/* {isLogin ? (
                <Background to='/login' onClick={handleLoginFalse}>
                    <img src={Icon} />
                    <Text>
                        <p>
                            Runs
                            <span className='with'>with</span>
                        </p>
                        <br />
                        Mate<br />
                    </Text>
                </Background>
            ) : (
                <Background to='/main' onClick={handleLoginTrue}>
                    <img src={Icon} />
                    <Text>
                        <p>
                            Run
                            <span className='with'>with</span>
                        </p>
                        <br />
                        Mate<br />
                    </Text>
                </Background>
            )} */}

            {/* <StyledLink to={'/main'}>
                    <Background onClick={handleIcon}>
                        <img src={Icon} /> 
                        <Text>
                            <p>
                                Run
                                <span className='with'>with</span>
                            </p> 
                            <br />
                            Mate<br />
                        </Text>
                    </Background>
                </StyledLink> */}
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

            {/* <StyledLink to='/mypage'>
                <BsPersonFill className='myPage' />
            </StyledLink> */}
            <BsPersonFill onClick={handleMypage} className='myPage' />
        </Container>
    );
}

export default Header;