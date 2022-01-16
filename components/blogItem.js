import Link from "next/link";

export default function BlogItem({ title, slug }) {
  return (
    <div className="blog-item">
      <Link href={slug}>
        <a className="blog-item-title">{title}</a>
      </Link>
    </div>
  );
}
