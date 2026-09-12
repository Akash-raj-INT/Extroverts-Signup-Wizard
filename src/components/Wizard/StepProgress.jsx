import React from 'react';
import { ArrowLeft, Check, Sparkles, RefreshCw } from 'lucide-react';

const STEP_TITLES = [
  { step: 1, label: "Verification", desc: "Email / Phone & OTP" },
  { step: 2, label: "Profile", desc: "Name, Age & Pronouns" },
  { step: 3, label: "Location", desc: "State, City & Campus" },
  { step: 4, label: "Party Vibe", desc: "Tags, Photo & Bio" }
];

export default function StepProgress({ currentStep, onGoBack, onReset }) {
  const progressPercent = Math.min(100, Math.max(25, currentStep * 25));

  return (
    <div style={{ marginBottom: '1.75rem' }}>
      {/* Top Controls: Back Button & Step Counter */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem'
      }}>
        <button
          onClick={onGoBack}
          className="btn-ghost"
          style={{
            padding: '0.45rem 0.85rem',
            fontSize: '0.8rem',
            borderRadius: '999px',
            border: '1px solid rgba(255, 255, 255, 0.12)'
          }}
        >
          <ArrowLeft className="w-4 h-4 text-pink-400" />
          <span>{currentStep === 1 ? 'Back to Landing' : 'Back Step'}</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--primary-cyan)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            Step {currentStep} of 4
          </span>
          <button
            onClick={onReset}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-subtle)',
              cursor: 'pointer',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              opacity: 0.8
            }}
            title="Reset Form"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Title & Description for Active Step */}
      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#FFF' }}>
          {STEP_TITLES[currentStep - 1]?.label}
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {STEP_TITLES[currentStep - 1]?.desc}
        </p>
      </div>

      {/* Progress Bar Line */}
      <div style={{
        width: '100%',
        height: '6px',
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '999px',
        overflow: 'hidden',
        position: 'relative',
        marginBottom: '1.25rem'
      }}>
        <div style={{
          width: `${progressPercent}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #FF007F 0%, #9D4EDD 50%, #00F0FF 100%)',
          borderRadius: '999px',
          transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 0 12px rgba(255, 0, 127, 0.6)'
        }} />
      </div>

      {/* Step Pill Indicators */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '0.5rem'
      }}>
        {STEP_TITLES.map((st) => {
          const isDone = st.step < currentStep;
          const isActive = st.step === currentStep;

          return (
            <div
              key={st.step}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.72rem',
                fontWeight: isActive || isDone ? 600 : 400,
                color: isActive ? 'var(--primary-pink)' : isDone ? 'var(--primary-cyan)' : 'var(--text-subtle)',
                padding: '0.35rem 0.5rem',
                borderRadius: '8px',
                background: isActive ? 'rgba(255, 0, 127, 0.1)' : isDone ? 'rgba(0, 240, 255, 0.08)' : 'transparent',
                border: isActive ? '1px solid rgba(255, 0, 127, 0.3)' : '1px solid transparent'
              }}
            >
              <div style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: isDone ? 'var(--primary-cyan)' : isActive ? 'var(--primary-pink)' : 'rgba(255, 255, 255, 0.1)',
                color: isDone || isActive ? '#000' : 'var(--text-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.65rem',
                fontWeight: 700,
                flexShrink: 0
              }}>
                {isDone ? <Check className="w-3 h-3 text-black stroke-[3]" /> : st.step}
              </div>
              <span style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {st.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
