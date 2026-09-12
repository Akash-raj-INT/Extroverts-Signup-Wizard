import React from 'react';
import { TERMS_AND_CONDITIONS } from '../data/mockData';
import { X, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function TermsModal({ isOpen, onClose, onAcceptAndProceed }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'rgba(5, 4, 10, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div 
        className="glass-card animate-fade-in"
        style={{
          maxWidth: '650px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid rgba(157, 78, 221, 0.4)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 0, 127, 0.2)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 0, 127, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(157, 78, 221, 0.2)',
              border: '1px solid var(--primary-purple)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFF' }}>
                {TERMS_AND_CONDITIONS.title}
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Updated {TERMS_AND_CONDITIONS.lastUpdated} • Mandatory Community Agreement
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '50%'
            }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Terms Content */}
        <div style={{
          padding: '1.5rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          flex: 1
        }}>
          <div style={{
            background: 'rgba(255, 59, 48, 0.1)',
            border: '1px solid rgba(255, 59, 48, 0.3)',
            borderRadius: '12px',
            padding: '0.9rem 1.1rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem'
          }}>
            <span style={{ fontSize: '1.25rem' }}>⚠️</span>
            <div style={{ fontSize: '0.82rem', color: '#FFB4AB', lineHeight: 1.4 }}>
              <strong>Strict 18+ Policy Warning:</strong> Extroverts is built for adult social networking and real-world party hangouts. Anyone under 18 years old will be blocked during profile creation.
            </div>
          </div>

          {TERMS_AND_CONDITIONS.sections.map((section) => (
            <div key={section.id} style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              padding: '1.1rem'
            }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--primary-cyan)', marginBottom: '0.5rem' }}>
                {section.title}
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', leadingHeight: 1.5 }}>
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderTop: '1px solid var(--border-subtle)',
          background: 'rgba(10, 8, 20, 0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
            By accepting, you agree to all community standards.
          </span>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={onClose} className="btn-ghost" style={{ fontSize: '0.85rem' }}>
              Decline
            </button>
            <button 
              onClick={onAcceptAndProceed}
              className="btn-party"
              style={{ fontSize: '0.85rem', padding: '0.7rem 1.3rem' }}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>I Agree & Start Signup</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
