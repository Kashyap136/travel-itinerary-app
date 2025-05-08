import type { FC } from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";

interface AppHeaderProps {
  onToggleTitler: () => void;
}

const AppHeader: FC<AppHeaderProps> = ({ onToggleTitler }) => {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 shadow-sm">
      <div className="md:hidden"> {/* Only show sidebar trigger on mobile as sidebar has its own rail on desktop */}
        <SidebarTrigger />
      </div>
      <h1 className="text-2xl font-semibold text-primary">
        WanderTrack
      </h1>
      <div className="ml-auto">
        <Button variant="outline" size="sm" onClick={onToggleTitler} aria-label="Open AI Destination Titler">
          <Wand2 className="mr-2 h-4 w-4" />
          AI Titler
        </Button>
      </div>
    </header>
  );
};

export default AppHeader;
