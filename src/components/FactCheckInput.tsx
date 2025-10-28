import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Search } from "lucide-react";

interface FactCheckInputProps {
  onCheck: (text: string) => void;
  isLoading: boolean;
}

export const FactCheckInput = ({ onCheck, isLoading }: FactCheckInputProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onCheck(text);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto space-y-4">
      <div className="space-y-2">
        <Textarea
          placeholder="Enter a news headline or claim to fact-check..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[120px] text-base resize-none"
          disabled={isLoading}
        />
      </div>
      <Button
        type="submit"
        disabled={!text.trim() || isLoading}
        className="w-full sm:w-auto"
        size="lg"
      >
        <Search className="mr-2 h-5 w-5" />
        {isLoading ? "Checking..." : "Check Claim"}
      </Button>
    </form>
  );
};
