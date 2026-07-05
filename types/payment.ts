export type Payment = {
  id: string;
  orderNumber: string;
  provider: "Razorpay";
  providerOrderId: string;
  amount: number;
  status: "Created" | "Authorized" | "Captured" | "Failed" | "Refunded";
  createdAt: string;
};

export type RazorpayCreateOrderResponse = {
  id: string;
  amount: number;
  currency: "INR";
  receipt: string;
  demo: boolean;
};
