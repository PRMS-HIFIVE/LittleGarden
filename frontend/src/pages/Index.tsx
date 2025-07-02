import styled from "styled-components";
import Main from "./Main/Main";
import Footer from "@/common/Footer";
import type { PlantInfo } from '../App';

interface IndexProps {
    plants: PlantInfo[];
    setPlants: React.Dispatch<React.SetStateAction<PlantInfo[]>>;
}

function Index({ plants }: IndexProps) {

    return (
        <IndexWrapper>
            <header>
                헤더 영역
            </header>
            <Main plants={plants} />
            <Footer />

        </IndexWrapper>
    )
}

const IndexWrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;

    margin-left: 16px;
    margin-right: 16px;

    @media screen and (min-width: 1024px){ 
        width: 360px;
        margin: 0 auto;
        border: 1px solid black;
    }
`

export default Index;