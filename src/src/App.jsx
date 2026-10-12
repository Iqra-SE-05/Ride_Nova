
import { useState } from "react";
import {
  MapPin,
  Navigation,
  ArrowRight,
  CarFront,
  ShieldCheck,
  Clock3,
  Wallet,
  Menu,
  X,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import "./style.css";

export default function App() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [fare, setFare] = useState("500");
  const [message, setMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  function handleRideRequest(e) {
    e.preventDefault();
    setMessage("");

    if (!pickup.trim() || !destination.trim() || !fare.trim()) {
      setMessage("Please complete all ride details.");
      return;
    }

    if (pickup.trim().toLowerCase() === destination.trim().toLowerCase()) {
      setMessage("Pickup and destination must be different.");
      return;
    }

    if (!Number.isFinite(Number(fare)) || Number(fare) <= 0) {
      setMessage("Please enter a valid fare greater than zero.");
      return;
    }

    const ride = {
      id: "RN" + Date.now().toString().slice(-8),
      pickup: pickup.trim(),
      destination: destination.trim(),
      fare: Number(fare),
      status: "Request Created",
      createdAt: new Date().toISOString(),
    };

    try {
      const previous = JSON.parse(
        localStorage.getItem("ridenovaRides") || "[]"
      );
      const rides = Array.isArray(previous) ? previous : [];
      rides.unshift(ride);
      localStorage.setItem("ridenovaRides", JSON.stringify(rides));
      setMessage("Ride request saved! Reference: " + ride.id);
    } catch {
      setMessage("Your ride details are valid, but local storage is unavailable.");
    }
  }

  return (
    <div className="app-shell" id="home">
      <header className="navbar">
        <a className="brand" href="#home" aria-label="RideNova home">
          <span className="brand-mark">
            <Navigation size={21} strokeWidth={2.8} />
          </span>
          <span>ride<span className="brand-light">nova</span></span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#benefits" onClick={() => setMenuOpen(false)}>Why RideNova</a>
          <a className="nav-cta" href="#book" onClick={() => setMenuOpen(false)}>
            Book a ride <ArrowUpRight size={16} />
          </a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="live-dot"></span>
              YOUR CITY. YOUR JOURNEY.
            </div>

            <h1>
              Your ride.
              <br />
              <span>Your price.</span>
            </h1>

            <p className="hero-description">
              A smarter way to get around. Choose where you want to go,
              offer your fare, and make every journey your own.
            </p>

            <div className="hero-actions">
              <a href="#book" className="primary-button">
                Plan your ride <ArrowRight size={18} />
              </a>
              <a href="#how-it-works" className="text-link">
                Discover how it works
              </a>
            </div>

            <div className="trust-row">
              <div className="trust-icon"><ShieldCheck size={20} /></div>
              <div>
                <strong>Your journey, your choice</strong>
                <span>Transparent fares. Flexible travel.</span>
              </div>
            </div>
          </div>

          <div className="booking-panel" id="book">
            <div className="panel-heading">
              <div>
                <span className="panel-kicker">LET'S GET MOVING</span>
                <h2>Plan your ride</h2>
              </div>
              <div className="panel-icon"><CarFront size={25} /></div>
            </div>

            <p className="panel-description">
              Enter your route and suggest a fare.
            </p>

            <form onSubmit={handleRideRequest}>
              <label htmlFor="pickup">PICKUP LOCATION</label>
              <div className="input-wrap">
                <span className="field-icon pickup-icon"><MapPin size={19} /></span>
                <input
                  id="pickup"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="Where should we pick you up?"
                  autoComplete="street-address"
                  required
                />
              </div>

              <div className="route-connector"><span></span></div>

              <label htmlFor="destination">YOUR DESTINATION</label>
              <div className="input-wrap">
                <span className="field-icon destination-icon"><Navigation size={18} /></span>
                <input
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Where are you going?"
                  required
                />
              </div>

              <label htmlFor="fare" className="fare-label">YOUR OFFER (PKR)</label>
              <div className="input-wrap fare-wrap">
                <span className="field-icon"><Wallet size={19} /></span>
                <span className="currency">Rs.</span>
                <input
                  id="fare"
                  type="number"
                  min="1"
                  step="1"
                  value={fare}
                  onChange={(e) => setFare(e.target.value)}
                  required
                />
              </div>

              <button className="submit-button" type="submit">
                Request a ride <ArrowRight size={19} />
              </button>

              {message && (
                <div className="form-message" role="status">
                  <CheckCircle2 size={18} />
                  <span>{message}</span>
                </div>
              )}

              <p className="form-note">
                <ShieldCheck size={15} /> Your ride details stay in this browser.
              </p>
            </form>
          </div>
        </section>

        <section className="benefits-section" id="benefits">
          <div className="section-heading">
            <span className="section-kicker">THE RIDENOVA DIFFERENCE</span>
            <h2>Getting there, made <span>simpler.</span></h2>
            <p>Built around the way you want to travel.</p>
          </div>

          <div className="benefit-grid">
            <article className="benefit-card">
              <div className="benefit-icon"><Wallet size={23} /></div>
              <h3>You suggest the fare</h3>
              <p>Start with an offer that fits your travel budget.</p>
            </article>
            <article className="benefit-card">
              <div className="benefit-icon"><Clock3 size={23} /></div>
              <h3>Made for your day</h3>
              <p>Plan your route with a simple, straightforward flow.</p>
            </article>
            <article className="benefit-card">
              <div className="benefit-icon"><ShieldCheck size={23} /></div>
              <h3>Clarity at every step</h3>
              <p>Review your ride details before sending a request.</p>
            </article>
          </div>
        </section>

        <section className="how-section" id="how-it-works">
          <div className="how-copy">
            <span className="section-kicker">THREE SIMPLE STEPS</span>
            <h2>Your next journey starts here.</h2>
            <p>Getting started should feel effortless. Enter your details and create a ride request in moments.</p>
          </div>
          <div className="steps-list">
            <article className="step-item">
              <span className="step-number">01</span>
              <div><h3>Choose your route</h3><p>Add your pickup and destination.</p></div>
            </article>
            <article className="step-item">
              <span className="step-number">02</span>
              <div><h3>Suggest your fare</h3><p>Enter the amount you want to offer in PKR.</p></div>
            </article>
            <article className="step-item">
              <span className="step-number">03</span>
              <div><h3>Create your request</h3><p>Your request is saved in this browser for reference.</p></div>
            </article>
          </div>
        </section>

        <section className="bottom-cta">
          <div>
            <span className="section-kicker">READY WHEN YOU ARE</span>
            <h2>Make your next move.</h2>
            <p>Your journey begins with a destination.</p>
          </div>
          <a href="#book" className="primary-button">
            Plan a ride <ArrowRight size={18} />
          </a>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark"><Navigation size={19} /></span>
          <span>ride<span className="brand-light">nova</span></span>
        </a>
        <p>Designed for journeys that move you.</p>
        <span className="footer-copy">© {new Date().getFullYear()} RideNova · Portfolio project</span>
      </footer>
    </div>
  );
}
