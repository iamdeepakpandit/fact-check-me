import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { FactCheckInput } from "@/components/FactCheckInput";
import { FactCheckResult, ResultType } from "@/components/FactCheckResult";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    type: ResultType;
    claim: string;
    explanation?: string;
  } | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if environment variables are loaded
    if (!import.meta.env.VITE_SUPABASE_URL) {
      console.error('Environment variables not loaded. Refresh the page.');
      return;
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        if (!session) {
          navigate("/auth");
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);


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
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
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

  // Show error message if env vars not loaded
  if (!import.meta.env.VITE_SUPABASE_URL) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <h1 className="text-2xl font-bold text-foreground">Lovable Cloud Initializing</h1>
          <p className="text-muted-foreground">
            Environment variables are loading. Please refresh the page in a moment.
          </p>
          <Button onClick={() => window.location.reload()}>Refresh Page</Button>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden">
      <style>{`
        @keyframes drift-slow {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) translateX(10vw);
            opacity: 0;
          }
        }

        @keyframes drift-medium {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) translateX(-5vw);
            opacity: 0;
          }
        }

        @keyframes drift-fast {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100vh) translateX(2vw);
            opacity: 0;
          }
        }

        .word {
          position: absolute;
          bottom: -150px;
          font-weight: 800;
          opacity: 0;
          will-change: transform, opacity;
          pointer-events: none;
        }

        .word-slow {
          font-size: 1.5rem;
          filter: blur(1.5px);
          animation: drift-slow linear infinite;
        }

        .word-medium {
          font-size: 2.5rem;
          filter: blur(0.5px);
          animation: drift-medium linear infinite;
        }

        .word-fast {
          font-size: 3.5rem;
          filter: none;
          animation: drift-fast linear infinite;
        }
      `}</style>

      <div className="fixed inset-0 overflow-hidden z-0" aria-hidden="true">
        <span className="word word-fast text-green-400" style={{ left: '15%', animationDuration: '15s', animationDelay: '-2s' }}>Real News</span>
        <span className="word word-fast text-red-500" style={{ left: '70%', animationDuration: '18s', animationDelay: '-5s' }}>Fake News</span>
        <span className="word word-fast text-yellow-400" style={{ left: '40%', animationDuration: '16s', animationDelay: '-10s' }}>Breaking News</span>

        <span className="word word-medium text-blue-400" style={{ left: '10%', animationDuration: '25s', animationDelay: '-5s' }}>Headlines</span>
        <span className="word word-medium text-cyan-400" style={{ left: '80%', animationDuration: '22s', animationDelay: '-1s' }}>Exclusive</span>
        <span className="word word-medium text-gray-300" style={{ left: '50%', animationDuration: '28s', animationDelay: '-15s' }}>Trust</span>
        <span className="word word-medium text-purple-400" style={{ left: '25%', animationDuration: '24s', animationDelay: '-8s' }}>Analysis</span>

        <span className="word word-slow text-green-700" style={{ left: '5%', animationDuration: '40s', animationDelay: '-12s' }}>Verified</span>
        <span className="word word-slow text-red-800" style={{ left: '90%', animationDuration: '45s', animationDelay: '-3s' }}>Propaganda</span>
        <span className="word word-slow text-orange-600" style={{ left: '60%', animationDuration: '38s', animationDelay: '-20s' }}>Authentication</span>
        <span className="word word-slow text-yellow-700" style={{ left: '30%', animationDuration: '42s', animationDelay: '-7s' }}>Latest Update</span>
        <span className="word word-slow text-gray-500" style={{ left: '75%', animationDuration: '35s', animationDelay: '-14s' }}>Sources</span>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar user={session?.user ?? null} />

        <main className="container mx-auto px-4 py-12 flex-1">
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

        <Footer />
      </div>
    </div>
  );
};

export default Index;
