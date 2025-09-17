'use server';

import { z } from 'zod';
import { validateHarvestData } from '@/ai/flows/data-format-validation';

const FormSchema = z.object({
  cropName: z.string().min(2, 'Crop name must be at least 2 characters.'),
  harvestDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'A harvest date is required.',
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
    harvestDate: rawFormData.harvestDate,
    qualityMetrics: rawFormData.qualityMetrics,
  });
  
  if (!parsedData.success) {
    return {
      success: false,
      message: 'Invalid data provided.',
      errors: parsedData.error.flatten().formErrors,
    };
  }

  const { cropName, harvestDate, qualityMetrics } = parsedData.data;

  try {
    const validationInput = {
      cropName,
      harvestDate: new Date(harvestDate).toISOString().split('T')[0],
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

    // BLOCKCHAIN INTEGRATION POINT (1)
    // In a real application, this is where you would call a smart contract
    // to create a new digital asset (a "token") for the produce batch.
    //
    // Example:
    // const { transactionHash, produceId } = await mySmartContract.methods.createProduce(
    //   cropName,
    //   new Date(harvestDate).getTime(),
    //   qualityMetrics
    // ).send({ from: farmerAddress });
    //
    // The `produceId` would be a unique identifier returned by the smart contract.
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
