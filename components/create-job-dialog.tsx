import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

interface CreateJobApplicationDialogProps {
  columnId: string;
  boardId: string;
}

export default function CreateJobDialog({
  columnId,
  boardId,
}: CreateJobApplicationDialogProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="outline"
          className="w-full mb-4 justify-start text-muted-foreground"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Job
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add a Job Application</DialogTitle>
          <DialogDescription>Track a new job application</DialogDescription>
        </DialogHeader>
        <form action="submit" className="space-y-4">
          <FieldGroup className="grid grid-cols-2 gap-4">
            <FieldSet>
              <FieldGroup className="grid grid-cols-2 gap-4">
                <Field className="space-y-2">
                  <FieldLabel htmlFor="company">Company *</FieldLabel>
                  <Input id="company" placeholder="Google" required />
                </Field>
                <Field className="space-y-2">
                  <FieldLabel htmlFor="position">Position *</FieldLabel>
                  <Input
                    id="position"
                    placeholder="Software Engineer"
                    required
                  />
                </Field>
                <Field className="space-y-2">
                  <FieldLabel htmlFor="location">Location</FieldLabel>
                  <Input id="location" placeholder="New York" />
                </Field>
                <Field className="space-y-2">
                  <FieldLabel htmlFor="Salary">Salary</FieldLabel>
                  <Input id="Salary" placeholder="eg., $100k - $150k" />
                </Field>

                <div className="grid grid-cols-1 gap-4">
                  <Field className="space-y-2">
                    <FieldLabel htmlFor="JobURL">Job URL</FieldLabel>
                    <Input
                      id="JobURL"
                      placeholder="eg., https://company.com/jobs/123"
                    />
                  </Field>
                  <Field className="space-y-2">
                    <FieldLabel htmlFor="tags">
                      Tags (Comma separated)
                    </FieldLabel>
                    <Input
                      id="tags"
                      placeholder="eg., React, Tailwind, Next.js, Typescript"
                    />
                  </Field>
                  <Field className="space-y-2">
                    <FieldLabel htmlFor="description">Description</FieldLabel>
                    <Textarea
                      id="description"
                      placeholder="Brief description of the job role..."
                      rows={4}
                      className="resize-none"
                    />
                  </Field>
                  <Field className="space-y-2">
                    <FieldLabel htmlFor="notes">Notes</FieldLabel>
                    <Textarea
                      id="notes"
                      placeholder="Additional notes about the job application"
                      rows={4}
                      className="resize-none"
                    />
                  </Field>
                </div>
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
          </FieldGroup>
          <DialogFooter>
            <Button type="button" variant="outline" className="ml">
              Cancel
            </Button>
            <Button type="submit" variant="outline" className="ml">
              Add Application
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
