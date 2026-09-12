import React, { useState } from 'react';
import { PARTY_VIBES, PRESET_AVATARS } from '../../data/mockData';
import { Camera, Sparkles, Upload, Check, Trash2, PartyPopper } from 'lucide-react';

export default function Step4VibesPhotoBio({ formData, onChange, onSubmitComplete, addToast }) {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const selectedVibes = formData.vibes || [];

  // Toggle Vibe tag selection
  const handleToggleVibe = (vibeId) => {
    let updated = [...selectedVibes];
    if (updated.includes(vibeId)) {
      updated = updated.filter((id) => id !== vibeId);
    } else {
      updated.push(vibeId);
    }
    onChange('vibes', updated);
    if (errors.vibes && updated.length >= 3) {
      setErrors((prev) => ({ ...prev, vibes: null }));
    }
  };

  // Handle Photo File Upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        addToast('error', 'Image size should be under 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange('avatarUrl', reader.result);
        addToast('success', 'Profile photo uploaded!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Quick Preset Avatar Select
  const handleSelectPresetAvatar = (url) => {
    onChange('avatarUrl', url);
    addToast('info', 'Avatar preset selected!');
  };

  // Quick Bio Prompt insert
  const handleQuickBio = (text) => {
    onChange('bio', text);
  };

  const validateStep = () => {
    const newErrors = {};
    if (selectedVibes.length < 3) {
      newErrors.vibes = `Please select at least 3 party vibe tags (${selectedVibes.length}/3 selected).`;
    }

    const bioVal = formData.bio?.trim() || '';
    if (bioVal.length > 150) {
      newErrors.bio = 'Bio cannot exceed 150 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep()) {
      addToast('error', 'Please select at least 3 party vibe tags.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSubmitComplete();
    }, 1800);
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in">
      {/* 1. Select Party Vibes (Min 3 required) */}
      <div className="form-group">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <label className="form-label" style={{ margin: 0 }}>
            Select Your Party Vibes * <span style={{ color: 'var(--primary-pink)' }}>(Min 3 required)</span>
          </label>
          <span style={{ fontSize: '0.75rem', color: selectedVibes.length >= 3 ? '#86EFAC' : 'var(--primary-pink)', fontWeight: 600 }}>
            {selectedVibes.length}/3 selected
          </span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
          {PARTY_VIBES.map((vibe) => {
            const isSelected = selectedVibes.includes(vibe.id);
            return (
              <button
                key={vibe.id}
                type="button"
                className={`vibe-pill ${isSelected ? 'selected' : ''}`}
                onClick={() => handleToggleVibe(vibe.id)}
                title={vibe.description}
              >
                <span>{vibe.icon}</span>
                <span>{vibe.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 ml-1 text-pink-300" />}
              </button>
            );
          })}
        </div>
        {errors.vibes && <div className="error-text">⚠️ {errors.vibes}</div>}
      </div>

      {/* 2. Profile Photo Upload or Preset Picker */}
      <div className="form-group" style={{ marginTop: '1.5rem' }}>
        <label className="form-label">Profile Photo / Avatar</label>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px dashed var(--border-subtle)',
          borderRadius: '16px',
          padding: '1rem'
        }}>
          {/* Avatar Preview */}
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'var(--bg-input)',
            border: '2px solid var(--primary-pink)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 0 15px rgba(255, 0, 127, 0.3)'
          }}>
            {formData.avatarUrl ? (
              <img src={formData.avatarUrl} alt="Profile Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <Camera className="w-8 h-8 text-pink-400 opacity-60" />
            )}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <label className="btn-ghost" style={{ fontSize: '0.78rem', padding: '0.4rem 0.8rem', cursor: 'pointer' }}>
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Photo</span>
                <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
              </label>

              {formData.avatarUrl && (
                <button
                  type="button"
                  onClick={() => onChange('avatarUrl', '')}
                  style={{
                    background: 'rgba(255, 59, 48, 0.15)',
                    border: '1px solid rgba(255, 59, 48, 0.3)',
                    color: '#FF3B30',
                    borderRadius: '999px',
                    padding: '0.4rem 0.7rem',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              )}
            </div>

            {/* Quick Avatar Presets */}
            <p style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', marginBottom: '0.4rem' }}>
              Or pick a party avatar:
            </p>
            <div style={{ display: 'flex', gap: '6px' }}>
              {PRESET_AVATARS.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Preset ${idx}`}
                  onClick={() => handleSelectPresetAvatar(url)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: formData.avatarUrl === url ? '2px solid var(--primary-cyan)' : '1px solid var(--border-subtle)',
                    transform: formData.avatarUrl === url ? 'scale(1.15)' : 'scale(1)',
                    transition: 'all 0.2s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Short Bio */}
      <div className="form-group" style={{ marginTop: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <label className="form-label" style={{ margin: 0 }}>Short Bio (Optional)</label>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
            {(formData.bio || '').length}/150
          </span>
        </div>

        <textarea
          className={`form-textarea ${errors.bio ? 'input-error' : ''}`}
          rows={3}
          maxLength={150}
          placeholder="Tell others what kind of party animal or chill lounge vibe you bring..."
          value={formData.bio || ''}
          onChange={(e) => {
            onChange('bio', e.target.value);
            if (errors.bio) setErrors((prev) => ({ ...prev, bio: null }));
          }}
        />
        {errors.bio && <div className="error-text">⚠️ {errors.bio}</div>}

        {/* Quick Prompts */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.6rem' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', display: 'flex', alignItems: 'center', gap: '2px' }}>
            <Sparkles className="w-3 h-3 text-pink-400" /> Prompts:
          </span>
          {[
            "Always up for techno nights! 🎧",
            "House party host & cocktail maker 🍹",
            "Looking for campus fest buddies 🎪"
          ].map((promptText, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleQuickBio(promptText)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-muted)',
                borderRadius: '999px',
                padding: '0.2rem 0.6rem',
                fontSize: '0.72rem',
                cursor: 'pointer'
              }}
            >
              + {promptText}
            </button>
          ))}
        </div>
      </div>

      {/* Final Submit Button */}
      <button
        type="submit"
        className="btn-party"
        disabled={isLoading}
        style={{
          width: '100%',
          padding: '1rem',
          marginTop: '1.25rem',
          fontSize: '1rem',
          boxShadow: '0 0 25px rgba(255, 0, 127, 0.5)'
        }}
      >
        {isLoading ? (
          <>
            <div className="spinner" />
            <span>Creating VIP Party Pass...</span>
          </>
        ) : (
          <>
            <PartyPopper className="w-5 h-5 animate-bounce" />
            <span>Complete Registration & Join Parties</span>
          </>
        )}
      </button>
    </form>
  );
}
