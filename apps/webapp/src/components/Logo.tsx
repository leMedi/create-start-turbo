import { CheckCircle } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <CheckCircle className="h-6 w-6" />
      <span className="text-xl font-bold">Acme</span>
    </div>
  );
}
