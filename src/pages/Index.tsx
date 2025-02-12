
import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, User, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

const Index = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [whitelist, setWhitelist] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState("");
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
        <div className="bg-primary p-4">
          <h1 className="text-2xl font-semibold text-white">
            Trip Details
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
