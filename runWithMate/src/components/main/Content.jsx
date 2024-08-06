import styled from '@emotion/styled';

import BrainIcon from '/img/brainIcon.png';
import { FaRunning } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";

const ContentsBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;

    padding: 20px;

    width: 80%;
    border: 2.5px solid #AEAEB2;
    border-radius: 10px;

    font-size: 13px;
    font-weight: 400;
    line-height: 1.2;
`;
const Point = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    flex-wrap: wrap;
    gap: 8px;
    padding: 20px 5px;
`;
const Circle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 47px;
    height: 47px;
    padding: 10px;

    color: white;
    background-color: #2E2929;
    border-radius: 100%;

    .run {
        width: 22px;
        height: 28px;
    }
    .people {
        width: 38px;
        height: 28.5px;
    }
    .brain {
        width: 28px;
        height: 25px;
    }
`;
const PointText = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;

    flex-wrap: wrap;
    gap: 2px;

    p {
        font-weight: 700;
        font-size: 15.5px;
    }

    font-size: 13px;
`;

const Content=()=>{

    return(
        <>
            <ContentsBox>
                    경쟁은 간혹 부정적인 의미로 많이 남죠.<br />
                    하지만 잘 갖춰진 경쟁의 세계는<br />
                    오히려 긍정적인 효과를 극대화시킬 수 있습니다!
                    <Point>
                        <Circle>
                            <FaRunning className='run' />
                        </Circle>
                        <PointText>
                            <p>일단 뛰세요!</p>
                            너, 너무 게을러.
                        </PointText>
                    </Point>
                    <Point>
                        <Circle>
                            <IoPeople className='people' />
                        </Circle>
                        <PointText>
                            <p>친구와 함께해서 더 재밌게!</p>
                            당신...친구 없어?
                        </PointText>
                    </Point>
                    <Point>
                        <Circle>
                            <img src={BrainIcon} className='brain' />
                        </Circle>
                        <PointText>
                            <p>도파민을 자극합니다</p>
                            건강한 도파민 자극!
                        </PointText>
                    </Point>
                </ContentsBox>
        </>
    )
}

export default Content;