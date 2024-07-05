/* eslint-disable react/prop-types */
import Cards from "./Cards";

const CardsGrid = ({ cards, onCardClick }) => {
  return (
    <div className="cardGrid">
      {cards.map((card) => (
        <Cards key={card.id} card={card} onClick={() => onCardClick(card.id)} />
      ))}
    </div>
  );
};

export default CardsGrid;
