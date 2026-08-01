import type { z } from 'zod';
import { sectionSchemas, type SectionType } from './schemas';
import { ApiError } from '../utils/ApiError';

export interface SectionTypeDefinition {
  type: SectionType;
  label: string;
  description: string;
}

const SECTION_TYPE_DEFS: Record<SectionType, SectionTypeDefinition> = {
  hero: { type: 'hero', label: 'Hero', description: 'Full-width hero with badge, heading, CTAs and images.' },
  'hero-slider': { type: 'hero-slider', label: 'Hero Slider', description: 'Rotating hero slides with images and CTAs.' },
  'page-hero': { type: 'page-hero', label: 'Page Hero', description: 'Banner strip shown at the top of inner pages.' },
  'banner-strip': { type: 'banner-strip', label: 'Banner Strip', description: 'Simple announcement banner.' },
  about: { type: 'about', label: 'About Intro', description: 'Tag, heading, paragraphs and side image.' },
  story: { type: 'story', label: 'Our Story', description: 'Narrative block with optional quote and image.' },
  stats: { type: 'stats', label: 'Stats', description: 'Impact numbers with value and label.' },
  cards: { type: 'cards', label: 'Cards Grid', description: 'Grid of icon + title + description cards.' },
  values: { type: 'values', label: 'Values', description: 'Organization values grid.' },
  sectors: { type: 'sectors', label: 'Sectors', description: 'Focus sectors grid.' },
  'projects-grid': { type: 'projects-grid', label: 'Projects Grid', description: 'List of projects, by selection or all.' },
  'program-detail': { type: 'program-detail', label: 'Program Detail', description: 'Full project/program page body.' },
  'mission-vision': { type: 'mission-vision', label: 'Mission & Vision', description: 'Two-column mission and vision.' },
  cta: { type: 'cta', label: 'Call to Action', description: 'Banner with heading, text and button.' },
  team: { type: 'team', label: 'Team', description: 'Team members grid.' },
  testimonials: { type: 'testimonials', label: 'Testimonials', description: 'Quotes grid.' },
  stories: { type: 'stories', label: 'Stories / Blog', description: 'Stories or blog posts by selection.' },
  gallery: { type: 'gallery', label: 'Gallery', description: 'Image gallery by album.' },
  partners: { type: 'partners', label: 'Partners', description: 'Partner logos strip.' },
  documents: { type: 'documents', label: 'Documents', description: 'Reports and legal documents.' },
  campaigns: { type: 'campaigns', label: 'Campaigns', description: 'Appeals and fundraising campaigns.' },
  donate: { type: 'donate', label: 'Donate', description: 'Donation widget with causes and amounts.' },
  'contact-info': { type: 'contact-info', label: 'Contact Info', description: 'Contact details cards.' },
  map: { type: 'map', label: 'Map', description: 'Embedded map.' },
  form: { type: 'form', label: 'Form', description: 'Contact / volunteer / career form.' },
  legal: { type: 'legal', label: 'Legal Text', description: 'Privacy policy / terms content blocks.' },
  awards: { type: 'awards', label: 'Awards', description: 'Awards and recognition grid.' },
  newsletter: { type: 'newsletter', label: 'Newsletter', description: 'Email subscribe block.' },
  faq: { type: 'faq', label: 'FAQ', description: 'Frequently asked questions.' },
  location: { type: 'location', label: 'Location', description: 'Office location block.' },
};

export const SECTION_TYPES: SectionType[] = Object.keys(SECTION_TYPE_DEFS) as SectionType[];

export function getSectionTypeDefinition(type: string): SectionTypeDefinition {
  const def = SECTION_TYPE_DEFS[type as SectionType];
  if (!def) {
    throw ApiError.badRequest(`Unknown section type: ${type}`);
  }
  return def;
}

export function isKnownSectionType(type: string): type is SectionType {
  return type in SECTION_TYPE_DEFS;
}

export function validateSectionContent(type: string, content: unknown): void {
  const schema = getSectionSchema(type);
  const result = schema.safeParse(content ?? {});
  if (!result.success) {
    throw ApiError.validation(`Invalid content for section type "${type}"`, result.error.issues);
  }
}

export function getSectionSchema(type: string): z.ZodType {
  if (!isKnownSectionType(type)) {
    throw ApiError.badRequest(`Unknown section type: ${type}`);
  }
  return sectionSchemas[type];
}
