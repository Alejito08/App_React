function Tortuga({ posicion }) {
  return (
    <div 
      className="tortuga" 
      style={{ transform: `translateX(${posicion}px)` }}
    >
      🧟‍♂️
    </div>
  );
}

export default Tortuga;
