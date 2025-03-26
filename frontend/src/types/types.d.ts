export interface BaseEntity {
  id: string;
}

export interface Permission extends BaseEntity {
  permission_name: string;
}

export interface Role extends BaseEntity {
  role_name: "admin" | "consumer" | "seller"; 
  permissions: Permission[];
}
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface LocationType {
  name: string;
  coordinates: Coordinates;
}

export interface UserType {
  firstName: string;
  lastName: string;
  email: string;
  address: LocationType;
  phone: string;
  password: string;
  role: "admin" | "consumer" | "seller";
}




export interface Categories{
    category_name:"pets"|"foods"|"supplies"|"Services"|"VetsCorner";
}