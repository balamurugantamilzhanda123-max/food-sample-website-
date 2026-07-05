import type { Category, Product } from "@/types/product";
import type {
  Address,
  Order,
  RefundRequest,
  ReturnRequest
} from "@/types/order";
import type { Payment } from "@/types/payment";

export const categories: Category[] = [
  {
    id: "cat-fruits",
    name: "Fresh Fruits",
    slug: "fresh-fruits",
    description: "Seasonal fruits sourced daily from trusted farms.",
    imageUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=900&q=80",
    active: true
  },
  {
    id: "cat-vegetables",
    name: "Vegetables",
    slug: "vegetables",
    description: "Crisp vegetables packed for everyday cooking.",
    imageUrl:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80",
    active: true
  },
  {
    id: "cat-dairy",
    name: "Dairy",
    slug: "dairy",
    description: "Milk, paneer, curd, butter, and breakfast staples.",
    imageUrl:
      "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=900&q=80",
    active: true
  },
  {
    id: "cat-pantry",
    name: "Pantry",
    slug: "pantry",
    description: "Daily essentials, grains, oils, snacks, and spices.",
    imageUrl:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80",
    active: true
  }
];

export const products: Product[] = [
  {
    id: "prod-alphonso-mango",
    name: "Alphonso Mango Box",
    slug: "alphonso-mango-box",
    imageUrl:
      "https://images.unsplash.com/photo-1605027990121-cbae9e0642df?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1605027990121-cbae9e0642df?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=900&q=80"
    ],
    price: 999,
    offerPrice: 849,
    categoryId: "cat-fruits",
    categoryName: "Fresh Fruits",
    stockQuantity: 42,
    description:
      "Premium handpicked Alphonso mangoes, naturally ripened and packed in a sturdy gift-ready box.",
    variant: "12 pcs",
    freshness: "Farm packed today",
    active: true,
    featured: true,
    rating: 4.8,
    tags: ["Seasonal", "Best Seller"]
  },
  {
    id: "prod-banana",
    name: "Robusta Banana",
    slug: "robusta-banana",
    imageUrl:
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=900&q=80"
    ],
    price: 74,
    offerPrice: 59,
    categoryId: "cat-fruits",
    categoryName: "Fresh Fruits",
    stockQuantity: 120,
    description:
      "Naturally sweet bananas ideal for breakfast bowls, smoothies, and everyday snacking.",
    variant: "1 kg",
    freshness: "Ripeness checked",
    active: true,
    featured: true,
    rating: 4.6,
    tags: ["Value Pack"]
  },
  {
    id: "prod-tomato",
    name: "Hybrid Tomato",
    slug: "hybrid-tomato",
    imageUrl:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=900&q=80"
    ],
    price: 48,
    offerPrice: 39,
    categoryId: "cat-vegetables",
    categoryName: "Vegetables",
    stockQuantity: 95,
    description:
      "Firm, juicy tomatoes selected for curries, salads, chutneys, and sauces.",
    variant: "500 g",
    freshness: "Morning market batch",
    active: true,
    featured: false,
    rating: 4.4,
    tags: ["Daily Need"]
  },
  {
    id: "prod-spinach",
    name: "Cleaned Spinach",
    slug: "cleaned-spinach",
    imageUrl:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=900&q=80"
    ],
    price: 39,
    offerPrice: null,
    categoryId: "cat-vegetables",
    categoryName: "Vegetables",
    stockQuantity: 36,
    description:
      "Washed spinach bunches packed for quick cooking, soups, and healthy bowls.",
    variant: "250 g",
    freshness: "Washed and bundled",
    active: true,
    featured: true,
    rating: 4.5,
    tags: ["Leafy Greens"]
  },
  {
    id: "prod-paneer",
    name: "Fresh Malai Paneer",
    slug: "fresh-malai-paneer",
    imageUrl:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80"
    ],
    price: 180,
    offerPrice: 159,
    categoryId: "cat-dairy",
    categoryName: "Dairy",
    stockQuantity: 28,
    description:
      "Soft and creamy paneer made from fresh milk for gravies, starters, and rolls.",
    variant: "200 g",
    freshness: "Cold-chain packed",
    active: true,
    featured: true,
    rating: 4.7,
    tags: ["Protein Rich"]
  },
  {
    id: "prod-ghee",
    name: "A2 Cow Ghee",
    slug: "a2-cow-ghee",
    imageUrl:
      "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=900&q=80"
    ],
    price: 699,
    offerPrice: 629,
    categoryId: "cat-pantry",
    categoryName: "Pantry",
    stockQuantity: 18,
    description:
      "Traditional slow-cooked ghee with a rich aroma, ideal for cooking and sweets.",
    variant: "500 ml",
    freshness: "Sealed jar",
    active: true,
    featured: false,
    rating: 4.9,
    tags: ["Premium"]
  },
  {
    id: "prod-basmati",
    name: "Aged Basmati Rice",
    slug: "aged-basmati-rice",
    imageUrl:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80"
    ],
    price: 599,
    offerPrice: 529,
    categoryId: "cat-pantry",
    categoryName: "Pantry",
    stockQuantity: 64,
    description:
      "Long-grain basmati aged for aroma and fluffy texture in biryani and pulao.",
    variant: "5 kg",
    freshness: "Aged grain",
    active: true,
    featured: true,
    rating: 4.6,
    tags: ["Family Pack"]
  },
  {
    id: "prod-milk",
    name: "Organic Full Cream Milk",
    slug: "organic-full-cream-milk",
    imageUrl:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=900&q=80"
    ],
    price: 78,
    offerPrice: null,
    categoryId: "cat-dairy",
    categoryName: "Dairy",
    stockQuantity: 88,
    description:
      "Fresh full cream milk delivered chilled for tea, coffee, desserts, and breakfast.",
    variant: "1 L",
    freshness: "Chilled delivery",
    active: true,
    featured: false,
    rating: 4.5,
    tags: ["Morning Essential"]
  }
];

export const addresses: Address[] = [
  {
    id: "addr-home",
    label: "Home",
    recipientName: "Aarav Sharma",
    mobile: "+91 98765 43210",
    line1: "Flat 12B, Blue Ridge Apartments",
    line2: "Near City Garden",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560001",
    isDefault: true
  },
  {
    id: "addr-office",
    label: "Office",
    recipientName: "Aarav Sharma",
    mobile: "+91 98765 43210",
    line1: "Level 4, Orion Tech Park",
    line2: "MG Road",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560025",
    isDefault: false
  }
];

export const orders: Order[] = [
  {
    id: "ord-001",
    orderNumber: "FC-2026-1001",
    customerName: "Aarav Sharma",
    email: "aarav@example.com",
    mobile: "+91 98765 43210",
    address: addresses[0],
    items: [
      {
        id: "item-1",
        productName: "Alphonso Mango Box",
        productImage:
          "https://images.unsplash.com/photo-1605027990121-cbae9e0642df?auto=format&fit=crop&w=500&q=80",
        variant: "12 pcs",
        quantity: 1,
        price: 849
      },
      {
        id: "item-2",
        productName: "Fresh Malai Paneer",
        productImage:
          "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=500&q=80",
        variant: "200 g",
        quantity: 2,
        price: 159
      }
    ],
    subtotal: 1167,
    deliveryFee: 40,
    discount: 75,
    total: 1132,
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    createdAt: "2026-07-01T10:30:00.000Z",
    invoiceUrl: "#"
  },
  {
    id: "ord-002",
    orderNumber: "FC-2026-1002",
    customerName: "Aarav Sharma",
    email: "aarav@example.com",
    mobile: "+91 98765 43210",
    address: addresses[1],
    items: [
      {
        id: "item-3",
        productName: "Aged Basmati Rice",
        productImage:
          "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80",
        variant: "5 kg",
        quantity: 1,
        price: 529
      },
      {
        id: "item-4",
        productName: "Organic Full Cream Milk",
        productImage:
          "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=500&q=80",
        variant: "1 L",
        quantity: 2,
        price: 78
      }
    ],
    subtotal: 685,
    deliveryFee: 35,
    discount: 30,
    total: 690,
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    createdAt: "2026-07-04T08:15:00.000Z",
    invoiceUrl: "#"
  }
];

export const returnRequests: ReturnRequest[] = [
  {
    id: "ret-001",
    orderNumber: "FC-2026-1001",
    customerName: "Aarav Sharma",
    reason: "Item quality issue",
    status: "Requested",
    createdAt: "2026-07-02T11:10:00.000Z"
  }
];

export const refundRequests: RefundRequest[] = [
  {
    id: "ref-001",
    orderNumber: "FC-2026-1001",
    customerName: "Aarav Sharma",
    amount: 318,
    reason: "Return approved for paneer packs",
    status: "Processing",
    createdAt: "2026-07-03T09:45:00.000Z"
  }
];

export const payments: Payment[] = [
  {
    id: "pay-001",
    orderNumber: "FC-2026-1001",
    provider: "Razorpay",
    providerOrderId: "order_demo_1001",
    amount: 1132,
    status: "Captured",
    createdAt: "2026-07-01T10:32:00.000Z"
  },
  {
    id: "pay-002",
    orderNumber: "FC-2026-1002",
    provider: "Razorpay",
    providerOrderId: "order_demo_1002",
    amount: 690,
    status: "Captured",
    createdAt: "2026-07-04T08:16:00.000Z"
  }
];

export const customers = [
  {
    id: "cus-001",
    name: "Aarav Sharma",
    email: "aarav@example.com",
    mobile: "+91 98765 43210",
    orders: 8,
    totalSpend: 9240,
    role: "customer"
  },
  {
    id: "cus-002",
    name: "Meera Iyer",
    email: "meera@example.com",
    mobile: "+91 90123 45678",
    orders: 5,
    totalSpend: 5120,
    role: "customer"
  },
  {
    id: "cus-003",
    name: "Admin User",
    email: "admin@example.com",
    mobile: "+91 90000 00000",
    orders: 0,
    totalSpend: 0,
    role: "admin"
  }
];

export const dashboardMetrics = {
  totalProducts: products.length,
  totalOrders: 128,
  totalSales: 342800,
  pendingOrders: 12,
  deliveredOrders: 93,
  returnRequests: returnRequests.length,
  refundRequests: refundRequests.length
};
