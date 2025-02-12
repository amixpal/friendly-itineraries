
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto pt-6 md:pt-12"
      >
        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-2 text-gray-800 px-4">
          Trip Details
        </h1>
        <p className="text-center text-gray-600 mb-8 md:mb-12 px-4">
          Configure your trip settings
        </p>

        <div className="space-y-6 max-w-2xl mx-auto px-4">
          <Card className="p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-medium mb-4">Trip Type</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedType("personal")}
                className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                  selectedType === "personal"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <User className={`w-6 h-6 ${selectedType === "personal" ? "text-primary" : "text-gray-600"}`} />
                <span className="mt-2 font-medium">Personal</span>
              </button>
              
              <button
                onClick={() => setSelectedType("professional")}
                className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                  selectedType === "professional"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Briefcase className={`w-6 h-6 ${selectedType === "professional" ? "text-primary" : "text-gray-600"}`} />
                <span className="mt-2 font-medium">Professional</span>
              </button>
            </div>
          </Card>

          {selectedType === "professional" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-medium mb-4">Whitelist Management</h2>
                <p className="text-gray-600 mb-4">
                  Add email addresses to the whitelist for professional trip access
                </p>
                
                <div className="flex gap-3 mb-6">
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={addToWhitelist}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>

                <div className="space-y-3">
                  {whitelist.map((email) => (
                    <motion.div
                      key={email}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-gray-700">{email}</span>
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
              <Card className="p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-medium mb-4">Personal Trip Details</h2>
                <p className="text-gray-600">
                  Configure your personal trip settings here
                </p>
                {/* Add your personal trip form fields here */}
              </Card>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
