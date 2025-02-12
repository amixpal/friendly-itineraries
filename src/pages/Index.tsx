
import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, User, Plus, X, CreditCard, Wallet, Info, ArrowLeft, BanknoteIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

const Index = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [whitelist, setWhitelist] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const addToWhitelist = () => {
    if (!newEmail) return;
    
    if (!newEmail.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    if (whitelist.includes(newEmail)) {
      toast.error("This email is already in the whitelist");
      return;
    }
    
    setWhitelist([...whitelist, newEmail]);
    setNewEmail("");
    toast.success("Email added to whitelist");
  };

  const removeFromWhitelist = (email: string) => {
    setWhitelist(whitelist.filter((e) => e !== email));
    toast.success("Email removed from whitelist");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-[#E54D51] p-4 flex items-center gap-3">
          <ArrowLeft className="w-6 h-6 text-white cursor-pointer" />
          <h1 className="text-xl font-semibold text-white">
            Select an option to pay
          </h1>
        </div>

        <div className="p-4 space-y-6">
          <Card className="p-4 border">
            <h2 className="text-lg font-medium mb-4">Trip Type</h2>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedType("personal")}
                className={`w-full flex items-center p-3 rounded-lg border transition-all ${
                  selectedType === "personal"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <User className={`w-5 h-5 ${selectedType === "personal" ? "text-primary" : "text-gray-600"}`} />
                <span className="ml-3 font-medium">Personal</span>
              </button>
              
              <button
                onClick={() => setSelectedType("professional")}
                className={`w-full flex items-center p-3 rounded-lg border transition-all ${
                  selectedType === "professional"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Briefcase className={`w-5 h-5 ${selectedType === "professional" ? "text-primary" : "text-gray-600"}`} />
                <span className="ml-3 font-medium">Professional</span>
              </button>
            </div>
          </Card>

          {selectedType === "personal" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                {/* Payment Options */}
                <button
                  onClick={() => setSelectedPayment("ideal")}
                  className={`w-full flex items-center p-4 rounded-lg border ${
                    selectedPayment === "ideal" ? "border-[#E54D51]" : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    checked={selectedPayment === "ideal"}
                    onChange={() => setSelectedPayment("ideal")}
                    className="mr-3"
                  />
                  <BanknoteIcon className="w-5 h-5 mr-3 text-gray-600" />
                  <span className="font-medium">iDEAL</span>
                </button>

                <button
                  onClick={() => setSelectedPayment("card")}
                  className={`w-full flex items-center p-4 rounded-lg border ${
                    selectedPayment === "card" ? "border-[#E54D51]" : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    checked={selectedPayment === "card"}
                    onChange={() => setSelectedPayment("card")}
                    className="mr-3"
                  />
                  <CreditCard className="w-5 h-5 mr-3 text-gray-600" />
                  <span className="font-medium">Card</span>
                </button>

                <button
                  onClick={() => setSelectedPayment("wallet")}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border ${
                    selectedPayment === "wallet" ? "border-[#E54D51]" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      checked={selectedPayment === "wallet"}
                      onChange={() => setSelectedPayment("wallet")}
                      className="mr-3"
                    />
                    <Wallet className="w-5 h-5 mr-3 text-gray-600" />
                    <span className="font-medium">Wallet</span>
                  </div>
                  <span className="font-medium">€ 18,50</span>
                </button>
              </div>

              {/* Wallet Info */}
              <div className="bg-[#FFF5F5] p-4 rounded-lg flex gap-3">
                <Info className="w-5 h-5 text-[#E54D51] flex-shrink-0 mt-1" />
                <p className="text-[#E54D51] text-sm">
                  A wallet system stores funds for digital use, eliminating repeated bank or card transactions. Users deposit money once, and then use the balance for transactions, offering efficiency and security for high-transaction platforms.
                </p>
              </div>

              {/* Price Summary */}
              <div className="space-y-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Base Fare</span>
                  <span className="font-medium">€ 8,10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Discount</span>
                  <span className="font-medium">€ 0,00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Service Fee</span>
                  <span className="font-medium">€ 0,60</span>
                </div>
                <div className="h-px bg-gray-200 my-2" />
                <div className="flex justify-between items-center">
                  <span className="font-medium text-lg">Total Price</span>
                  <span className="font-medium text-lg">€ 8,70</span>
                </div>
              </div>

              {/* Continue Button */}
              <Button 
                className="w-full bg-gray-500 hover:bg-gray-600 h-12 text-lg mt-4"
                onClick={() => toast.success("Payment option selected!")}
              >
                Continue
              </Button>
            </motion.div>
          )}

          {selectedType === "professional" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-4 border">
                <h2 className="text-lg font-medium mb-4">Whitelist Management</h2>
                <div className="flex gap-2 mb-4">
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={addToWhitelist} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {whitelist.map((email) => (
                    <motion.div
                      key={email}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm text-gray-700">{email}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromWhitelist(email)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {selectedType === "personal" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-4 border">
                <h2 className="text-lg font-medium mb-4">Personal Trip Details</h2>
                <p className="text-sm text-gray-600">
                  Configure your personal trip settings here
                </p>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
