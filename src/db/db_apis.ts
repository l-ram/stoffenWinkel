import { supabase } from "../config/supabase.config";

export const getBasket = async () => {};

export const addToBasket = async (productId: number) => {
  const { error } = await supabase
    .from("basket")
    .insert({ id: 1, name: "Denmark" });
};
