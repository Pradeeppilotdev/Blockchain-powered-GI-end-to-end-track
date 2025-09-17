import { mockProduce, mockTraceData } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import TraceTimeline from '@/components/trace-harvest/trace-timeline';
import { Badge } from '@/components/ui/badge';

export default function TracePage({ params }: { params: { id: string } }) {
  // In a real app, params.id would be used to fetch data from the blockchain.
  const produce = mockProduce;
  const traceEvents = mockTraceData;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" passHref>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to Home</span>
            </Button>
          </Link>
          <h1 className="text-xl font-bold font-headline">Product Traceability</h1>
          <div className="w-8"></div>
        </div>
      </header>
      <main className="container py-8">
        <Card className="max-w-3xl mx-auto overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="relative h-64 md:h-auto">
              <Image
                src={produce.imageUrl}
                alt={produce.name}
                fill
                className="object-cover"
                data-ai-hint="fresh produce"
              />
            </div>
            <div className="p-6">
              <Badge variant="secondary" className="mb-2">
                Batch ID: {produce.id}
              </Badge>
              <h2 className="text-3xl font-bold font-headline">{produce.name}</h2>
              <p className="text-muted-foreground mt-1">Harvested on {produce.harvestDate}</p>

              <div className="mt-6">
                <h3 className="font-semibold mb-2">Quality Metrics</h3>
                <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                  {produce.qualityMetrics.map((metric, index) => (
                    <li key={index}>{metric}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle>Supply Chain Journey</CardTitle>
              <CardDescription>
                This entire history is securely logged on the blockchain for complete transparency.
              </CardDescription>
            </CardHeader>
            <TraceTimeline events={traceEvents} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
