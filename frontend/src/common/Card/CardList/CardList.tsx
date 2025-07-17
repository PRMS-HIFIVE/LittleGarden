import { CardListContainer } from '@/common/Card/CardList/CardList.styles';
import Card from '@/common/Card/Card';

interface CardItems {
    postId: number;
    title: string;
    content: string;
    date: string;
    image?: string;
    tag?: string[];
    profileImage?: string;
}

interface CardListProps {
    cards: CardItems[];
    navigatePath?: string;
}

const CardList = ({cards, navigatePath = "/community"}: CardListProps) => {

    return (
        <CardListContainer>
            {cards.map((card) => (
                <Card key={card.postId} {...card} navigatePath={navigatePath}/>
            ))}
        </CardListContainer>
    )
}

export default CardList;