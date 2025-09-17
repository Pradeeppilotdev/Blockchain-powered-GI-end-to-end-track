'use server';

/**
 * @fileOverview Harvest data format validation flow.
 *
 * This file defines a Genkit flow to validate the format of harvest data
 * entered by farmers, ensuring data quality by flagging inconsistencies using an LLM.
 *
 * @fileOverview This module exports:
 * - `validateHarvestData`: Asynchronous function to validate harvest data.
 * - `ValidateHarvestDataInput`: Interface for the input data.
 * - `ValidateHarvestDataOutput`: Interface for the output data.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Input schema for harvest data validation.
 */
const ValidateHarvestDataInputSchema = z.object({
  cropName: z.string().describe('Name of the crop.'),
  harvestDate: z.string().describe('Harvest date in ISO format (YYYY-MM-DD).'),
  qualityMetrics: z
    .string()
    .describe(
      'Quality metrics of the crop, such as weight, size, and color, separated by commas.'
    ),
});
export type ValidateHarvestDataInput = z.infer<typeof ValidateHarvestDataInputSchema>;

/**
 * Output schema for harvest data validation.
 */
const ValidateHarvestDataOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the harvest data is valid or not.'),
  validationErrors: z
    .array(z.string())
    .describe('List of validation errors, if any.'),
});
export type ValidateHarvestDataOutput = z.infer<typeof ValidateHarvestDataOutputSchema>;

/**
 * Validates the format of harvest data using a Genkit flow.
 * @param input - The harvest data to validate.
 * @returns A promise that resolves to the validation result.
 */
export async function validateHarvestData(
  input: ValidateHarvestDataInput
): Promise<ValidateHarvestDataOutput> {
  return validateHarvestDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'validateHarvestDataPrompt',
  input: {schema: ValidateHarvestDataInputSchema},
  output: {schema: ValidateHarvestDataOutputSchema},
  prompt: `You are an expert data validator for agricultural harvest data.
  You will receive crop name, harvest date, and quality metrics.
  Your task is to validate the format of the data and identify any inconsistencies.

  Crop Name: {{{cropName}}}
  Harvest Date: {{{harvestDate}}}
  Quality Metrics: {{{qualityMetrics}}}

  Respond with a JSON object indicating whether the data is valid and a list of validation errors, if any.  The validationErrors field should be an empty array if isValid is true.
  The date must be in ISO format (YYYY-MM-DD).
  Each quality metric must be present.
  `,
});

const validateHarvestDataFlow = ai.defineFlow(
  {
    name: 'validateHarvestDataFlow',
    inputSchema: ValidateHarvestDataInputSchema,
    outputSchema: ValidateHarvestDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
