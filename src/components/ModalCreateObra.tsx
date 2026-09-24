import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Check, Sparkle, BuildingApartment, User, MapPin, CalendarBlank } from '@phosphor-icons/react';

interface ModalCreateObraProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    nome: string;
    cliente: string;
    endereco: string;
    dataPrevista: string;
  }) => void;
}

export const ModalCreateObra: React.FC<ModalCreateObraProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [nome, setNome] = useState('');
  const [cliente, setCliente] = useState('');
  const [endereco, setEndereco] = useState('');
  const [dataPrevista, setDataPrevista] = useState('');
  const [erro, setErro] = useState('');

  if (!isOpen) return null;

  const handleNextFrom1 = () => {
    if (!nome.trim()) {
      setErro('Informe o nome da obra para continuar.');
      return;
    }
    setErro('');
    setStep(2);
  };

  const handleNextFrom2 = () => {
    if (!cliente.trim()) {
      setErro('Informe o nome do cliente para continuar.');
      return;
    }
    setErro('');
    setStep(3);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !cliente.trim()) {
      setErro('Preencha os campos obrigatórios.');
      return;
    }

    onSubmit({
      nome: nome.trim(),
      cliente: cliente.trim(),
      endereco: endereco.trim() || 'Endereço não informado',
      dataPrevista: dataPrevista || new Date().toISOString().split('T')[0],
    });

    // Reset
    setNome('');
    setCliente('');
    setEndereco('');
    setDataPrevista('');
    setStep(1);
    setErro('');
  };

  const handleClose = () => {
    setStep(1);
    setErro('');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div
        className="modal-card"
        style={{ maxWidth: '520px' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        {/* Header com Stepper Minimalista */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-accent)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
              Passo {step} de 3
            </span>
          </div>
          <button onClick={handleClose} className="btn-icon" title="Fechar">
            <X size={18} weight="bold" />
          </button>
        </div>

        {/* Linha de Progresso do Wizard */}
        <div style={{ height: 3, background: 'var(--dark-coffee-100)' }}>
          <div
            style={{
              height: '100%',
              background: 'var(--primary-accent)',
              width: `${(step / 3) * 100}%`,
              transition: 'width 0.25s ease',
            }}
          />
        </div>

        <form onSubmit={step === 3 ? handleFinalSubmit : (e) => { e.preventDefault(); if (step === 1) handleNextFrom1(); else handleNextFrom2(); }}>
          <div className="modal-body" style={{ padding: '28px 24px' }}>
            {erro && (
              <div
                style={{
                  background: 'var(--coral-glow-50)',
                  border: '1px solid var(--coral-glow-300)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 14px',
                  color: 'var(--coral-glow-700)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  marginBottom: 18,
                }}
              >
                {erro}
              </div>
            )}

            {/* Passo 1: Nome da Obra */}
            {step === 1 && (
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 8 }}>
                  Qual o nome desta obra?
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 20 }}>
                  Identificação rápida usada pela sua equipe.
                </p>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <input
                    type="text"
                    className="form-input"
                    style={{ fontSize: '1.05rem', padding: '12px 14px' }}
                    placeholder="Ex: Reforma Apto 402, Casa Lago Sul..."
                    value={nome}
                    onChange={(e) => {
                      setNome(e.target.value);
                      if (erro) setErro('');
                    }}
                    autoFocus
                  />
                </div>
              </div>
            )}

            {/* Passo 2: Cliente */}
            {step === 2 && (
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 8 }}>
                  Quem é o cliente?
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 20 }}>
                  Nome da pessoa ou empresa proprietária.
                </p>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <input
                    type="text"
                    className="form-input"
                    style={{ fontSize: '1.05rem', padding: '12px 14px' }}
                    placeholder="Ex: Dra. Carolina Mendes, Carlos Eduardo..."
                    value={cliente}
                    onChange={(e) => {
                      setCliente(e.target.value);
                      if (erro) setErro('');
                    }}
                    autoFocus
                  />
                </div>
              </div>
            )}

            {/* Passo 3: Localização e Prazo */}
            {step === 3 && (
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 8 }}>
                  Localização e Prazo
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 18 }}>
                  Endereço do canteiro e previsão estimada de conclusão.
                </p>

                <div className="form-group">
                  <label className="form-label">Endereço da Obra</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ex: Alameda Santos, 1820 - Apto 402"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Data Prevista de Conclusão</label>
                  <input
                    type="date"
                    className="form-input"
                    value={dataPrevista}
                    onChange={(e) => setDataPrevista(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="modal-footer">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => (prev - 1) as 1 | 2)}
                className="btn-secondary"
              >
                <ArrowLeft size={16} weight="bold" />
                <span>Voltar</span>
              </button>
            ) : (
              <button type="button" onClick={handleClose} className="btn-secondary">
                Cancelar
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={step === 1 ? handleNextFrom1 : handleNextFrom2}
                className="btn-primary"
              >
                <span>Avançar</span>
                <ArrowRight size={16} weight="bold" />
              </button>
            ) : (
              <button type="submit" className="btn-primary">
                <Sparkle size={16} weight="fill" />
                <span>Criar Obra</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
