import { useSession } from "../context/SessionContext";
import { Database } from "../types/db";
import { useEffect, useState } from "react";
import { supabase } from "../config/supabase.config";

interface Basket {
  category_id: string;
  date_added: string | null;
  image_url: string;
  name: string;
  price: number;
  product_id: number;
  quantity: number;
  user_id: string;
}

const Basket = () => {
  const session = useSession();
  const [basket, setBasket] = useState<Basket | null>();

  useEffect(() => {
    const getBasket = async (user_id: string) => {
      const { data, error } = await supabase
        .from("basket")
        .select("*")
        .eq("user_id", user_id)
        .returns<Database["public"]["Tables"]["basket"]["Row"]>();
      setBasket(data);
      if (error) {
        alert(error.message);
      }
    };
    getBasket(session?.user.id as string);
  }, []);

  console.log(basket);

  return (
    <div>
      <h1>Shopping basket</h1>
    </div>
  );
};

export default Basket;
