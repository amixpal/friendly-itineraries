
import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const handleSelection = (type: string) => {
    setSelectedType(type);
    navigate(`/${type}-trip`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto pt-6 md:pt-12"
      >
        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-2 text-gray-800 px-4">
          Select Your Trip Type
        </h1>
        <p className="text-center text-gray-600 mb-8 md:mb-12 px-4">
          Choose between personal or professional travel
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto px-4">
          <motion.div
            whileHover={!isMobile ? { scale: 1.02 } : undefined}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`p-4 md:p-6 cursor-pointer transition-all duration-200 ${
                selectedType === "personal"
                  ? "border-2 border-primary"
                  : "hover:border-gray-300"
              }`}
              onClick={() => handleSelection("personal")}
            >
              <div className="flex flex-col items-center text-center p-4 md:p-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <User className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <h2 className="text-xl md:text-2xl font-medium mb-2">Personal Trip</h2>
                <p className="text-gray-600 text-sm md:text-base">
                  Plan your personal journey with ease
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            whileHover={!isMobile ? { scale: 1.02 } : undefined}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`p-4 md:p-6 cursor-pointer transition-all duration-200 ${
                selectedType === "professional"
                  ? "border-2 border-primary"
                  : "hover:border-gray-300"
              }`}
              onClick={() => handleSelection("professional")}
            >
              <div className="flex flex-col items-center text-center p-4 md:p-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <Briefcase className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <h2 className="text-xl md:text-2xl font-medium mb-2">Professional Trip</h2>
                <p className="text-gray-600 text-sm md:text-base">
                  Business travel with whitelist access
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
