import { useState } from "react";
import { FactCheckInput } from "@/components/FactCheckInput";
import { FactCheckResult, ResultType } from "@/components/FactCheckResult";
import { Shield } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    type: ResultType;
    claim: string;
    explanation?: string;
  } | null>(null);

  const handleCheck = async (text: string) => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fact-check`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ claim: text }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to check claim");
      }

      const data = await response.json();
      setResult({
        type: data.result,
        claim: text,
        explanation: data.explanation,
      });
    } catch (error) {
      console.error("Error checking claim:", error);
      toast.error("Failed to check claim. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">FactCheck</h1>
              <p className="text-sm text-muted-foreground">Verify before you share</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold tracking-tight">
              Check News Claims Instantly
            </h2>
            <p className="text-lg text-muted-foreground">
              Enter any news headline or claim to verify its accuracy using AI-powered fact-checking
            </p>
          </div>

          <FactCheckInput onCheck={handleCheck} isLoading={isLoading} />

          {result && (
            <div className="max-w-3xl mx-auto">
              <FactCheckResult
                result={result.type}
                claim={result.claim}
                explanation={result.explanation}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
