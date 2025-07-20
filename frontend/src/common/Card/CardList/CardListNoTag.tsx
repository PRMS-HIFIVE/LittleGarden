import { CardListContainer } from '@/common/Card/CardList/CardList.styles';
import CardNoTag from '@/common/Card/CardNoTag';

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

const CardListNoTag = ({cards, navigatePath = "/community"}: CardListProps) => {
    console.log("CardList cards:", cards.map(card => card.postId));


    return (
        <CardListContainer>
            {cards.map((card) => (
                <CardNoTag key={card.postId} {...card} navigatePath={navigatePath}/>
                
            ))}
        </CardListContainer>
        
    )
}


export default CardListNoTag;