import React, { useState } from 'react';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  Plus,
  Buildings,
  PaintBrushHousehold,
  Sparkle,
  Trash
} from '@phosphor-icons/react';
import { PRESET_TIPOS_OBRA } from '../data/presetObras';
import { PresetEtapa, PresetTipoObra } from '../types/obra';

interface ModalCreateEtapaWizardProps {
  isOpen: boolean;
  onClose: () => void;
  insertAtIndex?: number | null;
  onAddEtapa: (etapa: {
    nome: string;
    tarefas: { nome: string }[];
    tipoOrigem?: string;
  }, insertIndex?: number | null) => void;
}

export const ModalCreateEtapaWizard: React.FC<ModalCreateEtapaWizardProps> = ({
  isOpen,
  onClose,
  insertAtIndex,
  onAddEtapa,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedTipo, setSelectedTipo] = useState<PresetTipoObra | null>(PRESET_TIPOS_OBRA[0]);
  const [isTipoPersonalizado, setIsTipoPersonalizado] = useState(false);
  const [selectedEtapa, setSelectedEtapa] = useState<PresetEtapa | null>(null);
  const [customEtapaNome, setCustomEtapaNome] = useState('');
  const [isCustomEtapa, setIsCustomEtapa] = useState(false);
  const [tarefasSelecionadas, setTarefasSelecionadas] = useState<{ id: string; nome: string; checked: boolean }[]>([]);
  const [novaTarefaTexto, setNovaTarefaTexto] = useState('');
  const [erroMsg, setErroMsg] = useState('');

  if (!isOpen) return null;

  const handleSelectTipo = (tipo: PresetTipoObra) => {
    setSelectedTipo(tipo);
    setIsTipoPersonalizado(false);
    setSelectedEtapa(null);
    setIsCustomEtapa(false);
    setErroMsg('');
    setCurrentStep(2);
  };

  const handleSelectTipoCustom = () => {
    setSelectedTipo(null);
    setIsTipoPersonalizado(true);
    setIsCustomEtapa(true);
    setErroMsg('');
    setCurrentStep(2);
  };

  const handleSelectEtapa = (etapa: PresetEtapa) => {
    setSelectedEtapa(etapa);
    setIsCustomEtapa(false);
    setTarefasSelecionadas(
      etapa.tarefas.map((t) => ({
        id: t.id,
        nome: t.nome,
        checked: true,
      }))
    );
    setErroMsg('');
    setCurrentStep(3);
  };

  const handleIniciarEtapaCustom = () => {
    if (!customEtapaNome.trim()) {
      setErroMsg('Digite o nome da etapa para prosseguir.');
      return;
    }
    setIsCustomEtapa(true);
    setSelectedEtapa(null);
    if (tarefasSelecionadas.length === 0) {
      setTarefasSelecionadas([]);
    }
    setErroMsg('');
    setCurrentStep(3);
  };

  const toggleTarefa = (index: number) => {
    setTarefasSelecionadas((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleAdicionarTarefaCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaTarefaTexto.trim()) return;

    setTarefasSelecionadas((prev) => [
      ...prev,
      {
        id: `custom_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        nome: novaTarefaTexto.trim(),
        checked: true,
      },
    ]);
    setNovaTarefaTexto('');
  };

  const handleRemoverTarefa = (index: number) => {
    setTarefasSelecionadas((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleToggleTodas = (marcar: boolean) => {
    setTarefasSelecionadas((prev) => prev.map((t) => ({ ...t, checked: marcar })));
  };

  const handleConcluir = () => {
    const nomeFinal = isCustomEtapa ? customEtapaNome.trim() : (selectedEtapa?.nome || customEtapaNome.trim());
    if (!nomeFinal) {
      setErroMsg('Informe o nome da etapa.');
      return;
    }

    const tarefasFinais = tarefasSelecionadas
      .filter((t) => t.checked)
      .map((t) => ({ nome: t.nome }));

    if (tarefasFinais.length === 0) {
      setErroMsg('Selecione ou adicione ao menos um serviço.');
      return;
    }

    onAddEtapa(
      {
        nome: nomeFinal,
        tarefas: tarefasFinais,
        tipoOrigem: isTipoPersonalizado
          ? 'Personalizada'
          : selectedTipo?.nome || 'Geral',
      },
      insertAtIndex
    );

    // Reset
    setCurrentStep(1);
    setSelectedEtapa(null);
    setCustomEtapaNome('');
    setTarefasSelecionadas([]);
    setErroMsg('');
    onClose();
  };

  const etapaNomeDisplay = isCustomEtapa ? customEtapaNome : (selectedEtapa?.nome || 'Etapa');
  const qtdMarcadas = tarefasSelecionadas.filter((t) => t.checked).length;
  const todasMarcadas = tarefasSelecionadas.length > 0 && qtdMarcadas === tarefasSelecionadas.length;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card"
        style={{ maxWidth: '620px' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        {/* Cabeçalho Minimalista */}
        <div className="modal-header">
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Passo {currentStep} de 3
            </span>
            <h2 className="modal-title" style={{ fontSize: '1.2rem', marginTop: 2 }}>
              {currentStep === 1 && 'Tipo de Obra'}
              {currentStep === 2 && 'Escolha da Etapa'}
              {currentStep === 3 && etapaNomeDisplay}
            </h2>
          </div>
          <button onClick={onClose} className="btn-icon" title="Fechar">
            <X size={18} weight="bold" />
          </button>
        </div>

        {/* Linha de Progresso Fina */}
        <div style={{ height: 3, background: 'var(--dark-coffee-100)' }}>
          <div
            style={{
              height: '100%',
              background: 'var(--primary-accent)',
              width: `${(currentStep / 3) * 100}%`,
              transition: 'width 0.2s ease',
            }}
          />
        </div>

        {/* Corpo do Modal */}
        <div className="modal-body" style={{ padding: '20px 24px' }}>
          {erroMsg && (
            <div
              style={{
                background: 'var(--coral-glow-50)',
                border: '1px solid var(--coral-glow-300)',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 12px',
                color: 'var(--coral-glow-700)',
                fontSize: '0.85rem',
                marginBottom: 14,
              }}
            >
              {erroMsg}
            </div>
          )}

          {/* PASSO 1: MODELO */}
          {currentStep === 1 && (
            <div className="choice-card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
              <div
                className={`choice-card ${selectedTipo?.id === 'O01' && !isTipoPersonalizado ? 'selected' : ''}`}
                onClick={() => handleSelectTipo(PRESET_TIPOS_OBRA[0])}
                style={{ padding: '16px' }}
              >
                <div style={{ color: 'var(--cinnamon-wood-500)', marginBottom: 6 }}>
                  <Buildings size={28} weight="duotone" />
                </div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>Construção</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>
                  Da fundação ao acabamento
                </div>
              </div>

              <div
                className={`choice-card ${selectedTipo?.id === 'O02' && !isTipoPersonalizado ? 'selected' : ''}`}
                onClick={() => handleSelectTipo(PRESET_TIPOS_OBRA[1])}
                style={{ padding: '16px' }}
              >
                <div style={{ color: 'var(--coral-glow-500)', marginBottom: 6 }}>
                  <PaintBrushHousehold size={28} weight="duotone" />
                </div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>Reforma</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>
                  Demolição e adequações
                </div>
              </div>

              <div
                className={`choice-card ${isTipoPersonalizado ? 'selected' : ''}`}
                onClick={handleSelectTipoCustom}
                style={{ padding: '16px' }}
              >
                <div style={{ color: 'var(--pitch-black-500)', marginBottom: 6 }}>
                  <Sparkle size={28} weight="duotone" />
                </div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>Personalizado</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>
                  Criar etapa livre
                </div>
              </div>
            </div>
          )}

          {/* PASSO 2: SELECIONAR ETAPA */}
          {currentStep === 2 && (
            <div>
              {!isTipoPersonalizado && selectedTipo && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    maxHeight: '260px',
                    overflowY: 'auto',
                    paddingRight: 4,
                  }}
                >
                  {selectedTipo.etapas.map((etp) => (
                    <div
                      key={etp.id}
                      onClick={() => handleSelectEtapa(etp)}
                      style={{
                        padding: '12px 14px',
                        border: '1px solid var(--border-hairline)',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: selectedEtapa?.id === etp.id ? 'var(--dark-coffee-50)' : '#ffffff',
                        borderColor: selectedEtapa?.id === etp.id ? 'var(--primary-accent)' : 'var(--border-hairline)',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-main)' }}>
                          {etp.nome}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {etp.tarefas.length} serviços
                        </div>
                      </div>
                      <ArrowRight size={16} color="var(--primary-accent)" weight="bold" />
                    </div>
                  ))}
                </div>
              )}

              {/* Inserir Nome Customizado */}
              <div style={{ marginTop: 14 }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ou digite o nome de outra etapa..."
                    value={customEtapaNome}
                    onChange={(e) => {
                      setCustomEtapaNome(e.target.value);
                      setIsCustomEtapa(true);
                      setSelectedEtapa(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleIniciarEtapaCustom();
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleIniciarEtapaCustom}
                    className="btn-primary"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    <span>Continuar</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PASSO 3: TAREFAS (MINIMALISTA) */}
          {currentStep === 3 && (
            <div>
              {/* Barra de ação compacta */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {qtdMarcadas} de {tarefasSelecionadas.length} selecionados
                </span>
                <button
                  type="button"
                  onClick={() => handleToggleTodas(!todasMarcadas)}
                  style={{ fontSize: '0.82rem', color: 'var(--primary-accent)', fontWeight: 600 }}
                >
                  {todasMarcadas ? 'Desmarcar todos' : 'Marcar todos'}
                </button>
              </div>

              {/* Lista com Checkboxes */}
              <div
                style={{
                  maxHeight: '230px',
                  overflowY: 'auto',
                  border: '1px solid var(--border-hairline)',
                  borderRadius: 'var(--radius-sm)',
                  background: '#ffffff',
                }}
              >
                {tarefasSelecionadas.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '24px 12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    Nenhum serviço listado. Digite no campo abaixo para incluir.
                  </div>
                ) : (
                  tarefasSelecionadas.map((item, index) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '9px 12px',
                        borderBottom: index < tarefasSelecionadas.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                        gap: 10,
                      }}
                    >
                      <label
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          cursor: 'pointer',
                          flex: 1,
                        }}
                      >
                        <input
                          type="checkbox"
                          className="task-checkbox"
                          checked={item.checked}
                          onChange={() => toggleTarefa(index)}
                        />
                        <span
                          style={{
                            fontSize: '0.9rem',
                            color: item.checked ? 'var(--text-main)' : 'var(--text-faint)',
                          }}
                        >
                          {item.nome}
                        </span>
                      </label>

                      <button
                        type="button"
                        onClick={() => handleRemoverTarefa(index)}
                        style={{ color: 'var(--text-muted)', padding: 4 }}
                        title="Remover da lista"
                      >
                        <Trash size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Campo para Adicionar Novo Serviço */}
              <form onSubmit={handleAdicionarTarefaCustom} style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="+ Adicionar outro serviço..."
                  value={novaTarefaTexto}
                  onChange={(e) => setNovaTarefaTexto(e.target.value)}
                />
                <button type="submit" className="btn-secondary" style={{ whiteSpace: 'nowrap' }}>
                  <Plus size={16} weight="bold" />
                  <span>Inserir</span>
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Rodapé */}
        <div className="modal-footer">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => (prev - 1) as 1 | 2)}
              className="btn-secondary"
            >
              <ArrowLeft size={16} weight="bold" />
              <span>Voltar</span>
            </button>
          )}

          {currentStep === 1 && (
            <button type="button" onClick={() => setCurrentStep(2)} className="btn-primary">
              <span>Avançar</span>
              <ArrowRight size={16} weight="bold" />
            </button>
          )}

          {currentStep === 2 && (
            <button
              type="button"
              onClick={() => {
                if (!selectedEtapa && !customEtapaNome.trim()) {
                  setErroMsg('Selecione uma etapa ou digite um nome.');
                  return;
                }
                setCurrentStep(3);
              }}
              className="btn-primary"
            >
              <span>Avançar</span>
              <ArrowRight size={16} weight="bold" />
            </button>
          )}

          {currentStep === 3 && (
            <button type="button" onClick={handleConcluir} className="btn-primary">
              <Check size={16} weight="bold" />
              <span>Criar Etapa ({qtdMarcadas})</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
