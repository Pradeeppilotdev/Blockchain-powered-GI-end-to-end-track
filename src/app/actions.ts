'use server';

import { z } from 'zod';
import { validateHarvestData } from '@/ai/flows/data-format-validation';

const FormSchema = z.object({
  cropName: z.string().min(2, 'Crop name must be at least 2 characters.'),
  harvestDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'A harvest date is required.',
  }),
  qualityMetrics: z.string().min(5, 'Please provide quality metrics.'),
  price: z.coerce.number().min(0, 'Price must be a positive number.'),
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
    price: rawFormData.price,
  });
  
  if (!parsedData.success) {
    return {
      success: false,
      message: 'Invalid data provided.',
      errors: parsedData.error.flatten().formErrors,
    };
  }

  const { cropName, harvestDate, qualityMetrics, price } = parsedData.data;

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
    // This is where you would call your smart contract to create a new digital asset.
    // The `ethers` library and the connected signer would be used here.
    //
    // Example (to be implemented on the client-side after wallet connection):
    // const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    // const transaction = await contract.createProduce(
    //   cropName,
    //   new Date(harvestDate).getTime(),
    //   qualityMetrics,
    //   price
    // );
    // await transaction.wait();
    // const produceId = await contract.getProduceIdFromTransaction(transaction.hash);
    
    // For now, we will continue to use a mock ID.
    // In a real implementation, you would get this ID from the contract event/transaction.
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
