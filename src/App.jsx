import { useState, useEffect, useRef } from "react";

const PINK = "#f2c4ce";
const PINK_LIGHT = "#fdf0f3";
const PINK_DARK = "#e8a0b0";
const PINK_ACCENT = "#d4748a";
const WHITE = "#ffffff";
const TEXT_DARK = "#3a2a2e";
const TEXT_MED = "#6b5459";
const TEXT_LIGHT = "#9a8488";
const CREAM = "#fefafb";

// ─── Domo SVG Component ───
const DomoSVG = ({ size = 60, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={style}>
    <rect x="15" y="20" width="70" height="65" rx="12" fill="#8B6914" />
    <rect x="20" y="25" width="60" height="55" rx="8" fill="#a57d1a" />
    {/* Eyes */}
    <circle cx="38" cy="42" r="5" fill="#1a1a1a" />
    <circle cx="62" cy="42" r="5" fill="#1a1a1a" />
    <circle cx="36" cy="40" r="2" fill="#fff" />
    <circle cx="60" cy="40" r="2" fill="#fff" />
    {/* Mouth */}
    <rect x="30" y="52" width="40" height="20" rx="3" fill="#c0392b" />
    <rect x="32" y="52" width="8" height="8" rx="1" fill="#fff" />
    <rect x="42" y="52" width="8" height="8" rx="1" fill="#fff" />
    <rect x="52" y="52" width="8" height="8" rx="1" fill="#fff" />
    <rect x="62" y="52" width="6" height="6" rx="1" fill="#fff" />
    {/* Arms */}
    <rect x="5" y="35" width="14" height="30" rx="7" fill="#8B6914" />
    <rect x="81" y="35" width="14" height="30" rx="7" fill="#8B6914" />
    {/* Legs */}
    <rect x="25" y="78" width="18" height="18" rx="6" fill="#8B6914" />
    <rect x="57" y="78" width="18" height="18" rx="6" fill="#8B6914" />
  </svg>
);

// ─── Star decorations ───
const Stars = ({ count = 8 }) => {
  const stars = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 8 + Math.random() * 14,
    delay: Math.random() * 3,
    opacity: 0.15 + Math.random() * 0.25,
  }));
  return (
    <>
      {stars.map((s) => (
        <svg
          key={s.id}
          width={s.size}
          height={s.size}
          viewBox="0 0 24 24"
          fill={PINK_DARK}
          style={{
            position: "absolute",
            left: s.left,
            top: s.top,
            opacity: s.opacity,
            animation: `twinkle ${2 + s.delay}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
            pointerEvents: "none",
          }}
        >
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
        </svg>
      ))}
    </>
  );
};

// ─── Swirl decoration ───
const Swirl = ({ style = {} }) => (
  <svg width="30" height="30" viewBox="0 0 30 30" style={{ opacity: 0.2, ...style }}>
    <path
      d="M15 5c5.5 0 10 4.5 10 10s-4.5 10-10 10-8-2.5-8-6 3-5.5 6-5.5 4 1.5 4 3.5-1.5 3-3 3"
      fill="none"
      stroke={PINK_DARK}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// ─── Navigation ───
const Nav = ({ page, setPage }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { id: "home", label: "Home" },
    { id: "order", label: "Order" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${PINK}40`,
      padding: "0 24px", height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <div
        onClick={() => setPage("home")}
        style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
      >
        <DomoSVG size={36} />
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 20, fontWeight: 700, color: TEXT_DARK, letterSpacing: "-0.02em",
        }}>
          by.svs1e
        </span>
      </div>
      {/* Desktop nav */}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}
        className="desktop-nav">
        {links.map((l) => (
          <button
            key={l.id}
            onClick={() => setPage(l.id)}
            style={{
              background: page === l.id ? PINK : "transparent",
              color: page === l.id ? TEXT_DARK : TEXT_MED,
              border: "none", borderRadius: 20,
              padding: "8px 18px", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14, fontWeight: 500,
              transition: "all 0.25s ease",
            }}
          >
            {l.label}
          </button>
        ))}
      </div>
      {/* Mobile menu button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: "none", background: "none", border: "none",
          cursor: "pointer", padding: 8,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={TEXT_DARK} strokeWidth="2">
          {menuOpen ? (
            <path d="M6 6l12 12M6 18L18 6" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>
      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          position: "absolute", top: 64, left: 0, right: 0,
          background: WHITE, borderBottom: `1px solid ${PINK}40`,
          padding: "12px 24px", display: "flex", flexDirection: "column", gap: 4,
        }}
          className="mobile-dropdown"
        >
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => { setPage(l.id); setMenuOpen(false); }}
              style={{
                background: page === l.id ? PINK_LIGHT : "transparent",
                color: TEXT_DARK, border: "none", borderRadius: 12,
                padding: "12px 16px", cursor: "pointer", textAlign: "left",
                fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500,
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

// ─── Home Page ───
const HomePage = ({ setPage }) => (
  <div style={{ minHeight: "100vh", paddingTop: 64, background: `linear-gradient(180deg, ${PINK_LIGHT} 0%, ${WHITE} 20%, ${PINK_LIGHT} 45%, ${WHITE} 65%, ${PINK_LIGHT} 85%, ${PINK}50 100%)` }}>
    {/* Hero */}
    <section style={{
      position: "relative", overflow: "hidden",
      padding: "100px 24px 80px", textAlign: "center",
    }}>
      <Stars count={12} />
      <Swirl style={{ position: "absolute", top: 40, left: "10%" }} />
      <Swirl style={{ position: "absolute", bottom: 60, right: "12%" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto" }}>
        <div style={{ marginBottom: 24, display: "flex", justifyContent: "center" }}>
          <DomoSVG size={90} />
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(36px, 7vw, 56px)", fontWeight: 700,
          color: TEXT_DARK, lineHeight: 1.15, margin: "0 0 16px",
          letterSpacing: "-0.03em",
        }}>
          handmade with love,
          <br />
          <span style={{ color: PINK_ACCENT }}>from me to you</span>
          <span style={{ fontSize: "0.6em" }}> 🍓</span>
        </h1>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 18, color: TEXT_MED, maxWidth: 480,
          margin: "0 auto 36px", lineHeight: 1.6,
        }}>
          Custom bracelets, keychains & charms — each piece crafted with care, just for you.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => setPage("order")}
            style={{
              background: PINK_ACCENT, color: WHITE,
              border: "none", borderRadius: 28, padding: "14px 36px",
              fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600,
              cursor: "pointer", transition: "all 0.3s ease",
              boxShadow: `0 4px 20px ${PINK_ACCENT}40`,
            }}
            onMouseEnter={(e) => e.target.style.transform = "translateY(-2px)"}
            onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
          >
            Place a Custom Order
          </button>
        </div>
      </div>
    </section>

    {/* Product categories */}
    <section style={{
      padding: "80px 24px",
    }}>
    <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 32, fontWeight: 700, color: TEXT_DARK, marginBottom: 12,
      }}>
        What I Make, With Love
      </h2>
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        color: TEXT_MED, marginBottom: 32, fontSize: 16,
      }}>
        Every piece is handcrafted and unique — just like you ✨
      </p>
      <div className="pill-container" style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 14,
      }}>
        {[
          { name: "Bracelets", emoji: "📿", desc: "Beaded, charm & wire-wrapped" },
          { name: "Keychains", emoji: "🔑", desc: "Cute clips for bags & keys" },
          { name: "Phone Charms", emoji: "📱", desc: "Dangle charms for your phone" },
          { name: "Sonny Angels", emoji: "👼", desc: "Adorable themed pieces" },
          { name: "Smiskis", emoji: "🌿", desc: "Cute Smiski-inspired charms" },
          { name: "Calico Critters", emoji: "🐰", desc: "Charming critter creations" },
          { name: "Your Own Trinket", emoji: "🏠", desc: "Bring your trinket, I'll charm it!" },
          { name: "Lip Gloss Charms", emoji: "💋", desc: "Glam up your lip gloss!" },
        ].map((item) => (
          <div
            key={item.name}
            className="pill-item"
            style={{
              background: PINK_LIGHT, borderRadius: 28,
              padding: "16px 28px",
              border: `1px solid ${PINK}`,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
              transition: "all 0.2s ease",
              width: 280, flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 4px 15px ${PINK}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span className="pill-emoji" style={{ fontSize: 26, flexShrink: 0 }}>{item.emoji}</span>
            <div style={{ display: "flex", flexDirection: "column", textAlign: "center" }}>
              <span className="pill-name" style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16, fontWeight: 600, color: TEXT_DARK, lineHeight: 1.2,
              }}>
                {item.name}
              </span>
              <span className="pill-desc" style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13, color: TEXT_LIGHT, lineHeight: 1.3,
              }}>
                {item.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
    </section>

    {/* CTA Banner */}
    <section style={{
      padding: "60px 24px", textAlign: "center",
      position: "relative",
    }}>
      <Stars count={6} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 28, color: TEXT_DARK, margin: "0 0 12px",
        }}>
          Currently taking commissions!
        </h2>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          color: TEXT_MED, marginBottom: 28, fontSize: 15,
        }}>
          Have something special in mind? Let's make it happen.
        </p>
        <button
          onClick={() => setPage("order")}
          style={{
            background: TEXT_DARK, color: WHITE,
            border: "none", borderRadius: 28, padding: "14px 36px",
            fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Start Your Order →
        </button>
      </div>
    </section>
  </div>
);



// ─── Order Form Page ───
const OrderPage = () => {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", instagram: "",
    productType: [], colors: "", charms: "", size: "",
    description: "", budget: "", timeline: "",
  });
  const [images, setImages] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef(null);

  const handleChange = (field) => (e) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((f) => ({
      name: f.name,
      url: URL.createObjectURL(f),
      file: f,
    }));
    setImages((p) => [...p, ...newImages].slice(0, 5));
  };

  const removeImage = (idx) => setImages((p) => p.filter((_, i) => i !== idx));

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || form.productType.length === 0) return;
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("instagram", form.instagram);
      formData.append("productType", form.productType.join(", "));
      formData.append("colors", form.colors);
      formData.append("charms", form.charms);
      formData.append("size", form.size);
      formData.append("budget", form.budget);
      formData.append("timeline", form.timeline);
      formData.append("description", form.description);
      images.forEach((img) => {
        if (img.file) {
          formData.append("attachment", img.file);
        }
      });

      const response = await fetch("https://formspree.io/f/xlgppaqy", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: formData,
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        const errorData = await response.json().catch(() => null);
        const errorMsg = errorData?.errors?.map(e => e.message).join(", ") || "Unknown error";
        console.error("Formspree error:", errorMsg, errorData);
        alert("Error: " + errorMsg + "\n\nPlease try again or DM @by.svs1e on Instagram!");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Connection error. Please try again or DM @by.svs1e on Instagram!");
    }
    setSubmitting(false);
  };

  const inputStyle = {
    width: "100%", boxSizing: "border-box",
    padding: "12px 16px", borderRadius: 12,
    border: `1.5px solid ${PINK}80`,
    fontFamily: "'DM Sans', sans-serif", fontSize: 14,
    color: TEXT_DARK, background: WHITE,
    outline: "none", transition: "border-color 0.2s",
  };

  const labelStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13, fontWeight: 600, color: TEXT_DARK,
    marginBottom: 6, display: "block",
  };

  if (submitted) {
    return (
      <div style={{
        minHeight: "100vh", paddingTop: 64,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: `radial-gradient(ellipse at center, ${WHITE} 25%, ${PINK_LIGHT} 100%)`,
      }}>
        <div style={{
          textAlign: "center", padding: "60px 24px",
          maxWidth: 500,
        }}>
          <DomoSVG size={80} />
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 32, color: TEXT_DARK, margin: "20px 0 12px",
          }}>
            Order Received! 🍓
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            color: TEXT_MED, fontSize: 16, lineHeight: 1.7,
          }}>
            Thank you, {form.name}! I'll review your request and get back to you with a quote soon. Keep an eye on your DMs or email!
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", instagram: "", productType: [], colors: "", charms: "", size: "", description: "", budget: "", timeline: "" }); setImages([]); }}
            style={{
              marginTop: 24, background: PINK_ACCENT, color: WHITE,
              border: "none", borderRadius: 24, padding: "12px 32px",
              fontFamily: "'DM Sans', sans-serif", fontSize: 14,
              fontWeight: 600, cursor: "pointer",
            }}
          >
            Place Another Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", paddingTop: 64, background: `radial-gradient(ellipse at center, ${WHITE} 25%, ${PINK_LIGHT} 100%)` }}>
      <section style={{ maxWidth: 640, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 36, fontWeight: 700, color: TEXT_DARK, marginBottom: 12,
          }}>
            Custom Order Form
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            color: TEXT_MED, fontSize: 15,
          }}>
            Tell me about your dream piece — I'll send you a quote! ✨
          </p>
        </div>

        <div style={{
          background: PINK_LIGHT, borderRadius: 24, padding: "36px 28px",
          border: `1px solid ${PINK}40`,
        }}>
          {/* Contact info */}
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 20, color: TEXT_DARK, marginBottom: 20, marginTop: 0,
          }}>
            Your Info
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Name *</label>
              <input style={inputStyle} placeholder="Your name" value={form.name} onChange={handleChange("name")} onFocus={(e) => e.target.style.borderColor = PINK_ACCENT} onBlur={(e) => e.target.style.borderColor = `${PINK}80`} />
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input style={inputStyle} placeholder="you@email.com" type="email" value={form.email} onChange={handleChange("email")} onFocus={(e) => e.target.style.borderColor = PINK_ACCENT} onBlur={(e) => e.target.style.borderColor = `${PINK}80`} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
            <div>
              <label style={labelStyle}>Phone</label>
              <input style={inputStyle} placeholder="(555) 123-4567" value={form.phone} onChange={handleChange("phone")} onFocus={(e) => e.target.style.borderColor = PINK_ACCENT} onBlur={(e) => e.target.style.borderColor = `${PINK}80`} />
            </div>
            <div>
              <label style={labelStyle}>Instagram @</label>
              <input style={inputStyle} placeholder="@yourusername" value={form.instagram} onChange={handleChange("instagram")} onFocus={(e) => e.target.style.borderColor = PINK_ACCENT} onBlur={(e) => e.target.style.borderColor = `${PINK}80`} />
            </div>
          </div>

          <div style={{ height: 1, background: `${PINK}60`, margin: "8px 0 28px" }} />

          {/* Product details */}
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 20, color: TEXT_DARK, marginBottom: 20, marginTop: 0,
          }}>
            Product Details
          </h3>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Product Type * (select all that apply)</label>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["Bracelet", "Keychain", "Phone Charm", "Sonny Angels", "Smiskis", "Calico Critters", "Lip Gloss Charm", "Trinket at Home", "Custom / Other"].map((t) => (
                <button
                  key={t}
                  onClick={() => setForm((p) => ({
                    ...p,
                    productType: p.productType.includes(t)
                      ? p.productType.filter((x) => x !== t)
                      : [...p.productType, t],
                  }))}
                  style={{
                    background: form.productType.includes(t) ? PINK_ACCENT : WHITE,
                    color: form.productType.includes(t) ? WHITE : TEXT_MED,
                    border: `1.5px solid ${form.productType.includes(t) ? PINK_ACCENT : PINK}`,
                    borderRadius: 20, padding: "8px 18px",
                    fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                    fontWeight: 500, cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Colors / Color Palette</label>
              <input style={inputStyle} placeholder="e.g. red, green, silver" value={form.colors} onChange={handleChange("colors")} onFocus={(e) => e.target.style.borderColor = PINK_ACCENT} onBlur={(e) => e.target.style.borderColor = `${PINK}80`} />
            </div>
            <div>
              <label style={labelStyle}>Specific Charms / Beads</label>
              <input style={inputStyle} placeholder="e.g. strawberries, hearts, stars" value={form.charms} onChange={handleChange("charms")} onFocus={(e) => e.target.style.borderColor = PINK_ACCENT} onBlur={(e) => e.target.style.borderColor = `${PINK}80`} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Size (if applicable)</label>
              <input style={inputStyle} placeholder="e.g. 7 inch wrist" value={form.size} onChange={handleChange("size")} onFocus={(e) => e.target.style.borderColor = PINK_ACCENT} onBlur={(e) => e.target.style.borderColor = `${PINK}80`} />
            </div>
            <div>
              <label style={labelStyle}>Budget Range</label>
              <select
                style={{ ...inputStyle, cursor: "pointer" }}
                value={form.budget}
                onChange={handleChange("budget")}
              >
                <option value="">Select...</option>
                <option value="under10">Under $10</option>
                <option value="10-20">$10 - $20</option>
                <option value="20-35">$20 - $35</option>
                <option value="35plus">$35+</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Timeline</label>
            <select
              style={{ ...inputStyle, cursor: "pointer" }}
              value={form.timeline}
              onChange={handleChange("timeline")}
            >
              <option value="">When do you need it by?</option>
              <option value="no-rush">No rush</option>
              <option value="1-2weeks">Within 1-2 weeks</option>
              <option value="specific-date">By a specific date</option>
              <option value="asap">ASAP</option>
            </select>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Describe Your Vision</label>
            <textarea
              style={{ ...inputStyle, minHeight: 100, resize: "vertical" }}
              placeholder="Tell me everything! Style, vibe, who it's for, any special details..."
              value={form.description}
              onChange={handleChange("description")}
              onFocus={(e) => e.target.style.borderColor = PINK_ACCENT}
              onBlur={(e) => e.target.style.borderColor = `${PINK}80`}
            />
          </div>

          {/* Image upload */}
          <div style={{ marginBottom: 28 }}>
            <label style={labelStyle}>Inspiration Images (up to 5)</label>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12, color: TEXT_LIGHT, margin: "0 0 12px",
            }}>
              Upload photos of styles, colors, or pieces you love!
            </p>

            <div
              onClick={() => fileRef.current?.click()}
              style={{
                border: `2px dashed ${PINK}`,
                borderRadius: 16, padding: "28px 20px",
                textAlign: "center", cursor: "pointer",
                background: `${WHITE}80`,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = PINK_ACCENT}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = PINK}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>📸</div>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14, color: TEXT_MED, margin: 0,
              }}>
                Click to upload images
              </p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11, color: TEXT_LIGHT, margin: "4px 0 0",
              }}>
                PNG, JPG, HEIC — max 5 images
              </p>
              <input
                ref={fileRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImages}
                style={{ display: "none" }}
              />
            </div>

            {images.length > 0 && (
              <div style={{
                display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap",
              }}>
                {images.map((img, i) => (
                  <div key={i} style={{ position: "relative" }}>
                    <img
                      src={img.url}
                      alt={img.name}
                      style={{
                        width: 80, height: 80, objectFit: "cover",
                        borderRadius: 12, border: `2px solid ${PINK}`,
                      }}
                    />
                    <button
                      onClick={() => removeImage(i)}
                      style={{
                        position: "absolute", top: -6, right: -6,
                        width: 20, height: 20, borderRadius: "50%",
                        background: PINK_ACCENT, color: WHITE,
                        border: "none", fontSize: 12, cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        lineHeight: 1,
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={submitting || !form.name || form.productType.length === 0}
            style={{
              width: "100%", padding: "16px",
              background: form.name && form.productType.length > 0 && !submitting ? PINK_ACCENT : `${PINK_ACCENT}60`,
              color: WHITE, border: "none", borderRadius: 16,
              fontFamily: "'DM Sans', sans-serif", fontSize: 16,
              fontWeight: 600, cursor: form.name && form.productType.length > 0 && !submitting ? "pointer" : "not-allowed",
              transition: "all 0.3s",
              boxShadow: form.name && form.productType.length > 0 && !submitting ? `0 4px 20px ${PINK_ACCENT}40` : "none",
              opacity: submitting ? 0.7 : 1,
            }}
          >
            {submitting ? "Sending... ✨" : "Submit Order Request 🍓"}
          </button>

          <p style={{
            textAlign: "center", marginTop: 14,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, color: TEXT_LIGHT,
          }}>
            I'll review your request and send you a quote via DM or email!
          </p>
        </div>
      </section>
    </div>
  );
};

// ─── Contact Page ───
const ContactPage = () => {
  const faqs = [
    { q: "How long does a custom order take?", a: "Most orders are completed within 1-2 weeks, depending on complexity and my current queue. Rush orders may be available — just ask!" },
    { q: "What materials do you use?", a: "I use a mix of glass beads, acrylic charms, wire, chain, and other high-quality craft materials. I'm always sourcing new and unique pieces!" },
    { q: "Can I request specific colors or charms?", a: "Absolutely! The order form lets you specify colors, charms, and styles. You can also upload inspiration photos." },
    { q: "How does pricing work?", a: "Pricing varies based on materials and complexity. After you submit an order form, I'll send you a personalized quote before starting." },
    { q: "Do you ship?", a: "Currently, I handle orders locally and through Instagram DMs. Message me to discuss shipping options for your area!" },
    { q: "Can I return or exchange?", a: "Since each piece is custom-made, I don't offer returns. But I work closely with you during the process to make sure you love the final product!" },
  ];

  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{ minHeight: "100vh", paddingTop: 64, background: `radial-gradient(ellipse at center, ${WHITE} 25%, ${PINK_LIGHT} 100%)` }}>
      <section style={{ maxWidth: 700, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 40, fontWeight: 700, color: TEXT_DARK, marginBottom: 12,
          }}>
            Get in Touch
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            color: TEXT_MED, fontSize: 16,
          }}>
            Questions? I'd love to hear from you! 💌
          </p>
        </div>

        {/* Contact methods */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16, marginBottom: 48,
        }}>
          {[
            { icon: "📧", label: "Email", value: "by.svs1e@gmail.com", sub: "I'll reply within 24hrs" },
            { icon: "📱", label: "iMessage", value: "(559) 892-3111", sub: "For quick questions" },
            { icon: "📸", label: "Instagram", value: "@by.svs1e", sub: "DM me anytime", link: "https://instagram.com/by.svs1e" },
          ].map((c) => (
            <div
              key={c.label}
              onClick={() => c.link && window.open(c.link, "_blank")}
              style={{
                background: PINK_LIGHT, borderRadius: 20,
                padding: "28px 20px", textAlign: "center",
                border: `1px solid ${PINK}40`,
                cursor: c.link ? "pointer" : "default",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                if (c.link) e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 16, color: TEXT_DARK, marginBottom: 4,
              }}>
                {c.label}
              </h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14, color: PINK_ACCENT, fontWeight: 600,
                margin: "0 0 4px",
              }}>
                {c.value}
              </p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11, color: TEXT_LIGHT, margin: 0,
              }}>
                {c.sub}
              </p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 28, color: TEXT_DARK, textAlign: "center",
          marginBottom: 24,
        }}>
          FAQ
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                background: openFaq === i ? PINK_LIGHT : WHITE,
                borderRadius: 16, overflow: "hidden",
                border: `1px solid ${PINK}40`,
                transition: "all 0.3s",
              }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: "100%", padding: "18px 20px",
                  background: "none", border: "none",
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15, fontWeight: 600, color: TEXT_DARK,
                }}>
                  {faq.q}
                </span>
                <span style={{
                  fontSize: 18, color: PINK_ACCENT,
                  transform: openFaq === i ? "rotate(45deg)" : "rotate(0)",
                  transition: "transform 0.3s",
                }}>
                  +
                </span>
              </button>
              {openFaq === i && (
                <div style={{
                  padding: "0 20px 18px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14, color: TEXT_MED, lineHeight: 1.7,
                }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// ─── Footer ───
const Footer = () => (
  <footer style={{
    background: PINK_LIGHT, padding: "32px 24px",
    textAlign: "center",
  }}>
    <DomoSVG size={32} style={{ display: "block", margin: "0 auto" }} />
    <p style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: 16, color: TEXT_DARK, margin: "10px 0 6px",
    }}>
      by.svs1e
    </p>
    <p style={{
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 12, color: TEXT_LIGHT, margin: 0,
    }}>
      handmade with love from me to you 🍓
    </p>
    <a
      href="https://instagram.com/by.svs1e"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-block", marginTop: 12,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13, color: PINK_ACCENT, textDecoration: "none",
        fontWeight: 600,
      }}
    >
      @by.svs1e on Instagram →
    </a>
  </footer>
);

// ─── Main App ───
export default function App() {
  const [page, setPage] = useState("home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage setPage={setPage} />;
      case "order": return <OrderPage />;
      case "contact": return <ContactPage />;
      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.2); }
        }

        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .pill-container { gap: 8px !important; }
          .pill-item {
            padding: 8px 14px !important;
            border-radius: 20px !important;
            gap: 8px !important;
            width: calc(50% - 4px) !important;
            flex-shrink: 1 !important;
          }
          .pill-item .pill-emoji { font-size: 18px !important; }
          .pill-item .pill-name { font-size: 13px !important; }
          .pill-item .pill-desc { font-size: 10px !important; }
        }
        @media (min-width: 641px) {
          .mobile-dropdown { display: none !important; }
        }

        input:focus, textarea:focus, select:focus {
          outline: none;
          box-shadow: 0 0 0 3px ${PINK}40;
        }
      `}</style>
      <Nav page={page} setPage={setPage} />
      {renderPage()}
      <Footer />
    </>
  );
}
