/* eslint-disable react/prop-types */
const Scoreboard = ({ currentScore, bestScore }) => {
  return (
    <div className="scores">
      <h1>Memory Card</h1>
      <section className="scoresShown">
        <p>Current Score: {currentScore}</p>
        <p>Best Score: {bestScore}</p>
      </section>
    </div>
  );
};

export default Scoreboard;
