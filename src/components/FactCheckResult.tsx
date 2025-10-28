import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type ResultType = "real" | "fake" | "unverified";

interface FactCheckResultProps {
  result: ResultType;
  claim: string;
  explanation?: string;
}

export const FactCheckResult = ({ result, claim, explanation }: FactCheckResultProps) => {
  const config = {
    real: {
      icon: CheckCircle2,
      title: "Verified",
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
    },
    fake: {
      icon: XCircle,
      title: "False",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive/20",
    },
    unverified: {
      icon: AlertCircle,
      title: "Unverified",
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20",
    },
  };

  const { icon: Icon, title, color, bgColor, borderColor } = config[result];

  return (
    <Card className={cn("p-6 space-y-4 border-2 animate-in fade-in-50 slide-in-from-bottom-4", borderColor, bgColor)}>
      <div className="flex items-start gap-4">
        <Icon className={cn("h-8 w-8 flex-shrink-0 mt-1", color)} />
        <div className="space-y-2 flex-1">
          <h3 className={cn("text-2xl font-bold", color)}>{title}</h3>
          <p className="text-sm text-muted-foreground italic">"{claim}"</p>
          {explanation && (
            <p className="text-base leading-relaxed pt-2">{explanation}</p>
          )}
        </div>
      </div>
    </Card>
  );
};
