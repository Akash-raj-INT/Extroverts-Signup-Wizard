import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

export default function Toast({ toasts = [], onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'error': return <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
      default: return <Info className="w-5 h-5 text-cyan-400 shrink-0" />;
    }
  };

  const getStyles = (type) => {
    switch (type) {
      case 'error': return 'bg-red-950/90 border-red-500/50 text-red-200 shadow-red-950/50';
      case 'success': return 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200 shadow-emerald-950/50';
      case 'warning': return 'bg-amber-950/90 border-amber-500/50 text-amber-200 shadow-amber-950/50';
      default: return 'bg-slate-900/90 border-cyan-500/50 text-cyan-200 shadow-cyan-950/50';
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      maxWidth: '380px',
      width: 'calc(100% - 40px)'
    }}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-fade-in"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            padding: '12px 16px',
            borderRadius: '12px',
            backdropFilter: 'blur(12px)',
            border: '1px solid',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            fontSize: '0.9rem',
            lineHeight: '1.4'
          }}
          className={`glass-toast ${getStyles(toast.type)}`}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {getIcon(toast.type)}
            <span>{toast.message}</span>
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'currentColor',
              opacity: 0.7,
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
