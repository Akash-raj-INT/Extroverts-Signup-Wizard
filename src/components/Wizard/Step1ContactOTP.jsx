import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, Lock, ArrowRight, CheckCircle, RefreshCw, KeyRound, Sparkles } from 'lucide-react';

export default function Step1ContactOTP({ formData, onChange, onNext, addToast }) {
  const [contactType, setContactType] = useState('email'); // 'email' | 'phone'
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [errors, setErrors] = useState({});
  
  const otpInputRefs = useRef([]);

  // Countdown timer for OTP resend
  useEffect(() => {
    let interval = null;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  // Validate Contact Input
  const validateContact = () => {
    const newErrors = {};
    if (contactType === 'email') {
      const emailVal = formData.email?.trim() || '';
      if (!emailVal) {
        newErrors.email = 'Email address is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
        newErrors.email = 'Please enter a valid email address (e.g. alex@example.com).';
      }
    } else {
      const phoneVal = formData.phone?.trim() || '';
      if (!phoneVal) {
        newErrors.phone = 'Phone number is required.';
      } else if (!/^\d{10}$/.test(phoneVal.replace(/\D/g, ''))) {
        newErrors.phone = 'Please enter a valid 10-digit phone number.';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Send OTP
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!validateContact()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      setTimer(30);
      addToast('success', `Verification code sent to ${contactType === 'email' ? formData.email : formData.phone}`);
    }, 1200);
  };

  // OTP Input Changes with Auto-Focus
  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      // Handles paste of full code (e.g., "123456")
      const pastedDigits = value.replace(/\D/g, '').slice(0, 6).split('');
      const newOtp = [...otpDigits];
      pastedDigits.forEach((digit, idx) => {
        if (idx < 6) newOtp[idx] = digit;
      });
      setOtpDigits(newOtp);
      onChange('otp', newOtp.join(''));
      const nextIndex = Math.min(5, pastedDigits.length);
      otpInputRefs.current[nextIndex]?.focus();
      return;
    }

    const digit = value.replace(/\D/g, '');
    const newOtp = [...otpDigits];
    newOtp[index] = digit;
    setOtpDigits(newOtp);
    onChange('otp', newOtp.join(''));

    // Move to next input if digit entered
    if (digit && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace navigation across OTP boxes
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Handle Resend OTP
  const handleResend = () => {
    if (timer > 0) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setTimer(30);
      addToast('info', 'New OTP verification code sent!');
    }, 1000);
  };

  // Fill Demo OTP (123456)
  const handleFillDemoOtp = () => {
    const demo = ['1', '2', '3', '4', '5', '6'];
    setOtpDigits(demo);
    onChange('otp', '123456');
    setErrors((prev) => ({ ...prev, otp: null }));
    addToast('info', 'Demo OTP 123456 auto-filled!');
  };

  // Handle Submit & Verify Step 1
  const handleVerifyAndNext = (e) => {
    e.preventDefault();
    const fullOtp = otpDigits.join('');

    if (fullOtp.length < 6) {
      setErrors({ otp: 'Please enter the complete 6-digit verification code.' });
      addToast('error', 'Please enter all 6 digits of the OTP.');
      return;
    }

    // Demo OTP check (accepts 123456 or any 6 digits for testing ease, but shows error for 000000)
    if (fullOtp === '000000') {
      setErrors({ otp: 'Invalid code. Use demo code 123456.' });
      addToast('error', 'Invalid verification code!');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      addToast('success', 'Contact verified successfully!');
      onNext();
    }, 1200);
  };

  return (
    <div className="animate-fade-in">
      {!otpSent ? (
        /* Contact Method Selector & Input */
        <form onSubmit={handleSendOtp}>
          {/* Toggle Email / Phone */}
          <div style={{
            display: 'flex',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '4px',
            borderRadius: '12px',
            marginBottom: '1.5rem',
            border: '1px solid var(--border-subtle)'
          }}>
            <button
              type="button"
              onClick={() => { setContactType('email'); setErrors({}); }}
              style={{
                flex: 1,
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                border: 'none',
                background: contactType === 'email' ? 'var(--gradient-btn)' : 'transparent',
                color: '#FFF',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                transition: 'all 0.25s ease'
              }}
            >
              <Mail className="w-4 h-4" />
              <span>Email Address</span>
            </button>

            <button
              type="button"
              onClick={() => { setContactType('phone'); setErrors({}); }}
              style={{
                flex: 1,
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                border: 'none',
                background: contactType === 'phone' ? 'var(--gradient-btn)' : 'transparent',
                color: '#FFF',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                transition: 'all 0.25s ease'
              }}
            >
              <Phone className="w-4 h-4" />
              <span>Mobile Phone</span>
            </button>
          </div>

          {contactType === 'email' ? (
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <div style={{ position: 'relative' }}>
                <Mail className="w-5 h-5" style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-subtle)'
                }} />
                <input
                  type="email"
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                  placeholder="e.g. alex.party@extroverts.app"
                  style={{ paddingLeft: '2.5rem' }}
                  value={formData.email || ''}
                  onChange={(e) => {
                    onChange('email', e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                  }}
                />
              </div>
              {errors.email && <div className="error-text">⚠️ {errors.email}</div>}
            </div>
          ) : (
            <div className="form-group">
              <label className="form-label">Mobile Number *</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <select
                  className="form-select"
                  style={{ width: '90px', flexShrink: 0 }}
                  value={formData.countryCode || '+1'}
                  onChange={(e) => onChange('countryCode', e.target.value)}
                >
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+61">🇦🇺 +61</option>
                </select>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Phone className="w-5 h-5" style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-subtle)'
                  }} />
                  <input
                    type="tel"
                    className={`form-input ${errors.phone ? 'input-error' : ''}`}
                    placeholder="10-digit phone number"
                    style={{ paddingLeft: '2.5rem' }}
                    maxLength={10}
                    value={formData.phone || ''}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      onChange('phone', val);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: null }));
                    }}
                  />
                </div>
              </div>
              {errors.phone && <div className="error-text">⚠️ {errors.phone}</div>}
            </div>
          )}

          <div style={{
            background: 'rgba(0, 240, 255, 0.05)',
            border: '1px solid rgba(0, 240, 255, 0.15)',
            borderRadius: '12px',
            padding: '0.8rem 1rem',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem'
          }}>
            <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>We'll send a 6-digit verification code to confirm your contact info.</span>
          </div>

          <button
            type="submit"
            className="btn-party"
            disabled={isLoading}
            style={{ width: '100%', padding: '0.9rem' }}
          >
            {isLoading ? (
              <>
                <div className="spinner" />
                <span>Sending Verification Code...</span>
              </>
            ) : (
              <>
                <span>Send Verification Code</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      ) : (
        /* OTP Verification Screen (Improved UX) */
        <form onSubmit={handleVerifyAndNext}>
          <div style={{
            textAlign: 'center',
            marginBottom: '1.5rem',
            background: 'rgba(157, 78, 221, 0.08)',
            border: '1px solid rgba(157, 78, 221, 0.2)',
            borderRadius: '16px',
            padding: '1.25rem'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(255, 0, 127, 0.15)',
              border: '1px solid var(--primary-pink)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.75rem'
            }}>
              <KeyRound className="w-6 h-6 text-pink-400 animate-pulse" />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFF' }}>
              Enter 6-Digit Code
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Sent to <strong style={{ color: 'var(--primary-cyan)' }}>{contactType === 'email' ? formData.email : `${formData.countryCode} ${formData.phone}`}</strong>
              <button
                type="button"
                onClick={() => setOtpSent(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary-pink)',
                  marginLeft: '8px',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}
              >
                Change
              </button>
            </p>
          </div>

          {/* OTP Digit Boxes */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '1.25rem'
          }}>
            {otpDigits.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (otpInputRefs.current[idx] = el)}
                type="text"
                inputMode="numeric"
                maxLength={6} // Allows paste handling in single box
                className="otp-digit-box"
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(idx, e)}
              />
            ))}
          </div>

          {errors.otp && (
            <div className="error-text" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
              ⚠️ {errors.otp}
            </div>
          )}

          {/* Demo Helper Button & Resend Timer */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            fontSize: '0.8rem'
          }}>
            <button
              type="button"
              onClick={handleFillDemoOtp}
              style={{
                background: 'rgba(0, 240, 255, 0.1)',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                color: 'var(--primary-cyan)',
                borderRadius: '999px',
                padding: '0.3rem 0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontWeight: 600
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fill Demo (123456)</span>
            </button>

            <div>
              {timer > 0 ? (
                <span style={{ color: 'var(--text-subtle)' }}>
                  Resend in <strong style={{ color: '#FFF' }}>0:{timer < 10 ? `0${timer}` : timer}s</strong>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary-pink)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Resend Code</span>
                </button>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="btn-party"
            disabled={isLoading}
            style={{ width: '100%', padding: '0.9rem' }}
          >
            {isLoading ? (
              <>
                <div className="spinner" />
                <span>Verifying Code...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Verify Code & Continue</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
