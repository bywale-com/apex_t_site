import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  extractBodyText,
  fetchPostBySlug,
  formatBlogDate,
  getSanityImageUrl,
  type SanityPost,
} from "../lib/blog";

export default function NewsArticle() {
  const { slug = "" } = useParams();
  const [post, setPost] = useState<SanityPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchPostBySlug(slug)
      .then((item) => {
        if (!mounted) return;
        setPost(item);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [slug]);

  const paragraphs = post ? extractBodyText(post) : [];
  const heroImage = post ? getSanityImageUrl(post.image, 1600, 900) : null;

  return (
    <>
      <Navbar />
      <main className="page-news-outer page-first-section">
        <section className="section" style={{ maxWidth: 980, margin: "0 auto", width: "100%" }}>
          {loading ? <h1 className="page-news-headline">Loading...</h1> : null}
          {!loading && !post ? <h1 className="page-news-headline">Article not found</h1> : null}
          {!loading && post ? (
            <>
              <p className="page-news-meta">
                {post.source || "APEX INSIGHTS"}, {formatBlogDate(post.publishedAt)}
              </p>
              <h1 className="page-news-headline" style={{ paddingLeft: 0, paddingRight: 0 }}>
                {post.title}
              </h1>
              {heroImage ? (
                <div
                  className="page-news-image-placeholder"
                  style={{
                    height: "min(52vw, 460px)",
                    backgroundImage: `url(${heroImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              ) : null}
              <div style={{ marginTop: 28, display: "grid", gap: 16 }}>
                {(paragraphs.length ? paragraphs : [post.excerpt]).map((paragraph) => (
                  <p key={paragraph} className="page-news-body" style={{ marginBottom: 0 }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </>
          ) : null}
        </section>
      </main>
      <Footer />
    </>
  );
}
