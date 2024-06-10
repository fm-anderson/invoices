import { type ReactElement, useState, useEffect } from "react";
import type { TInvoiceForm, TItem } from "./types";
import { useForm } from "@tanstack/react-form";
import { invoiceSchema } from "./validation/invoiceSchema";
import Input from "./elements/Input";
import SubmitButton from "./elements/SubmitButton";

const initialItemState: TItem = {
  id: "",
  sku: "",
  name: "",
  desc: "",
  price: 0,
  quantity: 0,
};

export default function Invoice(): ReactElement {
  const [availableItems, setAvailableItems] = useState<Array<TItem>>([]);
  const [items, setItems] = useState<TItem[]>([initialItemState]);
  const [total, setTotal] = useState<number>(0);

  const form = useForm<TInvoiceForm>({
    defaultValues: {
      customer: "",
      date: "",
      dueDate: "",
      invItems: [],
    },
    onSubmit: async ({ value }) => {
      value.invItems = items;
      const invoiceData = {
        ...value,
        total,
      };
      console.log(invoiceData);

      const formData = new FormData();
      Object.keys(invoiceData).forEach((key) => {
        if (key !== "invItems") {
          const value = invoiceData[key as keyof typeof invoiceData];
          formData.append(key, value.toString());
        }
      });
      formData.append("invItems", JSON.stringify(invoiceData.invItems));

      try {
        const response = await fetch("/api/addInvoice", {
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        console.log(result);
        setItems([initialItemState]);
        form.reset();
      } catch (error) {
        console.error("Failed to add invoice", error);
      }
    },
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/getItems");
        const items = await response.json();
        setAvailableItems(items);
        console.log(availableItems);
      } catch (error) {
        console.error("Failed to fetch items", error);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const calculateTotal = () => {
      const newTotal = items.reduce((sum, item) => {
        const selectedItem = availableItems.find(
          (availableItem) => availableItem.id === item.id,
        );
        return sum + (selectedItem ? selectedItem.price * item.quantity : 0);
      }, 0);
      setTotal(newTotal);
    };

    calculateTotal();
  }, [items, availableItems]);

  const handleItemChange = (
    index: number,
    key: keyof TItem,
    value: string | number,
  ) => {
    setItems((prevItems) =>
      prevItems.map((item, i) => {
        if (i === index) {
          if (key === "id") {
            const selectedItem = availableItems.find(
              (availableItem) => availableItem.id === value,
            );
            if (selectedItem) {
              return { ...selectedItem, quantity: item.quantity };
            }
          }
          return { ...item, [key]: value };
        }
        return item;
      }),
    );
  };

  const addItem = () => {
    setItems((prevItems) => [...prevItems, { ...initialItemState }]);
  };

  const removeItem = (index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Input
          form={form}
          name="customer"
          schema={invoiceSchema.customer}
          label="Customer"
          placeholder="Customer ID"
        />
        <Input
          form={form}
          name="date"
          schema={invoiceSchema.date}
          label="Date"
          placeholder="Date"
        />
        <Input
          form={form}
          name="dueDate"
          schema={invoiceSchema.dueDate}
          label="Due Date"
          placeholder="Due Date"
        />

        <div>
          {items.map((item, index) => (
            <div key={index} className="mb-3 flex gap-2">
              <select
                className="w-full border bg-gray-50 p-2"
                value={item.id}
                onChange={(e) => handleItemChange(index, "id", e.target.value)}
              >
                <option value="" disabled>
                  Select an item
                </option>
                {availableItems.map((availableItem) => (
                  <option key={availableItem.id} value={availableItem.id}>
                    {availableItem.name}
                  </option>
                ))}
              </select>
              <input
                className="w-1/4 border bg-gray-50 p-2"
                placeholder="Quantity"
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", parseInt(e.target.value))
                }
              />
              <button
                className="btn btn-square"
                type="button"
                onClick={() => removeItem(index)}
              >
                Del
              </button>
            </div>
          ))}
          <button
            className="my-3 w-full bg-gray-200 py-2 hover:bg-gray-300"
            onClick={addItem}
            type="button"
          >
            Add item
          </button>
        </div>
        <SubmitButton
          form={form}
          title="Create Invoice"
          submittingTitle="Creating..."
        />
      </form>
    </div>
  );
}
