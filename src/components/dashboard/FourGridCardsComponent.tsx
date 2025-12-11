"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Calendar as CalendarIcon,
  Users,
  Clock,
  ArrowRight,
  Plus,
  ChevronDownIcon,
  MessageCircle,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldLabel, FieldDescription, FieldError } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { useState } from "react";

const formSchema = z.object({
  ScheduleDate: z.date({
    message: "Schedule date is required",
  }),
  time: z.string().min(1, "Time is required"),
  meetingText: z.string().min(1, "Meeting type is required"),
  aganda: z.string().optional(),
});

const queryFormSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  description: z.string().min(1, "Description is required"),
});

const FourGridCardsComponent = () => {
  const [dateOpen, setDateOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ScheduleDate: undefined,
      time: "",
      meetingText: "",
      aganda: "",
    },
  });

  const queryForm = useForm<z.infer<typeof queryFormSchema>>({
    resolver: zodResolver(queryFormSchema),
    defaultValues: {
      subject: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      toast.success("Meeting request submitted successfully!");

      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
      form.reset();
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  };

  const queryHandler = (values: z.infer<typeof queryFormSchema>) => {
    try {
      console.log(values);
      toast.success("Query submitted successfully!");
      queryForm.reset();
    } catch (error) {
      console.error("Query submission error", error);
      toast.error("Failed to submit the query. Please try again.");
    }
  };
  return (
    <>
      <h2 className="text-2xl font-bold px-6"> 🚀 Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-6 ">
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <Card className="bg-gradient-to-br from-emerald-600 to-emerald-800 shadow-lg hover:shadow-xl transition-all duration-300 border-none text-white overflow-hidden group h-full  ">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="relative z-10 pb-3">
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                Meeting History
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 pt-0 -mt-5 mb-5">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-colors duration-300">
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        Progress Review
                      </h3>
                      <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                        Active
                      </Badge>
                    </div>
                    <ArrowRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  <div className="flex flex-col gap-2.5 pt-2 border-t border-white/20">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 opacity-80" />
                      <span className="opacity-90">Date:</span>
                      <span className="font-medium">12/12/2025</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 opacity-80" />
                      <span className="opacity-90">Attendees:</span>
                      <div className="flex gap-1.5 flex-wrap">
                        <Badge
                          variant="outline"
                          className="bg-white/10 text-white border-white/30 text-xs px-2 py-0.5"
                        >
                          Client
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-white/10 text-white border-white/30 text-xs px-2 py-0.5"
                        >
                          PM
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-white/10 text-white border-white/30 text-xs px-2 py-0.5"
                        >
                          Contractor
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardContent className="relative z-10 pt-0 -mt-5 mb-5">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-colors duration-300">
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        Progress Review
                      </h3>
                      <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                        Active
                      </Badge>
                    </div>
                    <ArrowRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  <div className="flex flex-col gap-2.5 pt-2 border-t border-white/20">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 opacity-80" />
                      <span className="opacity-90">Date:</span>
                      <span className="font-medium">12/12/2025</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 opacity-80" />
                      <span className="opacity-90">Attendees:</span>
                      <div className="flex gap-1.5 flex-wrap">
                        <Badge
                          variant="outline"
                          className="bg-white/10 text-white border-white/30 text-xs px-2 py-0.5"
                        >
                          Client
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-white/10 text-white border-white/30 text-xs px-2 py-0.5"
                        >
                          PM
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-white/10 text-white border-white/30 text-xs px-2 py-0.5"
                        >
                          Contractor
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <Card className="bg-gradient-to-br from-violet-600 to-violet-800 shadow-lg hover:shadow-xl transition-all duration-300 border-none text-white overflow-hidden group h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="relative z-10 pb-3">
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Plus className="w-5 h-5" />
                </div>
                Request Meeting
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10 pt-0 -mt-5 ">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <Field>
                    <FieldLabel
                      htmlFor="ScheduleDate"
                      className="text-white/90"
                    >
                      Date of Schedule
                    </FieldLabel>
                    <Controller
                      name="ScheduleDate"
                      control={form.control}
                      render={({ field }) => (
                        <Popover open={dateOpen} onOpenChange={setDateOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              id="ScheduleDate"
                              variant="outline"
                              className={`
                                w-full justify-start text-left font-normal
                                bg-white/20 border-white/30 text-white hover:bg-white/30
                                ${!field.value && "text-white/50"}
                              `}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select date</span>
                              )}
                              <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                field.onChange(date);
                                setDateOpen(false);
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      )}
                    />
                    <FieldError className="text-white/80">
                      {form.formState.errors.ScheduleDate?.message}
                    </FieldError>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="time" className="text-white/90">
                      Time
                    </FieldLabel>
                    <Input
                      type="time"
                      id="time"
                      value={form.watch("time")}
                      {...form.register("time")}
                      className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    />
                    <FieldError className="text-white/80">
                      {form.formState.errors.time?.message}
                    </FieldError>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="meetingText" className="text-white/90">
                      Meeting Type
                    </FieldLabel>
                    <Input
                      id="meetingText"
                      placeholder="eg: Project, Review..."
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                      {...form.register("meetingText")}
                    />
                    <FieldError className="text-white/80">
                      {form.formState.errors.meetingText?.message}
                    </FieldError>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="aganda" className="text-white/90">
                      Agenda
                    </FieldLabel>
                    <Textarea
                      id="aganda"
                      placeholder="Meeting and Agenda Discussion"
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/50 min-h-[80px]"
                      {...form.register("aganda")}
                    />
                    <FieldError className="text-white/80">
                      {form.formState.errors.aganda?.message}
                    </FieldError>
                  </Field>

                  <Button
                    type="submit"
                    className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30"
                  >
                    Submit Request
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1 md:col-span-1 ">
          <Card className="bg-gradient-to-br from-yellow-600 to-yellow-800 shadow-lg hover:shadow-xl transition-all duration-300 border-none text-white overflow-hidden group h-full  ">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="relative z-10 pb-3">
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <MessageCircle className="w-5 h-5" />
                </div>
                Project Queries
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 pt-0 -mt-5 mb-5">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-colors duration-300">
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        Material delivery schedule
                      </h3>
                      <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                        Resolved
                      </Badge>
                    </div>
                    <ArrowRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  <div className="flex flex-col gap-2.5 pt-2 border-t border-white/20">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 opacity-80" />
                      <span className="opacity-90">Date:</span>
                      <span className="font-medium">12/12/2025</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 opacity-80" />
                      <span className="opacity-90">Response:</span>
                      <div className="flex gap-1.5 flex-wrap">
                        <Badge
                          variant="outline"
                          className="bg-white/10 text-white border-white/30 text-xs px-2 py-0.5"
                        >
                          Updated schedule provided
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardContent className="relative z-10 pt-0 -mt-5 mb-5">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-colors duration-300">
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        Request for payment
                      </h3>
                      <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                        Pending
                      </Badge>
                    </div>
                    <ArrowRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  <div className="flex flex-col gap-2.5 pt-2 border-t border-white/20">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 opacity-80" />
                      <span className="opacity-90">Date:</span>
                      <span className="font-medium">12/12/2025</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 opacity-80" />
                      <span className="opacity-90">Response:</span>
                      <div className="flex gap-1.5 flex-wrap">
                        <Badge
                          variant="outline"
                          className="bg-white/10 text-white border-white/30 text-xs px-2 py-0.5"
                        >
                          Payment pending
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1 md:col-span-2 ">
          <Card className="bg-gradient-to-br from-pink-600 to-pink-800 shadow-lg hover:shadow-xl transition-all duration-300 border-none text-white overflow-hidden group h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="relative z-10 pb-3">
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Plus className="w-5 h-5" />
                </div>
                Raise New Query
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10 pt-0">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <form
                  onSubmit={queryForm.handleSubmit(queryHandler)}
                  className="space-y-4"
                >
                  <Field>
                    <FieldLabel htmlFor="subject" className="text-white/90">
                      Subject
                    </FieldLabel>
                    <Input
                      id="subject"
                      placeholder="eg: Material delivery schedule, Request for payment..."
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                      {...queryForm.register("subject")}
                    />
                    <FieldError className="text-white/80">
                      {queryForm.formState.errors.subject?.message}
                    </FieldError>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="description" className="text-white/90">
                      Description
                    </FieldLabel>
                    <Textarea
                      id="description"
                      placeholder="eg: The material delivery schedule is not as expected, The payment is not received..."
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/50 min-h-[100px]"
                      {...queryForm.register("description")}
                    />
                    <FieldError className="text-white/80">
                      {queryForm.formState.errors.description?.message}
                    </FieldError>
                  </Field>

                  <Button
                    type="submit"
                    className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30"
                  >
                    Submit Query
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default FourGridCardsComponent;
