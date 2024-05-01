import { CreateNoteSchema, createNoteSchema } from "@/lib/validation/note";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";
import { Textarea } from "./textarea";
import LoadingButton from "./loading-button";
import { useRouter } from "next/navigation";

interface AddNoteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function AddNoteDialog({ open, setOpen }: AddNoteDialogProps) {
  const router = useRouter();
  const form = useForm<CreateNoteSchema>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: "",
      content: "",
    }
  });

  async function onSubmit(input: CreateNoteSchema) {
    try{
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      if(!response.ok) {
        throw new Error(response.statusText);
      }

      form.reset();
      router.refresh(); // Refresh the page to show the new note as it's server component
      setOpen(false);
    } catch (error) {
      console.error("Failed to add note", error);
      alert("Failed to add note, please try again.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note title</FormLabel>
                  <FormControl>
                    <Input placeholder="Note title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Note content" {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <LoadingButton type="submit" loading={form.formState.isSubmitting}>
                Submit
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
