import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

const TagInput = ({ tags, onChange, placeholder = "Type and press Enter" }: TagInputProps) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        onChange([...tags, input.trim()]);
      }
      setInput("");
    }
    if (e.key === "Backspace" && !input && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const remove = (tag: string) => onChange(tags.filter((t) => t !== tag));

  return (
    <div className="flex flex-wrap gap-1.5 p-2 border border-border rounded-md bg-background min-h-[40px] items-center focus-within:ring-1 focus-within:ring-ring">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary"
        >
          {tag}
          <button type="button" onClick={() => remove(tag)} className="hover:text-destructive">
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? placeholder : ""}
        className="flex-1 min-w-[120px] border-0 p-0 h-6 text-sm shadow-none focus-visible:ring-0"
      />
    </div>
  );
};

export default TagInput;
