'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScanLine, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface DistributorRetailerDashboardProps {
  role: 'Distributor' | 'Retailer';
}

export default function DistributorRetailerDashboard({ role }: DistributorRetailerDashboardProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning time
    setTimeout(() => {
      // In a real app, the QR scanner would provide the produce ID.
      setIsScanning(false);
      setIsDialogOpen(true);
    }, 1500);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    // BLOCKCHAIN INTEGRATION POINT (2)
    // After scanning, the stakeholder (Distributor/Retailer) adds a new
    // transaction to the produce's history on the blockchain.
    //
    // Example:
    // const { transactionHash } = await mySmartContract.methods.addHistoryEvent(
    //   produceIdFromQr, // The ID scanned from the QR code
    //   role, // 'Distributor' or 'Retailer'
    //   newLocation,
    //   newStatus,
    //   new Date().getTime(),
    //   price,
    // ).send({ from: stakeholderAddress });
    //
    // This action is immutable and transparent to all parties.
    setTimeout(() => {
      setIsSubmitting(false);
      setIsDialogOpen(false);
      toast({
        title: 'Transaction Logged',
        description: `The ${role.toLowerCase()} step has been successfully recorded on the blockchain.`,
      });
    }, 2000);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">
        {role} Hub
      </h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Scan a product's QR code to update its status in the supply chain. This creates a new, immutable record.
      </p>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button size="lg" onClick={handleScan} disabled={isScanning} className="h-14 text-lg">
            {isScanning ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <ScanLine className="mr-2 h-5 w-5" />
            )}
            {isScanning ? 'Scanning...' : `Scan Product as ${role}`}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Log New Supply Chain Event</DialogTitle>
            <DialogDescription>
              This action will be permanently recorded on the blockchain. Ensure all details are correct before submitting.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-base">Current Location</Label>
              <Input id="location" placeholder="e.g., Central Warehouse, Anytown" className="h-11 text-base"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status" className="text-base">
                Status Update
              </Label>
              <Input id="status" placeholder={role === 'Distributor' ? 'e.g., In Transit' : 'e.g., On Display'} className="h-11 text-base"/>
            </div>
             <div className="space-y-2">
              <Label htmlFor="price" className="text-base">Transaction Price (INR)</Label>
              <Input id="price" type="number" placeholder="e.g., 200.00" className="h-11 text-base"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timestamp" className="text-base">Timestamp</Label>
              <Input id="timestamp" value={new Date().toLocaleString()} readOnly disabled className="h-11 text-base"/>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit to Blockchain
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
