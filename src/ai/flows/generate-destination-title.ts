// This file is machine-generated - edit with care!

'use server';

/**
 * @fileOverview Generates a catchy title for a travel destination.
 *
 * - generateDestinationTitle - A function that generates a destination title.
 * - GenerateDestinationTitleInput - The input type for the generateDestinationTitle function.
 * - GenerateDestinationTitleOutput - The return type for the generateDestinationTitle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDestinationTitleInputSchema = z.object({
  locationName: z.string().describe('The name of the location.'),
  description: z.string().describe('A brief description of the travel destination.'),
});
export type GenerateDestinationTitleInput = z.infer<
  typeof GenerateDestinationTitleInputSchema
>;

const GenerateDestinationTitleOutputSchema = z.object({
  title: z.string().describe('A catchy title for the travel destination.'),
});
export type GenerateDestinationTitleOutput = z.infer<
  typeof GenerateDestinationTitleOutputSchema
>;

export async function generateDestinationTitle(
  input: GenerateDestinationTitleInput
): Promise<GenerateDestinationTitleOutput> {
  return generateDestinationTitleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDestinationTitlePrompt',
  input: {schema: GenerateDestinationTitleInputSchema},
  output: {schema: GenerateDestinationTitleOutputSchema},
  prompt: `You are a creative travel blogger. Generate a catchy title for the travel destination based on the location name and description.

Location Name: {{{locationName}}}
Description: {{{description}}}

Catchy Title:`,
});

const generateDestinationTitleFlow = ai.defineFlow(
  {
    name: 'generateDestinationTitleFlow',
    inputSchema: GenerateDestinationTitleInputSchema,
    outputSchema: GenerateDestinationTitleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
