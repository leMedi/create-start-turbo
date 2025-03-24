import type { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";

import { zCreatePost } from "@acme/db/schema";
import { Button } from "@acme/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@acme/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@acme/ui/form";
import { Input } from "@acme/ui/input";
import { Textarea } from "@acme/ui/textarea";

import { useTRPC } from "~/utils/trpc";

const zFormSchema = zCreatePost;
type FormSchema = z.infer<typeof zFormSchema>;

export function AddPostButton() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { mutate, error, isPending } = useMutation({
    ...trpc.posts.create.mutationOptions(),
    onSuccess: async ({ id }) => {
      void queryClient.invalidateQueries({ queryKey: [["posts", "list"]] });
      form.reset();
      await navigate({ to: `/${id}` });
      setIsOpen(false);
    },
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(zFormSchema),
    defaultValues: {},
  });

  const onSubmit = (data: FormSchema) => {
    mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5" />
          Add Post
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Create New Post</DialogTitle>
            </DialogHeader>
            {error && (
              <div
                className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
                role="alert"
              >
                <span className="block sm:inline">
                  {error.message || "Failed to create post"}
                </span>
              </div>
            )}
            <div className="mt-4 space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Post title" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your post content..."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Creating..." : "Publish Post"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
