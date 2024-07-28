import styled from '@emotion/styled';

import Categorymap from '../../components/point/CategoryMap';


const Container=styled.div`
    display: flex;
    flex-direction: column;
`;

function PointShop(){

    return(
        <>
            <Container>
                {/* pointshop */}
                <Categorymap />
            </Container>
        </>
    )
};

export default PointShop;