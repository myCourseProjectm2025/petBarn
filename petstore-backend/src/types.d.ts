export type Payment = {
  id: number;
  booking_id: number;
  payment_status: string;
  transaction_id: string;
  payment_method: string;
  amount: number;
  payment_gateway: string;
}

export type BrandType = {
  id: number;
  brand: string;
  created_at: string; // Timestamp with timezone, usually stored as ISO 8601 string
  sub_category: number;
  is_deleted: boolean;
};

export type CartType = {
  id: number;
  user_id: number;
  product_id: number;
};

export type CategoryType = {
  id: number;
  category: string;
  created_at: string; // Date stored as an ISO 8601 string
  is_deleted: boolean;
};

export type FavoriteType = {
  id: number;
  product_id: number;
  user_id: number;
};

export type FeedbackType = {
  id: number;
  user_id: number;
  reply: string;
  rating: number;
  created_at: string; // Date stored as an ISO 8601 string
  is_deleted: boolean;
};

export type LocationType = {
  id: number;
  country: string;
  city: string;
  address: string;
  longitude: string;
  latitude: string;
  created_at: string; // Date stored as an ISO 8601 string
  is_deleted: boolean;
};

export type OrderType = {
  id: number;
  user_id: number;
  amount: string;
  status: string;
  created_at: string; // Timestamp with timezone, stored as ISO 8601 string
  updated_at: string; // Timestamp with timezone, stored as ISO 8601 string
  is_deleted: boolean;
};


export type OrderItemType = {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  created_at: string; // Timestamp with timezone, stored as an ISO 8601 string
  is_deleted: boolean;
};

export type ProductBodyType = {
  amount: string;
  description: string;
  quantity: number;
  brand: number;
  image_url: string;
  product_name: string;
  user_id: number;
}


export type ProductType = {
  id: number;
  feedback: number;
  amount: string;
  description: string;
  quantity: number;
  brand: number;
  image_url: string;
  product_name: string;
  user_id: number;
  created_at: string; // Date stored as an ISO 8601 string
  is_deleted: boolean;
};

export type RecentlyViewedType = {
  id: number;
  product_id: number;
  user_id: number;
};

export type RoleType = {
  role: string;
};

export type SubCategoryType = {
  id: number;
  sub_category: string;
  category_id: number;
  is_deleted: boolean;
  created_at: string;  // Use string type for date representation
};

export type TransactionStatusType = {
  status: string;
};

export type TransactionsType = {
  id: number;
  created_at: string;  // timestamp with time zone
  payment_status: string;
  amount: string;
  payment_method: string;
  transaction_id: string;
  payment_gateway: string;
  order_id: number;
};
export type UserBodyType = {
  first_name: string;
  last_name: string;
  role: string;
  email: string;
  password: string;
  phone_number: string;
  address: number;
};

export type UserUpdateBodyType = {
  first_name: string;
  last_name: string;
  phone_number: string;
  password: string;
};

export type UsersType = {
  id: number;
  first_name: string;
  last_name: string;
  role: string;
  created_at: string;  // date
  email: string;
  password: string;
  is_deleted: boolean;
  address: number;
  phone_number: string;
  is_email_verified: boolean;
};
