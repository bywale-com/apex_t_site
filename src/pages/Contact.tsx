import { motion } from "framer-motion";
import { ArrowButton } from "../components/ArrowButton";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { fadeUp, scaleIn, staggerContainer, staggerItem, viewportOnce } from "../lib/motion";

const contactTitleVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function Contact() {
  return (
    <>
      <Navbar pageTag="CONTACT" />
      <main>
        <section className="contact-hero">
          <motion.div
            variants={contactTitleVariants}
            initial="hidden"
            animate="visible"
            className="contact-title-block"
          >
            <motion.div variants={staggerItem} className="contact-line">
              LET&apos;S
            </motion.div>
            <motion.div variants={staggerItem} className="contact-line contact-line-delayed">
              TALK
              <motion.span
                className="purple-dot"
                aria-hidden
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ delay: 0.8, duration: 0.5, times: [0, 0.5, 1] }}
              >
                .
              </motion.span>
            </motion.div>
          </motion.div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ delay: 0.3 }}
          >
            Need a workflow audit? Want to integrate Tower into your stack? Or just want to see what
            is possible? We read every message.
          </motion.p>

          <motion.div
            className="contact-meta"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ delay: 0.4 }}
          >
            <p className="contact-label">DIRECT CONTACT</p>
            <h3>info@apexsystems.ai</h3>
            <small>Toronto, Canada</small>
          </motion.div>

          <motion.div
            className="contact-meta"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ delay: 0.5 }}
          >
            <p className="contact-label">SKIP THE EMAIL</p>
            <ArrowButton variant="dark" label="BOOK A STRATEGY CALL" size="lg" />
          </motion.div>
        </section>

        <section className="contact-form-wrap">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            GOT A QUESTION?
          </motion.h2>
          <motion.div
            className="contact-form-divider"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.form
            className="contact-form"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.label variants={staggerItem}>
              NAME
              <input type="text" placeholder="Your name" />
            </motion.label>
            <motion.label variants={staggerItem}>
              EMAIL
              <input type="email" placeholder="you@company.com" />
            </motion.label>
            <motion.label variants={staggerItem}>
              MESSAGE
              <textarea placeholder="Tell us about your goals" />
            </motion.label>
            <motion.div variants={scaleIn} transition={{ delay: 0.25 }}>
              <ArrowButton variant="dark" label="SEND MESSAGE" size="lg" />
            </motion.div>
          </motion.form>
        </section>
      </main>
      <Footer />
    </>
  );
}
