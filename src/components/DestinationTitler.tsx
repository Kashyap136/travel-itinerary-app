"use client";

import type { FC } from 'react';
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateDestinationTitle } from "@/ai/flows/generate-destination-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Wand2 } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  locationName: z.string().min(2, "Location name must be at least 2 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
});

type FormData = z.infer<typeof FormSchema>;

interface DestinationTitlerProps {
  isOpen: boolean;
  onClose: () => void;
}

const DestinationTitler: FC<DestinationTitlerProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedTitle, setGeneratedTitle] = useState<string | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setGeneratedTitle(null);
    try {
      const result = await generateDestinationTitle(data);
      setGeneratedTitle(result.title);
      toast({
        title: "Title Generated!",
        description: "A new catchy title has been created.",
      });
    } catch (error) {
      console.error("Error generating title:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate title. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleClose = () => {
    reset();
    setGeneratedTitle(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md transform transition-all ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center text-primary">
                <Wand2 className="mr-2 h-6 w-6" />
                AI Destination Titler
              </CardTitle>
              <Button type="button" variant="ghost" size="sm" onClick={handleClose} aria-label="Close AI Titler">&times;</Button>
            </div>
            <CardDescription>
              Create a catchy title for your travel destination.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="locationName">Location Name</Label>
              <Input
                id="locationName"
                {...register("locationName")}
                placeholder="e.g., Paris, France"
                className={errors.locationName ? "border-destructive" : ""}
              />
              {errors.locationName && (
                <p className="text-sm text-destructive mt-1">{errors.locationName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="e.g., A romantic city with iconic landmarks and rich history."
                className={errors.description ? "border-destructive" : ""}
              />
              {errors.description && (
                <p className="text-sm text-destructive mt-1">{errors.description.message}</p>
              )}
            </div>
            {generatedTitle && (
              <div className="mt-4 p-3 bg-accent/20 rounded-md">
                <p className="text-sm font-medium text-accent-foreground">Generated Title:</p>
                <p className="text-lg font-semibold text-primary">{generatedTitle}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Generate Title
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default DestinationTitler;
