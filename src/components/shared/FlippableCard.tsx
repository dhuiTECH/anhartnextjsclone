import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import OptimizedImage from '@/components/OptimizedImage';
import { cn } from '@/lib/utils';
import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';
import { RotateCw } from 'lucide-react';
interface CardData {
  id?: string | number;
  title: string;
  description: string;
  image?: string;
  icon?: React.ComponentType<{
    className?: string;
  }>;
  buttonText?: string;
  buttonAction?: () => void;
  // Back side data
  backTitle?: string;
  backDescription?: string;
  backImage?: string;
}
interface FlippableCardProps {
  card: CardData;
  index: number;
  showImages?: boolean;
  onCardAction?: (card: CardData, index: number) => void;
}
export const FlippableCard: React.FC<FlippableCardProps> = ({
  card,
  index,
  showImages = false,
  onCardAction
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const IconComponent = card.icon;
  const delay = index * 100;
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  return <ScrollAnimationWrapper direction="top" delay={delay}>
      <div className="relative perspective-1000" style={{
      minHeight: '400px'
    }}>
        <div className={cn("relative w-full transition-transform duration-700", isFlipped && "rotate-y-180")} style={{
        transformStyle: "preserve-3d",
        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
      }}>
          {/* Front Side */}
          <Card className={cn("group hover:shadow-sm sm:hover:shadow-lg transition-all duration-300 flex flex-col backface-hidden", !isFlipped && "hover:shadow-xl hover:border-primary/20")} data-card-interactive style={{
          backfaceVisibility: "hidden",
          position: isFlipped ? "absolute" : "relative",
          width: "100%",
          inset: isFlipped ? "0" : "auto"
        }}>
            {/* Image Section */}
            {showImages && card.image && <div className="aspect-video bg-muted rounded-t-lg overflow-hidden relative">
                {card.image.startsWith('blob:') || card.image.startsWith('http') || card.image.includes('@/assets/') ? <img src={card.image} alt={card.title} className="w-full h-full object-cover" onError={e => {
              (e.currentTarget as HTMLElement).style.display = 'none';
              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }} /> : <OptimizedImage imageName={card.image} alt={card.title} category="initiative" className="w-full h-full" aspectRatio="16/9" loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />}
                <div className="w-full h-full bg-muted flex items-center justify-center" style={{
              display: 'none'
            }}>
                  <span className="text-sm text-muted-foreground">Image not found</span>
                </div>
                
                {/* Flip Indicator on Image */}
                
              </div>}
            
            {/* Icon Section (alternative to image) */}
            {!showImages && IconComponent && <div className="flex justify-center pt-6">
                <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-accent/20">
                  <IconComponent className="w-8 h-8 text-accent" />
                </div>
              </div>}
            
            <CardHeader className={cn("flex-shrink-0", !showImages && !IconComponent && "text-center")}>
              <CardTitle className="text-xl">{card.title}</CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col justify-between">
              <p className="text-muted-foreground leading-relaxed mb-4">
                {card.description}
              </p>
              
              {/* Flip Button at Bottom */}
              {card.backTitle && <Button onClick={handleFlip} variant="outline" className="w-full mt-auto flex items-center justify-center gap-2">
                  <RotateCw className="w-4 h-4" />
                  Learn More
                </Button>}
              
              {/* Action Button (if no back content) */}
              {!card.backTitle && (card.buttonText || onCardAction) && <Button onClick={() => {
              if (card.buttonAction) {
                card.buttonAction();
              } else if (onCardAction) {
                onCardAction(card, index);
              }
            }} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors mt-auto">
                  {card.buttonText || 'Learn More'}
                </Button>}
            </CardContent>
          </Card>

          {/* Back Side */}
          {card.backTitle &&           <Card className={cn("group hover:shadow-sm sm:hover:shadow-lg transition-all duration-300 flex flex-col backface-hidden", isFlipped && "hover:shadow-xl hover:border-primary/20")} data-card-interactive style={{
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          position: isFlipped ? "relative" : "absolute",
          width: "100%",
          inset: isFlipped ? "auto" : "0"
        }}>
              {/* Back Image Section */}
              {showImages && card.backImage && <div className="aspect-video bg-muted rounded-t-lg overflow-hidden relative">
                  {card.backImage.startsWith('blob:') || card.backImage.startsWith('http') || card.backImage.includes('@/assets/') ? <img src={card.backImage} alt={card.backTitle} className="w-full h-full object-cover" onError={e => {
              (e.currentTarget as HTMLElement).style.display = 'none';
              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }} /> : <OptimizedImage imageName={card.backImage} alt={card.backTitle || card.title} category="initiative" className="w-full h-full" aspectRatio="16/9" loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />}
                  <div className="w-full h-full bg-muted flex items-center justify-center" style={{
              display: 'none'
            }}>
                    <span className="text-sm text-muted-foreground">Image not found</span>
                  </div>
                  
                  {/* Flip Back Indicator */}
                  
                </div>}
              
              <CardHeader className="flex-shrink-0">
                <CardTitle className="text-xl">{card.backTitle}</CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col justify-between">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {card.backDescription}
                </p>
                
                {/* Flip Back Button */}
                <Button onClick={handleFlip} variant="outline" className="w-full mt-auto flex items-center justify-center gap-2">
                  <RotateCw className="w-4 h-4" />
                  Back to Front
                </Button>
              </CardContent>
            </Card>}
        </div>
      </div>
    </ScrollAnimationWrapper>;
};