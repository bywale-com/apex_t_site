import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { staggerContainer, staggerItem, viewportOnce } from "../lib/motion";
import news1Img from "../assets/stock/news-1.jpg";
import news2Img from "../assets/stock/news-2.jpg";
import news3Img from "../assets/stock/news-3.jpg";
import news4Img from "../assets/stock/news-4.jpg";
import news5Img from "../assets/stock/news-5.jpg";
import {
  fetchPosts,
  formatBlogDate,
  getSanityImageUrl,
  getSanityPostUrl,
  type SanityPost,
} from "../lib/blog";

const fallbackArticles = [
  {
    source: "APEX INSIGHTS",
    date: "APRIL 10, 2026",
    headline: "Why orchestration beats automation every time",
    body: "Point automation solves one problem. Orchestration removes a category of problems. Here is the difference and why it matters for your firm.",
    link: "/news",
    image: news1Img,
  },
  {
    source: "APEX INSIGHTS",
    date: "MARCH 28, 2026",
    headline: "The intake audit: where most firms are losing 40% of their time",
    body: "We mapped the intake-to-close workflow for 50 professional service firms. The same three bottlenecks appeared in almost every one.",
    link: "/news",
    image: news2Img,
  },
  {
    source: "APEX INSIGHTS",
    date: "MARCH 15, 2026",
    headline: "What it actually costs to follow up manually",
    body: "Most firms track billable hours. Almost none track the hours spent on reminders, callbacks, and status updates. The number is larger than expected.",
    link: "/news",
    image: news3Img,
  },
  {
    source: "APEX INSIGHTS",
    date: "FEBRUARY 22, 2026",
    headline: "Why orchestration beats automation every time",
    body: "Point automation solves one problem. Orchestration removes a category of problems. Here is the difference and why it matters for your firm.",
    link: "/news",
    image: news4Img,
  },
  {
    source: "APEX INSIGHTS",
    date: "FEBRUARY 8, 2026",
    headline: "The intake audit: where most firms are losing 40% of their time",
    body: "We mapped the intake-to-close workflow for 50 professional service firms. The same three bottlenecks appeared in almost every one.",
    link: "/news",
    image: news5Img,
  },
];

export default function News() {
  const [posts, setPosts] = useState<SanityPost[]>([]);

  useEffect(() => {
    let mounted = true;
    fetchPosts()
      .then((items) => {
        if (!mounted || !items.length) return;
        setPosts(items);
      })
      .catch((error) => {
        console.error("Failed to load Sanity posts for News page:", error);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const sanityArticles = posts.map((post, index) => ({
    source: post.source || "APEX INSIGHTS",
    date: formatBlogDate(post.publishedAt),
    headline: post.title,
    body: post.excerpt,
    link: getSanityPostUrl(post),
    image: getSanityImageUrl(post.image, 1400, 900) ?? fallbackArticles[index % fallbackArticles.length].image,
  }));

  const articles = sanityArticles.length ? sanityArticles : fallbackArticles;

  return (
    <>
      <Navbar />
      <div className="page-news-outer page-first-section">
        <h1 className="page-news-headline">The Latest</h1>
        <motion.div
          className="page-news-scroll"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          role="list"
        >
          {articles.map((article) => (
            <motion.article
              key={`${article.source}-${article.date}`}
              className="page-news-card"
              role="listitem"
              variants={staggerItem}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
            >
              <p className="page-news-meta">
                {article.source}, {article.date}
              </p>
              <div
                className="page-news-image-placeholder"
                style={{
                  backgroundImage: `url(${article.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <h2 className="page-news-title">{article.headline}</h2>
              <p className="page-news-body">{article.body}</p>
              <a className="page-news-read" href={article.link}>
                <span>↳ Read Here</span>
                <span className="page-news-read-line" aria-hidden />
              </a>
            </motion.article>
          ))}
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
