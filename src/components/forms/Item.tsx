import { type ReactElement } from "react";
import { useForm } from "@tanstack/react-form";
import { itemSchema } from "./validation/itemSchema";
import FormField from "./FormField";

interface ItemFormData {
  name: string;
  desc: string;
  price: string;
  sku: string;
}

export default function Item(): ReactElement {
  const form = useForm<ItemFormData>({
    defaultValues: {
      name: "",
      desc: "",
      price: "",
      sku: "",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      const formData = new FormData();
      Object.keys(value).forEach((key) => {
        formData.append(key, value[key as keyof ItemFormData]);
      });
      try {
        const response = await fetch("/api/addItem", {
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        console.log(result);
        form.reset();
      } catch (error) {
        console.error("Failed to add item", error);
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
          schema={itemSchema.name}
          label="Name"
          placeholder="32 - 55 TV Mount Installation"
        />
        <FormField
          form={form}
          name="desc"
          schema={itemSchema.desc}
          label="Description"
          placeholder="Item description"
        />
        <FormField
          form={form}
          name="price"
          schema={itemSchema.price}
          label="Price"
          placeholder="$119.00"
        />
        <FormField
          form={form}
          name="sku"
          schema={itemSchema.sku}
          label="Stock Keeping Unit"
          placeholder="SKU034"
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit}
              className={`w-full bg-gray-200 py-2 ${isSubmitting ? "" : "hover:bg-gray-300"}`}
            >
              {isSubmitting ? "Creating..." : "Create Item"}
            </button>
          )}
        />
      </form>
    </div>
  );
}
