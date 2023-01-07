export const Button = ({ onClick, children }) => {
  return (
    <>
      <button onClick={onClick}>{children}</button>
      <style jsx>{`
        button {
          position: relative;
          border-radius: 25px;
          border: 2px solid #fff;
          background: transparent;
          width: 100%;
          height: 100%;
          cursor: pointer;
          font-weight: 600;
          font-size: 20px;
          color: #fff989;
        }
      `}</style>
    </>
  );
};
