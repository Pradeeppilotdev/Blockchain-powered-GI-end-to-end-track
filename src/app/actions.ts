'use server';

import { z } from 'zod';
import { validateHarvestData } from '@/ai/flows/data-format-validation';

const FormSchema = z.object({
  cropName: z.string().min(2, 'Crop name must be at least 2 characters.'),
  harvestDate: z.date({
    required_error: 'A harvest date is required.',
  }),
  qualityMetrics: z.string().min(5, 'Please provide quality metrics.'),
});

export type FormState = {
  success: boolean;
  message: string;
  produceId?: string;
  errors?: string[];
};

export async function submitHarvestData(prevState: FormState, formData: FormData): Promise<FormState> {
  const rawFormData = Object.fromEntries(formData.entries());

  const parsedData = FormSchema.safeParse({
    cropName: rawFormData.cropName,
    harvestDate: new Date(rawFormData.harvestDate as string),
    qualityMetrics: rawFormData.qualityMetrics,
  });

  if (!parsedData.success) {
    return {
      success: false,
      message: 'Invalid data provided.',
      errors: parsedData.error.flatten().fieldErrors.cropName,
    };
  }

  const { cropName, harvestDate, qualityMetrics } = parsedData.data;

  try {
    const validationInput = {
      cropName,
      harvestDate: harvestDate.toISOString().split('T')[0],
      qualityMetrics,
    };

    const validationResult = await validateHarvestData(validationInput);

    if (!validationResult.isValid) {
      return {
        success: false,
        message: 'Data validation failed. Please check the format of your input.',
        errors: validationResult.validationErrors,
      };
    }

    // In a real app, you would now:
    // 1. Create a transaction on the blockchain with the validated data.
    // 2. The transaction hash or a new produce ID would be returned.
    // 3. This ID would be used to generate the QR code.
    const mockProduceId = `prod-${Date.now()}`;

    return {
      success: true,
      message: 'Harvest data submitted and validated successfully!',
      produceId: mockProduceId,
    };
  } catch (error) {
    console.error('Error during harvest data submission:', error);
    return {
      success: false,
      message: 'An unexpected error occurred on the server. Please try again later.',
    };
  }
}
