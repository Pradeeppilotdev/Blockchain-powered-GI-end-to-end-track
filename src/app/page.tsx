'use client';

import { useState } from 'react';
import { Leaf } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FarmerDashboard from '@/components/trace-harvest/farmer-dashboard';
import DistributorRetailerDashboard from '@/components/trace-harvest/distributor-retailer-dashboard';
import ConsumerDashboard from '@/components/trace-harvest/consumer-dashboard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

type Role = 'farmer' | 'distributor' | 'retailer' | 'consumer';

export default function Home() {
  const [role, setRole] = useState<Role>('farmer');

  const roleDescriptions: Record<Role, string> = {
    farmer: 'Log your harvest and generate QR codes for tracking.',
    distributor: 'Scan produce to log transportation and processing steps.',
    retailer: 'Scan incoming produce to log it into your retail inventory.',
    consumer: 'Scan a product QR code to view its full journey from the farms of Odisha.',
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex items-center">
            <Leaf className="h-6 w-6 mr-2 text-primary" />
            <span className="font-bold text-lg">TraceHarvest</span>
          </div>
        </div>
      </header>
      <main className="container py-8 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Odisha Agricultural Supply Chain
          </h1>
          <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
            A transparent and fair digital ledger for tracking produce from the farm to your table, ensuring authenticity and fair pricing for a variety of crops.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto bg-card/90">
          <CardHeader className="text-center border-b pb-4">
            <CardTitle className="text-2xl">Select Your Role</CardTitle>
            <CardDescription className="text-base">{roleDescriptions[role]}</CardDescription>
          </CardHeader>
          <Tabs
            defaultValue="farmer"
            className="w-full"
            onValueChange={(value) => setRole(value as Role)}
          >
            <div className="flex justify-center p-2">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto md:h-12 rounded-lg">
                <TabsTrigger value="farmer" className="h-10 md:h-full text-base">
                  Farmer
                </TabsTrigger>
                <TabsTrigger value="distributor" className="h-10 md:h-full text-base">
                  Distributor
                </TabsTrigger>
                <TabsTrigger value="retailer" className="h-10 md:h-full text-base">
                  Retailer
                </TabsTrigger>
                <TabsTrigger value="consumer" className="h-10 md:h-full text-base">
                  Consumer
                </TabsTrigger>
              </TabsList>
            </div>
            <CardContent className="p-6 md:p-8">
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
            </CardContent>
          </Tabs>
        </Card>
      </main>
    </>
  );
}
