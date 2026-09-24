import React, { useState } from 'react';
import { Camera, NotePencil, X, Check, CaretDown, CaretUp, Sparkle } from '@phosphor-icons/react';
import { Tarefa, Etapa } from '../types/obra';

interface ModalAddMediaProps {
  isOpen: boolean;
  tarefa: Tarefa | null;
  etapa: Etapa | null;
  onClose: () => void;
  onSaveMedia: (data: {
    fotoBase64?: string;
    anotacao?: string;
  }) => void;
}

export const ModalAddMedia: React.FC<ModalAddMediaProps> = ({
  isOpen,
  tarefa,
  etapa,
  onClose,
  onSaveMedia,
}) => {
  const [openSection, setOpenSection] = useState<'none' | 'foto' | 'nota' | 'both'>('none');
  const [anotacao, setAnotacao] = useState('');
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);

  if (!isOpen || !tarefa) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const hasContent = Boolean(fotoPreview || anotacao.trim());

  const handleSalvar = () => {
    onSaveMedia({
      fotoBase64: fotoPreview || undefined,
      anotacao: anotacao.trim() || undefined,
    });
    setAnotacao('');
    setFotoPreview(null);
    setOpenSection('none');
    onClose();
  };

  const handleFecharSemSalvar = () => {
    setAnotacao('');
    setFotoPreview(null);
    setOpenSection('none');
    onClose();
  };

  const toggleSection = (section: 'foto' | 'nota') => {
    if (openSection === section) {
      setOpenSection('none');
    } else if (openSection === 'both') {
      setOpenSection(section === 'foto' ? 'nota' : 'foto');
    } else if (openSection === 'none') {
      setOpenSection(section);
    } else {
      setOpenSection('both');
    }
  };

  const isFotoOpen = openSection === 'foto' || openSection === 'both';
  const isNotaOpen = openSection === 'nota' || openSection === 'both';

  return (
    <div className="modal-backdrop" onClick={handleFecharSemSalvar}>
      <div
        className="modal-card"
        style={{ maxWidth: '460px' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        {/* Cabeçalho Limpo e Direto */}
        <div className="modal-header" style={{ padding: '16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: '#dcfce7',
                color: '#16a34a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Check size={16} weight="bold" />
            </div>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.2 }}>
                {tarefa.nome}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                {etapa?.nome}
              </div>
            </div>
          </div>
          <button onClick={handleFecharSemSalvar} className="btn-icon" title="Fechar">
            <X size={16} weight="bold" />
          </button>
        </div>

        {/* Corpo: Acordeons Opcionais para Foto e Anotação */}
        <div className="modal-body" style={{ padding: '16px 20px' }}>
          <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 12 }}>
            Deseja anexar comprovação a este serviço?
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {/* Acordeon 1: Foto */}
            <div
              style={{
                border: '1px solid var(--border-hairline)',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                background: '#ffffff',
              }}
            >
              <button
                type="button"
                onClick={() => toggleSection('foto')}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: isFotoOpen ? 'var(--dark-coffee-50)' : '#ffffff',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: isFotoOpen ? 'var(--primary-accent)' : 'var(--text-body)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Camera size={18} weight={isFotoOpen ? 'fill' : 'bold'} />
                  <span>Foto do serviço</span>
                  {fotoPreview && <Check size={14} weight="bold" color="#16a34a" />}
                </div>
                {isFotoOpen ? <CaretUp size={16} /> : <CaretDown size={16} />}
              </button>

              {isFotoOpen && (
                <div style={{ padding: '12px 14px', borderTop: '1px solid var(--border-subtle)' }}>
                  {fotoPreview ? (
                    <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
                      <img
                        src={fotoPreview}
                        alt="Foto da obra"
                        style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }}
                      />
                      <button
                        type="button"
                        onClick={() => setFotoPreview(null)}
                        style={{
                          position: 'absolute',
                          top: 6,
                          right: 6,
                          background: 'rgba(0,0,0,0.65)',
                          color: '#ffffff',
                          borderRadius: '50%',
                          padding: 4,
                          display: 'flex',
                        }}
                        title="Remover"
                      >
                        <X size={14} weight="bold" />
                      </button>
                    </div>
                  ) : (
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        padding: '14px',
                        border: '1.5px dashed var(--dark-coffee-200)',
                        borderRadius: 8,
                        cursor: 'pointer',
                        background: 'var(--dark-coffee-50)',
                        color: 'var(--primary-accent)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                      }}
                    >
                      <Camera size={20} weight="bold" />
                      <span>Selecionar ou tirar foto</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                    </label>
                  )}
                </div>
              )}
            </div>

            {/* Acordeon 2: Anotação */}
            <div
              style={{
                border: '1px solid var(--border-hairline)',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                background: '#ffffff',
              }}
            >
              <button
                type="button"
                onClick={() => toggleSection('nota')}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: isNotaOpen ? 'var(--dark-coffee-50)' : '#ffffff',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: isNotaOpen ? 'var(--primary-accent)' : 'var(--text-body)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <NotePencil size={18} weight={isNotaOpen ? 'fill' : 'bold'} />
                  <span>Observação escrita</span>
                  {anotacao.trim() && <Check size={14} weight="bold" color="#16a34a" />}
                </div>
                {isNotaOpen ? <CaretUp size={16} /> : <CaretDown size={16} />}
              </button>

              {isNotaOpen && (
                <div style={{ padding: '12px 14px', borderTop: '1px solid var(--border-subtle)' }}>
                  <textarea
                    rows={2}
                    className="form-textarea"
                    style={{ fontSize: '0.88rem', padding: '8px 10px' }}
                    placeholder="Ex: Executado conforme o projeto estrutural..."
                    value={anotacao}
                    onChange={(e) => setAnotacao(e.target.value)}
                    autoFocus
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Rodapé Dinâmico */}
        <div
          style={{
            padding: '12px 20px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 10,
            background: 'var(--dark-coffee-50)',
          }}
        >
          {hasContent ? (
            <>
              <button
                type="button"
                onClick={handleFecharSemSalvar}
                className="btn-secondary"
                style={{ padding: '8px 14px', fontSize: '0.85rem' }}
              >
                Pular
              </button>
              <button
                type="button"
                onClick={handleSalvar}
                className="btn-primary"
                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              >
                <Sparkle size={15} weight="fill" />
                <span>Salvar Registro</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleFecharSemSalvar}
              className="btn-primary"
              style={{ padding: '8px 20px', fontSize: '0.88rem' }}
            >
              <span>Concluir</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
