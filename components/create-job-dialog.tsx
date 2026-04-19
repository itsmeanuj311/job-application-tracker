"use client";

import { useState } from "react";
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
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    location: "",
    salary: "",
    jobUrl: "",
    tags: "",
    description: "",
    notes: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          boardId,
          columnId,
          company: formData.company,
          position: formData.position,
          location: formData.location,
          salary: formData.salary,
          jobUrl: formData.jobUrl,
          description: formData.description,
          notes: formData.notes,
          tags: formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0),
        }),
      });

      if (!response.ok) {
        // Handle error response
        console.error("Failed to create job application");
      } else {
        // Optionally, you can refetch the board data here to show the new job
        setOpen(false);
      }
    } catch (error) {
      console.error("An error occurred while creating the job application:", error);
    }

  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                  <Input
                    id="company"
                    placeholder="Google"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    required
                  />
                </Field>
                <Field className="space-y-2">
                  <FieldLabel htmlFor="position">Position *</FieldLabel>
                  <Input
                    id="position"
                    placeholder="Software Engineer"
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                    required
                  />
                </Field>
                <Field className="space-y-2">
                  <FieldLabel htmlFor="location">Location</FieldLabel>
                  <Input
                    id="location"
                    placeholder="New York"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </Field>
                <Field className="space-y-2">
                  <FieldLabel htmlFor="Salary">Salary</FieldLabel>
                  <Input
                    id="Salary"
                    placeholder="eg., $100k - $150k"
                    value={formData.salary}
                    onChange={(e) =>
                      setFormData({ ...formData, salary: e.target.value })
                    }
                  />
                </Field>

                <div className="grid grid-cols-1 gap-4">
                  <Field className="space-y-2">
                    <FieldLabel htmlFor="JobURL">Job URL</FieldLabel>
                    <Input
                      id="JobURL"
                      placeholder="eg., https://company.com/jobs/123"
                      value={formData.jobUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, jobUrl: e.target.value })
                      }
                    />
                  </Field>
                  <Field className="space-y-2">
                    <FieldLabel htmlFor="tags">
                      Tags (Comma separated)
                    </FieldLabel>
                    <Input
                      id="tags"
                      placeholder="eg., React, Tailwind, Next.js, Typescript"
                      value={formData.tags}
                      onChange={(e) =>
                        setFormData({ ...formData, tags: e.target.value })
                      }
                    />
                  </Field>
                  <Field className="space-y-2">
                    <FieldLabel htmlFor="description">Description</FieldLabel>
                    <Textarea
                      id="description"
                      placeholder="Brief description of the job role..."
                      rows={4}
                      className="resize-none"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </Field>
                  <Field className="space-y-2">
                    <FieldLabel htmlFor="notes">Notes</FieldLabel>
                    <Textarea
                      id="notes"
                      placeholder="Additional notes about the job application"
                      rows={4}
                      className="resize-none"
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
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
