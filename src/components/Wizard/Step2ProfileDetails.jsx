import React, { useState, useEffect } from 'react';
import { User, Calendar, ShieldAlert, ArrowRight, Check } from 'lucide-react';

export default function Step2ProfileDetails({ formData, onChange, onNext, addToast }) {
  const [errors, setErrors] = useState({});
  const [calculatedAge, setCalculatedAge] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const GENDER_OPTIONS = [
    { id: 'male', label: 'Male', icon: '👨' },
    { id: 'female', label: 'Female', icon: '👩' },
    { id: 'non-binary', label: 'Non-Binary', icon: '🌈' },
    { id: 'prefer_not', label: 'Prefer not to say', icon: '🤐' }
  ];

  const PRONOUN_OPTIONS = ['He/Him', 'She/Her', 'They/Them', 'Ze/Zir', 'Any Pronouns'];

  // Calculate age when DOB changes
  useEffect(() => {
    if (formData.dob) {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setCalculatedAge(age);
      onChange('age', age);
    } else {
      setCalculatedAge(null);
    }
  }, [formData.dob]);

  const validateStep = () => {
    const newErrors = {};

    // Name check
    const nameVal = formData.fullName?.trim() || '';
    if (!nameVal) {
      newErrors.fullName = 'Full Name is required.';
    } else if (nameVal.length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters.';
    } else if (nameVal.length > 50) {
      newErrors.fullName = 'Name cannot exceed 50 characters.';
    }

    // DOB check
    if (!formData.dob) {
      newErrors.dob = 'Date of Birth is required.';
    } else if (calculatedAge !== null && calculatedAge < 18) {
      newErrors.dob = 'Under 18 restriction: You must be at least 18 years old to join Extroverts.';
    }

    // Gender check
    if (!formData.gender) {
      newErrors.gender = 'Please select your gender identity.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep()) {
      if (calculatedAge !== null && calculatedAge < 18) {
        addToast('error', 'Registration blocked: You must be 18+ to use Extroverts.');
      } else {
        addToast('error', 'Please complete all required profile details.');
      }
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onNext();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in">
      {/* Full Name */}
      <div className="form-group">
        <label className="form-label">Full Name / Display Name *</label>
        <div style={{ position: 'relative' }}>
          <User className="w-5 h-5" style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-subtle)'
          }} />
          <input
            type="text"
            className={`form-input ${errors.fullName ? 'input-error' : ''}`}
            placeholder="e.g. Alex Rivera"
            maxLength={50}
            style={{ paddingLeft: '2.5rem' }}
            value={formData.fullName || ''}
            onChange={(e) => {
              onChange('fullName', e.target.value);
              if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: null }));
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.3rem' }}>
          {errors.fullName ? (
            <span className="error-text">⚠️ {errors.fullName}</span>
          ) : (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>Max 50 characters</span>
          )}
          <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
            {(formData.fullName || '').length}/50
          </span>
        </div>
      </div>

      {/* Date of Birth & Age Calculation */}
      <div className="form-group">
        <label className="form-label">Date of Birth (DOB) *</label>
        <div style={{ position: 'relative' }}>
          <Calendar className="w-5 h-5" style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-subtle)'
          }} />
          <input
            type="date"
            className={`form-input ${errors.dob ? 'input-error' : ''}`}
            style={{ paddingLeft: '2.5rem', colorScheme: 'dark' }}
            value={formData.dob || ''}
            onChange={(e) => {
              onChange('dob', e.target.value);
              if (errors.dob) setErrors((prev) => ({ ...prev, dob: null }));
            }}
          />
        </div>

        {/* Real-Time Age Badge & Under 18 Warning Improvement */}
        {calculatedAge !== null && (
          <div style={{ marginTop: '0.6rem' }}>
            {calculatedAge >= 18 ? (
              <div style={{
                background: 'rgba(52, 199, 89, 0.1)',
                border: '1px solid rgba(52, 199, 89, 0.3)',
                borderRadius: '8px',
                padding: '0.5rem 0.8rem',
                fontSize: '0.8rem',
                color: '#86EFAC',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Age verified: <strong>{calculatedAge} years old</strong> (18+ Adult Verified)</span>
              </div>
            ) : (
              <div style={{
                background: 'rgba(255, 59, 48, 0.15)',
                border: '1px solid rgba(255, 59, 48, 0.5)',
                borderRadius: '10px',
                padding: '0.75rem 0.9rem',
                fontSize: '0.82rem',
                color: '#FCA5A5',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.6rem',
                boxShadow: '0 0 15px rgba(255, 59, 48, 0.2)'
              }}>
                <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <strong style={{ color: '#FFF' }}>Under 18 Age Restriction:</strong> You are currently <strong>{calculatedAge} years old</strong>. Extroverts is strictly reserved for users aged 18 and older for party safety reasons. You cannot proceed further.
                </div>
              </div>
            )}
          </div>
        )}
        {errors.dob && !calculatedAge && <div className="error-text">⚠️ {errors.dob}</div>}
      </div>

      {/* Gender Selection Pills */}
      <div className="form-group">
        <label className="form-label">Gender Identity *</label>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.6rem'
        }}>
          {GENDER_OPTIONS.map((g) => {
            const isSelected = formData.gender === g.id;
            return (
              <button
                key={g.id}
                type="button"
                className={`vibe-pill ${isSelected ? 'selected' : ''}`}
                style={{
                  justifyContent: 'center',
                  padding: '0.75rem',
                  fontSize: '0.88rem'
                }}
                onClick={() => {
                  onChange('gender', g.id);
                  if (errors.gender) setErrors((prev) => ({ ...prev, gender: null }));
                }}
              >
                <span>{g.icon}</span>
                <span>{g.label}</span>
              </button>
            );
          })}
        </div>
        {errors.gender && <div className="error-text">⚠️ {errors.gender}</div>}
      </div>

      {/* Pronouns Selection */}
      <div className="form-group">
        <label className="form-label">Preferred Pronouns (Optional)</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {PRONOUN_OPTIONS.map((p) => {
            const isSelected = formData.pronouns === p;
            return (
              <button
                key={p}
                type="button"
                className={`vibe-pill ${isSelected ? 'selected' : ''}`}
                onClick={() => onChange('pronouns', isSelected ? '' : p)}
              >
                <span>{p}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit / Next Button */}
      <button
        type="submit"
        className="btn-party"
        disabled={isLoading || (calculatedAge !== null && calculatedAge < 18)}
        style={{ width: '100%', padding: '0.9rem', marginTop: '1rem' }}
      >
        {isLoading ? (
          <>
            <div className="spinner" />
            <span>Saving Profile...</span>
          </>
        ) : (
          <>
            <span>Continue to Location</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
