import { PresetTipoObra } from '../types/obra';

export const PRESET_TIPOS_OBRA: PresetTipoObra[] = [
  {
    "id": "O01",
    "nome": "Construção",
    "etapas": [
      {
        "id": "E01_C",
        "nome": "Proteção e preparação da área",
        "tarefas": [
          { "id": "T01_C01", "nome": "Limpeza do terreno e serviços topográficos" },
          { "id": "T01_C02", "nome": "Montagem do canteiro de obras e tapumes" },
          { "id": "T01_C03", "nome": "Instalação de ponto provisório de água e energia" },
          { "id": "T01_C04", "nome": "Sinalização de segurança e instalação de equipamentos de proteção" }
        ]
      },
      {
        "id": "E02_C",
        "nome": "Escavação fundação e estrutura bruta",
        "tarefas": [
          { "id": "T02_C01", "nome": "Escavação de terraplanagem e movimentação de solo" },
          { "id": "T02_C02", "nome": "Perfuração e concretagem de sapatas e blocos de fundação" },
          { "id": "T02_C03", "nome": "Montagem de armações de aço e formas para pilares" },
          { "id": "T02_C04", "nome": "Concretagem de pilares vigas e lajes" },
          { "id": "T02_C05", "nome": "Cura do concreto e desforma das estruturas" },
          { "id": "T02_C06", "nome": "Execução de vigas baldrame e impermeabilização do baldrame" }
        ]
      },
      {
        "id": "E03_C",
        "nome": "Infraestrutura elétrica hidráulica e climatização",
        "tarefas": [
          { "id": "T03_C01", "nome": "Abertura de roços em paredes para tubulações" },
          { "id": "T03_C02", "nome": "Passagem de conduítes e fixação de caixas de luz" },
          { "id": "T03_C03", "nome": "Instalação do quadro geral de distribuição e disjuntores" },
          { "id": "T03_C04", "nome": "Passagem de tubulações de água fria água quente e esgoto" },
          { "id": "T03_C05", "nome": "Passagem da tubulação frigorífica e drenos para ar condicionado" },
          { "id": "T03_C06", "nome": "Passagem de cabeamento para rede dados som e automação" },
          { "id": "T03_C07", "nome": "Teste de pressão e estanqueidade nas tubulações hidráulicas" }
        ]
      },
      {
        "id": "E04_C",
        "nome": "Alvenaria gesso e regularização de pisos",
        "tarefas": [
          { "id": "T04_C01", "nome": "Levantamento de paredes de alvenaria ou drywall" },
          { "id": "T04_C02", "nome": "Aplicação de chapisco emboço e reboco nas paredes" },
          { "id": "T04_C03", "nome": "Execução do contrapiso e regularização do nível do solo" },
          { "id": "T04_C04", "nome": "Instalação do forro de gesso acartonado e cortineiros" },
          { "id": "T04_C05", "nome": "Tratamento de juntas e emassamento do gesso" },
          { "id": "T04_C06", "nome": "Regularização fina de paredes e tetos para pintura" }
        ]
      },
      {
        "id": "E05_C",
        "nome": "Impermeabilização revestimentos e bancadas",
        "tarefas": [
          { "id": "T05_C01", "nome": "Aplicação de impermeabilizante em banheiros varandas e lajes" },
          { "id": "T05_C02", "nome": "Teste de estanqueidade de 72 horas nas áreas molhadas" },
          { "id": "T05_C03", "nome": "Assentamento de porcelanatos e pisos cerâmicos" },
          { "id": "T05_C04", "nome": "Assentamento de revestimentos nas paredes de banheiros e cozinha" },
          { "id": "T05_C05", "nome": "Aplicação de rejunte em todos os pisos e paredes" },
          { "id": "T05_C06", "nome": "Medição e instalação de bancadas soleiras e peitoris de pedra" }
        ]
      },
      {
        "id": "E06_C",
        "nome": "Pintura iluminação metais e louças",
        "tarefas": [
          { "id": "T06_C01", "nome": "Lixamento de paredes e aplicação de selador acrílico" },
          { "id": "T06_C02", "nome": "Aplicação de massa corrida e tinta de fundo" },
          { "id": "T06_C03", "nome": "Pintura de acabamento final em paredes e tetos" },
          { "id": "T06_C04", "nome": "Instalação de luminárias spots pendentes e fitas de led" },
          { "id": "T06_C05", "nome": "Instalação de torneiras misturadores registros e chuveiros" },
          { "id": "T06_C06", "nome": "Instalação de vasos sanitários cubas tanques e bacias" }
        ]
      },
      {
        "id": "E07_C",
        "nome": "Esquadrias vidros e marcenaria",
        "tarefas": [
          { "id": "T07_C01", "nome": "Instalação de portas internas batentes e alizares" },
          { "id": "T07_C02", "nome": "Instalação de janelas e portas de alumínio ou PVC" },
          { "id": "T07_C03", "nome": "Instalação de boxes de vidro espelhos e guarda corpos" },
          { "id": "T07_C04", "nome": "Montagem de armários planejados em cozinha banheiros e quartos" },
          { "id": "T07_C05", "nome": "Instalação de painéis ripados e marcenaria decorativa" }
        ]
      },
      {
        "id": "E08_C",
        "nome": "Finalização testes e entrega",
        "tarefas": [
          { "id": "T08_C01", "nome": "Instalação de espelhos de tomadas e interruptores" },
          { "id": "T08_C02", "nome": "Teste de carga do sistema elétrico e checagem do quadro" },
          { "id": "T08_C03", "nome": "Teste de funcionamento do ar condicionado e exaustores" },
          { "id": "T08_C04", "nome": "Limpeza pesada pós obra e higienização de revestimentos" },
          { "id": "T08_C05", "nome": "Retirada de fitas adesivas e proteções temporárias" },
          { "id": "T08_C06", "nome": "Vistoria final com o cliente e entrega formal das chaves" }
        ]
      }
    ]
  },
  {
    "id": "O02",
    "nome": "Reforma",
    "etapas": [
      {
        "id": "E01_R",
        "nome": "Proteção e preparação da área",
        "tarefas": [
          { "id": "T01_R01", "nome": "Isolamento e proteção de elevadores e corredores do condomínio" },
          { "id": "T01_R02", "nome": "Proteção de pisos existentes e esquadrias mantidas" },
          { "id": "T01_R03", "nome": "Instalação de ponto provisório de água e energia" },
          { "id": "T01_R04", "nome": "Sinalização de segurança e instalação de equipamentos de proteção" }
        ]
      },
      {
        "id": "E02_R",
        "nome": "Demolição e descarte de materiais",
        "tarefas": [
          { "id": "T02_R01", "nome": "Desligamento e isolamento de redes elétricas e hidráulicas antigas" },
          { "id": "T02_R02", "nome": "Demolição de paredes de alvenaria e divisórias existentes" },
          { "id": "T02_R03", "nome": "Remoção de revestimentos cerâmicos pisos e azulejos" },
          { "id": "T02_R04", "nome": "Retirada de portas janelas e esquadrias antigas" },
          { "id": "T02_R05", "nome": "Demolição de contrapiso antigo e bancadas de pedra" },
          { "id": "T02_R06", "nome": "Acondicionamento de entulho e carregamento de caçambas" }
        ]
      },
      {
        "id": "E03_R",
        "nome": "Infraestrutura elétrica hidráulica e climatização",
        "tarefas": [
          { "id": "T03_R01", "nome": "Abertura de roços em paredes para tubulações" },
          { "id": "T03_R02", "nome": "Passagem de conduítes e fixação de caixas de luz" },
          { "id": "T03_R03", "nome": "Instalação do quadro geral de distribuição e disjuntores" },
          { "id": "T03_R04", "nome": "Passagem de tubulações de água fria água quente e esgoto" },
          { "id": "T03_R05", "nome": "Passagem da tubulação frigorífica e drenos para ar condicionado" },
          { "id": "T03_R06", "nome": "Passagem de cabeamento para rede dados som e automação" },
          { "id": "T03_R07", "nome": "Teste de pressão e estanqueidade nas tubulações hidráulicas" }
        ]
      },
      {
        "id": "E04_R",
        "nome": "Alvenaria gesso e regularização de pisos",
        "tarefas": [
          { "id": "T04_R01", "nome": "Levantamento de novas paredes de alvenaria ou drywall" },
          { "id": "T04_R02", "nome": "Aplicação de chapisco emboço e reboco nas paredes" },
          { "id": "T04_R03", "nome": "Execução do contrapiso e regularização do nível do solo" },
          { "id": "T04_R04", "nome": "Instalação do forro de gesso acartonado e cortineiros" },
          { "id": "T04_R05", "nome": "Tratamento de juntas e emassamento do gesso" },
          { "id": "T04_R06", "nome": "Regularização fina de paredes e tetos para pintura" }
        ]
      },
      {
        "id": "E05_R",
        "nome": "Impermeabilização revestimentos e bancadas",
        "tarefas": [
          { "id": "T05_R01", "nome": "Aplicação de impermeabilizante em banheiros varandas e lajes" },
          { "id": "T05_R02", "nome": "Teste de estanqueidade de 72 horas nas áreas molhadas" },
          { "id": "T05_R03", "nome": "Assentamento de porcelanatos e pisos cerâmicos" },
          { "id": "T05_R04", "nome": "Assentamento de revestimentos nas paredes de banheiros e cozinha" },
          { "id": "T05_R05", "nome": "Aplicação de rejunte em todos os pisos e paredes" },
          { "id": "T05_R06", "nome": "Medição e instalação de bancadas soleiras e peitoris de pedra" }
        ]
      },
      {
        "id": "E06_R",
        "nome": "Pintura iluminação metais e louças",
        "tarefas": [
          { "id": "T06_R01", "nome": "Lixamento de paredes e aplicação de selador acrílico" },
          { "id": "T06_R02", "nome": "Aplicação de massa corrida e tinta de fundo" },
          { "id": "T06_R03", "nome": "Pintura de acabamento final em paredes e tetos" },
          { "id": "T06_R04", "nome": "Instalação de luminárias spots pendentes e fitas de led" },
          { "id": "T06_R05", "nome": "Instalação de torneiras misturadores registros e chuveiros" },
          { "id": "T06_R06", "nome": "Instalação de vasos sanitários cubas tanques e bacias" }
        ]
      },
      {
        "id": "E07_R",
        "nome": "Esquadrias vidros e marcenaria",
        "tarefas": [
          { "id": "T07_R01", "nome": "Instalação de portas internas batentes e alizares" },
          { "id": "T07_R02", "nome": "Instalação de janelas e portas de alumínio ou PVC" },
          { "id": "T07_R03", "nome": "Instalação de boxes de vidro espelhos e guarda corpos" },
          { "id": "T07_R04", "nome": "Montagem de armários planejados em cozinha banheiros e quartos" },
          { "id": "T07_R05", "nome": "Instalação de painéis ripados e marcenaria decorativa" }
        ]
      },
      {
        "id": "E08_R",
        "nome": "Finalização testes e entrega",
        "tarefas": [
          { "id": "T08_R01", "nome": "Instalação de espelhos de tomadas e interruptores" },
          { "id": "T08_R02", "nome": "Teste de carga do sistema elétrico e checagem do quadro" },
          { "id": "T08_R03", "nome": "Teste de funcionamento do ar condicionado e exaustores" },
          { "id": "T08_R04", "nome": "Limpeza pesada pós obra e higienização de revestimentos" },
          { "id": "T08_R05", "nome": "Retirada de fitas adesivas e proteções temporárias" },
          { "id": "T08_R06", "nome": "Vistoria final com o cliente e entrega formal das chaves" }
        ]
      }
    ]
  }
];
