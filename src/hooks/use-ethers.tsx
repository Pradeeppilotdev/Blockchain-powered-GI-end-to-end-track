'use client';

import { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitHarvestData, type FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Loader2, PartyPopper, Bot } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import QrCodeDisplay from './qr-code-display';
import { Card } from '../ui/card';

const formSchema = z.object({
  cropName: z.string().min(2, 'Please select a crop.'),
  harvestDate: z.date({
    required_error: 'A harvest date is required.',
  }),
  qualityMetrics: z
    .string()
    .min(
      5,
      'Please provide quality metrics (e.g., Curcumin content, Weight, Grade).'
    ),
});

const initialState: FormState = {
  success: false,
  message: '',
};

const cropOptions = [
  'Kandhamal Haladi',
  'Rice',
  'Pulses',
  'Oil Seeds',
  'Jute',
  'Coconut',
  'Tea',
  'Cotton',
  'Groundnut',
  'Rubber',
  'Turmeric (Other)',
];

export default function FarmerDashboard() {
  const [state, formAction] = useActionState(submitHarvestData, initialState);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cropName: '',
      qualityMetrics: '',
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: 'Success!',
          description: state.message,
        });
        form.reset();
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: state.message,
        });
      }
    }
  }, [state, toast, form]);

  const handleReset = () => {
    form.reset();
    window.location.reload();
  };

  if (state.success && state.produceId) {
    return (
      <div className="text-center flex flex-col items-center gap-6">
        <div className="p-4 bg-primary/10 rounded-full">
          <PartyPopper className="w-16 h-16 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Product Authenticated!</h2>
        <p className="text-muted-foreground max-w-md">
          Your product is now registered on the blockchain. Attach this unique
          QR code to the batch for complete traceability.
        </p>
        <Card className="p-4 bg-background">
          <QrCodeDisplay produceId={state.produceId} />
        </Card>
        <Button onClick={handleReset}>Register Another Batch</Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">
        Producer: Register New Product
      </h2>
      <Form {...form}>
        <form
          action={formAction}
          className="space-y-8"
        >
          {state.errors && state.errors.length > 0 && (
            <Alert variant="destructive">
              <AlertTitle>Validation Error</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-5">
                  {state.errors.map((error, i) => (
                    <li key={i}>{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          <FormField
            control={form.control}
            name="cropName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">GI Product Name</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-14 text-lg">
                      <SelectValue placeholder="Select a GI product to register" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cropOptions.map((crop) => (
                      <SelectItem key={crop} value={crop} className="text-lg">
                        {crop}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="harvestDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-lg">Harvest/Production Date</FormLabel>
                <input
                  type="hidden"
                  name="harvestDate"
                  value={field.value?.toISOString().split('T')[0] ?? ''}
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal h-14 text-lg',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="qualityMetrics"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">
                  Quality & Certification Details
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., GI-Tagged, Curcumin: 5.2%, Grade: A, Organic Certified"
                    {...field}
                    className="text-lg min-h-32"
                  />
                </FormControl>
                <FormDescription className="flex items-center gap-2 pt-2">
                  <Bot className="w-4 h-4" />
                  This data will be validated and permanently stored on the
                  blockchain.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="lg"
            className="w-full text-lg h-14"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Authenticate and Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}