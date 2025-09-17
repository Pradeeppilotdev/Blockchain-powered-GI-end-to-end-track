'use client';

import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitHarvestData, type FormState } from '@/app/actions';
import { useEffect } from 'react';
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Loader2, PartyPopper } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import QrCodeDisplay from './qr-code-display';
import { Card } from '../ui/card';

const formSchema = z.object({
  cropName: z.string().min(2, 'Crop name must be at least 2 characters.'),
  harvestDate: z.date({
    required_error: 'A harvest date is required.',
  }),
  qualityMetrics: z.string().min(5, 'Please provide quality metrics (e.g., weight, size, color).'),
});

const initialState: FormState = {
  success: false,
  message: '',
};

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

  if (state.success && state.produceId) {
    return (
      <div className="text-center flex flex-col items-center gap-6">
        <PartyPopper className="w-16 h-16 text-green-500" />
        <h2 className="text-2xl font-bold">Harvest Logged Successfully!</h2>
        <p className="text-muted-foreground">
          The following QR code is now active on the blockchain.
          <br />
          Attach it to your produce batch for tracking.
        </p>
        <Card className="p-4">
          <QrCodeDisplay produceId={state.produceId} />
        </Card>
        <Button onClick={() => (state.success = false)}>Log Another Batch</Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Log New Harvest</h2>
      <Form {...form}>
        <form
          action={formAction}
          onSubmit={form.handleSubmit(() =>
            formAction(new FormData(form.control._formValues.current))
          )}
          className="space-y-6"
        >
          {state.errors && state.errors.length > 0 && (
            <Alert variant="destructive">
              <AlertTitle>Validation Error</AlertTitle>
              <AlertDescription>
                <ul>
                  {state.errors.map((error, i) => (
                    <li key={i}>- {error}</li>
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
                <FormLabel>Crop Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Organic Honeycrisp Apples" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="harvestDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Harvest Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
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
                <FormLabel>Quality Metrics</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the quality, e.g., Weight: 15kg, Size: Medium, Color: Deep Red"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This data will be validated for correct formatting by our AI.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Validate and Submit to Blockchain
          </Button>
        </form>
      </Form>
    </div>
  );
}
