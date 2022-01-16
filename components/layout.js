import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="container">
      <div className="header">
        <Link href="/">
          <a className="blog-heading">My Blog</a>
        </Link>
      </div>
      {children}
      <div className="footer">
        <div>My Blog</div>
        <div>(c) 2021 </div>
      </div>
    </div>
  );
}