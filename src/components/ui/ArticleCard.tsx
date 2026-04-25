import styles from "./ArticleCard.module.css";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  featured?: boolean;
}

export function ArticleCard({ title, excerpt, featured = false }: ArticleCardProps) {
  return (
    <article className={`${styles.card} ${styles.articleCard} ${featured ? styles.featured : ""}`.trim()}>
      <div className={styles.imageWrap}>
        <div className={`${styles.image} ${styles.articleCardImage}`.trim()} />
      </div>
      <div className={styles.meta}>
        <span>■ INSIGHTS</span>
        <span>/APR 25, 2026</span>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.excerpt}>{excerpt}</p>
    </article>
  );
}
