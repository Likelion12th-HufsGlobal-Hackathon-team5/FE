import styled from '@emotion/styled';

import Map from '../../components/game/Map';
import GameInfo from '../../components/game/GameInfo';
import GameRanking from '../../components/game/GameRanking';

const Container=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    /* background-color: red; */
`;

function Game(){

    return(
        <>
            <Container>
                <GameInfo />
                <Map />
                <GameRanking />
            </Container>
        </>
    )
}

export default Game;