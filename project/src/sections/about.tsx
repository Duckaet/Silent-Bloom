import { Card, CardContent } from "@/components/ui/card";
import { Brain, Upload, Database } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Improving Cancer Diagnosis with AI & Blockchain
        </h2>
        <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-16">
          Cancer is one of the deadliest diseases worldwide, but early detection
          significantly increases survival rates. Our platform combines the power of
          AI with blockchain technology to provide accurate, transparent, and
          trustworthy cancer detection.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 text-primary">
                <Upload className="h-10 w-10 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">
                Image Upload
              </h3>
              <p className="text-muted-foreground text-center">
                Securely upload medical images for analysis
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 text-primary">
                <Brain className="h-10 w-10 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">
                AI Prediction
              </h3>
              <p className="text-muted-foreground text-center">
                Advanced deep learning models analyze the images
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 text-primary">
                <Database className="h-10 w-10 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">
                Blockchain Logging
              </h3>
              <p className="text-muted-foreground text-center">
                Results are permanently recorded for transparency
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}