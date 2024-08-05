import {useRef, useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';

import UseStomp from '../hooks/useStomp';

import Icon from '/img/NoBgIcon.png';
import { BsHouseDoorFill,BsPersonFill } from 'react-icons/bs';

const Container=styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    border-bottom: 3px solid #2E2929;

    .Home{
        /* margin-right: 3vh; */
        margin-left: 5vh;
        width: 24px;
        height: auto;

        color: #2E2929;
        /* background-color: red; */
    }

    .myPage{
        margin-right: 3vh;
        width: 24px;
        height: auto;

        color: #2E2929;
    }
`;
// const Background=styled.div`
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//     justify-content: left;

//     padding: 1.5vh;

//     flex-wrap: wrap;
//     gap:1.2vw;

//     color: white;
//     font-weight: 700;

//     width: 60%;
//     background-color: #2E2929;
//     clip-path: polygon(0 0, 60% 0, 70% 100%, 0% 100%);
  
//     img{
//         margin-left: 1vh;

//         width: 4.5vh;
//         height: auto;
//     }
// `;
const Background=styled(Link)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;

    padding: 1.5vh;

    flex-wrap: wrap;
    gap:1.2vw;

    color: white;
    font-weight: 700;

    width: 60%;
    background-color: #2E2929;
    clip-path: polygon(0 0, 60% 0, 70% 100%, 0% 100%);
  
    img{
        margin-left: 1vh;

        width: 4.5vh;
        height: auto;
    }
`;
const Text=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;

    font-size: 18px;
    text-align: left;
    line-height: 0.65;
    height: auto;
    p{
        font-size: 18px;
    }
    .with{
        font-size: 10px;
    }
`;
const StyledLink=styled(Link)`
    display: flex;
    justify-content: center;

    text-decoration: none;
    margin: 0;
`;

function Header(){
    const location = useLocation();
    const { disconnect } = UseStomp();

    const [icon, setIcon] = useState(false);
    const prevIconRef = useRef();
    const isInitialMount = useRef(true);

    const [isLogin,setIsLogin]=useState(false);

    
    const handleLoginFalse = () => {
        if(!localStorage.getItem('userId')){
            alert('먼저 로그인을 하셔야합니다!');
            navigate('/login');
        }
        setIcon(!icon);
        setIsLogin(prevState => !prevState);
    };

    const handleLoginTrue=()=>{
        setIcon(!icon);
    }
    useEffect(() => {
        if (prevIconRef.current !== icon&& location.pathname === '/main' ) {
            console.log('header click event - disconnect');
            disconnect();
            if(localStorage.getItem("roomId")){
                localStorage.removeItem("look");
                localStorage.removeItem("roomId");
                // localStorage.clear("useSTomp-getMessage");
            }
        }
    }, [icon, disconnect]);
    
    return(
        <>
            <Container>
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
                {!isLogin?(
                    <Background to={'/main'} onClick={handleLoginTrue}>
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
                ):(
                    <Background to={'/login'} onClick={handleLoginFalse}>
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
                )}
                {/* <StyledLink to={'/main'} onClick={handleIcon}>
                    <BsHouseDoorFill className='Home'/>
                </StyledLink> */}
                <StyledLink to={'/mypage'}>
                    <BsPersonFill className='myPage'/>
                </StyledLink>
            </Container>
        </>
    )
}

export default Header;