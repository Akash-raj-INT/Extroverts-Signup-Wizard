import React, { useState, useEffect } from 'react';
import { LOCATION_DATA } from '../../data/mockData';
import { MapPin, Building2, GraduationCap, Compass, ArrowRight } from 'lucide-react';

export default function Step3LocationCampus({ formData, onChange, onNext, addToast }) {
  const [availableCities, setAvailableCities] = useState([]);
  const [availableColleges, setAvailableColleges] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Cross-Field Logic: Handle State Change
  const handleStateChange = (selectedState) => {
    onChange('state', selectedState);
    onChange('city', ''); // Reset city
    onChange('college', ''); // Reset college

    if (selectedState && LOCATION_DATA[selectedState]) {
      setAvailableCities(LOCATION_DATA[selectedState].cities);
    } else {
      setAvailableCities([]);
    }
    setAvailableColleges([]);
  };

  // Cross-Field Logic: Handle City Change
  const handleCityChange = (selectedCity) => {
    onChange('city', selectedCity);
    onChange('college', ''); // Reset college

    const currentState = formData.state;
    if (currentState && selectedCity && LOCATION_DATA[currentState]?.colleges[selectedCity]) {
      setAvailableColleges(LOCATION_DATA[currentState].colleges[selectedCity]);
    } else {
      setAvailableColleges(["Working Professional / Other", "Local Resident"]);
    }
  };

  // Initialize available options if state/city already set in formData
  useEffect(() => {
    if (formData.state && LOCATION_DATA[formData.state]) {
      setAvailableCities(LOCATION_DATA[formData.state].cities);
      if (formData.city && LOCATION_DATA[formData.state].colleges[formData.city]) {
        setAvailableColleges(LOCATION_DATA[formData.state].colleges[formData.city]);
      }
    }
  }, [formData.state, formData.city]);

  const validateStep = () => {
    const newErrors = {};
    if (!formData.state) newErrors.state = 'Please select your state/region.';
    if (!formData.city) newErrors.city = 'Please select your city.';
    if (!formData.college) newErrors.college = 'Please select your college or status.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep()) {
      addToast('error', 'Please complete state, city, and college location fields.');
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
      <div style={{
        background: 'rgba(0, 240, 255, 0.06)',
        border: '1px solid rgba(0, 240, 255, 0.2)',
        borderRadius: '14px',
        padding: '0.9rem 1.1rem',
        fontSize: '0.82rem',
        color: 'var(--text-muted)',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem'
      }}>
        <Compass className="w-5 h-5 text-cyan-400 shrink-0" />
        <span>Extroverts filters party invites based on your nearby state, city, and campus community.</span>
      </div>

      {/* 1. State Selector */}
      <div className="form-group">
        <label className="form-label">State / Region *</label>
        <div style={{ position: 'relative' }}>
          <MapPin className="w-5 h-5" style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-subtle)'
          }} />
          <select
            className={`form-select ${errors.state ? 'input-error' : ''}`}
            style={{ paddingLeft: '2.5rem' }}
            value={formData.state || ''}
            onChange={(e) => {
              handleStateChange(e.target.value);
              if (errors.state) setErrors((prev) => ({ ...prev, state: null }));
            }}
          >
            <option value="">-- Select State --</option>
            {Object.keys(LOCATION_DATA).map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        {errors.state && <div className="error-text">⚠️ {errors.state}</div>}
      </div>

      {/* 2. City Selector (Cross-Field Filtered) */}
      <div className="form-group">
        <label className="form-label">City * {formData.state && <span style={{ color: 'var(--primary-cyan)', fontSize: '0.75rem' }}>(Filtered by {formData.state})</span>}</label>
        <div style={{ position: 'relative' }}>
          <Building2 className="w-5 h-5" style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-subtle)'
          }} />
          <select
            className={`form-select ${errors.city ? 'input-error' : ''}`}
            style={{ paddingLeft: '2.5rem' }}
            disabled={!formData.state}
            value={formData.city || ''}
            onChange={(e) => {
              handleCityChange(e.target.value);
              if (errors.city) setErrors((prev) => ({ ...prev, city: null }));
            }}
          >
            <option value="">
              {!formData.state ? '-- First Select a State --' : '-- Select City --'}
            </option>
            {availableCities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        {errors.city && <div className="error-text">⚠️ {errors.city}</div>}
      </div>

      {/* 3. College / Campus Selector (Cross-Field Filtered) */}
      <div className="form-group">
        <label className="form-label">College / University / Status *</label>
        <div style={{ position: 'relative' }}>
          <GraduationCap className="w-5 h-5" style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-subtle)'
          }} />
          <select
            className={`form-select ${errors.college ? 'input-error' : ''}`}
            style={{ paddingLeft: '2.5rem' }}
            disabled={!formData.city}
            value={formData.college || ''}
            onChange={(e) => {
              onChange('college', e.target.value);
              if (errors.college) setErrors((prev) => ({ ...prev, college: null }));
            }}
          >
            <option value="">
              {!formData.city ? '-- First Select a City --' : '-- Select College or Status --'}
            </option>
            {availableColleges.map((college) => (
              <option key={college} value={college}>{college}</option>
            ))}
          </select>
        </div>
        {errors.college && <div className="error-text">⚠️ {errors.college}</div>}
      </div>

      {/* 4. Neighborhood / Area landmark (Optional) */}
      <div className="form-group">
        <label className="form-label">Favorite Party Area / Neighborhood (Optional)</label>
        <input
          type="text"
          className="form-input"
          placeholder="e.g. Downtown, Westside, Bandra, Koramangala"
          maxLength={40}
          value={formData.neighborhood || ''}
          onChange={(e) => onChange('neighborhood', e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn-party"
        disabled={isLoading}
        style={{ width: '100%', padding: '0.9rem', marginTop: '1rem' }}
      >
        {isLoading ? (
          <>
            <div className="spinner" />
            <span>Filtering Local Vibe...</span>
          </>
        ) : (
          <>
            <span>Continue to Party Vibe</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
