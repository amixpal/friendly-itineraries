
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const ProfessionalTrip = () => {
  const navigate = useNavigate();
  const [whitelist, setWhitelist] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState("");

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto pt-12"
      >
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="p-8">
          <h1 className="text-3xl font-semibold mb-6">Professional Trip Setup</h1>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-medium mb-4">Whitelist Management</h2>
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
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProfessionalTrip;
