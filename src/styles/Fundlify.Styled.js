import styled from "styled-components";

export const App = styled.div`
    min-height: 100vh;
    color: ${props => props.theme.font};
    background-color: ${props => props.theme.background};
    font-family: 'Poppins', sans-serif;
`;