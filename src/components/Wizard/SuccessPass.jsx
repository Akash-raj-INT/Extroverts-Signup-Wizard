import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { PARTY_VIBES } from '../../data/mockData';
import { CheckCircle2, Sparkles, Share2, Compass, RefreshCw, QrCode, ShieldCheck } from 'lucide-react';

export default function SuccessPass({ formData, onReset, onGoHome, addToast }) {
  // Trigger Confetti Blast on Mount
  useEffect(() => {
    try {
      const end = Date.now() + 2 * 1000;
      const colors = ['#FF007F', '#9D4EDD', '#00F0FF', '#34C759'];

      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } catch (e) {
      console.log('Confetti playback:', e);
    }
  }, []);

  const passId = `EX-2026-${Math.floor(100000 + Math.random() * 900000)}`;

  const userVibes = PARTY_VIBES.filter((v) => (formData.vibes || []).includes(v.id));

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`I just created my Extroverts Party Pass! ID: ${passId}`);
      addToast('success', 'Party Pass ID copied to clipboard!');
    } else {
      addToast('info', `Party Pass ID: ${passId}`);
    }
  };

  return (
    <div className="animate-fade-in" style={{ textAlign: 'center', padding: '1rem 0' }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'rgba(52, 199, 89, 0.15)',
        border: '1px solid rgba(52, 199, 89, 0.4)',
        color: '#86EFAC',
        padding: '0.4rem 1rem',
        borderRadius: '999px',
        fontSize: '0.85rem',
        fontWeight: 600,
        marginBottom: '1rem'
      }}>
        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        <span>Registration Completed Successfully! 🎉</span>
      </div>

      <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFF', marginBottom: '0.2rem' }}>
        Welcome to Extroverts!
      </h2>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
        Your VIP Extrovert Party Pass is active and ready for local events.
      </p>

      {/* VIP Party Pass Card */}
      <div 
        className="glass-card"
        style={{
          maxWidth: '400px',
          margin: '0 auto 2rem',
          padding: '1.5rem',
          border: '1px solid rgba(255, 0, 127, 0.5)',
          background: 'linear-gradient(145deg, rgba(30, 20, 50, 0.9) 0%, rgba(15, 10, 30, 0.95) 100%)',
          boxShadow: '0 0 35px rgba(255, 0, 127, 0.35)',
          borderRadius: '24px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Glow Header Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          paddingBottom: '0.8rem',
          marginBottom: '1.25rem'
        }}>
          <div style={{ textAlign: 'left' }}>
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              color: 'var(--primary-cyan)',
              textTransform: 'uppercase'
            }}>
              VIP MEMBER PASS
            </span>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFF' }}>
              EXTROVERTS 🍸
            </div>
          </div>
          <div style={{
            background: 'rgba(255, 0, 127, 0.2)',
            border: '1px solid var(--primary-pink)',
            color: '#FF007F',
            borderRadius: '999px',
            padding: '0.2rem 0.6rem',
            fontSize: '0.7rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>18+ VERIFIED</span>
          </div>
        </div>

        {/* User Info & Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', textAlign: 'left', marginBottom: '1.25rem' }}>
          <img
            src={formData.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
            alt="User Avatar"
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--primary-pink)',
              boxShadow: '0 0 15px rgba(255, 0, 127, 0.4)'
            }}
          />
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFF' }}>
              {formData.fullName || 'Alex Rivera'}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--primary-cyan)', fontWeight: 600 }}>
              {formData.age ? `${formData.age} yrs • ` : ''}{formData.gender || 'Party Member'} {formData.pronouns ? `(${formData.pronouns})` : ''}
            </p>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              📍 {formData.city || 'Los Angeles'}, {formData.state || 'CA'}
            </p>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
              🎓 {formData.college || 'UCLA Campus'}
            </p>
          </div>
        </div>

        {/* Selected Vibes Pills */}
        <div style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Party Vibes:
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
            {userVibes.map((v) => (
              <span
                key={v.id}
                style={{
                  background: 'rgba(255, 0, 127, 0.15)',
                  border: '1px solid rgba(255, 0, 127, 0.3)',
                  color: '#FFF',
                  borderRadius: '6px',
                  padding: '2px 8px',
                  fontSize: '0.72rem'
                }}
              >
                {v.icon} {v.label}
              </span>
            ))}
          </div>
        </div>

        {/* Bio Snippet */}
        {formData.bio && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            borderRadius: '10px',
            padding: '0.6rem 0.8rem',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            fontStyle: 'italic',
            textAlign: 'left',
            marginBottom: '1.25rem'
          }}>
            "{formData.bio}"
          </div>
        )}

        {/* Pass ID Barcode */}
        <div style={{
          background: '#000',
          borderRadius: '12px',
          padding: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-subtle)', display: 'block' }}>PASS SERIAL CODE</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-cyan)', letterSpacing: '0.08em' }}>{passId}</span>
          </div>
          <QrCode className="w-8 h-8 text-white opacity-80" />
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button onClick={handleShare} className="btn-party" style={{ fontSize: '0.85rem' }}>
          <Share2 className="w-4 h-4" />
          <span>Share / Save Pass</span>
        </button>

        <button onClick={onGoHome} className="btn-ghost" style={{ fontSize: '0.85rem' }}>
          <Compass className="w-4 h-4 text-cyan-400" />
          <span>Explore Parties</span>
        </button>

        <button onClick={onReset} className="btn-ghost" style={{ fontSize: '0.85rem' }}>
          <RefreshCw className="w-4 h-4 text-purple-400" />
          <span>New Profile Demo</span>
        </button>
      </div>
    </div>
  );
}
