import styled from '@emotion/styled'
import Header from '../../components/Header';

const Container=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
function Main (){

    return(
        <>
            <Container>
                <Header />
                main 페이지
            </Container>        
        </>
    )
}

export default Main;