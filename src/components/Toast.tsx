import React from 'react';
import { ToastMessage } from '../types/obra';
import { CheckCircle, Info, Warning, XCircle, X } from '@phosphor-icons/react';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" role="region" aria-live="polite">
      {toasts.map((toast) => {
        let IconComponent = CheckCircle;
        let iconColor = '#16a34a';

        if (toast.tipo === 'info') {
          IconComponent = Info;
          iconColor = 'var(--cinnamon-wood-500)';
        } else if (toast.tipo === 'warning') {
          IconComponent = Warning;
          iconColor = 'var(--pitch-black-500)';
        } else if (toast.tipo === 'error') {
          IconComponent = XCircle;
          iconColor = 'var(--coral-glow-500)';
        }

        return (
          <div key={toast.id} className={`toast-item ${toast.tipo}`}>
            <IconComponent size={24} weight="fill" color={iconColor} style={{ flexShrink: 0, marginTop: 2 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{toast.titulo}</div>
              {toast.descricao && (
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: 3 }}>
                  {toast.descricao}
                </div>
              )}
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              style={{ color: '#94a3b8', padding: 4, display: 'flex', alignItems: 'center' }}
              title="Fechar"
              aria-label="Fechar notificação"
            >
              <X size={16} weight="bold" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
