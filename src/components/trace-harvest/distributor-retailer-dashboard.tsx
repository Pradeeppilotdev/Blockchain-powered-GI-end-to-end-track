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
      setIsScanning(false);
      setIsDialogOpen(true);
    }, 1500);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate blockchain transaction
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
        {role} Dashboard
      </h2>
      <p className="text-muted-foreground mb-6">
        Scan a product's QR code to update its status in the supply chain.
      </p>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button size="lg" onClick={handleScan} disabled={isScanning}>
            {isScanning ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <ScanLine className="mr-2 h-4 w-4" />
            )}
            {isScanning ? 'Scanning...' : 'Scan Product QR Code'}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log New Supply Chain Event</DialogTitle>
            <DialogDescription>
              This action will be permanently recorded on the blockchain.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="location">Current Location</Label>
              <Input id="location" placeholder="e.g., Central Warehouse, Anytown" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">
                Status Update
              </Label>
              <Input id="status" placeholder={role === 'Distributor' ? 'e.g., In Transit' : 'e.g., On Display'} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timestamp">Timestamp</Label>
              <Input id="timestamp" value={new Date().toLocaleString()} readOnly disabled />
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
