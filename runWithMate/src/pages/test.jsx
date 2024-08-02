import styled from '@emotion/styled';

import UseStomp from '../hooks/useStomp';
import GetMarker from '../components/game/GetMarker';

const Container=styled.div`
    display: flex;
    flex-direction: column;

    font-weight: 900;
`;

function Test(){
    const test = 'dopamine'
    const test2 = 'point'
    return(
        <>
            <Container>
                {/* ws stomp testing
                <UseStomp roomParam='create'/> */}
                getMarker Test
                <GetMarker markerType={test} />
                <GetMarker markerType={test2} />
            </Container>
        </>
    )
}

export default Test;