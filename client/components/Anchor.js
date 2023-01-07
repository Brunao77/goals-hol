import Link from "next/link";
export const Anchor = ({ children, href, width, height, query }) => {
  return (
    <>
      <Link href={{ pathname: href, query }} legacyBehavior>
        <a>{children}</a>
      </Link>
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
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  );
};
