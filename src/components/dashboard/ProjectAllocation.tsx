"use client";

import BasicModal from "../smoothui/basic-modal";
import { Button } from "../ui/button";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Field, FieldLabel, FieldDescription, FieldError } from "../ui/field";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  projectNumber: z.string().min(1, "Project number is required"),
  "message-remarkks": z
    .string()
    .min(3, "Message must be at least 3 characters"),
  assignedTp: z.string().min(1, "Assigned to is required").optional(),
});

const ProjectAllocation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
      form.reset();
    }
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)} variant="default">
        Project Allocation
      </Button>

      <BasicModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size="md"
        title="Project Allocation"
      >
        <div className="space-y-4">
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8 max-w-3xl mx-auto py-10"
          >
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <Field>
                  <FieldLabel htmlFor="projectName">Project Name</FieldLabel>
                  <Input
                    id="projectName"
                    placeholder="Enter Project Name"
                    {...form.register("projectName")}
                  />

                  <FieldError>
                    {form.formState.errors.projectName?.message}
                  </FieldError>
                </Field>
              </div>

              <div className="col-span-6">
                <Field>
                  <FieldLabel htmlFor="projectNumber">
                    Project Number
                  </FieldLabel>
                  <Input
                    id="projectNumber"
                    placeholder="Enter Project Number"
                    {...form.register("projectNumber")}
                  />

                  <FieldError>
                    {form.formState.errors.projectNumber?.message}
                  </FieldError>
                </Field>
              </div>
            </div>
            <Field>
              <FieldLabel htmlFor="message-remarkks">
                Message / Remarks
              </FieldLabel>
              <Textarea
                id="message-remarkks"
                placeholder="Any Additional Remarks or Requirements"
                {...form.register("message-remarkks")}
              />

              <FieldError>
                {form.formState.errors["message-remarkks"]?.message}
              </FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="assignedTp">
                Assigned to (optional)
              </FieldLabel>
              <Select
                value={form.watch("assignedTp") || ""}
                onValueChange={(value) => {
                  form.setValue("assignedTp", value);
                  form.trigger("assignedTp");
                }}
                onOpenChange={(open) => {
                  setIsSelectOpen(open);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a PM or Team" />
                </SelectTrigger>
                <SelectContent
                  className="z-[9999] border-none shadow-none"
                  onPointerDownOutside={(e) => {
                    // Prevent modal from closing when clicking outside select
                    e.preventDefault();
                  }}
                >
                  <SelectItem value="Raj">Raj</SelectItem>
                  <SelectItem value="Vel">Vel</SelectItem>
                  <SelectItem value="Luis">Luis</SelectItem>
                  <SelectItem value="Vivek">Vivek</SelectItem>
                </SelectContent>
              </Select>
              <FieldError>
                {form.formState.errors["assignedTp"]?.message}
              </FieldError>
            </Field>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                onClick={() => setIsOpen(false)}
                variant="outline"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSelectOpen}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </BasicModal>
    </div>
  );
};

export default ProjectAllocation;
