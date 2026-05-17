'use server';
/**
 * @fileOverview A Genkit flow for refining draft goals into SMART-compliant, performance-oriented descriptions using AI.
 *
 * - refineGoalWithAI - A function that handles the goal refinement process.
 * - RefineGoalInput - The input type for the refineGoalWithAI function.
 * - RefineGoalOutput - The return type for the refineGoalWithAI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RefineGoalInputSchema = z.object({
  thrustArea: z.string().describe('The primary focus area of the goal.').optional(),
  title: z.string().describe('A concise title for the goal.'),
  description: z.string().describe('A detailed description of the goal.'),
  unitOfMeasurement: z
    .string()
    .describe('The metric or unit used to measure progress towards the goal (e.g., %, USD, units, tasks).')
    .optional(),
  targetValue: z.union([z.string(), z.number()]).optional().describe('The specific numerical or categorical target to achieve.'),
  weightage: z.number().int().min(10).max(100).describe('The importance or weight of this goal, in percentage.'),
});
export type RefineGoalInput = z.infer<typeof RefineGoalInputSchema>;

const RefineGoalOutputSchema = z.object({
  thrustArea: z.string().describe('The refined primary focus area of the goal.'),
  title: z.string().describe('The refined, SMART-compliant, and performance-oriented title for the goal.'),
  description: z.string().describe('The refined, detailed, SMART-compliant, and performance-oriented description of the goal.'),
  unitOfMeasurement: z
    .string()
    .describe('The clarified metric or unit used to measure progress towards the goal, ensuring it is specific and measurable.')
    .optional(),
  targetValue: z.union([z.string(), z.number()]).optional().describe('The specific numerical or categorical target to achieve, ensuring it is attainable and relevant.'),
  weightage: z.number().int().min(10).max(100).describe('The assigned weightage of this goal, in percentage.'),
});
export type RefineGoalOutput = z.infer<typeof RefineGoalOutputSchema>;

const refineGoalPrompt = ai.definePrompt({
  name: 'refineGoalPrompt',
  input: {schema: RefineGoalInputSchema},
  output: {schema: RefineGoalOutputSchema},
  prompt: `You are an expert performance coach specializing in crafting SMART goals.
Your task is to take a draft goal provided by an employee and refine it into a Specific, Measurable, Achievable, Relevant, and Time-bound (SMART) format.
Focus on making the goal clear, quantifiable, and action-oriented, suitable for enterprise performance tracking.
If a field is missing or vague, use your expertise to suggest a suitable, professional value. If a targetValue is provided without a unitOfMeasurement, suggest a suitable unit.

Draft Goal:
Thrust Area: {{{thrustArea}}}
Title: {{{title}}}
Description: {{{description}}}
Unit of Measurement: {{{unitOfMeasurement}}}
Target Value: {{{targetValue}}}
Weightage: {{{weightage}}}%

Refine the above goal to be SMART-compliant, and return it in the specified JSON format.`,
});

const refineGoalFlow = ai.defineFlow(
  {
    name: 'refineGoalFlow',
    inputSchema: RefineGoalInputSchema,
    outputSchema: RefineGoalOutputSchema,
  },
  async input => {
    const {output} = await refineGoalPrompt(input);
    return output!;
  }
);

export async function refineGoalWithAI(input: RefineGoalInput): Promise<RefineGoalOutput> {
  return refineGoalFlow(input);
}
