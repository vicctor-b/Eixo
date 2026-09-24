import React, { useState, useRef } from 'react';
import { X, Camera } from '@phosphor-icons/react';
import { Decisao, PerfilUsuario } from '../types/obra';

interface ModalCreateDecisaoProps {
  isOpen: boolean;
  onClose: () => void;
  perfilAtivo: PerfilUsuario;
  nomeUsuario: string;
  onSubmit: (novaDecisao: Decisao) => void;
}

export const ModalCreateDecisao: React.FC<ModalCreateDecisaoProps> = ({
  isOpen,
  onClose,
  perfilAtivo,
  nomeUsuario,
  onSubmit,
}) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState<Decisao['categoria']>('acabamento');
  const [impactoFinanceiro, setImpactoFinanceiro] = useState<string>('');
  const [impactoPrazoDias, setImpactoPrazoDias] = useState<string>('');
  const [fotos, setFotos] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotos((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveFoto = (index: number) => {
    setFotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !descricao.trim()) return;

    const agora = new Date().toISOString();

    const decisao: Decisao = {
      id: `decisao_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      categoria,
      impactoFinanceiro: impactoFinanceiro ? parseFloat(impactoFinanceiro) : undefined,
      impactoPrazoDias: impactoPrazoDias ? parseInt(impactoPrazoDias, 10) : undefined,
      criadaPor: perfilAtivo,
      criadorNome: nomeUsuario,
      criadaEm: agora,
      status: 'pendente',
      assinaturaCriador: {
        autor: perfilAtivo,
        nomeSignatario: nomeUsuario,
        assinadoEm: agora,
      },
      fotos: fotos.length > 0 ? fotos : undefined,
    };

    onSubmit(decisao);
    onClose();

    // Resetar
    setTitulo('');
    setDescricao('');
    setCategoria('acabamento');
    setImpactoFinanceiro('');
    setImpactoPrazoDias('');
    setFotos([]);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card"
        style={{ maxWidth: 480 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho Limpo */}
        <div className="modal-header" style={{ padding: '16px 20px' }}>
          <h2 className="modal-title" style={{ fontSize: '1.15rem' }}>
            Nova Decisão
          </h2>
          <button onClick={onClose} className="btn-icon" title="Fechar">
            <X size={18} weight="bold" />
          </button>
        </div>

        {/* Formulário Enxuto */}
        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ padding: '20px' }}>
            <div className="form-group" style={{ marginBottom: 14 }}>
              <label className="form-label">Título da Decisão</label>
              <input
                type="text"
                autoFocus
                required
                className="form-input"
                placeholder="Ex: Cor da tinta da sala"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 14 }}>
              <label className="form-label">Descrição</label>
              <textarea
                required
                rows={3}
                className="form-textarea"
                placeholder="Descreva o que foi combinado..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Categoria</label>
                <select
                  className="form-input"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value as any)}
                >
                  <option value="acabamento">Acabamentos</option>
                  <option value="projeto">Projeto</option>
                  <option value="custo">Custos</option>
                  <option value="prazo">Cronograma</option>
                  <option value="outro">Geral</option>
                </select>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Custo (R$) - Opcional</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-input"
                  placeholder="0,00"
                  value={impactoFinanceiro}
                  onChange={(e) => setImpactoFinanceiro(e.target.value)}
                />
              </div>
            </div>

            {/* Anexo de Foto Opcional */}
            <div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />

              {fotos.length > 0 ? (
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
                  {fotos.map((f, i) => (
                    <div
                      key={i}
                      style={{
                        position: 'relative',
                        width: 48,
                        height: 48,
                        borderRadius: 6,
                        overflow: 'hidden',
                        border: '1px solid var(--border-hairline)',
                      }}
                    >
                      <img src={f} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button
                        type="button"
                        onClick={() => handleRemoveFoto(i)}
                        style={{
                          position: 'absolute',
                          top: 2,
                          right: 2,
                          background: 'rgba(0,0,0,0.7)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '50%',
                          width: 16,
                          height: 16,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          fontSize: 9,
                        }}
                      >
                        <X size={10} weight="bold" />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-secondary"
                    style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                  >
                    + Foto
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-secondary"
                  style={{
                    padding: '6px 12px',
                    fontSize: '0.8rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    width: '100%',
                    justifyContent: 'center',
                  }}
                >
                  <Camera size={14} />
                  <span>Anexar foto ou amostra (opcional)</span>
                </button>
              )}
            </div>
          </div>

          {/* Rodapé */}
          <div className="modal-footer" style={{ padding: '12px 20px' }}>
            <button type="button" onClick={onClose} className="btn-secondary" style={{ fontSize: '0.84rem' }}>
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!titulo.trim() || !descricao.trim()}
              className="btn-primary"
              style={{ fontSize: '0.84rem' }}
            >
              Criar e Assinar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
