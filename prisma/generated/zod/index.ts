import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ])
);

export type JsonValueType = z.infer<typeof JsonValueSchema>;

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.object({ toJSON: z.function(z.tuple([]), z.any()) }),
    z.record(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
  ])
);

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const RinneScenarioScalarFieldEnumSchema = z.enum(['id','authorId','title','path','imageUrl','published','createdAt','updatedAt']);

export const RinneUserScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','imageUrl','twitterAccount']);

export const ParagraphsScalarFieldEnumSchema = z.enum(['pid','title','paragraph']);

export const Paragraphs_relationScalarFieldEnumSchema = z.enum(['from','to']);

export const Scenario_listScalarFieldEnumSchema = z.enum(['id','title','src','summary','detail','s3_key','created','updated']);

export const Solo_journalScalarFieldEnumSchema = z.enum(['journal_id','journey_id','uid','title','created_at','updated_at']);

export const Solo_journeyScalarFieldEnumSchema = z.enum(['journeyId','uid','title','createdAt','updatedAt']);

export const Tag_historyScalarFieldEnumSchema = z.enum(['scenario_id','user_id','tag_name','tag_type','created_at']);

export const User_paragraph_historyScalarFieldEnumSchema = z.enum(['pid','uid','moved_epoctime']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const JsonNullValueInputSchema = z.enum(['JsonNull',]).transform((value) => (value === 'JsonNull' ? Prisma.JsonNull : value));

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.JsonNull : value === 'AnyNull' ? Prisma.AnyNull : value);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// RINNE SCENARIO SCHEMA
/////////////////////////////////////////

export const RinneScenarioSchema = z.object({
  id: z.string(),
  authorId: z.string(),
  title: z.string(),
  path: z.string(),
  imageUrl: z.string().nullable(),
  published: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type RinneScenario = z.infer<typeof RinneScenarioSchema>

/////////////////////////////////////////
// RINNE USER SCHEMA
/////////////////////////////////////////

export const RinneUserSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  imageUrl: z.string().nullable(),
  twitterAccount: z.string().nullable(),
})

export type RinneUser = z.infer<typeof RinneUserSchema>

/////////////////////////////////////////
// PARAGRAPHS SCHEMA
/////////////////////////////////////////

export const paragraphsSchema = z.object({
  pid: z.string(),
  title: z.string(),
  paragraph: JsonValueSchema.nullable(),
})

export type paragraphs = z.infer<typeof paragraphsSchema>

/////////////////////////////////////////
// PARAGRAPHS RELATION SCHEMA
/////////////////////////////////////////

export const paragraphs_relationSchema = z.object({
  from: z.string(),
  to: z.string(),
})

export type paragraphs_relation = z.infer<typeof paragraphs_relationSchema>

/////////////////////////////////////////
// SCENARIO LIST SCHEMA
/////////////////////////////////////////

/**
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export const scenario_listSchema = z.object({
  id: z.string(),
  title: z.string(),
  src: z.string(),
  summary: z.string(),
  detail: z.string(),
  s3_key: z.string(),
  created: z.coerce.date(),
  updated: z.coerce.date(),
})

export type scenario_list = z.infer<typeof scenario_listSchema>

/////////////////////////////////////////
// SOLO JOURNAL SCHEMA
/////////////////////////////////////////

export const solo_journalSchema = z.object({
  journal_id: z.string(),
  journey_id: z.string(),
  uid: z.string(),
  title: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type solo_journal = z.infer<typeof solo_journalSchema>

/////////////////////////////////////////
// SOLO JOURNEY SCHEMA
/////////////////////////////////////////

export const solo_journeySchema = z.object({
  journeyId: z.string(),
  uid: z.string(),
  title: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type solo_journey = z.infer<typeof solo_journeySchema>

/////////////////////////////////////////
// TAG HISTORY SCHEMA
/////////////////////////////////////////

/**
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export const tag_historySchema = z.object({
  scenario_id: z.string(),
  user_id: z.string(),
  tag_name: z.string(),
  tag_type: z.string().nullable(),
  created_at: z.coerce.date(),
})

export type tag_history = z.infer<typeof tag_historySchema>

/////////////////////////////////////////
// USER PARAGRAPH HISTORY SCHEMA
/////////////////////////////////////////

export const user_paragraph_historySchema = z.object({
  pid: z.string(),
  uid: z.string(),
  moved_epoctime: z.bigint(),
})

export type user_paragraph_history = z.infer<typeof user_paragraph_historySchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// RINNE SCENARIO
//------------------------------------------------------

export const RinneScenarioSelectSchema: z.ZodType<Prisma.RinneScenarioSelect> = z.object({
  id: z.boolean().optional(),
  authorId: z.boolean().optional(),
  title: z.boolean().optional(),
  path: z.boolean().optional(),
  imageUrl: z.boolean().optional(),
  published: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// RINNE USER
//------------------------------------------------------

export const RinneUserSelectSchema: z.ZodType<Prisma.RinneUserSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  imageUrl: z.boolean().optional(),
  twitterAccount: z.boolean().optional(),
}).strict()

// PARAGRAPHS
//------------------------------------------------------

export const paragraphsSelectSchema: z.ZodType<Prisma.paragraphsSelect> = z.object({
  pid: z.boolean().optional(),
  title: z.boolean().optional(),
  paragraph: z.boolean().optional(),
}).strict()

// PARAGRAPHS RELATION
//------------------------------------------------------

export const paragraphs_relationSelectSchema: z.ZodType<Prisma.paragraphs_relationSelect> = z.object({
  from: z.boolean().optional(),
  to: z.boolean().optional(),
}).strict()

// SCENARIO LIST
//------------------------------------------------------

export const scenario_listSelectSchema: z.ZodType<Prisma.scenario_listSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  src: z.boolean().optional(),
  summary: z.boolean().optional(),
  detail: z.boolean().optional(),
  s3_key: z.boolean().optional(),
  created: z.boolean().optional(),
  updated: z.boolean().optional(),
}).strict()

// SOLO JOURNAL
//------------------------------------------------------

export const solo_journalSelectSchema: z.ZodType<Prisma.solo_journalSelect> = z.object({
  journal_id: z.boolean().optional(),
  journey_id: z.boolean().optional(),
  uid: z.boolean().optional(),
  title: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
}).strict()

// SOLO JOURNEY
//------------------------------------------------------

export const solo_journeySelectSchema: z.ZodType<Prisma.solo_journeySelect> = z.object({
  journeyId: z.boolean().optional(),
  uid: z.boolean().optional(),
  title: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// TAG HISTORY
//------------------------------------------------------

export const tag_historySelectSchema: z.ZodType<Prisma.tag_historySelect> = z.object({
  scenario_id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  tag_name: z.boolean().optional(),
  tag_type: z.boolean().optional(),
  created_at: z.boolean().optional(),
}).strict()

// USER PARAGRAPH HISTORY
//------------------------------------------------------

export const user_paragraph_historySelectSchema: z.ZodType<Prisma.user_paragraph_historySelect> = z.object({
  pid: z.boolean().optional(),
  uid: z.boolean().optional(),
  moved_epoctime: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const RinneScenarioWhereInputSchema: z.ZodType<Prisma.RinneScenarioWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RinneScenarioWhereInputSchema),z.lazy(() => RinneScenarioWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RinneScenarioWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RinneScenarioWhereInputSchema),z.lazy(() => RinneScenarioWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  path: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  published: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RinneScenarioOrderByWithRelationInputSchema: z.ZodType<Prisma.RinneScenarioOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  published: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RinneScenarioWhereUniqueInputSchema: z.ZodType<Prisma.RinneScenarioWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => RinneScenarioWhereInputSchema),z.lazy(() => RinneScenarioWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RinneScenarioWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RinneScenarioWhereInputSchema),z.lazy(() => RinneScenarioWhereInputSchema).array() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  path: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  published: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const RinneScenarioOrderByWithAggregationInputSchema: z.ZodType<Prisma.RinneScenarioOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  published: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RinneScenarioCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RinneScenarioMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RinneScenarioMinOrderByAggregateInputSchema).optional()
}).strict();

export const RinneScenarioScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RinneScenarioScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RinneScenarioScalarWhereWithAggregatesInputSchema),z.lazy(() => RinneScenarioScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RinneScenarioScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RinneScenarioScalarWhereWithAggregatesInputSchema),z.lazy(() => RinneScenarioScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  path: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  published: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RinneUserWhereInputSchema: z.ZodType<Prisma.RinneUserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RinneUserWhereInputSchema),z.lazy(() => RinneUserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RinneUserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RinneUserWhereInputSchema),z.lazy(() => RinneUserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  twitterAccount: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const RinneUserOrderByWithRelationInputSchema: z.ZodType<Prisma.RinneUserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  twitterAccount: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
}).strict();

export const RinneUserWhereUniqueInputSchema: z.ZodType<Prisma.RinneUserWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => RinneUserWhereInputSchema),z.lazy(() => RinneUserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RinneUserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RinneUserWhereInputSchema),z.lazy(() => RinneUserWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  twitterAccount: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict());

export const RinneUserOrderByWithAggregationInputSchema: z.ZodType<Prisma.RinneUserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  twitterAccount: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => RinneUserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RinneUserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RinneUserMinOrderByAggregateInputSchema).optional()
}).strict();

export const RinneUserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RinneUserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RinneUserScalarWhereWithAggregatesInputSchema),z.lazy(() => RinneUserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RinneUserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RinneUserScalarWhereWithAggregatesInputSchema),z.lazy(() => RinneUserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  twitterAccount: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const paragraphsWhereInputSchema: z.ZodType<Prisma.paragraphsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => paragraphsWhereInputSchema),z.lazy(() => paragraphsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => paragraphsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => paragraphsWhereInputSchema),z.lazy(() => paragraphsWhereInputSchema).array() ]).optional(),
  pid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  paragraph: z.lazy(() => JsonFilterSchema).optional()
}).strict();

export const paragraphsOrderByWithRelationInputSchema: z.ZodType<Prisma.paragraphsOrderByWithRelationInput> = z.object({
  pid: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  paragraph: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const paragraphsWhereUniqueInputSchema: z.ZodType<Prisma.paragraphsWhereUniqueInput> = z.object({
  pid: z.string()
})
.and(z.object({
  pid: z.string().optional(),
  AND: z.union([ z.lazy(() => paragraphsWhereInputSchema),z.lazy(() => paragraphsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => paragraphsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => paragraphsWhereInputSchema),z.lazy(() => paragraphsWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  paragraph: z.lazy(() => JsonFilterSchema).optional()
}).strict());

export const paragraphsOrderByWithAggregationInputSchema: z.ZodType<Prisma.paragraphsOrderByWithAggregationInput> = z.object({
  pid: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  paragraph: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => paragraphsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => paragraphsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => paragraphsMinOrderByAggregateInputSchema).optional()
}).strict();

export const paragraphsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.paragraphsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => paragraphsScalarWhereWithAggregatesInputSchema),z.lazy(() => paragraphsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => paragraphsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => paragraphsScalarWhereWithAggregatesInputSchema),z.lazy(() => paragraphsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  pid: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  paragraph: z.lazy(() => JsonWithAggregatesFilterSchema).optional()
}).strict();

export const paragraphs_relationWhereInputSchema: z.ZodType<Prisma.paragraphs_relationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => paragraphs_relationWhereInputSchema),z.lazy(() => paragraphs_relationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => paragraphs_relationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => paragraphs_relationWhereInputSchema),z.lazy(() => paragraphs_relationWhereInputSchema).array() ]).optional(),
  from: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  to: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const paragraphs_relationOrderByWithRelationInputSchema: z.ZodType<Prisma.paragraphs_relationOrderByWithRelationInput> = z.object({
  from: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const paragraphs_relationWhereUniqueInputSchema: z.ZodType<Prisma.paragraphs_relationWhereUniqueInput> = z.object({
  from_to: z.lazy(() => paragraphs_relationFromToCompoundUniqueInputSchema)
})
.and(z.object({
  from_to: z.lazy(() => paragraphs_relationFromToCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => paragraphs_relationWhereInputSchema),z.lazy(() => paragraphs_relationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => paragraphs_relationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => paragraphs_relationWhereInputSchema),z.lazy(() => paragraphs_relationWhereInputSchema).array() ]).optional(),
  from: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  to: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict());

export const paragraphs_relationOrderByWithAggregationInputSchema: z.ZodType<Prisma.paragraphs_relationOrderByWithAggregationInput> = z.object({
  from: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => paragraphs_relationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => paragraphs_relationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => paragraphs_relationMinOrderByAggregateInputSchema).optional()
}).strict();

export const paragraphs_relationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.paragraphs_relationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => paragraphs_relationScalarWhereWithAggregatesInputSchema),z.lazy(() => paragraphs_relationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => paragraphs_relationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => paragraphs_relationScalarWhereWithAggregatesInputSchema),z.lazy(() => paragraphs_relationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  from: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  to: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const scenario_listWhereInputSchema: z.ZodType<Prisma.scenario_listWhereInput> = z.object({
  AND: z.union([ z.lazy(() => scenario_listWhereInputSchema),z.lazy(() => scenario_listWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => scenario_listWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => scenario_listWhereInputSchema),z.lazy(() => scenario_listWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  src: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  summary: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  detail: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  s3_key: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const scenario_listOrderByWithRelationInputSchema: z.ZodType<Prisma.scenario_listOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  src: z.lazy(() => SortOrderSchema).optional(),
  summary: z.lazy(() => SortOrderSchema).optional(),
  detail: z.lazy(() => SortOrderSchema).optional(),
  s3_key: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const scenario_listWhereUniqueInputSchema: z.ZodType<Prisma.scenario_listWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => scenario_listWhereInputSchema),z.lazy(() => scenario_listWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => scenario_listWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => scenario_listWhereInputSchema),z.lazy(() => scenario_listWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  src: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  summary: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  detail: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  s3_key: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const scenario_listOrderByWithAggregationInputSchema: z.ZodType<Prisma.scenario_listOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  src: z.lazy(() => SortOrderSchema).optional(),
  summary: z.lazy(() => SortOrderSchema).optional(),
  detail: z.lazy(() => SortOrderSchema).optional(),
  s3_key: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => scenario_listCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => scenario_listMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => scenario_listMinOrderByAggregateInputSchema).optional()
}).strict();

export const scenario_listScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.scenario_listScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => scenario_listScalarWhereWithAggregatesInputSchema),z.lazy(() => scenario_listScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => scenario_listScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => scenario_listScalarWhereWithAggregatesInputSchema),z.lazy(() => scenario_listScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  src: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  summary: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  detail: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  s3_key: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const solo_journalWhereInputSchema: z.ZodType<Prisma.solo_journalWhereInput> = z.object({
  AND: z.union([ z.lazy(() => solo_journalWhereInputSchema),z.lazy(() => solo_journalWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => solo_journalWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => solo_journalWhereInputSchema),z.lazy(() => solo_journalWhereInputSchema).array() ]).optional(),
  journal_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  journey_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  uid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const solo_journalOrderByWithRelationInputSchema: z.ZodType<Prisma.solo_journalOrderByWithRelationInput> = z.object({
  journal_id: z.lazy(() => SortOrderSchema).optional(),
  journey_id: z.lazy(() => SortOrderSchema).optional(),
  uid: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const solo_journalWhereUniqueInputSchema: z.ZodType<Prisma.solo_journalWhereUniqueInput> = z.object({
  journal_id: z.string()
})
.and(z.object({
  journal_id: z.string().optional(),
  AND: z.union([ z.lazy(() => solo_journalWhereInputSchema),z.lazy(() => solo_journalWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => solo_journalWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => solo_journalWhereInputSchema),z.lazy(() => solo_journalWhereInputSchema).array() ]).optional(),
  journey_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  uid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const solo_journalOrderByWithAggregationInputSchema: z.ZodType<Prisma.solo_journalOrderByWithAggregationInput> = z.object({
  journal_id: z.lazy(() => SortOrderSchema).optional(),
  journey_id: z.lazy(() => SortOrderSchema).optional(),
  uid: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => solo_journalCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => solo_journalMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => solo_journalMinOrderByAggregateInputSchema).optional()
}).strict();

export const solo_journalScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.solo_journalScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => solo_journalScalarWhereWithAggregatesInputSchema),z.lazy(() => solo_journalScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => solo_journalScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => solo_journalScalarWhereWithAggregatesInputSchema),z.lazy(() => solo_journalScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  journal_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  journey_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  uid: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const solo_journeyWhereInputSchema: z.ZodType<Prisma.solo_journeyWhereInput> = z.object({
  AND: z.union([ z.lazy(() => solo_journeyWhereInputSchema),z.lazy(() => solo_journeyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => solo_journeyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => solo_journeyWhereInputSchema),z.lazy(() => solo_journeyWhereInputSchema).array() ]).optional(),
  journeyId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  uid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const solo_journeyOrderByWithRelationInputSchema: z.ZodType<Prisma.solo_journeyOrderByWithRelationInput> = z.object({
  journeyId: z.lazy(() => SortOrderSchema).optional(),
  uid: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const solo_journeyWhereUniqueInputSchema: z.ZodType<Prisma.solo_journeyWhereUniqueInput> = z.object({
  journeyId: z.string()
})
.and(z.object({
  journeyId: z.string().optional(),
  AND: z.union([ z.lazy(() => solo_journeyWhereInputSchema),z.lazy(() => solo_journeyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => solo_journeyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => solo_journeyWhereInputSchema),z.lazy(() => solo_journeyWhereInputSchema).array() ]).optional(),
  uid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const solo_journeyOrderByWithAggregationInputSchema: z.ZodType<Prisma.solo_journeyOrderByWithAggregationInput> = z.object({
  journeyId: z.lazy(() => SortOrderSchema).optional(),
  uid: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => solo_journeyCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => solo_journeyMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => solo_journeyMinOrderByAggregateInputSchema).optional()
}).strict();

export const solo_journeyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.solo_journeyScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => solo_journeyScalarWhereWithAggregatesInputSchema),z.lazy(() => solo_journeyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => solo_journeyScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => solo_journeyScalarWhereWithAggregatesInputSchema),z.lazy(() => solo_journeyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  journeyId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  uid: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const tag_historyWhereInputSchema: z.ZodType<Prisma.tag_historyWhereInput> = z.object({
  AND: z.union([ z.lazy(() => tag_historyWhereInputSchema),z.lazy(() => tag_historyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => tag_historyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => tag_historyWhereInputSchema),z.lazy(() => tag_historyWhereInputSchema).array() ]).optional(),
  scenario_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tag_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tag_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const tag_historyOrderByWithRelationInputSchema: z.ZodType<Prisma.tag_historyOrderByWithRelationInput> = z.object({
  scenario_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  tag_name: z.lazy(() => SortOrderSchema).optional(),
  tag_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const tag_historyWhereUniqueInputSchema: z.ZodType<Prisma.tag_historyWhereUniqueInput> = z.object({
  scenario_id_user_id_tag_name: z.lazy(() => tag_historyScenario_idUser_idTag_nameCompoundUniqueInputSchema)
})
.and(z.object({
  scenario_id_user_id_tag_name: z.lazy(() => tag_historyScenario_idUser_idTag_nameCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => tag_historyWhereInputSchema),z.lazy(() => tag_historyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => tag_historyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => tag_historyWhereInputSchema),z.lazy(() => tag_historyWhereInputSchema).array() ]).optional(),
  scenario_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tag_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tag_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const tag_historyOrderByWithAggregationInputSchema: z.ZodType<Prisma.tag_historyOrderByWithAggregationInput> = z.object({
  scenario_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  tag_name: z.lazy(() => SortOrderSchema).optional(),
  tag_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => tag_historyCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => tag_historyMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => tag_historyMinOrderByAggregateInputSchema).optional()
}).strict();

export const tag_historyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.tag_historyScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => tag_historyScalarWhereWithAggregatesInputSchema),z.lazy(() => tag_historyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => tag_historyScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => tag_historyScalarWhereWithAggregatesInputSchema),z.lazy(() => tag_historyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  scenario_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tag_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tag_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const user_paragraph_historyWhereInputSchema: z.ZodType<Prisma.user_paragraph_historyWhereInput> = z.object({
  AND: z.union([ z.lazy(() => user_paragraph_historyWhereInputSchema),z.lazy(() => user_paragraph_historyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => user_paragraph_historyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => user_paragraph_historyWhereInputSchema),z.lazy(() => user_paragraph_historyWhereInputSchema).array() ]).optional(),
  pid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  uid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  moved_epoctime: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
}).strict();

export const user_paragraph_historyOrderByWithRelationInputSchema: z.ZodType<Prisma.user_paragraph_historyOrderByWithRelationInput> = z.object({
  pid: z.lazy(() => SortOrderSchema).optional(),
  uid: z.lazy(() => SortOrderSchema).optional(),
  moved_epoctime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const user_paragraph_historyWhereUniqueInputSchema: z.ZodType<Prisma.user_paragraph_historyWhereUniqueInput> = z.object({
  pid_uid_moved_epoctime: z.lazy(() => user_paragraph_historyPidUidMoved_epoctimeCompoundUniqueInputSchema)
})
.and(z.object({
  pid_uid_moved_epoctime: z.lazy(() => user_paragraph_historyPidUidMoved_epoctimeCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => user_paragraph_historyWhereInputSchema),z.lazy(() => user_paragraph_historyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => user_paragraph_historyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => user_paragraph_historyWhereInputSchema),z.lazy(() => user_paragraph_historyWhereInputSchema).array() ]).optional(),
  pid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  uid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  moved_epoctime: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
}).strict());

export const user_paragraph_historyOrderByWithAggregationInputSchema: z.ZodType<Prisma.user_paragraph_historyOrderByWithAggregationInput> = z.object({
  pid: z.lazy(() => SortOrderSchema).optional(),
  uid: z.lazy(() => SortOrderSchema).optional(),
  moved_epoctime: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => user_paragraph_historyCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => user_paragraph_historyAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => user_paragraph_historyMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => user_paragraph_historyMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => user_paragraph_historySumOrderByAggregateInputSchema).optional()
}).strict();

export const user_paragraph_historyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.user_paragraph_historyScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => user_paragraph_historyScalarWhereWithAggregatesInputSchema),z.lazy(() => user_paragraph_historyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => user_paragraph_historyScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => user_paragraph_historyScalarWhereWithAggregatesInputSchema),z.lazy(() => user_paragraph_historyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  pid: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  uid: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  moved_epoctime: z.union([ z.lazy(() => BigIntWithAggregatesFilterSchema),z.bigint() ]).optional(),
}).strict();

export const RinneScenarioCreateInputSchema: z.ZodType<Prisma.RinneScenarioCreateInput> = z.object({
  id: z.string(),
  authorId: z.string(),
  title: z.string(),
  path: z.string(),
  imageUrl: z.string().optional().nullable(),
  published: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date()
}).strict();

export const RinneScenarioUncheckedCreateInputSchema: z.ZodType<Prisma.RinneScenarioUncheckedCreateInput> = z.object({
  id: z.string(),
  authorId: z.string(),
  title: z.string(),
  path: z.string(),
  imageUrl: z.string().optional().nullable(),
  published: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date()
}).strict();

export const RinneScenarioUpdateInputSchema: z.ZodType<Prisma.RinneScenarioUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RinneScenarioUncheckedUpdateInputSchema: z.ZodType<Prisma.RinneScenarioUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RinneScenarioCreateManyInputSchema: z.ZodType<Prisma.RinneScenarioCreateManyInput> = z.object({
  id: z.string(),
  authorId: z.string(),
  title: z.string(),
  path: z.string(),
  imageUrl: z.string().optional().nullable(),
  published: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date()
}).strict();

export const RinneScenarioUpdateManyMutationInputSchema: z.ZodType<Prisma.RinneScenarioUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RinneScenarioUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RinneScenarioUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RinneUserCreateInputSchema: z.ZodType<Prisma.RinneUserCreateInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date(),
  imageUrl: z.string().optional().nullable(),
  twitterAccount: z.string().optional().nullable()
}).strict();

export const RinneUserUncheckedCreateInputSchema: z.ZodType<Prisma.RinneUserUncheckedCreateInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date(),
  imageUrl: z.string().optional().nullable(),
  twitterAccount: z.string().optional().nullable()
}).strict();

export const RinneUserUpdateInputSchema: z.ZodType<Prisma.RinneUserUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterAccount: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RinneUserUncheckedUpdateInputSchema: z.ZodType<Prisma.RinneUserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterAccount: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RinneUserCreateManyInputSchema: z.ZodType<Prisma.RinneUserCreateManyInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date(),
  imageUrl: z.string().optional().nullable(),
  twitterAccount: z.string().optional().nullable()
}).strict();

export const RinneUserUpdateManyMutationInputSchema: z.ZodType<Prisma.RinneUserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterAccount: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RinneUserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RinneUserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twitterAccount: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const paragraphsCreateInputSchema: z.ZodType<Prisma.paragraphsCreateInput> = z.object({
  pid: z.string(),
  title: z.string(),
  paragraph: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
}).strict();

export const paragraphsUncheckedCreateInputSchema: z.ZodType<Prisma.paragraphsUncheckedCreateInput> = z.object({
  pid: z.string(),
  title: z.string(),
  paragraph: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
}).strict();

export const paragraphsUpdateInputSchema: z.ZodType<Prisma.paragraphsUpdateInput> = z.object({
  pid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paragraph: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const paragraphsUncheckedUpdateInputSchema: z.ZodType<Prisma.paragraphsUncheckedUpdateInput> = z.object({
  pid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paragraph: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const paragraphsCreateManyInputSchema: z.ZodType<Prisma.paragraphsCreateManyInput> = z.object({
  pid: z.string(),
  title: z.string(),
  paragraph: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
}).strict();

export const paragraphsUpdateManyMutationInputSchema: z.ZodType<Prisma.paragraphsUpdateManyMutationInput> = z.object({
  pid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paragraph: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const paragraphsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.paragraphsUncheckedUpdateManyInput> = z.object({
  pid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paragraph: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const paragraphs_relationCreateInputSchema: z.ZodType<Prisma.paragraphs_relationCreateInput> = z.object({
  from: z.string(),
  to: z.string()
}).strict();

export const paragraphs_relationUncheckedCreateInputSchema: z.ZodType<Prisma.paragraphs_relationUncheckedCreateInput> = z.object({
  from: z.string(),
  to: z.string()
}).strict();

export const paragraphs_relationUpdateInputSchema: z.ZodType<Prisma.paragraphs_relationUpdateInput> = z.object({
  from: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const paragraphs_relationUncheckedUpdateInputSchema: z.ZodType<Prisma.paragraphs_relationUncheckedUpdateInput> = z.object({
  from: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const paragraphs_relationCreateManyInputSchema: z.ZodType<Prisma.paragraphs_relationCreateManyInput> = z.object({
  from: z.string(),
  to: z.string()
}).strict();

export const paragraphs_relationUpdateManyMutationInputSchema: z.ZodType<Prisma.paragraphs_relationUpdateManyMutationInput> = z.object({
  from: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const paragraphs_relationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.paragraphs_relationUncheckedUpdateManyInput> = z.object({
  from: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const scenario_listCreateInputSchema: z.ZodType<Prisma.scenario_listCreateInput> = z.object({
  id: z.string(),
  title: z.string(),
  src: z.string(),
  summary: z.string(),
  detail: z.string(),
  s3_key: z.string(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional()
}).strict();

export const scenario_listUncheckedCreateInputSchema: z.ZodType<Prisma.scenario_listUncheckedCreateInput> = z.object({
  id: z.string(),
  title: z.string(),
  src: z.string(),
  summary: z.string(),
  detail: z.string(),
  s3_key: z.string(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional()
}).strict();

export const scenario_listUpdateInputSchema: z.ZodType<Prisma.scenario_listUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  src: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  summary: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  s3_key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const scenario_listUncheckedUpdateInputSchema: z.ZodType<Prisma.scenario_listUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  src: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  summary: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  s3_key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const scenario_listCreateManyInputSchema: z.ZodType<Prisma.scenario_listCreateManyInput> = z.object({
  id: z.string(),
  title: z.string(),
  src: z.string(),
  summary: z.string(),
  detail: z.string(),
  s3_key: z.string(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional()
}).strict();

export const scenario_listUpdateManyMutationInputSchema: z.ZodType<Prisma.scenario_listUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  src: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  summary: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  s3_key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const scenario_listUncheckedUpdateManyInputSchema: z.ZodType<Prisma.scenario_listUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  src: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  summary: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  s3_key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const solo_journalCreateInputSchema: z.ZodType<Prisma.solo_journalCreateInput> = z.object({
  journal_id: z.string(),
  journey_id: z.string(),
  uid: z.string(),
  title: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const solo_journalUncheckedCreateInputSchema: z.ZodType<Prisma.solo_journalUncheckedCreateInput> = z.object({
  journal_id: z.string(),
  journey_id: z.string(),
  uid: z.string(),
  title: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const solo_journalUpdateInputSchema: z.ZodType<Prisma.solo_journalUpdateInput> = z.object({
  journal_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  journey_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const solo_journalUncheckedUpdateInputSchema: z.ZodType<Prisma.solo_journalUncheckedUpdateInput> = z.object({
  journal_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  journey_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const solo_journalCreateManyInputSchema: z.ZodType<Prisma.solo_journalCreateManyInput> = z.object({
  journal_id: z.string(),
  journey_id: z.string(),
  uid: z.string(),
  title: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const solo_journalUpdateManyMutationInputSchema: z.ZodType<Prisma.solo_journalUpdateManyMutationInput> = z.object({
  journal_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  journey_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const solo_journalUncheckedUpdateManyInputSchema: z.ZodType<Prisma.solo_journalUncheckedUpdateManyInput> = z.object({
  journal_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  journey_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const solo_journeyCreateInputSchema: z.ZodType<Prisma.solo_journeyCreateInput> = z.object({
  journeyId: z.string(),
  uid: z.string(),
  title: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const solo_journeyUncheckedCreateInputSchema: z.ZodType<Prisma.solo_journeyUncheckedCreateInput> = z.object({
  journeyId: z.string(),
  uid: z.string(),
  title: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const solo_journeyUpdateInputSchema: z.ZodType<Prisma.solo_journeyUpdateInput> = z.object({
  journeyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const solo_journeyUncheckedUpdateInputSchema: z.ZodType<Prisma.solo_journeyUncheckedUpdateInput> = z.object({
  journeyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const solo_journeyCreateManyInputSchema: z.ZodType<Prisma.solo_journeyCreateManyInput> = z.object({
  journeyId: z.string(),
  uid: z.string(),
  title: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const solo_journeyUpdateManyMutationInputSchema: z.ZodType<Prisma.solo_journeyUpdateManyMutationInput> = z.object({
  journeyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const solo_journeyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.solo_journeyUncheckedUpdateManyInput> = z.object({
  journeyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const tag_historyCreateInputSchema: z.ZodType<Prisma.tag_historyCreateInput> = z.object({
  scenario_id: z.string(),
  user_id: z.string(),
  tag_name: z.string(),
  tag_type: z.string().optional().nullable(),
  created_at: z.coerce.date().optional()
}).strict();

export const tag_historyUncheckedCreateInputSchema: z.ZodType<Prisma.tag_historyUncheckedCreateInput> = z.object({
  scenario_id: z.string(),
  user_id: z.string(),
  tag_name: z.string(),
  tag_type: z.string().optional().nullable(),
  created_at: z.coerce.date().optional()
}).strict();

export const tag_historyUpdateInputSchema: z.ZodType<Prisma.tag_historyUpdateInput> = z.object({
  scenario_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tag_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tag_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const tag_historyUncheckedUpdateInputSchema: z.ZodType<Prisma.tag_historyUncheckedUpdateInput> = z.object({
  scenario_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tag_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tag_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const tag_historyCreateManyInputSchema: z.ZodType<Prisma.tag_historyCreateManyInput> = z.object({
  scenario_id: z.string(),
  user_id: z.string(),
  tag_name: z.string(),
  tag_type: z.string().optional().nullable(),
  created_at: z.coerce.date().optional()
}).strict();

export const tag_historyUpdateManyMutationInputSchema: z.ZodType<Prisma.tag_historyUpdateManyMutationInput> = z.object({
  scenario_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tag_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tag_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const tag_historyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.tag_historyUncheckedUpdateManyInput> = z.object({
  scenario_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tag_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tag_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const user_paragraph_historyCreateInputSchema: z.ZodType<Prisma.user_paragraph_historyCreateInput> = z.object({
  pid: z.string(),
  uid: z.string(),
  moved_epoctime: z.bigint()
}).strict();

export const user_paragraph_historyUncheckedCreateInputSchema: z.ZodType<Prisma.user_paragraph_historyUncheckedCreateInput> = z.object({
  pid: z.string(),
  uid: z.string(),
  moved_epoctime: z.bigint()
}).strict();

export const user_paragraph_historyUpdateInputSchema: z.ZodType<Prisma.user_paragraph_historyUpdateInput> = z.object({
  pid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  moved_epoctime: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const user_paragraph_historyUncheckedUpdateInputSchema: z.ZodType<Prisma.user_paragraph_historyUncheckedUpdateInput> = z.object({
  pid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  moved_epoctime: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const user_paragraph_historyCreateManyInputSchema: z.ZodType<Prisma.user_paragraph_historyCreateManyInput> = z.object({
  pid: z.string(),
  uid: z.string(),
  moved_epoctime: z.bigint()
}).strict();

export const user_paragraph_historyUpdateManyMutationInputSchema: z.ZodType<Prisma.user_paragraph_historyUpdateManyMutationInput> = z.object({
  pid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  moved_epoctime: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const user_paragraph_historyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.user_paragraph_historyUncheckedUpdateManyInput> = z.object({
  pid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  moved_epoctime: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const RinneScenarioCountOrderByAggregateInputSchema: z.ZodType<Prisma.RinneScenarioCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  published: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RinneScenarioMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RinneScenarioMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  published: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RinneScenarioMinOrderByAggregateInputSchema: z.ZodType<Prisma.RinneScenarioMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  published: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const RinneUserCountOrderByAggregateInputSchema: z.ZodType<Prisma.RinneUserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  twitterAccount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RinneUserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RinneUserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  twitterAccount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RinneUserMinOrderByAggregateInputSchema: z.ZodType<Prisma.RinneUserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  twitterAccount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JsonFilterSchema: z.ZodType<Prisma.JsonFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
}).strict();

export const paragraphsCountOrderByAggregateInputSchema: z.ZodType<Prisma.paragraphsCountOrderByAggregateInput> = z.object({
  pid: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  paragraph: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const paragraphsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.paragraphsMaxOrderByAggregateInput> = z.object({
  pid: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const paragraphsMinOrderByAggregateInputSchema: z.ZodType<Prisma.paragraphsMinOrderByAggregateInput> = z.object({
  pid: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JsonWithAggregatesFilterSchema: z.ZodType<Prisma.JsonWithAggregatesFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonFilterSchema).optional()
}).strict();

export const paragraphs_relationFromToCompoundUniqueInputSchema: z.ZodType<Prisma.paragraphs_relationFromToCompoundUniqueInput> = z.object({
  from: z.string(),
  to: z.string()
}).strict();

export const paragraphs_relationCountOrderByAggregateInputSchema: z.ZodType<Prisma.paragraphs_relationCountOrderByAggregateInput> = z.object({
  from: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const paragraphs_relationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.paragraphs_relationMaxOrderByAggregateInput> = z.object({
  from: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const paragraphs_relationMinOrderByAggregateInputSchema: z.ZodType<Prisma.paragraphs_relationMinOrderByAggregateInput> = z.object({
  from: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UuidFilterSchema: z.ZodType<Prisma.UuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export const scenario_listCountOrderByAggregateInputSchema: z.ZodType<Prisma.scenario_listCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  src: z.lazy(() => SortOrderSchema).optional(),
  summary: z.lazy(() => SortOrderSchema).optional(),
  detail: z.lazy(() => SortOrderSchema).optional(),
  s3_key: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const scenario_listMaxOrderByAggregateInputSchema: z.ZodType<Prisma.scenario_listMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  src: z.lazy(() => SortOrderSchema).optional(),
  summary: z.lazy(() => SortOrderSchema).optional(),
  detail: z.lazy(() => SortOrderSchema).optional(),
  s3_key: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const scenario_listMinOrderByAggregateInputSchema: z.ZodType<Prisma.scenario_listMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  src: z.lazy(() => SortOrderSchema).optional(),
  summary: z.lazy(() => SortOrderSchema).optional(),
  detail: z.lazy(() => SortOrderSchema).optional(),
  s3_key: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UuidWithAggregatesFilterSchema: z.ZodType<Prisma.UuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const solo_journalCountOrderByAggregateInputSchema: z.ZodType<Prisma.solo_journalCountOrderByAggregateInput> = z.object({
  journal_id: z.lazy(() => SortOrderSchema).optional(),
  journey_id: z.lazy(() => SortOrderSchema).optional(),
  uid: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const solo_journalMaxOrderByAggregateInputSchema: z.ZodType<Prisma.solo_journalMaxOrderByAggregateInput> = z.object({
  journal_id: z.lazy(() => SortOrderSchema).optional(),
  journey_id: z.lazy(() => SortOrderSchema).optional(),
  uid: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const solo_journalMinOrderByAggregateInputSchema: z.ZodType<Prisma.solo_journalMinOrderByAggregateInput> = z.object({
  journal_id: z.lazy(() => SortOrderSchema).optional(),
  journey_id: z.lazy(() => SortOrderSchema).optional(),
  uid: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const solo_journeyCountOrderByAggregateInputSchema: z.ZodType<Prisma.solo_journeyCountOrderByAggregateInput> = z.object({
  journeyId: z.lazy(() => SortOrderSchema).optional(),
  uid: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const solo_journeyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.solo_journeyMaxOrderByAggregateInput> = z.object({
  journeyId: z.lazy(() => SortOrderSchema).optional(),
  uid: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const solo_journeyMinOrderByAggregateInputSchema: z.ZodType<Prisma.solo_journeyMinOrderByAggregateInput> = z.object({
  journeyId: z.lazy(() => SortOrderSchema).optional(),
  uid: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const tag_historyScenario_idUser_idTag_nameCompoundUniqueInputSchema: z.ZodType<Prisma.tag_historyScenario_idUser_idTag_nameCompoundUniqueInput> = z.object({
  scenario_id: z.string(),
  user_id: z.string(),
  tag_name: z.string()
}).strict();

export const tag_historyCountOrderByAggregateInputSchema: z.ZodType<Prisma.tag_historyCountOrderByAggregateInput> = z.object({
  scenario_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  tag_name: z.lazy(() => SortOrderSchema).optional(),
  tag_type: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const tag_historyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.tag_historyMaxOrderByAggregateInput> = z.object({
  scenario_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  tag_name: z.lazy(() => SortOrderSchema).optional(),
  tag_type: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const tag_historyMinOrderByAggregateInputSchema: z.ZodType<Prisma.tag_historyMinOrderByAggregateInput> = z.object({
  scenario_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  tag_name: z.lazy(() => SortOrderSchema).optional(),
  tag_type: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BigIntFilterSchema: z.ZodType<Prisma.BigIntFilter> = z.object({
  equals: z.bigint().optional(),
  in: z.bigint().array().optional(),
  notIn: z.bigint().array().optional(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntFilterSchema) ]).optional(),
}).strict();

export const user_paragraph_historyPidUidMoved_epoctimeCompoundUniqueInputSchema: z.ZodType<Prisma.user_paragraph_historyPidUidMoved_epoctimeCompoundUniqueInput> = z.object({
  pid: z.string(),
  uid: z.string(),
  moved_epoctime: z.bigint()
}).strict();

export const user_paragraph_historyCountOrderByAggregateInputSchema: z.ZodType<Prisma.user_paragraph_historyCountOrderByAggregateInput> = z.object({
  pid: z.lazy(() => SortOrderSchema).optional(),
  uid: z.lazy(() => SortOrderSchema).optional(),
  moved_epoctime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const user_paragraph_historyAvgOrderByAggregateInputSchema: z.ZodType<Prisma.user_paragraph_historyAvgOrderByAggregateInput> = z.object({
  moved_epoctime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const user_paragraph_historyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.user_paragraph_historyMaxOrderByAggregateInput> = z.object({
  pid: z.lazy(() => SortOrderSchema).optional(),
  uid: z.lazy(() => SortOrderSchema).optional(),
  moved_epoctime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const user_paragraph_historyMinOrderByAggregateInputSchema: z.ZodType<Prisma.user_paragraph_historyMinOrderByAggregateInput> = z.object({
  pid: z.lazy(() => SortOrderSchema).optional(),
  uid: z.lazy(() => SortOrderSchema).optional(),
  moved_epoctime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const user_paragraph_historySumOrderByAggregateInputSchema: z.ZodType<Prisma.user_paragraph_historySumOrderByAggregateInput> = z.object({
  moved_epoctime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BigIntWithAggregatesFilterSchema: z.ZodType<Prisma.BigIntWithAggregatesFilter> = z.object({
  equals: z.bigint().optional(),
  in: z.bigint().array().optional(),
  notIn: z.bigint().array().optional(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedBigIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBigIntFilterSchema).optional(),
  _max: z.lazy(() => NestedBigIntFilterSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const BigIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BigIntFieldUpdateOperationsInput> = z.object({
  set: z.bigint().optional(),
  increment: z.bigint().optional(),
  decrement: z.bigint().optional(),
  multiply: z.bigint().optional(),
  divide: z.bigint().optional()
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedJsonFilterSchema: z.ZodType<Prisma.NestedJsonFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
}).strict();

export const NestedUuidFilterSchema: z.ZodType<Prisma.NestedUuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export const NestedUuidWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedBigIntFilterSchema: z.ZodType<Prisma.NestedBigIntFilter> = z.object({
  equals: z.bigint().optional(),
  in: z.bigint().array().optional(),
  notIn: z.bigint().array().optional(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntFilterSchema) ]).optional(),
}).strict();

export const NestedBigIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBigIntWithAggregatesFilter> = z.object({
  equals: z.bigint().optional(),
  in: z.bigint().array().optional(),
  notIn: z.bigint().array().optional(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedBigIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBigIntFilterSchema).optional(),
  _max: z.lazy(() => NestedBigIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const RinneScenarioFindFirstArgsSchema: z.ZodType<Prisma.RinneScenarioFindFirstArgs> = z.object({
  select: RinneScenarioSelectSchema.optional(),
  where: RinneScenarioWhereInputSchema.optional(),
  orderBy: z.union([ RinneScenarioOrderByWithRelationInputSchema.array(),RinneScenarioOrderByWithRelationInputSchema ]).optional(),
  cursor: RinneScenarioWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RinneScenarioScalarFieldEnumSchema,RinneScenarioScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RinneScenarioFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RinneScenarioFindFirstOrThrowArgs> = z.object({
  select: RinneScenarioSelectSchema.optional(),
  where: RinneScenarioWhereInputSchema.optional(),
  orderBy: z.union([ RinneScenarioOrderByWithRelationInputSchema.array(),RinneScenarioOrderByWithRelationInputSchema ]).optional(),
  cursor: RinneScenarioWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RinneScenarioScalarFieldEnumSchema,RinneScenarioScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RinneScenarioFindManyArgsSchema: z.ZodType<Prisma.RinneScenarioFindManyArgs> = z.object({
  select: RinneScenarioSelectSchema.optional(),
  where: RinneScenarioWhereInputSchema.optional(),
  orderBy: z.union([ RinneScenarioOrderByWithRelationInputSchema.array(),RinneScenarioOrderByWithRelationInputSchema ]).optional(),
  cursor: RinneScenarioWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RinneScenarioScalarFieldEnumSchema,RinneScenarioScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RinneScenarioAggregateArgsSchema: z.ZodType<Prisma.RinneScenarioAggregateArgs> = z.object({
  where: RinneScenarioWhereInputSchema.optional(),
  orderBy: z.union([ RinneScenarioOrderByWithRelationInputSchema.array(),RinneScenarioOrderByWithRelationInputSchema ]).optional(),
  cursor: RinneScenarioWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RinneScenarioGroupByArgsSchema: z.ZodType<Prisma.RinneScenarioGroupByArgs> = z.object({
  where: RinneScenarioWhereInputSchema.optional(),
  orderBy: z.union([ RinneScenarioOrderByWithAggregationInputSchema.array(),RinneScenarioOrderByWithAggregationInputSchema ]).optional(),
  by: RinneScenarioScalarFieldEnumSchema.array(),
  having: RinneScenarioScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RinneScenarioFindUniqueArgsSchema: z.ZodType<Prisma.RinneScenarioFindUniqueArgs> = z.object({
  select: RinneScenarioSelectSchema.optional(),
  where: RinneScenarioWhereUniqueInputSchema,
}).strict() ;

export const RinneScenarioFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RinneScenarioFindUniqueOrThrowArgs> = z.object({
  select: RinneScenarioSelectSchema.optional(),
  where: RinneScenarioWhereUniqueInputSchema,
}).strict() ;

export const RinneUserFindFirstArgsSchema: z.ZodType<Prisma.RinneUserFindFirstArgs> = z.object({
  select: RinneUserSelectSchema.optional(),
  where: RinneUserWhereInputSchema.optional(),
  orderBy: z.union([ RinneUserOrderByWithRelationInputSchema.array(),RinneUserOrderByWithRelationInputSchema ]).optional(),
  cursor: RinneUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RinneUserScalarFieldEnumSchema,RinneUserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RinneUserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RinneUserFindFirstOrThrowArgs> = z.object({
  select: RinneUserSelectSchema.optional(),
  where: RinneUserWhereInputSchema.optional(),
  orderBy: z.union([ RinneUserOrderByWithRelationInputSchema.array(),RinneUserOrderByWithRelationInputSchema ]).optional(),
  cursor: RinneUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RinneUserScalarFieldEnumSchema,RinneUserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RinneUserFindManyArgsSchema: z.ZodType<Prisma.RinneUserFindManyArgs> = z.object({
  select: RinneUserSelectSchema.optional(),
  where: RinneUserWhereInputSchema.optional(),
  orderBy: z.union([ RinneUserOrderByWithRelationInputSchema.array(),RinneUserOrderByWithRelationInputSchema ]).optional(),
  cursor: RinneUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RinneUserScalarFieldEnumSchema,RinneUserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RinneUserAggregateArgsSchema: z.ZodType<Prisma.RinneUserAggregateArgs> = z.object({
  where: RinneUserWhereInputSchema.optional(),
  orderBy: z.union([ RinneUserOrderByWithRelationInputSchema.array(),RinneUserOrderByWithRelationInputSchema ]).optional(),
  cursor: RinneUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RinneUserGroupByArgsSchema: z.ZodType<Prisma.RinneUserGroupByArgs> = z.object({
  where: RinneUserWhereInputSchema.optional(),
  orderBy: z.union([ RinneUserOrderByWithAggregationInputSchema.array(),RinneUserOrderByWithAggregationInputSchema ]).optional(),
  by: RinneUserScalarFieldEnumSchema.array(),
  having: RinneUserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RinneUserFindUniqueArgsSchema: z.ZodType<Prisma.RinneUserFindUniqueArgs> = z.object({
  select: RinneUserSelectSchema.optional(),
  where: RinneUserWhereUniqueInputSchema,
}).strict() ;

export const RinneUserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RinneUserFindUniqueOrThrowArgs> = z.object({
  select: RinneUserSelectSchema.optional(),
  where: RinneUserWhereUniqueInputSchema,
}).strict() ;

export const paragraphsFindFirstArgsSchema: z.ZodType<Prisma.paragraphsFindFirstArgs> = z.object({
  select: paragraphsSelectSchema.optional(),
  where: paragraphsWhereInputSchema.optional(),
  orderBy: z.union([ paragraphsOrderByWithRelationInputSchema.array(),paragraphsOrderByWithRelationInputSchema ]).optional(),
  cursor: paragraphsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ParagraphsScalarFieldEnumSchema,ParagraphsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const paragraphsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.paragraphsFindFirstOrThrowArgs> = z.object({
  select: paragraphsSelectSchema.optional(),
  where: paragraphsWhereInputSchema.optional(),
  orderBy: z.union([ paragraphsOrderByWithRelationInputSchema.array(),paragraphsOrderByWithRelationInputSchema ]).optional(),
  cursor: paragraphsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ParagraphsScalarFieldEnumSchema,ParagraphsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const paragraphsFindManyArgsSchema: z.ZodType<Prisma.paragraphsFindManyArgs> = z.object({
  select: paragraphsSelectSchema.optional(),
  where: paragraphsWhereInputSchema.optional(),
  orderBy: z.union([ paragraphsOrderByWithRelationInputSchema.array(),paragraphsOrderByWithRelationInputSchema ]).optional(),
  cursor: paragraphsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ParagraphsScalarFieldEnumSchema,ParagraphsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const paragraphsAggregateArgsSchema: z.ZodType<Prisma.paragraphsAggregateArgs> = z.object({
  where: paragraphsWhereInputSchema.optional(),
  orderBy: z.union([ paragraphsOrderByWithRelationInputSchema.array(),paragraphsOrderByWithRelationInputSchema ]).optional(),
  cursor: paragraphsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const paragraphsGroupByArgsSchema: z.ZodType<Prisma.paragraphsGroupByArgs> = z.object({
  where: paragraphsWhereInputSchema.optional(),
  orderBy: z.union([ paragraphsOrderByWithAggregationInputSchema.array(),paragraphsOrderByWithAggregationInputSchema ]).optional(),
  by: ParagraphsScalarFieldEnumSchema.array(),
  having: paragraphsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const paragraphsFindUniqueArgsSchema: z.ZodType<Prisma.paragraphsFindUniqueArgs> = z.object({
  select: paragraphsSelectSchema.optional(),
  where: paragraphsWhereUniqueInputSchema,
}).strict() ;

export const paragraphsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.paragraphsFindUniqueOrThrowArgs> = z.object({
  select: paragraphsSelectSchema.optional(),
  where: paragraphsWhereUniqueInputSchema,
}).strict() ;

export const paragraphs_relationFindFirstArgsSchema: z.ZodType<Prisma.paragraphs_relationFindFirstArgs> = z.object({
  select: paragraphs_relationSelectSchema.optional(),
  where: paragraphs_relationWhereInputSchema.optional(),
  orderBy: z.union([ paragraphs_relationOrderByWithRelationInputSchema.array(),paragraphs_relationOrderByWithRelationInputSchema ]).optional(),
  cursor: paragraphs_relationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Paragraphs_relationScalarFieldEnumSchema,Paragraphs_relationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const paragraphs_relationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.paragraphs_relationFindFirstOrThrowArgs> = z.object({
  select: paragraphs_relationSelectSchema.optional(),
  where: paragraphs_relationWhereInputSchema.optional(),
  orderBy: z.union([ paragraphs_relationOrderByWithRelationInputSchema.array(),paragraphs_relationOrderByWithRelationInputSchema ]).optional(),
  cursor: paragraphs_relationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Paragraphs_relationScalarFieldEnumSchema,Paragraphs_relationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const paragraphs_relationFindManyArgsSchema: z.ZodType<Prisma.paragraphs_relationFindManyArgs> = z.object({
  select: paragraphs_relationSelectSchema.optional(),
  where: paragraphs_relationWhereInputSchema.optional(),
  orderBy: z.union([ paragraphs_relationOrderByWithRelationInputSchema.array(),paragraphs_relationOrderByWithRelationInputSchema ]).optional(),
  cursor: paragraphs_relationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Paragraphs_relationScalarFieldEnumSchema,Paragraphs_relationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const paragraphs_relationAggregateArgsSchema: z.ZodType<Prisma.paragraphs_relationAggregateArgs> = z.object({
  where: paragraphs_relationWhereInputSchema.optional(),
  orderBy: z.union([ paragraphs_relationOrderByWithRelationInputSchema.array(),paragraphs_relationOrderByWithRelationInputSchema ]).optional(),
  cursor: paragraphs_relationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const paragraphs_relationGroupByArgsSchema: z.ZodType<Prisma.paragraphs_relationGroupByArgs> = z.object({
  where: paragraphs_relationWhereInputSchema.optional(),
  orderBy: z.union([ paragraphs_relationOrderByWithAggregationInputSchema.array(),paragraphs_relationOrderByWithAggregationInputSchema ]).optional(),
  by: Paragraphs_relationScalarFieldEnumSchema.array(),
  having: paragraphs_relationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const paragraphs_relationFindUniqueArgsSchema: z.ZodType<Prisma.paragraphs_relationFindUniqueArgs> = z.object({
  select: paragraphs_relationSelectSchema.optional(),
  where: paragraphs_relationWhereUniqueInputSchema,
}).strict() ;

export const paragraphs_relationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.paragraphs_relationFindUniqueOrThrowArgs> = z.object({
  select: paragraphs_relationSelectSchema.optional(),
  where: paragraphs_relationWhereUniqueInputSchema,
}).strict() ;

export const scenario_listFindFirstArgsSchema: z.ZodType<Prisma.scenario_listFindFirstArgs> = z.object({
  select: scenario_listSelectSchema.optional(),
  where: scenario_listWhereInputSchema.optional(),
  orderBy: z.union([ scenario_listOrderByWithRelationInputSchema.array(),scenario_listOrderByWithRelationInputSchema ]).optional(),
  cursor: scenario_listWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Scenario_listScalarFieldEnumSchema,Scenario_listScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const scenario_listFindFirstOrThrowArgsSchema: z.ZodType<Prisma.scenario_listFindFirstOrThrowArgs> = z.object({
  select: scenario_listSelectSchema.optional(),
  where: scenario_listWhereInputSchema.optional(),
  orderBy: z.union([ scenario_listOrderByWithRelationInputSchema.array(),scenario_listOrderByWithRelationInputSchema ]).optional(),
  cursor: scenario_listWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Scenario_listScalarFieldEnumSchema,Scenario_listScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const scenario_listFindManyArgsSchema: z.ZodType<Prisma.scenario_listFindManyArgs> = z.object({
  select: scenario_listSelectSchema.optional(),
  where: scenario_listWhereInputSchema.optional(),
  orderBy: z.union([ scenario_listOrderByWithRelationInputSchema.array(),scenario_listOrderByWithRelationInputSchema ]).optional(),
  cursor: scenario_listWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Scenario_listScalarFieldEnumSchema,Scenario_listScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const scenario_listAggregateArgsSchema: z.ZodType<Prisma.scenario_listAggregateArgs> = z.object({
  where: scenario_listWhereInputSchema.optional(),
  orderBy: z.union([ scenario_listOrderByWithRelationInputSchema.array(),scenario_listOrderByWithRelationInputSchema ]).optional(),
  cursor: scenario_listWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const scenario_listGroupByArgsSchema: z.ZodType<Prisma.scenario_listGroupByArgs> = z.object({
  where: scenario_listWhereInputSchema.optional(),
  orderBy: z.union([ scenario_listOrderByWithAggregationInputSchema.array(),scenario_listOrderByWithAggregationInputSchema ]).optional(),
  by: Scenario_listScalarFieldEnumSchema.array(),
  having: scenario_listScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const scenario_listFindUniqueArgsSchema: z.ZodType<Prisma.scenario_listFindUniqueArgs> = z.object({
  select: scenario_listSelectSchema.optional(),
  where: scenario_listWhereUniqueInputSchema,
}).strict() ;

export const scenario_listFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.scenario_listFindUniqueOrThrowArgs> = z.object({
  select: scenario_listSelectSchema.optional(),
  where: scenario_listWhereUniqueInputSchema,
}).strict() ;

export const solo_journalFindFirstArgsSchema: z.ZodType<Prisma.solo_journalFindFirstArgs> = z.object({
  select: solo_journalSelectSchema.optional(),
  where: solo_journalWhereInputSchema.optional(),
  orderBy: z.union([ solo_journalOrderByWithRelationInputSchema.array(),solo_journalOrderByWithRelationInputSchema ]).optional(),
  cursor: solo_journalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Solo_journalScalarFieldEnumSchema,Solo_journalScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const solo_journalFindFirstOrThrowArgsSchema: z.ZodType<Prisma.solo_journalFindFirstOrThrowArgs> = z.object({
  select: solo_journalSelectSchema.optional(),
  where: solo_journalWhereInputSchema.optional(),
  orderBy: z.union([ solo_journalOrderByWithRelationInputSchema.array(),solo_journalOrderByWithRelationInputSchema ]).optional(),
  cursor: solo_journalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Solo_journalScalarFieldEnumSchema,Solo_journalScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const solo_journalFindManyArgsSchema: z.ZodType<Prisma.solo_journalFindManyArgs> = z.object({
  select: solo_journalSelectSchema.optional(),
  where: solo_journalWhereInputSchema.optional(),
  orderBy: z.union([ solo_journalOrderByWithRelationInputSchema.array(),solo_journalOrderByWithRelationInputSchema ]).optional(),
  cursor: solo_journalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Solo_journalScalarFieldEnumSchema,Solo_journalScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const solo_journalAggregateArgsSchema: z.ZodType<Prisma.solo_journalAggregateArgs> = z.object({
  where: solo_journalWhereInputSchema.optional(),
  orderBy: z.union([ solo_journalOrderByWithRelationInputSchema.array(),solo_journalOrderByWithRelationInputSchema ]).optional(),
  cursor: solo_journalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const solo_journalGroupByArgsSchema: z.ZodType<Prisma.solo_journalGroupByArgs> = z.object({
  where: solo_journalWhereInputSchema.optional(),
  orderBy: z.union([ solo_journalOrderByWithAggregationInputSchema.array(),solo_journalOrderByWithAggregationInputSchema ]).optional(),
  by: Solo_journalScalarFieldEnumSchema.array(),
  having: solo_journalScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const solo_journalFindUniqueArgsSchema: z.ZodType<Prisma.solo_journalFindUniqueArgs> = z.object({
  select: solo_journalSelectSchema.optional(),
  where: solo_journalWhereUniqueInputSchema,
}).strict() ;

export const solo_journalFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.solo_journalFindUniqueOrThrowArgs> = z.object({
  select: solo_journalSelectSchema.optional(),
  where: solo_journalWhereUniqueInputSchema,
}).strict() ;

export const solo_journeyFindFirstArgsSchema: z.ZodType<Prisma.solo_journeyFindFirstArgs> = z.object({
  select: solo_journeySelectSchema.optional(),
  where: solo_journeyWhereInputSchema.optional(),
  orderBy: z.union([ solo_journeyOrderByWithRelationInputSchema.array(),solo_journeyOrderByWithRelationInputSchema ]).optional(),
  cursor: solo_journeyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Solo_journeyScalarFieldEnumSchema,Solo_journeyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const solo_journeyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.solo_journeyFindFirstOrThrowArgs> = z.object({
  select: solo_journeySelectSchema.optional(),
  where: solo_journeyWhereInputSchema.optional(),
  orderBy: z.union([ solo_journeyOrderByWithRelationInputSchema.array(),solo_journeyOrderByWithRelationInputSchema ]).optional(),
  cursor: solo_journeyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Solo_journeyScalarFieldEnumSchema,Solo_journeyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const solo_journeyFindManyArgsSchema: z.ZodType<Prisma.solo_journeyFindManyArgs> = z.object({
  select: solo_journeySelectSchema.optional(),
  where: solo_journeyWhereInputSchema.optional(),
  orderBy: z.union([ solo_journeyOrderByWithRelationInputSchema.array(),solo_journeyOrderByWithRelationInputSchema ]).optional(),
  cursor: solo_journeyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Solo_journeyScalarFieldEnumSchema,Solo_journeyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const solo_journeyAggregateArgsSchema: z.ZodType<Prisma.solo_journeyAggregateArgs> = z.object({
  where: solo_journeyWhereInputSchema.optional(),
  orderBy: z.union([ solo_journeyOrderByWithRelationInputSchema.array(),solo_journeyOrderByWithRelationInputSchema ]).optional(),
  cursor: solo_journeyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const solo_journeyGroupByArgsSchema: z.ZodType<Prisma.solo_journeyGroupByArgs> = z.object({
  where: solo_journeyWhereInputSchema.optional(),
  orderBy: z.union([ solo_journeyOrderByWithAggregationInputSchema.array(),solo_journeyOrderByWithAggregationInputSchema ]).optional(),
  by: Solo_journeyScalarFieldEnumSchema.array(),
  having: solo_journeyScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const solo_journeyFindUniqueArgsSchema: z.ZodType<Prisma.solo_journeyFindUniqueArgs> = z.object({
  select: solo_journeySelectSchema.optional(),
  where: solo_journeyWhereUniqueInputSchema,
}).strict() ;

export const solo_journeyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.solo_journeyFindUniqueOrThrowArgs> = z.object({
  select: solo_journeySelectSchema.optional(),
  where: solo_journeyWhereUniqueInputSchema,
}).strict() ;

export const tag_historyFindFirstArgsSchema: z.ZodType<Prisma.tag_historyFindFirstArgs> = z.object({
  select: tag_historySelectSchema.optional(),
  where: tag_historyWhereInputSchema.optional(),
  orderBy: z.union([ tag_historyOrderByWithRelationInputSchema.array(),tag_historyOrderByWithRelationInputSchema ]).optional(),
  cursor: tag_historyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Tag_historyScalarFieldEnumSchema,Tag_historyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const tag_historyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.tag_historyFindFirstOrThrowArgs> = z.object({
  select: tag_historySelectSchema.optional(),
  where: tag_historyWhereInputSchema.optional(),
  orderBy: z.union([ tag_historyOrderByWithRelationInputSchema.array(),tag_historyOrderByWithRelationInputSchema ]).optional(),
  cursor: tag_historyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Tag_historyScalarFieldEnumSchema,Tag_historyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const tag_historyFindManyArgsSchema: z.ZodType<Prisma.tag_historyFindManyArgs> = z.object({
  select: tag_historySelectSchema.optional(),
  where: tag_historyWhereInputSchema.optional(),
  orderBy: z.union([ tag_historyOrderByWithRelationInputSchema.array(),tag_historyOrderByWithRelationInputSchema ]).optional(),
  cursor: tag_historyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Tag_historyScalarFieldEnumSchema,Tag_historyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const tag_historyAggregateArgsSchema: z.ZodType<Prisma.tag_historyAggregateArgs> = z.object({
  where: tag_historyWhereInputSchema.optional(),
  orderBy: z.union([ tag_historyOrderByWithRelationInputSchema.array(),tag_historyOrderByWithRelationInputSchema ]).optional(),
  cursor: tag_historyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const tag_historyGroupByArgsSchema: z.ZodType<Prisma.tag_historyGroupByArgs> = z.object({
  where: tag_historyWhereInputSchema.optional(),
  orderBy: z.union([ tag_historyOrderByWithAggregationInputSchema.array(),tag_historyOrderByWithAggregationInputSchema ]).optional(),
  by: Tag_historyScalarFieldEnumSchema.array(),
  having: tag_historyScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const tag_historyFindUniqueArgsSchema: z.ZodType<Prisma.tag_historyFindUniqueArgs> = z.object({
  select: tag_historySelectSchema.optional(),
  where: tag_historyWhereUniqueInputSchema,
}).strict() ;

export const tag_historyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.tag_historyFindUniqueOrThrowArgs> = z.object({
  select: tag_historySelectSchema.optional(),
  where: tag_historyWhereUniqueInputSchema,
}).strict() ;

export const user_paragraph_historyFindFirstArgsSchema: z.ZodType<Prisma.user_paragraph_historyFindFirstArgs> = z.object({
  select: user_paragraph_historySelectSchema.optional(),
  where: user_paragraph_historyWhereInputSchema.optional(),
  orderBy: z.union([ user_paragraph_historyOrderByWithRelationInputSchema.array(),user_paragraph_historyOrderByWithRelationInputSchema ]).optional(),
  cursor: user_paragraph_historyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ User_paragraph_historyScalarFieldEnumSchema,User_paragraph_historyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const user_paragraph_historyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.user_paragraph_historyFindFirstOrThrowArgs> = z.object({
  select: user_paragraph_historySelectSchema.optional(),
  where: user_paragraph_historyWhereInputSchema.optional(),
  orderBy: z.union([ user_paragraph_historyOrderByWithRelationInputSchema.array(),user_paragraph_historyOrderByWithRelationInputSchema ]).optional(),
  cursor: user_paragraph_historyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ User_paragraph_historyScalarFieldEnumSchema,User_paragraph_historyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const user_paragraph_historyFindManyArgsSchema: z.ZodType<Prisma.user_paragraph_historyFindManyArgs> = z.object({
  select: user_paragraph_historySelectSchema.optional(),
  where: user_paragraph_historyWhereInputSchema.optional(),
  orderBy: z.union([ user_paragraph_historyOrderByWithRelationInputSchema.array(),user_paragraph_historyOrderByWithRelationInputSchema ]).optional(),
  cursor: user_paragraph_historyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ User_paragraph_historyScalarFieldEnumSchema,User_paragraph_historyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const user_paragraph_historyAggregateArgsSchema: z.ZodType<Prisma.user_paragraph_historyAggregateArgs> = z.object({
  where: user_paragraph_historyWhereInputSchema.optional(),
  orderBy: z.union([ user_paragraph_historyOrderByWithRelationInputSchema.array(),user_paragraph_historyOrderByWithRelationInputSchema ]).optional(),
  cursor: user_paragraph_historyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const user_paragraph_historyGroupByArgsSchema: z.ZodType<Prisma.user_paragraph_historyGroupByArgs> = z.object({
  where: user_paragraph_historyWhereInputSchema.optional(),
  orderBy: z.union([ user_paragraph_historyOrderByWithAggregationInputSchema.array(),user_paragraph_historyOrderByWithAggregationInputSchema ]).optional(),
  by: User_paragraph_historyScalarFieldEnumSchema.array(),
  having: user_paragraph_historyScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const user_paragraph_historyFindUniqueArgsSchema: z.ZodType<Prisma.user_paragraph_historyFindUniqueArgs> = z.object({
  select: user_paragraph_historySelectSchema.optional(),
  where: user_paragraph_historyWhereUniqueInputSchema,
}).strict() ;

export const user_paragraph_historyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.user_paragraph_historyFindUniqueOrThrowArgs> = z.object({
  select: user_paragraph_historySelectSchema.optional(),
  where: user_paragraph_historyWhereUniqueInputSchema,
}).strict() ;

export const RinneScenarioCreateArgsSchema: z.ZodType<Prisma.RinneScenarioCreateArgs> = z.object({
  select: RinneScenarioSelectSchema.optional(),
  data: z.union([ RinneScenarioCreateInputSchema,RinneScenarioUncheckedCreateInputSchema ]),
}).strict() ;

export const RinneScenarioUpsertArgsSchema: z.ZodType<Prisma.RinneScenarioUpsertArgs> = z.object({
  select: RinneScenarioSelectSchema.optional(),
  where: RinneScenarioWhereUniqueInputSchema,
  create: z.union([ RinneScenarioCreateInputSchema,RinneScenarioUncheckedCreateInputSchema ]),
  update: z.union([ RinneScenarioUpdateInputSchema,RinneScenarioUncheckedUpdateInputSchema ]),
}).strict() ;

export const RinneScenarioCreateManyArgsSchema: z.ZodType<Prisma.RinneScenarioCreateManyArgs> = z.object({
  data: z.union([ RinneScenarioCreateManyInputSchema,RinneScenarioCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RinneScenarioDeleteArgsSchema: z.ZodType<Prisma.RinneScenarioDeleteArgs> = z.object({
  select: RinneScenarioSelectSchema.optional(),
  where: RinneScenarioWhereUniqueInputSchema,
}).strict() ;

export const RinneScenarioUpdateArgsSchema: z.ZodType<Prisma.RinneScenarioUpdateArgs> = z.object({
  select: RinneScenarioSelectSchema.optional(),
  data: z.union([ RinneScenarioUpdateInputSchema,RinneScenarioUncheckedUpdateInputSchema ]),
  where: RinneScenarioWhereUniqueInputSchema,
}).strict() ;

export const RinneScenarioUpdateManyArgsSchema: z.ZodType<Prisma.RinneScenarioUpdateManyArgs> = z.object({
  data: z.union([ RinneScenarioUpdateManyMutationInputSchema,RinneScenarioUncheckedUpdateManyInputSchema ]),
  where: RinneScenarioWhereInputSchema.optional(),
}).strict() ;

export const RinneScenarioDeleteManyArgsSchema: z.ZodType<Prisma.RinneScenarioDeleteManyArgs> = z.object({
  where: RinneScenarioWhereInputSchema.optional(),
}).strict() ;

export const RinneUserCreateArgsSchema: z.ZodType<Prisma.RinneUserCreateArgs> = z.object({
  select: RinneUserSelectSchema.optional(),
  data: z.union([ RinneUserCreateInputSchema,RinneUserUncheckedCreateInputSchema ]),
}).strict() ;

export const RinneUserUpsertArgsSchema: z.ZodType<Prisma.RinneUserUpsertArgs> = z.object({
  select: RinneUserSelectSchema.optional(),
  where: RinneUserWhereUniqueInputSchema,
  create: z.union([ RinneUserCreateInputSchema,RinneUserUncheckedCreateInputSchema ]),
  update: z.union([ RinneUserUpdateInputSchema,RinneUserUncheckedUpdateInputSchema ]),
}).strict() ;

export const RinneUserCreateManyArgsSchema: z.ZodType<Prisma.RinneUserCreateManyArgs> = z.object({
  data: z.union([ RinneUserCreateManyInputSchema,RinneUserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RinneUserDeleteArgsSchema: z.ZodType<Prisma.RinneUserDeleteArgs> = z.object({
  select: RinneUserSelectSchema.optional(),
  where: RinneUserWhereUniqueInputSchema,
}).strict() ;

export const RinneUserUpdateArgsSchema: z.ZodType<Prisma.RinneUserUpdateArgs> = z.object({
  select: RinneUserSelectSchema.optional(),
  data: z.union([ RinneUserUpdateInputSchema,RinneUserUncheckedUpdateInputSchema ]),
  where: RinneUserWhereUniqueInputSchema,
}).strict() ;

export const RinneUserUpdateManyArgsSchema: z.ZodType<Prisma.RinneUserUpdateManyArgs> = z.object({
  data: z.union([ RinneUserUpdateManyMutationInputSchema,RinneUserUncheckedUpdateManyInputSchema ]),
  where: RinneUserWhereInputSchema.optional(),
}).strict() ;

export const RinneUserDeleteManyArgsSchema: z.ZodType<Prisma.RinneUserDeleteManyArgs> = z.object({
  where: RinneUserWhereInputSchema.optional(),
}).strict() ;

export const paragraphsCreateArgsSchema: z.ZodType<Prisma.paragraphsCreateArgs> = z.object({
  select: paragraphsSelectSchema.optional(),
  data: z.union([ paragraphsCreateInputSchema,paragraphsUncheckedCreateInputSchema ]),
}).strict() ;

export const paragraphsUpsertArgsSchema: z.ZodType<Prisma.paragraphsUpsertArgs> = z.object({
  select: paragraphsSelectSchema.optional(),
  where: paragraphsWhereUniqueInputSchema,
  create: z.union([ paragraphsCreateInputSchema,paragraphsUncheckedCreateInputSchema ]),
  update: z.union([ paragraphsUpdateInputSchema,paragraphsUncheckedUpdateInputSchema ]),
}).strict() ;

export const paragraphsCreateManyArgsSchema: z.ZodType<Prisma.paragraphsCreateManyArgs> = z.object({
  data: z.union([ paragraphsCreateManyInputSchema,paragraphsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const paragraphsDeleteArgsSchema: z.ZodType<Prisma.paragraphsDeleteArgs> = z.object({
  select: paragraphsSelectSchema.optional(),
  where: paragraphsWhereUniqueInputSchema,
}).strict() ;

export const paragraphsUpdateArgsSchema: z.ZodType<Prisma.paragraphsUpdateArgs> = z.object({
  select: paragraphsSelectSchema.optional(),
  data: z.union([ paragraphsUpdateInputSchema,paragraphsUncheckedUpdateInputSchema ]),
  where: paragraphsWhereUniqueInputSchema,
}).strict() ;

export const paragraphsUpdateManyArgsSchema: z.ZodType<Prisma.paragraphsUpdateManyArgs> = z.object({
  data: z.union([ paragraphsUpdateManyMutationInputSchema,paragraphsUncheckedUpdateManyInputSchema ]),
  where: paragraphsWhereInputSchema.optional(),
}).strict() ;

export const paragraphsDeleteManyArgsSchema: z.ZodType<Prisma.paragraphsDeleteManyArgs> = z.object({
  where: paragraphsWhereInputSchema.optional(),
}).strict() ;

export const paragraphs_relationCreateArgsSchema: z.ZodType<Prisma.paragraphs_relationCreateArgs> = z.object({
  select: paragraphs_relationSelectSchema.optional(),
  data: z.union([ paragraphs_relationCreateInputSchema,paragraphs_relationUncheckedCreateInputSchema ]),
}).strict() ;

export const paragraphs_relationUpsertArgsSchema: z.ZodType<Prisma.paragraphs_relationUpsertArgs> = z.object({
  select: paragraphs_relationSelectSchema.optional(),
  where: paragraphs_relationWhereUniqueInputSchema,
  create: z.union([ paragraphs_relationCreateInputSchema,paragraphs_relationUncheckedCreateInputSchema ]),
  update: z.union([ paragraphs_relationUpdateInputSchema,paragraphs_relationUncheckedUpdateInputSchema ]),
}).strict() ;

export const paragraphs_relationCreateManyArgsSchema: z.ZodType<Prisma.paragraphs_relationCreateManyArgs> = z.object({
  data: z.union([ paragraphs_relationCreateManyInputSchema,paragraphs_relationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const paragraphs_relationDeleteArgsSchema: z.ZodType<Prisma.paragraphs_relationDeleteArgs> = z.object({
  select: paragraphs_relationSelectSchema.optional(),
  where: paragraphs_relationWhereUniqueInputSchema,
}).strict() ;

export const paragraphs_relationUpdateArgsSchema: z.ZodType<Prisma.paragraphs_relationUpdateArgs> = z.object({
  select: paragraphs_relationSelectSchema.optional(),
  data: z.union([ paragraphs_relationUpdateInputSchema,paragraphs_relationUncheckedUpdateInputSchema ]),
  where: paragraphs_relationWhereUniqueInputSchema,
}).strict() ;

export const paragraphs_relationUpdateManyArgsSchema: z.ZodType<Prisma.paragraphs_relationUpdateManyArgs> = z.object({
  data: z.union([ paragraphs_relationUpdateManyMutationInputSchema,paragraphs_relationUncheckedUpdateManyInputSchema ]),
  where: paragraphs_relationWhereInputSchema.optional(),
}).strict() ;

export const paragraphs_relationDeleteManyArgsSchema: z.ZodType<Prisma.paragraphs_relationDeleteManyArgs> = z.object({
  where: paragraphs_relationWhereInputSchema.optional(),
}).strict() ;

export const scenario_listCreateArgsSchema: z.ZodType<Prisma.scenario_listCreateArgs> = z.object({
  select: scenario_listSelectSchema.optional(),
  data: z.union([ scenario_listCreateInputSchema,scenario_listUncheckedCreateInputSchema ]),
}).strict() ;

export const scenario_listUpsertArgsSchema: z.ZodType<Prisma.scenario_listUpsertArgs> = z.object({
  select: scenario_listSelectSchema.optional(),
  where: scenario_listWhereUniqueInputSchema,
  create: z.union([ scenario_listCreateInputSchema,scenario_listUncheckedCreateInputSchema ]),
  update: z.union([ scenario_listUpdateInputSchema,scenario_listUncheckedUpdateInputSchema ]),
}).strict() ;

export const scenario_listCreateManyArgsSchema: z.ZodType<Prisma.scenario_listCreateManyArgs> = z.object({
  data: z.union([ scenario_listCreateManyInputSchema,scenario_listCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const scenario_listDeleteArgsSchema: z.ZodType<Prisma.scenario_listDeleteArgs> = z.object({
  select: scenario_listSelectSchema.optional(),
  where: scenario_listWhereUniqueInputSchema,
}).strict() ;

export const scenario_listUpdateArgsSchema: z.ZodType<Prisma.scenario_listUpdateArgs> = z.object({
  select: scenario_listSelectSchema.optional(),
  data: z.union([ scenario_listUpdateInputSchema,scenario_listUncheckedUpdateInputSchema ]),
  where: scenario_listWhereUniqueInputSchema,
}).strict() ;

export const scenario_listUpdateManyArgsSchema: z.ZodType<Prisma.scenario_listUpdateManyArgs> = z.object({
  data: z.union([ scenario_listUpdateManyMutationInputSchema,scenario_listUncheckedUpdateManyInputSchema ]),
  where: scenario_listWhereInputSchema.optional(),
}).strict() ;

export const scenario_listDeleteManyArgsSchema: z.ZodType<Prisma.scenario_listDeleteManyArgs> = z.object({
  where: scenario_listWhereInputSchema.optional(),
}).strict() ;

export const solo_journalCreateArgsSchema: z.ZodType<Prisma.solo_journalCreateArgs> = z.object({
  select: solo_journalSelectSchema.optional(),
  data: z.union([ solo_journalCreateInputSchema,solo_journalUncheckedCreateInputSchema ]),
}).strict() ;

export const solo_journalUpsertArgsSchema: z.ZodType<Prisma.solo_journalUpsertArgs> = z.object({
  select: solo_journalSelectSchema.optional(),
  where: solo_journalWhereUniqueInputSchema,
  create: z.union([ solo_journalCreateInputSchema,solo_journalUncheckedCreateInputSchema ]),
  update: z.union([ solo_journalUpdateInputSchema,solo_journalUncheckedUpdateInputSchema ]),
}).strict() ;

export const solo_journalCreateManyArgsSchema: z.ZodType<Prisma.solo_journalCreateManyArgs> = z.object({
  data: z.union([ solo_journalCreateManyInputSchema,solo_journalCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const solo_journalDeleteArgsSchema: z.ZodType<Prisma.solo_journalDeleteArgs> = z.object({
  select: solo_journalSelectSchema.optional(),
  where: solo_journalWhereUniqueInputSchema,
}).strict() ;

export const solo_journalUpdateArgsSchema: z.ZodType<Prisma.solo_journalUpdateArgs> = z.object({
  select: solo_journalSelectSchema.optional(),
  data: z.union([ solo_journalUpdateInputSchema,solo_journalUncheckedUpdateInputSchema ]),
  where: solo_journalWhereUniqueInputSchema,
}).strict() ;

export const solo_journalUpdateManyArgsSchema: z.ZodType<Prisma.solo_journalUpdateManyArgs> = z.object({
  data: z.union([ solo_journalUpdateManyMutationInputSchema,solo_journalUncheckedUpdateManyInputSchema ]),
  where: solo_journalWhereInputSchema.optional(),
}).strict() ;

export const solo_journalDeleteManyArgsSchema: z.ZodType<Prisma.solo_journalDeleteManyArgs> = z.object({
  where: solo_journalWhereInputSchema.optional(),
}).strict() ;

export const solo_journeyCreateArgsSchema: z.ZodType<Prisma.solo_journeyCreateArgs> = z.object({
  select: solo_journeySelectSchema.optional(),
  data: z.union([ solo_journeyCreateInputSchema,solo_journeyUncheckedCreateInputSchema ]),
}).strict() ;

export const solo_journeyUpsertArgsSchema: z.ZodType<Prisma.solo_journeyUpsertArgs> = z.object({
  select: solo_journeySelectSchema.optional(),
  where: solo_journeyWhereUniqueInputSchema,
  create: z.union([ solo_journeyCreateInputSchema,solo_journeyUncheckedCreateInputSchema ]),
  update: z.union([ solo_journeyUpdateInputSchema,solo_journeyUncheckedUpdateInputSchema ]),
}).strict() ;

export const solo_journeyCreateManyArgsSchema: z.ZodType<Prisma.solo_journeyCreateManyArgs> = z.object({
  data: z.union([ solo_journeyCreateManyInputSchema,solo_journeyCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const solo_journeyDeleteArgsSchema: z.ZodType<Prisma.solo_journeyDeleteArgs> = z.object({
  select: solo_journeySelectSchema.optional(),
  where: solo_journeyWhereUniqueInputSchema,
}).strict() ;

export const solo_journeyUpdateArgsSchema: z.ZodType<Prisma.solo_journeyUpdateArgs> = z.object({
  select: solo_journeySelectSchema.optional(),
  data: z.union([ solo_journeyUpdateInputSchema,solo_journeyUncheckedUpdateInputSchema ]),
  where: solo_journeyWhereUniqueInputSchema,
}).strict() ;

export const solo_journeyUpdateManyArgsSchema: z.ZodType<Prisma.solo_journeyUpdateManyArgs> = z.object({
  data: z.union([ solo_journeyUpdateManyMutationInputSchema,solo_journeyUncheckedUpdateManyInputSchema ]),
  where: solo_journeyWhereInputSchema.optional(),
}).strict() ;

export const solo_journeyDeleteManyArgsSchema: z.ZodType<Prisma.solo_journeyDeleteManyArgs> = z.object({
  where: solo_journeyWhereInputSchema.optional(),
}).strict() ;

export const tag_historyCreateArgsSchema: z.ZodType<Prisma.tag_historyCreateArgs> = z.object({
  select: tag_historySelectSchema.optional(),
  data: z.union([ tag_historyCreateInputSchema,tag_historyUncheckedCreateInputSchema ]),
}).strict() ;

export const tag_historyUpsertArgsSchema: z.ZodType<Prisma.tag_historyUpsertArgs> = z.object({
  select: tag_historySelectSchema.optional(),
  where: tag_historyWhereUniqueInputSchema,
  create: z.union([ tag_historyCreateInputSchema,tag_historyUncheckedCreateInputSchema ]),
  update: z.union([ tag_historyUpdateInputSchema,tag_historyUncheckedUpdateInputSchema ]),
}).strict() ;

export const tag_historyCreateManyArgsSchema: z.ZodType<Prisma.tag_historyCreateManyArgs> = z.object({
  data: z.union([ tag_historyCreateManyInputSchema,tag_historyCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const tag_historyDeleteArgsSchema: z.ZodType<Prisma.tag_historyDeleteArgs> = z.object({
  select: tag_historySelectSchema.optional(),
  where: tag_historyWhereUniqueInputSchema,
}).strict() ;

export const tag_historyUpdateArgsSchema: z.ZodType<Prisma.tag_historyUpdateArgs> = z.object({
  select: tag_historySelectSchema.optional(),
  data: z.union([ tag_historyUpdateInputSchema,tag_historyUncheckedUpdateInputSchema ]),
  where: tag_historyWhereUniqueInputSchema,
}).strict() ;

export const tag_historyUpdateManyArgsSchema: z.ZodType<Prisma.tag_historyUpdateManyArgs> = z.object({
  data: z.union([ tag_historyUpdateManyMutationInputSchema,tag_historyUncheckedUpdateManyInputSchema ]),
  where: tag_historyWhereInputSchema.optional(),
}).strict() ;

export const tag_historyDeleteManyArgsSchema: z.ZodType<Prisma.tag_historyDeleteManyArgs> = z.object({
  where: tag_historyWhereInputSchema.optional(),
}).strict() ;

export const user_paragraph_historyCreateArgsSchema: z.ZodType<Prisma.user_paragraph_historyCreateArgs> = z.object({
  select: user_paragraph_historySelectSchema.optional(),
  data: z.union([ user_paragraph_historyCreateInputSchema,user_paragraph_historyUncheckedCreateInputSchema ]),
}).strict() ;

export const user_paragraph_historyUpsertArgsSchema: z.ZodType<Prisma.user_paragraph_historyUpsertArgs> = z.object({
  select: user_paragraph_historySelectSchema.optional(),
  where: user_paragraph_historyWhereUniqueInputSchema,
  create: z.union([ user_paragraph_historyCreateInputSchema,user_paragraph_historyUncheckedCreateInputSchema ]),
  update: z.union([ user_paragraph_historyUpdateInputSchema,user_paragraph_historyUncheckedUpdateInputSchema ]),
}).strict() ;

export const user_paragraph_historyCreateManyArgsSchema: z.ZodType<Prisma.user_paragraph_historyCreateManyArgs> = z.object({
  data: z.union([ user_paragraph_historyCreateManyInputSchema,user_paragraph_historyCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const user_paragraph_historyDeleteArgsSchema: z.ZodType<Prisma.user_paragraph_historyDeleteArgs> = z.object({
  select: user_paragraph_historySelectSchema.optional(),
  where: user_paragraph_historyWhereUniqueInputSchema,
}).strict() ;

export const user_paragraph_historyUpdateArgsSchema: z.ZodType<Prisma.user_paragraph_historyUpdateArgs> = z.object({
  select: user_paragraph_historySelectSchema.optional(),
  data: z.union([ user_paragraph_historyUpdateInputSchema,user_paragraph_historyUncheckedUpdateInputSchema ]),
  where: user_paragraph_historyWhereUniqueInputSchema,
}).strict() ;

export const user_paragraph_historyUpdateManyArgsSchema: z.ZodType<Prisma.user_paragraph_historyUpdateManyArgs> = z.object({
  data: z.union([ user_paragraph_historyUpdateManyMutationInputSchema,user_paragraph_historyUncheckedUpdateManyInputSchema ]),
  where: user_paragraph_historyWhereInputSchema.optional(),
}).strict() ;

export const user_paragraph_historyDeleteManyArgsSchema: z.ZodType<Prisma.user_paragraph_historyDeleteManyArgs> = z.object({
  where: user_paragraph_historyWhereInputSchema.optional(),
}).strict() ;