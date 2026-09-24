import React from 'react';
import {
  ShieldCheck,
  Shovel,
  Hammer,
  Lightning,
  Wall,
  GridFour,
  PaintRoller,
  Door,
  Key,
  Sparkle,
  HardHat,
  IconProps
} from '@phosphor-icons/react';

export interface EtapaIconConfig {
  Icon: React.ComponentType<IconProps>;
  color: string;
  bg: string;
}

/**
 * Retorna o ícone e paleta temática correspondente à etapa da obra.
 * Mapeia palavras-chave técnicas para ícones ilustrativos e expressivos.
 */
export function getEtapaIcon(nome: string, etapaId?: string): EtapaIconConfig {
  const n = (nome || '').toLowerCase().trim();

  // 1. Proteção e preparação da área
  if (n.includes('proteção') || n.includes('preparação') || n.includes('canteiro') || n.includes('tapume')) {
    return {
      Icon: ShieldCheck,
      color: 'var(--dark-coffee-800)',
      bg: 'var(--dark-coffee-100)',
    };
  }

  // 2. Demolição e descarte (Reforma)
  if (n.includes('demolição') || n.includes('descarte') || n.includes('entulho') || n.includes('demolir')) {
    return {
      Icon: Hammer,
      color: '#dc2626',
      bg: '#fee2e2',
    };
  }

  // 3. Escavação fundação e estrutura bruta (Construção)
  if (n.includes('escavação') || n.includes('fundação') || n.includes('estrutura') || n.includes('concreto') || n.includes('sapata')) {
    return {
      Icon: Shovel,
      color: 'var(--cinnamon-wood-700)',
      bg: 'var(--cinnamon-wood-100)',
    };
  }

  // 4. Infraestrutura elétrica, hidráulica e climatização
  if (n.includes('elétrica') || n.includes('hidráulica') || n.includes('climatização') || n.includes('ar condicionado') || n.includes('tubulação')) {
    return {
      Icon: Lightning,
      color: '#d97706',
      bg: '#fef3c7',
    };
  }

  // 5. Alvenaria, gesso e regularização de pisos
  if (n.includes('alvenaria') || n.includes('gesso') || n.includes('parede') || n.includes('contrapiso') || n.includes('drywall')) {
    return {
      Icon: Wall,
      color: 'var(--mauve-bark-700)',
      bg: 'var(--mauve-bark-100)',
    };
  }

  // 6. Impermeabilização, revestimentos e bancadas
  if (n.includes('impermeabilização') || n.includes('revestimento') || n.includes('porcelanato') || n.includes('piso') || n.includes('bancada')) {
    return {
      Icon: GridFour,
      color: 'var(--primary-accent)',
      bg: 'var(--coral-glow-100)',
    };
  }

  // 7. Pintura, iluminação, metais e louças
  if (n.includes('pintura') || n.includes('iluminação') || n.includes('louça') || n.includes('tinta') || n.includes('luminária')) {
    return {
      Icon: PaintRoller,
      color: '#0284c7',
      bg: '#e0f2fe',
    };
  }

  // 8. Esquadrias, vidros e marcenaria
  if (n.includes('esquadria') || n.includes('vidro') || n.includes('marcenaria') || n.includes('porta') || n.includes('janela') || n.includes('armário')) {
    return {
      Icon: Door,
      color: '#4f46e5',
      bg: '#e0e7ff',
    };
  }

  // 9. Finalização, testes e entrega
  if (n.includes('finalização') || n.includes('entrega') || n.includes('teste') || n.includes('vistoria') || n.includes('chave')) {
    return {
      Icon: Key,
      color: '#16a34a',
      bg: '#dcfce7',
    };
  }

  // Fallback para etapas customizadas
  return {
    Icon: Sparkle,
    color: 'var(--primary-accent)',
    bg: 'var(--dark-coffee-50)',
  };
}
