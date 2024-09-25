import "./Die.css";

const Die = ({ id, value, isHeld, holdDice }) => {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "white",
  };

  const dots = () => {
    switch (value) {
      case 1:
        return <div className="dot dot-center"></div>;
      case 2:
        return (
          <>
            <div className="dot dot-top-left"></div>
            <div className="dot dot-bottom-right"></div>
          </>
        );
      case 3:
        return (
          <>
            <div className="dot dot-top-left"></div>
            <div className="dot dot-center"></div>
            <div className="dot dot-bottom-right"></div>
          </>
        );
      case 4:
        return (
          <>
            <div className="dot dot-top-left"></div>
            <div className="dot dot-top-right"></div>
            <div className="dot dot-bottom-left"></div>
            <div className="dot dot-bottom-right"></div>
          </>
        );
      case 5:
        return (
          <>
            <div className="dot dot-top-left"></div>
            <div className="dot dot-top-right"></div>
            <div className="dot dot-center"></div> 
            <div className="dot dot-bottom-left"></div>
            <div className="dot dot-bottom-right"></div>
          </>
        );
      case 6:
        return (
          <>
            <div className="dot dot-top-left"></div>
            <div className="dot dot-center-left"></div>
            <div className="dot dot-bottom-left"></div>
            <div className="dot dot-top-right"></div>
            <div className="dot dot-center-right"></div>
            <div className="dot dot-bottom-right"></div>
          </>
        );
      default:
    }
  };

  return (
    <button onClick={() => holdDice(id)} style={styles} className="die-button">
      <div className="dots-container">{dots()}</div>
    </button>
  );
};

export default Die;
