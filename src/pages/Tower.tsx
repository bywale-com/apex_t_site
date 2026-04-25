import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ArrowButton } from "../components/ArrowButton";

export default function Tower() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { title: "AI APP", number: "01" },
    { title: "ACTION-DRIVEN LOGIC", number: "02" },
    { title: "AUTOMATION", number: "03" },
  ];

  return (
    <>
      <Navbar pageTag={"PRODUCTS\n/TOWER"} ctaLabel="Try Tower" ctaHref="https://tower.apexsystems.ai" />
      <main>
        <section className="tower-entry">
          {/* TODO: Replace splash gradient with final global operations image */}
          <div className="tower-entry-grid">
            <div className="tower-left-stack">
              <p>YOU ARE NOW ENTERING</p>
              <p>TIME: 3 MNS / SCROLL TO EXPLORE</p>
              <p>THE OPERATING SYSTEM FOR IMMIGRATION FIRMS</p>
              <p>COPYRIGHT ©2026 APEX SYSTEMS INC.</p>
            </div>
            <div className="tower-right">
              <h1>TOWER</h1>
              <div className="letter-boxes">
                <div className="letter-box"><span /></div>
                <div className="letter-box"><span /></div>
                <div className="letter-box striped"><span /></div>
              </div>
            </div>
          </div>
        </section>

        <section className="tower-beyond-chat">
          <h2>Go beyond chat.</h2>
          <h2 className="gradient-title">Enterprise Autonomy</h2>
          <p>Turn AI in your Applications into Agents and Automations</p>
        </section>

        <section className="tower-tabs-section">
          <h2>Beyond Chat</h2>
          <h3>Explore Tower</h3>
          <div className="tower-tabs-row">
            {tabs.map((tab, idx) => (
              <button
                key={tab.title}
                className={activeTab === idx ? "tower-tab active" : "tower-tab"}
                onClick={() => setActiveTab(idx)}
                type="button"
              >
                <span>{tab.title}</span>
                <small>{tab.number}</small>
              </button>
            ))}
          </div>

          <div className="tower-tab-panel">
            <p>AI APP</p>
            <div className="tower-shot">
              <i />
              <i />
              <i />
              <span>AI reviews alerts and automatically proposes resolutions.</span>
            </div>
          </div>
        </section>

        <section className="tower-solving">
          <h2>Solving complex problems across all industries in days, not years.</h2>
          <ArrowButton variant="outlined" label="See case studies" />
        </section>

        <section className="tower-industries">
          {/* USE EXISTING INDUSTRIES COMPONENT */}
          <p>Industries component — reuse from main site</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
