/* eslint-disable react/prop-types */
const Cards = ({ card, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <img src={card.image} alt={card.name} />
      <p>{card.name}</p>
    </div>
  );
};

export default Cards;
