import { CardListContainer } from '@/common/Card/CardList/CardList.styles';
import Card from './../Card';

interface CardItems {
    title: string;
    content: string;
    date: string;
    image?: string;
    tag?: string[];
    profileImage?: string;
}

interface CardListProps {
    cards: CardItems[];
}

const CardList = ({cards}: CardListProps) => {

    return (
        <CardListContainer>
            {cards.map((card, i) => (
                <Card key={i} {...card} />
            ))}
        </CardListContainer>
    )
}

export default CardList;