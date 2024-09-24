import "./Die.css";

const Die = ({id, value,isHeld, holdDice}) => {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "white",
  };

  return (
    <button onClick={()=>holdDice(id)}style={styles} className="die-button">
      {value}
    </button>
  );
};

export default Die;
