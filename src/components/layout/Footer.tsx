import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div>
            <p className={styles.label}>ABOUT APEX</p>
            <p className={styles.aboutText}>
              Apex is an AI orchestration company building intelligent automation systems for
              businesses across industries. We design, build, and operate the infrastructure behind
              better decisions.
            </p>
            <p className={styles.label}>EMAIL</p>
            <p className={styles.link}>hello@apexsystems.com</p>
            <p className={styles.label}>CONNECT</p>
            <p className={styles.link}>LinkedIn</p>
          </div>
          <div>
            <p className={styles.label}>NAVIGATION</p>
            <p className={styles.link}>Home</p>
            <p className={styles.link}>Services</p>
            <p className={styles.link}>Solutions</p>
            <p className={styles.link}>Case Studies</p>
          </div>
          <div>
            <p className={styles.label}>COMPANY</p>
            <p className={styles.link}>Company</p>
            <p className={styles.link}>Careers</p>
            <p className={styles.link}>Contact</p>
            <p className={styles.link}>News</p>
          </div>
          <div>
            <p className={styles.label}>LEGAL</p>
            <p className={styles.link}>Terms of Service</p>
            <p className={styles.link}>Privacy Policy</p>
            <p className={styles.link}>Responsible AI</p>
            <p className={styles.link}>Legal</p>
          </div>
        </div>
        <div className={styles.bottomLine} />
        <p className={styles.copyright}>© 2025 Apex Systems. All rights reserved.</p>
      </div>
    </footer>
  );
}
