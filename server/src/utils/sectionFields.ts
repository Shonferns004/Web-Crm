import { z } from 'zod';

export type FieldType =
  | 'text'
  | 'textarea'
  | 'richText'
  | 'url'
  | 'number'
  | 'boolean'
  | 'select'
  | 'image'
  | 'gallery'
  | 'link'
  | 'entityRef'
  | 'group'
  | 'list'
  | 'repeater'
  | 'date';

export interface BaseFieldDef {
  name: string;
  label: string;
  required?: boolean;
  help?: string;
  placeholder?: string;
  default?: unknown;
}

export interface ScalarFieldDef extends BaseFieldDef {
  type: 'text' | 'textarea' | 'richText' | 'url' | 'date';
  maxLength?: number;
}
export interface NumberFieldDef extends BaseFieldDef {
  type: 'number';
  min?: number;
  max?: number;
}
export interface BooleanFieldDef extends BaseFieldDef {
  type: 'boolean';
}
export interface SelectFieldDef extends BaseFieldDef {
  type: 'select';
  options: string[];
}
export interface ImageFieldDef extends BaseFieldDef {
  type: 'image';
}
export interface GalleryFieldDef extends BaseFieldDef {
  type: 'gallery';
  maxItems?: number;
}
export interface LinkFieldDef extends BaseFieldDef {
  type: 'link';
}
export interface EntityRefFieldDef extends BaseFieldDef {
  type: 'entityRef';
  entityType: string;
  multiple?: boolean;
}
export interface GroupFieldDef extends BaseFieldDef {
  type: 'group';
  fields: FieldDef[];
}
export interface ListFieldDef extends BaseFieldDef {
  type: 'list';
  itemType: 'string' | 'number';
  maxItems?: number;
}
export interface RepeaterFieldDef extends BaseFieldDef {
  type: 'repeater';
  minItems?: number;
  maxItems?: number;
  fields: FieldDef[];
}

export type FieldDef =
  | ScalarFieldDef
  | NumberFieldDef
  | BooleanFieldDef
  | SelectFieldDef
  | ImageFieldDef
  | GalleryFieldDef
  | LinkFieldDef
  | EntityRefFieldDef
  | GroupFieldDef
  | ListFieldDef
  | RepeaterFieldDef;

const baseFields = {
  name: z.string().min(1).max(100).regex(/^[a-z][a-zA-Z0-9]*$/, 'Invalid field name'),
  label: z.string().min(1).max(200),
  required: z.boolean().optional(),
  help: z.string().max(500).optional(),
  placeholder: z.string().max(300).optional(),
  default: z.unknown().optional(),
};

const scalarWithMax = (type: FieldType) =>
  z
    .object({
      ...baseFields,
      type: z.literal(type as never),
      maxLength: z.number().int().positive().max(20000).optional(),
    })
    .strict();

export const fieldDefSchema: z.ZodType<FieldDef> = z.lazy(() =>
  z.discriminatedUnion('type', [
    scalarWithMax('text'),
    scalarWithMax('textarea'),
    scalarWithMax('richText'),
    scalarWithMax('url'),
    scalarWithMax('date'),
    z
      .object({
        ...baseFields,
        type: z.literal('number'),
        min: z.number().optional(),
        max: z.number().optional(),
      })
      .strict(),
    z.object({ ...baseFields, type: z.literal('boolean') }).strict(),
    z
      .object({
        ...baseFields,
        type: z.literal('select'),
        options: z.array(z.string().min(1).max(200)).min(1).max(200),
      })
      .strict(),
    z.object({ ...baseFields, type: z.literal('image') }).strict(),
    z
      .object({
        ...baseFields,
        type: z.literal('gallery'),
        maxItems: z.number().int().positive().max(500).optional(),
      })
      .strict(),
    z.object({ ...baseFields, type: z.literal('link') }).strict(),
    z
      .object({
        ...baseFields,
        type: z.literal('entityRef'),
        entityType: z.string().min(1).max(100),
        multiple: z.boolean().optional(),
      })
      .strict(),
    z
      .object({
        ...baseFields,
        type: z.literal('group'),
        fields: z.array(z.lazy(() => fieldDefSchema)).min(1).max(100),
      })
      .strict(),
    z
      .object({
        ...baseFields,
        type: z.literal('list'),
        itemType: z.enum(['string', 'number']),
        maxItems: z.number().int().positive().max(500).optional(),
      })
      .strict(),
    z
      .object({
        ...baseFields,
        type: z.literal('repeater'),
        minItems: z.number().int().nonnegative().max(200).optional(),
        maxItems: z.number().int().positive().max(500).optional(),
        fields: z.array(z.lazy(() => fieldDefSchema)).min(1).max(100),
      })
      .strict(),
  ]),
);

export const sectionFieldsSchema = z.array(fieldDefSchema).min(1).max(200);

function fieldZod(field: FieldDef): z.ZodTypeAny {
  let schema: z.ZodTypeAny;
  switch (field.type) {
    case 'text':
    case 'textarea':
    case 'richText':
    case 'url':
    case 'date':
      schema = z.string().max(field.maxLength ?? 20000);
      break;
    case 'image':
      schema = z.string().max(1000);
      break;
    case 'number': {
      let num = z.number();
      if (field.min !== undefined) num = num.min(field.min);
      if (field.max !== undefined) num = num.max(field.max);
      schema = num;
      break;
    }
    case 'boolean':
      schema = z.boolean();
      break;
    case 'select':
      schema = z.enum(field.options as [string, ...string[]]);
      break;
    case 'gallery':
      schema = z.array(z.string().max(1000)).max(field.maxItems ?? 500);
      break;
    case 'link':
      schema = z
        .object({ label: z.string().max(120), url: z.string().max(500) })
        .strict();
      break;
    case 'entityRef':
      schema = field.multiple
        ? z.array(z.string().uuid()).max(200)
        : z.string().uuid();
      break;
    case 'group':
      schema = objectFromFields(field.fields);
      break;
    case 'list':
      schema =
        field.itemType === 'number'
          ? z.array(z.number()).max(field.maxItems ?? 100)
          : z.array(z.string().max(5000)).max(field.maxItems ?? 100);
      break;
    case 'repeater': {
      let arr = z.array(objectFromFields(field.fields));
      if (field.minItems !== undefined) arr = arr.min(field.minItems);
      if (field.maxItems !== undefined) arr = arr.max(field.maxItems);
      schema = arr;
      break;
    }
  }
  if (!field.required) schema = schema.optional();
  return schema;
}

function objectFromFields(fields: FieldDef[]): z.ZodObject<Record<string, z.ZodTypeAny>> {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const field of fields) {
    shape[field.name] = fieldZod(field);
  }
  return z.object(shape).strict();
}

export function zodFromFields(fields: FieldDef[]): z.ZodType {
  return objectFromFields(fields);
}

function defaultValueFor(field: FieldDef): unknown {
  if (field.default !== undefined) return field.default;
  switch (field.type) {
    case 'text':
    case 'textarea':
    case 'richText':
    case 'url':
    case 'date':
    case 'image':
      return '';
    case 'number':
      return 0;
    case 'boolean':
      return false;
    case 'select':
      return field.options[0] ?? '';
    case 'link':
      return { label: '', url: '' };
    case 'gallery':
    case 'list':
      return [];
    case 'entityRef':
      return field.multiple ? [] : undefined;
    case 'group':
      return defaultContentFromFields(field.fields);
    case 'repeater':
      return [];
  }
}

export function defaultContentFromFields(fields: FieldDef[]): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const field of fields) {
    if (field.type === 'entityRef' && !field.multiple && !field.required) {
      continue;
    }
    if (field.default !== undefined || field.required) {
      out[field.name] = defaultValueFor(field);
    }
  }
  return out;
}
