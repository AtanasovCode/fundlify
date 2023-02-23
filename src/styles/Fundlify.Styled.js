import styled from "styled-components";

export const App = styled.div`
    color: ${props => props.theme.font};
    background-color: ${props => props.theme.background};
    font-family: 'Poppins', sans-serif;
    @media (max-width: 500px) {
        padding-bottom: 80px;
    }
`;