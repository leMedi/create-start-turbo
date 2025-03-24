import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@acme/ui/alert";
import { Button } from "@acme/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@acme/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@acme/ui/collapsible";

export function ErrorDetails({
  title = "Something went wrong",
  message = "We encountered an error while processing your request.",
  error,
}: {
  title?: string;
  message?: string;
  error?: Error;
}) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center p-4">
      <Card className="mx-auto w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20">
            <AlertCircle className="h-10 w-10 text-red-500 dark:text-red-400" />
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="text-base">{message}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Collapsible className="w-full">
              <Alert variant="destructive" className="mb-2">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error Details</AlertTitle>
                <AlertDescription className="mt-2 font-mono text-xs">
                  {error.message}
                </AlertDescription>
              </Alert>
              <CollapsibleTrigger asChild>
                <Button variant="link" size="sm" className="px-0 text-xs">
                  Show stack trace
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2 max-h-40 overflow-auto rounded-md bg-muted p-2">
                  <pre className="whitespace-pre-wrap text-wrap text-xs text-muted-foreground">
                    {error.stack}
                  </pre>
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
