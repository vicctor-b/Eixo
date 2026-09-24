import React, { useState } from 'react';
import { X, Copy, Check, ShareNetwork, Eye, ShieldCheck, UserCheck } from '@phosphor-icons/react';
import { Obra } from '../types/obra';

interface ModalShareClientProps {
  isOpen: boolean;
  onClose: () => void;
  obra: Obra;
  onSwitchToClient: () => void;
}

export const ModalShareClient: React.FC<ModalShareClientProps> = ({
  isOpen,
  onClose,
  obra,
  onSwitchToClient,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const url = `${window.location.origin}${window.location.pathname}?perfil=cliente&obra=${obra.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2800);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card"
        style={{ maxWidth: 540 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'var(--coral-glow-100)',
                color: 'var(--primary-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShareNetwork size={20} weight="bold" />
            </div>
            <div>
              <h2 className="modal-title" style={{ fontSize: '1.15rem' }}>
                Compartilhar Acesso com Cliente
              </h2>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {obra.nome} • Cliente: {obra.cliente}
              </span>
            </div>
          </div>

          <button onClick={onClose} className="btn-icon" title="Fechar">
            <X size={18} weight="bold" />
          </button>
        </div>

        {/* Corpo */}
        <div className="modal-body" style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', margin: 0, lineHeight: 1.5 }}>
            Envie este link direto para o cliente acompanhar o diário de obra. O acesso dele é focado em transparência, com permissões controladas.
          </p>

          {/* Campo com Link e Botão Copiar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--bg-surface)',
              border: '1.5px solid var(--border-hairline)',
              borderRadius: 'var(--radius-sm)',
              padding: '6px 8px 6px 14px',
              gap: 8,
            }}
          >
            <input
              type="text"
              readOnly
              value={url}
              style={{
                border: 'none',
                background: 'none',
                fontSize: '0.85rem',
                color: 'var(--text-main)',
                flex: 1,
                outline: 'none',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            />

            <button
              type="button"
              onClick={handleCopy}
              className="btn-primary"
              style={{ padding: '8px 14px', fontSize: '0.82rem', whiteSpace: 'nowrap' }}
            >
              {copied ? (
                <>
                  <Check size={14} weight="bold" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy size={14} weight="bold" />
                  <span>Copiar Link</span>
                </>
              )}
            </button>
          </div>

          {/* Como funciona o acesso do cliente */}
          <div
            style={{
              background: 'var(--dark-coffee-50)',
              borderRadius: 'var(--radius-sm)',
              padding: '16px',
              border: '1px solid var(--border-hairline)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <ShieldCheck size={18} color="var(--primary-accent)" />
              O que o cliente pode fazer:
            </strong>

            <ul style={{ margin: 0, paddingLeft: 20, fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              <li>
                <strong>Cronograma Visual Read-Only:</strong> Acompanha o avanço das etapas, datas de conclusão e vê fotos do diário sem poder editar ou excluir serviços.
              </li>
              <li>
                <strong>Assinatura Digital de Decisões:</strong> Analisa escolhas de acabamentos, cores e alterações, assinando ou solicitando ajustes com segurança jurídica.
              </li>
              <li>
                <strong>Notificações Automáticas:</strong> É alertado sempre que você registrar uma nova decisão que precise do aceite dele.
              </li>
            </ul>
          </div>
        </div>

        {/* Rodapé com Ação Rápida de Testar */}
        <div className="modal-footer" style={{ justifyContent: 'space-between', padding: '14px 24px' }}>
          <button
            type="button"
            onClick={() => {
              onSwitchToClient();
              onClose();
            }}
            className="btn-secondary"
            style={{ fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <UserCheck size={16} weight="bold" />
            <span>Simular Visão do Cliente</span>
          </button>

          <button type="button" onClick={onClose} className="btn-primary" style={{ fontSize: '0.85rem' }}>
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
};
