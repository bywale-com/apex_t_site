import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { staggerContainer, staggerItem, viewportOnce } from "../lib/motion";

const articles = [
  {
    source: "APEX INSIGHTS",
    date: "APRIL 10, 2026",
    headline: "How immigration firms are cutting intake time by 60% with AI automation",
    body: "The average immigration consulting firm spends over 40% of its operational hours on intake, follow-up, and document chasing. A new wave of AI orchestration tools is changing that equation entirely.",
    link: "#",
  },
  {
    source: "TORONTO STAR",
    date: "MARCH 28, 2026",
    headline: "Canadian immigration backlog creates new demand for tech-forward consulting firms",
    body: "With processing times stretching to record lengths, immigration consultants who can move faster and communicate better are winning more clients than ever before.",
    link: "#",
  },
  {
    source: "APEX INSIGHTS",
    date: "MARCH 15, 2026",
    headline: "The hidden cost of manual follow-up in professional services",
    body: "Most firms track billable hours. Almost none track the hours lost to reminders, callbacks, and status updates. The number is larger than most owners expect.",
    link: "#",
  },
  {
    source: "FINANCIAL POST",
    date: "FEBRUARY 22, 2026",
    headline: "AI in professional services: beyond the chatbot",
    body: "The firms seeing the most impact from AI aren't using it for conversation. They're using it for coordination — the invisible work that happens between client contact and case resolution.",
    link: "#",
  },
  {
    source: "APEX INSIGHTS",
    date: "FEBRUARY 8, 2026",
    headline: "What we learned from 50 conversations with immigration firm owners",
    body: "We spent three months talking to owner-operators running solo and small immigration consulting practices. Here is what kept coming up in every single call.",
    link: "#",
  },
];

export default function News() {
  return (
    <>
      <Navbar />
      <div className="page-news-outer">
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
              {/* TODO: replace placeholder with real image when available */}
              <div className="page-news-image-placeholder" />
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
