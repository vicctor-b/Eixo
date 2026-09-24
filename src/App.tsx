import React, { useState, useEffect } from 'react';
import { Obra, ToastMessage, ToastType, PerfilUsuario } from './types/obra';
import { loadObrasFromStorage, saveObrasToStorage } from './utils/storage';
import { Navbar } from './components/Navbar';
import { ObraList } from './components/ObraList';
import { ObraDetail } from './components/ObraDetail';
import { ModalCreateObra } from './components/ModalCreateObra';
import { ToastContainer } from './components/Toast';

export const App: React.FC = () => {
  const [obras, setObras] = useState<Obra[]>(() => loadObrasFromStorage());
  const [currentObraId, setCurrentObraId] = useState<string | null>(null);
  const [isCreateObraOpen, setIsCreateObraOpen] = useState(false);
  const [perfilAtivo, setPerfilAtivo] = useState<PerfilUsuario>('construtor');
  const [activeTab, setActiveTab] = useState<'etapas' | 'decisoes' | 'anexos' | 'compartilhar'>('etapas');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sincronizar parâmetros de URL (ex: ?perfil=cliente&obra=...)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const perfilParam = params.get('perfil');
      const obraParam = params.get('obra');

      if (perfilParam === 'cliente' || perfilParam === 'construtor') {
        setPerfilAtivo(perfilParam);
      }
      if (obraParam) {
        setCurrentObraId(obraParam);
      }
    } catch {}
  }, []);

  // Salvar no localStorage sempre que obras mudarem
  useEffect(() => {
    saveObrasToStorage(obras);
  }, [obras]);

  // Função para exibir Toast notification
  const showToast = (
    titulo: string,
    descricao?: string,
    tipo: ToastType = 'success'
  ) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastMessage = { id, titulo, descricao, tipo };

    setToasts((prev) => [...prev, newToast]);

    // Auto-dismiss após 4.2 segundos
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4200);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Criar nova obra
  const handleCreateObra = (dados: {
    nome: string;
    cliente: string;
    endereco: string;
    dataPrevista: string;
  }) => {
    const novaObra: Obra = {
      id: `obra_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      nome: dados.nome,
      cliente: dados.cliente,
      endereco: dados.endereco,
      dataPrevista: dados.dataPrevista,
      criadaEm: new Date().toISOString(),
      etapas: [],
      anexosGerais: [],
    };

    const updated = [novaObra, ...obras];
    setObras(updated);
    setIsCreateObraOpen(false);
    // Já entra diretamente nos detalhes da obra recém criada!
    setCurrentObraId(novaObra.id);

    showToast(
      'Obra criada com sucesso!',
      `Bem-vindo ao diário de "${novaObra.nome}". Adicione sua primeira etapa.`
    );
  };

  // Atualizar dados de uma obra existente
  const handleUpdateObra = (updatedObra: Obra) => {
    setObras((prev) => prev.map((o) => (o.id === updatedObra.id ? updatedObra : o)));
  };

  // Carregar Obra de Demonstração (atende o exemplo exato: 2 etapas com 2 tarefas cada = 25% por tarefa)
  const handleLoadDemo = () => {
    const demoObra: Obra = {
      id: `obra_demo_${Date.now()}`,
      nome: 'Reforma Apto 402 - Jardins',
      cliente: 'Dra. Carolina Mendes',
      endereco: 'Alameda Santos, 1820 - Apto 402, São Paulo - SP',
      dataPrevista: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      criadaEm: new Date().toISOString(),
      etapas: [
        {
          id: 'etapa_demo_1',
          nome: 'Proteção e preparação da área',
          tipoOrigem: 'Reforma',
          tarefas: [
            {
              id: 'task_demo_1',
              nome: 'Isolamento e proteção de elevadores e corredores do condomínio',
              concluida: true,
              concluidaEm: new Date().toISOString(),
              fotos: [
                'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&auto=format&fit=crop&q=60',
              ],
              anotacoes: ['Piso do elevador forrado com plástico bolha e chapas de eucatex.'],
            },
            {
              id: 'task_demo_2',
              nome: 'Proteção de pisos existentes e esquadrias mantidas',
              concluida: false,
            },
          ],
        },
        {
          id: 'etapa_demo_2',
          nome: 'Demolição e descarte de materiais',
          tipoOrigem: 'Reforma',
          tarefas: [
            {
              id: 'task_demo_3',
              nome: 'Demolição de paredes de alvenaria e divisórias existentes',
              concluida: false,
            },
            {
              id: 'task_demo_4',
              nome: 'Acondicionamento de entulho e carregamento de caçambas',
              concluida: false,
            },
          ],
        },
      ],
      anexosGerais: [],
      decisoes: [
        {
          id: 'decisao_demo_1',
          titulo: 'Aprovação do Porcelanato Acetinado 90x90 (Sala e Cozinha)',
          descricao: 'Confirmada a escolha do modelo Portobello Bianco di Lucca 90x90 retificado com junta de 1,5mm e acabamento acetinado para área social.',
          categoria: 'acabamento',
          impactoFinanceiro: 1250,
          impactoPrazoDias: 0,
          criadaPor: 'construtor',
          criadorNome: 'Eng. Roberto Albuquerque',
          criadaEm: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
          status: 'aprovada',
          assinaturaCriador: {
            autor: 'construtor',
            nomeSignatario: 'Eng. Roberto Albuquerque',
            assinadoEm: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
          },
          assinaturaContraparte: {
            autor: 'cliente',
            nomeSignatario: 'Dra. Carolina Mendes (Cliente)',
            assinadoEm: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
          },
          fotos: [
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=60',
          ],
        },
        {
          id: 'decisao_demo_2',
          titulo: 'Definição da Cor da Parede de Destaque da Varanda',
          descricao: 'Cliente solicitou aplicação da tinta Suvinil cor "Toque de Luz" fosco na parede dos fundos da varanda gourmet, em vez do acabamento padrão.',
          categoria: 'acabamento',
          impactoFinanceiro: 320,
          impactoPrazoDias: 1,
          criadaPor: 'cliente',
          criadorNome: 'Dra. Carolina Mendes (Cliente)',
          criadaEm: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
          status: 'pendente',
          assinaturaCriador: {
            autor: 'cliente',
            nomeSignatario: 'Dra. Carolina Mendes (Cliente)',
            assinadoEm: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
          },
          fotos: [
            'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=60',
          ],
        },
      ],
    };

    setObras([demoObra, ...obras]);
    setCurrentObraId(demoObra.id);
    showToast('Obra de Exemplo Carregada!', 'Explore as etapas, o diário e a aba de Decisões com assinaturas digitais.');
  };

  // Excluir obra
  const handleDeleteObra = (obraId: string) => {
    setObras((prev) => prev.filter((o) => o.id !== obraId));
    if (currentObraId === obraId) {
      setCurrentObraId(null);
    }
  };

  // Obra atualmente aberta
  const currentObra = obras.find((o) => o.id === currentObraId) || null;

  return (
    <div className="app-container">
      {/* Barra de Navegação Superior com Perfis e Notificações */}
      <Navbar
        currentObra={currentObra}
        onBackToObras={() => setCurrentObraId(null)}
        perfilAtivo={perfilAtivo}
        onTogglePerfil={(novo) => {
          setPerfilAtivo(novo);
          showToast(
            `Perfil alterado para ${novo === 'construtor' ? 'Construtor' : 'Cliente'}`,
            novo === 'construtor' ? 'Acesso pleno à gestão e edição.' : 'Modo de acompanhamento transparente e aprovação de decisões.',
            'info'
          );
        }}
        obras={obras}
        onNavigateToDecisao={(obraId) => {
          setCurrentObraId(obraId);
          setActiveTab('decisoes');
        }}
      />

      {/* Conteúdo Principal */}
      <main className="main-content">
        {!currentObra ? (
          /* Visão Externa: Empty State ou Lista de Obras */
          <ObraList
            obras={obras}
            onSelectObra={(id) => setCurrentObraId(id)}
            onOpenCreateModal={() => setIsCreateObraOpen(true)}
            onDeleteObra={handleDeleteObra}
            onLoadDemo={handleLoadDemo}
            perfilAtivo={perfilAtivo}
          />
        ) : (
          /* Visão Interna: Detalhes da Obra com Abas e Timeline */
          <ObraDetail
            obra={currentObra}
            onUpdateObra={handleUpdateObra}
            showToast={showToast}
            perfilAtivo={perfilAtivo}
            activeTab={activeTab}
            onChangeTab={(t) => setActiveTab(t)}
            onBackToObras={() => setCurrentObraId(null)}
            onSwitchToClient={() => {
              setPerfilAtivo('cliente');
              showToast('Perfil alterado para Cliente', 'Agora você está navegando com a visão do cliente.', 'info');
            }}
          />
        )}
      </main>

      {/* Modal de Criação de Obra */}
      <ModalCreateObra
        isOpen={isCreateObraOpen}
        onClose={() => setIsCreateObraOpen(false)}
        onSubmit={handleCreateObra}
      />

      {/* Notificações Toast Flutuantes */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
};
