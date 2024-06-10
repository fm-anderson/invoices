import { type ReactElement } from "react";
import { FormApi } from "@tanstack/react-form";

interface FormFieldProps<TFormData> {
  form: FormApi<TFormData>;
  title: string;
  submittingTitle: string;
}

export default function SubmitButton<TFormData>({
  form,
  title,
  submittingTitle,
}: FormFieldProps<TFormData>): ReactElement {
  return (
    <form.Subscribe
      selector={(state) => [state.canSubmit, state.isSubmitting]}
      children={([canSubmit, isSubmitting]) => (
        <button
          type="submit"
          disabled={!canSubmit}
          className={`w-full bg-gray-200 py-2 ${isSubmitting ? "" : "hover:bg-gray-300"}`}
        >
          {isSubmitting ? submittingTitle : title}
        </button>
      )}
    />
  );
}
