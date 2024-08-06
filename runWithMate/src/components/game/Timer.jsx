import { useEffect, useState } from "react";
import styled from "@emotion/styled";

const TimeSize = styled.span`
    font-size: 16px;
    font-weight: 700;
    line-height: 1.4;
`;

const getSeconds = (time) => {
    const seconds = Number(time % 60);
    if(seconds < 10) {
        return "0" + String(seconds);
    } else {
        return String(seconds);
    }
}

const Timer = ({timeLimit}) => {
    const [time, setTime] = useState(600)
    
    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [time]);

    useEffect(() => {
        setTime(timeLimit);
    }, [timeLimit]);

    return (
        <div>
            <div>
                <TimeSize>{parseInt(time / 60)}</TimeSize>
                <TimeSize> : </TimeSize>
                <TimeSize>{getSeconds(time)}</TimeSize>
            </div>
        </div>
    );
}

export default Timer;