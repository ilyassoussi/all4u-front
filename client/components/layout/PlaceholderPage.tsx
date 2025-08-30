import Layout from "./Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  WrenchScrewdriverIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/outline";

interface PlaceholderPageProps {
  title: string;
  description?: string;
  suggestions?: string[];
}

export default function PlaceholderPage({ 
  title, 
  description = "Cette page est en cours de développement.", 
  suggestions = []
}: PlaceholderPageProps) {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardHeader>
              <div className="mx-auto mb-4 bg-brand-100 p-4 rounded-full w-fit">
                <WrenchScrewdriverIcon className="h-12 w-12 text-brand-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground text-lg">
                {description}
              </p>
              
              {suggestions.length > 0 && (
                <div className="bg-muted/50 p-4 rounded-lg text-left">
                  <h3 className="font-semibold text-foreground mb-2">
                    Fonctionnalités prévues :
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-brand-500 mr-2">•</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Continuez à explorer l'application pour voir les fonctionnalités déjà disponibles.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    variant="outline" 
                    onClick={() => window.history.back()}
                    className="flex items-center"
                  >
                    <ArrowLeftIcon className="mr-2 h-4 w-4" />
                    Retour
                  </Button>
                  <Button asChild>
                    <a href="/">
                      Retour à l'accueil
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
