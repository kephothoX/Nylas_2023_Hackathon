export interface User {
  email: String;
  profile: Profile
}

export interface Profile {
  first_name: String;
  last_name: String;
  phone_number: String;
  username: String;
  bio: String;
  image_url: String;
  x_link?: String;
  facebook_link?: String;
  youtube_link?: String;
  instagram_link?: String;
  whatsapp_number?: String;
}

export interface AuthUser {
  auth_id: string;
}

export interface PangeaUser {
  id: String;
  email: string;
  disabled:boolean;
  created_at: Date;
  id_providers: {};
  last_login_city: String;
  last_login_country: String;
  last_login_ip: String;
  login_count: Number;
  mfa_providers: {};
  profile: {};
  require_mfa: Boolean;
  scopes: {};
  verified: Boolean;
}
