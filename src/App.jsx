import React, { useState } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import TermsModal from './components/TermsModal';
import Toast from './components/Toast';
import StepProgress from './components/Wizard/StepProgress';
import Step1ContactOTP from './components/Wizard/Step1ContactOTP';
import Step2ProfileDetails from './components/Wizard/Step2ProfileDetails';
import Step3LocationCampus from './components/Wizard/Step3LocationCampus';
import Step4VibesPhotoBio from './components/Wizard/Step4VibesPhotoBio';
import SuccessPass from './components/Wizard/SuccessPass';

const INITIAL_FORM_DATA = {
  email: '',
  phone: '',
  countryCode: '+1',
  otp: '',
  fullName: '',
  dob: '',
  age: null,
  gender: '',
  pronouns: '',
  state: '',
  city: '',
  college: '',
  neighborhood: '',
  vibes: ['vibe_edm', 'vibe_house', 'vibe_rooftop'],
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  bio: ''
};

export default function App() {
  const [viewMode, setViewMode] = useState('landing'); // 'landing' | 'wizard' | 'success'
  const [currentStep, setCurrentStep] = useState(1);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isMobileSim, setIsMobileSim] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [toasts, setToasts] = useState([]);

  // Toast Handler
  const addToast = (type, message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Form Field Update Helper
  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // Back Navigation Logic
  const handleGoBack = () => {
    if (viewMode === 'success') {
      setViewMode('landing');
      return;
    }

    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      setViewMode('landing');
    }
  };

  // Reset Wizard Form Data
  const handleResetForm = () => {
    if (window.confirm('Reset all form entries and return to Step 1?')) {
      setFormData(INITIAL_FORM_DATA);
      setCurrentStep(1);
      setViewMode('wizard');
      addToast('info', 'Wizard form draft cleared.');
    }
  };

  // Start Signup Wizard
  const handleStartWizard = () => {
    setViewMode('wizard');
    setCurrentStep(1);
  };

  // Terms Acceptance Handler
  const handleAcceptTermsAndProceed = () => {
    setIsTermsOpen(false);
    setViewMode('wizard');
    setCurrentStep(1);
    addToast('success', 'Terms accepted! Proceeding to Step 1 Verification.');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Toast Notification Layer */}
      <Toast toasts={toasts} onDismiss={removeToast} />

      {/* Main App Navigation Header */}
      <Header
        isMobileSim={isMobileSim}
        onToggleMobileSim={() => setIsMobileSim(!isMobileSim)}
        onOpenTerms={() => setIsTermsOpen(true)}
        onGoHome={() => setViewMode('landing')}
        currentView={viewMode}
      />

      {/* Terms and Conditions Modal */}
      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        onAcceptAndProceed={handleAcceptTermsAndProceed}
      />

      {/* Main Content Body */}
      <main style={{
        flex: 1,
        padding: isMobileSim ? '1rem 0.5rem' : '2rem 1.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: viewMode === 'landing' ? 'flex-start' : 'center'
      }}>
        <div className={`device-container ${isMobileSim ? 'device-mode-mobile' : ''}`}>
          {isMobileSim && (
            <div className="device-notch">
              <div className="notch-camera" />
              <div className="notch-speaker" />
            </div>
          )}

          <div style={{ padding: isMobileSim ? '1.25rem 1rem 2rem' : '0' }}>
            {viewMode === 'landing' && (
              <LandingPage
                onStartWizard={handleStartWizard}
                onOpenTerms={() => setIsTermsOpen(true)}
              />
            )}

            {viewMode === 'wizard' && (
              <div className="glass-card animate-fade-in" style={{
                maxWidth: '540px',
                margin: '0 auto',
                padding: '2rem 1.75rem',
                border: '1px solid rgba(157, 78, 221, 0.3)'
              }}>
                <StepProgress
                  currentStep={currentStep}
                  onGoBack={handleGoBack}
                  onReset={handleResetForm}
                />

                {currentStep === 1 && (
                  <Step1ContactOTP
                    formData={formData}
                    onChange={handleFieldChange}
                    onNext={() => setCurrentStep(2)}
                    addToast={addToast}
                  />
                )}

                {currentStep === 2 && (
                  <Step2ProfileDetails
                    formData={formData}
                    onChange={handleFieldChange}
                    onNext={() => setCurrentStep(3)}
                    addToast={addToast}
                  />
                )}

                {currentStep === 3 && (
                  <Step3LocationCampus
                    formData={formData}
                    onChange={handleFieldChange}
                    onNext={() => setCurrentStep(4)}
                    addToast={addToast}
                  />
                )}

                {currentStep === 4 && (
                  <Step4VibesPhotoBio
                    formData={formData}
                    onChange={handleFieldChange}
                    onSubmitComplete={() => setViewMode('success')}
                    addToast={addToast}
                  />
                )}
              </div>
            )}

            {viewMode === 'success' && (
              <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <SuccessPass
                  formData={formData}
                  onReset={() => {
                    setFormData(INITIAL_FORM_DATA);
                    setCurrentStep(1);
                    setViewMode('wizard');
                  }}
                  onGoHome={() => setViewMode('landing')}
                  addToast={addToast}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '1.25rem',
        fontSize: '0.8rem',
        color: 'var(--text-subtle)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        background: 'rgba(5, 4, 10, 0.9)'
      }}>
        Extroverts Party & Hangout Signup Wizard Replication • Front-End Assessment Exercise
      </footer>
    </div>
  );
}
