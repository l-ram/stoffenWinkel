import { useQuery } from "@tanstack/react-query";
import { supabase } from "../config/supabase.config";
import { Database } from "../types/db";
import { CheckoutData } from "../types/types";

export const addToBasket = async (product_id: number, user_id: string) => {
  if (!user_id) {
    return alert("Please login or register to add products to the basket");
  } else {
    const { data: existingProduct, error } = await supabase
      .from("basket")
      .select("*")
      .eq("product_id", product_id);

    if (error) {
      alert("Please login or register to add products to the basket");
      return;
    }

    if (existingProduct.length > 0) {
      console.log("product exists:", existingProduct);

      await supabase
        .from("basket")
        .update({ quantity: existingProduct[0].quantity + 1 })
        .eq("product_id", product_id);
    } else {
      console.log("product doesnt exist");
      const { data: catalog, error } = await supabase
        .from("catalog")
        .select("product_id, category_id, name, price, image_url")
        .eq("product_id", product_id);

      if (error) {
        alert(error.message);
        return;
      }

      console.log("selected from catalog:", catalog);

      if (catalog) {
        const { data, error } = await supabase
          .from("basket")
          .insert({
            product_id: catalog[0].product_id,
            image_url: catalog[0].image_url as string,
            quantity: 1,
            category_id: catalog[0].category_id as string,
            name: catalog[0].name as string,
            price: catalog[0].price as number,
          })
          .select("*");

        if (error) {
          alert(`${error.message} and ${error.details}`);
        }

        console.log("Basket:", data);
      }
    }
  }
};

export const useCartItems = (userId: string) => {
  return useQuery({
    queryKey: ["basket"],
    queryFn: async ({ signal }) => {
      let query = supabase
        .from("basket")
        .select("*")
        .eq("user_id", userId)
        .order("product_id")
        .returns<Database["public"]["Tables"]["basket"]["Row"][]>();

      if (signal) {
        query = query.abortSignal(signal);
      }

      const { data, error } = await query.throwOnError();
      if (error) {
        alert(error.message);
      }
      return data as unknown as Database["public"]["Tables"]["basket"]["Row"][];
    },
    enabled: Boolean(userId),
  });
};

export const useGetOrders = (userId: string) => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const orderData = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", userId)
        .returns<Database["public"]["Tables"]["orders"]["Row"][]>();
      return orderData;
    },
  });
};

export const createOrder = async (checkout: CheckoutData) => {
  console.log("does create order func run?");

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", checkout.user);
  if (error) {
    return alert(error.message);
  }

  console.log("user:", user);

  const { data: basketItems, error: basketError } = await supabase
    .from("basket")
    .select("*")
    .eq("user_id", checkout.user);
  if (basketError) throw new Error(basketError.message);

  console.log("basket items:", basketItems);

  const { data: newOrder, error: orderError } = await supabase
    .from("orders")
    .upsert([
      {
        user_id: checkout.user,
        shipping_address: user[0].shipping_address as string,
        payment_type: checkout.paymentType as string,
        order_total: checkout.total as number,
      },
    ])
    .select("*")
    .returns<Database["public"]["Tables"]["orders"]["Row"][]>();
  console.log("New order:", newOrder);
  if (orderError) {
    alert(orderError.message);
    throw new Error(orderError.message);
  }

  const orderLines = basketItems.map((item) => ({
    order_id: newOrder[0].order_id,
    product_id: item.product_id,
    quantity: item.quantity,
    cost: item.price * item.quantity,
    price: item.price,
  }));

  console.log("Order lines table! :", orderLines);

  await supabase.from("order_line").insert(orderLines);

  await supabase.from("basket").delete().eq("user_id", checkout.user);

  return newOrder;
};

export const useGetProducts = (
  page: number,
  itemsPerPage: number,
  category: string,
  sort: string | null
) => {
  return useQuery({
    queryKey: ["products", { page, category, sort }],
    queryFn: async () => {
      let query = supabase.from("catalog").select("*", { count: "exact" });

      if (category && category !== "All") {
        query = query.eq("category_id", category);
      }

      if (sort === "low") {
        query = query.order("price");
      } else if (sort === "high") {
        query = query.order("price", { ascending: false });
      } else {
        query = query.order("name");
      }

      const products = await query
        .range((page - 1) * itemsPerPage, page * itemsPerPage - 1)
        .order("price")
        .returns<Database["public"]["Tables"]["catalog"]["Row"][]>();

      return products;
    },
  });
};
