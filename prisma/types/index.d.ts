import { z } from 'zod';
import { scenario_listSchema } from '../generated/zod';
export type ScenarioListItem = z.infer<typeof scenario_listSchema>;
