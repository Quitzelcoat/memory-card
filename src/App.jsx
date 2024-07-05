import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import Scoreboard from "./components/Scoreboard";
import CardsGrid from "./components/CardGrid";
import "./App.css";

function App() {
  const [cards, setCards] = useState([]);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);

  useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=12",
        {
          mode: "cors",
        }
      );
      const data = await response.json();
      const pokemonPromises = data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url, { mode: "cors" });
        const pokeData = await res.json();
        return {
          id: uuidv4(),
          image: pokeData.sprites.front_default,
          name: pokeData.name,
        };
      });
      const cardData = await Promise.all(pokemonPromises);
      setCards(cardData);
    };

    fetchImage();
  }, []);

  const shuffleCards = useCallback(() => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
  }, [cards]);

  useEffect(() => {
    shuffleCards();
  }, [cards, shuffleCards]);

  const handleCardClick = (cardId) => {
    if (clickedCards.includes(cardId)) {
      if (currentScore > bestScore) {
        setBestScore(currentScore);
      }
      setCurrentScore(0);
      setClickedCards([]);
      shuffleCards();
    } else {
      setClickedCards([...clickedCards, cardId]);
      setCurrentScore(currentScore + 1);
    }
    shuffleCards();
  };

  return (
    <>
      <Scoreboard currentScore={currentScore} bestScore={bestScore} />
      <CardsGrid cards={shuffledCards} onCardClick={handleCardClick} />
    </>
  );
}

export default App;
