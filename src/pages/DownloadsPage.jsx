
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { DownloadCloud } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const downloadVersions = [
  { 
    version: "1.12.2", 
    description: "The latest recommended version with more features.",
    fileName: "Eaglercraft_1.12.2_Client.zip",
    size: "Approx. 15MB",
    url: "https://drive.google.com/uc?export=download&id=1F433XDLi2P0VYB7iD3_H8q4fLmMAgJyE"
  },
  { 
    version: "1.8.8", 
    description: "A popular older version, great for compatibility with many servers.",
    fileName: "Eaglercraft_1.8.8_Client.zip",
    size: "Approx. 10MB",
    url: "https://drive.google.com/uc?export=download&id=1JvN4PDfA3zukXUCOsln1DAzr--6TVgsu"
  },
  { 
    version: "1.5.2", 
    description: "The classic Eaglercraft experience.",
    fileName: "Eaglercraft_1.5.2_Client.zip",
    size: "Approx. 5MB",
    url: "https://drive.google.com/uc?export=download&id=1dxcYjNEnWRKxOofCwRae8mkPjzfjm8vg"
  },
];

const DownloadsPage = () => {
  const { toast } = useToast();

  const handleDownload = (item) => {
    toast({
      title: "Download Starting",
      description: `Your download for ${item.fileName} will begin shortly.`,
    });
    
    const link = document.createElement('a');
    link.href = item.url;
    link.setAttribute('download', item.fileName); 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.main
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="flex-grow container mx-auto px-4 py-12 md:py-16"
    >
      <div className="max-w-3xl mx-auto">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Download Eaglercraft Clients
        </motion.h1>

        <div className="space-y-6">
          {downloadVersions.map((item, index) => (
            <motion.div
              key={item.version}
              className="bg-card p-6 rounded-xl shadow-xl border border-border transition-shadow hover:shadow-2xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="flex-grow mb-4 sm:mb-0 sm:mr-4">
                  <h2 className="text-2xl font-semibold text-primary mb-1">Eaglercraft {item.version}</h2>
                  <p className="text-muted-foreground mb-2 text-sm">{item.description}</p>
                  <p className="text-xs text-muted-foreground/80">File: {item.fileName} ({item.size})</p>
                </div>
                <Button 
                  onClick={() => handleDownload(item)}
                  size="lg" 
                  className="w-full sm:w-auto minecraft-btn green !text-base !py-2.5 flex items-center justify-center"
                >
                  <DownloadCloud className="mr-2 h-5 w-5" />
                  Download
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.main>
  );
};

export default DownloadsPage;
