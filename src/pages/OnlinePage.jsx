
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; 
import { Play, Expand, Minimize } from 'lucide-react';
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

const versions = [
  { value: "1.12.2", label: "Version 1.12.2", url: "https://eaglercraft.com/mc/1.12.2/" },
  { value: "1.8.8", label: "Version 1.8.8", url: "https://eaglercraft.com/mc/1.8.8/" },
  { value: "1.5.2", label: "Version 1.5.2", url: "https://eaglercraft.com/mc/1.5.2/" },
];

const OnlinePage = () => {
  const [selectedVersion, setSelectedVersion] = useState(versions[0].value);
  const [gameUrl, setGameUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef(null);
  const gameContainerRef = useRef(null);
  const { toast } = useToast();

  const handleLaunchGame = () => {
    const versionData = versions.find(v => v.value === selectedVersion);
    if (versionData) {
      setGameUrl(versionData.url);
      setIsPlaying(true);
      toast({
        title: "Launching Game",
        description: `Loading Eaglercraft ${selectedVersion}. Please wait...`,
      });
      
      setTimeout(() => {
        if (gameContainerRef.current && gameContainerRef.current.requestFullscreen) {
          gameContainerRef.current.requestFullscreen().then(() => {
              setIsFullscreen(true);
              if (iframeRef.current) {
                iframeRef.current.focus(); 
              }
          }).catch(err => {
            console.error("Error attempting to enable full-screen mode:", err);
            toast({
              title: "Fullscreen Error",
              description: `Could not automatically enter fullscreen: ${err.message}. You can try the manual button.`,
              variant: "destructive"
            });
          });
        }
      }, 500); 
    } else {
       toast({
        title: "Error",
        description: "Invalid version selected.",
        variant: "destructive",
      });
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      gameContainerRef.current?.requestFullscreen().then(() => {
        if (iframeRef.current) {
          iframeRef.current.focus();
        }
      }).catch(err => {
        toast({
            title: "Fullscreen Error",
            description: `Could not enter fullscreen: ${err.message}`,
            variant: "destructive"
          });
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isCurrentlyFullscreen);
      if (isCurrentlyFullscreen && iframeRef.current) {
        iframeRef.current.focus();
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isPlaying && document.fullscreenElement) {
        event.preventDefault();
        toast({
          title: "Fullscreen Active",
          description: "Use the in-page button or F11 to exit fullscreen.",
          duration: 3000,
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPlaying]);


  return (
    <motion.main
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="flex-grow container mx-auto px-4 py-8 md:py-12 flex flex-col items-center"
    >
      {!isPlaying ? (
        <div className="max-w-md w-full text-center">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-foreground mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Play Eaglercraft Online
          </motion.h1>

          <motion.div 
            className="bg-card p-6 md:p-8 rounded-xl shadow-2xl border border-border"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="version-select" className="block text-sm font-medium text-foreground mb-2 text-left">
                  Choose Version:
                </label>
                <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                  <SelectTrigger id="version-select" className="w-full">
                    <SelectValue placeholder="Select a version" />
                  </SelectTrigger>
                  <SelectContent>
                    {versions.map((version) => (
                      <SelectItem key={version.value} value={version.value}>
                        {version.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  onClick={handleLaunchGame}
                  size="lg"
                  className="w-full minecraft-btn blue !text-lg !py-3"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Launch Game
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      ) : (
        <div ref={gameContainerRef} className="w-full h-[calc(100vh-200px)] md:h-[calc(100vh-150px)] bg-black rounded-lg shadow-2xl border border-border relative flex flex-col overflow-hidden">
           <div className="bg-card/80 backdrop-blur-sm p-2 flex justify-end items-center border-b border-border">
            <Button onClick={toggleFullscreen} variant="ghost" size="sm" className="text-foreground hover:bg-accent px-3 py-1.5">
              {isFullscreen ? <Minimize className="h-5 w-5" /> : <Expand className="h-5 w-5" />}
              <span className="ml-2 text-sm">{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</span>
            </Button>
          </div>
          <iframe
            ref={iframeRef}
            src={gameUrl}
            title={`Eaglercraft ${selectedVersion}`}
            className="w-full h-full border-0 flex-grow"
            allowFullScreen={true} 
            sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms"
            onLoad={() => {
              toast({ title: "Game Loaded", description: `Eaglercraft ${selectedVersion} is ready to play! Click inside the game to activate controls.` });
              if (iframeRef.current) {
                iframeRef.current.focus();
              }
            }}
          ></iframe>
        </div>
      )}
    </motion.main>
  );
};

export default OnlinePage;
