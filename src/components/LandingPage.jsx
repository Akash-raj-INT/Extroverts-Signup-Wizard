import React from 'react';
import { PartyPopper, ArrowRight, ShieldCheck, Users, Star, Sparkles, Flame, Radio, MapPin, CheckCircle2 } from 'lucide-react';

export default function LandingPage({ onStartWizard, onOpenTerms }) {
  const PARTY_SHOWCASES = [
    {
      title: "Secret House Parties",
      icon: "🏠",
      guests: "15-30 people",
      vibe: "Backyard grills & living room DJs",
      tag: "Trending Tonight"
    },
    {
      title: "Rooftop Sundowners",
      icon: "🍹",
      guests: "40-80 people",
      vibe: "Sunset views & deep house beats",
      tag: "VIP Exclusive"
    },
    {
      title: "Campus Hangouts",
      icon: "🎓",
      guests: "20-50 students",
      vibe: "Dorm chills, games & afterparties",
      tag: "Verified 18+"
    },
    {
      title: "Techno & EDM Nights",
      icon: "🎧",
      guests: "100+ partygoers",
      vibe: "Strobe lights & heavy bass soundscapes",
      tag: "Weekend Rave"
    }
  ];

  return (
    <div className="animate-fade-in" style={{ padding: '1rem 0 3rem' }}>
      {/* Hero Section */}
      <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(255, 0, 127, 0.12)',
          border: '1px solid rgba(255, 0, 127, 0.35)',
          padding: '0.4rem 1.1rem',
          borderRadius: '999px',
          fontSize: '0.82rem',
          color: '#FF70BA',
          fontWeight: 600,
          marginBottom: '1.25rem'
        }}>
          <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
          <span>Extroverts Signup Wizard Replication</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F472B6 40%, #00F0FF 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Random People. Real Parties.
        </h1>

        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-muted)',
          maxWidth: '640px',
          margin: '0 auto 2rem',
          lineHeight: 1.6
        }}>
          Connect with verified extroverts near your campus or city. Host or attend exclusive house parties, rooftop sundowners, and club meetups.
        </p>

        {/* Hero CTA Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={onStartWizard}
            className="btn-party"
            style={{
              padding: '1rem 2rem',
              fontSize: '1.05rem',
              boxShadow: '0 0 30px rgba(255, 0, 127, 0.5)'
            }}
          >
            <PartyPopper className="w-5 h-5 animate-bounce" />
            <span>Launch Signup Wizard (4 Steps)</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenTerms}
            className="btn-ghost"
            style={{ padding: '0.95rem 1.6rem', fontSize: '0.95rem' }}
          >
            <ShieldCheck className="w-5 h-5 text-purple-400" />
            <span>Community Terms (18+)</span>
          </button>
        </div>
      </div>

      {/* Live Stats Ticker */}
      <div 
        className="glass-card"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          padding: '1.5rem 2rem',
          marginBottom: '3.5rem',
          textAlign: 'center',
          borderColor: 'rgba(0, 240, 255, 0.2)'
        }}
      >
        <div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-pink)' }}>
            12,450+
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Verified Extroverts</div>
        </div>

        <div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-cyan)' }}>
            840+
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Parties Host This Month</div>
        </div>

        <div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-purple)' }}>
            4.9 ★
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Safety & Vibe Rating</div>
        </div>

        <div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34C759' }}>
            Strict 18+
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ID Verified Safety Policy</div>
        </div>
      </div>

      {/* Party Categories Showcase */}
      <div style={{ marginBottom: '3.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFF' }}>
            Discover Local Party Hangouts
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Filtered dynamically by state, city & campus in Step 3 of the Wizard
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem'
        }}>
          {PARTY_SHOWCASES.map((item, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '1.25rem',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                <span style={{ fontSize: '2.2rem' }}>{item.icon}</span>
                <span style={{
                  background: 'rgba(255, 0, 127, 0.15)',
                  border: '1px solid rgba(255, 0, 127, 0.3)',
                  color: '#FF007F',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.5rem',
                  borderRadius: '6px'
                }}>
                  {item.tag}
                </span>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFF', marginBottom: '0.3rem' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--primary-cyan)', marginBottom: '0.4rem' }}>
                👥 {item.guests}
              </p>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {item.vibe}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div 
        className="glass-card"
        style={{
          padding: '2rem',
          background: 'linear-gradient(135deg, rgba(20, 16, 36, 0.9) 0%, rgba(10, 8, 20, 0.95) 100%)',
          borderColor: 'rgba(157, 78, 221, 0.3)'
        }}
      >
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFF', textAlign: 'center', marginBottom: '1.5rem' }}>
          What Makes Extroverts Signup Wizard Special?
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          textAlign: 'left'
        }}>
          <div>
            <CheckCircle2 className="w-5 h-5 text-pink-400 mb-2" />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#FFF' }}>
              Progressive 4-Step Disclosure
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Verifies email/phone & OTP first before collecting profile, location, and vibe details.
            </p>
          </div>

          <div>
            <CheckCircle2 className="w-5 h-5 text-cyan-400 mb-2" />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#FFF' }}>
              Real-Time Validation & Under 18 Alert
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Calculates age live from DOB and flags explicit restrictions for anyone under 18.
            </p>
          </div>

          <div>
            <CheckCircle2 className="w-5 h-5 text-purple-400 mb-2" />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#FFF' }}>
              Cross-Field Location Filtering
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Selecting a State dynamically populates matching Cities and Colleges automatically.
            </p>
          </div>

          <div>
            <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-2" />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#FFF' }}>
              Enhanced OTP UX & Presets
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Auto-focus, paste support, resend countdown timer, and 123456 demo auto-fill.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
