import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, CheckCircle, Funnel, TrendUp, Sparkle } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

/**
 * Props pour le composant WelcomeDialog
 * Props for the WelcomeDialog component
 */
interface WelcomeDialogProps {
  open: boolean
  onComplete: () => void
}

/**
 * Dialogue de bienvenue pour les nouveaux utilisateurs
 * Welcome dialog for new users
 */
export function WelcomeDialog({ open, onComplete }: WelcomeDialogProps) {
  const [step, setStep] = useState(0)

  const steps = [
    {
      icon: MapPin,
      iconColor: 'text-primary',
      title: 'Welcome to Discover Sevilla',
      description: 'Your personal guide to exploring the most captivating sites in Sevilla. Let us show you how to make the most of your journey.',
      // Bienvenue à Discover Sevilla - Votre guide personnel pour explorer les sites les plus captivants de Séville
      content: (
        <div className="space-y-4 text-left">
          <p className="text-muted-foreground">
            This app helps you:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground ml-4">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Discover Sevilla's most iconic monuments and hidden gems</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Plan your visits with duration and crowd level information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Track your progress as you explore the city</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      icon: CheckCircle,
      iconColor: 'text-accent',
      title: 'Track Your Journey',
      description: 'Mark sites as visited to keep track of your Sevilla adventure.',
      // Suivez votre voyage - Marquez les sites comme visités
      content: (
        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 rounded border-2 border-muted-foreground flex items-center justify-center">
                  <CheckCircle weight="fill" className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">Click the checkbox on any site card</p>
                <p className="text-xs text-muted-foreground">
                  Your visited sites are saved automatically and persist across sessions
                  {/* Vos sites visités sont sauvegardés automatiquement */}
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: Funnel,
      iconColor: 'text-blue-600',
      title: 'Filter Your View',
      description: 'Easily switch between all sites, places to visit, or sites you\'ve already explored.',
      // Filtrez votre vue
      content: (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="secondary" className="text-xs">
              All Sites
            </Badge>
            <Badge variant="secondary" className="text-xs">
              To Visit
            </Badge>
            <Badge variant="secondary" className="text-xs">
              <CheckCircle weight="fill" className="w-3 h-3 mr-1 inline" />
              Visited
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Use the filter buttons at the top to customize your view
            {/* Utilisez les boutons de filtre en haut pour personnaliser votre vue */}
          </p>
        </div>
      ),
    },
    {
      icon: TrendUp,
      iconColor: 'text-primary',
      title: 'Watch Your Progress',
      description: 'See how many sites you\'ve discovered with the progress tracker.',
      // Suivez votre progression
      content: (
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Your Progress</span>
              <Badge variant="secondary" className="text-xs">
                0 of 12
              </Badge>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-0 transition-all" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            The progress bar appears once you mark your first site
            {/* La barre de progression apparaît dès que vous marquez votre premier site */}
          </p>
        </div>
      ),
    },
    {
      icon: Sparkle,
      iconColor: 'text-accent',
      title: 'Ready to Explore!',
      description: 'Start your Sevilla adventure now. Enjoy discovering this magnificent city!',
      // Prêt à explorer !
      content: (
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-2">
            <MapPin weight="fill" className="w-10 h-10 text-primary" />
          </div>
          <p className="text-muted-foreground">
            All your progress will be saved automatically. Happy exploring!
            {/* Tous vos progrès seront sauvegardés automatiquement */}
          </p>
        </div>
      ),
    },
  ]

  const currentStep = steps[step]
  const Icon = currentStep.icon
  const isLastStep = step === steps.length - 1

  const handleNext = () => {
    if (isLastStep) {
      onComplete()
    } else {
      setStep(step + 1)
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onComplete()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center",
              "bg-gradient-to-br from-primary/10 to-accent/10"
            )}>
              <Icon weight="fill" className={cn("w-8 h-8", currentStep.iconColor)} />
            </div>
          </div>
          <DialogTitle className="text-2xl text-center">
            {currentStep.title}
          </DialogTitle>
          <DialogDescription className="text-center">
            {currentStep.description}
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          {currentStep.content}
        </div>

        <div className="flex flex-col gap-3">
          {/* Indicateurs d'étape / Step indicators */}
          <div className="flex justify-center gap-1.5 mb-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === step ? "w-8 bg-primary" : "w-1.5 bg-muted"
                )}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {!isLastStep && (
              <Button
                variant="ghost"
                onClick={handleSkip}
                className="flex-1"
              >
                Skip
                {/* Passer */}
              </Button>
            )}
            <Button
              onClick={handleNext}
              className={cn("transition-all", !isLastStep ? "flex-1" : "w-full")}
            >
              {isLastStep ? "Start Exploring" : "Next"}
              {/* Commencer à explorer / Suivant */}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
