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
const MapContainer=styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

function Game(){

    return(
        <>
            <Container>
                <GameInfo />
                <MapContainer>
                    <Map />
                </MapContainer>
                <GameRanking />
            </Container>
        </>
    )
}

export default Game;