"use client";
import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
  return (
    <header className="bg-white">
        <div className="container mx-auto px-4 py-4">
  
    <nav className="flex justify-between items-center mb-16">
      <h1 className="text-2xl font-bold text-blue-600">CrowdFund</h1>
      <div className="hidden md:flex space-x-6">
        <Button variant="ghost">How it Works</Button>
        <Button variant="ghost">Browse Projects</Button>
      </div>
      <div className="space-x-4">
        <ConnectButton />
      </div>
    </nav>
    </div>
    </header>
  );
};

export default Navbar;
