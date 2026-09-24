import React, { useState } from 'react';
import { Camera, NotePencil, Plus, Image as ImageIcon, Trash, MagnifyingGlass, Sparkle, X, FolderSimple, ArrowRight, ArrowSquareOut } from '@phosphor-icons/react';
import { Obra, AnexoItem } from '../types/obra';

interface AnexosTabProps {
  obra: Obra;
  onAddAnexoGeral: (anexo: Omit<AnexoItem, 'id' | 'data'>) => void;
  onDeleteAnexo: (anexoId: string) => void;
  onNavigateToTask?: (etapaId: string, tarefaId: string) => void;
}

export const AnexosTab: React.FC<AnexosTabProps> = ({
  obra,
  onAddAnexoGeral,
  onDeleteAnexo,
  onNavigateToTask,
}) => {
  const [filter, setFilter] = useState<'todos' | 'foto' | 'anotacao'>('todos');
  const [modalNovoAberto, setModalNovoAberto] = useState(false);
  const [tipoNovo, setTipoNovo] = useState<'foto' | 'anotacao'>('foto');
  const [tituloNovo, setTituloNovo] = useState('');
  const [conteudoNovo, setConteudoNovo] = useState('');
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [selectedImageModal, setSelectedImageModal] = useState<string | null>(null);

  // Coletar anexos das tarefas de todas as etapas + anexos gerais da obra
  const anexosDasTarefas: AnexoItem[] = [];

  obra.etapas.forEach((etapa) => {
    etapa.tarefas.forEach((tarefa) => {
      // Fotos da tarefa
      if (tarefa.fotos) {
        tarefa.fotos.forEach((fotoUrl, idx) => {
          anexosDasTarefas.push({
            id: `task_foto_${tarefa.id}_${idx}`,
            titulo: `Foto do serviço: ${tarefa.nome}`,
            tipo: 'foto',
            conteudo: fotoUrl,
            etapaId: etapa.id,
            etapaNome: etapa.nome,
            tarefaId: tarefa.id,
            tarefaNome: tarefa.nome,
            data: tarefa.concluidaEm || obra.criadaEm,
          });
        });
      }

      // Anotações da tarefa
      if (tarefa.anotacoes) {
        tarefa.anotacoes.forEach((nota, idx) => {
          anexosDasTarefas.push({
            id: `task_nota_${tarefa.id}_${idx}`,
            titulo: `Observação: ${tarefa.nome}`,
            tipo: 'anotacao',
            conteudo: nota,
            etapaId: etapa.id,
            etapaNome: etapa.nome,
            tarefaId: tarefa.id,
            tarefaNome: tarefa.nome,
            data: tarefa.concluidaEm || obra.criadaEm,
          });
        });
      }
    });
  });

  const todosAnexos = [...(obra.anexosGerais || []), ...anexosDasTarefas];

  const anexosFiltrados = todosAnexos.filter((item) => {
    if (filter === 'todos') return true;
    return item.tipo === filter;
  });

  const [formError, setFormError] = useState<string | null>(null);

  const handleSalvarNovo = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (tipoNovo === 'foto' && !fotoPreview) {
      setFormError('Selecione ou insira uma foto antes de salvar.');
      return;
    }
    if (tipoNovo === 'anotacao' && !conteudoNovo.trim()) {
      setFormError('Digite o texto da sua anotação antes de salvar.');
      return;
    }

    onAddAnexoGeral({
      titulo: tituloNovo.trim() || (tipoNovo === 'foto' ? 'Foto da Obra' : 'Nota de Diário'),
      tipo: tipoNovo,
      conteudo: tipoNovo === 'foto' ? (fotoPreview as string) : conteudoNovo.trim(),
    });

    setModalNovoAberto(false);
    setTituloNovo('');
    setConteudoNovo('');
    setFotoPreview(null);
    setFormError(null);
  };

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

  return (
    <div>
      {/* Header da Aba */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1e293b' }}>
            Galeria de Fotos e Anotações
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
            Fotos e registros do dia a dia da obra para comprovação e histórico
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setModalNovoAberto(true)}
            className="btn-primary"
          >
            <Plus size={18} weight="bold" />
            <span>Adicionar Anexo</span>
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <button
          onClick={() => setFilter('todos')}
          className={filter === 'todos' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: '8px 16px', fontSize: '0.88rem' }}
        >
          Todos ({todosAnexos.length})
        </button>
        <button
          onClick={() => setFilter('foto')}
          className={filter === 'foto' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: '8px 16px', fontSize: '0.88rem' }}
        >
          <Camera size={16} weight="bold" />
          <span>Fotos ({todosAnexos.filter((a) => a.tipo === 'foto').length})</span>
        </button>
        <button
          onClick={() => setFilter('anotacao')}
          className={filter === 'anotacao' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: '8px 16px', fontSize: '0.88rem' }}
        >
          <NotePencil size={16} weight="bold" />
          <span>Anotações ({todosAnexos.filter((a) => a.tipo === 'anotacao').length})</span>
        </button>
      </div>

      {/* Lista / Grid de Anexos */}
      {anexosFiltrados.length === 0 ? (
        <div className="empty-state-box" style={{ padding: '40px 20px' }}>
          <div className="empty-icon-circle">
            <ImageIcon size={40} weight="duotone" />
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Nenhum anexo encontrado</h3>
          <p style={{ fontSize: '0.9rem', color: '#64748b', maxWidth: 440 }}>
            Conforme as tarefas forem concluídas, você pode anexar fotos e comentários, ou clicar no botão "Adicionar Anexo" acima.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {anexosFiltrados.map((item) => (
            <div
              key={item.id}
              style={{
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {item.tipo === 'foto' ? (
                <div
                  style={{ height: 180, background: '#f1f5f9', cursor: 'pointer', position: 'relative' }}
                  onClick={() => setSelectedImageModal(item.conteudo)}
                >
                  <img
                    src={item.conteudo}
                    alt={item.titulo}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 8,
                      right: 8,
                      background: 'rgba(0,0,0,0.65)',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      padding: '3px 8px',
                      borderRadius: 6,
                    }}
                  >
                    Ampliar
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    padding: 18,
                    background: '#fefce8',
                    borderBottom: '1px solid #fef08a',
                    minHeight: 120,
                    cursor: (item.etapaId && item.tarefaId && onNavigateToTask) ? 'pointer' : 'default',
                  }}
                  onClick={() => {
                    if (item.etapaId && item.tarefaId && onNavigateToTask) {
                      onNavigateToTask(item.etapaId, item.tarefaId);
                    }
                  }}
                  title={item.etapaId && item.tarefaId && onNavigateToTask ? "Clique para ir até este serviço no cronograma" : undefined}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#ca8a04' }}>
                      <NotePencil size={18} weight="bold" />
                      <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>ANOTAÇÃO</span>
                    </div>

                    {item.etapaId && item.tarefaId && onNavigateToTask && (
                      <span
                        style={{
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          color: '#854d0e',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          background: 'rgba(202, 138, 4, 0.12)',
                          padding: '3px 8px',
                          borderRadius: 'var(--radius-xs)',
                        }}
                      >
                        <span>Ver no cronograma</span>
                        <ArrowRight size={11} weight="bold" />
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.95rem', color: '#713f12', fontStyle: 'italic', lineHeight: 1.5, margin: 0 }}>
                    "{item.conteudo}"
                  </p>
                </div>
              )}

              <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b' }}>{item.titulo}</div>
                {(item.etapaNome || item.tarefaNome) && (
                  <div
                    onClick={() => {
                      if (item.etapaId && item.tarefaId && onNavigateToTask) {
                        onNavigateToTask(item.etapaId, item.tarefaId);
                      }
                    }}
                    style={{
                      fontSize: '0.8rem',
                      color: item.etapaId && item.tarefaId && onNavigateToTask ? 'var(--primary-accent)' : '#64748b',
                      marginTop: 6,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 5,
                      cursor: item.etapaId && item.tarefaId && onNavigateToTask ? 'pointer' : 'default',
                      width: 'fit-content',
                    }}
                    title={item.etapaId && item.tarefaId && onNavigateToTask ? "Navegar até a tarefa correspondente" : undefined}
                  >
                    <FolderSimple size={13} weight="bold" />
                    <span style={{ textDecoration: item.etapaId && item.tarefaId && onNavigateToTask ? 'underline' : 'none' }}>
                      {item.etapaNome} {item.tarefaNome ? `• ${item.tarefaNome}` : ''}
                    </span>
                    {item.etapaId && item.tarefaId && onNavigateToTask && (
                      <ArrowSquareOut size={12} weight="bold" />
                    )}
                  </div>
                )}
                <div style={{ marginTop: 'auto', paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    {item.data ? new Date(item.data).toLocaleDateString('pt-BR') : ''}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {item.etapaId && item.tarefaId && onNavigateToTask && (
                      <button
                        type="button"
                        onClick={() => onNavigateToTask(item.etapaId!, item.tarefaId!)}
                        className="btn-secondary"
                        style={{ padding: '4px 10px', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                        title="Abrir este serviço na etapa"
                      >
                        <span>Ir para serviço</span>
                        <ArrowRight size={11} weight="bold" />
                      </button>
                    )}

                    {item.id.startsWith('anexo_geral_') && (
                      <button
                        type="button"
                        onClick={() => onDeleteAnexo(item.id)}
                        className="btn-icon"
                        style={{ width: 28, height: 28, color: 'var(--coral-glow-600)' }}
                        title="Excluir anexo"
                      >
                        <Trash size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal para Visualizar Imagem em Tamanho Cheio */}
      {selectedImageModal && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedImageModal(null)}
          style={{ background: 'rgba(0,0,0,0.85)' }}
        >
          <div style={{ maxWidth: '90vw', maxHeight: '90vh', position: 'relative' }}>
            <img
              src={selectedImageModal}
              alt="Ampliada"
              style={{ maxWidth: '100%', maxHeight: '85vh', borderRadius: 12, display: 'block' }}
            />
            <button
              onClick={() => setSelectedImageModal(null)}
              className="btn-secondary"
              style={{ position: 'absolute', top: -45, right: 0, color: '#fff', background: '#334155' }}
            >
              Fechar Visualização
            </button>
          </div>
        </div>
      )}

      {/* Modal para Adicionar Anexo Geral */}
      {modalNovoAberto && (
        <div className="modal-backdrop" onClick={() => setModalNovoAberto(false)}>
          <div className="modal-card" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Novo Anexo para a Obra</h3>
              <button onClick={() => setModalNovoAberto(false)} className="btn-icon" title="Fechar">
                <X size={16} weight="bold" />
              </button>
            </div>

            <form onSubmit={handleSalvarNovo}>
              <div className="modal-body">
                <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                  <button
                    type="button"
                    onClick={() => setTipoNovo('foto')}
                    className={tipoNovo === 'foto' ? 'btn-primary' : 'btn-secondary'}
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    <Camera size={18} weight="bold" />
                    <span>Foto</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTipoNovo('anotacao')}
                    className={tipoNovo === 'anotacao' ? 'btn-primary' : 'btn-secondary'}
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    <NotePencil size={18} weight="bold" />
                    <span>Anotação</span>
                  </button>
                </div>

                <div className="form-group">
                  <label className="form-label">Título ou Assunto:</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ex: Entrega de Material, Vistoria..."
                    value={tituloNovo}
                    onChange={(e) => setTituloNovo(e.target.value)}
                  />
                </div>

                {tipoNovo === 'foto' ? (
                  <div className="form-group">
                    <label className="form-label">Selecionar Imagem:</label>
                    {fotoPreview ? (
                      <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden' }}>
                        <img src={fotoPreview} alt="Preview" style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                        <button
                          type="button"
                          onClick={() => setFotoPreview(null)}
                          style={{ position: 'absolute', top: 8, right: 8, background: '#000', color: '#fff', borderRadius: 6, padding: 4, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                          title="Remover foto"
                        >
                          <X size={14} weight="bold" />
                        </button>
                      </div>
                    ) : (
                      <input type="file" accept="image/*" onChange={handleFileChange} className="form-input" />
                    )}
                  </div>
                ) : (
                  <div className="form-group">
                    <label className="form-label">Texto da Anotação:</label>
                    <textarea
                      rows={4}
                      className="form-textarea"
                      placeholder="Descreva o andamento, conversa com cliente ou lembrete..."
                      value={conteudoNovo}
                      onChange={(e) => setConteudoNovo(e.target.value)}
                    />
                  </div>
                )}

                {formError && (
                  <div
                    style={{
                      padding: '8px 12px',
                      background: 'var(--coral-glow-50)',
                      color: 'var(--coral-glow-700)',
                      border: '1px solid var(--coral-glow-200)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.84rem',
                      fontWeight: 500,
                      marginTop: 10,
                    }}
                  >
                    {formError}
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setModalNovoAberto(false)} className="btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  <Sparkle size={18} weight="fill" />
                  <span>Salvar Anexo</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
