import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/hooks/useWallet";
import ConnectWalletButton from "./connectWalletbutton";
import DashboardButton from "./dashboardbutton";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const { isConnected, error } = useWallet();

  useEffect(() => {
    if (error) {
      toast({
        title: "Wallet Connection Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  useEffect(() => {
    if (isConnected) {
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected!",
      });
    }
  }, [isConnected, toast]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass-morphism py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="text-4xl font-extrabold text-gradient">
            Zera
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-white/80 hover:text-white transition-colors"
          >
            Features
          </a>
          
          <a
            href="#how-it-works"
            className="text-white/80 hover:text-white transition-colors"
          >
            How It Works
          </a>
          
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <div className="text-white hover:bg-white/10">
            <ConnectWalletButton />
          </div>
          <div className="bg-gradient-to-r from-purple to-orange text-white hover:opacity-90">
            {!isConnected}
            <DashboardButton />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-morphism">
          <nav className="flex flex-col space-y-4 p-4">
            <a
              href="#features"
              className="text-white/80 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#solutions"
              className="text-white/80 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Solutions
            </a>
            <a
              href="#how-it-works"
              className="text-white/80 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="text-white/80 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <Button
              variant="ghost"
              className="justify-start text-white hover:bg-white/10 w-full"
            >
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-purple to-orange text-white hover:opacity-90 w-full">
              Start Free Trial
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
