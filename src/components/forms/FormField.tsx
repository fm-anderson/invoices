import { type ReactElement } from "react";
import { FieldApi, FormApi, type DeepKeys } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { ZodSchema } from "zod";

interface FormFieldProps<TFormData> {
  form: FormApi<TFormData>;
  name: DeepKeys<TFormData>;
  schema: ZodSchema;
  label?: string;
  type?: string;
  placeholder: string;
}

export default function FormField<TFormData>({
  form,
  name,
  schema,
  label,
  type = "text",
  placeholder,
}: FormFieldProps<TFormData>): ReactElement {
  return (
    <div className="mb-3 flex flex-col">
      <form.Field
        name={name}
        validatorAdapter={zodValidator}
        validators={{ onChange: schema }}
        children={(field: FieldApi) => (
          <>
            <label htmlFor={field.name as string}>{label}</label>
            <input
              type={type}
              name={field.name as string}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="border bg-gray-50 p-2"
              placeholder={placeholder}
            />
            {field.state.meta.errors ? (
              <em role="alert" className="text-orange-800">
                {field.state.meta.errors.join(", ")}
              </em>
            ) : null}
          </>
        )}
      />
    </div>
  );
}
