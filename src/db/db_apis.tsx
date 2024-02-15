import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../config/supabase.config";
import { useSession } from "../context/SessionContext";
import { Database } from "../types/db";
import { CheckoutData } from "../types/types";

const queryClient = useQueryClient();

export const addToBasket = async (product_id: number) => {
  const { data: existingProduct, error } = await supabase
    .from("basket")
    .select("*")
    .eq("product_id", product_id);

  if (error) {
    alert(error.message);
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
};

export const useCartItems = () => {
  const session = useSession();
  return useQuery({
    queryKey: ["basket"],
    queryFn: async ({ signal }) => {
      let query = supabase
        .from("basket")
        .select("*")
        .eq("user_id", session?.user.id as string)
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
    enabled: Boolean(session),
  });
};

export const createOrder = async (checkout: CheckoutData) => {
  const session = useSession();
  session?.user.user_metadata;

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", session?.user.id as string);
  if (error) {
    return alert(error.message);
  }

  const { data: basketItems, error: basketError } = await supabase
    .from("basket")
    .select("*")
    .eq("user_id", session?.user.id as string);
  if (basketError) throw new Error(basketError.message);

  const { data: newOrder, error: orderError } = await supabase
    .from("orders")
    .upsert([
      {
        user_id: session?.user.id as string,
        shipping_address: user[0].shipping_address as string,
        payment_type: checkout.paymentType as string,
        order_total: checkout.total as number,
      },
    ])
    .returns<Database["public"]["Tables"]["orders"]["Row"][]>();
  if (orderError) {
    throw new Error(orderError.message);
  }

  const orderLines = basketItems.map((item) => ({
    order_id: newOrder[0].order_id,
    product_id: item.product_id,
    quantity: item.quantity,
    cost: item.price * item.quantity,
    price: item.price,
  }));

  await supabase.from("order_line").insert(orderLines);

  await supabase
    .from("basket")
    .delete()
    .eq("user_id", session?.user.id as string);

  queryClient.invalidateQueries({ queryKey: ["basket"] });
  return newOrder;
};

// const getCurrentBasket = async () => {
//   const {
//     data: currentBasket,
//     isLoading,
//     error,
//   } = await useQuery({
//     queryKey: ["basket"],
//     queryFn: async () => {
//       const session = useSession();
//       const { data: basketItems, error: basketError } = await supabase
//         .from("basket")
//         .select("*")
//         .eq("user_id", session?.user.id as string)
//         .returns<Database["public"]["Tables"]["basket"]["Row"][]>();
//     },
//   });

//   return { currentBasket, isLoading, error };
// };
