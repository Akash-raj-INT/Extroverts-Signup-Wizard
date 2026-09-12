import React from 'react';
import { Smartphone, Monitor, FileText, Sparkles, PartyPopper } from 'lucide-react';

export default function Header({ 
  isMobileSim, 
  onToggleMobileSim, 
  onOpenTerms, 
  onGoHome,
  currentView
}) {
  return (
    <header style={{
      width: '100%',
      padding: '1rem 1.5rem',
      background: 'rgba(9, 10, 15, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '1rem'
    }}>
      {/* Brand & Logo */}
      <div 
        onClick={onGoHome}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem', 
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #FF007F 0%, #7928CA 50%, #00F0FF 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 15px rgba(255, 0, 127, 0.4)'
        }}>
          <PartyPopper className="w-6 h-6 text-white animate-float" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ 
              fontWeight: 800, 
              fontSize: '1.25rem', 
              letterSpacing: '-0.02em',
              background: 'linear-gradient(90deg, #FFFFFF 0%, #FF2E93 50%, #00F0FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              EXTROVERTS
            </span>
            <span style={{
              background: 'rgba(255, 0, 127, 0.15)',
              border: '1px solid rgba(255, 0, 127, 0.4)',
              color: '#FF007F',
              fontSize: '0.65rem',
              fontWeight: 700,
              padding: '0.15rem 0.5rem',
              borderRadius: '999px',
              letterSpacing: '0.05em'
            }}>
              APP REPLICATION
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
            Random people. Real parties.
          </p>
        </div>
      </div>

      {/* Action Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Device View Simulator Toggle */}
        <button
          onClick={onToggleMobileSim}
          className="btn-ghost"
          style={{
            fontSize: '0.8rem',
            padding: '0.5rem 0.9rem',
            background: isMobileSim ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
            borderColor: isMobileSim ? 'var(--primary-cyan)' : 'var(--border-subtle)',
            color: isMobileSim ? 'var(--primary-cyan)' : 'var(--text-muted)'
          }}
          title="Toggle Mobile App Simulator Frame"
        >
          {isMobileSim ? (
            <>
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <span>Mobile View (Active)</span>
            </>
          ) : (
            <>
              <Monitor className="w-4 h-4" />
              <span>Desktop Layout</span>
            </>
          )}
        </button>

        {/* Terms Button */}
        <button
          onClick={onOpenTerms}
          className="btn-ghost"
          style={{ fontSize: '0.8rem', padding: '0.5rem 0.9rem' }}
        >
          <FileText className="w-4 h-4 text-purple-400" />
          <span>Terms & Safety</span>
        </button>
      </div>
    </header>
  );
}
