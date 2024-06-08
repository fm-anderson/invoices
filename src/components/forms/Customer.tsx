import { type ReactElement } from "react";
import { useForm } from "@tanstack/react-form";
import { customerSchema } from "./validationSchema";
import FormField from "./FormField";

interface CustomerFormData {
  name: string;
  address: string;
  email: string;
  phone: string;
}

export default function Customer(): ReactElement {
  const form = useForm<CustomerFormData>({
    defaultValues: {
      name: "",
      address: "",
      email: "",
      phone: "",
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData();
      Object.keys(value).forEach((key) => {
        formData.append(key, value[key as keyof CustomerFormData]);
      });
      try {
        const response = await fetch("/api/addCustomer", {
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error("Failed to add customer", error);
      }
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FormField
          form={form}
          name="name"
          schema={customerSchema.name}
          label="Name"
          placeholder="Bastinkie Thomson"
        />
        <FormField
          form={form}
          name="address"
          schema={customerSchema.address}
          label="Address"
          placeholder="99 Main St, San Francisco, CA 94016"
        />
        <FormField
          form={form}
          name="email"
          type="email"
          schema={customerSchema.email}
          label="Email"
          placeholder="name@email.com"
        />
        <FormField
          form={form}
          name="phone"
          schema={customerSchema.phone}
          label="Phone"
          placeholder="555 123 4567"
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit}
              className={`w-full bg-gray-200 py-2 ${isSubmitting ? "" : "hover:bg-gray-300"}`}
            >
              {isSubmitting ? "Creating..." : "Create Client"}
            </button>
          )}
        />
      </form>
    </div>
  );
}
