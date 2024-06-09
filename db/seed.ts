import { db, Customers, Items } from "astro:db";

export default async function () {
  await db.insert(Customers).values([
    {
      id: "SEEDLQLjMH4g9SlHdziwrHPzRy4RJqTC",
      name: "Bastinkie Thomson",
      address: "372 Main St, Kramson, CA 00048 (Apt 2)",
      email: "bastinkie.thomson@example.com",
      phone: "006 400 0306",
    },
    {
      id: "SEED0lGzvC6ZC5wr24HZ74WmJK87agsQ",
      name: "Mediphira Bailey",
      address: "15 Indian Hill Rd, Thozzt, CA 00080",
      email: "mediphira.bailey@example.com",
      phone: "050 200 2955",
    },
    {
      id: "SEEDflFcEmZIwPMYH2Df2X23whx4Jnm9",
      name: "Martinhella Hemmings",
      address: "31 Holton St, Agaris, CA 00055",
      email: "martinhella.hemmings@example.com",
      phone: "001 403 3335",
    },
  ]);

  await db.insert(Items).values([
    {
      id: "SEEDpjvi4sOgxeGP",
      sku: "TVM001",
      name: "32 - 55 TV Mount Installation",
      desc: "",
      price: 99.0,
    },
    {
      id: "SEEDoAMWHphnMink",
      sku: "TVM002",
      name: "56 - 75 TV Mount Installation",
      desc: "",
      price: 169.0,
    },
    {
      id: "SEEDrJNmkcYY49YZ",
      sku: "TVM003",
      name: "76 - 85 TV Mount Installation",
      desc: "",
      price: 239.0,
    },
    {
      id: "SEEDRUvtSnfeM6h5",
      sku: "CORD01",
      name: "Cord Masking (Up to 4 ft)",
      desc: "",
      price: 49.0,
    },
    // {
    //   id: "SEEDxXtTrBJo8rel",
    //   sku: "CORD002",
    //   name: "In-Wall Cord Concealment",
    //   desc: "",
    //   price: 149.0,
    // },
  ]);
}
