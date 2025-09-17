'use client';

import { useState } from 'react';
import { Leaf } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FarmerDashboard from '@/components/trace-harvest/farmer-dashboard';
import DistributorRetailerDashboard from '@/components/trace-harvest/distributor-retailer-dashboard';
import ConsumerDashboard from '@/components/trace-harvest/consumer-dashboard';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

type Role = 'farmer' | 'distributor' | 'retailer' | 'consumer';

export default function Home() {
  const [role, setRole] = useState<Role>('farmer');

  const roleDescriptions: Record<Role, string> = {
    farmer: 'Enter new harvest data and generate tracking QR codes.',
    distributor: 'Scan produce to log transportation and processing steps.',
    retailer: 'Scan incoming produce to log it into your retail inventory.',
    consumer: 'Scan a product QR code to view its full journey from farm to shelf.',
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex items-center">
            <Leaf className="h-6 w-6 mr-2 text-accent" />
            <span className="font-bold text-lg font-headline">TraceHarvest</span>
          </div>
        </div>
      </header>
      <main className="container py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight font-headline">
            Supply Chain Transparency, Powered by Blockchain
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Follow produce from the farm to your table with immutable, verifiable records.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Select Your Role</CardTitle>
            <CardDescription>{roleDescriptions[role]}</CardDescription>
          </CardHeader>
          <Tabs
            defaultValue="farmer"
            className="w-full"
            onValueChange={(value) => setRole(value as Role)}
          >
            <div className="flex justify-center border-t border-b">
              <TabsList className="rounded-none bg-transparent p-0 h-14">
                <TabsTrigger value="farmer" className="h-full rounded-none text-base">
                  Farmer
                </TabsTrigger>
                <TabsTrigger value="distributor" className="h-full rounded-none text-base">
                  Distributor
                </TabsTrigger>
                <TabsTrigger value="retailer" className="h-full rounded-none text-base">
                  Retailer
                </TabsTrigger>
                <TabsTrigger value="consumer" className="h-full rounded-none text-base">
                  Consumer
                </TabsTrigger>
              </TabsList>
            </div>
            <div className="p-6 md:p-8">
              <TabsContent value="farmer">
                <FarmerDashboard />
              </TabsContent>
              <TabsContent value="distributor">
                <DistributorRetailerDashboard role="Distributor" />
              </TabsContent>
              <TabsContent value="retailer">
                <DistributorRetailerDashboard role="Retailer" />
              </TabsContent>
              <TabsContent value="consumer">
                <ConsumerDashboard />
              </TabsContent>
            </div>
          </Tabs>
        </Card>
      </main>
    </>
  );
}
