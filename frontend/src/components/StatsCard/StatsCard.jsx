import "./StatsCard.css";

function StatsCard({ number, text }) {
  return (
    <div className="stats-card">
      <h2>{number}</h2>
      <p>{text}</p>
    </div>
  );
}

export default StatsCard;