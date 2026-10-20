import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { professionalApplicationSchema } from "@/lib/professional-applications";
import { submitProfessionalApplication } from "@/lib/professional-applications.functions";
import { Link } from "@tanstack/react-router";

export function ProfessionalApplicationForm() {
  const submit = useServerFn(submitProfessionalApplication);
  const [role, setRole] = useState("");
  const [formats, setFormats] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = new FormData(event.currentTarget);
    const result = professionalApplicationSchema.safeParse({ ...Object.fromEntries(form), professionalRole: role, sessionFormats: formats });
    if (!result.success) {
      setErrors(Object.fromEntries(result.error.issues.map((issue) => [String(issue.path[0]), issue.message])));
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const response = await submit({ data: result.data });
      setStatus(response.ok === true ? "success" : "error");
    } catch { setStatus("error"); }
  }

  if (status === "success") return (
    <div role="status" className="mt-8 border-y border-primary/30 bg-primary/10 py-8 px-5">
      <CheckCircle2 className="size-8 text-primary" />
      <h3 className="mt-4 font-display text-2xl font-black">Your application has been saved.</h3>
      <p className="mt-3 leading-relaxed text-muted-foreground">Thank you for helping us build the circle. We may contact you about your application as the network develops. This is not a confirmed listing or a guarantee of session requests.</p>
    </div>
  );

  const fields = [
    { name: "name", label: "Name", max: 100, autoComplete: "name" },
    { name: "email", label: "Email", max: 254, type: "email", autoComplete: "email" },
    { name: "city", label: "City", max: 100, autoComplete: "address-level2" },
    { name: "country", label: "Country", max: 100, autoComplete: "country-name" },
    { name: "languages", label: "Session languages", max: 200, placeholder: "English, Spanish…" },
  ];

  return (
    <form onSubmit={onSubmit} noValidate className="mt-8 max-w-3xl space-y-6">
      <fieldset disabled={status === "sending"} className="grid min-w-0 gap-6 sm:grid-cols-2">
        {fields.map((field) => <div key={field.name} className={field.name === "languages" ? "sm:col-span-2" : ""}>
          <label htmlFor={`professional-${field.name}`} className="mb-2 block text-sm font-semibold">{field.label} <span className="text-primary">*</span></label>
          <Input id={`professional-${field.name}`} name={field.name} type={field.type || "text"} maxLength={field.max} autoComplete={field.autoComplete} placeholder={field.placeholder} required aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? `${field.name}-error` : undefined} className="h-11" />
          {errors[field.name] && <p id={`${field.name}-error`} className="mt-2 text-sm text-destructive">{errors[field.name]}</p>}
        </div>)}
        <div>
          <label htmlFor="professional-role" className="mb-2 block text-sm font-semibold">Professional role <span className="text-primary">*</span></label>
          <Select value={role} onValueChange={setRole} disabled={status === "sending"}>
            <SelectTrigger id="professional-role" className="h-11" aria-invalid={Boolean(errors["professionalRole"])} aria-describedby={errors["professionalRole"] ? "role-error" : undefined}><SelectValue placeholder="Choose your role" /></SelectTrigger>
            <SelectContent><SelectItem value="teacher">Laughter yoga teacher</SelectItem><SelectItem value="leader">Laughter yoga leader</SelectItem><SelectItem value="other">Other guided laughter professional</SelectItem></SelectContent>
          </Select>
          {errors["professionalRole"] && <p id="role-error" className="mt-2 text-sm text-destructive">{errors["professionalRole"]}</p>}
        </div>
        <div>
          <label htmlFor="professional-year" className="mb-2 block text-sm font-semibold">Certification year <span className="font-normal text-muted-foreground">(if applicable)</span></label>
          <Input id="professional-year" name="certificationYear" type="number" min={1900} max={9999} step={1} placeholder="e.g. 2020" className="h-11" aria-invalid={Boolean(errors["certificationYear"])} />
          {errors["certificationYear"] && <p className="mt-2 text-sm text-destructive">Enter a valid four-digit year, or leave it blank.</p>}
        </div>
        <fieldset className="sm:col-span-2">
          <legend className="mb-3 text-sm font-semibold">Session formats <span className="text-primary">*</span></legend>
          <div className="flex flex-wrap gap-6">{[{ value: "online", label: "Online" }, { value: "in_person", label: "In person" }].map((format) => <label key={format.value} className="flex cursor-pointer items-center gap-3 text-sm">
            <Checkbox checked={formats.includes(format.value)} onCheckedChange={(checked) => setFormats((current) => checked === true ? [...current, format.value] : current.filter((item) => item !== format.value))} aria-label={format.label} disabled={status === "sending"} />{format.label}
          </label>)}</div>
          {errors["sessionFormats"] && <p className="mt-2 text-sm text-destructive">{errors["sessionFormats"]}</p>}
        </fieldset>
        <div className="sm:col-span-2">
          <label htmlFor="professional-url" className="mb-2 block text-sm font-semibold">Website or professional profile <span className="font-normal text-muted-foreground">(optional)</span></label>
          <Input id="professional-url" name="professionalUrl" type="url" maxLength={500} placeholder="https://…" className="h-11" aria-invalid={Boolean(errors["professionalUrl"])} />
          {errors["professionalUrl"] && <p className="mt-2 text-sm text-destructive">{errors["professionalUrl"]}</p>}
        </div>
      </fieldset>
      <p className="text-sm leading-relaxed text-muted-foreground">We will store these details to consider your directory application and contact you about it. They will not be automatically published. Read our <Link to="/privacy" className="text-primary underline">Privacy Policy</Link>. For questions or to request deletion, email <a href="mailto:hello@laughtercircle.com" className="text-primary underline">hello@laughtercircle.com</a>.</p>
      {status === "error" && <p role="alert" className="text-sm text-destructive">We could not confirm that your application was saved. Please try again. Your details are still here.</p>}
      <Button type="submit" disabled={status === "sending"} size="lg" className="h-auto whitespace-normal rounded-full px-6 py-3.5 font-bold">{status === "sending" ? <><Loader2 className="size-4 animate-spin motion-reduce:animate-none" />Submitting…</> : <>Submit application <ArrowRight /></>}</Button>
      <p className="text-sm text-muted-foreground">Free to apply. No payment details required.</p>
    </form>
  );
}