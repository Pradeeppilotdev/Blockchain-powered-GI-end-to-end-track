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
          <h1 className="text-xl font-bold">Product Traceability</h1>
          <div className="w-10"></div>
        </div>
      </header>
      <main className="container py-8 md:py-16">
        <Card className="max-w-4xl mx-auto overflow-hidden bg-card/90">
          <div className="grid md:grid-cols-2">
            <div className="relative h-80 md:h-auto">
              <Image
                src={produce.imageUrl}
                alt={produce.name}
                fill
                className="object-cover"
                data-ai-hint="turmeric spices"
              />
            </div>
            <div className="p-8">
              <Badge variant="secondary" className="mb-4 text-sm py-1 px-3">
                Batch ID: {produce.id}
              </Badge>
              <h2 className="text-4xl font-bold">{produce.name}</h2>
              <p className="text-muted-foreground mt-2 text-lg">Harvested on {produce.harvestDate}</p>

              <div className="mt-8">
                <h3 className="font-semibold text-xl mb-3">Quality Metrics</h3>
                <ul className="space-y-2 text-base text-muted-foreground list-disc list-inside">
                  {produce.qualityMetrics.map((metric, index) => (
                    <li key={index}>{metric}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <CardContent className="p-6 md:p-8 border-t">
            <CardHeader className="px-0 pt-0 mb-4">
              <CardTitle className="text-2xl">Supply Chain Journey</CardTitle>
              <CardDescription className="text-base">
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
