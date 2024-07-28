import styled from '@emotion/styled';

import UseStomp from '../hooks/useStomp';

const Container=styled.div`
    display: flex;
    flex-direction: column;

    font-weight: 900;
`;

function Test(){

    return(
        <>
            <Container>
                ws stomp testing
                <UseStomp roomParam='create'/>
            </Container>
        </>
    )
};

export default Test;