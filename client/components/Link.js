export const Link = ({ children, href, width, height }) => {
  return (
    <>
      <a href={href}>{children}</a>
      <style jsx>{`
        a {
          border-radius: 25px;
          border: 2px solid #fff;
          background: transparent;
          width: ${width};
          height: ${height};
          cursor: pointer;
          font-weight: 600;
          font-size: 20px;
          color: #fff989;
          text-decoration: none;
          text-align: center;
          line-height: none;
          vertical-align: middle;
        }
      `}</style>
    </>
  );
};
