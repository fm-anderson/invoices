import type { APIRoute } from "astro";
import { db, Customers } from "astro:db";
import { generateId, getFullAddress } from "../../utils/helper";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const id = generateId(32) as string;
  const name = (data.get("name") as string).trim();
  const address = (data.get("address") as string).trim();
  const unit = (data.get("unit") as string).trim();
  const email = (data.get("email") as string).trim();
  const phone = (data.get("phone") as string).trim();

  if (!name || !address || !email || !phone) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 },
    );
  }

  const fullAddress = getFullAddress(address, unit);
  const newCustomer = { id, name, address: fullAddress, email, phone };

  try {
    await db.insert(Customers).values(newCustomer);
    return new Response(
      JSON.stringify({
        message: "Customer added successfully",
      }),
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({
          message: `Failed to add customer: ${error.message}`,
        }),
        { status: 500 },
      );
    } else {
      return new Response(
        JSON.stringify({
          message: "An unknown error occurred",
        }),
        { status: 500 },
      );
    }
  }
};
