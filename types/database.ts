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
      profiles: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          mobile: string | null;
          role: "customer" | "admin";
          created_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          email: string;
          mobile?: string | null;
          role?: "customer" | "admin";
          created_at?: string;
        };
        Update: {
          full_name?: string;
          email?: string;
          mobile?: string | null;
          role?: "customer" | "admin";
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          image_url: string;
          gallery: string[];
          price: number;
          offer_price: number | null;
          category_id: string;
          stock_quantity: number;
          description: string;
          variant: string;
          active: boolean;
          created_at: string;
        };
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
