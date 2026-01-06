"use client";

import { useState, useRef } from "react";
import { useTurnstile } from "@/hooks/useTurnstile";
import { logger } from "@/utils/logger";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Turnstile } from "@/components/Turnstile";
import { X } from "lucide-react";

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  message: string;
  preferredDate: string;
  preferredTime: string;
}

interface BookingFormDialogProps {
  trigger: React.ReactNode;
  titleSize?: "sm" | "lg";
}

export const BookingFormDialog = ({ trigger, titleSize = "lg" }: BookingFormDialogProps) => {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: "",
    preferredDate: "",
    preferredTime: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Turnstile state
  const { token: turnstileToken, key: turnstileKey, reset: resetTurnstile, handlers: turnstileHandlers } = useTurnstile();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let value = e.target.value;

    // Validate date format - limit year to 4 digits
    if (e.target.name === "preferredDate" && value) {
      const match = value.match(/^(\d{0,4})(-)?(\d{0,2})?(-)?(\d{0,2})?$/);
      if (!match) {
        return; // Don't update if format is invalid
      }
      // Prevent year from being longer than 4 digits
      if (value.includes("-") && value.split("-")[0].length > 4) {
        value =
          value.split("-")[0].substring(0, 4) +
          "-" +
          value.split("-").slice(1).join("-");
      }
    }

    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate Turnstile token
    if (!turnstileToken) {
      // Silently return - Turnstile widget should handle user feedback
      return;
    }

    // Get Google Script URL from environment variable
    const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    if (!GOOGLE_SCRIPT_URL) {
      logger.error("Google Script URL not configured", new Error("NEXT_PUBLIC_GOOGLE_SCRIPT_URL is not set"), {
        component: "BookingFormDialog",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert form data to URL-encoded format for Google Apps Script
      const body = new URLSearchParams();
      body.append("name", formData.name);
      body.append("email", formData.email);
      body.append("phone", formData.phone);
      body.append("location", formData.location);
      body.append("message", formData.message);
      body.append("preferredDate", formData.preferredDate);
      body.append("preferredTime", formData.preferredTime);
      body.append("form_type", "booking");
      body.append("turnstile_token", turnstileToken);
      body.append("timestamp", new Date().toISOString());
      body.append("userAgent", navigator.userAgent);
      body.append("referrer", document.referrer);

      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache",
        },
        cache: "no-store",
        body: body.toString(),
      });

      if (res.ok) {
        setIsSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          location: "",
          message: "",
          preferredDate: "",
          preferredTime: "",
        });
        resetTurnstile();
        setTimeout(() => {
          setIsDialogOpen(false);
          setIsSuccess(false);
        }, 3000);
      } else {
        logger.error("Form submission failed", new Error(`HTTP ${res.status}`), {
          component: "BookingFormDialog",
          status: res.status,
        });
        // Error will be handled by toast notification if we integrate useFormSubmission
      }
    } catch (error) {
      logger.error("Network error during form submission", error, {
        component: "BookingFormDialog",
      });
      // Error will be handled by toast notification if we integrate useFormSubmission
    } finally {
      setIsSubmitting(false);
    }
  };

  const titleClassName = titleSize === "sm" 
    ? "text-lg font-bold text-primary"
    : "text-xl font-bold text-primary";

  const dialogHeaderClassName = titleSize === "sm" 
    ? "pb-0"
    : "";

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (!open) setIsSuccess(false);
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-md border border-primary/20 shadow-2xl p-3 sm:p-4">
        <DialogClose className="absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <DialogHeader className={dialogHeaderClassName}>
          <DialogTitle className={titleClassName}>
            Free Consultation
          </DialogTitle>
        </DialogHeader>
        {isSuccess ? (
          <div className="text-center py-2">
            <p className="text-green-600 font-semibold text-sm">
              Thank you for your submission. We have received your submission and will get back to you as soon as possible.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <Label htmlFor="name" className="text-sm">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
                required
                className="mt-0.5 h-9"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                required
                className="mt-0.5 h-9"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-sm">
                Phone (optional)
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(123) 456-7890"
                className="mt-0.5 h-9"
              />
            </div>
            <div>
              <Label htmlFor="location" className="text-sm">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Toronto, ON"
                required
                className="mt-0.5 h-9"
              />
            </div>
            <div>
              <Label htmlFor="message" className="text-sm">
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Details about your project..."
                rows={3}
                required
                className="mt-0.5"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="preferredDate" className="text-sm">
                  Preferred Date
                </Label>
                <Input
                  ref={dateInputRef}
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  className="mt-0.5 h-9 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="preferredTime" className="text-sm">
                  Preferred Time
                </Label>
                <Input
                  ref={timeInputRef}
                  id="preferredTime"
                  name="preferredTime"
                  type="time"
                  value={formData.preferredTime}
                  onChange={handleInputChange}
                  className="mt-0.5 h-9 text-sm"
                />
              </div>
            </div>
            {!isSuccess && (
              <div
                className="flex justify-center py-4"
                key={turnstileKey}
              >
                <Turnstile
                  siteKey="0x4AAAAAACHSP48uvsbyUZG1"
                  onSuccess={turnstileHandlers.onSuccess}
                  onError={turnstileHandlers.onError}
                  onExpire={turnstileHandlers.onExpire}
                  theme="auto"
                  size="invisible"
                />
              </div>
            )}
            <DialogFooter className="pt-1">
              <Button
                type="submit"
                disabled={isSubmitting || !turnstileToken}
                className="w-full sm:w-auto h-9"
              >
                {isSubmitting ? "Sending..." : "Send"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

