import { supabase } from "../config/supabase.config";

export const getBasket = async () => {};

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
        .insert([
          {
            product_id: catalog[0].product_id,
            image_url: catalog[0].image_url as string,
            quantity: 1,
            category_id: catalog[0].category_id as string,
            name: catalog[0].name as string,
            price: catalog[0].price as number,
          },
        ])
        .select("*");

      if (error) {
        alert(`${error.message} and ${error.details}`);
      }

      console.log("Basket:", data);
    }
  }
};
