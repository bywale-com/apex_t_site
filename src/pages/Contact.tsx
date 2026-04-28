import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { ArrowButton } from "../components/ArrowButton";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { fadeUp, scaleIn, staggerContainer, staggerItem, viewportOnce } from "../lib/motion";

const contactTitleVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error ?? "Unable to send your message right now.");
      }

      setStatus({ type: "success", message: "Message sent. We'll get back to you shortly." });
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
      setStatus({ type: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <section className="contact-hero page-first-section section">
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
            Want to understand where your firm is losing time? Ready to integrate Tower? Or just want
            to know if what we do applies to your situation? We read every message and respond to every
            real inquiry.
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

        <section className="contact-form-wrap section">
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
            onSubmit={handleSubmit}
          >
            <motion.label variants={staggerItem}>
              NAME
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                required
              />
            </motion.label>
            <motion.label variants={staggerItem}>
              EMAIL
              <input
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                required
              />
            </motion.label>
            <motion.label variants={staggerItem}>
              MESSAGE
              <textarea
                placeholder="Tell us about your goals"
                value={form.message}
                onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                required
              />
            </motion.label>
            {status ? (
              <motion.p
                variants={staggerItem}
                style={{
                  marginTop: -8,
                  marginBottom: 24,
                  color: status.type === "success" ? "#0a7a32" : "#b42318",
                  fontSize: 14,
                  letterSpacing: "0.02em",
                }}
              >
                {status.message}
              </motion.p>
            ) : null}
            <motion.div className="contact-submit-wrap" variants={scaleIn} transition={{ delay: 0.25 }}>
              <ArrowButton
                variant="dark"
                label={isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                size="lg"
                type="submit"
                disabled={isSubmitting}
              />
            </motion.div>
          </motion.form>
        </section>
      </main>
      <Footer />
    </>
  );
}
