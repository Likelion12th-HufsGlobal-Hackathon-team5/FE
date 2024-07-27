import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

import Icon from '../assets/images/NoBgIcon.png';
import { BsHouseDoorFill } from 'react-icons/bs';

const Container=styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    border-bottom: 3px solid #2E2929;

    .Home{
        margin-right: 3vh;

        width: 24px;
        height: auto;

        color: #2E2929;
    }
`;
const Background=styled.div`
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

    useEffect(()=>{
        if(location.pathname==='/main'){
            localStorage.clear();
        }
    },[location.pathname]);

    return(
        <>
            <Container>
                <Background>
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
                <StyledLink to={'/'}>
                    <BsHouseDoorFill className='Home'/>
                </StyledLink>
            </Container>
        </>
    )
};

export default Header;