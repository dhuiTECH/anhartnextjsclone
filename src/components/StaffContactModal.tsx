import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Calendar, Building, User, X } from "lucide-react";
import { StaffMember, BaseModalProps } from "@/types/common";

/**
 * Generates a professional email address for a staff member
 * @param name - Full name of the staff member
 * @param domain - Email domain (defaults to 'anhart.ca')
 * @returns Generated email address
 */
const generateEmail = (name: string, domain: string = 'anhart.ca'): string => {
  return `${name.toLowerCase().replace(/\s+/g, '.')}@${domain}`;
};
interface StaffContactModalProps extends BaseModalProps {
  staffMember: StaffMember | null;
}
/**
 * StaffContactModal Component
 * 
 * A modal component for displaying detailed staff member information
 * including contact details, bio, and role information. Features
 * consistent styling and fallback values for missing contact information.
 * 
 * @param isOpen - Controls modal visibility
 * @param onClose - Callback to close the modal
 * @param staffMember - Staff member data to display
 */
export const StaffContactModal = ({
  isOpen,
  onClose,
  staffMember
}: StaffContactModalProps) => {
  // Early return if no staff member is selected
  if (!staffMember) return null;
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl font-bold text-center text-foreground">
            {staffMember.name}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-0 top-0 h-8 w-8 rounded-full hover:bg-muted"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile Header */}
          <div className="text-center">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 mx-auto mb-4 flex items-center justify-center">
              <User className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {staffMember.role}
            </h3>
            <p className="text-muted-foreground">
              {staffMember.isLeadership ? "Executive Member" : "Staff Member"}
            </p>
          </div>

          {/* Bio Section */}
          <Card>
            
          </Card>

          {/* Contact Information */}
          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold text-foreground mb-4">Contact Information</h4>
              <div className="space-y-3">
                {/* Email */}
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Email</p>
                    <p className="text-sm text-muted-foreground">
                      {staffMember.email || generateEmail(staffMember.name, staffMember.emailDomain)}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Phone</p>
                    <p className="text-sm text-muted-foreground">
                      {staffMember.phone || "Contact main office for direct line"}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Location</p>
                    <p className="text-sm text-muted-foreground">
                      {staffMember.location || "Vancouver, BC"}
                    </p>
                  </div>
                </div>

                {/* Department */}
                

                {/* Start Date */}
                
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          
        </div>
      </DialogContent>
    </Dialog>;
};