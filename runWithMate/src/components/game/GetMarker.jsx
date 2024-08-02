import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
    z-index: 10;
    
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;

    position: absolute;
    top: 15%;

    width: 50%;

    margin-top:10%;
    padding: 25px 18px;

    color: white;
    font-size: 24px;
    font-weight: 900;

    background-color: ${props => 
        props.setType ? '#2DEE9B' : '#217EEF'};
    border-radius: 15px;
    box-shadow: 0 0px 10px rgba(0, 0, 0, 0.25);

    opacity: ${props => props.isVisible ? 1:0};
    transition: opacity 0.5s ease-out;

    p{
        margin-left: 1vh;
        color: white;
        font-size: 24px;
        font-weight: 900;
    }
`;

function GetMarker({ markerType }) {
    const [type, setType] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (markerType === 'point') {
            setType(true);
            setIsVisible(true);
        } else if (markerType === 'dopamine') {
            setType(false);
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [markerType]);

    // useEffect(() => {
    //     if (isVisible) {
    //         const timer = setTimeout(() => {
    //             setIsVisible(false);
    //         }, 1500);
    //         return () => clearTimeout(timer);
    //     }
    // }, [isVisible]);

    if(!isVisible) return null;

    return (
        <Container 
            type={type ? 'point' : 'dopamine'}
            setType={type}
            isVisible={isVisible}
            >
            + 100
            {type ? <p>포인트</p> : <p>도파민</p>}
        </Container>
    );
}

export default GetMarker;
