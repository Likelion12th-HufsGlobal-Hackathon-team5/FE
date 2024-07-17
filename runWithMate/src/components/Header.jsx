import { Link } from 'react-router-dom'
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
        margin-right: 2vw;

        width: 24px;
        height: auto;

        color: #2E2929;
    }
`;
const Background=styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 1vw 1.5vw;

    flex-wrap: wrap;
    gap:1vw;

    color: white;
    font-weight: 700;

    width: 70%;
    background-color: #2E2929;
    clip-path: polygon(0 0, 60% 0, 70% 100%, 0% 100%);
  
    img{
        margin-left: 0.7vw;

        width: 4vw;
        height: auto;
    }
`;
const Text=styled.div`
    display: flex;
    flex-direction: column;

    font-size: 18px;
    text-align: left;
    line-height: 0.6;

    .with{
        font-size: 10px;
    }
`;

function Header(){

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
                <Link to={'/'} style={ { margin:0} } >
                    <BsHouseDoorFill className='Home'/>
                </Link>
            </Container>
        </>
    )
};

export default Header;