
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PersonalTrip = () => {
  const navigate = useNavigate();

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
          <h1 className="text-3xl font-semibold mb-6">Personal Trip Details</h1>
          <div className="space-y-6">
            {/* Add your personal trip form fields here */}
            <p className="text-gray-600">
              Personal trip booking interface will be implemented here
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default PersonalTrip;
