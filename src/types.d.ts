export interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export interface IRoomPhotoPhoto {
  pk: string;
  file: string;
  description: string;
}

export interface IRoomList {
  id: number;
  name: string;
  country: string;
  imageUrl: string;
  city: string;
  price: number;
  rating: number;
  //   is_owner: boolean;
  reviews_count: number;
  photos: IRoomPhotoPhoto[];
}
export interface IRoomProps {
  id: number;
  imageUrl: string;
  name: string;
  rating: number;
  reviews_count: number;
  city: string;
  country: string;
  price: number;
}

export interface IRoomOwner {
  name: string;
  avatar: string;
  username: string;
}

export interface IAmenity {
  name: string;
  description: string;
}

export interface IRoomDetail extends IRoomList {
  created_at: string;
  updated_at: string;
  rooms: number;
  toilets: number;
  description: string;
  address: string;
  pet_friendly: true;
  kind: string;
  is_owner: boolean;
  is_liked: boolean;
  category: {
    name: string;
    kind: string;
  };
  owner: IRoomOwner;
  amenities: IAmenity[];
}

export interface IReview {
  payload: string;
  rating: number;
  user: IRoomOwner;
  created_at: string;
}

export interface IUser {
  last_login: string;
  username: string;
  email: string;
  date_joined: string;
  avatar: string;
  name: string;
  is_host: boolean;
  gender: string;
  language: string;
  currency: string;
}
export interface IFormLogIn {
  username: string;
  password: string;
}

export interface ISignUpVariables {
  username: string;
  password: string;
  name: string;
  email: string;
  // currency: string;
  // language: string;
  // gender: string;
}

export interface IUsernameLoginVariables {
  username: string;
  password: string;
}
export interface IUsernameSuccess {
  ok: string;
}
export interface IUsernameError {
  error: string;
}
