export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      basket: {
        Row: {
          category_id: string;
          date: string | null;
          image_url: string;
          name: string;
          price: number;
          product_id: number;
          quantity: number;
          user_id: string;
        };
        Insert: {
          category_id: string;
          date?: string | null;
          image_url: string;
          name: string;
          price: number;
          product_id: number;
          quantity: number;
          user_id?: string;
        };
        Update: {
          category_id?: string;
          date?: string | null;
          image_url?: string;
          name?: string;
          price?: number;
          product_id?: number;
          quantity?: number;
          user_id?: string;
        };
        Relationships: [];
      };
      catalog: {
        Row: {
          category_id: string | null;
          image_url: string | null;
          long_description: string | null;
          name: string | null;
          price: number | null;
          product_id: number;
          short_description: string | null;
        };
        Insert: {
          category_id?: string | null;
          image_url?: string | null;
          long_description?: string | null;
          name?: string | null;
          price?: number | null;
          product_id: number;
          short_description?: string | null;
        };
        Update: {
          category_id?: string | null;
          image_url?: string | null;
          long_description?: string | null;
          name?: string | null;
          price?: number | null;
          product_id?: number;
          short_description?: string | null;
        };
        Relationships: [];
      };
      order_line: {
        Row: {
          cost: number;
          order_id: number;
          order_line_id: number;
          price: number;
          product_id: number;
          quantity: number;
        };
        Insert: {
          cost: number;
          order_id: number;
          order_line_id?: number;
          price: number;
          product_id: number;
          quantity: number;
        };
        Update: {
          cost?: number;
          order_id?: number;
          order_line_id?: number;
          price?: number;
          product_id?: number;
          quantity?: number;
        };
        Relationships: [
          {
            foreignKeyName: "order_line_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["order_id"];
          }
        ];
      };
      orders: {
        Row: {
          order_date: string | null;
          order_id: number;
          order_total: number;
          payment_type: string;
          shipping_address: string;
          user_id: string;
        };
        Insert: {
          order_date?: string | null;
          order_id?: number;
          order_total: number;
          payment_type: string;
          shipping_address: string;
          user_id?: string;
        };
        Update: {
          order_date?: string | null;
          order_id?: number;
          order_total?: number;
          payment_type?: string;
          shipping_address?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["user_id"];
          }
        ];
      };
      product_rating: {
        Row: {
          date: string;
          product_id: number | null;
          rating: number;
        };
        Insert: {
          date: string;
          product_id?: number | null;
          rating: number;
        };
        Update: {
          date?: string;
          product_id?: number | null;
          rating?: number;
        };
        Relationships: [];
      };
      products: {
        Row: {
          category_id: number | null;
          image_url: string;
          long_description: string;
          name: string;
          price: number | null;
          product_id: number;
          short_description: string;
        };
        Insert: {
          category_id?: number | null;
          image_url: string;
          long_description: string;
          name: string;
          price?: number | null;
          product_id?: number;
          short_description: string;
        };
        Update: {
          category_id?: number | null;
          image_url?: string;
          long_description?: string;
          name?: string;
          price?: number | null;
          product_id?: number;
          short_description?: string;
        };
        Relationships: [];
      };
      reviews: {
        Row: {
          body: string;
          product_id: number;
          rating: number;
          review_id: number;
          timestamp: string | null;
          title: string;
          user_id: string;
        };
        Insert: {
          body: string;
          product_id: number;
          rating: number;
          review_id?: number;
          timestamp?: string | null;
          title: string;
          user_id: string;
        };
        Update: {
          body?: string;
          product_id?: number;
          rating?: number;
          review_id?: number;
          timestamp?: string | null;
          title?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reviews_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["product_id"];
          }
        ];
      };
      testOrder: {
        Row: {
          order_id: number;
          product: string;
          quantity: number;
          shipping_address: string | null;
          user_id: string;
        };
        Insert: {
          order_id?: number;
          product: string;
          quantity: number;
          shipping_address?: string | null;
          user_id?: string;
        };
        Update: {
          order_id?: number;
          product?: string;
          quantity?: number;
          shipping_address?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          birth_date: string | null;
          country: string | null;
          first_name: string | null;
          payment_type: string | null;
          second_name: string | null;
          shipping_address: string | null;
          user_id: string;
        };
        Insert: {
          birth_date?: string | null;
          country?: string | null;
          first_name?: string | null;
          payment_type?: string | null;
          second_name?: string | null;
          shipping_address?: string | null;
          user_id?: string;
        };
        Update: {
          birth_date?: string | null;
          country?: string | null;
          first_name?: string | null;
          payment_type?: string | null;
          second_name?: string | null;
          shipping_address?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      decrement: {
        Args: {
          x: number;
          id: number;
        };
        Returns: undefined;
      };
      increment: {
        Args: {
          x: number;
          id: number;
        };
        Returns: undefined;
      };
      increment1: {
        Args: {
          x: number;
          product_id: number;
        };
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
