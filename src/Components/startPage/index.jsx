const index = ({ onClick }) => {
  return (
    <div
      className="main-theme"
      style={{
        backgroundImage: `url("../../assets/images/main-theme.jpeg")`
      }}
    >
      <button onClick={onClick}>Join Game</button>
    </div>
  );
};

export default index;
