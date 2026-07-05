```typescript
// 1 // *CIDO - DOSYA - auth.ts - Tip Tanımları - TS Güvenli - Zorunlu Tip - Sıfır Hata
// 2 // *CIDO - BÖLÜM - 1 - JWT Payload - Auth Yapısı - JWT Tip - Zorunlu Alan - Serde
// 3 export interface JWTPayload {
// 4   sub: string;
// 5   tenant_id: string;
// 6   role: UserRole;
// 7   exp: number;
// 8   iat: number;
// 9   iss?: string;
// 10   aud?: string;
// 11   jti?: string;
// 12 }
// 13 // *CIDO - BÖLÜM - 1 - EK - JWT Payload Validasyon - JWT Doğrulama Kuralları - Zorunlu Kontrol - Serde
// 14 export const JWTPayloadConstraints = {
// 15   sub: { required: true, minLength: 1, maxLength: 255, pattern: '^[a-zA-Z0-9_-]+$' },
// 16   tenant_id: { required: true, minLength: 36, maxLength: 36, pattern: '^[a-f0-9-]+$' },
// 17   role: { required: true, enum: UserRole },
// 18   exp: { required: true, min: 1, max: 9999999999 },
// 19   iat: { required: true, min: 1, max: 9999999999 },
// 20   iss: { required: false, minLength: 1, maxLength: 255 },
// 21   aud: { required: false, minLength: 1, maxLength: 255 },
// 22   jti: { required: false, minLength: 1, maxLength: 255 },
// 23 } as const;
// 24 // *CIDO - BÖLÜM - 2 - Session Tipi - Oturum Yönetimi - Session Tip - KV Depo - Serde
// 25 export interface Session {
// 26   id: string;
// 27   user_id: string;
// 28   tenant_id: string;
// 29   token: string;
// 30   expires_at: number;
// 31   created_at: number;
// 32   ip_address?: string;
// 33   user_agent?: string;
// 34   is_active: boolean;
// 35 }
// 36 // *CIDO - BÖLÜM - 2 - EK - Session Validasyon - Oturum Doğrulama Kuralları - KV Depo Kontrol - Serde
// 37 export const SessionConstraints = {
// 38   id: { required: true, minLength: 36, maxLength: 36, pattern: '^[a-f0-9-]+$' },
// 39   user_id: { required: true, minLength: 1, maxLength: 255 },
// 40   tenant_id: { required: true, minLength: 36, maxLength: 36, pattern: '^[a-f0-9-]+$' },
// 41   token: { required: true, minLength: 10, maxLength: 4096 },
// 42   expires_at: { required: true, min: 1, max: 9999999999 },
// 43   created_at: { required: true, min: 1, max: 9999999999 },
// 44   ip_address: { required: false, pattern: '^[0-9.]+$' },
// 45   user_agent: { required: false, maxLength: 512 },
// 46   is_active: { required: true },
// 47 } as const;
// 48 // *CIDO - BÖLÜM - 3 - User Rol Tipleri - Yetkilendirme - Rol Tip - Zorunlu Enum - Serde
// 49 export enum UserRole {
// 50   Admin = "admin",
// 51   TenantOwner = "tenant_owner",
// 52   Viewer = "viewer",
// 53   Customer = "customer",
// 54   Guest = "guest",
// 55 }
// 56 // *CIDO - BÖLÜM - 3 - EK - User Role Guard - Rol Doğrulama Fonksiyonu - Runtime Kontrol - Serde
// 57 export function isValidUserRole(value: unknown): value is UserRole {
// 58   if (typeof value !== 'string') return false;
// 59   const validRoles: string[] = [UserRole.Admin, UserRole.TenantOwner, UserRole.Viewer, UserRole.Customer, UserRole.Guest];
// 60   return validRoles.includes(value);
// 61 }
// 62 // *CIDO - BÖLÜM - 3 - EK - User Role Meta - Rol Metadata Bilgisi - Açıklama Sıralama - Serde
// 63 export const UserRoleMeta: Record<UserRole, { label: string; rank: number; description: string }> = {
// 64   [UserRole.Admin]: { label: 'Administrator', rank: 0, description: 'Tam yetkili sistem yöneticisi' },
// 65   [UserRole.TenantOwner]: { label: 'Tenant Owner', rank: 1, description: 'Kiracı sahibi ve yöneticisi' },
// 66   [UserRole.Viewer]: { label: 'Viewer', rank: 2, description: 'Salt okunur izinlere sahip kullanıcı' },
// 67   [UserRole.Customer]: { label: 'Customer', rank: 3, description: 'Standart müşteri kullanıcısı' },
// 68   [UserRole.Guest]: { label: 'Guest', rank: 4, description: 'Kimlik doğrulaması yapılmamış ziyaretçi' },
// 69 };
// 70 // *CIDO - BÖLÜM - 4 - API Anahtar Tipleri - Kimlik Doğrulama - API Tip - Şifreleme - Serde
// 71 export interface ApiKey {
// 72   id: string;
// 73   tenant_id: string;
// 74   name: string;
// 75   key: string;
// 76   hashed_key: string;
// 77   permissions: string[];
// 78   expires_at?: number;
// 79   created_at: number;
// 80   last_used_at?: number;
// 81   is_active: boolean;
// 82 }
// 83 // *CIDO - BÖLÜM - 4 - EK - ApiKey Validasyon - API Anahtar Doğrulama - Şifreleme Kontrol - Serde
// 84 export const ApiKeyConstraints = {
// 85   id: { required: true, minLength: 36, maxLength: 36 },
// 86   tenant_id: { required: true, minLength: 36, maxLength: 36 },
// 87   name: { required: true, minLength: 1, maxLength: 128 },
// 88   key: { required: true, minLength: 16, maxLength: 512 },
// 89   hashed_key: { required: true, minLength: 64, maxLength: 512 },
// 90   permissions: { required: true, minLength: 1, maxLength: 50 },
// 91   expires_at: { required: false, min: 1 },
// 92   created_at: { required: true, min: 1 },
// 93   last_used_at: { required: false, min: 1 },
// 94   is_active: { required: true },
// 95 } as const;
// 96 // *CIDO - BÖLÜM - 4 - EK - ApiKey Guard - Anahtar Doğrulama Fonksiyonu - Runtime Tip Kontrol - Serde
// 97 export function isApiKey(value: unknown): value is ApiKey {
// 98   if (typeof value !== 'object' || value === null) return false;
// 99   const key = value as Record<string, unknown>;
// 100   return typeof key.id === 'string' && typeof key.tenant_id === 'string' && typeof key.name === 'string' && typeof key.is_active === 'boolean';
// 101 }
// 102 // *CIDO - BÖLÜM - 5 - Kullanıcı Tipi - Kimlik Bilgisi - Kullanıcı Tip - Zorunlu Alan - Serde
// 103 export interface User {
// 104   id: string;
// 105   tenant_id: string;
// 106   email: string;
// 107   name: string;
// 108   role: UserRole;
// 109   avatar_url?: string;
// 110   created_at: number;
// 111   updated_at: number;
// 112   is_active: boolean;
// 113   last_login_at?: number;
// 114 }
// 115 // *CIDO - BÖLÜM - 5 - EK - User Validasyon - Kullanıcı Doğrulama Kuralları - Zorunlu Alan Kontrol - Serde
// 116 export const UserConstraints = {
// 117   id: { required: true, minLength: 36, maxLength: 36, pattern: '^[a-f0-9-]+$' },
// 118   tenant_id: { required: true, minLength: 36, maxLength: 36, pattern: '^[a-f0-9-]+$' },
// 119   email: { required: true, minLength: 5, maxLength: 255, pattern: '^[^@]+@[^@]+\\.[^@]+$' },
// 120   name: { required: true, minLength: 2, maxLength: 100 },
// 121   role: { required: true, enum: UserRole },
// 122   avatar_url: { required: false, maxLength: 2048 },
// 123   created_at: { required: true, min: 1, max: 9999999999 },
// 124   updated_at: { required: true, min: 1, max: 9999999999 },
// 125   is_active: { required: true },
// 126   last_login_at: { required: false, min: 1, max: 9999999999 },
// 127 } as const;
// 128 // *CIDO - BÖLÜM - 5 - EK - User Guard - Kullanıcı Doğrulama Fonksiyonu - Runtime Kontrol - Serde
// 129 export function isUser(value: unknown): value is User {
// 130   if (typeof value !== 'object' || value === null) return false;
// 131   const user = value as Record<string, unknown>;
// 132   return typeof user.id === 'string' && typeof user.tenant_id === 'string' && typeof user.email === 'string' && String(user.email).includes('@') && typeof user.name === 'string' && String(user.name).length >= 2 && typeof user.role === 'string' && typeof user.created_at === 'number' && typeof user.updated_at === 'number' && typeof user.is_active === 'boolean';
// 133 }
// 134 // *CIDO - BÖLÜM - 6 - Refresh Token - Token Yenileme - Refresh Tip - Güvenli Token - Serde
// 135 export interface RefreshToken {
// 136   id: string;
// 137   user_id: string;
// 138   tenant_id: string;
// 139   token: string;
// 140   expires_at: number;
// 141   created_at: number;
// 142   revoked_at?: number;
// 143 }
// 144 // *CIDO - BÖLÜM - 6 - EK - Refresh Token Validasyon - Token Yenileme Kuralları - Güvenli Token Kontrol - Serde
// 145 export const RefreshTokenConstraints = {
// 146   id: { required: true, minLength: 36, maxLength: 36 },
// 147   user_id: { required: true, minLength: 1, maxLength: 255 },
// 148   tenant_id: { required: true, minLength: 36, maxLength: 36 },
// 149   token: { required: true, minLength: 10, maxLength: 4096 },
// 150   expires_at: { required: true, min: 1, max: 9999999999 },
// 151   created_at: { required: true, min: 1, max: 9999999999 },
// 152   revoked_at: { required: false, min: 1, max: 9999999999 },
// 153 } as const;
// 154 // *CIDO - BÖLÜM - 7 - Auth Response - Yanıt Formatı - Auth Yanıt - Standart JSON - Serde
// 155 export interface AuthResponse {
// 156   access_token: string;
// 157   refresh_token: string;
// 158   expires_in: number;
// 159   token_type: string;
// 160   user: User;
// 161   tenant_id: string;
// 162 }
// 163 // *CIDO - BÖLÜM - 7 - EK - Auth Response Validasyon - Yanıt Doğrulama Kuralları - Standart JSON Kontrol - Serde
// 164 export const AuthResponseConstraints = {
// 165   access_token: { required: true, minLength: 10, maxLength: 4096 },
// 166   refresh_token: { required: true, minLength: 10, maxLength: 4096 },
// 167   expires_in: { required: true, min: 1, max: 86400 },
// 168   token_type: { required: true, minLength: 1, maxLength: 50 },
// 169   user: { required: true },
// 170   tenant_id: { required: true, minLength: 36, maxLength: 36 },
// 171 } as const;
// 172 // *CIDO - BÖLÜM - 8 - Login Request - Giriş İsteği - Login İstek - Doğrulama - Serde
// 173 export interface LoginRequest {
// 174   email: string;
// 175   password: string;
// 176   tenant_id?: string;
// 177 }
// 178 // *CIDO - BÖLÜM - 8 - EK - Login Request Validasyon - Giriş Doğrulama Kuralları - Parola Kontrol - Serde
// 179 export const LoginRequestConstraints = {
// 180   email: { required: true, minLength: 5, maxLength: 255, pattern: '^[^@]+@[^@]+\\.[^@]+$' },
// 181   password: { required: true, minLength: 8, maxLength: 128 },
// 182   tenant_id: { required: false, minLength: 36, maxLength: 36 },
// 183 } as const;
// 184 // *CIDO - BÖLÜM - 9 - Register Request - Kayıt İsteği - Kayıt İstek - Tenant Oluştur - Serde
// 185 export interface RegisterRequest {
// 186   email: string;
// 187   password: string;
// 188   name: string;
// 189   tenant_slug: string;
// 190   role?: UserRole;
// 191 }
// 192 // *CIDO - BÖLÜM - 9 - EK - Register Request Validasyon - Kayıt Doğrulama Kuralları - Slug Kontrol - Serde
// 193 export const RegisterRequestConstraints = {
// 194   email: { required: true, minLength: 5, maxLength: 255, pattern: '^[^@]+@[^@]+\\.[^@]+$' },
// 195   password: { required: true, minLength: 8, maxLength: 128 },
// 196   name: { required: true, minLength: 2, maxLength: 100 },
// 197   tenant_slug: { required: true, minLength: 3, maxLength: 50, pattern: '^[a-z0-9-]+$' },
// 198   role: { required: false, enum: UserRole },
// 199 } as const;
// 200 // *CIDO - BÖLÜM - 10 - ApiKey Request - Anahtar Yönetimi - Anahtar İstek - İzin Kontrol - Serde
// 201 export interface ApiKeyRequest {
// 202   name: string;
// 203   permissions: string[];
// 204   expires_in_days?: number;
// 205 }
// 206 // *CIDO - BÖLÜM - 10 - EK - ApiKey Request Validasyon - Anahtar İstek Kuralları - İzin Kontrol - Serde
// 207 export const ApiKeyRequestConstraints = {
// 208   name: { required: true, minLength: 1, maxLength: 128 },
// 209   permissions: { required: true, minLength: 1, maxLength: 50 },
// 210   expires_in_days: { required: false, min: 1, max: 365 },
// 211 } as const;
// 212 // *CIDO - BÖLÜM - 11 - ApiKey Response - Anahtar Yanıt - Yanıt Anahtar - Gösterim - Serde
// 213 export interface ApiKeyResponse {
// 214   id: string;
// 215   name: string;
// 216   key: string;
// 217   permissions: string[];
// 218   expires_at?: number;
// 219   created_at: number;
// 220 }
// 221 // *CIDO - BÖLÜM - 12 - Validate Token - Doğrulama Sonucu - Token Kontrol - Geçerlilik - Serde
// 222 export interface TokenValidationResult {
// 223   valid: boolean;
// 224   user_id?: string;
// 225   tenant_id?: string;
// 226   role?: UserRole;
// 227   error?: string;
// 228   iat?: number;
// 229   exp?: number;
// 230 }
// 231 // *CIDO - BÖLÜM - 13 - Permission - İzin Tanımı - İzin Tip - String Enum - Serde
// 232 export enum Permission {
// 233   ProductsRead = "products:read",
// 234   ProductsWrite = "products:write",
// 235   ProductsDelete = "products:delete",
// 236   OrdersRead = "orders:read",
// 237   OrdersWrite = "orders:write",
// 238   OrdersDelete = "orders:delete",
// 239   CustomersRead = "customers:read",
// 240   CustomersWrite = "customers:write",
// 241   CustomersDelete = "customers:delete",
// 242   SettingsRead = "settings:read",
// 243   SettingsWrite = "settings:write",
// 244   AiRead = "ai:read",
// 245   AiWrite = "ai:write",
// 246   AnalyticsRead = "analytics:read",
// 247   AnalyticsWrite = "analytics:write",
// 248   InventoryRead = "inventory:read",
// 249   InventoryWrite = "inventory:write",
// 250   WebhooksRead = "webhooks:read",
// 251   WebhooksWrite = "webhooks:write",
// 252   UsersRead = "users:read",
// 253   UsersWrite = "users:write",
// 254   UsersDelete = "users:delete",
// 255 }
// 256 // *CIDO - BÖLÜM - 13 - EK - Permission Validasyon - İzin Doğrulama Fonksiyonu - String Enum Kontrol - Serde
// 257 export function isValidPermission(value: unknown): value is Permission {
// 258   if (typeof value !== 'string') return false;
// 259   const validPerms: string[] = Object.values(Permission);
// 260   return validPerms.includes(value);
// 261 }
// 262 // *CIDO - BÖLÜM - 14 - RolePermission - Rol İzinleri - Rol İzin - Eşleme Tablosu - Serde
// 263 export interface RolePermission {
// 264   role: UserRole;
// 265   permissions: Permission[];
// 266 }
// 267 // *CIDO - BÖLÜM - 14 - EK - Varsayılan Rol İzin Eşlemesi - Rol Bazlı İzin Ataması - Sabit Tanım - Serde
// 268 export const DefaultRolePermissions: RolePermission[] = [
// 269   { role: UserRole.Admin, permissions: Object.values(Permission) },
// 270   { role: UserRole.TenantOwner, permissions: [Permission.ProductsRead, Permission.ProductsWrite, Permission.OrdersRead, Permission.OrdersWrite, Permission.CustomersRead, Permission.SettingsRead] },
// 271   { role: UserRole.Viewer, permissions: [Permission.ProductsRead, Permission.OrdersRead, Permission.CustomersRead] },
// 272   { role: UserRole.Customer, permissions: [Permission.ProductsRead, Permission.OrdersRead] },
// 273   { role: UserRole.Guest, permissions: [Permission.ProductsRead] },
// 274 ];
// 275 // *CIDO - BÖLÜM - 15 - AuthError - Hata Tipi - Hata Tip - Standart Kod - Serde
// 276 export interface AuthError {
// 277   code: string;
// 278   message: string;
// 279   status: number;
// 280 }
// 281 // *CIDO - BÖLÜM - 15 - EK - DomainError Generic - Genel Domain Hatası - Merkezi Hata Yönetimi - Serde
// 282 export interface DomainError<T = never> {
// 283   code: string;
// 284   message: string;
// 285   status: number;
// 286   timestamp: number;
// 287   request_id: string;
// 288   details?: T;
// 289   stack?: string;
// 290   is_retryable: boolean;
// 291   user_friendly_message: string;
// 292   error_id: string;
// 293 }
// 294 // *CIDO - BÖLÜM - 15 - EK - AuthErrorDetail - Auth Hata Detayı - Başarısız Deneme Kilitleme - Serde
// 295 export interface AuthErrorDetail {
// 296   failed_attempts?: number;
// 297   remaining_attempts?: number;
// 298   lockout_until?: number;
// 299   invalid_fields?: string[];
// 300 }
// 301 // *CIDO - BÖLÜM - 16 - MagicLink - Sihirli Link - Magic Link - Token Tabanlı - Serde
// 302 export interface MagicLink {
// 303   id: string;
// 304   email: string;
// 305   tenant_id: string;
// 306   token: string;
// 307   expires_at: number;
// 308   created_at: number;
// 309   used_at?: number;
// 310 }
// 311 // *CIDO - BÖLÜM - 17 - TwoFactor - İki Faktör - 2FA Tip - Güvenlik Katmanı - Serde
// 312 export interface TwoFactorSetup {
// 313   secret: string;
// 314   qr_code: string;
// 315   backup_codes: string[];
// 316 }
// 317 export interface TwoFactorVerify {
// 318   code: string;
// 319   recovery_code?: string;
// 320 }
// 321 // *CIDO - BÖLÜM - 17 - EK - TwoFactor Validasyon - İki Faktör Doğrulama Kuralları - TOTP Kontrol - Serde
// 322 export const TwoFactorConstraints = {
// 323   secret: { required: true, minLength: 16, maxLength: 128 },
// 324   qr_code: { required: true, minLength: 1, maxLength: 4096 },
// 325   backup_codes: { required: true, minLength: 1, maxLength: 10 },
// 326   code: { required: true, minLength: 6, maxLength: 8, pattern: '^[0-9]+$' },
// 327   recovery_code: { required: false, minLength: 8, maxLength: 32 },
// 328 } as const;
// 329 // *CIDO - BÖLÜM - 18 - SocialLogin - Sosyal Giriş - Sosyal Giriş - OAuth - Serde
// 330 export interface SocialLoginRequest {
// 331   provider: string;
// 332   code: string;
// 333   redirect_uri: string;
// 334 }
// 335 // *CIDO - BÖLÜM - 18 - EK - SocialLogin Validasyon - Sosyal Giriş Doğrulama - OAuth Sağlayıcı Kontrol - Serde
// 336 export const SocialLoginConstraints = {
// 337   provider: { required: true, minLength: 1, maxLength: 50 },
// 338   code: { required: true, minLength: 1, maxLength: 4096 },
// 339   redirect_uri: { required: true, minLength: 1, maxLength: 2048, pattern: '^https?://' },
// 340 } as const;
// 341 // *CIDO - BÖLÜM - 19 - JWT Config - JWT Yapılandırma - JWT Konfig - Zorunlu Değer - Serde
// 342 export interface JWTConfig {
// 343   secret: string;
// 344   expires_in_seconds: number;
// 345   refresh_expires_in_seconds: number;
// 346   issuer?: string;
// 347   audience?: string;
// 348 }
// 349 // *CIDO - BÖLÜM - 19 - EK - JWT Config Validasyon - JWT Yapılandırma Kuralları - Algoritma Eksik - Serde
// 350 export const JWTConfigConstraints = {
// 351   secret: { required: true, minLength: 32, maxLength: 1024 },
// 352   expires_in_seconds: { required: true, min: 60, max: 86400 },
// 353   refresh_expires_in_seconds: { required: true, min: 3600, max: 2592000 },
// 354   issuer: { required: false, minLength: 1, maxLength: 255 },
// 355   audience: { required: false, minLength: 1, maxLength: 255 },
// 356 } as const;
// 357 // *CIDO - BÖLÜM - 20 - PasswordReset - Şifre Sıfırlama - Şifre Sıfırla - E-posta Token - Serde
// 358 export interface PasswordResetRequest {
// 359   email: string;
// 360   tenant_id?: string;
// 361 }
// 362 export interface PasswordResetConfirm {
// 363   token: string;
// 364   new_password: string;
// 365 }
// 366 // *CIDO - BÖLÜM - 20 - EK - PasswordReset Validasyon - Şifre Sıfırlama Kuralları - Token Güvenlik - Serde
// 367 export const PasswordResetConstraints = {
// 368   email: { required: true, minLength: 5, maxLength: 255, pattern: '^[^@]+@[^@]+\\.[^@]+$' },
// 369   tenant_id: { required: false, minLength: 36, maxLength: 36 },
// 370   token: { required: true, minLength: 10, maxLength: 4096 },
// 371   new_password: { required: true, minLength: 8, maxLength: 128 },
// 372 } as const;
// 373 // *CIDO - BÖLÜM - 21 - AuditLog - Denetim Kaydı - Denetim Kaydı - İzlenebilirlik - Serde
// 374 export interface AuditLog {
// 375   id: string;
// 376   tenant_id: string;
// 377   user_id: string;
// 378   action: string;
// 379   resource: string;
// 380   resource_id: string;
// 381   details: Record<string, unknown>;
// 382   ip_address: string;
// 383   user_agent: string;
// 384   timestamp: number;
// 385 }
// 386 // *CIDO - BÖLÜM - 22 - RateLimit - Hız Sınırlama - Hız Sınır - Sliding Window - Serde
// 387 export interface RateLimit {
// 388   tenant_id: string;
// 389   endpoint: string;
// 390   limit: number;
// 391   window_seconds: number;
// 392   current_requests: number;
// 393   remaining: number;
// 394   reset_at: number;
// 395 }
// 396 // *CIDO - BÖLÜM - 23 - CORS Config - CORS Ayarları - CORS Konfig - Güvenlik Başlık - Serde
// 397 export interface CORSConfig {
// 398   allowed_origins: string[];
// 399   allowed_methods: string[];
// 400   allowed_headers: string[];
// 401   exposed_headers: string[];
// 402   max_age: number;
// 403   credentials: boolean;
// 404 }
// 405 // *CIDO - BÖLÜM - 24 - SessionStore - Oturum Depolama - Oturum Depo - KV Arayüz - Trait
// 406 export interface SessionStore {
// 407   get(session_id: string): Promise<Session | null>;
// 408   set(session: Session): Promise<void>;
// 409   delete(session_id: string): Promise<void>;
// 410   update(session_id: string, data: Record<string, unknown>): Promise<void>;
// 411 }
// 412 // *CIDO - BÖLÜM - 25 - ApiKeyStore - Anahtar Depolama - Anahtar Depo - KV Arayüz - Trait
// 413 export interface ApiKeyStore {
// 414   create(key: ApiKey): Promise<ApiKey>;
// 415   get(id: string): Promise<ApiKey | null>;
// 416   get_by_key(key: string): Promise<ApiKey | null>;
// 417   list(tenant_id: string): Promise<ApiKey[]>;
// 418   update(id: string, data: Record<string, unknown>): Promise<void>;
// 419   delete(id: string): Promise<void>;
// 420 }
// 421 // *CIDO - BÖLÜM - 26 - UserStore - Kullanıcı Depolama - Kullanıcı Depo - D1 Arayüz - Trait
// 422 export interface UserStore {
// 423   create(user: User): Promise<User>;
// 424   get(id: string): Promise<User | null>;
// 425   get_by_email(email: string): Promise<User | null>;
// 426   list(tenant_id: string): Promise<User[]>;
// 427   update(id: string, data: Record<string, unknown>): Promise<void>;
// 428   delete(id: string): Promise<void>;
// 429 }
// 430 // *CIDO - BÖLÜM - 27 - AuthStrategy - Kimlik Stratejisi - Strateji Tip - JWT İmza - Trait
// 431 export interface AuthStrategy {
// 432   validate_token(token: string): Promise<TokenValidationResult>;
// 433   generate_token(user_id: string, tenant_id: string, role: UserRole): Promise<string>;
// 434   refresh_token(refresh_token: string): Promise<AuthResponse | null>;
// 435   revoke_token(token: string): Promise<void>;
// 436 }
// 437 // *CIDO - BÖLÜM - 28 - AuthMiddleware - Ara Katman - Ara Katman - Request Guard - Trait
// 438 export interface AuthMiddleware {
// 439   authenticate(request: Request): Promise<User | null>;
// 440   authorize(user: User, permission: Permission): Promise<boolean>;
// 441   require_auth(handler: (user: User) => Promise<Response>): Promise<Response>;
// 442 }
// 443 // *CIDO - BÖLÜM - 29 - UserActivity - Kullanıcı Aktivitesi - Aktivite Tip - Analitik - Serde
// 444 export interface UserActivity {
// 445   user_id: string;
// 446   tenant_id: string;
// 447   action: string;
// 448   metadata: Record<string, unknown>;
// 449   timestamp: number;
// 450   session_id: string;
// 451   ip_address?: string;
// 452 }
// 453 // *CIDO - BÖLÜM - 30 - DeviceInfo - Cihaz Bilgisi - Cihaz Bilgi - Güvenlik - Serde
// 454 export interface DeviceInfo {
// 455   device_id: string;
// 456   user_id: string;
// 457   tenant_id: string;
// 458   user_agent: string;
// 459   platform: string;
// 460   browser: string;
// 461   last_used_at: number;
// 462   is_trusted: boolean;
// 463 }
// 464 // *CIDO - BÖLÜM - 31 - SecurityEvent - Güvenlik Olayı - Güvenlik Olay - Loglama - Serde
// 465 export interface SecurityEvent {
// 466   id: string;
// 467   tenant_id: string;
// 468   event_type: string;
// 469   user_id?: string;
// 470   ip_address: string;
// 471   user_agent: string;
// 472   details: Record<string, unknown>;
// 473   timestamp: number;
// 474   is_suspicious: boolean;
// 475 }
// 476 // *CIDO - BÖLÜM - 32 - TenantContext - Kiracı Bağlamı - Tenant Bağlam - İzolasyon - Serde
// 477 export interface TenantContext {
// 478   tenant_id: string;
// 479   slug: string;
// 480   plan: TenantPlan;
// 481   vertical: TenantVertical;
// 482   config: TenantConfig;
// 483   features: TenantFeatures;
// 484 }
// 485 // *CIDO - BÖLÜM - 33 - TenantPlan - Plan Tanımı - Plan Tip - Limit Kontrol - Serde
// 486 export enum TenantPlan {
// 487   Free = "free",
// 488   Pro = "pro",
// 489   Enterprise = "enterprise",
// 490 }
// 491 // *CIDO - BÖLÜM - 34 - TenantVertical - Sektör Tanımı - Sektör Tip - Özelleştirme - Serde
// 492 export enum TenantVertical {
// 493   Ecommerce = "ecommerce",
// 494   Booking = "booking",
// 495   Auction = "auction",
// 496   Marketplace = "marketplace",
// 497 }
// 498 // *CIDO - BÖLÜM - 35 - TenantConfig - Kiracı Konfigürasyonu - Konfig Tip - Yapılandırma - Serde
// 499 export interface TenantConfig {
// 500   tenant_id: string;
// 501   slug: string;
// 502   name: string;
// 503   plan: TenantPlan;
// 504   vertical: TenantVertical;
// 505   domains: string[];
// 506   primary_color: string;
// 507   logo_url: string;
// 508   favicon_url: string;
// 509   timezone: string;
// 510   currency: string;
// 511   locale: string;
// 512   is_active: boolean;
// 513   created_at: number;
// 514   updated_at: number;
// 515 }
// 516 // *CIDO - BÖLÜM - 36 - TenantFeatures - Özellik Bayrakları - Özellik Bayrak - Plan Bazlı - Serde
// 517 export interface TenantFeatures {
// 518   ai_enabled: boolean;
// 519   analytics_enabled: boolean;
// 520   custom_domain: boolean;
// 521   white_label: boolean;
// 522   api_access: boolean;
// 523   webhooks_enabled: boolean;
// 524   max_products: number;
// 525   max_users: number;
// 526   max_storage_mb: number;
// 527   priority_support: boolean;
// 528 }
// 529 // *CIDO - BÖLÜM - 37 - PlanLimits - Plan Sınırları - Sınır Tip - Kota Kontrol - Serde
// 530 export interface PlanLimits {
// 531   requests_per_minute: number;
// 532   ai_enabled: boolean;
// 533   max_products: number;
// 534   max_users: number;
// 535   max_storage_mb: number;
// 536   custom_domain: boolean;
// 537   white_label: boolean;
// 538   api_access: boolean;
// 539   webhooks_enabled: boolean;
// 540   priority_support: boolean;
// 541 }
// 542 // *CIDO - BÖLÜM - 38 - RequestContext - İstek Bağlamı - İstek Bağlam - Pipeline - Serde
// 543 export interface RequestContext {
// 544   request_id: string;
// 545   tenant_id: string;
// 546   user_id?: string;
// 547   role?: UserRole;
// 548   plan: TenantPlan;
// 549   start_time: number;
// 550   path: string;
// 551   method: string;
// 552   ip_address: string;
// 553   user_agent: string;
// 554 }
// 555 // *CIDO - BÖLÜM - 39 - ApiResponse - Standart Yanıt - Yanıt Tip - Başarı Format - Serde
// 556 export interface ApiResponse<T = unknown> {
// 557   success: boolean;
// 558   data?: T;
// 559   error?: ApiErrorDetail;
// 560   request_id: string;
// 561   tenant: string;
// 562   response_time_ms: number;
// 563 }
// 564 // *CIDO - BÖLÜM - 40 - ApiErrorDetail - Hata Detayı - Hata Detay - Standart Hata - Serde
// 565 export interface ApiErrorDetail {
// 566   code: number;
// 567   message: string;
// 568   details?: string;
// 569 }
// 570 // *CIDO - BÖLÜM - 41 - HealthCheckResponse - Sağlık Kontrolü - Sağlık Yanıt - Monitoring - Serde
// 571 export interface HealthCheckResponse {
// 572   status: string;
// 573   timestamp: number;
// 574   services: HealthServiceStatus;
// 575   version: string;
// 576   uptime_seconds: number;
// 577 }
// 578 // *CIDO - BÖLÜM - 42 - HealthServiceStatus - Servis Durumu - Servis Durum - Bağlantı Kontrol - Serde
// 579 export interface HealthServiceStatus {
// 580   d1: boolean;
// 581   kv: boolean;
// 582   r2: boolean;
// 583   queue: boolean;
// 584   ai: boolean;
// 585   vectorize: boolean;
// 586 }
// 587 // *CIDO - BÖLÜM - 43 - MetricsResponse - Metrik Yanıtı - Metrik Yanıt - İzleme - Serde
// 588 export interface MetricsResponse {
// 589   total_requests: number;
// 590   error_rate: number;
// 591   avg_response_time_ms: number;
// 592   p95_response_time_ms: number;
// 593   p99_response_time_ms: number;
// 594   active_tenants: number;
// 595   rate_limited_requests: number;
// 596   timestamp: number;
// 597 }
// 598 // *CIDO - BÖLÜM - 44 - DiagnosticReport - Teşhis Raporu - Teşhis Rapor - Sorun Tespit - Serde
// 599 export interface DiagnosticReport {
// 600   request_id: string;
// 601   tenant_id: string;
// 602   kv_access_ok: boolean;
// 603   d1_access_ok: boolean;
// 604   r2_access_ok: boolean;
// 605   queue_access_ok: boolean;
// 606   memory_usage_mb: number;
// 607   request_duration_ms: number;
// 608   warnings: string[];
// 609   errors: string[];
// 610   timestamp: number;
// 611 }
// 612 // *CIDO - BÖLÜM - 45 - SecurityViolation - Güvenlik İhlali - İhlal Kaydı - WAF Log - Serde
// 613 export interface SecurityViolation {
// 614   id: string;
// 615   tenant_id: string;
// 616   rule_id: string;
// 617   rule_name: string;
// 618   severity: string;
// 619   ip_address: string;
// 620   user_agent: string;
// 621   path: string;
// 622   payload_sample: string;
// 623   timestamp: number;
// 624   blocked: boolean;
// 625 }
// 626 // *CIDO - BÖLÜM - 46 - FraudEvent - Dolandırıcılık Olayı - Fraud Kaydı - Anomali Tespit - Serde
// 627 export interface FraudEvent {
// 628   id: string;
// 629   tenant_id: string;
// 630   event_type: string;
// 631   ip_address: string;
// 632   risk_score: number;
// 633   indicators: string[];
// 634   action_taken: string;
// 635   timestamp: number;
// 636   request_id: string;
// 637 }
// 638 // *CIDO - BÖLÜM - 47 - CircuitBreakerState - Devre Kesici - Kesici Durum - Dayanıklılık - Serde
// 639 export enum CircuitState {
// 640   Closed = "closed",
// 641   Open = "open",
// 642   HalfOpen = "half_open",
// 643 }
// 644 // *CIDO - BÖLÜM - 48 - CircuitBreakerConfig - Kesici Konfigürasyonu - Kesici Konfig - Fallback - Serde
// 645 export interface CircuitBreakerConfig {
// 646   service_name: string;
// 647   failure_threshold: number;
// 648   recovery_timeout_ms: number;
// 649   half_open_max_requests: number;
// 650   state: CircuitState;
// 651   failure_count: number;
// 652   last_failure_time: number;
// 653   last_success_time: number;
// 654 }
// 655 // *CIDO - BÖLÜM - 49 - RetryPolicy - Yeniden Deneme - Retry Politika - Bağlantı Hatası - Serde
// 656 export interface RetryPolicy {
// 657   max_attempts: number;
// 658   initial_backoff_ms: number;
// 659   max_backoff_ms: number;
// 660   backoff_multiplier: number;
// 661   retryable_errors: string[];
// 662 }
// 663 // *CIDO - BÖLÜM - 50 - EncryptedData - Şifreli Veri - Şifreli Veri - AES-256-GCM - Serde
// 664 export interface EncryptedData {
// 665   ciphertext: string;
// 666   nonce: string;
// 667   algorithm: string;
// 668   key_id: string;
// 669   created_at: number;
// 670 }
// 671 // *CIDO - BÖLÜM - 50 - EK - EncryptedData Validasyon - Şifreli Veri Doğrulama - AES-256-GCM Kontrol - Serde
// 672 export const EncryptedDataConstraints = {
// 673   ciphertext: { required: true, minLength: 1, maxLength: 65536 },
// 674   nonce: { required: true, minLength: 12, maxLength: 32 },
// 675   algorithm: { required: true, minLength: 3, maxLength: 50 },
// 676   key_id: { required: true, minLength: 1, maxLength: 255 },
// 677   created_at: { required: true, min: 1 },
// 678 } as const;
// 679 // *CIDO - BÖLÜM - 51 - KeyPair - Anahtar Çifti - Anahtar Çift - KV Depo - Serde
// 680 export interface KeyPair {
// 681   key_id: string;
// 682   tenant_id: string;
// 683   public_key_hash: string;
// 684   encrypted_private_key: string;
// 685   created_at: number;
// 686   expires_at: number;
// 687   is_active: boolean;
// 688 }
// 689 // *CIDO - BÖLÜM - 52 - LockInfo - Kilit Bilgisi - Kilit Bilgi - Optimistic Lock - Serde
// 690 export interface LockInfo {
// 691   resource: string;
// 692   tenant_id: string;
// 693   locked_at: number;
// 694   expires_at: number;
// 695   owner_id: string;
// 696   version: number;
// 697 }
// 698 // *CIDO - BÖLÜM - 53 - WAFRule - WAF Kuralı - WAF Kural - Regex Filtre - Serde
// 699 export interface WAFRule {
// 700   id: string;
// 701   name: string;
// 702   pattern: string;
// 703   severity: string;
// 704   action: string;
// 705   enabled: boolean;
// 706 }
// 707 // *CIDO - BÖLÜM - 54 - RBACPolicy - Yetkilendirme Politikası - Politika Tip - Erişim Kontrol - Serde
// 708 export interface RBACPolicy {
// 709   role: UserRole;
// 710   permissions: Permission[];
// 711   tenant_scope: string;
// 712   expires_at?: number;
// 713 }
// 714 // *CIDO - BÖLÜM - 55 - TelemetryEvent - Telemetri Olayı - Telemetri Kaydı - Performans - Serde
// 715 export interface TelemetryEvent {
// 716   trace_id: string;
// 717   request_id: string;
// 718   tenant_id: string;
// 719   event_name: string;
// 720   duration_ms: number;
// 721   success: boolean;
// 722   metadata: Record<string, unknown>;
// 723   timestamp: number;
// 724 }
// 725 // *CIDO - BÖLÜM - 56 - AuditReport - Denetim Raporu - Denetim Rapor - OWASP Kontrol - Serde
// 726 export interface AuditReport {
// 727   id: string;
// 728   date: string;
// 729   owasp_top10_pass: boolean;
// 730   gdpr_compliance_pass: boolean;
// 731   pci_dss_compliance_pass: boolean;
// 732   iso27001_compliance_pass: boolean;
// 733   findings: AuditFinding[];
// 734   overall_status: string;
// 735   generated_at: number;
// 736 }
// 737 // *CIDO - BÖLÜM - 57 - AuditFinding - Denetim Bulgusu - Bulgu Kaydı - Zafiyet Tespit - Serde
// 738 export interface AuditFinding {
// 739   id: string;
// 740   category: string;
// 741   severity: string;
// 742   description: string;
// 743   recommendation: string;
// 744   status: string;
// 745 }
// 746 // *CIDO - BÖLÜM - 58 - DeploymentRecord - Dağıtım Kaydı - Dağıtım Kayıt - CI/CD - Serde
// 747 export interface DeploymentRecord {
// 748   version: string;
// 749   deployed_at: number;
// 750   commit_hash: string;
// 751   status: string;
// 752   rollback_version?: string;
// 753   artifacts: string[];
// 754 }
// 755 // *CIDO - BÖLÜM - 59 - ValidationResult - Doğrulama Sonucu - Doğrulama Sonuç - Guard Clause - Serde
// 756 export interface ValidationResult {
// 757   valid: boolean;
// 758   errors: ValidationError[];
// 759   warnings: string[];
// 760 }
// 761 // *CIDO - BÖLÜM - 60 - ValidationError - Doğrulama Hatası - Doğrulama Hata - Parametre Kontrol - Serde
// 762 export interface ValidationError {
// 763   field: string;
// 764   message: string;
// 765   code: string;
// 766   value?: unknown;
// 767 }
// 768 // *CIDO - BÖLÜM - 61 - PaginationParams - Sayfalama Parametresi - Sayfalama Param - Sorgu Limiti - Serde
// 769 export interface PaginationParams {
// 770   page: number;
// 771   limit: number;
// 772   sort_by?: string;
// 773   sort_order?: string;
// 774 }
// 775 // *CIDO - BÖLÜM - 62 - PaginatedResponse - Sayfalanmış Yanıt - Sayfalı Yanıt - Veri Kümesi - Serde
// 776 export interface PaginatedResponse<T> {
// 777   data: T[];
// 778   total: number;
// 779   page: number;
// 780   limit: number;
// 781   total_pages: number;
// 782   has_next: boolean;
// 783   has_prev: boolean;
// 784 }
// 785 // *CIDO - BÖLÜM - 63 - CacheEntry - Önbellek Girişi - Önbellek Giriş - KV TTL - Serde
// 786 export interface CacheEntry<T> {
// 787   key: string;
// 788   value: T;
// 789   created_at: number;
// 790   expires_at: number;
// 791   hit_count: number;
// 792 }
// 793 // *CIDO - BÖLÜM - 64 - QueueMessage - Kuyruk Mesajı - Kuyruk Mesaj - Asenkron İş - Serde
// 794 export interface QueueMessage {
// 795   id: string;
// 796   tenant_id: string;
// 797   queue_name: string;
// 798   payload: Record<string, unknown>;
// 799   attempts: number;
// 800   max_attempts: number;
// 801   created_at: number;
// 802   scheduled_at?: number;
// 803 }
// 804 // *CIDO - BÖLÜM - 65 - CommerceWebhookConfig - Ticaret Webhook - Event Yapılandırması - İmzalı Gönderim - Serde
// 805 export interface CommerceWebhookConfig {
// 806   id: string;
// 807   tenant_id: string;
// 808   url: string;
// 809   events: string[];
// 810   secret: string;
// 811   is_active: boolean;
// 812   retry_count: number;
// 813   max_retries: number;
// 814   created_at: number;
// 815   updated_at: number;
// 816 }
// 817 // *CIDO - BÖLÜM - 66 - WebhookPayload - Webhook Yükü - Webhook Yük - İmzalı Gönderim - Serde
// 818 export interface WebhookPayload {
// 819   event: string;
// 820   tenant_id: string;
// 821   data: Record<string, unknown>;
// 822   timestamp: number;
// 823   signature: string;
// 824 }
// 825 // *CIDO - BÖLÜM - 67 - NotificationTemplate - Bildirim Şablonu - Bildirim Şablon - E-posta Mesaj - Serde
// 826 export interface NotificationTemplate {
// 827   id: string;
// 828   type: string;
// 829   subject: string;
// 830   body_html: string;
// 831   body_text: string;
// 832   variables: string[];
// 833   tenant_id?: string;
// 834 }
// 835 // *CIDO - BÖLÜM - 68 - OAuthProvider - OAuth Sağlayıcı - OAuth Sağlayıcı - Sosyal Giriş - Serde
// 836 export interface OAuthProvider {
// 837   name: string;
// 838   client_id: string;
// 839   authorize_url: string;
// 840   token_url: string;
// 841   userinfo_url: string;
// 842   scopes: string[];
// 843 }
// 844 // *CIDO - BÖLÜM - 69 - SearchQuery - Arama Sorgusu - Arama Sorgu - Vektör Arama - Serde
// 845 export interface SearchQuery {
// 846   query: string;
// 847   tenant_id: string;
// 848   filters: Record<string, unknown>;
// 849   top_k: number;
// 850   min_score: number;
// 851   search_type: string;
// 852 }
// 853 // *CIDO - BÖLÜM - 70 - SearchResult - Arama Sonucu - Arama Sonuç - Sıralı Döküman - Serde
// 854 export interface SearchResult {
// 855   id: string;
// 856   score: number;
// 857   document: Record<string, unknown>;
// 858   tenant_id: string;
// 859 }
// 860 // *CIDO - BÖLÜM - 71 - EmbeddingVector - Gömme Vektörü - Vektör Veri - bge-base - Serde
// 861 export interface EmbeddingVector {
// 862   id: string;
// 863   tenant_id: string;
// 864   values: number[];
// 865   dimensions: number;
// 866   metadata: Record<string, unknown>;
// 867 }
// 868 // *CIDO - BÖLÜM - 72 - AIRequestConfig - AI İstek Konfigürasyonu - AI Konfig - Neuron Yönetim - Serde
// 869 export interface AIRequestConfig {
// 870   model: string;
// 871   max_tokens: number;
// 872   temperature: number;
// 873   top_p: number;
// 874   frequency_penalty: number;
// 875   presence_penalty: number;
// 876   stream: boolean;
// 877 }
// 878 // *CIDO - BÖLÜM - 73 - NeuronUsage - Neuron Kullanımı - Neuron Takip - Kota İzleme - Serde
// 879 export interface NeuronUsage {
// 880   tenant_id: string;
// 881   date: string;
// 882   used: number;
// 883   limit: number;
// 884   remaining: number;
// 885   reset_at: number;
// 886 }
// 887 // *CIDO - BÖLÜM - 74 - ProductCategory - Ürün Kategorisi - Kategori Tip - Hiyerarşi - Serde
// 888 export interface ProductCategory {
// 889   id: string;
// 890   tenant_id: string;
// 891   name: string;
// 892   slug: string;
// 893   parent_id?: string;
// 894   children: ProductCategory[];
// 895   level: number;
// 896   product_count: number;
// 897 }
// 898 // *CIDO - BÖLÜM - 75 - ProductAttribute - Ürün Özelliği - Özellik Tip - Dinamik Alan - Serde
// 899 export interface ProductAttribute {
// 900   name: string;
// 901   value: string;
// 902   type: string;
// 903   unit?: string;
// 904   searchable: boolean;
// 905 }
// 906 // *CIDO - BÖLÜM - 76 - PricingRule - Fiyatlandırma Kuralı - Fiyat Kural - İndirim Motoru - Serde
// 907 export interface PricingRule {
// 908   id: string;
// 909   tenant_id: string;
// 910   name: string;
// 911   type: string;
// 912   value: number;
// 913   min_quantity?: number;
// 914   product_ids?: string[];
// 915   category_ids?: string[];
// 916   starts_at?: number;
// 917   ends_at?: number;
// 918   priority: number;
// 919   is_active: boolean;
// 920 }
// 921 // *CIDO - BÖLÜM - 77 - InventoryRecord - Stok Kaydı - Stok Kayıt - Miktar Takip - Serde
// 922 export interface InventoryRecord {
// 923   product_id: string;
// 924   tenant_id: string;
// 925   quantity: number;
// 926   reserved: number;
// 927   available: number;
// 928   low_stock_threshold: number;
// 929   updated_at: number;
// 930 }
// 931 // *CIDO - BÖLÜM - 78 - BookingSlot - Randevu Zamanı - Randevu Slot - Zaman Yönetimi - Serde
// 932 export interface BookingSlot {
// 933   id: string;
// 934   tenant_id: string;
// 935   resource_id: string;
// 936   start_time: number;
// 937   end_time: number;
// 938   is_available: boolean;
// 939   booked_by?: string;
// 940   service_id?: string;
// 941 }
// 942 // *CIDO - BÖLÜM - 79 - BidRecord - Teklif Kaydı - Teklif Kayıt - Açık Artırma - Serde
// 943 export interface BidRecord {
// 944   id: string;
// 945   tenant_id: string;
// 946   auction_id: string;
// 947   user_id: string;
// 948   amount: number;
// 949   timestamp: number;
// 950   is_winner: boolean;
// 951 }
// 952 // *CIDO - BÖLÜM - 80 - CollaborationSession - İşbirliği Oturumu - Ortak Oturum - Eş Zamanlı - Serde
// 953 export interface CollaborationSession {
// 954   id: string;
// 955   tenant_id: string;
// 956   participants: string[];
// 957   state: Record<string, unknown>;
// 958   version: number;
// 959   created_at: number;
// 960   last_activity_at: number;
// 961 }
// 962 // *CIDO - BÖLÜM - 81 - CohortData - Grup Verisi - Kohort Veri - Kullanıcı Analizi - Serde
// 963 export interface CohortData {
// 964   cohort_date: string;
// 965   tenant_id: string;
// 966   total_users: number;
// 967   active_users: number;
// 968   retention_rate: number;
// 969   revenue: number;
// 970   avg_order_value: number;
// 971 }
// 972 // *CIDO - BÖLÜM - 82 - FunnelStep - Dönüşüm Adımı - Huni Adım - Satış Takibi - Serde
// 973 export interface FunnelStep {
// 974   name: string;
// 975   visitors: number;
// 976   conversions: number;
// 977   conversion_rate: number;
// 978   drop_off: number;
// 979 }
// 980 // *CIDO - BÖLÜM - 83 - ImageProcessingConfig - Görsel İşleme - Görsel Konfig - WASM Optimize - Serde
// 981 export interface ImageProcessingConfig {
// 982   max_width: number;
// 983   max_height: number;
// 984   quality: number;
// 985   format: string;
// 986   generate_webp: boolean;
// 987   generate_thumbnail: boolean;
// 988   thumbnail_size: number;
// 989 }
// 990 // *CIDO - BÖLÜM - 84 - R2UploadResult - R2 Yükleme Sonucu - Yükleme Sonuç - Nesne Depolama - Serde
// 991 export interface R2UploadResult {
// 992   key: string;
// 993   size: number;
// 994   etag: string;
// 995   content_type: string;
// 996   uploaded_at: number;
// 997   public_url: string;
// 998 }
// 999 // *CIDO - BÖLÜM - 85 - TenantTheme - Kiracı Teması - Tema Tanım - CSS Değişken - Serde
// 1000 export interface TenantTheme {
// 1001   primary_color: string;
// 1002   secondary_color: string;
// 1003   font_family: string;
// 1004   border_radius: string;
// 1005   dark_mode: boolean;
// 1006   custom_css?: string;
// 1007 }
// 1008 // *CIDO - BÖLÜM - 86 - ServiceWorkerConfig - SW Konfigürasyonu - SW Konfig - Önbellek Strateji - Serde
// 1009 export interface ServiceWorkerConfig {
// 1010   cache_version: string;
// 1011   static_assets: string[];
// 1012   api_routes: string[];
// 1013   cache_strategy: string;
// 1014   offline_page: string;
// 1015 }
// 1016 // *CIDO - BÖLÜM - 87 - ManifestConfig - PWA Manifestosu - Manifest Konfig - Kurulum - Serde
// 1017 export interface ManifestConfig {
// 1018   name: string;
// 1019   short_name: string;
// 1020   description: string;
// 1021   start_url: string;
// 1022   display: string;
// 1023   background_color: string;
// 1024   theme_color: string;
// 1025   icons: ManifestIcon[];
// 1026 }
// 1027 // *CIDO - BÖLÜM - 88 - ManifestIcon - PWA İkonu - İkon Tanım - Boyut - Serde
// 1028 export interface ManifestIcon {
// 1029   src: string;
// 1030   sizes: string;
// 1031   type: string;
// 1032   purpose: string;
// 1033 }
// 1034 // *CIDO - BÖLÜM - 89 - EmailNotification - E-posta Bildirimi - E-posta Bildirim - SMTP Yok - Serde
// 1035 export interface EmailNotification {
// 1036   to: string;
// 1037   subject: string;
// 1038   body_html: string;
// 1039   body_text: string;
// 1040   template_id?: string;
// 1041   variables: Record<string, string>;
// 1042 }
// 1043 // *CIDO - BÖLÜM - 90 - TelegramNotification - Telegram Bildirimi - Telegram Bildirim - Bot API - Serde
// 1044 export interface TelegramNotification {
// 1045   chat_id: string;
// 1046   text: string;
// 1047   parse_mode: string;
// 1048   disable_notification: boolean;
// 1049 }
// 1050 // *CIDO - BÖLÜM - 91 - ErrorThreshold - Hata Eşiği - Eşik Değer - Alarm Tetik - Serde
// 1051 export interface ErrorThreshold {
// 1052   error_type: string;
// 1053   max_count: number;
// 1054   window_seconds: number;
// 1055   action: string;
// 1056   notify_channels: string[];
// 1057 }
// 1058 // *CIDO - BÖLÜM - 92 - ScheduledTask - Zamanlanmış Görev - Cron Görev - Periyodik İş - Serde
// 1059 export interface ScheduledTask {
// 1060   id: string;
// 1061   name: string;
// 1062   cron_expression: string;
// 1063   handler: string;
// 1064   enabled: boolean;
// 1065   last_run_at?: number;
// 1066   next_run_at: number;
// 1067 }
// 1068 // *CIDO - BÖLÜM - 93 - BackupConfig - Yedekleme Konfigürasyonu - Yedek Konfig - R2 Depo - Serde
// 1069 export interface BackupConfig {
// 1070   tenant_id: string;
// 1071   schedule: string;
// 1072   retention_days: number;
// 1073   include_d1: boolean;
// 1074   include_kv: boolean;
// 1075   last_backup_at?: number;
// 1076   next_backup_at: number;
// 1077 }
// 1078 // *CIDO - BÖLÜM - 94 - FeatureFlag - Özellik Bayrağı - Bayrak Tanım - Kademeli Açma - Serde
// 1079 export interface FeatureFlag {
// 1080   name: string;
// 1081   enabled: boolean;
// 1082   tenant_whitelist: string[];
// 1083   rollout_percentage: number;
// 1084   created_at: number;
// 1085   updated_at: number;
// 1086 }
// 1087 // *CIDO - BÖLÜM - 95 - ABTest - A/B Testi - Test Tanım - Varyant Karşılaştırma - Serde
// 1088 export interface ABTest {
// 1089   id: string;
// 1090   name: string;
// 1091   variants: ABVariant[];
// 1092   traffic_split: number[];
// 1093   metrics: string[];
// 1094   start_at: number;
// 1095   end_at?: number;
// 1096 }
// 1097 // *CIDO - BÖLÜM - 96 - ABVariant - A/B Varyantı - Varyant Tanım - Test Kolu - Serde
// 1098 export interface ABVariant {
// 1099   id: string;
// 1100   name: string;
// 1101   config: Record<string, unknown>;
// 1102   weight: number;
// 1103 }
// 1104 // *CIDO - BÖLÜM - 97 - TenantMigration - Kiracı Taşıma - Taşıma Kaydı - Veri Transferi - Serde
// 1105 export interface TenantMigration {
// 1106   id: string;
// 1107   from_tenant: string;
// 1108   to_tenant: string;
// 1109   status: string;
// 1110   started_at: number;
// 1111   completed_at?: number;
// 1112   errors: string[];
// 1113 }
// 1114 // *CIDO - BÖLÜM - 98 - DataExport - Veri Dışa Aktarımı - Dışa Aktarım - GDPR Uyum - Serde
// 1115 export interface DataExport {
// 1116   id: string;
// 1117   tenant_id: string;
// 1118   user_id: string;
// 1119   format: string;
// 1120   status: string;
// 1121   file_url?: string;
// 1122   requested_at: number;
// 1123   completed_at?: number;
// 1124 }
// 1125 // *CIDO - BÖLÜM - 99 - DataDeletion - Veri Silme - Silme Kaydı - Unutulma Hakkı - Serde
// 1126 export interface DataDeletion {
// 1127   id: string;
// 1128   tenant_id: string;
// 1129   user_id: string;
// 1130   status: string;
// 1131   requested_at: number;
// 1132   completed_at?: number;
// 1133   deletion_scope: string[];
// 1134 }
// 1135 // *CIDO - BÖLÜM - 100 - ConsentRecord - Onay Kaydı - Onay Kayıt - KVKK Uyum - Serde
// 1136 export interface ConsentRecord {
// 1137   id: string;
// 1138   tenant_id: string;
// 1139   user_id: string;
// 1140   consent_type: string;
// 1141   granted: boolean;
// 1142   timestamp: number;
// 1143   ip_address: string;
// 1144   user_agent: string;
// 1145 }
// 1146 // *CIDO - BÖLÜM - 101 - AuthGuardContext - Guard Bağlamı - Guard Bağlam - Middleware Zincir - Serde
// 1147 export interface AuthGuardContext {
// 1148   is_authenticated: boolean;
// 1149   user?: User;
// 1150   session?: Session;
// 1151   permissions: Permission[];
// 1152   tenant_context: TenantContext;
// 1153 }
// 1154 // *CIDO - BÖLÜM - 102 - RequestHeaders - İstek Başlıkları - Başlık Tanım - Zorunlu Header - Serde
// 1155 export interface RequestHeaders {
// 1156   request_id: string;
// 1157   tenant_id: string;
// 1158   authorization?: string;
// 1159   content_type: string;
// 1160   accept: string;
// 1161   user_agent: string;
// 1162   x_forwarded_for?: string;
// 1163 }
// 1164 // *CIDO - BÖLÜM - 103 - ResponseHeaders - Yanıt Başlıkları - Yanıt Header - Zorunlu Başlık - Serde
// 1165 export interface ResponseHeaders {
// 1166   x_request_id: string;
// 1167   x_tenant: string;
// 1168   x_response_time: string;
// 1169   content_type: string;
// 1170   x_api_version: string;
// 1171   x_worker_version: string;
// 1172   cache_control?: string;
// 1173 }
// 1174 // *CIDO - BÖLÜM - 104 - WorkerVersion - Worker Sürümü - Sürüm Tanım - Dağıtım Takip - Serde
// 1175 export interface WorkerVersion {
// 1176   version: string;
// 1177   commit_hash: string;
// 1178   build_time: number;
// 1179   rust_version: string;
// 1180   wasm_size_bytes: number;
// 1181 }
// 1182 // *CIDO - BÖLÜM - 105 - KVNamespaceConfig - KV Ad Alanı - KV Konfig - Namespace Tanım - Serde
// 1183 export interface KVNamespaceConfig {
// 1184   binding_name: string;
// 1185   namespace_id: string;
// 1186   preview_id?: string;
// 1187 }
// 1188 // *CIDO - BÖLÜM - 106 - D1DatabaseConfig - D1 Veritabanı - D1 Konfig - Bağlantı Tanım - Serde
// 1189 export interface D1DatabaseConfig {
// 1190   binding_name: string;
// 1191   database_id: string;
// 1192   preview_id?: string;
// 1193 }
// 1194 // *CIDO - BÖLÜM - 107 - R2BucketConfig - R2 Depolama Alanı - R2 Konfig - Bucket Tanım - Serde
// 1195 export interface R2BucketConfig {
// 1196   binding_name: string;
// 1197   bucket_name: string;
// 1198   preview_bucket?: string;
// 1199 }
// 1200 // *CIDO - BÖLÜM - 108 - QueueConfig - Kuyruk Yapılandırması - Kuyruk Konfig - Queue Tanım - Serde
// 1201 export interface QueueConfig {
// 1202   binding_name: string;
// 1203   queue_name: string;
// 1204   delivery_delay_seconds: number;
// 1205   max_retries: number;
// 1206 }
// 1207 // *CIDO - BÖLÜM - 109 - AIBindingConfig - AI Bağlantısı - AI Konfig - Model Erişim - Serde
// 1208 export interface AIBindingConfig {
// 1209   binding_name: string;
// 1210   default_model: string;
// 1211   available_models: string[];
// 1212 }
// 1213 // *CIDO - BÖLÜM - 110 - VectorizeBindingConfig - Vektör Veritabanı - Vectorize Konfig - Embedding - Serde
// 1214 export interface VectorizeBindingConfig {
// 1215   binding_name: string;
// 1216   index_name: string;
// 1217   dimensions: number;
// 1218   metric: string;
// 1219 }
// 1220 // *CIDO - BÖLÜM - 111 - EnvBinding - Ortam Bağlantısı - Env Bağlantı - Tüm Servisler - Serde
// 1221 export interface EnvBinding {
// 1222   kv_namespaces: Record<string, KVNamespaceConfig>;
// 1223   d1_databases: Record<string, D1DatabaseConfig>;
// 1224   r2_buckets: Record<string, R2BucketConfig>;
// 1225   queues: Record<string, QueueConfig>;
// 1226   ai: AIBindingConfig;
// 1227   vectorize: VectorizeBindingConfig;
// 1228   secrets: Record<string, string>;
// 1229 }
// 1230 // *CIDO - BÖLÜM - 112 - EventType - Olay Tipi - Olay Enum - Sistem Olayı - Serde
// 1231 export enum EventType {
// 1232   RequestStart = "request:start",
// 1233   RequestEnd = "request:end",
// 1234   AuthSuccess = "auth:success",
// 1235   AuthFailure = "auth:failure",
// 1236   RateLimitHit = "ratelimit:hit",
// 1237   WAFTrigger = "waf:trigger",
// 1238   FraudDetected = "fraud:detected",
// 1239   CircuitOpen = "circuit:open",
// 1240   CircuitClose = "circuit:close",
// 1241   DeploySuccess = "deploy:success",
// 1242   DeployFailure = "deploy:failure",
// 1243   HealthCheckFail = "health:fail",
// 1244 }
// 1245 // *CIDO - BÖLÜM - 113 - ErrorCode - Hata Kodu - Hata Enum - HTTP Durum - Serde
// 1246 export enum ErrorCode {
// 1247   BadRequest = 400,
// 1248   Unauthorized = 401,
// 1249   PaymentRequired = 402,
// 1250   Forbidden = 403,
// 1251   NotFound = 404,
// 1252   MethodNotAllowed = 405,
// 1253   Conflict = 409,
// 1254   Gone = 410,
// 1255   PayloadTooLarge = 413,
// 1256   UnsupportedMediaType = 415,
// 1257   TooManyRequests = 429,
// 1258   InternalServerError = 500,
// 1259   NotImplemented = 501,
// 1260   BadGateway = 502,
// 1261   ServiceUnavailable = 503,
// 1262   GatewayTimeout = 504,
// 1263 }
// 1264 // *CIDO - BÖLÜM - 114 - LogLevel - Log Seviyesi - Log Enum - Merkezi Log - Serde
// 1265 export enum LogLevel {
// 1266   Debug = "debug",
// 1267   Info = "info",
// 1268   Warning = "warning",
// 1269   Error = "error",
// 1270   Critical = "critical",
// 1271 }
// 1272 // *CIDO - BÖLÜM - 115 - LogEntry - Log Girişi - Log Kayıt - Merkezi Loglama - Serde
// 1273 export interface LogEntry {
// 1274   level: LogLevel;
// 1275   message: string;
// 1276   trace_id: string;
// 1277   request_id: string;
// 1278   tenant_id: string;
// 1279   module: string;
// 1280   timestamp: number;
// 1281   metadata: Record<string, unknown>;
// 1282 }
// 1283 // *CIDO - BÖLÜM - 116 - MetricPoint - Metrik Noktası - Metrik Veri - Zaman Serisi - Serde
// 1284 export interface MetricPoint {
// 1285   name: string;
// 1286   value: number;
// 1287   tags: Record<string, string>;
// 1288   timestamp: number;
// 1289 }
// 1290 // *CIDO - BÖLÜM - 117 - ConfigValue - Konfigürasyon Değeri - Config Değer - Tip Güvenli - Serde
// 1291 export interface ConfigValue<T> {
// 1292   key: string;
// 1293   value: T;
// 1294   default_value: T;
// 1295   description: string;
// 1296   is_secret: boolean;
// 1297 }
// 1298 // *CIDO - BÖLÜM - 118 - SecretStore - Gizli Depo - Gizli Anahtar - KV Secret - Serde
// 1299 export interface SecretStore {
// 1300   get(key: string): Promise<string | null>;
// 1301   set(key: string, value: string): Promise<void>;
// 1302   delete(key: string): Promise<void>;
// 1303   list(prefix: string): Promise<string[]>;
// 1304 }
// 1305 // *CIDO - BÖLÜM - 119 - CryptoKeyPair - Şifreleme Anahtar Çifti - Kripto Çift - AES Anahtar - Serde
// 1306 export interface CryptoKeyPair {
// 1307   public_key: string;
// 1308   private_key_encrypted: string;
// 1309   algorithm: string;
// 1310   key_size: number;
// 1311   format: string;
// 1312 }
// 1313 // *CIDO - BÖLÜM - 120 - HashResult - Hash Sonucu - Hash Veri - SHA-256 - Serde
// 1314 export interface HashResult {
// 1315   hash: string;
// 1316   algorithm: string;
// 1317   input_length: number;
// 1318   timestamp: number;
// 1319 }
// 1320 // *CIDO - BÖLÜM - 121 - HMACResult - HMAC Sonucu - HMAC Veri - İmza Doğrulama - Serde
// 1321 export interface HMACResult {
// 1322   signature: string;
// 1323   verified: boolean;
// 1324   algorithm: string;
// 1325   timestamp: number;
// 1326 }
// 1327 // *CIDO - BÖLÜM - 122 - Base64Result - Base64 Sonucu - Base64 Veri - Kodlama - Serde
// 1328 export interface Base64Result {
// 1329   encoded: string;
// 1330   decoded: string;
// 1331   original_length: number;
// 1332   encoded_length: number;
// 1333 }
// 1334 // *CIDO - BÖLÜM - 123 - UUIDGenerator - UUID Üretici - UUID Tip - Benzersiz Kimlik - Serde
// 1335 export interface UUIDGenerator {
// 1336   v4(): string;
// 1337   v7(): string;
// 1338   validate(uuid: string): boolean;
// 1339   parse(uuid: string): UUIDParts;
// 1340 }
// 1341 // *CIDO - BÖLÜM - 124 - UUIDParts - UUID Parçaları - Parça Tip - Ayrıştırma - Serde
// 1342 export interface UUIDParts {
// 1343   version: number;
// 1344   variant: string;
// 1345   timestamp?: number;
// 1346   node?: string;
// 1347   clock_seq?: number;
// 1348 }
// 1349 // *CIDO - BÖLÜM - 125 - DateFormatter - Tarih Biçimlendirici - Tarih Tip - UTC Format - Serde
// 1350 export interface DateFormatter {
// 1351   iso8601(timestamp: number): string;
// 1352   unix(timestamp: number): number;
// 1353   human_readable(timestamp: number, locale: string): string;
// 1354   relative(timestamp: number): string;
// 1355 }
// 1356 // *CIDO - BÖLÜM - 126 - PriceFormatter - Fiyat Biçimlendirici - Fiyat Tip - Para Birimi - Serde
// 1357 export interface PriceFormatter {
// 1358   format(amount: number, currency: string, locale: string): string;
// 1359   parse(formatted: string, currency: string): number;
// 1360   convert(amount: number, from: string, to: string, rate: number): number;
// 1361 }
// 1362 // *CIDO - BÖLÜM - 127 - SlugGenerator - Slug Üretici - Slug Tip - URL Dostu - Serde
// 1363 export interface SlugGenerator {
// 1364   generate(text: string): string;
// 1365   validate(slug: string): boolean;
// 1366   sanitize(input: string): string;
// 1367 }
// 1368 // *CIDO - BÖLÜM - 128 - EmailValidator - E-posta Doğrulayıcı - Validatör Tip - Regex Kontrol - Serde
// 1369 export interface EmailValidator {
// 1370   validate(email: string): boolean;
// 1371   normalize(email: string): string;
// 1372   extract_domain(email: string): string;
// 1373 }
// 1374 // *CIDO - BÖLÜM - 129 - PhoneValidator - Telefon Doğrulayıcı - Telefon Tip - E.164 Format - Serde
// 1375 export interface PhoneValidator {
// 1376   validate(phone: string, country?: string): boolean;
// 1377   format(phone: string, format: string): string;
// 1378   parse(phone: string): PhoneParts;
// 1379 }
// 1380 // *CIDO - BÖLÜM - 130 - PhoneParts - Telefon Parçaları - Parça Tip - Ülke Kodu - Serde
// 1381 export interface PhoneParts {
// 1382   country_code: string;
// 1383   area_code: string;
// 1384   number: string;
// 1385   extension?: string;
// 1386 }
// 1387 // *CIDO - BÖLÜM - 131 - URLParser - URL Ayrıştırıcı - URL Tip - Güvenli Parse - Serde
// 1388 export interface URLParser {
// 1389   parse(url: string): URLParts;
// 1390   validate(url: string): boolean;
// 1391   normalize(url: string): string;
// 1392 }
// 1393 // *CIDO - BÖLÜM - 132 - URLParts - URL Parçaları - Parça Tip - Bileşen Ayır - Serde
// 1394 export interface URLParts {
// 1395   protocol: string;
// 1396   host: string;
// 1397   port?: number;
// 1398   path: string;
// 1399   query: Record<string, string>;
// 1400   hash?: string;
// 1401 }
// 1402 // *CIDO - BÖLÜM - 133 - TenantHeaderParser - Kiracı Başlık Ayrıştırıcı - Header Parse - Subdomain - Serde
// 1403 export interface TenantHeaderParser {
// 1404   from_header(header: string): string | null;
// 1405   from_subdomain(host: string): string | null;
// 1406   from_query(query: string): string | null;
// 1407   validate_slug(slug: string): boolean;
// 1408 }
// 1409 // *CIDO - BÖLÜM - 134 - ContentType - İçerik Tipi - MIME Enum - Yanıt Formatı - Serde
// 1410 export enum ContentType {
// 1411   JSON = "application/json",
// 1412   HTML = "text/html",
// 1413   XML = "application/xml",
// 1414   FormData = "multipart/form-data",
// 1415   FormUrlEncoded = "application/x-www-form-urlencoded",
// 1416   PlainText = "text/plain",
// 1417   OctetStream = "application/octet-stream",
// 1418   PNG = "image/png",
// 1419   JPEG = "image/jpeg",
// 1420   WEBP = "image/webp",
// 1421   SVG = "image/svg+xml",
// 1422   PDF = "application/pdf",
// 1423   WASM = "application/wasm",
// 1424 }
// 1425 // *CIDO - BÖLÜM - 135 - HttpMethod - HTTP Metodu - Metod Enum - REST API - Serde
// 1426 export enum HttpMethod {
// 1427   GET = "GET",
// 1428   POST = "POST",
// 1429   PUT = "PUT",
// 1430   DELETE = "DELETE",
// 1431   PATCH = "PATCH",
// 1432   OPTIONS = "OPTIONS",
// 1433   HEAD = "HEAD",
// 1434 }
// 1435 // *CIDO - BÖLÜM - 136 - CacheControl - Önbellek Kontrolü - Cache Direktif - Performans - Serde
// 1436 export interface CacheControl {
// 1437   max_age: number;
// 1438   s_max_age?: number;
// 1439   private: boolean;
// 1440   no_cache: boolean;
// 1441   no_store: boolean;
// 1442   must_revalidate: boolean;
// 1443   immutable: boolean;
// 1444 }
// 1445 // *CIDO - BÖLÜM - 137 - CorsHeaders - CORS Başlıkları - CORS Yanıt - Preflight - Serde
// 1446 export interface CorsHeaders {
// 1447   allow_origin: string;
// 1448   allow_methods: string;
// 1449   allow_headers: string;
// 1450   expose_headers: string;
// 1451   max_age: string;
// 1452   allow_credentials: string;
// 1453 }
// 1454 // *CIDO - BÖLÜM - 138 - SecurityHeaders - Güvenlik Başlıkları - Güvenlik Header - CSP HSTS - Serde
// 1455 export interface SecurityHeaders {
// 1456   content_security_policy: string;
// 1457   strict_transport_security: string;
// 1458   x_content_type_options: string;
// 1459   x_frame_options: string;
// 1460   x_xss_protection: string;
// 1461   referrer_policy: string;
// 1462   permissions_policy: string;
// 1463 }
// 1464 // *CIDO - BÖLÜM - 139 - CSPDirective - CSP Direktifi - CSP Kural - Kaynak İzni - Serde
// 1465 export interface CSPDirective {
// 1466   default_src: string[];
// 1467   script_src: string[];
// 1468   style_src: string[];
// 1469   img_src: string[];
// 1470   connect_src: string[];
// 1471   font_src: string[];
// 1472   object_src: string[];
// 1473   media_src: string[];
// 1474   frame_src: string[];
// 1475   worker_src: string[];
// 1476 }
// 1477 // *CIDO - BÖLÜM - 140 - CompressionConfig - Sıkıştırma Konfigürasyonu - Sıkıştırma Konfig - Gzip Brotli - Serde
// 1478 export interface CompressionConfig {
// 1479   enabled: boolean;
// 1480   algorithm: string;
// 1481   level: number;
// 1482   min_size_bytes: number;
// 1483   content_types: string[];
// 1484 }
// 1485 // *CIDO - BÖLÜM - 141 - CookieConfig - Çerez Konfigürasyonu - Çerez Konfig - Güvenli Bayrak - Serde
// 1486 export interface CookieConfig {
// 1487   name: string;
// 1488   value: string;
// 1489   domain?: string;
// 1490   path: string;
// 1491   max_age_seconds: number;
// 1492   http_only: boolean;
// 1493   secure: boolean;
// 1494   same_site: string;
// 1495 }
// 1496 // *CIDO - BÖLÜM - 142 - ClientHint - İstemci İpucu - İpucu Başlık - Cihaz Tespit - Serde
// 1497 export interface ClientHint {
// 1498   viewport_width: number;
// 1499   viewport_height: number;
// 1500   device_memory: number;
// 1501   connection_type: string;
// 1502   save_data: boolean;
// 1503   reduced_motion: boolean;
// 1504 }
// 1505 // *CIDO - BÖLÜM - 143 - GeoLocation - Coğrafi Konum - Konum Veri - Ülke Şehir - Serde
// 1506 export interface GeoLocation {
// 1507   country: string;
// 1508   country_code: string;
// 1509   city?: string;
// 1510   region?: string;
// 1511   timezone?: string;
// 1512   latitude?: number;
// 1513   longitude?: number;
// 1514 }
// 1515 // *CIDO - BÖLÜM - 144 - BotDetection - Bot Tespiti - Bot Kontrol - UA Analiz - Serde
// 1516 export interface BotDetection {
// 1517   is_bot: boolean;
// 1518   bot_name?: string;
// 1519   confidence: number;
// 1520   indicators: string[];
// 1521   verified_bot: boolean;
// 1522 }
// 1523 // *CIDO - BÖLÜM - 145 - MLModelConfig - ML Model Konfigürasyonu - Model Konfig - Eğitim Param - Serde
// 1524 export interface MLModelConfig {
// 1525   model_name: string;
// 1526   input_shape: number[];
// 1527   output_shape: number[];
// 1528   batch_size: number;
// 1529   learning_rate: number;
// 1530   epochs: number;
// 1531   framework: string;
// 1532 }
// 1533 // *CIDO - BÖLÜM - 146 - TrainingMetrics - Eğitim Metrikleri - Metrik Takip - Model Performans - Serde
// 1534 export interface TrainingMetrics {
// 1535   epoch: number;
// 1536   loss: number;
// 1537   accuracy: number;
// 1538   val_loss: number;
// 1539   val_accuracy: number;
// 1540   duration_seconds: number;
// 1541   timestamp: number;
// 1542 }
// 1543 // *CIDO - BÖLÜM - 147 - InferenceResult - Çıkarım Sonucu - Tahmin Çıktı - Model Yanıt - Serde
// 1544 export interface InferenceResult {
// 1545   prediction: number[];
// 1546   confidence: number;
// 1547   processing_time_ms: number;
// 1548   model_version: string;
// 1549   input_hash: string;
// 1550 }
// 1551 // *CIDO - BÖLÜM - 148 - DatasetSplit - Veri Kümesi Bölümü - Veri Bölüm - Train Test Split - Serde
// 1552 export interface DatasetSplit {
// 1553   train_ratio: number;
// 1554   validation_ratio: number;
// 1555   test_ratio: number;
// 1556   total_samples: number;
// 1557   train_samples: number;
// 1558   validation_samples: number;
// 1559   test_samples: number;
// 1560 }
// 1561 // *CIDO - BÖLÜM - 149 - VectorDistance - Vektör Mesafesi - Mesafe Ölçüm - Cosine Similarity - Serde
// 1562 export interface VectorDistance {
// 1563   cosine: number;
// 1564   euclidean: number;
// 1565   dot_product: number;
// 1566   normalized: boolean;
// 1567 }
// 1568 // *CIDO - BÖLÜM - 150 - AnomalyScore - Anomali Skoru - Anomali Puan - Fraud Tespit - Serde
// 1569 export interface AnomalyScore {
// 1570   score: number;
// 1571   threshold: number;
// 1572   is_anomaly: boolean;
// 1573   contributing_factors: string[];
// 1574   timestamp: number;
// 1575 }
// 1576 // *CIDO - BÖLÜM - 151 - RiskAssessment - Risk Değerlendirmesi - Risk Analiz - Tehdit Seviye - Serde
// 1577 export interface RiskAssessment {
// 1578   overall_risk: string;
// 1579   confidence: number;
// 1580   risk_factors: RiskFactor[];
// 1581   recommended_action: string;
// 1582   assessment_time: number;
// 1583 }
// 1584 // *CIDO - BÖLÜM - 152 - RiskFactor - Risk Faktörü - Faktör Analiz - Tehdit Bileşen - Serde
// 1585 export interface RiskFactor {
// 1586   name: string;
// 1587   severity: string;
// 1588   score: number;
// 1589   description: string;
// 1590   mitigation: string;
// 1591 }
// 1592 // *CIDO - BÖLÜM - 153 - PenetrationTest - Penetrasyon Testi - Pentest Kaydı - Güvenlik Testi - Serde
// 1593 export interface PenetrationTest {
// 1594   id: string;
// 1595   target: string;
// 1596   started_at: number;
// 1597   completed_at?: number;
// 1598   findings: PenetrationFinding[];
// 1599   overall_severity: string;
// 1600   tested_by: string;
// 1601 }
// 1602 // *CIDO - BÖLÜM - 154 - PenetrationFinding - Pentest Bulgusu - Zafiyet Bulgu - Sömürü Testi - Serde
// 1603 export interface PenetrationFinding {
// 1604   id: string;
// 1605   vulnerability: string;
// 1606   severity: string;
// 1607   cvss_score: number;
// 1608   description: string;
// 1609   proof_of_concept: string;
// 1610   remediation: string;
// 1611   status: string;
// 1612 }
// 1613 // *CIDO - BÖLÜM - 155 - ComplianceCheck - Uyumluluk Kontrolü - Uyum Denetim - Regülasyon - Serde
// 1614 export interface ComplianceCheck {
// 1615   regulation: string;
// 1616   requirement: string;
// 1617   status: string;
// 1618   evidence: string;
// 1619   last_checked: number;
// 1620   next_check: number;
// 1621 }
// 1622 // *CIDO - BÖLÜM - 156 - DataClassification - Veri Sınıflandırması - Sınıflandırma - Hassasiyet - Serde
// 1623 export enum DataClassification {
// 1624   Public = "public",
// 1625   Internal = "internal",
// 1626   Confidential = "confidential",
// 1627   Restricted = "restricted",
// 1628   Secret = "secret",
// 1629 }
// 1630 // *CIDO - BÖLÜM - 157 - DataRetentionPolicy - Veri Saklama Politikası - Saklama Kural - GDPR - Serde
// 1631 export interface DataRetentionPolicy {
// 1632   data_type: string;
// 1633   classification: DataClassification;
// 1634   retention_days: number;
// 1635   auto_delete: boolean;
// 1636   legal_basis: string;
// 1637   last_reviewed: number;
// 1638 }
// 1639 // *CIDO - BÖLÜM - 158 - IncidentReport - Olay Raporu - İhlal Kaydı - Müdahale - Serde
// 1640 export interface IncidentReport {
// 1641   id: string;
// 1642   severity: string;
// 1643   status: string;
// 1644   detected_at: number;
// 1645   resolved_at?: number;
// 1646   affected_tenants: string[];
// 1647   affected_users: number;
// 1648   description: string;
// 1649   root_cause: string;
// 1650   resolution: string;
// 1651   post_mortem_url?: string;
// 1652 }
// 1653 // *CIDO - BÖLÜM - 159 - PostMortem - Olay Sonrası Analiz - Postmortem Kaydı - Kök Neden - Serde
// 1654 export interface PostMortem {
// 1655   id: string;
// 1656   incident_id: string;
// 1657   summary: string;
// 1658   timeline: PostMortemEvent[];
// 1659   root_causes: string[];
// 1660   action_items: ActionItem[];
// 1661   created_at: number;
// 1662 }
// 1663 // *CIDO - BÖLÜM - 160 - PostMortemEvent - Postmortem Olayı - Zaman Çizelgesi - Olay Akışı - Serde
// 1664 export interface PostMortemEvent {
// 1665   timestamp: number;
// 1666   event: string;
// 1667   description: string;
// 1668   impact: string;
// 1669 }
// 1670 // *CIDO - BÖLÜM - 161 - ActionItem - Eylem Maddesi - Aksiyon Planı - İyileştirme - Serde
// 1671 export interface ActionItem {
// 1672   id: string;
// 1673   description: string;
// 1674   assignee: string;
// 1675   priority: string;
// 1676   status: string;
// 1677   due_date: number;
// 1678   completed_at?: number;
// 1679 }
// 1680 // *CIDO - BÖLÜM - 162 - SLOConfig - SLO Konfigürasyonu - Hizmet Seviyesi - Uptime Hedef - Serde
// 1681 export interface SLOConfig {
// 1682   service: string;
// 1683   target_percentage: number;
// 1684   measurement_window_days: number;
// 1685   error_budget_remaining: number;
// 1686   current_sli: number;
// 1687 }
// 1688 // *CIDO - BÖLÜM - 163 - AlertRule - Alarm Kuralı - Uyarı Tanım - Eşik Aşımı - Serde
// 1689 export interface AlertRule {
// 1690   id: string;
// 1691   name: string;
// 1692   metric: string;
// 1693   condition: string;
// 1694   threshold: number;
// 1695   duration_seconds: number;
// 1696   channels: string[];
// 1697   enabled: boolean;
// 1698 }
// 1699 // *CIDO - BÖLÜM - 164 - Alert - Alarm - Uyarı Kaydı - Tetiklenme - Serde
// 1700 export interface Alert {
// 1701   id: string;
// 1702   rule_id: string;
// 1703   rule_name: string;
// 1704   severity: string;
// 1705   message: string;
// 1706   triggered_at: number;
// 1707   resolved_at?: number;
// 1708   acknowledged: boolean;
// 1709 }
// 1710 // *CIDO - BÖLÜM - 165 - EscalationPolicy - Eskalasyon Politikası - Yükseltme Kural - Bildirim Zinciri - Serde
// 1711 export interface EscalationPolicy {
// 1712   level: number;
// 1713   wait_minutes: number;
// 1714   notify_channels: string[];
// 1715   notify_users: string[];
// 1716 }
// 1717 // *CIDO - BÖLÜM - 166 - OnCallSchedule - Nöbet Çizelgesi - Nöbet Planı - Vardiya - Serde
// 1718 export interface OnCallSchedule {
// 1719   id: string;
// 1720   name: string;
// 1721   timezone: string;
// 1722   shifts: OnCallShift[];
// 1723   current_on_call: string;
// 1724 }
// 1725 // *CIDO - BÖLÜM - 167 - OnCallShift - Nöbet Vardiyası - Vardiya Tanım - Zaman Aralığı - Serde
// 1726 export interface OnCallShift {
// 1727   day: string;
// 1728   start_time: string;
// 1729   end_time: string;
// 1730   user_id: string;
// 1731   is_primary: boolean;
// 1732 }
// 1733 // *CIDO - BÖLÜM - 168 - MaintenanceWindow - Bakım Penceresi - Planlı Bakım - Kesinti - Serde
// 1734 export interface MaintenanceWindow {
// 1735   id: string;
// 1736   description: string;
// 1737   start_time: number;
// 1738   end_time: number;
// 1739   affected_services: string[];
// 1740   status: string;
// 1741   notified_tenants: boolean;
// 1742 }
// 1743 // *CIDO - BÖLÜM - 169 - ChangeLog - Değişiklik Günlüğü - Sürüm Notu - Değişiklik Takip - Serde
// 1744 export interface ChangeLog {
// 1745   version: string;
// 1746   release_date: number;
// 1747   changes: ChangeEntry[];
// 1748   breaking_changes: string[];
// 1749   migration_guide?: string;
// 1750 }
// 1751 // *CIDO - BÖLÜM - 170 - ChangeEntry - Değişiklik Girişi - Değişiklik Kaydı - Commit Takip - Serde
// 1752 export interface ChangeEntry {
// 1753   type: string;
// 1754   description: string;
// 1755   issue_id?: string;
// 1756   commit_hash?: string;
// 1757   author: string;
// 1758 }
// 1759 // *CIDO - BÖLÜM - 171 - ApiVersion - API Sürümü - Sürüm Tanım - Deprecation - Serde
// 1760 export interface ApiVersion {
// 1761   version: string;
// 1762   status: string;
// 1763   release_date: number;
// 1764   deprecation_date?: number;
// 1765   sunset_date?: number;
// 1766   changelog_url: string;
// 1767 }
// 1768 // *CIDO - BÖLÜM - 172 - DeprecationNotice - Kullanımdan Kaldırma - Deprecation Uyarı - Geçiş Rehberi - Serde
// 1769 export interface DeprecationNotice {
// 1770   api_version: string;
// 1771   deprecated_on: number;
// 1772   removal_on: number;
// 1773   alternative: string;
// 1774   migration_steps: string[];
// 1775 }
// 1776 // *CIDO - BÖLÜM - 173 - TenantQuota - Kiracı Kotası - Kota Takip - Kaynak Sınır - Serde
// 1777 export interface TenantQuota {
// 1778   tenant_id: string;
// 1779   requests_used: number;
// 1780   requests_limit: number;
// 1781   storage_used_mb: number;
// 1782   storage_limit_mb: number;
// 1783   users_count: number;
// 1784   users_limit: number;
// 1785   products_count: number;
// 1786   products_limit: number;
// 1787   ai_neurons_used: number;
// 1788   ai_neurons_limit: number;
// 1789   reset_at: number;
// 1790 }
// 1791 // *CIDO - BÖLÜM - 174 - QuotaAlert - Kota Uyarısı - Kota Alarm - Eşik Yaklaşım - Serde
// 1792 export interface QuotaAlert {
// 1793   tenant_id: string;
// 1794   resource: string;
// 1795   used_percentage: number;
// 1796   threshold_percentage: number;
// 1797   message: string;
// 1798   triggered_at: number;
// 1799   acknowledged: boolean;
// 1800 }
// 1801 // *CIDO - BÖLÜM - 175 - UsageReport - Kullanım Raporu - Kullanım Rapor - Fatura Bazlı - Serde
// 1802 export interface UsageReport {
// 1803   tenant_id: string;
// 1804   period_start: number;
// 1805   period_end: number;
// 1806   total_requests: number;
// 1807   total_bandwidth_bytes: number;
// 1808   total_storage_mb: number;
// 1809   total_ai_neurons: number;
// 1810   overage_requests: number;
// 1811   overage_storage_mb: number;
// 1812   generated_at: number;
// 1813 }
// 1814 // *CIDO - BÖLÜM - 176 - PlanUpgradeRequest - Plan Yükseltme - Yükseltme İsteği - Pro Enterprise - Serde
// 1815 export interface PlanUpgradeRequest {
// 1816   tenant_id: string;
// 1817   current_plan: TenantPlan;
// 1818   requested_plan: TenantPlan;
// 1819   requested_at: number;
// 1820   payment_method?: string;
// 1821   promo_code?: string;
// 1822 }
// 1823 // *CIDO - BÖLÜM - 177 - PlanUpgradeResult - Yükseltme Sonucu - Plan Değişim - Onay Durumu - Serde
// 1824 export interface PlanUpgradeResult {
// 1825   success: boolean;
// 1826   new_plan: TenantPlan;
// 1827   effective_at: number;
// 1828   new_limits: PlanLimits;
// 1829   invoice_url?: string;
// 1830   message?: string;
// 1831 }
// 1832 // *CIDO - BÖLÜM - 178 - WebhookDelivery - Webhook Teslimatı - Teslimat Kaydı - Yeniden Deneme - Serde
// 1833 export interface WebhookDelivery {
// 1834   id: string;
// 1835   webhook_id: string;
// 1836   tenant_id: string;
// 1837   event: string;
// 1838   status: string;
// 1839   status_code: number;
// 1840   attempt: number;
// 1841   sent_at: number;
// 1842   completed_at?: number;
// 1843   response_body?: string;
// 1844   error?: string;
// 1845 }
// 1846 // *CIDO - BÖLÜM - 179 - SearchIndex - Arama Dizini - İndeks Tanım - Vektör Metadata - Serde
// 1847 export interface SearchIndex {
// 1848   id: string;
// 1849   tenant_id: string;
// 1850   product_id: string;
// 1851   embedding: number[];
// 1852   metadata: Record<string, unknown>;
// 1853   updated_at: number;
// 1854 }
// 1855 // *CIDO - BÖLÜM - 180 - RealtimeEvent - Gerçek Zamanlı Olay - Anlık Olay - WebSocket - Serde
// 1856 export interface RealtimeEvent {
// 1857   channel: string;
// 1858   event: string;
// 1859   data: Record<string, unknown>;
// 1860   tenant_id: string;
// 1861   timestamp: number;
// 1862 }
// 1863 // *CIDO - BÖLÜM - 181 - PresenceState - Varlık Durumu - Kullanıcı Durumu - Online Offline - Serde
// 1864 export interface PresenceState {
// 1865   user_id: string;
// 1866   tenant_id: string;
// 1867   status: string;
// 1868   last_seen: number;
// 1869   current_page?: string;
// 1870   device_type?: string;
// 1871 }
// 1872 // *CIDO - BÖLÜM - 182 - AuctionState - Açık Artırma Durumu - Müzayede Durum - Anlık Fiyat - Serde
// 1873 export interface AuctionState {
// 1874   id: string;
// 1875   tenant_id: string;
// 1876   product_id: string;
// 1877   current_bid: number;
// 1878   current_bidder?: string;
// 1879   start_price: number;
// 1880   reserve_price?: number;
// 1881   bid_count: number;
// 1882   starts_at: number;
// 1883   ends_at: number;
// 1884   status: string;
// 1885 }
// 1886 // *CIDO - BÖLÜM - 183 - NotificationChannel - Bildirim Kanalı - Kanal Tanım - E-posta Telegram - Serde
// 1887 export interface NotificationChannel {
// 1888   id: string;
// 1889   type: string;
// 1890   config: Record<string, unknown>;
// 1891   enabled: boolean;
// 1892   verified: boolean;
// 1893   tenant_id: string;
// 1894 }
// 1895 // *CIDO - BÖLÜM - 184 - TemplateVariable - Şablon Değişkeni - Değişken Tanım - Dinamik İçerik - Serde
// 1896 export interface TemplateVariable {
// 1897   name: string;
// 1898   type: string;
// 1899   required: boolean;
// 1900   default_value?: string;
// 1901   description: string;
// 1902 }
// 1903 // *CIDO - BÖLÜM - 185 - ContentFragment - İçerik Parçası - Fragment Tanım - Yeniden Kullanım - Serde
// 1904 export interface ContentFragment {
// 1905   id: string;
// 1906   tenant_id: string;
// 1907   name: string;
// 1908   content: string;
// 1909   variables: TemplateVariable[];
// 1910   updated_at: number;
// 1911 }
// 1912 // *CIDO - BÖLÜM - 186 - TranslationEntry - Çeviri Girişi - Lokalizasyon - Çok Dilli Destek - Serde
// 1913 export interface TranslationEntry {
// 1914   key: string;
// 1915   locale: string;
// 1916   value: string;
// 1917   tenant_id?: string;
// 1918   namespace: string;
// 1919 }
// 1920 // *CIDO - BÖLÜM - 187 - LocaleConfig - Yerel Ayar - Dil Bölge - Format Ayarları - Serde
// 1921 export interface LocaleConfig {
// 1922   locale: string;
// 1923   language: string;
// 1924   region: string;
// 1925   date_format: string;
// 1926   time_format: string;
// 1927   currency: string;
// 1928   number_format: string;
// 1929   first_day_of_week: number;
// 1930 }
// 1931 // *CIDO - BÖLÜM - 188 - AssetManifest - Varlık Manifestosu - Asset Liste - R2 Yol - Serde
// 1932 export interface AssetManifest {
// 1933   tenant_id: string;
// 1934   assets: AssetEntry[];
// 1935   version: string;
// 1936   generated_at: number;
// 1937 }
// 1938 // *CIDO - BÖLÜM - 189 - AssetEntry - Varlık Girişi - Dosya Kaydı - Hash Doğrulama - Serde
// 1939 export interface AssetEntry {
// 1940   path: string;
// 1941   r2_key: string;
// 1942   content_type: string;
// 1943   size_bytes: number;
// 1944   hash: string;
// 1945   cache_control: string;
// 1946 }
// 1947 // *CIDO - BÖLÜM - 190 - SitemapEntry - Site Haritası - URL Liste - SEO - Serde
// 1948 export interface SitemapEntry {
// 1949   url: string;
// 1950   last_modified: string;
// 1951   change_frequency: string;
// 1952   priority: number;
// 1953   images?: SitemapImage[];
// 1954 }
// 1955 // *CIDO - BÖLÜM - 191 - SitemapImage - Site Haritası Görseli - Görsel SEO - Resim İndeksi - Serde
// 1956 export interface SitemapImage {
// 1957   url: string;
// 1958   caption?: string;
// 1959   title?: string;
// 1960   license?: string;
// 1961 }
// 1962 // *CIDO - BÖLÜM - 192 - RobotsRule - Robots Kuralı - Tarama Kuralı - Bot Yönlendirme - Serde
// 1963 export interface RobotsRule {
// 1964   user_agent: string;
// 1965   allow: string[];
// 1966   disallow: string[];
// 1967   crawl_delay?: number;
// 1968 }
// 1969 // *CIDO - BÖLÜM - 193 - StructuredData - Yapılandırılmış Veri - Schema.org - JSON-LD - Serde
// 1970 export interface StructuredData {
// 1971   type: string;
// 1972   data: Record<string, unknown>;
// 1973   script_tag: string;
// 1974 }
// 1975 // *CIDO - BÖLÜM - 194 - OpenGraphTag - Open Graph Etiketi - Sosyal Paylaşım - Meta Tag - Serde
// 1976 export interface OpenGraphTag {
// 1977   title: string;
// 1978   description: string;
// 1979   image: string;
// 1980   url: string;
// 1981   type: string;
// 1982   site_name: string;
// 1983   locale: string;
// 1984 }
// 1985 // *CIDO - BÖLÜM - 195 - TwitterCardTag - Twitter Kartı - Sosyal Medya - Özet Kart - Serde
// 1986 export interface TwitterCardTag {
// 1987   card: string;
// 1988   site: string;
// 1989   title: string;
// 1990   description: string;
// 1991   image: string;
// 1992   image_alt: string;
// 1993 }
// 1994 // *CIDO - BÖLÜM - 196 - BreadcrumbItem - Ekmek Kırıntısı - Navigasyon - Hiyerarşi - Serde
// 1995 export interface BreadcrumbItem {
// 1996   name: string;
// 1997   url: string;
// 1998   position: number;
// 1999 }
// 2000 // *CIDO - BÖLÜM - 197 - SiteConfig - Site Yapılandırması - Site Ayarları - Global Konfig - Serde
// 2001 export interface SiteConfig {
// 2002   name: string;
// 2003   description: string;
// 2004   base_url: string;
// 2005   default_locale: string;
// 2006   supported_locales: string[];
// 2007   timezone: string;
// 2008   contact_email: string;
// 2009   social_links: Record<string, string>;
// 2010 }
// 2011 // *CIDO - BÖLÜM - 198 - AdminUser - Yönetici Kullanıcı - Admin Tanım - Süper Yetkili - Serde
// 2012 export interface AdminUser {
// 2013   id: string;
// 2014   email: string;
// 2015   name: string;
// 2016   role: string;
// 2017   permissions: Permission[];
// 2018   managed_tenants: string[];
// 2019   created_at: number;
// 2020   last_login_at?: number;
// 2021 }
// 2022 // *CIDO - BÖLÜM - 199 - AdminDashboard - Yönetici Paneli - Dashboard Veri - Özet Metrik - Serde
// 2023 export interface AdminDashboard {
// 2024   total_tenants: number;
// 2025   active_tenants: number;
// 2026   total_users: number;
// 2027   total_requests_today: number;
// 2028   error_rate: number;
// 2029   revenue_mrr: number;
// 2030   system_health: HealthCheckResponse;
// 2031   recent_alerts: Alert[];
// 2032 }
// 2033 // *CIDO - BÖLÜM - 200 - GraphQLQuery - GraphQL Sorgusu - Sorgu Tanım - Esnek API - Serde
// 2034 export interface GraphQLQuery {
// 2035   query: string;
// 2036   variables?: Record<string, unknown>;
// 2037   operation_name?: string;
// 2038 }
// 2039 // *CIDO - BÖLÜM - 201 - GraphQLResponse - GraphQL Yanıtı - Yanıt Format - Hata Paketi - Serde
// 2040 export interface GraphQLResponse<T = unknown> {
// 2041   data?: T;
// 2042   errors?: GraphQLError[];
// 2043   extensions?: Record<string, unknown>;
// 2044 }
// 2045 // *CIDO - BÖLÜM - 202 - GraphQLError - GraphQL Hatası - Hata Format - Sorgu Hatası - Serde
// 2046 export interface GraphQLError {
// 2047   message: string;
// 2048   locations?: GraphQLLocation[];
// 2049   path?: string[];
// 2050   extensions?: Record<string, unknown>;
// 2051 }
// 2052 // *CIDO - BÖLÜM - 203 - GraphQLLocation - GraphQL Konumu - Satır Sütun - Hata Konumu - Serde
// 2053 export interface GraphQLLocation {
// 2054   line: number;
// 2055   column: number;
// 2056 }
// 2057 // *CIDO - BÖLÜM - 204 - WebSocketMessage - WebSocket Mesajı - WS Mesaj - Gerçek Zamanlı - Serde
// 2058 export interface WebSocketMessage {
// 2059   type: string;
// 2060   payload: Record<string, unknown>;
// 2061   timestamp: number;
// 2062   sender?: string;
// 2063 }
// 2064 // *CIDO - BÖLÜM - 205 - WebSocketConnection - WebSocket Bağlantısı - WS Oturum - Bağlantı Takip - Serde
// 2065 export interface WebSocketConnection {
// 2066   id: string;
// 2067   tenant_id: string;
// 2068   user_id?: string;
// 2069   connected_at: number;
// 2070   last_activity: number;
// 2071   channels: string[];
// 2072 }
// 2073 // *CIDO - BÖLÜM - 206 - SSEConfig - SSE Konfigürasyonu - Sunucu Olayları - Streaming - Serde
// 2074 export interface SSEConfig {
// 2075   retry_ms: number;
// 2076   event_types: string[];
// 2077   max_connections: number;
// 2078   keepalive_seconds: number;
// 2079 }
// 2080 // *CIDO - BÖLÜM - 207 - SSEEvent - SSE Olayı - Olay Verisi - Stream Mesaj - Serde
// 2081 export interface SSEEvent {
// 2082   id?: string;
// 2083   event: string;
// 2084   data: string;
// 2085   retry?: number;
// 2086 }
// 2087 // *CIDO - BÖLÜM - 208 - StreamChunk - Akış Parçası - Parça Veri - Chunked Response - Serde
// 2088 export interface StreamChunk {
// 2089   index: number;
// 2090   content: string;
// 2091   is_last: boolean;
// 2092   metadata?: Record<string, unknown>;
// 2093 }
// 2094 // *CIDO - BÖLÜM - 209 - MultiPartUpload - Çok Parçalı Yükleme - Parça Başlat - R2 Multipart - Serde
// 2095 export interface MultiPartUpload {
// 2096   upload_id: string;
// 2097   key: string;
// 2098   tenant_id: string;
// 2099   total_parts: number;
// 2100   completed_parts: number;
// 2101   status: string;
// 2102   created_at: number;
// 2103 }
// 2104 // *CIDO - BÖLÜM - 210 - MultiPartChunk - Çok Parçalı Parça - Parça Yükle - Upload ID - Serde
// 2105 export interface MultiPartChunk {
// 2106   part_number: number;
// 2107   upload_id: string;
// 2108   size: number;
// 2109   etag?: string;
// 2110   uploaded: boolean;
// 2111 }
// 2112 // *CIDO - BÖLÜM - 211 - BatchOperation - Toplu İşlem - Batch Kayıt - D1 Transaction - Serde
// 2113 export interface BatchOperation<T = Record<string, unknown>> {
// 2114   id: string;
// 2115   tenant_id: string;
// 2116   operations: BatchItem<T>[];
// 2117   status: string;
// 2118   created_at: number;
// 2119   completed_at?: number;
// 2120 }
// 2121 // *CIDO - BÖLÜM - 212 - BatchItem - Toplu İşlem Öğesi - İşlem Kaydı - Tekil Operasyon - Serde
// 2122 export interface BatchItem<T = Record<string, unknown>> {
// 2123   type: string;
// 2124   table: string;
// 2125   data: T;
// 2126   condition?: Record<string, unknown>;
// 2127   status: string;
// 2128   error?: string;
// 2129 }
// 2130 // *CIDO - BÖLÜM - 213 - MigrationRecord - Göç Kaydı - Şema Geçişi - D1 Migration - Serde
// 2131 export interface MigrationRecord {
// 2132   id: string;
// 2133   name: string;
// 2134   applied_at: number;
// 2135   checksum: string;
// 2136   success: boolean;
// 2137 }
// 2138 // *CIDO - BÖLÜM - 214 - SchemaVersion - Şema Sürümü - Versiyon Takip - D1 Şema - Serde
// 2139 export interface SchemaVersion {
// 2140   current_version: number;
// 2141   last_migration: string;
// 2142   last_applied: number;
// 2143   pending_migrations: string[];
// 2144 }
// 2145 // *CIDO - BÖLÜM - 215 - IndexConfig - İndeks Konfigürasyonu - D1 İndeks - Performans - Serde
// 2146 export interface IndexConfig {
// 2147   table: string;
// 2148   columns: string[];
// 2149   unique: boolean;
// 2150   name: string;
// 2151 }
// 2152 // *CIDO - BÖLÜM - 216 - QueryPlan - Sorgu Planı - Açıklama Planı - Optimizasyon - Serde
// 2153 export interface QueryPlan {
// 2154   query: string;
// 2155   plan: string;
// 2156   estimated_rows: number;
// 2157   index_used?: string;
// 2158 }
// 2159 // *CIDO - BÖLÜM - 217 - DBStats - Veritabanı İstatistikleri - DB İstatistik - D1 Kullanım - Serde
// 2160 export interface DBStats {
// 2161   database_size_bytes: number;
// 2162   table_count: number;
// 2163   total_rows: number;
// 2164   index_count: number;
// 2165   last_vacuum?: number;
// 2166 }
// 2167 // *CIDO - BÖLÜM - 218 - TableStats - Tablo İstatistikleri - Tablo İstatistik - Satır Sayısı - Serde
// 2168 export interface TableStats {
// 2169   name: string;
// 2170   row_count: number;
// 2171   size_bytes: number;
// 2172   index_count: number;
// 2173   last_analyzed?: number;
// 2174 }
// 2175 // *CIDO - BÖLÜM - 219 - WAFRuleSet - WAF Kural Seti - Kural Grup - Güvenlik Paketi - Serde
// 2176 export interface WAFRuleSet {
// 2177   id: string;
// 2178   name: string;
// 2179   rules: WAFRule[];
// 2180   mode: string;
// 2181   default_action: string;
// 2182 }
// 2183 // *CIDO - BÖLÜM - 220 - IPSet - IP Kümesi - IP Liste - Beyaz Kara Liste - Serde
// 2184 export interface IPSet {
// 2185   id: string;
// 2186   name: string;
// 2187   type: string;
// 2188   ips: string[];
// 2189   tenant_id: string;
// 2190 }
// 2191 // *CIDO - BÖLÜM - 221 - GeoBlockRule - Coğrafi Engelleme - Ülke Bazlı - Erişim Kontrol - Serde
// 2192 export interface GeoBlockRule {
// 2193   id: string;
// 2194   tenant_id: string;
// 2195   countries: string[];
// 2196   action: string;
// 2197   enabled: boolean;
// 2198 }
// 2199 // *CIDO - BÖLÜM - 222 - RateLimitRule - Hız Sınırlama Kuralı - Limit Kural - Endpoint Bazlı - Serde
// 2200 export interface RateLimitRule {
// 2201   id: string;
// 2202   tenant_id: string;
// 2203   endpoint: string;
// 2204   method: string;
// 2205   limit: number;
// 2206   window_seconds: number;
// 2207   action: string;
// 2208   enabled: boolean;
// 2209 }
// 2210 // *CIDO - BÖLÜM - 223 - FirewallLog - Güvenlik Duvarı Kaydı - Firewall Log - Engelleme Kaydı - Serde
// 2211 export interface FirewallLog {
// 2212   id: string;
// 2213   tenant_id: string;
// 2214   rule_id: string;
// 2215   rule_type: string;
// 2216   action: string;
// 2217   ip_address: string;
// 2218   timestamp: number;
// 2219 }
// 2220 // *CIDO - BÖLÜM - 224 - SecurityScore - Güvenlik Skoru - Skor Hesaplama - Zafiyet Puanı - Serde
// 2221 export interface SecurityScore {
// 2222   tenant_id: string;
// 2223   overall_score: number;
// 2224   categories: SecurityCategoryScore[];
// 2225   assessed_at: number;
// 2226 }
// 2227 // *CIDO - BÖLÜM - 225 - SecurityCategoryScore - Kategori Skoru - Alt Skor - Güvenlik Bileşen - Serde
// 2228 export interface SecurityCategoryScore {
// 2229   category: string;
// 2230   score: number;
// 2231   max_score: number;
// 2232   findings: number;
// 2233 }
// 2234 // *CIDO - BÖLÜM - 226 - EncryptionKey - Şifreleme Anahtarı - Anahtar Meta - AES-256-GCM - Serde
// 2235 export interface EncryptionKey {
// 2236   id: string;
// 2237   tenant_id: string;
// 2238   algorithm: string;
// 2239   key_size: number;
// 2240   created_at: number;
// 2241   rotated_at?: number;
// 2242   expires_at: number;
// 2243   is_active: boolean;
// 2244 }
// 2245 // *CIDO - BÖLÜM - 227 - EncryptionResult - Şifreleme Sonucu - Şifreli Çıktı - Nonce Tag - Serde
// 2246 export interface EncryptionResult {
// 2247   ciphertext_base64: string;
// 2248   nonce_base64: string;
// 2249   tag_base64: string;
// 2250   key_id: string;
// 2251 }
// 2252 // *CIDO - BÖLÜM - 228 - DecryptionInput - Şifre Çözme Girdisi - Çözme Param - Kimlik Doğrulama - Serde
// 2253 export interface DecryptionInput {
// 2254   ciphertext_base64: string;
// 2255   nonce_base64: string;
// 2256   tag_base64: string;
// 2257   key_id: string;
// 2258 }
// 2259 // *CIDO - BÖLÜM - 229 - HMACConfig - HMAC Konfigürasyonu - HMAC Ayarları - İmza Algoritma - Serde
// 2260 export interface HMACConfig {
// 2261   algorithm: string;
// 2262   key_size: number;
// 2263   encoding: string;
// 2264 }
// 2265 // *CIDO - BÖLÜM - 230 - CSRFToken - CSRF Token - Form Güvenliği - Anti-CSRF - Serde
// 2266 export interface CSRFToken {
// 2267   token: string;
// 2268   expires_at: number;
// 2269   cookie_name: string;
// 2270   header_name: string;
// 2271 }
// 2272 // *CIDO - BÖLÜM - 231 - NonceToken - Nonce Token - Tek Kullanımlık - Tekrar Saldırısı - Serde
// 2273 export interface NonceToken {
// 2274   value: string;
// 2275   created_at: number;
// 2276   expires_at: number;
// 2277   used: boolean;
// 2278   context: string;
// 2279 }
// 2280 // *CIDO - BÖLÜM - 232 - SecureCookie - Güvenli Çerez - Şifreli Çerez - HttpOnly Secure - Serde
// 2281 export interface SecureCookie {
// 2282   name: string;
// 2283   value_encrypted: string;
// 2284   iv: string;
// 2285   created_at: number;
// 2286   max_age: number;
// 2287 }
// 2288 // *CIDO - BÖLÜM - 233 - JWTHeader - JWT Başlığı - Header Tip - Algoritma - Serde
// 2289 export interface JWTHeader {
// 2290   alg: string;
// 2291   typ: string;
// 2292   kid?: string;
// 2293 }
// 2294 // *CIDO - BÖLÜM - 234 - JWKKey - JWK Anahtarı - Anahtar Seti - RSA EC HMAC - Serde
// 2295 export interface JWKKey {
// 2296   kty: string;
// 2297   use: string;
// 2298   kid: string;
// 2299   alg: string;
// 2300   n?: string;
// 2301   e?: string;
// 2302   crv?: string;
// 2303   x?: string;
// 2304   y?: string;
// 2305 }
// 2306 // *CIDO - BÖLÜM - 235 - JWKSet - JWK Anahtar Seti - Çoklu Anahtar - Rotasyon - Serde
// 2307 export interface JWKSet {
// 2308   keys: JWKKey[];
// 2309 }
// 2310 // *CIDO - BÖLÜM - 236 - OIDCConfig - OpenID Connect - OIDC Ayarları - Federasyon - Serde
// 2311 export interface OIDCConfig {
// 2312   issuer: string;
// 2313   authorization_endpoint: string;
// 2314   token_endpoint: string;
// 2315   userinfo_endpoint: string;
// 2316   jwks_uri: string;
// 2317   scopes_supported: string[];
// 2318 }
// 2319 // *CIDO - BÖLÜM - 237 - SAMLConfig - SAML Konfigürasyonu - SAML Ayarları - SSO - Serde
// 2320 export interface SAMLConfig {
// 2321   entity_id: string;
// 2322   acs_url: string;
// 2323   slo_url: string;
// 2324   idp_metadata_url: string;
// 2325   certificate: string;
// 2326 }
// 2327 // *CIDO - BÖLÜM - 238 - LDAPConfig - LDAP Konfigürasyonu - Dizin Servisi - Kurumsal Auth - Serde
// 2328 export interface LDAPConfig {
// 2329   url: string;
// 2330   base_dn: string;
// 2331   bind_dn: string;
// 2332   search_filter: string;
// 2333   attributes: string[];
// 2334 }
// 2335 // *CIDO - BÖLÜM - 239 - PasskeyCredential - Geçiş Anahtarı - WebAuthn - Biyometrik - Serde
// 2336 export interface PasskeyCredential {
// 2337   id: string;
// 2338   public_key: string;
// 2339   counter: number;
// 2340   device_type: string;
// 2341   created_at: number;
// 2342   last_used_at: number;
// 2343 }
// 2344 // *CIDO - BÖLÜM - 240 - WebAuthnConfig - WebAuthn Ayarları - FIDO2 - Şifresiz Giriş - Serde
// 2345 export interface WebAuthnConfig {
// 2346   rp_name: string;
// 2347   rp_id: string;
// 2348   origin: string;
// 2349   challenge_ttl_seconds: number;
// 2350 }
// 2351 // *CIDO - BÖLÜM - 241 - CertificateInfo - Sertifika Bilgisi - SSL/TLS - Sertifika Meta - Serde
// 2352 export interface CertificateInfo {
// 2353   issuer: string;
// 2354   subject: string;
// 2355   valid_from: number;
// 2356   valid_to: number;
// 2357   fingerprint: string;
// 2358   serial_number: string;
// 2359 }
// 2360 // *CIDO - BÖLÜM - 242 - DNSEntry - DNS Kaydı - Domain Yönetimi - Tenant Domain - Serde
// 2361 export interface DNSEntry {
// 2362   type: string;
// 2363   name: string;
// 2364   value: string;
// 2365   ttl: number;
// 2366   proxied: boolean;
// 2367 }
// 2368 // *CIDO - BÖLÜM - 243 - CustomDomainConfig - Özel Domain - Tenant Domain - SSL Yönetimi - Serde
// 2369 export interface CustomDomainConfig {
// 2370   tenant_id: string;
// 2371   domain: string;
// 2372   verified: boolean;
// 2373   ssl_status: string;
// 2374   dns_entries: DNSEntry[];
// 2375   created_at: number;
// 2376 }
// 2377 // *CIDO - BÖLÜM - 244 - StorageQuota - Depolama Kotası - Disk Sınır - Tenant Başı - Serde
// 2378 export interface StorageQuota {
// 2379   tenant_id: string;
// 2380   r2_used_bytes: number;
// 2381   r2_limit_bytes: number;
// 2382   kv_used_keys: number;
// 2383   kv_limit_keys: number;
// 2384   d1_used_rows: number;
// 2385   d1_limit_rows: number;
// 2386 }
// 2387 // *CIDO - BÖLÜM - 245 - BandwidthUsage - Bant Genişliği - Trafik Takip - Veri Transfer - Serde
// 2388 export interface BandwidthUsage {
// 2389   tenant_id: string;
// 2390   ingress_bytes: number;
// 2391   egress_bytes: number;
// 2392   total_bytes: number;
// 2393   period_start: number;
// 2394   period_end: number;
// 2395 }
// 2396 // *CIDO - BÖLÜM - 246 - CostEstimate - Maliyet Tahmini - Ücretsiz Katman - Limit Kontrol - Serde
// 2397 export interface CostEstimate {
// 2398   tenant_id: string;
// 2399   workers_cost: number;
// 2400   kv_cost: number;
// 2401   d1_cost: number;
// 2402   r2_cost: number;
// 2403   ai_cost: number;
// 2404   total_cost: number;
// 2405   is_free_tier: boolean;
// 2406 }
// 2407 // *CIDO - BÖLÜM - 247 - FreeTierLimit - Ücretsiz Limit - Katman Kontrol - Kota Uyarı - Serde
// 2408 export interface FreeTierLimit {
// 2409   service: string;
// 2410   limit: number;
// 2411   used: number;
// 2412   remaining: number;
// 2413   reset_at: number;
// 2414 }
// 2415 // *CIDO - BÖLÜM - 248 - ResourceWarning - Kaynak Uyarısı - Limit Yaklaşım - %80 Eşik - Serde
// 2416 export interface ResourceWarning {
// 2417   tenant_id: string;
// 2418   resource: string;
// 2419   usage_percentage: number;
// 2420   message: string;
// 2421   triggered_at: number;
// 2422 }
// 2423 // *CIDO - BÖLÜM - 249 - WorkspaceConfig - Çalışma Alanı - Monorepo Ayarları - pnpm Workspace - Serde
// 2424 export interface WorkspaceConfig {
// 2425   name: string;
// 2426   packages: string[];
// 2427   root_path: string;
// 2428 }
// 2429 // *CIDO - BÖLÜM - 250 - BuildConfig - Derleme Konfigürasyonu - Build Ayarları - WASM Hedef - Serde
// 2430 export interface BuildConfig {
// 2431   target: string;
// 2432   optimization_level: number;
// 2433   debug_symbols: boolean;
// 2434   features: string[];
// 2435 }
// 2436 // *CIDO - BÖLÜM - 251 - TestConfig - Test Konfigürasyonu - Test Ayarları - Kapsama Hedefi - Serde
// 2437 export interface TestConfig {
// 2438   coverage_threshold: number;
// 2439   timeout_seconds: number;
// 2440   test_pattern: string;
// 2441   fail_fast: boolean;
// 2442 }
// 2443 // *CIDO - BÖLÜM - 252 - LintConfig - Lint Konfigürasyonu - Kod Kalitesi - Clippy ESLint - Serde
// 2444 export interface LintConfig {
// 2445   rules: Record<string, string>;
// 2446   ignore_patterns: string[];
// 2447   max_warnings: number;
// 2448   strict_mode: boolean;
// 2449 }
// 2450 // *CIDO - BÖLÜM - 253 - FormatConfig - Format Konfigürasyonu - Kod Stili - Prettier rustfmt - Serde
// 2451 export interface FormatConfig {
// 2452   indent_size: number;
// 2453   max_line_length: number;
// 2454   single_quote: boolean;
// 2455   trailing_comma: boolean;
// 2456 }
// 2457 // *CIDO - BÖLÜM - 254 - GitHookConfig - Git Hook - Pre-commit - Otomatik Kontrol - Serde
// 2458 export interface GitHookConfig {
// 2459   pre_commit: string[];
// 2460   pre_push: string[];
// 2461   commit_msg_pattern: string;
// 2462 }
// 2463 // *CIDO - BÖLÜM - 255 - CodeOwnerRule - Kod Sahibi - Sorumluluk Atama - CODEOWNERS - Serde
// 2464 export interface CodeOwnerRule {
// 2465   path: string;
// 2466   owners: string[];
// 2467 }
// 2468 // *CIDO - BÖLÜM - 256 - BranchProtection - Dal Koruması - Merge Kuralı - Review Zorunlu - Serde
// 2469 export interface BranchProtection {
// 2470   branch: string;
// 2471   required_reviews: number;
// 2472   required_checks: string[];
// 2473   dismiss_stale_reviews: boolean;
// 2474 }
// 2475 // *CIDO - BÖLÜM - 257 - CIJob - CI İşi - İş Tanımı - Pipeline Adımı - Serde
// 2476 export interface CIJob {
// 2477   name: string;
// 2478   command: string;
// 2479   timeout_minutes: number;
// 2480   artifacts: string[];
// 2481   depends_on: string[];
// 2482 }
// 2483 // *CIDO - BÖLÜM - 258 - CIPipeline - CI Pipeline - İş Akışı - GitHub Actions - Serde
// 2484 export interface CIPipeline {
// 2485   name: string;
// 2486   trigger: string;
// 2487   jobs: CIJob[];
// 2488   environment: Record<string, string>;
// 2489 }
// 2490 // *CIDO - BÖLÜM - 259 - CDStage - CD Aşaması - Dağıtım Adımı - Ortam Geçişi - Serde
// 2491 export interface CDStage {
// 2492   name: string;
// 2493   environment: string;
// 2494   approval_required: boolean;
// 2495   approvers: string[];
// 2496   rollback_enabled: boolean;
// 2497 }
// 2498 // *CIDO - BÖLÜM - 260 - DeployStrategy - Dağıtım Stratejisi - Canary BlueGreen - Sıfır Kesinti - Serde
// 2499 export interface DeployStrategy {
// 2500   type: string;
// 2501   traffic_split_percent: number;
// 2502   health_check_path: string;
// 2503   warmup_seconds: number;
// 2504 }
// 2505 // *CIDO - BÖLÜM - 261 - RollbackConfig - Geri Alma - Rollback Strateji - Son Stabil - Serde
// 2506 export interface RollbackConfig {
// 2507   max_versions_to_keep: number;
// 2508   auto_rollback_on_error: boolean;
// 2509   notification_channels: string[];
// 2510 }
// 2511 // *CIDO - BÖLÜM - 262 - EnvironmentConfig - Ortam Konfigürasyonu - Dev Staging Prod - Serde
// 2512 export interface EnvironmentConfig {
// 2513   name: string;
// 2514   workers_subdomain: string;
// 2515   d1_database_id: string;
// 2516   kv_namespace_id: string;
// 2517   r2_bucket_name: string;
// 2518 }
// 2519 // *CIDO - BÖLÜM - 263 - FeatureEnvironment - Özellik Ortamı - Preview Deploy - Branch Bazlı - Serde
// 2520 export interface FeatureEnvironment {
// 2521   branch: string;
// 2522   pr_number: number;
// 2523   url: string;
// 2524   expires_at: number;
// 2525   created_by: string;
// 2526 }
// 2527 // *CIDO - BÖLÜM - 264 - SmokeTest - Duman Testi - Temel Kontrol - Dağıtım Sonrası - Serde
// 2528 export interface SmokeTest {
// 2529   name: string;
// 2530   endpoint: string;
// 2531   method: string;
// 2532   expected_status: number;
// 2533   expected_body_contains?: string;
// 2534 }
// 2535 // *CIDO - BÖLÜM - 265 - PerformanceBudget - Performans Bütçesi - Bütçe Limit - Sayfa Yükü - Serde
// 2536 export interface PerformanceBudget {
// 2537   page: string;
// 2538   max_first_byte_ms: number;
// 2539   max_total_load_ms: number;
// 2540   max_size_kb: number;
// 2541   max_requests: number;
// 2542 }
// 2543 // *CIDO - BÖLÜM - 266 - LighthouseScore - Lighthouse Skoru - Audit Puanı - Web Vital - Serde
// 2544 export interface LighthouseScore {
// 2545   performance: number;
// 2546   accessibility: number;
// 2547   best_practices: number;
// 2548   seo: number;
// 2549   pwa: number;
// 2550 }
// 2551 // *CIDO - BÖLÜM - 267 - BundleAnalysis - Bundle Analizi - Paket Boyutu - Tree Shaking - Serde
// 2552 export interface BundleAnalysis {
// 2553   total_size_kb: number;
// 2554   gzipped_size_kb: number;
// 2555   modules: BundleModule[];
// 2556   largest_dependencies: string[];
// 2557 }
// 2558 // *CIDO - BÖLÜM - 268 - BundleModule - Bundle Modülü - Modül Boyutu - Kod Bölme - Serde
// 2559 export interface BundleModule {
// 2560   name: string;
// 2561   size_kb: number;
// 2562   percentage: number;
// 2563   dependencies: string[];
// 2564 }
// 2565 // *CIDO - BÖLÜM - 269 - DependencyGraph - Bağımlılık Grafiği - Modül Ağacı - İçe Aktarım - Serde
// 2566 export interface DependencyGraph {
// 2567   nodes: DependencyNode[];
// 2568   edges: DependencyEdge[];
// 2569 }
// 2570 // *CIDO - BÖLÜM - 270 - DependencyNode - Bağımlılık Düğümü - Modül Düğüm - Paket - Serde
// 2571 export interface DependencyNode {
// 2572   id: string;
// 2573   name: string;
// 2574   version: string;
// 2575   size_kb: number;
// 2576 }
// 2577 // *CIDO - BÖLÜM - 271 - DependencyEdge - Bağımlılık Kenarı - İlişki - Import Zinciri - Serde
// 2578 export interface DependencyEdge {
// 2579   from: string;
// 2580   to: string;
// 2581   type: string;
// 2582 }
// 2583 // *CIDO - BÖLÜM - 272 - CodeComplexity - Kod Karmaşıklığı - Cyclomatic - Bakım İndeksi - Serde
// 2584 export interface CodeComplexity {
// 2585   file: string;
// 2586   complexity: number;
// 2587   lines: number;
// 2588   functions: FunctionComplexity[];
// 2589 }
// 2590 // *CIDO - BÖLÜM - 273 - FunctionComplexity - Fonksiyon Karmaşıklığı - Karmaşıklık Skoru - Derinlik - Serde
// 2591 export interface FunctionComplexity {
// 2592   name: string;
// 2593   complexity: number;
// 2594   lines: number;
// 2595   parameters: number;
// 2596   nesting_depth: number;
// 2597 }
// 2598 // *CIDO - BÖLÜM - 274 - TechnicalDebt - Teknik Borç - Borç Metriği - İyileştirme Listesi - Serde
// 2599 export interface TechnicalDebt {
// 2600   file: string;
// 2601   issue: string;
// 2602   severity: string;
// 2603   effort_hours: number;
// 2604   created_at: number;
// 2605 }
// 2606 // *CIDO - BÖLÜM - 275 - RefactoringCandidate - Yeniden Düzenleme - Refactor Hedef - Kod Kokusu - Serde
// 2607 export interface RefactoringCandidate {
// 2608   file: string;
// 2609   code_smell: string;
// 2610   suggestion: string;
// 2611   impact: string;
// 2612 }
// 2613 // *CIDO - BÖLÜM - 276 - CodeReviewCheck - Kod İnceleme - Review Kuralı - Otomatik Kontrol - Serde
// 2614 export interface CodeReviewCheck {
// 2615   rule: string;
// 2616   passed: boolean;
// 2617   file: string;
// 2618   line: number;
// 2619   message: string;
// 2620 }
// 2621 // *CIDO - BÖLÜM - 277 - TypeCoverage - Tip Kapsaması - TypeScript Katı - Any Yok - Serde
// 2622 export interface TypeCoverage {
// 2623   total_types: number;
// 2624   explicit_types: number;
// 2625   any_count: number;
// 2626   coverage_percentage: number;
// 2627   files_checked: number;
// 2628 }
// 2629 // *CIDO - BÖLÜM - 278 - StrictnessReport - Katılık Raporu - TS Strict - Tam Denetim - Serde
// 2630 export interface StrictnessReport {
// 2631   strict_mode: boolean;
// 2632   no_implicit_any: boolean;
// 2633   strict_null_checks: boolean;
// 2634   strict_function_types: boolean;
// 2635   exact_optional_properties: boolean;
// 2636 }
// 2637 // *CIDO - BÖLÜM - 279 - ModuleExport - Modül Dışa Aktarımı - Export Map - Paket Arayüzü - Serde
// 2638 export interface ModuleExport {
// 2639   module: string;
// 2640   exports: string[];
// 2641   types: string[];
// 2642   re_exports_from: string[];
// 2643 }
// 2644 // *CIDO - BÖLÜM - 280 - PackageJSON - Paket JSON - NPM Paketi - Bağımlılık Listesi - Serde
// 2645 export interface PackageJSON {
// 2646   name: string;
// 2647   version: string;
// 2648   private: boolean;
// 2649   dependencies: Record<string, string>;
// 2650   dev_dependencies: Record<string, string>;
// 2651   scripts: Record<string, string>;
// 2652 }
// 2653 // *CIDO - BÖLÜM - 281 - TSConfigJSON - TypeScript Konfigürasyonu - TS Ayarları - Derleme - Serde
// 2654 export interface TSConfigJSON {
// 2655   compiler_options: Record<string, unknown>;
// 2656   include: string[];
// 2657   exclude: string[];
// 2658   references: TSConfigReference[];
// 2659 }
// 2660 // *CIDO - BÖLÜM - 282 - TSConfigReference - TS Referansı - Proje Referans - Monorepo - Serde
// 2661 export interface TSConfigReference {
// 2662   path: string;
// 2663 }
// 2664 // *CIDO - BÖLÜM - 283 - WranglerConfig - Wrangler Konfigürasyonu - Workers Ayarları - TOML - Serde
// 2665 export interface WranglerConfig {
// 2666   name: string;
// 2667   main: string;
// 2668   compatibility_date: string;
// 2669   d1_databases: WranglerD1Config[];
// 2670   kv_namespaces: WranglerKVConfig[];
// 2671   r2_buckets: WranglerR2Config[];
// 2672   queues: WranglerQueueConfig[];
// 2673 }
// 2674 // *CIDO - BÖLÜM - 284 - WranglerD1Config - Wrangler D1 - D1 Bağlantısı - Binding - Serde
// 2675 export interface WranglerD1Config {
// 2676   binding: string;
// 2677   database_name: string;
// 2678   database_id: string;
// 2679 }
// 2680 // *CIDO - BÖLÜM - 285 - WranglerKVConfig - Wrangler KV - KV Namespace - Binding - Serde
// 2681 export interface WranglerKVConfig {
// 2682   binding: string;
// 2683   id: string;
// 2684 }
// 2685 // *CIDO - BÖLÜM - 286 - WranglerR2Config - Wrangler R2 - R2 Bucket - Binding - Serde
// 2686 export interface WranglerR2Config {
// 2687   binding: string;
// 2688   bucket_name: string;
// 2689 }
// 2690 // *CIDO - BÖLÜM - 287 - WranglerQueueConfig - Wrangler Queue - Queue Bağlantı - Binding - Serde
// 2691 export interface WranglerQueueConfig {
// 2692   binding: string;
// 2693   queue_name: string;
// 2694 }
// 2695 // *CIDO - BÖLÜM - 288 - CargoToml - Cargo TOML - Rust Paketi - Bağımlılık - Serde
// 2696 export interface CargoToml {
// 2697   package_name: string;
// 2698   version: string;
// 2699   edition: string;
// 2700   dependencies: Record<string, CargoDependency>;
// 2701 }
// 2702 // *CIDO - BÖLÜM - 289 - CargoDependency - Cargo Bağımlılık - Krate Versiyon - Özellikler - Serde
// 2703 export interface CargoDependency {
// 2704   version?: string;
// 2705   path?: string;
// 2706   features?: string[];
// 2707   optional: boolean;
// 2708 }
// 2709 // *CIDO - BÖLÜM - 290 - CargoWorkspace - Cargo Çalışma Alanı - Workspace Üye - Ortak Deps - Serde
// 2710 export interface CargoWorkspace {
// 2711   members: string[];
// 2712   dependencies: Record<string, CargoDependency>;
// 2713 }
// 2714 // *CIDO - BÖLÜM - 291 - DevVars - Geliştirme Değişkenleri - .dev.vars - Secret Placeholder - Serde
// 2715 export interface DevVars {
// 2716   worker_secret: string;
// 2717   jwt_secret: string;
// 2718   webhook_secret: string;
// 2719   telegram_bot_token: string;
// 2720   telegram_chat_id: string;
// 2721   admin_email: string;
// 2722 }
// 2723 // *CIDO - BÖLÜM - 292 - EnvExample - Ortam Örneği - .env.example - Geliştirici Kopyası - Serde
// 2724 export interface EnvExample {
// 2725   variables: Record<string, string>;
// 2726   description: string;
// 2727 }
// 2728 // *CIDO - BÖLÜM - 293 - GitIgnore - Git Yoksay - Hariç Tutma - node_modules target - Serde
// 2729 export interface GitIgnore {
// 2730   patterns: string[];
// 2731 }
// 2732 // *CIDO - BÖLÜM - 294 - DockerfileConfig - Dockerfile Konfigürasyonu - Konteyner - İmaj - Serde
// 2733 export interface DockerfileConfig {
// 2734   base_image: string;
// 2735   workdir: string;
// 2736   commands: string[];
// 2737   exposed_ports: number[];
// 2738   env_vars: Record<string, string>;
// 2739 }
// 2740 // *CIDO - BÖLÜM - 295 - DockerComposeService - Compose Servisi - Servis Tanım - Orkestrasyon - Serde
// 2741 export interface DockerComposeService {
// 2742   image?: string;
// 2743   build?: string;
// 2744   ports: string[];
// 2745   environment: Record<string, string>;
// 2746   volumes: string[];
// 2747   depends_on: string[];
// 2748 }
// 2749 // *CIDO - BÖLÜM - 296 - ReadmeSection - README Bölümü - Dokümantasyon - Başlangıç - Serde
// 2750 export interface ReadmeSection {
// 2751   title: string;
// 2752   content: string;
// 2753   order: number;
// 2754 }
// 2755 // *CIDO - BÖLÜM - 297 - ChangelogEntry - Değişiklik Günlüğü - CHANGELOG - Sürüm Notu - Serde
// 2756 export interface ChangelogEntry {
// 2757   version: string;
// 2758   date: string;
// 2759   sections: Record<string, string[]>;
// 2760 }
// 2761 // *CIDO - BÖLÜM - 298 - LicenseConfig - Lisans Konfigürasyonu - MIT Apache - Yasal Metin - Serde
// 2762 export interface LicenseConfig {
// 2763   type: string;
// 2764   year: number;
// 2765   copyright_holder: string;
// 2766 }
// 2767 // *CIDO - BÖLÜM - 299 - ContributingGuide - Katkı Rehberi - CONTRIBUTING - PR Kuralı - Serde
// 2768 export interface ContributingGuide {
// 2769   sections: ReadmeSection[];
// 2770   pr_template: string;
// 2771   issue_template: string;
// 2772 }
// 2773 // *CIDO - BÖLÜM - 300 - CodeOfConduct - Davranış Kuralları - CoC - Topluluk - Serde
// 2774 export interface CodeOfConduct {
// 2775   pledge: string;
// 2776   standards: string[];
// 2777   enforcement: string;
// 2778 }
// 2779 // *CIDO - BÖLÜM - 301 - SecurityPolicy - Güvenlik Politikası - SECURITY - Açık Bildirimi - Serde
// 2780 export interface SecurityPolicy {
// 2781   supported_versions: string[];
// 2782   reporting_email: string;
// 2783   pgp_key?: string;
// 2784   response_time_hours: number;
// 2785 }
// 2786 // *CIDO - BÖLÜM - 302 - SupportConfig - Destek Konfigürasyonu - Destek Kanalları - SLA - Serde
// 2787 export interface SupportConfig {
// 2788   email: string;
// 2789   slack_channel?: string;
// 2790   response_sla_hours: Record<string, number>;
// 2791   business_hours_only: boolean;
// 2792 }
// 2793 // *CIDO - BÖLÜM - 303 - SLADefinition - SLA Tanımı - Hizmet Seviyesi - Uptime Garantisi - Serde
// 2794 export interface SLADefinition {
// 2795   service: string;
// 2796   uptime_percentage: number;
// 2797   response_time_ms: number;
// 2798   penalty_percentage: number;
// 2799 }
// 2800 // *CIDO - BÖLÜM - 304 - OnboardingStep - Başlangıç Adımı - Kullanıcı Karşılama - Tenant Kurulum - Serde
// 2801 export interface OnboardingStep {
// 2802   step: number;
// 2803   title: string;
// 2804   description: string;
// 2805   required: boolean;
// 2806   completed: boolean;
// 2807 }
// 2808 // *CIDO - BÖLÜM - 305 - TenantOnboarding - Kiracı Karşılama - Kurulum Sihirbazı - Adım Takip - Serde
// 2809 export interface TenantOnboarding {
// 2810   tenant_id: string;
// 2811   steps: OnboardingStep[];
// 2812   current_step: number;
// 2813   started_at: number;
// 2814   completed_at?: number;
// 2815 }
// 2816 // *CIDO - BÖLÜM - 306 - QuickStartGuide - Hızlı Başlangıç - Örnek Kod - İlk Ürün - Serde
// 2817 export interface QuickStartGuide {
// 2818   language: string;
// 2819   title: string;
// 2820   steps: string[];
// 2821   code_snippets: Record<string, string>;
// 2822 }
// 2823 // *CIDO - BÖLÜM - 307 - APIPlayground - API Deneme - Test Ortamı - Swagger - Serde
// 2824 export interface APIPlayground {
// 2825   base_url: string;
// 2826   endpoints: APIEndpoint[];
// 2827   auth_token?: string;
// 2828 }
// 2829 // *CIDO - BÖLÜM - 308 - APIEndpoint - API Uç Noktası - Endpoint Tanım - Rota Bilgisi - Serde
// 2830 export interface APIEndpoint {
// 2831   path: string;
// 2832   method: string;
// 2833   description: string;
// 2834   parameters: APIParameter[];
// 2835   responses: Record<string, APIResponseExample>;
// 2836 }
// 2837 // *CIDO - BÖLÜM - 309 - APIParameter - API Parametresi - Parametre Tanım - Sorgu Gövde - Serde
// 2838 export interface APIParameter {
// 2839   name: string;
// 2840   in: string;
// 2841   required: boolean;
// 2842   type: string;
// 2843   description: string;
// 2844 }
// 2845 // *CIDO - BÖLÜM - 310 - APIResponseExample - API Yanıt Örneği - Örnek Yanıt - Dokümantasyon - Serde
// 2846 export interface APIResponseExample {
// 2847   status: number;
// 2848   description: string;
// 2849   example: Record<string, unknown>;
// 2850 }
// 2851 // *CIDO - BÖLÜM - 311 - MockServer - Sahte Sunucu - Test Verisi - Geliştirme Ortamı - Serde
// 2852 export interface MockServer {
// 2853   port: number;
// 2854   routes: MockRoute[];
// 2855   latency_ms: number;
// 2856 }
// 2857 // *CIDO - BÖLÜM - 312 - MockRoute - Sahte Rota - Rota Tanım - Test Yanıtı - Serde
// 2858 export interface MockRoute {
// 2859   path: string;
// 2860   method: string;
// 2861   response_status: number;
// 2862   response_body: Record<string, unknown>;
// 2863 }
// 2864 // *CIDO - BÖLÜM - 313 - SeedData - Tohum Veri - Test Verisi - Demo Tenant - Serde
// 2865 export interface SeedData {
// 2866   tenants: TenantConfig[];
// 2867   users: User[];
// 2868   products: Record<string, unknown>[];
// 2869   orders: Record<string, unknown>[];
// 2870 }
// 2871 // *CIDO - BÖLÜM - 314 - FixtureData - Fikstür Verisi - Birim Test - Sabit Veri - Serde
// 2872 export interface FixtureData {
// 2873   name: string;
// 2874   data: Record<string, unknown>;
// 2875   description: string;
// 2876 }
// 2877 // *CIDO - BÖLÜM - 315 - TestSuite - Test Paketi - Test Grubu - Kapsam - Serde
// 2878 export interface TestSuite {
// 2879   name: string;
// 2880   tests: TestCase[];
// 2881   setup?: string;
// 2882   teardown?: string;
// 2883 }
// 2884 // *CIDO - BÖLÜM - 316 - TestCase - Test Durumu - Birim Test - Assertion - Serde
// 2885 export interface TestCase {
// 2886   name: string;
// 2887   input: Record<string, unknown>;
// 2888   expected: Record<string, unknown>;
// 2889   timeout_ms: number;
// 2890 }
// 2891 // *CIDO - BÖLÜM - 317 - BenchmarkResult - Benchmark Sonucu - Performans Testi - Karşılaştırma - Serde
// 2892 export interface BenchmarkResult {
// 2893   name: string;
// 2894   ops_per_second: number;
// 2895   avg_time_ms: number;
// 2896   p99_time_ms: number;
// 2897   memory_kb: number;
// 2898 }
// 2899 // *CIDO - BÖLÜM - 318 - StressTestConfig - Stres Testi - Yük Testi - Eşzamanlı Kullanıcı - Serde
// 2900 export interface StressTestConfig {
// 2901   concurrent_users: number;
// 2902   duration_seconds: number;
// 2903   ramp_up_seconds: number;
// 2904   target_rps: number;
// 2905 }
// 2906 // *CIDO - BÖLÜM - 319 - LoadTestResult - Yük Testi Sonucu - RPS Gecikme - Hata Oranı - Serde
// 2907 export interface LoadTestResult {
// 2908   total_requests: number;
// 2909   successful_requests: number;
// 2910   failed_requests: number;
// 2911   avg_latency_ms: number;
// 2912   max_latency_ms: number;
// 2913   p95_latency_ms: number;
// 2914   rps: number;
// 2915 }
// 2916 // *CIDO - BÖLÜM - 320 - ChaosExperiment - Kaos Deneyi - Dayanıklılık Testi - Hata Enjeksiyonu - Serde
// 2917 export interface ChaosExperiment {
// 2918   name: string;
// 2919   target: string;
// 2920   failure_type: string;
// 2921   duration_seconds: number;
// 2922   blast_radius: string;
// 2923 }
// 2924 // *CIDO - BÖLÜM - 321 - GameDayScenario - GameDay Senaryosu - Felaket Tatbikatı - Kurtarma - Serde
// 2925 export interface GameDayScenario {
// 2926   name: string;
// 2927   description: string;
// 2928   steps: string[];
// 2929   expected_recovery_time_minutes: number;
// 2930 }
// 2931 // *CIDO - BÖLÜM - 322 - DisasterRecovery - Felaket Kurtarma - DR Planı - Yedek Geri Yükleme - Serde
// 2932 export interface DisasterRecovery {
// 2933   rpo_minutes: number;
// 2934   rto_minutes: number;
// 2935   backup_location: string;
// 2936   restore_procedure: string[];
// 2937 }
// 2938 // *CIDO - BÖLÜM - 323 - Runbook - Çalıştırma Kitabı - Operasyon Rehberi - Acil Durum - Serde
// 2939 export interface Runbook {
// 2940   scenario: string;
// 2941   severity: string;
// 2942   steps: RunbookStep[];
// 2943   escalation_after_minutes: number;
// 2944 }
// 2945 // *CIDO - BÖLÜM - 324 - RunbookStep - Çalıştırma Adımı - Operasyon Adımı - Kontrol Komutu - Serde
// 2946 export interface RunbookStep {
// 2947   order: number;
// 2948   action: string;
// 2949   command?: string;
// 2950   expected_result: string;
// 2951   rollback?: string;
// 2952 }
// 2953 // *CIDO - BÖLÜM - 325 - KnowledgeBase - Bilgi Tabanı - SSS - Dokümantasyon - Serde
// 2954 export interface KnowledgeBase {
// 2955   articles: KnowledgeArticle[];
// 2956   categories: string[];
// 2957   last_updated: number;
// 2958 }
// 2959 // *CIDO - BÖLÜM - 326 - KnowledgeArticle - Bilgi Makalesi - Yardım Konusu - SSS Girişi - Serde
// 2960 export interface KnowledgeArticle {
// 2961   id: string;
// 2962   title: string;
// 2963   content: string;
// 2964   category: string;
// 2965   tags: string[];
// 2966   created_at: number;
// 2967   updated_at: number;
// 2968 }
// 2969 // *CIDO - BÖLÜM - 327 - FeedbackForm - Geri Bildirim Formu - Kullanıcı Görüşü - NPS - Serde
// 2970 export interface FeedbackForm {
// 2971   tenant_id: string;
// 2972   user_id: string;
// 2973   rating: number;
// 2974   comment?: string;
// 2975   category: string;
// 2976   submitted_at: number;
// 2977 }
// 2978 // *CIDO - BÖLÜM - 328 - NPSScore - NPS Skoru - Net Promoter - Müşteri Sadakat - Serde
// 2979 export interface NPSScore {
// 2980   tenant_id: string;
// 2981   score: number;
// 2982   promoters: number;
// 2983   passives: number;
// 2984   detractors: number;
// 2985   total_responses: number;
// 2986   calculated_at: number;
// 2987 }
// 2988 // *CIDO - BÖLÜM - 329 - CSATScore - CSAT Skoru - Müşteri Memnuniyet - Anket - Serde
// 2989 export interface CSATScore {
// 2990   tenant_id: string;
// 2991   average_score: number;
// 2992   response_count: number;
// 2993   distribution: Record<string, number>;
// 2994   period_start: number;
// 2995   period_end: number;
// 2996 }
// 2997 // *CIDO - BÖLÜM - 330 - ChurnPrediction - Kayıp Tahmini - Churn Analizi - Risk Skoru - Serde
// 2998 export interface ChurnPrediction {
// 2999   tenant_id: string;
// 3000   at_risk_users: ChurnRiskUser[];
// 3001   overall_churn_risk: number;
// 3002   predicted_at: number;
// 3003 }
// 3004 // *CIDO - BÖLÜM - 331 - ChurnRiskUser - Kayıp Riski - Riskli Kullanıcı - Aktivite Düşüşü - Serde
// 3005 export interface ChurnRiskUser {
// 3006   user_id: string;
// 3007   risk_score: number;
// 3008   days_since_last_active: number;
// 3009   indicators: string[];
// 3010 }
// 3011 // *CIDO - BÖLÜM - 332 - RetentionCohort - Elde Tutma - Kohort Analizi - Kullanıcı Bağlılık - Serde
// 3012 export interface RetentionCohort {
// 3013   cohort_label: string;
// 3014   initial_size: number;
// 3015   retention_by_period: number[];
// 3016   periods: string[];
// 3017 }
// 3018 // *CIDO - BÖLÜM - 333 - LifeTimeValue - Yaşam Boyu Değer - LTV Hesabı - Gelir Tahmini - Serde
// 3019 export interface LifeTimeValue {
// 3020   user_id: string;
// 3021   ltv: number;
// 3022   avg_order_value: number;
// 3023   purchase_frequency: number;
// 3024   predicted_ltv_12m: number;
// 3025 }
// 3026 // *CIDO - BÖLÜM - 334 - RevenueAttribution - Gelir Atıf - Kaynak Takibi - Pazarlama Kanalı - Serde
// 3027 export interface RevenueAttribution {
// 3028   channel: string;
// 3029   revenue: number;
// 3030   orders: number;
// 3031   conversion_rate: number;
// 3032   period: string;
// 3033 }
// 3034 // *CIDO - BÖLÜM - 335 - MarketingCampaign - Pazarlama Kampanyası - Kampanya Takip - Dönüşüm - Serde
// 3035 export interface MarketingCampaign {
// 3036   id: string;
// 3037   tenant_id: string;
// 3038   name: string;
// 3039   channel: string;
// 3040   budget: number;
// 3041   spent: number;
// 3042   impressions: number;
// 3043   clicks: number;
// 3044   conversions: number;
// 3045   revenue: number;
// 3046   start_date: number;
// 3047   end_date: number;
// 3048 }
// 3049 // *CIDO - BÖLÜM - 336 - SEOReport - SEO Raporu - Arama Motoru - Sıralama Takip - Serde
// 3050 export interface SEOReport {
// 3051   tenant_id: string;
// 3052   domain: string;
// 3053   keywords: SEOKeyword[];
// 3054   total_organic_traffic: number;
// 3055   avg_position: number;
// 3056   generated_at: number;
// 3057 }
// 3058 // *CIDO - BÖLÜM - 337 - SEOKeyword - SEO Anahtar Kelime - Sıralama Pozisyonu - Hacim - Serde
// 3059 export interface SEOKeyword {
// 3060   keyword: string;
// 3061   position: number;
// 3062   search_volume: number;
// 3063   clicks: number;
// 3064   impressions: number;
// 3065   ctr: number;
// 3066 }
// 3067 // *CIDO - BÖLÜM - 338 - SocialMediaMetrics - Sosyal Medya - Etkileşim Metriği - Paylaşım - Serde
// 3068 export interface SocialMediaMetrics {
// 3069   platform: string;
// 3070   followers: number;
// 3071   engagement_rate: number;
// 3072   posts_count: number;
// 3073   total_likes: number;
// 3074   total_shares: number;
// 3075   total_comments: number;
// 3076 }
// 3077 // *CIDO - BÖLÜM - 339 - AffiliateProgram - Satış Ortaklığı - Komisyon Takip - Referans - Serde
// 3078 export interface AffiliateProgram {
// 3079   tenant_id: string;
// 3080   commission_rate: number;
// 3081   cookie_days: number;
// 3082   affiliates: AffiliatePartner[];
// 3083 }
// 3084 // *CIDO - BÖLÜM - 340 - AffiliatePartner - Satış Ortağı - Ortak Kaydı - Komisyon - Serde
// 3085 export interface AffiliatePartner {
// 3086   id: string;
// 3087   name: string;
// 3088   email: string;
// 3089   referral_code: string;
// 3090   total_referrals: number;
// 3091   total_commission: number;
// 3092   joined_at: number;
// 3093 }
// 3094 // *CIDO - BÖLÜM - 341 - DiscountCode - İndirim Kodu - Kupon Tanım - Promosyon - Serde
// 3095 export interface DiscountCode {
// 3096   id: string;
// 3097   tenant_id: string;
// 3098   code: string;
// 3099   type: string;
// 3100   value: number;
// 3101   min_order_amount?: number;
// 3102   max_uses: number;
// 3103   used_count: number;
// 3104   starts_at: number;
// 3105   expires_at: number;
// 3106   is_active: boolean;
// 3107 }
// 3108 // *CIDO - BÖLÜM - 342 - GiftCard - Hediye Kartı - Bakiye Takip - Dijital Kod - Serde
// 3109 export interface GiftCard {
// 3110   id: string;
// 3111   tenant_id: string;
// 3112   code: string;
// 3113   initial_balance: number;
// 3114   current_balance: number;
// 3115   currency: string;
// 3116   purchased_at: number;
// 3117   expires_at?: number;
// 3118   is_active: boolean;
// 3119 }
// 3120 // *CIDO - BÖLÜM - 343 - LoyaltyProgram - Sadakat Programı - Puan Sistemi - Ödül - Serde
// 3121 export interface LoyaltyProgram {
// 3122   tenant_id: string;
// 3123   points_per_currency: number;
// 3124   points_expiry_days: number;
// 3125   tiers: LoyaltyTier[];
// 3126 }
// 3127 // *CIDO - BÖLÜM - 344 - LoyaltyTier - Sadakat Seviyesi - Kademe Tanım - Avantaj - Serde
// 3128 export interface LoyaltyTier {
// 3129   name: string;
// 3130   min_points: number;
// 3131   benefits: string[];
// 3132   multiplier: number;
// 3133 }
// 3134 // *CIDO - BÖLÜM - 345 - LoyaltyAccount - Sadakat Hesabı - Kullanıcı Puanı - Kademe - Serde
// 3135 export interface LoyaltyAccount {
// 3136   user_id: string;
// 3137   tenant_id: string;
// 3138   points: number;
// 3139   tier: string;
// 3140   total_earned: number;
// 3141   total_redeemed: number;
// 3142   joined_at: number;
// 3143 }
// 3144 // *CIDO - BÖLÜM - 346 - WalletBalance - Cüzdan Bakiyesi - Dijital Cüzdan - Ön Ödeme - Serde
// 3145 export interface WalletBalance {
// 3146   user_id: string;
// 3147   tenant_id: string;
// 3148   balance: number;
// 3149   currency: string;
// 3150   last_transaction_at: number;
// 3151 }
// 3152 // *CIDO - BÖLÜM - 347 - WalletTransaction - Cüzdan İşlemi - Bakiye Hareketi - Para Yatırma - Serde
// 3153 export interface WalletTransaction {
// 3154   id: string;
// 3155   user_id: string;
// 3156   tenant_id: string;
// 3157   amount: number;
// 3158   type: string;
// 3159   reference: string;
// 3160   timestamp: number;
// 3161 }
// 3162 // *CIDO - BÖLÜM - 348 - TaxRate - Vergi Oranı - KDV Tanım - Ülke Bazlı - Serde
// 3163 export interface TaxRate {
// 3164   id: string;
// 3165   tenant_id: string;
// 3166   name: string;
// 3167   rate: number;
// 3168   country: string;
// 3169   region?: string;
// 3170   is_default: boolean;
// 3171 }
// 3172 // *CIDO - BÖLÜM - 349 - TaxCalculation - Vergi Hesaplama - Vergi Tutarı - Sepet Vergi - Serde
// 3173 export interface TaxCalculation {
// 3174   subtotal: number;
// 3175   tax_amount: number;
// 3176   tax_rate: number;
// 3177   tax_name: string;
// 3178   total: number;
// 3179 }
// 3180 // *CIDO - BÖLÜM - 350 - ShippingMethod - Kargo Yöntemi - Teslimat Seçeneği - Fiyat - Serde
// 3181 export interface ShippingMethod {
// 3182   id: string;
// 3183   tenant_id: string;
// 3184   name: string;
// 3185   price: number;
// 3186   free_shipping_min?: number;
// 3187   estimated_days_min: number;
// 3188   estimated_days_max: number;
// 3189   is_active: boolean;
// 3190 }
// 3191 // *CIDO - BÖLÜM - 351 - ShippingAddress - Teslimat Adresi - Adres Tanım - Gönderim - Serde
// 3192 export interface ShippingAddress {
// 3193   id: string;
// 3194   user_id: string;
// 3195   tenant_id: string;
// 3196   name: string;
// 3197   phone: string;
// 3198   address_line1: string;
// 3199   address_line2?: string;
// 3200   city: string;
// 3201   state: string;
// 3202   postal_code: string;
// 3203   country: string;
// 3204   is_default: boolean;
// 3205 }
// 3206 // *CIDO - BÖLÜM - 352 - ShippingRate - Kargo Ücreti - Canlı Fiyat - Taşıyıcı API - Serde
// 3207 export interface ShippingRate {
// 3208   carrier: string;
// 3209   service: string;
// 3210   price: number;
// 3211   currency: string;
// 3212   estimated_days: number;
// 3213 }
// 3214 // *CIDO - BÖLÜM - 353 - TrackingInfo - Takip Bilgisi - Kargo Takip - Sipariş Durumu - Serde
// 3215 export interface TrackingInfo {
// 3216   order_id: string;
// 3217   carrier: string;
// 3218   tracking_number: string;
// 3219   tracking_url: string;
// 3220   status: string;
// 3221   events: TrackingEvent[];
// 3222 }
// 3223 // *CIDO - BÖLÜM - 354 - TrackingEvent - Takip Olayı - Kargo Hareketi - Durum Güncelleme - Serde
// 3224 export interface TrackingEvent {
// 3225   timestamp: number;
// 3226   location: string;
// 3227   status: string;
// 3228   description: string;
// 3229 }
// 3230 // *CIDO - BÖLÜM - 355 - ReturnRequest - İade Talebi - Ürün İadesi - İade Onay - Serde
// 3231 export interface ReturnRequest {
// 3232   id: string;
// 3233   order_id: string;
// 3234   tenant_id: string;
// 3235   user_id: string;
// 3236   items: ReturnItem[];
// 3237   reason: string;
// 3238   status: string;
// 3239   requested_at: number;
// 3240   approved_at?: number;
// 3241   refund_amount?: number;
// 3242 }
// 3243 // *CIDO - BÖLÜM - 356 - ReturnItem - İade Kalemi - İade Ürün - Miktar Neden - Serde
// 3244 export interface ReturnItem {
// 3245   product_id: string;
// 3246   quantity: number;
// 3247   reason: string;
// 3248   condition: string;
// 3249 }
// 3250 // *CIDO - BÖLÜM - 357 - RefundRecord - İade Kaydı - Para İadesi - Ödeme Geri - Serde
// 3251 export interface RefundRecord {
// 3252   id: string;
// 3253   tenant_id: string;
// 3254   order_id: string;
// 3255   amount: number;
// 3256   currency: string;
// 3257   status: string;
// 3258   processed_at?: number;
// 3259   transaction_id: string;
// 3260 }
// 3261 // *CIDO - BÖLÜM - 358 - DisputeRecord - İtiraz Kaydı - Chargeback - Ödeme Anlaşmazlığı - Serde
// 3262 export interface DisputeRecord {
// 3263   id: string;
// 3264   tenant_id: string;
// 3265   order_id: string;
// 3266   amount: number;
// 3267   reason: string;
// 3268   status: string;
// 3269   filed_at: number;
// 3270   resolved_at?: number;
// 3271   outcome?: string;
// 3272 }
// 3273 // *CIDO - BÖLÜM - 359 - PaymentMethod - Ödeme Yöntemi - Kayıtlı Kart - Token - Serde
// 3274 export interface PaymentMethod {
// 3275   id: string;
// 3276   user_id: string;
// 3277   tenant_id: string;
// 3278   type: string;
// 3279   last_four: string;
// 3280   brand: string;
// 3281   expiry_month: number;
// 3282   expiry_year: number;
// 3283   is_default: boolean;
// 3284   token: string;
// 3285 }
// 3286 // *CIDO - BÖLÜM - 360 - PaymentProvider - Ödeme Sağlayıcı - Entegrasyon - Stripe Iyzico - Serde
// 3287 export interface PaymentProvider {
// 3288   name: string;
// 3289   api_key_encrypted: string;
// 3290   webhook_secret_encrypted: string;
// 3291   is_active: boolean;
// 3292   supported_currencies: string[];
// 3293 }
// 3294 // *CIDO - BÖLÜM - 361 - Invoice - Fatura - Fatura Kaydı - PDF URL - Serde
// 3295 export interface Invoice {
// 3296   id: string;
// 3297   tenant_id: string;
// 3298   order_id: string;
// 3299   user_id: string;
// 3300   invoice_number: string;
// 3301   amount: number;
// 3302   currency: string;
// 3303   status: string;
// 3304   pdf_url?: string;
// 3305   issued_at: number;
// 3306   due_at?: number;
// 3307   paid_at?: number;
// 3308 }
// 3309 // *CIDO - BÖLÜM - 362 - InvoiceItem - Fatura Kalemi - Satır Öğesi - Ürün Hizmet - Serde
// 3310 export interface InvoiceItem {
// 3311   description: string;
// 3312   quantity: number;
// 3313   unit_price: number;
// 3314   total: number;
// 3315   tax_rate: number;
// 3316   tax_amount: number;
// 3317 }
// 3318 // *CIDO - BÖLÜM - 363 - Subscription - Abonelik - Tekrarlayan Ödeme - Plan - Serde
// 3319 export interface Subscription {
// 3320   id: string;
// 3321   tenant_id: string;
// 3322   user_id: string;
// 3323   plan_id: string;
// 3324   status: string;
// 3325   current_period_start: number;
// 3326   current_period_end: number;
// 3327   cancel_at_period_end: boolean;
// 3328   created_at: number;
// 3329 }
// 3330 // *CIDO - BÖLÜM - 364 - SubscriptionPlan - Abonelik Planı - Fiyatlandırma - Periyot - Serde
// 3331 export interface SubscriptionPlan {
// 3332   id: string;
// 3333   tenant_id: string;
// 3334   name: string;
// 3335   price: number;
// 3336   currency: string;
// 3337   interval: string;
// 3338   interval_count: number;
// 3339   trial_days: number;
// 3340   features: string[];
// 3341 }
// 3342 // *CIDO - BÖLÜM - 365 - UsageBasedPricing - Kullanım Bazlı Fiyat - Metered Billing - Tüketim - Serde
// 3343 export interface UsageBasedPricing {
// 3344   metric: string;
// 3345   unit: string;
// 3346   price_per_unit: number;
// 3347   included_units: number;
// 3348   current_usage: number;
// 3349 }
// 3350 // *CIDO - BÖLÜM - 366 - BillingCycle - Fatura Dönemi - Döngü Tanım - Tahsilat - Serde
// 3351 export interface BillingCycle {
// 3352   tenant_id: string;
// 3353   cycle_start: number;
// 3354   cycle_end: number;
// 3355   status: string;
// 3356   total_amount: number;
// 3357   paid_amount: number;
// 3358   invoice_ids: string[];
// 3359 }
// 3360 // *CIDO - BÖLÜM - 367 - CreditNote - Kredi Notu - Alacak Dekontu - İade Fatura - Serde
// 3361 export interface CreditNote {
// 3362   id: string;
// 3363   tenant_id: string;
// 3364   invoice_id: string;
// 3365   amount: number;
// 3366   reason: string;
// 3367   issued_at: number;
// 3368 }
// 3369 // *CIDO - BÖLÜM - 368 - VendorPayout - Satıcı Ödemesi - Marketplace - Havale - Serde
// 3370 export interface VendorPayout {
// 3371   id: string;
// 3372   tenant_id: string;
// 3373   vendor_id: string;
// 3374   amount: number;
// 3375   currency: string;
// 3376   status: string;
// 3377   period_start: number;
// 3378   period_end: number;
// 3379   paid_at?: number;
// 3380 }
// 3381 // *CIDO - BÖLÜM - 369 - MarketplaceCommission - Pazar Yeri Komisyonu - Komisyon Oranı - Kesinti - Serde
// 3382 export interface MarketplaceCommission {
// 3383   tenant_id: string;
// 3384   vendor_id: string;
// 3385   rate: number;
// 3386   flat_fee: number;
// 3387   min_commission: number;
// 3388 }
// 3389 // *CIDO - BÖLÜM - 370 - EscrowAccount - Emanet Hesabı - Güvenli Ödeme - Alıcı Koruma - Serde
// 3390 export interface EscrowAccount {
// 3391   id: string;
// 3392   tenant_id: string;
// 3393   order_id: string;
// 3394   amount: number;
// 3395   status: string;
// 3396   released_at?: number;
// 3397 }
// 3398 // *CIDO - BÖLÜM - 371 - FraudCheckResult - Dolandırıcılık Kontrolü - Ödeme Sahtekarlığı - Risk - Serde
// 3399 export interface FraudCheckResult {
// 3400   transaction_id: string;
// 3401   risk_level: string;
// 3402   risk_score: number;
// 3403   rules_triggered: string[];
// 3404   recommended_action: string;
// 3405 }
// 3406 // *CIDO - BÖLÜM - 372 - AMLCheck - AML Kontrolü - Kara Para Aklama - Uyum - Serde
// 3407 export interface AMLCheck {
// 3408   user_id: string;
// 3409   tenant_id: string;
// 3410   status: string;
// 3411   checked_at: number;
// 3412   source: string;
// 3413   flags: string[];
// 3414 }
// 3415 // *CIDO - BÖLÜM - 373 - KYCDocument - KYC Belgesi - Kimlik Doğrulama - Belge Yükleme - Serde
// 3416 export interface KYCDocument {
// 3417   id: string;
// 3418   user_id: string;
// 3419   tenant_id: string;
// 3420   type: string;
// 3421   document_url: string;
// 3422   status: string;
// 3423   submitted_at: number;
// 3424   verified_at?: number;
// 3425 }
// 3426 // *CIDO - BÖLÜM - 374 - SanctionListCheck - Yaptırım Listesi - Kara Liste - OFAC Kontrol - Serde
// 3427 export interface SanctionListCheck {
// 3428   user_id: string;
// 3429   tenant_id: string;
// 3430   matched: boolean;
// 3431   list_name?: string;
// 3432   checked_at: number;
// 3433 }
// 3434 // *CIDO - BÖLÜM - 375 - ExportControl - İhracat Kontrolü - Uluslararası Ticaret - Kısıtlama - Serde
// 3435 export interface ExportControl {
// 3436   product_id: string;
// 3437   destination_country: string;
// 3438   requires_license: boolean;
// 3439   license_type?: string;
// 3440   restricted: boolean;
// 3441 }
// 3442 // *CIDO - BÖLÜM - 376 - CustomsDeclaration - Gümrük Beyanı - Uluslararası Gönderi - HS Kodu - Serde
// 3443 export interface CustomsDeclaration {
// 3444   order_id: string;
// 3445   hs_code: string;
// 3446   origin_country: string;
// 3447   value: number;
// 3448   currency: string;
// 3449   items: CustomsItem[];
// 3450 }
// 3451 // *CIDO - BÖLÜM - 377 - CustomsItem - Gümrük Kalemi - Beyan Öğesi - Açıklama - Serde
// 3452 export interface CustomsItem {
// 3453   description: string;
// 3454   quantity: number;
// 3455   weight_grams: number;
// 3456   value: number;
// 3457   hs_code: string;
// 3458   origin_country: string;
// 3459 }
// 3460 // *CIDO - BÖLÜM - 378 - TranslationJob - Çeviri İşi - AI Çeviri - Çok Dilli - Serde
// 3461 export interface TranslationJob {
// 3462   id: string;
// 3463   tenant_id: string;
// 3464   source_language: string;
// 3465   target_languages: string[];
// 3466   content_type: string;
// 3467   content_id: string;
// 3468   status: string;
// 3469   created_at: number;
// 3470   completed_at?: number;
// 3471 }
// 3472 // *CIDO - BÖLÜM - 379 - CurrencyExchange - Döviz Kuru - Canlı Kur - Para Birimi - Serde
// 3473 export interface CurrencyExchange {
// 3474   from: string;
// 3475   to: string;
// 3476   rate: number;
// 3477   timestamp: number;
// 3478   source: string;
// 3479 }
// 3480 // *CIDO - BÖLÜM - 380 - ExchangeRateCache - Kur Önbelleği - KV TTL - Döviz Güncelleme - Serde
// 3481 export interface ExchangeRateCache {
// 3482   base_currency: string;
// 3483   rates: Record<string, number>;
// 3484   fetched_at: number;
// 3485   expires_at: number;
// 3486 }
// 3487 // *CIDO - BÖLÜM - 381 - TimezoneData - Zaman Dilimi - UTC Offset - DST Kuralı - Serde
// 3488 export interface TimezoneData {
// 3489   timezone: string;
// 3490   utc_offset_hours: number;
// 3491   dst_active: boolean;
// 3492   dst_offset_hours: number;
// 3493 }
// 3494 // *CIDO - BÖLÜM - 382 - HolidayCalendar - Tatil Takvimi - Resmi Tatil - Çalışma Günü - Serde
// 3495 export interface HolidayCalendar {
// 3496   tenant_id: string;
// 3497   country: string;
// 3498   holidays: HolidayEntry[];
// 3499   year: number;
// 3500 }
// 3501 // *CIDO - BÖLÜM - 383 - HolidayEntry - Tatil Girişi - Tatil Tarihi - İsim - Serde
// 3502 export interface HolidayEntry {
// 3503   date: string;
// 3504   name: string;
// 3505   type: string;
// 3506   recurring: boolean;
// 3507 }
// 3508 // *CIDO - BÖLÜM - 384 - WorkingHours - Çalışma Saatleri - İşletme Saati - Açılış Kapanış - Serde
// 3509 export interface WorkingHours {
// 3510   tenant_id: string;
// 3511   day_of_week: number;
// 3512   open_time: string;
// 3513   close_time: string;
// 3514   is_closed: boolean;
// 3515 }
// 3516 // *CIDO - BÖLÜM - 385 - AppointmentType - Randevu Tipi - Hizmet Tanım - Süre Fiyat - Serde
// 3517 export interface AppointmentType {
// 3518   id: string;
// 3519   tenant_id: string;
// 3520   name: string;
// 3521   duration_minutes: number;
// 3522   price: number;
// 3523   color: string;
// 3524   is_active: boolean;
// 3525 }
// 3526 // *CIDO - BÖLÜM - 386 - ResourceCalendar - Kaynak Takvimi - Personel Oda - Uygunluk - Serde
// 3527 export interface ResourceCalendar {
// 3528   resource_id: string;
// 3529   tenant_id: string;
// 3530   name: string;
// 3531   type: string;
// 3532   working_hours: WorkingHours[];
// 3533   breaks: TimeBlock[];
// 3534 }
// 3535 // *CIDO - BÖLÜM - 387 - TimeBlock - Zaman Bloğu - Aralık Tanım - Başlangıç Bitiş - Serde
// 3536 export interface TimeBlock {
// 3537   start: string;
// 3538   end: string;
// 3539   label?: string;
// 3540 }
// 3541 // *CIDO - BÖLÜM - 388 - RecurringRule - Tekrarlama Kuralı - RRULE - Periyodik Randevu - Serde
// 3542 export interface RecurringRule {
// 3543   frequency: string;
// 3544   interval: number;
// 3545   by_day?: string[];
// 3546   by_month_day?: number[];
// 3547   count?: number;
// 3548   until?: number;
// 3549 }
// 3550 // *CIDO - BÖLÜM - 389 - Waitlist - Bekleme Listesi - Sıra Takip - Müsaitlik Bildirimi - Serde
// 3551 export interface Waitlist {
// 3552   id: string;
// 3553   tenant_id: string;
// 3554   user_id: string;
// 3555   appointment_type_id: string;
// 3556   requested_date: string;
// 3557   status: string;
// 3558   joined_at: number;
// 3559   notified_at?: number;
// 3560 }
// 3561 // *CIDO - BÖLÜM - 390 - CheckInRecord - Giriş Kaydı - Müşteri Check-in - Varış - Serde
// 3562 export interface CheckInRecord {
// 3563   id: string;
// 3564   appointment_id: string;
// 3565   tenant_id: string;
// 3566   checked_in_at: number;
// 3567   status: string;
// 3568 }
// 3569 // *CIDO - BÖLÜM - 391 - QueueTicket - Sıra Numarası - Kuyruk Bileti - Bekleme Süresi - Serde
// 3570 export interface QueueTicket {
// 3571   id: string;
// 3572   tenant_id: string;
// 3573   number: number;
// 3574   estimated_wait_minutes: number;
// 3575   status: string;
// 3576   issued_at: number;
// 3577 }
// 3578 // *CIDO - BÖLÜM - 392 - ServiceReview - Hizmet Değerlendirmesi - Yorum Puan - İnceleme - Serde
// 3579 export interface ServiceReview {
// 3580   id: string;
// 3581   tenant_id: string;
// 3582   user_id: string;
// 3583   appointment_id: string;
// 3584   rating: number;
// 3585   comment?: string;
// 3586   created_at: number;
// 3587 }
// 3588 // *CIDO - BÖLÜM - 393 - ProductReview - Ürün Değerlendirmesi - Yıldız Puanı - Onaylı Yorum - Serde
// 3589 export interface ProductReview {
// 3590   id: string;
// 3591   tenant_id: string;
// 3592   product_id: string;
// 3593   user_id: string;
// 3594   rating: number;
// 3595   title?: string;
// 3596   body?: string;
// 3597   images?: string[];
// 3598   verified_purchase: boolean;
// 3599   helpful_count: number;
// 3600   created_at: number;
// 3601   updated_at: number;
// 3602 }
// 3603 // *CIDO - BÖLÜM - 394 - ReviewSummary - Değerlendirme Özeti - Ortalama Puan - Dağılım - Serde
// 3604 export interface ReviewSummary {
// 3605   product_id: string;
// 3606   average_rating: number;
// 3607   total_reviews: number;
// 3608   distribution: Record<string, number>;
// 3609   recommended_percentage: number;
// 3610 }
// 3611 // *CIDO - BÖLÜM - 395 - QAPair - Soru Cevap - Ürün Sorusu - Müşteri Sorusu - Serde
// 3612 export interface QAPair {
// 3613   id: string;
// 3614   product_id: string;
// 3615   tenant_id: string;
// 3616   question: string;
// 3617   answer?: string;
// 3618   asked_by: string;
// 3619   answered_by?: string;
// 3620   asked_at: number;
// 3621   answered_at?: number;
// 3622 }
// 3623 // *CIDO - BÖLÜM - 396 - Wishlist - İstek Listesi - Favori Ürün - Kaydet - Serde
// 3624 export interface Wishlist {
// 3625   id: string;
// 3626   user_id: string;
// 3627   tenant_id: string;
// 3628   name: string;
// 3629   product_ids: string[];
// 3630   is_public: boolean;
// 3631   created_at: number;
// 3632   updated_at: number;
// 3633 }
// 3634 // *CIDO - BÖLÜM - 397 - PriceAlert - Fiyat Alarmı - İndirim Bildirimi - Hedef Fiyat - Serde
// 3635 export interface PriceAlert {
// 3636   id: string;
// 3637   user_id: string;
// 3638   tenant_id: string;
// 3639   product_id: string;
// 3640   target_price: number;
// 3641   current_price: number;
// 3642   is_active: boolean;
// 3643   triggered_at?: number;
// 3644   created_at: number;
// 3645 }
// 3646 // *CIDO - BÖLÜM - 398 - StockAlert - Stok Alarmı - Düşük Stok - Yeniden Stok - Serde
// 3647 export interface StockAlert {
// 3648   id: string;
// 3649   tenant_id: string;
// 3650   product_id: string;
// 3651   threshold: number;
// 3652   current_stock: number;
// 3653   is_active: boolean;
// 3654   last_triggered_at?: number;
// 3655 }
// 3656 // *CIDO - BÖLÜM - 399 - BackInStock - Stokta Tekrar - Bildirim Kaydı - Gelince Haber Ver - Serde
// 3657 export interface BackInStock {
// 3658   id: string;
// 3659   tenant_id: string;
// 3660   product_id: string;
// 3661   user_id: string;
// 3662   email: string;
// 3663   notified: boolean;
// 3664   created_at: number;
// 3665   notified_at?: number;
// 3666 }
// 3667 // *CIDO - BÖLÜM - 400 - RecentlyViewed - Son Görüntülenen - Gezinti Geçmişi - Ürün Takip - Serde
// 3668 export interface RecentlyViewed {
// 3669   user_id: string;
// 3670   tenant_id: string;
// 3671   product_ids: string[];
// 3672   max_items: number;
// 3673   updated_at: number;
// 3674 }
// 3675 // *CIDO - BÖLÜM - 401 - SearchHistory - Arama Geçmişi - Sorgu Takip - Geçmiş Analiz - Serde
// 3676 export interface SearchHistory {
// 3677   user_id: string;
// 3678   tenant_id: string;
// 3679   queries: SearchQueryEntry[];
// 3680   updated_at: number;
// 3681 }
// 3682 // *CIDO - BÖLÜM - 402 - SearchQueryEntry - Arama Sorgusu - Geçmiş Öğe - Zaman Damgası - Serde
// 3683 export interface SearchQueryEntry {
// 3684   query: string;
// 3685   timestamp: number;
// 3686   result_count: number;
// 3687   clicked_product_id?: string;
// 3688 }
// 3689 // *CIDO - BÖLÜM - 403 - BrowsingSession - Gezinti Oturumu - Sayfa Görüntüleme - Oturum Takip - Serde
// 3690 export interface BrowsingSession {
// 3691   id: string;
// 3692   user_id?: string;
// 3693   tenant_id: string;
// 3694   pages_viewed: PageView[];
// 3695   started_at: number;
// 3696   ended_at?: number;
// 3697   device_type: string;
// 3698   referrer?: string;
// 3699 }
// 3700 // *CIDO - BÖLÜM - 404 - PageView - Sayfa Görüntüleme - Sayfa Takip - Kalma Süresi - Serde
// 3701 export interface PageView {
// 3702   path: string;
// 3703   timestamp: number;
// 3704   duration_seconds: number;
// 3705   scroll_percentage: number;
// 3706 }
// 3707 // *CIDO - BÖLÜM - 405 - ClickEvent - Tıklama Olayı - Etkileşim Takip - Isı Haritası - Serde
// 3708 export interface ClickEvent {
// 3709   element_id: string;
// 3710   element_type: string;
// 3711   page_path: string;
// 3712   timestamp: number;
// 3713   x_position: number;
// 3714   y_position: number;
// 3715 }
// 3716 // *CIDO - BÖLÜM - 406 - ConversionEvent - Dönüşüm Olayı - Hedef Tamamlama - Satın Alma - Serde
// 3717 export interface ConversionEvent {
// 3718   type: string;
// 3719   value: number;
// 3720   currency: string;
// 3721   order_id?: string;
// 3722   timestamp: number;
// 3723   source: string;
// 3724 }
// 3725 // *CIDO - BÖLÜM - 407 - CustomEvent - Özel Olay - İzleme Etiketi - Analitik Gönderim - Serde
// 3726 export interface CustomEvent {
// 3727   name: string;
// 3728   properties: Record<string, unknown>;
// 3729   timestamp: number;
// 3730   tenant_id: string;
// 3731   user_id?: string;
// 3732   session_id: string;
// 3733 }
// 3734 // *CIDO - BÖLÜM - 408 - ExperimentAssignment - Deney Ataması - A/B Test - Varyant Seçimi - Serde
// 3735 export interface ExperimentAssignment {
// 3736   experiment_id: string;
// 3737   user_id: string;
// 3738   variant_id: string;
// 3739   assigned_at: number;
// 3740 }
// 3741 // *CIDO - BÖLÜM - 409 - ExperimentMetric - Deney Metriği - Varyant Performans - İstatistik - Serde
// 3742 export interface ExperimentMetric {
// 3743   experiment_id: string;
// 3744   variant_id: string;
// 3745   metric_name: string;
// 3746   value: number;
// 3747   sample_size: number;
// 3748   confidence_interval: [number, number];
// 3749   p_value: number;
// 3750 }
// 3751 // *CIDO - BÖLÜM - 410 - PersonalizationProfile - Kişiselleştirme - Kullanıcı Profili - Tercihler - Serde
// 3752 export interface PersonalizationProfile {
// 3753   user_id: string;
// 3754   tenant_id: string;
// 3755   preferred_categories: string[];
// 3756   price_range: [number, number];
// 3757   preferred_brands: string[];
// 3758   last_updated: number;
// 3759 }
// 3760 // *CIDO - BÖLÜM - 411 - RecommendationFeed - Öneri Akışı - Kişisel Öneri - AI Sıralama - Serde
// 3761 export interface RecommendationFeed {
// 3762   user_id: string;
// 3763   tenant_id: string;
// 3764   products: RecommendedProduct[];
// 3765   generated_at: number;
// 3766   strategy: string;
// 3767 }
// 3768 // *CIDO - BÖLÜM - 412 - RecommendedProduct - Önerilen Ürün - Skor Neden - Sıralama - Serde
// 3769 export interface RecommendedProduct {
// 3770   product_id: string;
// 3771   score: number;
// 3772   reason: string;
// 3773   placement: string;
// 3774 }
// 3775 // *CIDO - BÖLÜM - 413 - TrendingProduct - Trend Ürün - Popülerlik - Yükselen - Serde
// 3776 export interface TrendingProduct {
// 3777   product_id: string;
// 3778   tenant_id: string;
// 3779   view_count: number;
// 3780   order_count: number;
// 3781   trend_score: number;
// 3782   period: string;
// 3783 }
// 3784 // *CIDO - BÖLÜM - 414 - CrossSell - Çapraz Satış - Birlikte Alınan - İlişkili Ürün - Serde
// 3785 export interface CrossSell {
// 3786   product_id: string;
// 3787   cross_sell_product_id: string;
// 3788   frequency: number;
// 3789   last_updated: number;
// 3790 }
// 3791 // *CIDO - BÖLÜM - 415 - UpsellOffer - Üst Satış Teklifi - Premium Alternatif - Yükseltme - Serde
// 3792 export interface UpsellOffer {
// 3793   source_product_id: string;
// 3794   upsell_product_id: string;
// 3795   price_difference: number;
// 3796   message: string;
// 3797 }
// 3798 // *CIDO - BÖLÜM - 416 - AbandonedCart - Terk Edilmiş Sepet - Kurtarma - Hatırlatma - Serde
// 3799 export interface AbandonedCart {
// 3800   id: string;
// 3801   tenant_id: string;
// 3802   user_id?: string;
// 3803   session_id: string;
// 3804   cart_items: CartItem[];
// 3805   abandoned_at: number;
// 3806   reminder_sent: boolean;
// 3807   recovered: boolean;
// 3808 }
// 3809 // *CIDO - BÖLÜM - 417 - CartItem - Sepet Öğesi - Ürün Miktar - Varyant - Serde
// 3810 export interface CartItem {
// 3811   product_id: string;
// 3812   variant_id?: string;
// 3813   quantity: number;
// 3814   price: number;
// 3815   added_at: number;
// 3816 }
// 3817 // *CIDO - BÖLÜM - 418 - PromoBanner - Promosyon Bannerı - Kampanya Görseli - Duyuru - Serde
// 3818 export interface PromoBanner {
// 3819   id: string;
// 3820   tenant_id: string;
// 3821   title: string;
// 3822   image_url: string;
// 3823   link_url: string;
// 3824   starts_at: number;
// 3825   ends_at: number;
// 3826   position: string;
// 3827   is_active: boolean;
// 3828 }
// 3829 // *CIDO - BÖLÜM - 419 - PopupConfig - Popup Konfigürasyonu - Çıkış Niyeti - Giriş Popup - Serde
// 3830 export interface PopupConfig {
// 3831   id: string;
// 3832   tenant_id: string;
// 3833   trigger: string;
// 3834   delay_seconds: number;
// 3835   content: string;
// 3836   frequency: string;
// 3837   is_active: boolean;
// 3838 }
// 3839 // *CIDO - BÖLÜM - 420 - ExitIntentConfig - Çıkış Niyeti - Ayrılma Tespiti - Son Teklif - Serde
// 3840 export interface ExitIntentConfig {
// 3841   enabled: boolean;
// 3842   offer_message: string;
// 3843   discount_code?: string;
// 3844   discount_value?: number;
// 3845 }
// 3846 // *CIDO - BÖLÜM - 421 - PushNotification - Push Bildirimi - Web Push - Servis Çalışanı - Serde
// 3847 export interface PushNotification {
// 3848   title: string;
// 3849   body: string;
// 3850   icon: string;
// 3851   url: string;
// 3852   user_id: string;
// 3853   tenant_id: string;
// 3854   sent_at: number;
// 3855 }
// 3856 // *CIDO - BÖLÜM - 422 - PushSubscription - Push Aboneliği - Tarayıcı Kaydı - Endpoint - Serde
// 3857 export interface PushSubscription {
// 3858   id: string;
// 3859   user_id: string;
// 3860   tenant_id: string;
// 3861   endpoint: string;
// 3862   p256dh_key: string;
// 3863   auth_key: string;
// 3864   created_at: number;
// 3865 }
// 3866 // *CIDO - BÖLÜM - 423 - InAppNotification - Uygulama İçi Bildirim - Bildirim Merkezi - Okundu - Serde
// 3867 export interface InAppNotification {
// 3868   id: string;
// 3869   user_id: string;
// 3870   tenant_id: string;
// 3871   type: string;
// 3872   title: string;
// 3873   body: string;
// 3874   action_url?: string;
// 3875   is_read: boolean;
// 3876   created_at: number;
// 3877 }
// 3878 // *CIDO - BÖLÜM - 424 - NotificationPreferences - Bildirim Tercihleri - Kanal Seçimi - Abonelik - Serde
// 3879 export interface NotificationPreferences {
// 3880   user_id: string;
// 3881   tenant_id: string;
// 3882   email_enabled: boolean;
// 3883   push_enabled: boolean;
// 3884   in_app_enabled: boolean;
// 3885   telegram_enabled: boolean;
// 3886   marketing_emails: boolean;
// 3887   transactional_emails: boolean;
// 3888 }
// 3889 // *CIDO - BÖLÜM - 425 - EmailBounce - E-posta Geri Dönüşü - Hard Soft Bounce - Bastırma - Serde
// 3890 export interface EmailBounce {
// 3891   email: string;
// 3892   tenant_id: string;
// 3893   type: string;
// 3894   reason: string;
// 3895   bounced_at: number;
// 3896 }
// 3897 // *CIDO - BÖLÜM - 426 - EmailOpen - E-posta Açılma - İzleme Pikseli - Okunma Takip - Serde
// 3898 export interface EmailOpen {
// 3899   email: string;
// 3900   campaign_id: string;
// 3901   tenant_id: string;
// 3902   opened_at: number;
// 3903   ip_address: string;
// 3904   user_agent: string;
// 3905 }
// 3906 // *CIDO - BÖLÜM - 427 - EmailClick - E-posta Tıklama - Link Takip - Tıklama Oranı - Serde
// 3907 export interface EmailClick {
// 3908   email: string;
// 3909   campaign_id: string;
// 3910   link_url: string;
// 3911   tenant_id: string;
// 3912   clicked_at: number;
// 3913 }
// 3914 // *CIDO - BÖLÜM - 428 - EmailCampaign - E-posta Kampanyası - Toplu Gönderim - Şablon - Serde
// 3915 export interface EmailCampaign {
// 3916   id: string;
// 3917   tenant_id: string;
// 3918   name: string;
// 3919   subject: string;
// 3920   template_id: string;
// 3921   audience_filter: Record<string, unknown>;
// 3922   scheduled_at?: number;
// 3923   sent_count: number;
// 3924   open_count: number;
// 3925   click_count: number;
// 3926   bounce_count: number;
// 3927   status: string;
// 3928 }
// 3929 // *CIDO - BÖLÜM - 429 - SMSTemplate - SMS Şablonu - Kısa Mesaj - Metin Gönderim - Serde
// 3930 export interface SMSTemplate {
// 3931   id: string;
// 3932   tenant_id: string;
// 3933   name: string;
// 3934   body: string;
// 3935   max_length: number;
// 3936   variables: string[];
// 3937 }
// 3938 // *CIDO - BÖLÜM - 430 - SMSMessage - SMS Mesajı - Gönderim Kaydı - Durum - Serde
// 3939 export interface SMSMessage {
// 3940   id: string;
// 3941   tenant_id: string;
// 3942   phone: string;
// 3943   message: string;
// 3944   status: string;
// 3945   sent_at?: number;
// 3946   delivered_at?: number;
// 3947   error?: string;
// 3948 }
// 3949 // *CIDO - BÖLÜM - 431 - ChatMessage - Sohbet Mesajı - Canlı Destek - Müşteri Temsilcisi - Serde
// 3950 export interface ChatMessage {
// 3951   id: string;
// 3952   tenant_id: string;
// 3953   conversation_id: string;
// 3954   sender_id: string;
// 3955   sender_type: string;
// 3956   message: string;
// 3957   timestamp: number;
// 3958   is_read: boolean;
// 3959 }
// 3960 // *CIDO - BÖLÜM - 432 - ChatConversation - Sohbet Konuşması - Konuşma Takip - Durum - Serde
// 3961 export interface ChatConversation {
// 3962   id: string;
// 3963   tenant_id: string;
// 3964   user_id: string;
// 3965   agent_id?: string;
// 3966   status: string;
// 3967   started_at: number;
// 3968   ended_at?: number;
// 3969   last_message_at: number;
// 3970 }
// 3971 // *CIDO - BÖLÜM - 433 - ChatBotResponse - Chatbot Yanıtı - AI Sohbet - Otomatik Yanıt - Serde
// 3972 export interface ChatBotResponse {
// 3973   message: string;
// 3974   confidence: number;
// 3975   intent: string;
// 3976   suggestions: string[];
// 3977 }
// 3978 // *CIDO - BÖLÜM - 434 - HelpDeskTicket - Destek Talebi - Bilet Sistemi - Öncelik - Serde
// 3979 export interface HelpDeskTicket {
// 3980   id: string;
// 3981   tenant_id: string;
// 3982   user_id: string;
// 3983   subject: string;
// 3984   description: string;
// 3985   priority: string;
// 3986   status: string;
// 3987   assigned_to?: string;
// 3988   created_at: number;
// 3989   updated_at: number;
// 3990   resolved_at?: number;
// 3991 }
// 3992 // *CIDO - BÖLÜM - 435 - TicketReply - Bilet Yanıtı - Yanıt Kaydı - Destek Güncelleme - Serde
// 3993 export interface TicketReply {
// 3994   id: string;
// 3995   ticket_id: string;
// 3996   user_id: string;
// 3997   message: string;
// 3998   is_internal: boolean;
// 3999   created_at: number;
// 4000 }
// 4001 // *CIDO - BÖLÜM - 436 - FAQCategory - SSS Kategorisi - Sık Sorulan - Konu Grup - Serde
// 4002 export interface FAQCategory {
// 4003   id: string;
// 4004   tenant_id: string;
// 4005   name: string;
// 4006   order: number;
// 4007 }
// 4008 // *CIDO - BÖLÜM - 437 - FAQItem - SSS Öğesi - Soru Cevap - Yardım İçeriği - Serde
// 4009 export interface FAQItem {
// 4010   id: string;
// 4011   category_id: string;
// 4012   tenant_id: string;
// 4013   question: string;
// 4014   answer: string;
// 4015   order: number;
// 4016   is_published: boolean;
// 4017 }
// 4018 // *CIDO - BÖLÜM - 438 - GuideArticle - Rehber Makalesi - Nasıl Yapılır - Öğretici - Serde
// 4019 export interface GuideArticle {
// 4020   id: string;
// 4021   tenant_id: string;
// 4022   title: string;
// 4023   content: string;
// 4024   steps: string[];
// 4025   images: string[];
// 4026   tags: string[];
// 4027   is_published: boolean;
// 4028   created_at: number;
// 4029   updated_at: number;
// 4030 }
// 4031 // *CIDO - BÖLÜM - 439 - VideoTutorial - Video Eğitim - Öğretici Video - Vimeo YouTube - Serde
// 4032 export interface VideoTutorial {
// 4033   id: string;
// 4034   tenant_id: string;
// 4035   title: string;
// 4036   video_url: string;
// 4037   thumbnail_url: string;
// 4038   duration_seconds: number;
// 4039   transcript: string;
// 4040 }
// 4041 // *CIDO - BÖLÜM - 440 - InteractiveDemo - İnteraktif Demo - Ürün Tanıtım - Gezinme - Serde
// 4042 export interface InteractiveDemo {
// 4043   id: string;
// 4044   tenant_id: string;
// 4045   title: string;
// 4046   steps: DemoStep[];
// 4047   is_published: boolean;
// 4048 }
// 4049 // *CIDO - BÖLÜM - 441 - DemoStep - Demo Adımı - Etkileşim Adımı - Tooltip - Serde
// 4050 export interface DemoStep {
// 4051   target_element: string;
// 4052   title: string;
// 4053   content: string;
// 4054   position: string;
// 4055   order: number;
// 4056 }
// 4057 // *CIDO - BÖLÜM - 442 - OnboardingFlow - Karşılama Akışı - İlk Kullanım - Adım Rehber - Serde
// 4058 export interface OnboardingFlow {
// 4059   tenant_id: string;
// 4060   steps: OnboardingStep[];
// 4061   completion_rate: number;
// 4062 }
// 4063 // *CIDO - BÖLÜM - 443 - WalkthroughConfig - Gezi Konfigürasyonu - Uygulama Turu - İpuçları - Serde
// 4064 export interface WalkthroughConfig {
// 4065   enabled: boolean;
// 4066   auto_start: boolean;
// 4067   show_skip: boolean;
// 4068   highlight_color: string;
// 4069 }
// 4070 // *CIDO - BÖLÜM - 444 - FeatureAnnouncement - Özellik Duyurusu - Yeni Özellik - Sürüm Notu - Serde
// 4071 export interface FeatureAnnouncement {
// 4072   id: string;
// 4073   title: string;
// 4074   description: string;
// 4075   image_url?: string;
// 4076   action_url?: string;
// 4077   published_at: number;
// 4078   expires_at?: number;
// 4079 }
// 4080 // *CIDO - BÖLÜM - 445 - Survey - Anket - Kullanıcı Anketi - Soru Listesi - Serde
// 4081 export interface Survey {
// 4082   id: string;
// 4083   tenant_id: string;
// 4084   title: string;
// 4085   questions: SurveyQuestion[];
// 4086   is_active: boolean;
// 4087   created_at: number;
// 4088 }
// 4089 // *CIDO - BÖLÜM - 446 - SurveyQuestion - Anket Sorusu - Soru Tipi - Seçenek - Serde
// 4090 export interface SurveyQuestion {
// 4091   id: string;
// 4092   type: string;
// 4093   text: string;
// 4094   required: boolean;
// 4095   options?: string[];
// 4096   order: number;
// 4097 }
// 4098 // *CIDO - BÖLÜM - 447 - SurveyResponse - Anket Yanıtı - Kullanıcı Cevabı - Gönderim - Serde
// 4099 export interface SurveyResponse {
// 4100   id: string;
// 4101   survey_id: string;
// 4102   user_id: string;
// 4103   answers: SurveyAnswer[];
// 4104   submitted_at: number;
// 4105 }
// 4106 // *CIDO - BÖLÜM - 448 - SurveyAnswer - Anket Cevabı - Soru Yanıtı - Değer - Serde
// 4107 export interface SurveyAnswer {
// 4108   question_id: string;
// 4109   value: string | string[] | number;
// 4110 }
// 4111 // *CIDO - BÖLÜM - 449 - Poll - Oylama - Canlı Anket - Sonuç Gösterimi - Serde
// 4112 export interface Poll {
// 4113   id: string;
// 4114   tenant_id: string;
// 4115   question: string;
// 4116   options: PollOption[];
// 4117   is_active: boolean;
// 4118   created_at: number;
// 4119   ends_at?: number;
// 4120 }
// 4121 // *CIDO - BÖLÜM - 450 - PollOption - Oylama Seçeneği - Oy Sayısı - Yüzde - Serde
// 4122 export interface PollOption {
// 4123   id: string;
// 4124   text: string;
// 4125   votes: number;
// 4126   percentage: number;
// 4127 }
// 4128 // *CIDO - BÖLÜM - 451 - CommunityForum - Topluluk Forumu - Tartışma - Konu Başlık - Serde
// 4129 export interface CommunityForum {
// 4130   id: string;
// 4131   tenant_id: string;
// 4132   name: string;
// 4133   description: string;
// 4134   topics_count: number;
// 4135   posts_count: number;
// 4136 }
// 4137 // *CIDO - BÖLÜM - 452 - ForumTopic - Forum Konusu - Başlık - İlk Mesaj - Serde
// 4138 export interface ForumTopic {
// 4139   id: string;
// 4140   forum_id: string;
// 4141   title: string;
// 4142   created_by: string;
// 4143   created_at: number;
// 4144   last_post_at: number;
// 4145   posts_count: number;
// 4146   is_pinned: boolean;
// 4147   is_locked: boolean;
// 4148 }
// 4149 // *CIDO - BÖLÜM - 453 - ForumPost - Forum Gönderisi - Yanıt - Beğeni - Serde
// 4150 export interface ForumPost {
// 4151   id: string;
// 4152   topic_id: string;
// 4153   user_id: string;
// 4154   body: string;
// 4155   likes_count: number;
// 4156   created_at: number;
// 4157   edited_at?: number;
// 4158 }
// 4159 // *CIDO - BÖLÜM - 454 - SocialFeed - Sosyal Akış - Aktivite Duvarı - Takip - Serde
// 4160 export interface SocialFeed {
// 4161   user_id: string;
// 4162   tenant_id: string;
// 4163   activities: SocialActivity[];
// 4164   updated_at: number;
// 4165 }
// 4166 // *CIDO - BÖLÜM - 455 - SocialActivity - Sosyal Aktivite - Beğeni Paylaşım - Etkileşim - Serde
// 4167 export interface SocialActivity {
// 4168   type: string;
// 4169   user_id: string;
// 4170   target_id: string;
// 4171   target_type: string;
// 4172   timestamp: number;
// 4173 }
// 4174 // *CIDO - BÖLÜM - 456 - FollowRelationship - Takip İlişkisi - Takipçi - Takip Edilen - Serde
// 4175 export interface FollowRelationship {
// 4176   follower_id: string;
// 4177   following_id: string;
// 4178   created_at: number;
// 4179 }
// 4180 // *CIDO - BÖLÜM - 457 - UserBadge - Kullanıcı Rozeti - Başarı - Unvan - Serde
// 4181 export interface UserBadge {
// 4182   id: string;
// 4183   name: string;
// 4184   description: string;
// 4185   icon_url: string;
// 4186   earned_at: number;
// 4187 }
// 4188 // *CIDO - BÖLÜM - 458 - GamificationConfig - Oyunlaştırma - Puan Rozet - Seviye - Serde
// 4189 export interface GamificationConfig {
// 4190   tenant_id: string;
// 4191   points_for_purchase: number;
// 4192   points_for_review: number;
// 4193   points_for_referral: number;
// 4194   points_for_daily_login: number;
// 4195 }
// 4196 // *CIDO - BÖLÜM - 459 - Leaderboard - Liderlik Tablosu - Sıralama - Puan Durumu - Serde
// 4197 export interface Leaderboard {
// 4198   tenant_id: string;
// 4199   period: string;
// 4200   entries: LeaderboardEntry[];
// 4201   generated_at: number;
// 4202 }
// 4203 // *CIDO - BÖLÜM - 460 - LeaderboardEntry - Liderlik Girişi - Kullanıcı Sıra - Puan - Serde
// 4204 export interface LeaderboardEntry {
// 4205   rank: number;
// 4206   user_id: string;
// 4207   user_name: string;
// 4208   points: number;
// 4209   avatar_url?: string;
// 4210 }
// 4211 // *CIDO - BÖLÜM - 461 - Challenge - Meydan Okuma - Görev - Hedef - Serde
// 4212 export interface Challenge {
// 4213   id: string;
// 4214   tenant_id: string;
// 4215   name: string;
// 4216   description: string;
// 4217   goal: number;
// 4218   reward_points: number;
// 4219   starts_at: number;
// 4220   ends_at: number;
// 4221   is_active: boolean;
// 4222 }
// 4223 // *CIDO - BÖLÜM - 462 - ChallengeProgress - Meydan Okuma İlerleme - Kullanıcı Durumu - Tamamlanma - Serde
// 4224 export interface ChallengeProgress {
// 4225   challenge_id: string;
// 4226   user_id: string;
// 4227   current_progress: number;
// 4228   completed: boolean;
// 4229   completed_at?: number;
// 4230 }
// 4231 // *CIDO - BÖLÜM - 463 - Reward - Ödül - Kupon Rozet - Kazanım - Serde
// 4232 export interface Reward {
// 4233   id: string;
// 4234   tenant_id: string;
// 4235   type: string;
// 4236   name: string;
// 4237   description: string;
// 4238   cost_points: number;
// 4239   is_active: boolean;
// 4240 }
// 4241 // *CIDO - BÖLÜM - 464 - RewardRedemption - Ödül Kullanımı - Puan Harcama - Talep - Serde
// 4242 export interface RewardRedemption {
// 4243   id: string;
// 4244   user_id: string;
// 4245   reward_id: string;
// 4246   points_spent: number;
// 4247   status: string;
// 4248   redeemed_at: number;
// 4249 }
// 4250 // *CIDO - BÖLÜM - 465 - ReferralProgram - Tavsiye Programı - Arkadaşını Getir - Ödül - Serde
// 4251 export interface ReferralProgram {
// 4252   tenant_id: string;
// 4253   referrer_reward: number;
// 4254   referred_reward: number;
// 4255   is_active: boolean;
// 4256 }
// 4257 // *CIDO - BÖLÜM - 466 - ReferralLink - Tavsiye Linki - Benzersiz Kod - Paylaşım - Serde
// 4258 export interface ReferralLink {
// 4259   user_id: string;
// 4260   tenant_id: string;
// 4261   code: string;
// 4262   url: string;
// 4263   clicks: number;
// 4264   signups: number;
// 4265   created_at: number;
// 4266 }
// 4267 // *CIDO - BÖLÜM - 467 - ReferralConversion - Tavsiye Dönüşümü - Başarılı Davet - Ödül Tetik - Serde
// 4268 export interface ReferralConversion {
// 4269   id: string;
// 4270   referrer_id: string;
// 4271   referred_id: string;
// 4272   reward_granted: boolean;
// 4273   converted_at: number;
// 4274 }
// 4275 // *CIDO - BÖLÜM - 468 - InviteToken - Davet Tokeni - Ekip Daveti - Geçici Erişim - Serde
// 4276 export interface InviteToken {
// 4277   id: string;
// 4278   tenant_id: string;
// 4279   email: string;
// 4280   role: UserRole;
// 4281   token: string;
// 4282   expires_at: number;
// 4283   accepted: boolean;
// 4284   created_by: string;
// 4285   created_at: number;
// 4286 }
// 4287 // *CIDO - BÖLÜM - 469 - TeamMember - Ekip Üyesi - Alt Hesap - İzin Seviyesi - Serde
// 4288 export interface TeamMember {
// 4289   id: string;
// 4290   tenant_id: string;
// 4291   user_id: string;
// 4292   role: UserRole;
// 4293   permissions: Permission[];
// 4294   joined_at: number;
// 4295   invited_by: string;
// 4296 }
// 4297 // *CIDO - BÖLÜM - 470 - PermissionOverride - İzin Geçersiz Kılma - Özel İzin - İstisna - Serde
// 4298 export interface PermissionOverride {
// 4299   user_id: string;
// 4300   tenant_id: string;
// 4301   permission: Permission;
// 4302   granted: boolean;
// 4303   expires_at?: number;
// 4304   reason: string;
// 4305 }
// 4306 // *CIDO - BÖLÜM - 471 - AuditTrail - Denetim İzi - Değişiklik Takip - Kim Ne Zaman - Serde
// 4307 export interface AuditTrail {
// 4308   id: string;
// 4309   tenant_id: string;
// 4310   user_id: string;
// 4311   action: string;
// 4312   entity_type: string;
// 4313   entity_id: string;
// 4314   old_value?: Record<string, unknown>;
// 4315   new_value?: Record<string, unknown>;
// 4316   timestamp: number;
// 4317   ip_address: string;
// 4318 }
// 4319 // *CIDO - BÖLÜM - 472 - ChangeRequest - Değişiklik Talebi - Onay Akışı - İnceleme - Serde
// 4320 export interface ChangeRequest {
// 4321   id: string;
// 4322   tenant_id: string;
// 4323   requested_by: string;
// 4324   entity_type: string;
// 4325   entity_id: string;
// 4326   changes: Record<string, unknown>;
// 4327   status: string;
// 4328   reviewed_by?: string;
// 4329   created_at: number;
// 4330   resolved_at?: number;
// 4331 }
// 4332 // *CIDO - BÖLÜM - 473 - ApprovalWorkflow - Onay İş Akışı - Onay Zinciri - Adım - Serde
// 4333 export interface ApprovalWorkflow {
// 4334   id: string;
// 4335   tenant_id: string;
// 4336   name: string;
// 4337   steps: ApprovalStep[];
// 4338   is_active: boolean;
// 4339 }
// 4340 // *CIDO - BÖLÜM - 474 - ApprovalStep - Onay Adımı - Onaylayıcı - Sıra - Serde
// 4341 export interface ApprovalStep {
// 4342   order: number;
// 4343   approver_role: UserRole;
// 4344   approver_user_id?: string;
// 4345   status: string;
// 4346   comment?: string;
// 4347   resolved_at?: number;
// 4348 }
// 4349 // *CIDO - BÖLÜM - 475 - DataExportRequest - Veri Dışa Aktarım Talebi - GDPR - Kullanıcı Verisi - Serde
// 4350 export interface DataExportRequest {
// 4351   id: string;
// 4352   tenant_id: string;
// 4353   user_id: string;
// 4354   format: string;
// 4355   status: string;
// 4356   file_url?: string;
// 4357   requested_at: number;
// 4358   completed_at?: number;
// 4359   expires_at?: number;
// 4360 }
// 4361 // *CIDO - BÖLÜM - 476 - DataErasureRequest - Veri Silme Talebi - Unutulma Hakkı - KVKK - Serde
// 4362 export interface DataErasureRequest {
// 4363   id: string;
// 4364   tenant_id: string;
// 4365   user_id: string;
// 4366   scope: string[];
// 4367   status: string;
// 4368   requested_at: number;
// 4369   completed_at?: number;
// 4370 }
// 4371 // *CIDO - BÖLÜM - 477 - CookieConsent - Çerez Onayı - İzin Kaydı - Tercih - Serde
// 4372 export interface CookieConsent {
// 4373   user_id?: string;
// 4374   tenant_id: string;
// 4375   essential: boolean;
// 4376   analytics: boolean;
// 4377   marketing: boolean;
// 4378   functional: boolean;
// 4379   consented_at: number;
// 4380   ip_address: string;
// 4381 }
// 4382 // *CIDO - BÖLÜM - 478 - PrivacyPolicy - Gizlilik Politikası - Yasal Metin - Sürüm - Serde
// 4383 export interface PrivacyPolicy {
// 4384   tenant_id: string;
// 4385   version: string;
// 4386   content: string;
// 4387   effective_date: number;
// 4388   published: boolean;
// 4389 }
// 4390 // *CIDO - BÖLÜM - 479 - TermsOfService - Kullanım Koşulları - Sözleşme - Onay - Serde
// 4391 export interface TermsOfService {
// 4392   tenant_id: string;
// 4393   version: string;
// 4394   content: string;
// 4395   effective_date: number;
// 4396   published: boolean;
// 4397 }
// 4398 // *CIDO - BÖLÜM - 480 - LegalAcceptance - Yasal Kabul - Kullanıcı Onayı - Sürüm Takip - Serde
// 4399 export interface LegalAcceptance {
// 4400   user_id: string;
// 4401   tenant_id: string;
// 4402   document_type: string;
// 4403   document_version: string;
// 4404   accepted_at: number;
// 4405   ip_address: string;
// 4406 }
// 4407 // *CIDO - BÖLÜM - 481 - DPIAReport - Veri Koruma Etki Değerlendirmesi - GDPR - Risk Analizi - Serde
// 4408 export interface DPIAReport {
// 4409   id: string;
// 4410   tenant_id: string;
// 4411   processing_activity: string;
// 4412   risk_level: string;
// 4413   mitigations: string[];
// 4414   conducted_at: number;
// 4415   reviewed_at?: number;
// 4416 }
// 4417 // *CIDO - BÖLÜM - 482 - DataBreachRecord - Veri İhlali Kaydı - İhlal Bildirimi - Otorite - Serde
// 4418 export interface DataBreachRecord {
// 4419   id: string;
// 4420   tenant_id: string;
// 4421   discovered_at: number;
// 4422   reported_at?: number;
// 4423   affected_users: number;
// 4424   data_types: string[];
// 4425   severity: string;
// 4426   status: string;
// 4427 }
// 4428 // *CIDO - BÖLÜM - 483 - RoPAArticle - İşleme Faaliyetleri Kaydı - RoPA - GDPR Madde 30 - Serde
// 4429 export interface RoPAArticle {
// 4430   id: string;
// 4431   tenant_id: string;
// 4432   activity_name: string;
// 4433   purpose: string;
// 4434   data_categories: string[];
// 4435   legal_basis: string;
// 4436   retention_period: string;
// 4437 }
// 4438 // *CIDO - BÖLÜM - 484 - DSARRequest - Veri Sahibi Başvurusu - DSAR - Erişim Talebi - Serde
// 4439 export interface DSARRequest {
// 4440   id: string;
// 4441   tenant_id: string;
// 4442   user_id: string;
// 4443   request_type: string;
// 4444   status: string;
// 4445   submitted_at: number;
// 4446   responded_at?: number;
// 4447 }
// 4448 // *CIDO - BÖLÜM - 485 - ExternalServiceHealth - Dış Servis Sağlığı - Bağımlılık Durumu - Bağlantı - Serde
// 4449 export interface ExternalServiceHealth {
// 4450   service: string;
// 4451   status: string;
// 4452   latency_ms: number;
// 4453   last_checked: number;
// 4454 }
// 4455 // *CIDO - BÖLÜM - 486 - DependencyStatus - Bağımlılık Durumu - Sistem Sağlığı - Bileşen - Serde
// 4456 export interface DependencyStatus {
// 4457   name: string;
// 4458   healthy: boolean;
// 4459   message?: string;
// 4460   checked_at: number;
// 4461 }
// 4462 // *CIDO - BÖLÜM - 487 - ResourceUtilization - Kaynak Kullanımı - CPU Bellek - Limit Takip - Serde
// 4463 export interface ResourceUtilization {
// 4464   tenant_id: string;
// 4465   cpu_time_ms: number;
// 4466   memory_mb: number;
// 4467   kv_operations: number;
// 4468   d1_operations: number;
// 4469   timestamp: number;
// 4470 }
// 4471 // *CIDO - BÖLÜM - 488 - CapacityPlanning - Kapasite Planlaması - Büyüme Tahmini - Ölçek - Serde
// 4472 export interface CapacityPlanning {
// 4473   current_capacity_percent: number;
// 4474   projected_growth_percent: number;
// 4475   recommended_plan: TenantPlan;
// 4476   estimated_cost: number;
// 4477   generated_at: number;
// 4478 }
// 4479 // *CIDO - BÖLÜM - 489 - TrafficPrediction - Trafik Tahmini - Yük Öngörü - Sezonsal - Serde
// 4480 export interface TrafficPrediction {
// 4481   tenant_id: string;
// 4482   predicted_requests: number[];
// 4483   confidence_upper: number[];
// 4484   confidence_lower: number[];
// 4485   timestamps: number[];
// 4486 }
// 4487 // *CIDO - BÖLÜM - 490 - AutoScalingRule - Otomatik Ölçekleme - Kural Tanım - Tetikleyici - Serde
// 4488 export interface AutoScalingRule {
// 4489   metric: string;
// 4490   threshold: number;
// 4491   action: string;
// 4492   cooldown_seconds: number;
// 4493 }
// 4494 // *CIDO - BÖLÜM - 491 - WarmupRequest - Isınma İsteği - Cold Start - İlk İstek - Serde
// 4495 export interface WarmupRequest {
// 4496   worker_name: string;
// 4497   timestamp: number;
// 4498   duration_ms: number;
// 4499 }
// 4500 // *CIDO - BÖLÜM - 492 - ColdStartMetric - Soğuk Başlangıç - Başlatma Süresi - İzolat - Serde
// 4501 export interface ColdStartMetric {
// 4502   isolate: string;
// 4503   startup_time_ms: number;
// 4504   timestamp: number;
// 4505 }
// 4506 // *CIDO - BÖLÜM - 493 - IsolateStats - İzolat İstatistikleri - V8 İzolat - Bellek - Serde
// 4507 export interface IsolateStats {
// 4508   heap_used_mb: number;
// 4509   heap_limit_mb: number;
// 4510   cpu_time_ms: number;
// 4511   request_count: number;
// 4512 }
// 4513 // *CIDO - BÖLÜM - 494 - GCStats - Çöp Toplama - GC İstatistik - Bellek Temizliği - Serde
// 4514 export interface GCStats {
// 4515   collections: number;
// 4516   total_pause_ms: number;
// 4517   avg_pause_ms: number;
// 4518   freed_mb: number;
// 4519 }
// 4520 // *CIDO - BÖLÜM - 495 - V8Flags - V8 Bayrakları - Motor Ayarı - Optimizasyon - Serde
// 4521 export interface V8Flags {
// 4522   turbofan: boolean;
// 4523   maglev: boolean;
// 4524   wasm_tier_up: boolean;
// 4525 }
// 4526 // *CIDO - BÖLÜM - 496 - WASMMetrics - WASM Metrikleri - Modül Boyutu - Anlık Derleme - Serde
// 4527 export interface WASMMetrics {
// 4528   module_size_bytes: number;
// 4529   compile_time_ms: number;
// 4530   instantiate_time_ms: number;
// 4531   memory_used_mb: number;
// 4532 }
// 4533 // *CIDO - BÖLÜM - 497 - EdgeCacheStats - Edge Önbellek - CDN İstatistik - İsabet Oranı - Serde
// 4534 export interface EdgeCacheStats {
// 4535   hit_rate: number;
// 4536   miss_rate: number;
// 4537   bandwidth_saved_bytes: number;
// 4538   cached_assets: number;
// 4539 }
// 4540 // *CIDO - BÖLÜM - 498 - ZoneTransfer - Bölge Transferi - Alan Adı Yönetimi - Cloudflare - Serde
// 4541 export interface ZoneTransfer {
// 4542   domain: string;
// 4543   status: string;
// 4544   nameservers: string[];
// 4545   transferred_at?: number;
// 4546 }
// 4547 // *CIDO - BÖLÜM - 499 - DDoSProtection - DDoS Koruması - Saldırı Tespit - Azaltma - Serde
// 4548 export interface DDoSProtection {
// 4549   mode: string;
// 4550   sensitivity: string;
// 4551   bypass_codes: string[];
// 4552 }
// 4553 // *CIDO - BÖLÜM - 500 - BotManagement - Bot Yönetimi - Bot Puanı - Meydan Okuma - Serde
// 4554 export interface BotManagement {
// 4555   verified_bots_pass: boolean;
// 4556   automated_challenge: boolean;
// 4557   javascript_detection: boolean;
// 4558 }
// 4559 // *CIDO - BÖLÜM - 501 - ImageResizeConfig - Görsel Boyutlandırma - Cloudflare Image - Dönüştürme - Serde
// 4560 export interface ImageResizeConfig {
// 4561   width: number;
// 4562   height: number;
// 4563   fit: string;
// 4564   format: string;
// 4565   quality: number;
// 4566 }
// 4567 // *CIDO - BÖLÜM - 502 - StreamVideo - Video Akışı - Cloudflare Stream - Manifest - Serde
// 4568 export interface StreamVideo {
// 4569   uid: string;
// 4570   thumbnail_url: string;
// 4571   playback_url: string;
// 4572   duration_seconds: number;
// 4573   status: string;
// 4574 }
// 4575 // *CIDO - BÖLÜM - 503 - StreamLiveInput - Canlı Yayın Girdisi - RTMP SRT - Yayın Anahtarı - Serde
// 4576 export interface StreamLiveInput {
// 4577   uid: string;
// 4578   rtmp_url: string;
// 4579   stream_key: string;
// 4580   status: string;
// 4581 }
// 4582 // *CIDO - BÖLÜM - 504 - PagesDeployment - Pages Dağıtımı - Statik Site - Preview - Serde
// 4583 export interface PagesDeployment {
// 4584   id: string;
// 4585   url: string;
// 4586   branch: string;
// 4587   commit_hash: string;
// 4588   status: string;
// 4589   deployed_at: number;
// 4590 }
// 4591 // *CIDO - BÖLÜM - 505 - PagesProject - Pages Projesi - Statik Site Konfig - Build - Serde
// 4592 export interface PagesProject {
// 4593   name: string;
// 4594   production_branch: string;
// 4595   build_command: string;
// 4596   output_dir: string;
// 4597   domains: string[];
// 4598 }
// 4599 // *CIDO - BÖLÜM - 506 - TunnelConfig - Tünel Konfigürasyonu - Cloudflare Tunnel - İç Ağ - Serde
// 4600 export interface TunnelConfig {
// 4601   tunnel_id: string;
// 4602   hostname: string;
// 4603   service_url: string;
// 4604   status: string;
// 4605 }
// 4606 // *CIDO - BÖLÜM - 507 - ZeroTrustAccess - Zero Trust - Erişim Politikası - Kimlik Sağlayıcı - Serde
// 4607 export interface ZeroTrustAccess {
// 4608   application_domain: string;
// 4609   identity_providers: string[];
// 4610   session_duration_hours: number;
// 4611 }
// 4612 // *CIDO - BÖLÜM - 508 - MagicWANConfig - Magic WAN - SD-WAN - Ağ Yapılandırma - Serde
// 4613 export interface MagicWANConfig {
// 4614   site_name: string;
// 4615   gre_tunnel_ip: string;
// 4616   status: string;
// 4617 }
// 4618 // *CIDO - BÖLÜM - 509 - IPPrefixList - IP Önek Listesi - BYOIP - Kendi IP - Serde
// 4619 export interface IPPrefixList {
// 4620   prefix: string;
// 4621   advertisement_status: string;
// 4622 }
// 4623 // *CIDO - BÖLÜM - 510 - LogPushJob - Log İtme İşi - Log Export - R2 Depolama - Serde
// 4624 export interface LogPushJob {
// 4625   id: string;
// 4626   destination: string;
// 4627   fields: string[];
// 4628   frequency: string;
// 4629   status: string;
// 4630 }
// 4631 // *CIDO - BÖLÜM - 511 - LogFilter - Log Filtresi - Alan Bazlı - Dahil Et Hariç Tut - Serde
// 4632 export interface LogFilter {
// 4633   field: string;
// 4634   operator: string;
// 4635   value: string;
// 4636 }
// 4637 // *CIDO - BÖLÜM - 512 - LogRetrievalQuery - Log Sorgusu - CLI SQL - Analiz - Serde
// 4638 export interface LogRetrievalQuery {
// 4639   start_time: number;
// 4640   end_time: number;
// 4641   query: string;
// 4642   limit: number;
// 4643 }
// 4644 // *CIDO - BÖLÜM - 513 - RayIDLookup - Ray ID Sorgulama - İstek Takip - Debug - Serde
// 4645 export interface RayIDLookup {
// 4646   ray_id: string;
// 4647   request_url: string;
// 4648   timestamp: number;
// 4649   datacenter: string;
// 4650 }
// 4651 // *CIDO - BÖLÜM - 514 - TraceRoute - İz Yolu - Ağ Yolu - Atlama - Serde
// 4652 export interface TraceRoute {
// 4653   target: string;
// 4654   hops: TraceHop[];
// 4655   total_time_ms: number;
// 4656 }
// 4657 // *CIDO - BÖLÜM - 515 - TraceHop - İz Atlama - Atlama Noktası - IP RTT - Serde
// 4658 export interface TraceHop {
// 4659   hop: number;
// 4660   ip: string;
// 4661   rtt_ms: number;
// 4662 }
// 4663 // *CIDO - BÖLÜM - 516 - DNSPerformance - DNS Performansı - Çözümleme Süresi - Anycast - Serde
// 4664 export interface DNSPerformance {
// 4665   domain: string;
// 4666   avg_resolution_ms: number;
// 4667   datacenter: string;
// 4668 }
// 4669 // *CIDO - BÖLÜM - 517 - ArgoSmartRouting - Argo Akıllı Yönlendirme - Hızlandırma - Latency - Serde
// 4670 export interface ArgoSmartRouting {
// 4671   enabled: boolean;
// 4672   latency_reduction_percent: number;
// 4673 }
// 4674 // *CIDO - BÖLÜM - 518 - TieredCache - Katmanlı Önbellek - Smart Tiered - Topoloji - Serde
// 4675 export interface TieredCache {
// 4676   type: string;
// 4677   cache_hit_ratio: number;
// 4678 }
// 4679 // *CIDO - BÖLÜM - 519 - OriginServer - Kaynak Sunucu - Orijin Konfig - SSL Modu - Serde
// 4680 export interface OriginServer {
// 4681   hostname: string;
// 4682   port: number;
// 4683   ssl_mode: string;
// 4684   weight: number;
// 4685 }
// 4686 // *CIDO - BÖLÜM - 520 - LoadBalancerPool - Yük Dengeleyici - Havuz Konfig - Sağlık Kontrolü - Serde
// 4687 export interface LoadBalancerPool {
// 4688   name: string;
// 4689   origins: OriginServer[];
// 4690   health_check_path: string;
// 4691   steering_policy: string;
// 4692 }
// 4693 // *CIDO - BÖLÜM - 521 - LoadBalancerRule - LB Kuralı - Trafik Yönlendirme - Koşul - Serde
// 4694 export interface LoadBalancerRule {
// 4695   condition: string;
// 4696   pool: string;
// 4697   priority: number;
// 4698 }
// 4699 // *CIDO - BÖLÜM - 522 - HealthCheckConfig - Sağlık Kontrolü - Periyot - Zaman Aşımı - Serde
// 4700 export interface HealthCheckConfig {
// 4701   path: string;
// 4702   interval_seconds: number;
// 4703   timeout_seconds: number;
// 4704   expected_status: number;
// 4705   healthy_threshold: number;
// 4706   unhealthy_threshold: number;
// 4707 }
// 4708 // *CIDO - BÖLÜM - 523 - FailoverConfig - Yedekleme Konfigürasyonu - Failover - Yedek Sunucu - Serde
// 4709 export interface FailoverConfig {
// 4710   primary_pool: string;
// 4711   backup_pool: string;
// 4712   failover_trigger: string;
// 4713 }
// 4714 // *CIDO - BÖLÜM - 524 - GeographicSteering - Coğrafi Yönlendirme - Bölge Bazlı - En Yakın - Serde
// 4715 export interface GeographicSteering {
// 4716   region: string;
// 4717   pool: string;
// 4718 }
// 4719 // *CIDO - BÖLÜM - 525 - WaitingRoom - Bekleme Odası - Trafik Yönetimi - Kuyruk - Serde
// 4720 export interface WaitingRoom {
// 4721   hostname: string;
// 4722   total_active_users: number;
// 4723   queue_length: number;
// 4724   estimated_wait_minutes: number;
// 4725 }
// 4726 // *CIDO - BÖLÜM - 526 - WaitingRoomConfig - Bekleme Odası Ayarları - Oturum Süresi - Yenileme - Serde
// 4727 export interface WaitingRoomConfig {
// 4728   new_users_per_minute: number;
// 4729   session_duration_minutes: number;
// 4730   queueing_method: string;
// 4731 }
// 4732 // *CIDO - BÖLÜM - 527 - CustomErrorPage - Özel Hata Sayfası - HTML Şablon - Durum Kodu - Serde
// 4733 export interface CustomErrorPage {
// 4734   status_code: number;
// 4735   html: string;
// 4736   tenant_id: string;
// 4737 }
// 4738 // *CIDO - BÖLÜM - 528 - RedirectRule - Yönlendirme Kuralı - 301 302 - URL Eşleştirme - Serde
// 4739 export interface RedirectRule {
// 4740   source: string;
// 4741   target: string;
// 4742   status_code: number;
// 4743   preserve_query_string: boolean;
// 4744 }
// 4745 // *CIDO - BÖLÜM - 529 - BulkRedirects - Toplu Yönlendirme - Liste - CSV Import - Serde
// 4746 export interface BulkRedirects {
// 4747   tenant_id: string;
// 4748   redirects: RedirectRule[];
// 4749   total_count: number;
// 4750 }
// 4751 // *CIDO - BÖLÜM - 530 - TransformRule - Dönüştürme Kuralı - URL Değiştirme - Header Modifikasyon - Serde
// 4752 export interface TransformRule {
// 4753   type: string;
// 4754   expression: string;
// 4755   action: string;
// 4756 }
// 4757 // *CIDO - BÖLÜM - 531 - ResponseHeaderTransform - Yanıt Başlık Dönüşümü - Ekle Sil Değiştir - Serde
// 4758 export interface ResponseHeaderTransform {
// 4759   operation: string;
// 4760   header_name: string;
// 4761   value: string;
// 4762 }
// 4763 // *CIDO - BÖLÜM - 532 - RequestHeaderTransform - İstek Başlık Dönüşümü - Header Ekleme - Serde
// 4764 export interface RequestHeaderTransform {
// 4765   operation: string;
// 4766   header_name: string;
// 4767   value: string;
// 4768 }
// 4769 // *CIDO - BÖLÜM - 533 - CacheRule - Önbellek Kuralı - Edge Cache - TTL Davranışı - Serde
// 4770 export interface CacheRule {
// 4771   expression: string;
// 4772   cache_ttl_seconds: number;
// 4773   bypass_cache: boolean;
// 4774 }
// 4775 // *CIDO - BÖLÜM - 534 - CacheReserve - Önbellek Rezervi - Kalıcı Önbellek - Büyük Dosya - Serde
// 4776 export interface CacheReserve {
// 4777   enabled: boolean;
// 4778   eligible_size_bytes: number;
// 4779 }
// 4780 // *CIDO - BÖLÜM - 535 - OriginCacheControl - Kaynak Önbellek - Cache-Control Başlık - Saygı - Serde
// 4781 export interface OriginCacheControl {
// 4782   respect_origin_headers: boolean;
// 4783   default_ttl_seconds: number;
// 4784 }
// 4785 // *CIDO - BÖLÜM - 536 - APIShield - API Kalkanı - Şema Doğrulama - Pozitif Güvenlik - Serde
// 4786 export interface APIShield {
// 4787   schema_validation: boolean;
// 4788   schema_file_url: string;
// 4789   endpoint_prefix: string;
// 4790 }
// 4791 // *CIDO - BÖLÜM - 537 - mTLSConfig - mTLS Konfigürasyonu - Karşılıklı TLS - İstemci Sertifika - Serde
// 4792 export interface mTLSConfig {
// 4793   enabled: boolean;
// 4794   ca_certificate_id: string;
// 4795   hostname: string;
// 4796 }
// 4797 // *CIDO - BÖLÜM - 538 - ClientCertificate - İstemci Sertifikası - PEM Format - Parmak İzi - Serde
// 4798 export interface ClientCertificate {
// 4799   id: string;
// 4800   fingerprint: string;
// 4801   issuer: string;
// 4802   expires_at: number;
// 4803 }
// 4804 // *CIDO - BÖLÜM - 539 - KeylessSSL - Anahtarsız SSL - Özel Anahtar Saklama - HSM - Serde
// 4805 export interface KeylessSSL {
// 4806   hostname: string;
// 4807   key_server: string;
// 4808   status: string;
// 4809 }
// 4810 // *CIDO - BÖLÜM - 540 - DNSSECConfig - DNSSEC Konfigürasyonu - İmzalı Bölge - DS Kaydı - Serde
// 4811 export interface DNSSECConfig {
// 4812   status: string;
// 4813   algorithm: string;
// 4814   digest: string;
// 4815   ds_record: string;
// 4816 }
// 4817 // *CIDO - BÖLÜM - 541 - CNAMEFlattening - CNAME Düzleştirme - Apex Root - Çıplak Domain - Serde
// 4818 export interface CNAMEFlattening {
// 4819   enabled: boolean;
// 4820   target: string;
// 4821 }
// 4822 // *CIDO - BÖLÜM - 542 - ProxyProtocol - Proxy Protokolü - Orijin IP Koruma - Gerçek IP - Serde
// 4823 export interface ProxyProtocol {
// 4824   enabled: boolean;
// 4825   version: string;
// 4826 }
// 4827 // *CIDO - BÖLÜM - 543 - RailgunConfig - Railgun Konfigürasyonu - WAN Optimizasyonu - Delta - Serde
// 4828 export interface RailgunConfig {
// 4829   listener_token: string;
// 4830   compression_ratio: number;
// 4831 }
// 4832 // *CIDO - BÖLÜM - 544 - NetworkInterconnect - Ağ Bağlantısı - Direkt Peering - CNI - Serde
// 4833 export interface NetworkInterconnect {
// 4834   type: string;
// 4835   slot_name: string;
// 4836   status: string;
// 4837 }
// 4838 // *CIDO - BÖLÜM - 545 - IPFirewallRule - IP Güvenlik Duvarı - Erişim Kuralı - IP CIDR - Serde
// 4839 export interface IPFirewallRule {
// 4840   expression: string;
// 4841   action: string;
// 4842 }
// 4843 // *CIDO - BÖLÜM - 546 - UserAgentBlocking - Kullanıcı Ajanı Engelleme - UA Filtre - Yasaklı - Serde
// 4844 export interface UserAgentBlocking {
// 4845   user_agent_pattern: string;
// 4846   action: string;
// 4847 }
// 4848 // *CIDO - BÖLÜM - 547 - ZoneLockdown - Bölge Kilitleme - URL IP Kilidi - Güvenli Alan - Serde
// 4849 export interface ZoneLockdown {
// 4850   url_pattern: string;
// 4851   allowed_ips: string[];
// 4852 }
// 4853 // *CIDO - BÖLÜM - 548 - AccessPolicy - Erişim Politikası - Uygulama Erişimi - Grup Politikası - Serde
// 4854 export interface AccessPolicy {
// 4855   application: string;
// 4856   include: string[];
// 4857   exclude: string[];
// 4858   require: string[];
// 4859 }
// 4860 // *CIDO - BÖLÜM - 549 - ServiceToken - Servis Tokeni - Makine Kimliği - Otomatik Erişim - Serde
// 4861 export interface ServiceToken {
// 4862   id: string;
// 4863   client_id: string;
// 4864   client_secret: string;
// 4865   expires_at: number;
// 4866 }
// 4867 // *CIDO - BÖLÜM - 550 - GatewayRule - Ağ Geçidi Kuralı - DNS Filtreleme - Güvenlik - Serde
// 4868 export interface GatewayRule {
// 4869   domain: string;
// 4870   action: string;
// 4871   policy: string;
// 4872 }
// 4873 // *CIDO - BÖLÜM - 551 - BrowserIsolation - Tarayıcı İzolasyonu - Uzaktan Tarayıcı - Sıfır Güven - Serde
// 4874 export interface BrowserIsolation {
// 4875   url_pattern: string;
// 4876   isolation_level: string;
// 4877 }
// 4878 // *CIDO - BÖLÜM - 552 - DataLossPrevention - Veri Kaybı Önleme - DLP Profili - Hassas Veri - Serde
// 4879 export interface DataLossPrevention {
// 4880   profile: string;
// 4881   detection_entries: string[];
// 4882   action: string;
// 4883 }
// 4884 // *CIDO - BÖLÜM - 553 - CASBIntegration - CASB Entegrasyonu - SaaS Güvenlik - API Tabanlı - Serde
// 4885 export interface CASBIntegration {
// 4886   provider: string;
// 4887   status: string;
// 4888   last_scan_at: number;
// 4889 }
// 4890 // *CIDO - BÖLÜM - 554 - EmailSecurity - E-posta Güvenliği - Alan Adı Koruma - DMARC SPF DKIM - Serde
// 4891 export interface EmailSecurity {
// 4892   domain: string;
// 4893   spf_status: string;
// 4894   dkim_status: string;
// 4895   dmarc_policy: string;
// 4896 }
// 4897 // *CIDO - BÖLÜM - 555 - DMARCAggregate - DMARC Toplu - Rapor Verisi - XML Analiz - Serde
// 4898 export interface DMARCAggregate {
// 4899   domain: string;
// 4900   report_id: string;
// 4901   begin_date: number;
// 4902   end_date: number;
// 4903   total_messages: number;
// 4904   spf_pass: number;
// 4905   dkim_pass: number;
// 4906 }
// 4907 // *CIDO - BÖLÜM - 556 - EmailRouting - E-posta Yönlendirme - Catch-all - Hedef Posta Kutusu - Serde
// 4908 export interface EmailRouting {
// 4909   domain: string;
// 4910   rules: EmailRoutingRule[];
// 4911 }
// 4912 // *CIDO - BÖLÜM - 557 - EmailRoutingRule - E-posta Yönlendirme Kuralı - Kaynak Hedef - Serde
// 4913 export interface EmailRoutingRule {
// 4914   source: string;
// 4915   destination: string;
// 4916 }
// 4917 // *CIDO - BÖLÜM - 558 - EmailWorker - E-posta İşçisi - Gelen E-posta İşleme - Webhook - Serde
// 4918 export interface EmailWorker {
// 4919   route: string;
// 4920   worker_name: string;
// 4921 }
// 4922 // *CIDO - BÖLÜM - 559 - CustomNS - Özel Ad Sunucusu - NS Kaydı - Markalı - Serde
// 4923 export interface CustomNS {
// 4924   domain: string;
// 4925   nameservers: string[];
// 4926 }
// 4927 // *CIDO - BÖLÜM - 560 - DomainTransfer - Alan Adı Transferi - AuthCode - Kilit Durumu - Serde
// 4928 export interface DomainTransfer {
// 4929   domain: string;
// 4930   auth_code: string;
// 4931   locked: boolean;
// 4932   status: string;
// 4933 }
// 4934 // *CIDO - BÖLÜM - 561 - RegistrarConfig - Kayıt Kuruluşu - Alan Adı Kaydı - İletişim - Serde
// 4935 export interface RegistrarConfig {
// 4936   registrant_contact: ContactInfo;
// 4937   admin_contact: ContactInfo;
// 4938   tech_contact: ContactInfo;
// 4939 }
// 4940 // *CIDO - BÖLÜM - 562 - ContactInfo - İletişim Bilgisi - WHOIS - Gizlilik - Serde
// 4941 export interface ContactInfo {
// 4942   name: string;
// 4943   organization: string;
// 4944   email: string;
// 4945   phone: string;
// 4946   address: string;
// 4947   city: string;
// 4948   country: string;
// 4949 }
// 4950 // *CIDO - BÖLÜM - 563 - WHOISPrivacy - WHOIS Gizliliği - Kimlik Koruma - Proxy - Serde
// 4951 export interface WHOISPrivacy {
// 4952   enabled: boolean;
// 4953   proxy_email: string;
// 4954 }
// 4955 // *CIDO - BÖLÜM - 564 - SpectrumApp - Spectrum Uygulaması - TCP UDP Proxy - Port Yönlendirme - Serde
// 4956 export interface SpectrumApp {
// 4957   protocol: string;
// 4958   port: number;
// 4959   origin_ip: string;
// 4960   origin_port: number;
// 4961 }
// 4962 // *CIDO - BÖLÜM - 565 - MagicTransitConfig - Magic Transit - Ağ Katmanı - GRE Tüneli - Serde
// 4963 export interface MagicTransitConfig {
// 4964   gre_tunnel: string;
// 4965   bgp_prefix: string;
// 4966 }
// 4967 // *CIDO - BÖLÜM - 566 - BYOIPConfig - BYOIP Konfigürasyonu - Kendi IP Bloğu - LOA - Serde
// 4968 export interface BYOIPConfig {
// 4969   ip_prefix: string;
// 4970   loa_document_url: string;
// 4971   status: string;
// 4972 }
// 4973 // *CIDO - BÖLÜM - 567 - StatikRoute - Statik Rota - Magic WAN - Yönlendirme - Serde
// 4974 export interface StatikRoute {
// 4975   prefix: string;
// 4976   nexthop: string;
// 4977   priority: number;
// 4978 }
// 4979 // *CIDO - BÖLÜM - 568 - Web3Gateway - Web3 Ağ Geçidi - IPFS Ethereum - Dağıtık - Serde
// 4980 export interface Web3Gateway {
// 4981   domain: string;
// 4982   target: string;
// 4983   protocol: string;
// 4984 }
// 4985 // *CIDO - BÖLÜM - 569 - IPFSConfig - IPFS Konfigürasyonu - İçerik Hash - Sabitlenmiş - Serde
// 4986 export interface IPFSConfig {
// 4987   cid: string;
// 4988   pinned: boolean;
// 4989 }
// 4990 // *CIDO - BÖLÜM - 570 - EthereumGateway - Ethereum Ağ Geçidi - ENS - RPC Proxy - Serde
// 4991 export interface EthereumGateway {
// 4992   network: string;
// 4993   rpc_endpoint: string;
// 4994 }
// 4995 // *CIDO - BÖLÜM - 571 - AuthWebhookSubscription - Auth Webhook Abonelik - Olay Türü - Uç Nokta - Serde
// 4996 export interface AuthWebhookSubscription {
// 4997   event: string;
// 4998   callback_url: string;
// 4999   secret: string;
// 5000 }
// 5001 // *CIDO - BÖLÜM - 572 - AlertNotification - Alarm Bildirimi - E-posta Webhook PagerDuty - Serde
// 5002 export interface AlertNotification {
// 5003   type: string;
// 5004   target: string;
// 5005   enabled: boolean;
// 5006 }
// 5007 // *CIDO - BÖLÜM - 573 - PagerDutyConfig - PagerDuty Konfigürasyonu - Servis Anahtarı - Eskalasyon - Serde
// 5008 export interface PagerDutyConfig {
// 5009   service_key: string;
// 5010   urgency: string;
// 5011 }
// 5012 // *CIDO - BÖLÜM - 574 - SlackNotification - Slack Bildirimi - Webhook URL - Kanal - Serde
// 5013 export interface SlackNotification {
// 5014   webhook_url: string;
// 5015   channel: string;
// 5016   username: string;
// 5017 }
// 5018 // *CIDO - BÖLÜM - 575 - DiscordNotification - Discord Bildirimi - Webhook - Embed - Serde
// 5019 export interface DiscordNotification {
// 5020   webhook_url: string;
// 5021   embed_color: number;
// 5022 }
// 5023 // *CIDO - BÖLÜM - 576 - StatusPageConfig - Durum Sayfası - Genel Statü - Bileşen Durumu - Serde
// 5024 export interface StatusPageConfig {
// 5025   tenant_id: string;
// 5026   components: StatusComponent[];
// 5027 }
// 5028 // *CIDO - BÖLÜM - 577 - StatusComponent - Durum Bileşeni - Servis Adı - Durum - Serde
// 5029 export interface StatusComponent {
// 5030   name: string;
// 5031   status: string;
// 5032   updated_at: number;
// 5033 }
// 5034 // *CIDO - BÖLÜM - 578 - IncidentUpdate - Olay Güncellemesi - Durum Geçmişi - Zaman Çizelgesi - Serde
// 5035 export interface IncidentUpdate {
// 5036   message: string;
// 5037   status: string;
// 5038   timestamp: number;
// 5039 }
// 5040 // *CIDO - BÖLÜM - 579 - ScheduledMaintenance - Planlı Bakım - Duyuru - Zaman Aralığı - Serde
// 5041 export interface ScheduledMaintenance {
// 5042   id: string;
// 5043   title: string;
// 5044   description: string;
// 5045   scheduled_start: number;
// 5046   scheduled_end: number;
// 5047   status: string;
// 5048 }
// 5049 // *CIDO - BÖLÜM - 580 - APITokenScope - API Token Kapsamı - İzin Seti - Okuma Yazma - Serde
// 5050 export interface APITokenScope {
// 5051   resource: string;
// 5052   read: boolean;
// 5053   write: boolean;
// 5054 }
// 5055 // *CIDO - BÖLÜM - 581 - APIToken - API Token - Yetkilendirme Başlığı - Süre - Serde
// 5056 export interface APIToken {
// 5057   id: string;
// 5058   name: string;
// 5059   token: string;
// 5060   scopes: APITokenScope[];
// 5061   expires_at: number;
// 5062   created_at: number;
// 5063 }
// 5064 // *CIDO - BÖLÜM - 582 - APITokenPolicy - API Token Politikası - IP Kısıtlama - TTL - Serde
// 5065 export interface APITokenPolicy {
// 5066   allowed_ips: string[];
// 5067   ttl_seconds: number;
// 5068 }
// 5069 // *CIDO - BÖLÜM - 583 - ServiceAccount - Hizmet Hesabı - Makine Kullanıcısı - Kalıcı Token - Serde
// 5070 export interface ServiceAccount {
// 5071   id: string;
// 5072   name: string;
// 5073   email: string;
// 5074   api_token_id: string;
// 5075 }
// 5076 // *CIDO - BÖLÜM - 584 - AuthRoleBinding - Rol Bağlama - Kullanıcı Rol - Kaynak Erişim - Serde
// 5077 export interface AuthRoleBinding {
// 5078   user_id: string;
// 5079   role: UserRole;
// 5080   resource_type: string;
// 5081   resource_id: string;
// 5082 }
// 5083 // *CIDO - BÖLÜM - 585 - ResourceACL - Kaynak ACL - Erişim Denetim Listesi - İzin - Serde
// 5084 export interface ResourceACL {
// 5085   resource: string;
// 5086   owner_id: string;
// 5087   read_access: string[];
// 5088   write_access: string[];
// 5089   admin_access: string[];
// 5090 }
// 5091 // *CIDO - BÖLÜM - 586 - TenantMemberPolicy - Kiracı Üye Politikası - Varsayılan Rol - Katılım - Serde
// 5092 export interface TenantMemberPolicy {
// 5093   tenant_id: string;
// 5094   default_role: UserRole;
// 5095   auto_join_domains: string[];
// 5096 }
// 5097 // *CIDO - BÖLÜM - 587 - OrganizationUnit - Organizasyon Birimi - Grup - Hiyerarşi - Serde
// 5098 export interface OrganizationUnit {
// 5099   id: string;
// 5100   tenant_id: string;
// 5101   name: string;
// 5102   parent_id?: string;
// 5103   members: string[];
// 5104 }
// 5105 // *CIDO - BÖLÜM - 588 - CostCenter - Maliyet Merkezi - Bütçe Takip - Harcama - Serde
// 5106 export interface CostCenter {
// 5107   id: string;
// 5108   tenant_id: string;
// 5109   name: string;
// 5110   budget: number;
// 5111   spent: number;
// 5112   currency: string;
// 5113 }
// 5114 // *CIDO - BÖLÜM - 589 - BudgetAlert - Bütçe Uyarısı - Harcama Eşiği - Yüzde - Serde
// 5115 export interface BudgetAlert {
// 5116   cost_center_id: string;
// 5117   threshold_percent: number;
// 5118   triggered: boolean;
// 5119   triggered_at?: number;
// 5120 }
// 5121 // *CIDO - BÖLÜM - 590 - SpendReport - Harcama Raporu - Dönem Bazlı - Servis Kırılımı - Serde
// 5122 export interface SpendReport {
// 5123   tenant_id: string;
// 5124   period: string;
// 5125   total_spend: number;
// 5126   by_service: Record<string, number>;
// 5127 }
// 5128 // *CIDO - BÖLÜM - 591 - ContractTerms - Sözleşme Şartları - Kurumsal Plan - Özel Fiyat - Serde
// 5129 export interface ContractTerms {
// 5130   tenant_id: string;
// 5131   start_date: number;
// 5132   end_date: number;
// 5133   committed_spend: number;
// 5134   discount_percent: number;
// 5135 }
// 5136 // *CIDO - BÖLÜM - 592 - InvoiceSettings - Fatura Ayarları - Vergi No - Fatura Adresi - Serde
// 5137 export interface InvoiceSettings {
// 5138   tenant_id: string;
// 5139   company_name: string;
// 5140   tax_id: string;
// 5141   billing_address: ShippingAddress;
// 5142   billing_email: string;
// 5143 }
// 5144 // *CIDO - BÖLÜM - 593 - PaymentTerms - Ödeme Koşulları - Net 30 - Peşin - Vade - Serde
// 5145 export interface PaymentTerms {
// 5146   type: string;
// 5147   due_days: number;
// 5148   early_payment_discount: number;
// 5149 }
// 5150 // *CIDO - BÖLÜM - 594 - CreditBalance - Kredi Bakiyesi - Ön Ödeme - Havuz - Serde
// 5151 export interface CreditBalance {
// 5152   tenant_id: string;
// 5153   balance: number;
// 5154   currency: string;
// 5155   last_topped_up_at: number;
// 5156 }
// 5157 // *CIDO - BÖLÜM - 595 - TopUpRequest - Bakiye Yükleme - Kredi Kartı - Tutar - Serde
// 5158 export interface TopUpRequest {
// 5159   tenant_id: string;
// 5160   amount: number;
// 5161   payment_method_id: string;
// 5162 }
// 5163 // *CIDO - BÖLÜM - 596 - TrialConfig - Deneme Konfigürasyonu - Ücretsiz Deneme - Süre - Serde
// 5164 export interface TrialConfig {
// 5165   trial_days: number;
// 5166   require_payment_method: boolean;
// 5167   features_limited: boolean;
// 5168 }
// 5169 // *CIDO - BÖLÜM - 597 - TrialStatus - Deneme Durumu - Kalan Gün - Dönüşüm - Serde
// 5170 export interface TrialStatus {
// 5171   tenant_id: string;
// 5172   days_remaining: number;
// 5173   is_trial: boolean;
// 5174   converted_to_paid: boolean;
// 5175   trial_ends_at: number;
// 5176 }
// 5177 // *CIDO - BÖLÜM - 598 - DowngradeRequest - Alt Plana Geçiş - Plan Düşürme - Veri Saklama - Serde
// 5178 export interface DowngradeRequest {
// 5179   tenant_id: string;
// 5180   reason: string;
// 5181   data_retention_acknowledged: boolean;
// 5182 }
// 5183 // *CIDO - BÖLÜM - 599 - CancellationRequest - İptal Talebi - Hesap Kapatma - Geri Bildirim - Serde
// 5184 export interface CancellationRequest {
// 5185   tenant_id: string;
// 5186   reason: string;
// 5187   feedback?: string;
// 5188   scheduled_at?: number;
// 5189 }
// 5190 // *CIDO - BÖLÜM - 600 - OffboardingChecklist - Ayrılış Kontrol Listesi - Veri Dışa Aktar - Silme - Serde
// 5191 export interface OffboardingChecklist {
// 5192   tenant_id: string;
// 5193   steps: OffboardingStep[];
// 5194   completed: boolean;
// 5195 }
// 5196 // *CIDO - BÖLÜM - 601 - OffboardingStep - Ayrılış Adımı - Veri İndir - Domain Kaldır - Serde
// 5197 export interface OffboardingStep {
// 5198   name: string;
// 5199   description: string;
// 5200   required: boolean;
// 5201   completed: boolean;
// 5202 }
// 5203 // *CIDO - BÖLÜM - 602 - ReactivationRequest - Yeniden Aktivasyon - Dondurulmuş Hesap - Geri Dön - Serde
// 5204 export interface ReactivationRequest {
// 5205   tenant_id: string;
// 5206   requested_at: number;
// 5207   status: string;
// 5208 }
// 5209 // *CIDO - BÖLÜM - 603 - AccountMerge - Hesap Birleştirme - Kiracı Taşıma - Veri Birleştir - Serde
// 5210 export interface AccountMerge {
// 5211   source_tenant_id: string;
// 5212   target_tenant_id: string;
// 5213   status: string;
// 5214   started_at: number;
// 5215   completed_at?: number;
// 5216 }
// 5217 // *CIDO - BÖLÜM - 604 - FeaturePreview - Özellik Önizleme - Beta Programı - Erken Erişim - Serde
// 5218 export interface FeaturePreview {
// 5219   feature_name: string;
// 5220   tenant_whitelist: string[];
// 5221   feedback_form_url: string;
// 5222   beta_end_date: number;
// 5223 }
// 5224 // *CIDO - BÖLÜM - 605 - EarlyAccessProgram - Erken Erişim - Davet - Kuyruk - Serde
// 5225 export interface EarlyAccessProgram {
// 5226   feature: string;
// 5227   queue_length: number;
// 5228   invited_count: number;
// 5229 }
// 5230 // *CIDO - BÖLÜM - 606 - FeedbackLoop - Geri Bildirim Döngüsü - Özellik Oyu - Yorum - Serde
// 5231 export interface FeedbackLoop {
// 5232   feature_id: string;
// 5233   tenant_id: string;
// 5234   user_id: string;
// 5235   vote: string;
// 5236   comment?: string;
// 5237 }
// 5238 // *CIDO - BÖLÜM - 607 - ProductRoadmap - Ürün Yol Haritası - Planlanan - Geliştirmede - Serde
// 5239 export interface ProductRoadmap {
// 5240   items: RoadmapItem[];
// 5241   last_updated: number;
// 5242 }
// 5243 // *CIDO - BÖLÜM - 608 - RoadmapItem - Yol Haritası Öğesi - Başlık Durum - Tahmini Tarih - Serde
// 5244 export interface RoadmapItem {
// 5245   id: string;
// 5246   title: string;
// 5247   description: string;
// 5248   status: string;
// 5249   target_date: number;
// 5250 }
// 5251 // *CIDO - BÖLÜM - 609 - IntegrationManifest - Entegrasyon Manifestosu - Üçüncü Parti - Bağlantı - Serde
// 5252 export interface IntegrationManifest {
// 5253   name: string;
// 5254   version: string;
// 5255   description: string;
// 5256   permissions: Permission[];
// 5257   setup_url: string;
// 5258   webhook_url: string;
// 5259 }
// 5260 // *CIDO - BÖLÜM - 610 - IntegrationInstance - Entegrasyon Örneği - Kurulum - Yapılandırma - Serde
// 5261 export interface IntegrationInstance {
// 5262   id: string;
// 5263   tenant_id: string;
// 5264   integration_name: string;
// 5265   config: Record<string, unknown>;
// 5266   status: string;
// 5267   installed_at: number;
// 5268 }
// 5269 // *CIDO - BÖLÜM - 611 - OAuthApp - OAuth Uygulaması - Client ID Secret - Yetkilendirme - Serde
// 5270 export interface OAuthApp {
// 5271   id: string;
// 5272   tenant_id: string;
// 5273   name: string;
// 5274   client_id: string;
// 5275   client_secret_encrypted: string;
// 5276   redirect_uris: string[];
// 5277   scopes: string[];
// 5278 }
// 5279 // *CIDO - BÖLÜM - 612 - OAuthAuthorization - OAuth Yetkilendirme - Grant Code - Erişim Tokeni - Serde
// 5280 export interface OAuthAuthorization {
// 5281   code: string;
// 5282   client_id: string;
// 5283   user_id: string;
// 5284   scopes: string[];
// 5285   expires_at: number;
// 5286   redirect_uri: string;
// 5287 }
// 5288 // *CIDO - BÖLÜM - 613 - OAuthTokenResponse - OAuth Token Yanıtı - Erişim Refresh - Süre - Serde
// 5289 export interface OAuthTokenResponse {
// 5290   access_token: string;
// 5291   token_type: string;
// 5292   expires_in: number;
// 5293   refresh_token?: string;
// 5294   scope: string;
// 5295 }
// 5296 // *CIDO - BÖLÜM - 614 - AppStoreListing - Uygulama Mağazası - Meta Veri - Ekran Görüntüsü - Serde
// 5297 export interface AppStoreListing {
// 5298   app_id: string;
// 5299   name: string;
// 5300   description: string;
// 5301   screenshots: string[];
// 5302   category: string;
// 5303 }
// 5304 // *CIDO - BÖLÜM - 615 - AppReview - Uygulama İncelemesi - Kullanıcı Puanı - Yorum - Serde
// 5305 export interface AppReview {
// 5306   id: string;
// 5307   app_id: string;
// 5308   user_id: string;
// 5309   rating: number;
// 5310   review: string;
// 5311   created_at: number;
// 5312 }
// 5313 // *CIDO - BÖLÜM - 616 - MarketplaceListing - Pazar Yeri İlanı - Eklenti Teması - Satış - Serde
// 5314 export interface MarketplaceListing {
// 5315   id: string;
// 5316   seller_id: string;
// 5317   type: string;
// 5318   name: string;
// 5319   price: number;
// 5320   category: string;
// 5321 }
// 5322 // *CIDO - BÖLÜM - 617 - PartnerProgram - İş Ortaklığı - Çözüm Ortağı - Ajans - Serde
// 5323 export interface PartnerProgram {
// 5324   id: string;
// 5325   partner_name: string;
// 5326   tier: string;
// 5327   discounts: Record<string, number>;
// 5328   referral_code: string;
// 5329 }
// 5330 // *CIDO - BÖLÜM - 618 - ResellerAccount - Bayi Hesabı - Alt Kiracı Yönetimi - Beyaz Etiket - Serde
// 5331 export interface ResellerAccount {
// 5332   id: string;
// 5333   parent_tenant_id: string;
// 5334   child_tenant_id: string;
// 5335   commission_rate: number;
// 5336   white_label_enabled: boolean;
// 5337 }
// 5338 // *CIDO - BÖLÜM - 619 - WhiteLabelConfig - Beyaz Etiket - Marka Kaldırma - Özel Domain - Serde
// 5339 export interface WhiteLabelConfig {
// 5340   tenant_id: string;
// 5341   hide_powered_by: boolean;
// 5342   custom_footer_text: string;
// 5343   custom_email_from: string;
// 5344 }
// 5345 // *CIDO - BÖLÜM - 620 - CustomSMTP - Özel SMTP - E-posta Gönderici - DKIM - Serde
// 5346 export interface CustomSMTP {
// 5347   tenant_id: string;
// 5348   host: string;
// 5349   port: number;
// 5350   username_encrypted: string;
// 5351   password_encrypted: string;
// 5352   from_email: string;
// 5353 }
// 5354 // *CIDO - BÖLÜM - 621 - CustomCDN - Özel CDN - Kendi Alan Adı - SSL - Serde
// 5355 export interface CustomCDN {
// 5356   tenant_id: string;
// 5357   cname_target: string;
// 5358   ssl_certificate_id: string;
// 5359 }
// 5360 // *CIDO - BÖLÜM - 622 - SSLCertificateOrder - SSL Sertifika Siparişi - DV OV EV - Sağlayıcı - Serde
// 5361 export interface SSLCertificateOrder {
// 5362   id: string;
// 5363   domain: string;
// 5364   type: string;
// 5365   status: string;
// 5366   issued_at?: number;
// 5367   expires_at: number;
// 5368 }
// 5369 // *CIDO - BÖLÜM - 623 - CSRGeneration - CSR Oluşturma - Özel Anahtar - Sertifika İmzalama - Serde
// 5370 export interface CSRGeneration {
// 5371   domain: string;
// 5372   csr_pem: string;
// 5373   private_key_encrypted: string;
// 5374 }
// 5375 // *CIDO - BÖLÜM - 624 - APIKeyRotation - API Anahtar Rotasyonu - Yenileme - Geçiş - Serde
// 5376 export interface APIKeyRotation {
// 5377   old_key_id: string;
// 5378   new_key_id: string;
// 5379   overlap_minutes: number;
// 5380   rotated_at: number;
// 5381 }
// 5382 // *CIDO - BÖLÜM - 625 - SecretRotation - Gizli Döndürme - Şifre Değişim - Otomatik - Serde
// 5383 export interface SecretRotation {
// 5384   key: string;
// 5385   last_rotated_at: number;
// 5386   rotation_interval_days: number;
// 5387   next_rotation_at: number;
// 5388 }
// 5389 // *CIDO - BÖLÜM - 626 - CredentialVault - Kimlik Kasası - KV Secret - Erişim Kontrolü - Serde
// 5390 export interface CredentialVault {
// 5391   tenant_id: string;
// 5392   secrets: EncryptedSecret[];
// 5393 }
// 5394 // *CIDO - BÖLÜM - 627 - EncryptedSecret - Şifreli Gizli - AES-256-GCM - Metadata - Serde
// 5395 export interface EncryptedSecret {
// 5396   name: string;
// 5397   ciphertext: string;
// 5398   nonce: string;
// 5399   created_at: number;
// 5400   created_by: string;
// 5401 }
// 5402 // *CIDO - BÖLÜM - 628 - MasterKeyConfig - Ana Anahtar - Tenant Bazlı - PBKDF2 - Serde
// 5403 export interface MasterKeyConfig {
// 5404   tenant_id: string;
// 5405   salt: string;
// 5406   iterations: number;
// 5407   key_length: number;
// 5408 }
// 5409 // *CIDO - BÖLÜM - 629 - DerivedKey - Türetilmiş Anahtar - Tenant Anahtarı - HMAC - Serde
// 5410 export interface DerivedKey {
// 5411   key_id: string;
// 5412   purpose: string;
// 5413   created_at: number;
// 5414   expires_at: number;
// 5415 }
// 5416 // *CIDO - BÖLÜM - 630 - HSMConfig - HSM Konfigürasyonu - Donanım Güvenlik Modülü - Anahtar - Serde
// 5417 export interface HSMConfig {
// 5418   provider: string;
// 5419   key_ring: string;
// 5420   key_name: string;
// 5421   region: string;
// 5422 }
// 5423 // *CIDO - BÖLÜM - 631 - SigningRequest - İmzalama İsteği - Veri İmzası - ECDSA RSA - Serde
// 5424 export interface SigningRequest {
// 5425   data_base64: string;
// 5426   key_id: string;
// 5427   algorithm: string;
// 5428 }
// 5429 // *CIDO - BÖLÜM - 632 - SigningResult - İmza Sonucu - İmza Base64 - Algoritma - Serde
// 5430 export interface SigningResult {
// 5431   signature_base64: string;
// 5432   algorithm: string;
// 5433   key_id: string;
// 5434   signed_at: number;
// 5435 }
// 5436 // *CIDO - BÖLÜM - 633 - VerificationRequest - Doğrulama İsteği - İmza Kontrolü - Public Key - Serde
// 5437 export interface VerificationRequest {
// 5438   data_base64: string;
// 5439   signature_base64: string;
// 5440   key_id: string;
// 5441   algorithm: string;
// 5442 }
// 5443 // *CIDO - BÖLÜM - 634 - VerificationResult - Doğrulama Sonucu - Geçerli Geçersiz - Hata - Serde
// 5444 export interface VerificationResult {
// 5445   valid: boolean;
// 5446   error?: string;
// 5447   verified_at: number;
// 5448 }
// 5449 // *CIDO - BÖLÜM - 635 - PKCS12Export - PKCS#12 Dışa Aktarım - Sertifika Zinciri - Parola - Serde
// 5450 export interface PKCS12Export {
// 5451   p12_base64: string;
// 5452   password_encrypted: string;
// 5453 }
// 5454 // *CIDO - BÖLÜM - 636 - PEMBundle - PEM Paketi - Sertifika Ara - Private Key - Serde
// 5455 export interface PEMBundle {
// 5456   certificate_pem: string;
// 5457   private_key_pem_encrypted: string;
// 5458   chain_pem?: string;
// 5459 }
// 5460 // *CIDO - BÖLÜM - 637 - CSRInfo - CSR Bilgisi - Konu Alan Adları - SAN - Serde
// 5461 export interface CSRInfo {
// 5462   common_name: string;
// 5463   subject_alt_names: string[];
// 5464   organization: string;
// 5465   country: string;
// 5466 }
// 5467 // *CIDO - BÖLÜM - 638 - CertificateChain - Sertifika Zinciri - Ara Kök - Doğrulama - Serde
// 5468 export interface CertificateChain {
// 5469   leaf_pem: string;
// 5470   intermediates_pem: string[];
// 5471   root_pem: string;
// 5472 }
// 5473 // *CIDO - BÖLÜM - 639 - OCSPStapling - OCSP Zımbalama - İptal Kontrolü - Önbellek - Serde
// 5474 export interface OCSPStapling {
// 5475   enabled: boolean;
// 5476   ocsp_response_base64: string;
// 5477   expires_at: number;
// 5478 }
// 5479 // *CIDO - BÖLÜM - 640 - CTLogEntry - Sertifika Şeffaflığı - CT Log - SCT - Serde
// 5480 export interface CTLogEntry {
// 5481   log_id: string;
// 5482   sct_base64: string;
// 5483   timestamp: number;
// 5484 }
// 5485 // *CIDO - BÖLÜM - 641 - CertTransparency - Sertifika Şeffaflığı - İzleme - Uyarı - Serde
// 5486 export interface CertTransparency {
// 5487   domain: string;
// 5488   monitored: boolean;
// 5489   alert_on_unknown: boolean;
// 5490 }
// 5491 // *CIDO - BÖLÜM - 642 - SubdomainEnumeration - Alt Alan Adı Sayımı - Keşif - DNSSEC - Serde
// 5492 export interface SubdomainEnumeration {
// 5493   domain: string;
// 5494   discovered_subdomains: string[];
// 5495   scan_date: number;
// 5496 }
// 5497 // *CIDO - BÖLÜM - 643 - AttackSurfaceReport - Saldırı Yüzeyi - Keşif Raporu - Risk - Serde
// 5498 export interface AttackSurfaceReport {
// 5499   domain: string;
// 5500   open_ports: number[];
// 5501   exposed_services: string[];
// 5502   vulnerabilities: string[];
// 5503   risk_score: number;
// 5504 }
// 5505 // *CIDO - BÖLÜM - 644 - VulnerabilityScan - Zafiyet Taraması - OWASP ZAP - Nikto - Serde
// 5506 export interface VulnerabilityScan {
// 5507   id: string;
// 5508   target: string;
// 5509   started_at: number;
// 5510   completed_at?: number;
// 5511   findings_count: number;
// 5512   severity_counts: Record<string, number>;
// 5513 }
// 5514 // *CIDO - BÖLÜM - 645 - VulnerabilityFinding - Zafiyet Bulgusu - CVE CVSS - Açıklama - Serde
// 5515 export interface VulnerabilityFinding {
// 5516   id: string;
// 5517   cve_id?: string;
// 5518   cvss_score: number;
// 5519   severity: string;
// 5520   description: string;
// 5521   location: string;
// 5522   remediation: string;
// 5523 }
// 5524 // *CIDO - BÖLÜM - 646 - ThreatModel - Tehdit Modeli - STRIDE - DREAD - Serde
// 5525 export interface ThreatModel {
// 5526   asset: string;
// 5527   threats: ThreatEntry[];
// 5528   created_at: number;
// 5529 }
// 5530 // *CIDO - BÖLÜM - 647 - ThreatEntry - Tehdit Girişi - Aktör Vektör - Etki - Serde
// 5531 export interface ThreatEntry {
// 5532   name: string;
// 5533   category: string;
// 5534   likelihood: string;
// 5535   impact: string;
// 5536   mitigation: string;
// 5537 }
// 5538 // *CIDO - BÖLÜM - 648 - DataFlowDiagram - Veri Akış Diyagramı - Sistem Bileşen - Akış - Serde
// 5539 export interface DataFlowDiagram {
// 5540   components: DFDComponent[];
// 5541   flows: DFDFlow[];
// 5542   trust_boundaries: DFDTrustBoundary[];
// 5543 }
// 5544 // *CIDO - BÖLÜM - 649 - DFDComponent - DFD Bileşeni - Varlık - İşlem - Serde
// 5545 export interface DFDComponent {
// 5546   id: string;
// 5547   name: string;
// 5548   type: string;
// 5549   description: string;
// 5550 }
// 5551 // *CIDO - BÖLÜM - 650 - DFDFlow - DFD Akışı - Veri Hareketi - Protokol - Serde
// 5552 export interface DFDFlow {
// 5553   from: string;
// 5554   to: string;
// 5555   protocol: string;
// 5556   data_classification: DataClassification;
// 5557 }
// 5558 // *CIDO - BÖLÜM - 651 - DFDTrustBoundary - DFD Güven Sınırı - Ağ Bölgesi - İzolasyon - Serde
// 5559 export interface DFDTrustBoundary {
// 5560   name: string;
// 5561   components: string[];
// 5562 }
// 5563 // *CIDO - BÖLÜM - 652 - ArchitectureDiagram - Mimari Diyagram - C4 Model - Konteyner - Serde
// 5564 export interface ArchitectureDiagram {
// 5565   containers: ContainerInfo[];
// 5566   relationships: RelationshipInfo[];
// 5567 }
// 5568 // *CIDO - BÖLÜM - 653 - ContainerInfo - Konteyner Bilgisi - Servis Adı - Teknoloji - Serde
// 5569 export interface ContainerInfo {
// 5570   name: string;
// 5571   technology: string;
// 5572   description: string;
// 5573 }
// 5574 // *CIDO - BÖLÜM - 654 - RelationshipInfo - İlişki Bilgisi - Bağlantı - Açıklama - Serde
// 5575 export interface RelationshipInfo {
// 5576   from: string;
// 5577   to: string;
// 5578   description: string;
// 5579   technology: string;
// 5580 }
// 5581 // *CIDO - BÖLÜM - 655 - ADRRecord - ADR Kaydı - Mimari Karar - Bağlam - Serde
// 5582 export interface ADRRecord {
// 5583   id: string;
// 5584   title: string;
// 5585   status: string;
// 5586   context: string;
// 5587   decision: string;
// 5588   consequences: string;
// 5589   date: number;
// 5590 }
// 5591 // *CIDO - BÖLÜM - 656 - TechRadar - Teknoloji Radarı - Benimse Değerlendir - Emekli - Serde
// 5592 export interface TechRadar {
// 5593   quadrant: string;
// 5594   ring: string;
// 5595   label: string;
// 5596   description: string;
// 5597 }
// 5598 // *CIDO - BÖLÜM - 657 - CodingStandard - Kodlama Standardı - Kural Seti - Dil - Serde
// 5599 export interface CodingStandard {
// 5600   language: string;
// 5601   rules: CodingRule[];
// 5602 }
// 5603 // *CIDO - BÖLÜM - 658 - CodingRule - Kodlama Kuralı - ID Mesaj - Önem - Serde
// 5604 export interface CodingRule {
// 5605   id: string;
// 5606   message: string;
// 5607   severity: string;
// 5608   category: string;
// 5609 }
// 5610 // *CIDO - BÖLÜM - 659 - CodeTemplate - Kod Şablonu - Dosya İskeleti - Başlangıç - Serde
// 5611 export interface CodeTemplate {
// 5612   name: string;
// 5613   file_pattern: string;
// 5614   content: string;
// 5615   variables: string[];
// 5616 }
// 5617 // *CIDO - BÖLÜM - 660 - ScaffoldConfig - İskele Konfigürasyonu - Proje Üretme - Şablon - Serde
// 5618 export interface ScaffoldConfig {
// 5619   project_type: string;
// 5620   templates: CodeTemplate[];
// 5621   post_generate_commands: string[];
// 5622 }
// 5623 // *CIDO - BÖLÜM - 661 - DevContainerConfig - Dev Container - Geliştirme Ortamı - Docker - Serde
// 5624 export interface DevContainerConfig {
// 5625   image: string;
// 5626   extensions: string[];
// 5627   forward_ports: number[];
// 5628   post_create_command: string;
// 5629 }
// 5630 // *CIDO - BÖLÜM - 662 - GitHubCodeSpace - GitHub CodeSpace - Bulut Geliştirme - Makine Tipi - Serde
// 5631 export interface GitHubCodeSpace {
// 5632   machine_type: string;
// 5633   devcontainer_path: string;
// 5634   timeout_minutes: number;
// 5635 }
// 5636 // *CIDO - BÖLÜM - 663 - GitPodConfig - GitPod Konfigürasyonu - Çalışma Alanı - Ön Derleme - Serde
// 5637 export interface GitPodConfig {
// 5638   image: string;
// 5639   tasks: GitPodTask[];
// 5640 }
// 5641 // *CIDO - BÖLÜM - 664 - GitPodTask - GitPod Görevi - Komut - Başlangıç - Serde
// 5642 export interface GitPodTask {
// 5643   name: string;
// 5644   command: string;
// 5645   prebuild: boolean;
// 5646 }
// 5647 // *CIDO - BÖLÜM - 665 - PrebuildConfig - Ön Derleme - Bağımlılık Yükleme - Derleme Önbelleği - Serde
// 5648 export interface PrebuildConfig {
// 5649   install_command: string;
// 5650   build_command: string;
// 5651   cache_paths: string[];
// 5652 }
// 5653 // *CIDO - BÖLÜM - 666 - SandboxConfig - Korumalı Alan - Test Ortamı - İzole - Serde
// 5654 export interface SandboxConfig {
// 5655   tenant_id: string;
// 5656   expires_at: number;
// 5657   allowed_endpoints: string[];
// 5658 }
// 5659 // *CIDO - BÖLÜM - 667 - EphemeralEnv - Geçici Ortam - PR Preview - Otomatik Temizlik - Serde
// 5660 export interface EphemeralEnv {
// 5661   id: string;
// 5662   branch: string;
// 5663   url: string;
// 5664   created_at: number;
// 5665   expires_at: number;
// 5666 }
// 5667 // *CIDO - BÖLÜM - 668 - PreviewDeployment - Önizleme Dağıtımı - Her PR - Eşsiz URL - Serde
// 5668 export interface PreviewDeployment {
// 5669   pr_number: number;
// 5670   commit_hash: string;
// 5671   url: string;
// 5672   status: string;
// 5673 }
// 5674 // *CIDO - BÖLÜM - 669 - DatabaseBranching - Veritabanı Dallanma - Şema Kopyalama - İzole Test - Serde
// 5675 export interface DatabaseBranching {
// 5676   source_database_id: string;
// 5677   branch_database_id: string;
// 5678   created_at: number;
// 5679   status: string;
// 5680 }
// 5681 // *CIDO - BÖLÜM - 670 - SchemaDiff - Şema Farkı - Göç Karşılaştırma - Değişiklik - Serde
// 5682 export interface SchemaDiff {
// 5683   added_tables: string[];
// 5684   removed_tables: string[];
// 5685   modified_tables: SchemaTableDiff[];
// 5686 }
// 5687 // *CIDO - BÖLÜM - 671 - SchemaTableDiff - Tablo Şema Farkı - Kolon Değişikliği - İndeks - Serde
// 5688 export interface SchemaTableDiff {
// 5689   table_name: string;
// 5690   added_columns: string[];
// 5691   removed_columns: string[];
// 5692   modified_columns: string[];
// 5693 }
// 5694 // *CIDO - BÖLÜM - 672 - DataAnonymization - Veri Anonimleştirme - Test Verisi - Gerçek Veri - Serde
// 5695 export interface DataAnonymization {
// 5696   field: string;
// 5697   method: string;
// 5698   salt: string;
// 5699 }
// 5700 // *CIDO - BÖLÜM - 673 - SyntheticData - Sentetik Veri - ML Üretimi - Sahte Profil - Serde
// 5701 export interface SyntheticData {
// 5702   entity: string;
// 5703   count: number;
// 5704   generator_version: string;
// 5705 }
// 5706 // *CIDO - BÖLÜM - 674 - BenchmarkHarness - Benchmark Koşum - Performans Testi - Karşılaştırma - Serde
// 5707 export interface BenchmarkHarness {
// 5708   name: string;
// 5709   iterations: number;
// 5710   warmup_iterations: number;
// 5711   targets: string[];
// 5712 }
// 5713 // *CIDO - BÖLÜM - 675 - ProfilerConfig - Profiler Konfigürasyonu - CPU Bellek - Örnekleme - Serde
// 5714 export interface ProfilerConfig {
// 5715   sample_rate_hz: number;
// 5716   duration_seconds: number;
// 5717   output_format: string;
// 5718 }
// 5719 // *CIDO - BÖLÜM - 676 - ProfilerResult - Profiler Sonucu - Alev Grafiği - Fonksiyon Süre - Serde
// 5720 export interface ProfilerResult {
// 5721   total_samples: number;
// 5722   top_functions: ProfilerFunction[];
// 5723   flamegraph_url: string;
// 5724 }
// 5725 // *CIDO - BÖLÜM - 677 - ProfilerFunction - Profiler Fonksiyonu - İsim Yüzde - Örnek Sayısı - Serde
// 5726 export interface ProfilerFunction {
// 5727   name: string;
// 5728   samples: number;
// 5729   percentage: number;
// 5730 }
// 5731 // *CIDO - BÖLÜM - 678 - MemoryDump - Bellek Dökümü - Heap Snapshot - Nesne Sayısı - Serde
// 5732 export interface MemoryDump {
// 5733   timestamp: number;
// 5734   heap_total_mb: number;
// 5735   heap_used_mb: number;
// 5736   object_count: number;
// 5737   top_allocations: AllocationInfo[];
// 5738 }
// 5739 // *CIDO - BÖLÜM - 679 - AllocationInfo - Tahsis Bilgisi - Tip Boyut - Sayı - Serde
// 5740 export interface AllocationInfo {
// 5741   type: string;
// 5742   size_bytes: number;
// 5743   count: number;
// 5744 }
// 5745 // *CIDO - BÖLÜM - 680 - DeadlockDetector - Kilitlenme Dedektörü - Thread Dump - Bekleyen - Serde
// 5746 export interface DeadlockDetector {
// 5747   thread_id: string;
// 5748   waiting_for: string;
// 5749   held_locks: string[];
// 5750   stack_trace: string[];
// 5751 }
// 5752 // *CIDO - BÖLÜM - 681 - RaceDetector - Yarış Dedektörü - Veri Yarışı - Eşzamanlı Erişim - Serde
// 5753 export interface RaceDetector {
// 5754   file: string;
// 5755   line: number;
// 5756   variable: string;
// 5757   access_type: string;
// 5758 }
// 5759 // *CIDO - BÖLÜM - 682 - FuzzConfig - Fuzz Konfigürasyonu - Rastgele Girdi - Kapsama - Serde
// 5760 export interface FuzzConfig {
// 5761   target: string;
// 5762   max_iterations: number;
// 5763   timeout_seconds: number;
// 5764   corpus_dir: string;
// 5765 }
// 5766 // *CIDO - BÖLÜM - 683 - FuzzResult - Fuzz Sonucu - Çökme Sayısı - Girdi - Serde
// 5767 export interface FuzzResult {
// 5768   iterations: number;
// 5769   crashes: FuzzCrash[];
// 5770   coverage_percent: number;
// 5771 }
// 5772 // *CIDO - BÖLÜM - 684 - FuzzCrash - Fuzz Çökmesi - Girdi Dosyası - Yığın İzi - Serde
// 5773 export interface FuzzCrash {
// 5774   input_base64: string;
// 5775   error_message: string;
// 5776   stack_trace: string[];
// 5777   discovered_at: number;
// 5778 }
// 5779 // *CIDO - BÖLÜM - 685 - MutationTest - Mutasyon Testi - Öldürülen Hayatta Kalan - Skor - Serde
// 5780 export interface MutationTest {
// 5781   file: string;
// 5782   mutations: MutationResult[];
// 5783   score: number;
// 5784 }
// 5785 // *CIDO - BÖLÜM - 686 - MutationResult - Mutasyon Sonucu - Operatör Konum - Durum - Serde
// 5786 export interface MutationResult {
// 5787   operator: string;
// 5788   line: number;
// 5789   status: string;
// 5790 }
// 5791 // *CIDO - BÖLÜM - 687 - RegressionTest - Regresyon Testi - Süit Adı - Geçen Kalan - Serde
// 5792 export interface RegressionTest {
// 5793   suite_name: string;
// 5794   total: number;
// 5795   passed: number;
// 5796   failed: number;
// 5797   skipped: number;
// 5798   duration_ms: number;
// 5799 }
// 5800 // *CIDO - BÖLÜM - 688 - VisualRegression - Görsel Regresyon - Ekran Görüntüsü - Piksel Fark - Serde
// 5801 export interface VisualRegression {
// 5802   baseline_url: string;
// 5803   current_url: string;
// 5804   diff_url: string;
// 5805   diff_percent: number;
// 5806   passed: boolean;
// 5807 }
// 5808 // *CIDO - BÖLÜM - 689 - AccessibilityAudit - Erişilebilirlik Denetimi - WCAG AA AAA - İhlal - Serde
// 5809 export interface AccessibilityAudit {
// 5810   url: string;
// 5811   standard: string;
// 5812   violations: AccessibilityViolation[];
// 5813   score: number;
// 5814 }
// 5815 // *CIDO - BÖLÜM - 690 - AccessibilityViolation - Erişilebilirlik İhlali - Kural Kimliği - Öğe - Serde
// 5816 export interface AccessibilityViolation {
// 5817   rule_id: string;
// 5818   impact: string;
// 5819   element: string;
// 5820   description: string;
// 5821 }
// 5822 // *CIDO - BÖLÜM - 691 - SEOAudit - SEO Denetimi - Meta Robots - Başlık - Serde
// 5823 export interface SEOAudit {
// 5824   url: string;
// 5825   score: number;
// 5826   issues: SEOIssue[];
// 5827 }
// 5828 // *CIDO - BÖLÜM - 692 - SEOIssue - SEO Sorunu - Önem Düzeyi - Öneri - Serde
// 5829 export interface SEOIssue {
// 5830   type: string;
// 5831   severity: string;
// 5832   description: string;
// 5833   recommendation: string;
// 5834 }
// 5835 // *CIDO - BÖLÜM - 693 - PageSpeedAudit - PageSpeed Denetimi - FCP LCP CLS - Skor - Serde
// 5836 export interface PageSpeedAudit {
// 5837   url: string;
// 5838   fcp_ms: number;
// 5839   lcp_ms: number;
// 5840   cls: number;
// 5841   tbt_ms: number;
// 5842   performance_score: number;
// 5843 }
// 5844 // *CIDO - BÖLÜM - 694 - CoreWebVital - Core Web Vital - Eşik - Geçti Uyarı Başarısız - Serde
// 5845 export interface CoreWebVital {
// 5846   name: string;
// 5847   value: number;
// 5848   threshold_good: number;
// 5849   threshold_poor: number;
// 5850   rating: string;
// 5851 }
// 5852 // *CIDO - BÖLÜM - 695 - RealUserMonitoring - Gerçek Kullanıcı İzleme - RUM - Ölçüm - Serde
// 5853 export interface RealUserMonitoring {
// 5854   url: string;
// 5855   p50_ms: number;
// 5856   p75_ms: number;
// 5857   p95_ms: number;
// 5858   sample_size: number;
// 5859 }
// 5860 // *CIDO - BÖLÜM - 696 - SyntheticMonitoring - Sentetik İzleme - Düzenli Kontrol - Lokasyon - Serde
// 5861 export interface SyntheticMonitoring {
// 5862   check_id: string;
// 5863   url: string;
// 5864   interval_minutes: number;
// 5865   locations: string[];
// 5866   status: string;
// 5867   last_result: SyntheticResult;
// 5868 }
// 5869 // *CIDO - BÖLÜM - 697 - SyntheticResult - Sentetik Sonuç - Yanıt Süresi - Durum Kodu - Serde
// 5870 export interface SyntheticResult {
// 5871   timestamp: number;
// 5872   response_time_ms: number;
// 5873   status_code: number;
// 5874   success: boolean;
// 5875 }
// 5876 // *CIDO - BÖLÜM - 698 - UptimeMonitor - Çalışma Süresi - Başarı Oranı - Kesinti - Serde
// 5877 export interface UptimeMonitor {
// 5878   check_id: string;
// 5879   uptime_percent_30d: number;
// 5880   total_outages_30d: number;
// 5881   avg_response_ms_30d: number;
// 5882 }
// 5883 // *CIDO - BÖLÜM - 699 - IncidentAlert - Olay Uyarısı - Kesinti Başladı - Bitti - Serde
// 5884 export interface IncidentAlert {
// 5885   id: string;
// 5886   monitor_id: string;
// 5887   status: string;
// 5888   started_at: number;
// 5889   resolved_at?: number;
// 5890 }
// 5891 // *CIDO - BÖLÜM - 700 - DowntimeRecord - Kesinti Kaydı - Süre - Etkilenen Bölge - Serde
// 5892 export interface DowntimeRecord {
// 5893   id: string;
// 5894   start: number;
// 5895   end?: number;
// 5896   duration_seconds: number;
// 5897   affected_regions: string[];
// 5898 }
// 5899 // *CIDO - BÖLÜM - 701 - PerformanceRegression - Performans Gerilemesi - Önceki Sonraki - Fark - Serde
// 5900 export interface PerformanceRegression {
// 5901   metric: string;
// 5902   previous_value: number;
// 5903   current_value: number;
// 5904   change_percent: number;
// 5905   regression: boolean;
// 5906 }
// 5907 // *CIDO - BÖLÜM - 702 - CapacityReport - Kapasite Raporu - Tepe Kullanım - Yüzde - Serde
// 5908 export interface CapacityReport {
// 5909   resource: string;
// 5910   peak_usage: number;
// 5911   limit: number;
// 5912   utilization_percent: number;
// 5913   timestamp: number;
// 5914 }
// 5915 // *CIDO - BÖLÜM - 703 - PredictionModel - Tahmin Modeli - Prophet - ARIMA - Serde
// 5916 export interface PredictionModel {
// 5917   name: string;
// 5918   algorithm: string;
// 5919   accuracy_mape: number;
// 5920   forecast_horizon_days: number;
// 5921 }
// 5922 // *CIDO - BÖLÜM - 704 - ForecastResult - Tahmin Sonucu - Tarih Değer - Alt Üst Sınır - Serde
// 5923 export interface ForecastResult {
// 5924   date: string;
// 5925   predicted: number;
// 5926   lower_bound: number;
// 5927   upper_bound: number;
// 5928 }
// 5929 // *CIDO - BÖLÜM - 705 - AnomalyDetection - Anomali Tespiti - Mevsimsellik - Artık - Serde
// 5930 export interface AnomalyDetection {
// 5931   timestamp: number;
// 5932   actual: number;
// 5933   expected: number;
// 5934   residual: number;
// 5935   is_anomaly: boolean;
// 5936 }
// 5937 // *CIDO - BÖLÜM - 706 - SeasonalDecomposition - Mevsimsel Ayrıştırma - Trend Mevsim Artık - Serde
// 5938 export interface SeasonalDecomposition {
// 5939   trend: number[];
// 5940   seasonal: number[];
// 5941   residual: number[];
// 5942   period: number;
// 5943 }
// 5944 // *CIDO - BÖLÜM - 707 - TrendAnalysis - Trend Analizi - Yön Eğim - R Kare - Serde
// 5945 export interface TrendAnalysis {
// 5946   slope: number;
// 5947   intercept: number;
// 5948   r_squared: number;
// 5949   direction: string;
// 5950 }
// 5951 // *CIDO - BÖLÜM - 708 - CorrelationMatrix - Korelasyon Matrisi - Değişken Çifti - Pearson - Serde
// 5952 export interface CorrelationMatrix {
// 5953   variables: string[];
// 5954   matrix: number[][];
// 5955 }
// 5956 // *CIDO - BÖLÜM - 709 - HistogramBucket - Histogram Kovası - Aralık Frekans - Yoğunluk - Serde
// 5957 export interface HistogramBucket {
// 5958   min: number;
// 5959   max: number;
// 5960   count: number;
// 5961   density: number;
// 5962 }
// 5963 // *CIDO - BÖLÜM - 710 - PercentileDistribution - Yüzdelik Dağılım - p50 p90 p99 - Serde
// 5964 export interface PercentileDistribution {
// 5965   metric: string;
// 5966   p50: number;
// 5967   p75: number;
// 5968   p90: number;
// 5969   p95: number;
// 5970   p99: number;
// 5971 }
// 5972 // *CIDO - BÖLÜM - 711 - ConfidenceInterval - Güven Aralığı - Düşük Yüksek - Seviye - Serde
// 5973 export interface ConfidenceInterval {
// 5974   lower: number;
// 5975   upper: number;
// 5976   level: number;
// 5977   mean: number;
// 5978 }
// 5979 // *CIDO - BÖLÜM - 712 - HypothesisTest - Hipotez Testi - p-değeri - İstatistik - Serde
// 5980 export interface HypothesisTest {
// 5981   test_name: string;
// 5982   statistic: number;
// 5983   p_value: number;
// 5984   significant: boolean;
// 5985 }
// 5986 // *CIDO - BÖLÜM - 713 - ABTestResult - A/B Testi Sonucu - Kazanan - Güven - Serde
// 5987 export interface ABTestResult {
// 5988   experiment_id: string;
// 5989   winner_variant_id: string;
// 5990   confidence: number;
// 5991   improvement_percent: number;
// 5992   recommendation: string;
// 5993 }
// 5994 // *CIDO - BÖLÜM - 714 - BayesianAnalysis - Bayesci Analiz - Önceki Sonsal - Dağılım - Serde
// 5995 export interface BayesianAnalysis {
// 5996   prior_mean: number;
// 5997   posterior_mean: number;
// 5998   credible_interval_lower: number;
// 5999   credible_interval_upper: number;
// 6000 }
// 6001 // *CIDO - BÖLÜM - 715 - MonteCarloSimulation - Monte Carlo - İterasyon - Özet İstatistik - Serde
// 6002 export interface MonteCarloSimulation {
// 6003   iterations: number;
// 6004   mean: number;
// 6005   std_dev: number;
// 6006   percentiles: PercentileDistribution;
// 6007 }
// 6008 // *CIDO - BÖLÜM - 716 - BootstrapSample - Bootstrap Örneklemi - Yeniden Örnekleme - Tekrar - Serde
// 6009 export interface BootstrapSample {
// 6010   sample_size: number;
// 6011   resamples: number;
// 6012   statistic_values: number[];
// 6013 }
// 6014 // *CIDO - BÖLÜM - 717 - FeatureImportance - Özellik Önemi - Model - SHAP Değeri - Serde
// 6015 export interface FeatureImportance {
// 6016   feature: string;
// 6017   importance: number;
// 6018   shap_value: number;
// 6019 }
// 6020 // *CIDO - BÖLÜM - 718 - ModelMetrics - Model Metrikleri - Doğruluk Kesinlik - F1 AUC - Serde
// 6021 export interface ModelMetrics {
// 6022   accuracy: number;
// 6023   precision: number;
// 6024   recall: number;
// 6025   f1_score: number;
// 6026   auc_roc: number;
// 6027 }
// 6028 // *CIDO - BÖLÜM - 719 - ConfusionMatrix - Karmaşıklık Matrisi - TP FP TN FN - Serde
// 6029 export interface ConfusionMatrix {
// 6030   true_positive: number;
// 6031   false_positive: number;
// 6032   true_negative: number;
// 6033   false_negative: number;
// 6034 }
// 6035 // *CIDO - BÖLÜM - 720 - ROCCurve - ROC Eğrisi - FPR TPR - Eşik - Serde
// 6036 export interface ROCCurve {
// 6037   fpr: number[];
// 6038   tpr: number[];
// 6039   thresholds: number[];
// 6040   auc: number;
// 6041 }
// 6042 // *CIDO - BÖLÜM - 721 - PRCurve - PR Eğrisi - Hassasiyet Duyarlılık - Eşik - Serde
// 6043 export interface PRCurve {
// 6044   precision: number[];
// 6045   recall: number[];
// 6046   thresholds: number[];
// 6047   average_precision: number;
// 6048 }
// 6049 // *CIDO - BÖLÜM - 722 - CalibrationCurve - Kalibrasyon Eğrisi - Tahmin Gerçek - Güvenilirlik - Serde
// 6050 export interface CalibrationCurve {
// 6051   predicted_prob: number[];
// 6052   actual_fraction: number[];
// 6053   brier_score: number;
// 6054 }
// 6055 // *CIDO - BÖLÜM - 723 - LiftChart - Lift Grafiği - Kümülatif Kazanç - Model Fayda - Serde
// 6056 export interface LiftChart {
// 6057   population_percent: number[];
// 6058   lift: number[];
// 6059   cumulative_gain: number[];
// 6060 }
// 6061 // *CIDO - BÖLÜM - 724 - LearningCurve - Öğrenme Eğrisi - Eğitim Boyutu - Skor - Serde
// 6062 export interface LearningCurve {
// 6063   train_sizes: number[];
// 6064   train_scores: number[];
// 6065   validation_scores: number[];
// 6066 }
// 6067 // *CIDO - BÖLÜM - 725 - HyperparameterTuning - Hiperparametre Ayarı - Grid Random - En İyi - Serde
// 6068 export interface HyperparameterTuning {
// 6069   method: string;
// 6070   best_params: Record<string, unknown>;
// 6071   best_score: number;
// 6072   trials: number;
// 6073 }
// 6074 // *CIDO - BÖLÜM - 726 - CrossValidation - Çapraz Doğrulama - Katlama - Ortalama Std - Serde
// 6075 export interface CrossValidation {
// 6076   folds: number;
// 6077   scores: number[];
// 6078   mean_score: number;
// 6079   std_score: number;
// 6080 }
// 6081 // *CIDO - BÖLÜM - 727 - TrainTestSplit - Eğitim Test Bölme - Oran - Karıştırma - Serde
// 6082 export interface TrainTestSplit {
// 6083   train_size: number;
// 6084   test_size: number;
// 6085   random_seed: number;
// 6086   stratified: boolean;
// 6087 }
// 6088 // *CIDO - BÖLÜM - 728 - DataAugmentation - Veri Artırma - Döndürme Kırpma - Gürültü - Serde
// 6089 export interface DataAugmentation {
// 6090   technique: string;
// 6091   original_count: number;
// 6092   augmented_count: number;
// 6093   parameters: Record<string, unknown>;
// 6094 }
// 6095 // *CIDO - BÖLÜM - 729 - NormalizationConfig - Normalizasyon - MinMax ZScore - Ortalama Std - Serde
// 6096 export interface NormalizationConfig {
// 6097   method: string;
// 6098   mean?: number;
// 6099   std?: number;
// 6100   min?: number;
// 6101   max?: number;
// 6102 }
// 6103 // *CIDO - BÖLÜM - 730 - OutlierDetection - Aykırı Değer Tespiti - IQR Z-Skoru - İzolasyon - Serde
// 6104 export interface OutlierDetection {
// 6105   method: string;
// 6106   threshold: number;
// 6107   outlier_count: number;
// 6108   outlier_indices: number[];
// 6109 }
// 6110 // *CIDO - BÖLÜM - 731 - MissingValueImputation - Eksik Değer - Ortalama Medyan - Doldurma - Serde
// 6111 export interface MissingValueImputation {
// 6112   column: string;
// 6113   method: string;
// 6114   missing_count: number;
// 6115   fill_value: number | string;
// 6116 }
// 6117 // *CIDO - BÖLÜM - 732 - FeatureEngineering - Özellik Mühendisliği - Polinom Etkileşim - Dönüşüm - Serde
// 6118 export interface FeatureEngineering {
// 6119   original_features: number;
// 6120   engineered_features: number;
// 6121   operations: string[];
// 6122 }
// 6123 // *CIDO - BÖLÜM - 733 - DimensionalityReduction - Boyut Azaltma - PCA t-SNE - Bileşen - Serde
// 6124 export interface DimensionalityReduction {
// 6125   method: string;
// 6126   original_dimensions: number;
// 6127   reduced_dimensions: number;
// 6128   explained_variance_ratio: number[];
// 6129 }
// 6130 // *CIDO - BÖLÜM - 734 - ClusterAnalysis - Kümeleme Analizi - KMeans DBSCAN - Etiket - Serde
// 6131 export interface ClusterAnalysis {
// 6132   algorithm: string;
// 6133   n_clusters: number;
// 6134   labels: number[];
// 6135   silhouette_score: number;
// 6136 }
// 6137 // *CIDO - BÖLÜM - 735 - TextPreprocessing - Metin Ön İşleme - Tokenizasyon - Stemming - Serde
// 6138 export interface TextPreprocessing {
// 6139   steps: string[];
// 6140   original_length: number;
// 6141   processed_length: number;
// 6142 }
// 6143 // *CIDO - BÖLÜM - 736 - TokenizationResult - Tokenizasyon - Kelime Sayısı - Benzersiz - Serde
// 6144 export interface TokenizationResult {
// 6145   tokens: string[];
// 6146   token_count: number;
// 6147   unique_tokens: number;
// 6148 }
// 6149 // *CIDO - BÖLÜM - 737 - VocabularyConfig - Kelime Haznesi - Maks Boyut - Bilinmeyen - Serde
// 6150 export interface VocabularyConfig {
// 6151   max_size: number;
// 6152   min_frequency: number;
// 6153   unk_token: string;
// 6154   pad_token: string;
// 6155 }
// 6156 // *CIDO - BÖLÜM - 738 - EmbeddingConfig - Gömme Konfigürasyonu - Boyut - Model Adı - Serde
// 6157 export interface EmbeddingConfig {
// 6158   model_name: string;
// 6159   dimensions: number;
// 6160   pooling_strategy: string;
// 6161   normalize: boolean;
// 6162 }
// 6163 // *CIDO - BÖLÜM - 739 - VectorIndexConfig - Vektör İndeks - HNSW IVF - Parametre - Serde
// 6164 export interface VectorIndexConfig {
// 6165   index_type: string;
// 6166   metric: string;
// 6167   ef_construction: number;
// 6168   m: number;
// 6169 }
// 6170 // *CIDO - BÖLÜM - 740 - QueryExpansion - Sorgu Genişletme - Eş Anlamlı - Yeniden İfade - Serde
// 6171 export interface QueryExpansion {
// 6172   original_query: string;
// 6173   expanded_queries: string[];
// 6174   method: string;
// 6175 }
// 6176 // *CIDO - BÖLÜM - 741 - SemanticSearchResult - Anlamsal Arama - Pasaj Skor - Vurgu - Serde
// 6177 export interface SemanticSearchResult {
// 6178   passage: string;
// 6179   score: number;
// 6180   highlights: string[];
// 6181   document_id: string;
// 6182 }
// 6183 // *CIDO - BÖLÜM - 742 - RerankerConfig - Yeniden Sıralama - Cross-Encoder - Model - Serde
// 6184 export interface RerankerConfig {
// 6185   model: string;
// 6186   top_k: number;
// 6187   batch_size: number;
// 6188 }
// 6189 // *CIDO - BÖLÜM - 743 - RerankerResult - Yeniden Sıralama Sonucu - Orijinal Skor - Yeni Skor - Serde
// 6190 export interface RerankerResult {
// 6191   index: number;
// 6192   original_score: number;
// 6193   reranked_score: number;
// 6194   improved: boolean;
// 6195 }
// 6196 // *CIDO - BÖLÜM - 744 - HybridSearchConfig - Hibrit Arama - Seyrek Yoğun - Ağırlık - Serde
// 6197 export interface HybridSearchConfig {
// 6198   sparse_weight: number;
// 6199   dense_weight: number;
// 6200   fusion_method: string;
// 6201 }
// 6202 // *CIDO - BÖLÜM - 745 - FusionResult - Füzyon Sonucu - RRF - Birleştirilmiş Skor - Serde
// 6203 export interface FusionResult {
// 6204   document_id: string;
// 6205   sparse_score: number;
// 6206   dense_score: number;
// 6207   fused_score: number;
// 6208   rank: number;
// 6209 }
// 6210 // *CIDO - BÖLÜM - 746 - FilterExpression - Filtre İfadesi - Alan Operatör - Değer - Serde
// 6211 export interface FilterExpression {
// 6212   field: string;
// 6213   operator: string;
// 6214   value: string | number | boolean;
// 6215 }
// 6216 // *CIDO - BÖLÜM - 747 - FacetConfig - Faset Konfigürasyonu - Alan Boyut - Sıralama - Serde
// 6217 export interface FacetConfig {
// 6218   field: string;
// 6219   size: number;
// 6220   sort_by: string;
// 6221 }
// 6222 // *CIDO - BÖLÜM - 748 - FacetResult - Faset Sonucu - Değer Sayı - Seçili - Serde
// 6223 export interface FacetResult {
// 6224   field: string;
// 6225   values: FacetValue[];
// 6226 }
// 6227 // *CIDO - BÖLÜM - 749 - FacetValue - Faset Değeri - Etiket Sayım - Etkin - Serde
// 6228 export interface FacetValue {
// 6229   value: string;
// 6230   count: number;
// 6231   selected: boolean;
// 6232 }
// 6233 // *CIDO - BÖLÜM - 750 - SpellCheckResult - Yazım Denetimi - Öneri - Düzeltilmiş Sorgu - Serde
// 6234 export interface SpellCheckResult {
// 6235   original: string;
// 6236   corrected: string;
// 6237   suggestions: string[];
// 6238   correction_applied: boolean;
// 6239 }
// 6240 // *CIDO - BÖLÜM - 751 - AutocompleteSuggestion - Otomatik Tamamlama - Metin Skor - Popülerlik - Serde
// 6241 export interface AutocompleteSuggestion {
// 6242   text: string;
// 6243   score: number;
// 6244   popularity: number;
// 6245 }
// 6246 // *CIDO - BÖLÜM - 752 - SynonymsConfig - Eş Anlamlılar - Grup - Genişletme - Serde
// 6247 export interface SynonymsConfig {
// 6248   groups: SynonymGroup[];
// 6249   bidirectional: boolean;
// 6250 }
// 6251 // *CIDO - BÖLÜM - 753 - SynonymGroup - Eş Anlamlı Grup - Terimler - Ağırlık - Serde
// 6252 export interface SynonymGroup {
// 6253   terms: string[];
// 6254   weight: number;
// 6255 }
// 6256 // *CIDO - BÖLÜM - 754 - StemmingConfig - Kök Bulma - Dil - Agresif Hafif - Serde
// 6257 export interface StemmingConfig {
// 6258   language: string;
// 6259   aggressiveness: string;
// 6260 }
// 6261 // *CIDO - BÖLÜM - 755 - StopWordsConfig - Dolgu Sözcükleri - Dil - Özel Liste - Serde
// 6262 export interface StopWordsConfig {
// 6263   language: string;
// 6264   custom_stop_words: string[];
// 6265   remove_stop_words: boolean;
// 6266 }
// 6267 // *CIDO - BÖLÜM - 756 - TokenFilter - Token Filtresi - Küçük Harf - ASCII Katlama - Serde
// 6268 export interface TokenFilter {
// 6269   type: string;
// 6270   options: Record<string, unknown>;
// 6271 }
// 6272 // *CIDO - BÖLÜM - 757 - AnalyzerConfig - Analizör - Char Filtresi - Tokenizer - Serde
// 6273 export interface AnalyzerConfig {
// 6274   name: string;
// 6275   char_filters: string[];
// 6276   tokenizer: string;
// 6277   token_filters: string[];
// 6278 }
// 6279 // *CIDO - BÖLÜM - 758 - IndexMapping - İndeks Eşleme - Alan Tipi - Analizör - Serde
// 6280 export interface IndexMapping {
// 6281   properties: Record<string, FieldMapping>;
// 6282   dynamic: boolean;
// 6283 }
// 6284 // *CIDO - BÖLÜM - 759 - FieldMapping - Alan Eşleme - Tip - İndekslenmiş - Serde
// 6285 export interface FieldMapping {
// 6286   type: string;
// 6287   indexed: boolean;
// 6288   stored: boolean;
// 6289 }
// 6290 // *CIDO - BÖLÜM - 760 - SearchTemplate - Arama Şablonu - Mustache - Parametre - Serde
// 6291 export interface SearchTemplate {
// 6292   id: string;
// 6293   template: string;
// 6294   parameters: Record<string, unknown>;
// 6295 }
// 6296 // *CIDO - BÖLÜM - 761 - SearchAnalytics - Arama Analitiği - Sıfır Sonuç - Tıklama Oranı - Serde
// 6297 export interface SearchAnalytics {
// 6298   query: string;
// 6299   search_count: number;
// 6300   zero_results_count: number;
// 6301   click_through_rate: number;
// 6302   avg_position_clicked: number;
// 6303 }
// 6304 // *CIDO - BÖLÜM - 762 - ClickTracking - Tıklama Takibi - Sorgu Kimliği - Pozisyon - Serde
// 6305 export interface ClickTracking {
// 6306   search_id: string;
// 6307   document_id: string;
// 6308   position: number;
// 6309   clicked: boolean;
// 6310   timestamp: number;
// 6311 }
// 6312 // *CIDO - BÖLÜM - 763 - PersonalizationWeights - Kişiselleştirme - Kullanıcı Vektörü - İlgi - Serde
// 6313 export interface PersonalizationWeights {
// 6314   user_id: string;
// 6315   category_weights: Record<string, number>;
// 6316   brand_affinity: Record<string, number>;
// 6317   price_sensitivity: number;
// 6318 }
// 6319 // *CIDO - BÖLÜM - 764 - DiversityConfig - Çeşitlilik - MMR - Lambda - Serde
// 6320 export interface DiversityConfig {
// 6321   enabled: boolean;
// 6322   lambda: number;
// 6323   attribute: string;
// 6324 }
// 6325 // *CIDO - BÖLÜM - 765 - GeoBoostConfig - Coğrafi Yükseltme - Mesafe - Azaltma Faktörü - Serde
// 6326 export interface GeoBoostConfig {
// 6327   field: string;
// 6328   origin_lat: number;
// 6329   origin_lon: number;
// 6330   decay_factor: number;
// 6331 }
// 6332 // *CIDO - BÖLÜM - 766 - RecencyBoost - Güncellik Yükseltme - Tarih Alanı - Ağırlık - Serde
// 6333 export interface RecencyBoost {
// 6334   field: string;
// 6335   weight: number;
// 6336   half_life_days: number;
// 6337 }
// 6338 // *CIDO - BÖLÜM - 767 - PopularityBoost - Popülerlik Yükseltme - Görüntülenme Satış - Ağırlık - Serde
// 6339 export interface PopularityBoost {
// 6340   field: string;
// 6341   weight: number;
// 6342   normalize: boolean;
// 6343 }
// 6344 // *CIDO - BÖLÜM - 768 - MerchandisingRule - Mağazacılık Kuralı - Yükselt Göm - Sabitle - Serde
// 6345 export interface MerchandisingRule {
// 6346   id: string;
// 6347   type: string;
// 6348   query_condition: string;
// 6349   product_ids: string[];
// 6350   boost_value: number;
// 6351 }
// 6352 // *CIDO - BÖLÜM - 769 - PinnedProduct - Sabitlenmiş Ürün - Pozisyon - Süre - Serde
// 6353 export interface PinnedProduct {
// 6354   product_id: string;
// 6355   position: number;
// 6356   starts_at: number;
// 6357   ends_at: number;
// 6358 }
// 6359 // *CIDO - BÖLÜM - 770 - BuriedProduct - Gömülmüş Ürün - Aşağı İtme - Geçici - Serde
// 6360 export interface BuriedProduct {
// 6361   product_id: string;
// 6362   bury_depth: number;
// 6363   reason: string;
// 6364 }
// 6365 // *CIDO - BÖLÜM - 771 - ExclusionRule - Hariç Tutma Kuralı - Sorgu Koşulu - Ürünler - Serde
// 6366 export interface ExclusionRule {
// 6367   condition: string;
// 6368   product_ids: string[];
// 6369 }
// 6370 // *CIDO - BÖLÜM - 772 - RankingDebugInfo - Sıralama Hata Ayıklama - Puan Açıklaması - Detay - Serde
// 6371 export interface RankingDebugInfo {
// 6372   document_id: string;
// 6373   final_score: number;
// 6374   score_breakdown: Record<string, number>;
// 6375 }
// 6376 // *CIDO - BÖLÜM - 773 - SearchQualityMetrics - Arama Kalitesi - NDCG MRR - MAP - Serde
// 6377 export interface SearchQualityMetrics {
// 6378   ndcg_at_10: number;
// 6379   mrr: number;
// 6380   map: number;
// 6381   precision_at_10: number;
// 6382   recall_at_10: number;
// 6383 }
// 6384 // *CIDO - BÖLÜM - 774 - JudgementList - Yargı Listesi - Sorgu Belge - İlgililik - Serde
// 6385 export interface JudgementList {
// 6386   query: string;
// 6387   document_id: string;
// 6388   relevance: number;
// 6389 }
// 6390 // *CIDO - BÖLÜM - 775 - ABSearchTest - A/B Arama Testi - Kontrol Varyantı - Metrik - Serde
// 6391 export interface ABSearchTest {
// 6392   id: string;
// 6393   control_config: string;
// 6394   variant_config: string;
// 6395   traffic_split: number;
// 6396   metric: string;
// 6397 }
// 6398 // *CIDO - BÖLÜM - 776 - SearchIndexStats - Arama İndeksi İstatistikleri - Belge Sayısı - Boyut - Serde
// 6399 export interface SearchIndexStats {
// 6400   index_name: string;
// 6401   document_count: number;
// 6402   size_bytes: number;
// 6403   last_updated: number;
// 6404 }
// 6405 // *CIDO - BÖLÜM - 777 - IndexRebuildJob - İndeks Yeniden İnşa - Durum - İlerleme - Serde
// 6406 export interface IndexRebuildJob {
// 6407   id: string;
// 6408   index_name: string;
// 6409   status: string;
// 6410   progress_percent: number;
// 6411   started_at: number;
// 6412   completed_at?: number;
// 6413 }
// 6414 // *CIDO - BÖLÜM - 778 - ShardConfig - Parça Konfigürasyonu - Sayı - Çoğaltma - Serde
// 6415 export interface ShardConfig {
// 6416   number_of_shards: number;
// 6417   number_of_replicas: number;
// 6418   routing_field: string;
// 6419 }
// 6420 // *CIDO - BÖLÜM - 779 - NodeInfo - Düğüm Bilgisi - Rol - Disk Kullanımı - Serde
// 6421 export interface NodeInfo {
// 6422   node_id: string;
// 6423   roles: string[];
// 6424   disk_used_percent: number;
// 6425   heap_used_percent: number;
// 6426 }
// 6427 // *CIDO - BÖLÜM - 780 - ClusterHealth - Küme Sağlığı - Durum - Düğüm Sayısı - Serde
// 6428 export interface ClusterHealth {
// 6429   cluster_name: string;
// 6430   status: string;
// 6431   number_of_nodes: number;
// 6432   active_shards: number;
// 6433   unassigned_shards: number;
// 6434 }
// 6435 // *CIDO - BÖLÜM - 781 - TaskInfo - Görev Bilgisi - Açıklama - Süre - Serde
// 6436 export interface TaskInfo {
// 6437   task_id: string;
// 6438   action: string;
// 6439   description: string;
// 6440   running_time_ms: number;
// 6441 }
// 6442 // *CIDO - BÖLÜM - 782 - SnapshotPolicy - Anlık Görüntü Politikası - Program - Saklama - Serde
// 6443 export interface SnapshotPolicy {
// 6444   schedule: string;
// 6445   retention_days: number;
// 6446   repository: string;
// 6447 }
// 6448 // *CIDO - BÖLÜM - 783 - SnapshotInfo - Anlık Görüntü Bilgisi - İsim Durum - Boyut - Serde
// 6449 export interface SnapshotInfo {
// 6450   snapshot: string;
// 6451   status: string;
// 6452   size_bytes: number;
// 6453   started_at: number;
// 6454   ended_at?: number;
// 6455 }
// 6456 // *CIDO - BÖLÜM - 784 - RestoreStatus - Geri Yükleme Durumu - Anlık Görüntü - İlerleme - Serde
// 6457 export interface RestoreStatus {
// 6458   snapshot: string;
// 6459   status: string;
// 6460   progress_percent: number;
// 6461   started_at: number;
// 6462 }
// 6463 // *CIDO - BÖLÜM - 785 - AliasConfig - Takma Ad - İndeks Adı - Filtre - Serde
// 6464 export interface AliasConfig {
// 6465   alias: string;
// 6466   index: string;
// 6467   filter: string;
// 6468 }
// 6469 // *CIDO - BÖLÜM - 786 - PipelineConfig - Pipeline - İşlemci Listesi - Hata Yönetimi - Serde
// 6470 export interface PipelineConfig {
// 6471   name: string;
// 6472   processors: PipelineProcessor[];
// 6473   on_failure: PipelineProcessor[];
// 6474 }
// 6475 // *CIDO - BÖLÜM - 787 - PipelineProcessor - İşlemci - Tip Konfig - Koşul - Serde
// 6476 export interface PipelineProcessor {
// 6477   type: string;
// 6478   config: Record<string, unknown>;
// 6479   condition?: string;
// 6480 }
// 6481 // *CIDO - BÖLÜM - 788 - EnrichPolicy - Zenginleştirme Politikası - Eşleşme Alanı - Kaynak İndeks - Serde
// 6482 export interface EnrichPolicy {
// 6483   name: string;
// 6484   match_field: string;
// 6485   enrich_fields: string[];
// 6486   source_index: string;
// 6487 }
// 6488 // *CIDO - BÖLÜM - 789 - DataStreamConfig - Veri Akışı - Zaman Serisi - Şablon - Serde
// 6489 export interface DataStreamConfig {
// 6490   name: string;
// 6491   template: string;
// 6492   timestamp_field: string;
// 6493 }
// 6494 // *CIDO - BÖLÜM - 790 - ILMPolicy - ILM Politikası - Sıcak Ilık Soğuk - Sil - Serde
// 6495 export interface ILMPolicy {
// 6496   name: string;
// 6497   phases: ILMPhase[];
// 6498 }
// 6499 // *CIDO - BÖLÜM - 791 - ILMPhase - ILM Aşaması - Eylemler - Minimum Yaş - Serde
// 6500 export interface ILMPhase {
// 6501   name: string;
// 6502   min_age_days: number;
// 6503   actions: string[];
// 6504 }
// 6505 // *CIDO - BÖLÜM - 792 - SLMPolicy - SLM Politikası - Anlık Görüntü Yaşam Döngüsü - Serde
// 6506 export interface SLMPolicy {
// 6507   name: string;
// 6508   schedule: string;
// 6509   repository: string;
// 6510 }
// 6511 // *CIDO - BÖLÜM - 793 - RollupJob - Toplama İşi - Grup Alanı - Metrik - Serde
// 6512 export interface RollupJob {
// 6513   id: string;
// 6514   index_pattern: string;
// 6515   rollup_index: string;
// 6516   group_fields: string[];
// 6517   metrics: string[];
// 6518 }
// 6519 // *CIDO - BÖLÜM - 794 - TransformJob - Dönüştürme İşi - Pivot - Sürekli - Serde
// 6520 export interface TransformJob {
// 6521   id: string;
// 6522   source_index: string;
// 6523   dest_index: string;
// 6524   pivot: Record<string, unknown>;
// 6525 }
// 6526 // *CIDO - BÖLÜM - 795 - WatcherConfig - İzleyici - Tetikleyici - Eylem - Serde
// 6527 export interface WatcherConfig {
// 6528   id: string;
// 6529   trigger: string;
// 6530   input: Record<string, unknown>;
// 6531   condition: string;
// 6532   actions: WatcherAction[];
// 6533 }
// 6534 // *CIDO - BÖLÜM - 796 - WatcherAction - İzleyici Eylemi - Tip - Hedef - Serde
// 6535 export interface WatcherAction {
// 6536   type: string;
// 6537   target: string;
// 6538   message: string;
// 6539 }
// 6540 // *CIDO - BÖLÜM - 797 - AlertDestination - Uyarı Hedefi - Slack E-posta - Webhook - Serde
// 6541 export interface AlertDestination {
// 6542   type: string;
// 6543   name: string;
// 6544   config: Record<string, unknown>;
// 6545 }
// 6546 // *CIDO - BÖLÜM - 798 - MonitorConfig - İzleyici Konfigürasyonu - Sorgu - Frekans - Serde
// 6547 export interface MonitorConfig {
// 6548   name: string;
// 6549   query: string;
// 6550   frequency_minutes: number;
// 6551   throttle_minutes: number;
// 6552 }
// 6553 // *CIDO - BÖLÜM - 799 - MonitorResult - İzleyici Sonucu - Tetiklendi - Hata - Serde
// 6554 export interface MonitorResult {
// 6555   monitor_name: string;
// 6556   triggered: boolean;
// 6557   error_message?: string;
// 6558   timestamp: number;
// 6559 }
// 6560 // *CIDO - BÖLÜM - 800 - AnomalyDetectorConfig - Anomali Dedektörü - Özellik - Model - Serde
// 6561 export interface AnomalyDetectorConfig {
// 6562   detector_id: string;
// 6563   feature: string;
// 6564   model: string;
// 6565   sensitivity: string;
// 6566 }
// 6567 // *CIDO - BÖLÜM - 801 - AnomalyResult - Anomali Sonucu - Skor - Eşik Geçti - Serde
// 6568 export interface AnomalyResult {
// 6569   timestamp: number;
// 6570   actual: number;
// 6571   typical: number;
// 6572   anomaly_score: number;
// 6573   threshold: number;
// 6574   is_anomaly: boolean;
// 6575 }
// 6576 // *CIDO - BÖLÜM - 802 - ForecastConfig - Tahmin Konfigürasyonu - Süre - Sezonsallık - Serde
// 6577 export interface ForecastConfig {
// 6578   forecast_length_days: number;
// 6579   seasonality: string;
// 6580   confidence_level: number;
// 6581 }
// 6582 // *CIDO - BÖLÜM - 803 - ForecastData - Tahmin Verisi - Tarih Tahmin - Sınır - Serde
// 6583 export interface ForecastData {
// 6584   date: string;
// 6585   forecast: number;
// 6586   lower: number;
// 6587   upper: number;
// 6588 }
// 6589 // *CIDO - BÖLÜM - 804 - MovingAverageConfig - Hareketli Ortalama - Pencere Boyutu - Tip - Serde
// 6590 export interface MovingAverageConfig {
// 6591   window_size: number;
// 6592   type: string;
// 6593   centered: boolean;
// 6594 }
// 6595 // *CIDO - BÖLÜM - 805 - HoltWintersConfig - Holt-Winters - Alfa Beta Gama - Serde
// 6596 export interface HoltWintersConfig {
// 6597   alpha: number;
// 6598   beta: number;
// 6599   gamma: number;
// 6600   period: number;
// 6601 }
// 6602 // *CIDO - BÖLÜM - 806 - ExponentialSmoothing - Üstel Düzeltme - Alfa - Düzey - Serde
// 6603 export interface ExponentialSmoothing {
// 6604   alpha: number;
// 6605   level: number[];
// 6606   fitted: number[];
// 6607 }
// 6608 // *CIDO - BÖLÜM - 807 - ARIMAModel - ARIMA Modeli - p d q - Katsayılar - Serde
// 6609 export interface ARIMAModel {
// 6610   p: number;
// 6611   d: number;
// 6612   q: number;
// 6613   coefficients: number[];
// 6614   aic: number;
// 6615 }
// 6616 // *CIDO - BÖLÜM - 808 - SARIMAModel - SARIMA Modeli - Mevsimsellik - P D Q - Serde
// 6617 export interface SARIMAModel {
// 6618   order: [number, number, number];
// 6619   seasonal_order: [number, number, number, number];
// 6620   coefficients: number[];
// 6621   aic: number;
// 6622 }
// 6623 // *CIDO - BÖLÜM - 809 - ProphetModel - Prophet Modeli - Değişim Noktaları - Tatiller - Serde
// 6624 export interface ProphetModel {
// 6625   changepoints: number[];
// 6626   trend: number[];
// 6627   yearly_seasonality: boolean;
// 6628   weekly_seasonality: boolean;
// 6629 }
// 6630 // *CIDO - BÖLÜM - 810 - XGBoostModel - XGBoost Modeli - Ağaç Sayısı - Derinlik - Serde
// 6631 export interface XGBoostModel {
// 6632   n_estimators: number;
// 6633   max_depth: number;
// 6634   learning_rate: number;
// 6635   feature_importance: Record<string, number>;
// 6636 }
// 6637 // *CIDO - BÖLÜM - 811 - LightGBMModel - LightGBM Modeli - Yaprak Sayısı - Özellik Fraksiyon - Serde
// 6638 export interface LightGBMModel {
// 6639   num_leaves: number;
// 6640   feature_fraction: number;
// 6641   bagging_fraction: number;
// 6642   learning_rate: number;
// 6643 }
// 6644 // *CIDO - BÖLÜM - 812 - CatBoostModel - CatBoost Modeli - İterasyon - Derinlik - Serde
// 6645 export interface CatBoostModel {
// 6646   iterations: number;
// 6647   depth: number;
// 6648   learning_rate: number;
// 6649   l2_leaf_reg: number;
// 6650 }
// 6651 // *CIDO - BÖLÜM - 813 - RandomForestModel - Rastgele Orman - Ağaç Derinlik - Özellik - Serde
// 6652 export interface RandomForestModel {
// 6653   n_estimators: number;
// 6654   max_depth: number;
// 6655   max_features: string;
// 6656 }
// 6657 // *CIDO - BÖLÜM - 814 - SVMModel - SVM Modeli - Kernel - C Gamma - Serde
// 6658 export interface SVMModel {
// 6659   kernel: string;
// 6660   C: number;
// 6661   gamma: string;
// 6662   support_vectors: number;
// 6663 }
// 6664 // *CIDO - BÖLÜM - 815 - KNNModel - KNN Modeli - Komşu Sayısı - Ağırlık - Serde
// 6665 export interface KNNModel {
// 6666   n_neighbors: number;
// 6667   weights: string;
// 6668   metric: string;
// 6669 }
// 6670 // *CIDO - BÖLÜM - 816 - LogisticRegression - Lojistik Regresyon - C - Ceza - Serde
// 6671 export interface LogisticRegression {
// 6672   C: number;
// 6673   penalty: string;
// 6674   solver: string;
// 6675   coefficients: number[];
// 6676   intercept: number;
// 6677 }
// 6678 // *CIDO - BÖLÜM - 817 - LinearRegression - Doğrusal Regresyon - Katsayılar - R Kare - Serde
// 6679 export interface LinearRegression {
// 6680   coefficients: number[];
// 6681   intercept: number;
// 6682   r_squared: number;
// 6683   p_values: number[];
// 6684 }
// 6685 // *CIDO - BÖLÜM - 818 - LassoRegression - Lasso Regresyon - Alfa - Seyreklik - Serde
// 6686 export interface LassoRegression {
// 6687   alpha: number;
// 6688   coefficients: number[];
// 6689   intercept: number;
// 6690   non_zero_features: number;
// 6691 }
// 6692 // *CIDO - BÖLÜM - 819 - RidgeRegression - Ridge Regresyon - Alfa - Düzenlileştirme - Serde
// 6693 export interface RidgeRegression {
// 6694   alpha: number;
// 6695   coefficients: number[];
// 6696   intercept: number;
// 6697 }
// 6698 // *CIDO - BÖLÜM - 820 - ElasticNetModel - ElasticNet - l1_ratio - Alfa - Serde
// 6699 export interface ElasticNetModel {
// 6700   alpha: number;
// 6701   l1_ratio: number;
// 6702   coefficients: number[];
// 6703   intercept: number;
// 6704 }
// 6705 // *CIDO - BÖLÜM - 821 - DecisionTreeClassifier - Karar Ağacı - Derinlik - Bölünme - Serde
// 6706 export interface DecisionTreeClassifier {
// 6707   max_depth: number;
// 6708   criterion: string;
// 6709   min_samples_split: number;
// 6710   feature_importance: Record<string, number>;
// 6711 }
// 6712 // *CIDO - BÖLÜM - 822 - GradientBoostingModel - Gradyan Artırma - Öğrenme Oranı - Kayıp - Serde
// 6713 export interface GradientBoostingModel {
// 6714   learning_rate: number;
// 6715   n_estimators: number;
// 6716   max_depth: number;
// 6717   loss: string;
// 6718 }
// 6719 // *CIDO - BÖLÜM - 823 - AdaBoostModel - AdaBoost - Temel Tahminci - Algoritma - Serde
// 6720 export interface AdaBoostModel {
// 6721   n_estimators: number;
// 6722   learning_rate: number;
// 6723   algorithm: string;
// 6724 }
// 6725 // *CIDO - BÖLÜM - 824 - NaiveBayesModel - Naive Bayes - Tür - Öncelik - Serde
// 6726 export interface NaiveBayesModel {
// 6727   type: string;
// 6728   priors: number[];
// 6729   class_count: number;
// 6730 }
// 6731 // *CIDO - BÖLÜM - 825 - KMeansModel - K-Means - Küme Merkezleri - Atalet - Serde
// 6732 export interface KMeansModel {
// 6733   n_clusters: number;
// 6734   cluster_centers: number[][];
// 6735   inertia: number;
// 6736 }
// 6737 // *CIDO - BÖLÜM - 826 - DBSCANModel - DBSCAN - eps - Min Samples - Serde
// 6738 export interface DBSCANModel {
// 6739   eps: number;
// 6740   min_samples: number;
// 6741   core_sample_indices: number[];
// 6742   labels: number[];
// 6743 }
// 6744 // *CIDO - BÖLÜM - 827 - HierarchicalClustering - Hiyerarşik Kümeleme - Bağlantı - Mesafe - Serde
// 6745 export interface HierarchicalClustering {
// 6746   n_clusters: number;
// 6747   linkage: string;
// 6748   affinity: string;
// 6749   children: number[][];
// 6750 }
// 6751 // *CIDO - BÖLÜM - 828 - PCAModel - PCA - Bileşen Sayısı - Varyans - Serde
// 6752 export interface PCAModel {
// 6753   n_components: number;
// 6754   components: number[][];
// 6755   explained_variance_ratio: number[];
// 6756   mean: number[];
// 6757 }
// 6758 // *CIDO - BÖLÜM - 829 - TSENModel - t-SNE - Perplexity - İterasyon - Serde
// 6759 export interface TSENModel {
// 6760   n_components: number;
// 6761   perplexity: number;
// 6762   n_iter: number;
// 6763   kl_divergence: number;
// 6764 }
// 6765 // *CIDO - BÖLÜM - 830 - AutoencoderModel - Otokodlayıcı - Gizli Boyut - Katmanlar - Serde
// 6766 export interface AutoencoderModel {
// 6767   latent_dim: number;
// 6768   encoder_layers: number[];
// 6769   decoder_layers: number[];
// 6770   reconstruction_error: number;
// 6771 }
// 6772 // *CIDO - BÖLÜM - 831 - NeuralNetworkLayer - Sinir Ağı Katmanı - Birim Sayısı - Aktivasyon - Serde
// 6773 export interface NeuralNetworkLayer {
// 6774   units: number;
// 6775   activation: string;
// 6776   dropout: number;
// 6777 }
// 6778 // *CIDO - BÖLÜM - 832 - NeuralNetworkConfig - Sinir Ağı - Katmanlar - Optimizer - Serde
// 6779 export interface NeuralNetworkConfig {
// 6780   layers: NeuralNetworkLayer[];
// 6781   optimizer: string;
// 6782   loss: string;
// 6783   metrics: string[];
// 6784   batch_size: number;
// 6785   epochs: number;
// 6786 }
// 6787 // *CIDO - BÖLÜM - 833 - CNNConfig - CNN Konfigürasyonu - Evrişim Havuz - Tam Bağlı - Serde
// 6788 export interface CNNConfig {
// 6789   conv_layers: ConvLayer[];
// 6790   pool_layers: PoolLayer[];
// 6791   dense_layers: number[];
// 6792   input_shape: [number, number, number];
// 6793 }
// 6794 // *CIDO - BÖLÜM - 834 - ConvLayer - Evrişim Katmanı - Filtre Kernel - Adım - Serde
// 6795 export interface ConvLayer {
// 6796   filters: number;
// 6797   kernel_size: number;
// 6798   stride: number;
// 6799   padding: string;
// 6800   activation: string;
// 6801 }
// 6802 // *CIDO - BÖLÜM - 835 - PoolLayer - Havuz Katmanı - Tip Boyut - Adım - Serde
// 6803 export interface PoolLayer {
// 6804   type: string;
// 6805   pool_size: number;
// 6806   stride: number;
// 6807 }
// 6808 // *CIDO - BÖLÜM - 836 - RNNConfig - RNN Konfigürasyonu - Birim Tip - Çift Yönlü - Serde
// 6809 export interface RNNConfig {
// 6810   units: number;
// 6811   type: string;
// 6812   bidirectional: boolean;
// 6813   return_sequences: boolean;
// 6814 }
// 6815 // *CIDO - BÖLÜM - 837 - LSTMConfig - LSTM Konfigürasyonu - Birim - Bırakma - Serde
// 6816 export interface LSTMConfig {
// 6817   units: number;
// 6818   dropout: number;
// 6819   recurrent_dropout: number;
// 6820   activation: string;
// 6821 }
// 6822 // *CIDO - BÖLÜM - 838 - GRUConfig - GRU Konfigürasyonu - Birim - Bırakma - Serde
// 6823 export interface GRUConfig {
// 6824   units: number;
// 6825   dropout: number;
// 6826   recurrent_dropout: number;
// 6827 }
// 6828 // *CIDO - BÖLÜM - 839 - TransformerConfig - Transformer - Kafa Sayısı - Boyut - Serde
// 6829 export interface TransformerConfig {
// 6830   num_heads: number;
// 6831   d_model: number;
// 6832   d_ff: number;
// 6833   num_layers: number;
// 6834   dropout: number;
// 6835 }
// 6836 // *CIDO - BÖLÜM - 840 - AttentionConfig - Dikkat - Skor Tipi - Maske - Serde
// 6837 export interface AttentionConfig {
// 6838   score_type: string;
// 6839   use_mask: boolean;
// 6840   dropout: number;
// 6841 }
// 6842 // *CIDO - BÖLÜM - 841 - EmbeddingLayer - Gömme Katmanı - Girdi Boyutu - Çıktı Boyutu - Serde
// 6843 export interface EmbeddingLayer {
// 6844   input_dim: number;
// 6845   output_dim: number;
// 6846   mask_zero: boolean;
// 6847 }
// 6848 // *CIDO - BÖLÜM - 842 - PositionalEncoding - Konumsal Kodlama - Maks Uzunluk - Serde
// 6849 export interface PositionalEncoding {
// 6850   max_length: number;
// 6851   d_model: number;
// 6852   dropout: number;
// 6853 }
// 6854 // *CIDO - BÖLÜM - 843 - LayerNormalization - Katman Normalleştirme - Epsilon - Eksen - Serde
// 6855 export interface LayerNormalization {
// 6856   epsilon: number;
// 6857   axis: number;
// 6858 }
// 6859 // *CIDO - BÖLÜM - 844 - BatchNormalization - Yığın Normalleştirme - Momentum - Epsilon - Serde
// 6860 export interface BatchNormalization {
// 6861   momentum: number;
// 6862   epsilon: number;
// 6863   axis: number;
// 6864 }
// 6865 // *CIDO - BÖLÜM - 845 - OptimizerConfig - Optimizer - Tip - Öğrenme Oranı - Serde
// 6866 export interface OptimizerConfig {
// 6867   type: string;
// 6868   learning_rate: number;
// 6869   clip_norm: number;
// 6870 }
// 6871 // *CIDO - BÖLÜM - 846 - AdamOptimizer - Adam - Beta1 Beta2 - Epsilon - Serde
// 6872 export interface AdamOptimizer {
// 6873   learning_rate: number;
// 6874   beta_1: number;
// 6875   beta_2: number;
// 6876   epsilon: number;
// 6877 }
// 6878 // *CIDO - BÖLÜM - 847 - SGDOptimizer - SGD - Momentum - Nesterov - Serde
// 6879 export interface SGDOptimizer {
// 6880   learning_rate: number;
// 6881   momentum: number;
// 6882   nesterov: boolean;
// 6883 }
// 6884 // *CIDO - BÖLÜM - 848 - RMSpropOptimizer - RMSprop - Rho - Epsilon - Serde
// 6885 export interface RMSpropOptimizer {
// 6886   learning_rate: number;
// 6887   rho: number;
// 6888   epsilon: number;
// 6889 }
// 6890 // *CIDO - BÖLÜM - 849 - LearningRateSchedule - Öğrenme Oranı - Program - Azaltma - Serde
// 6891 export interface LearningRateSchedule {
// 6892   type: string;
// 6893   initial_lr: number;
// 6894   decay_steps: number;
// 6895   decay_rate: number;
// 6896 }
// 6897 // *CIDO - BÖLÜM - 850 - EarlyStoppingConfig - Erken Durdurma - Sabır - Minimum Delta - Serde
// 6898 export interface EarlyStoppingConfig {
// 6899   monitor: string;
// 6900   patience: number;
// 6901   min_delta: number;
// 6902   restore_best_weights: boolean;
// 6903 }
// 6904 // *CIDO - BÖLÜM - 851 - ModelCheckpoint - Model Kontrol Noktası - Dosya Yolu - Kaydetme - Serde
// 6905 export interface ModelCheckpoint {
// 6906   filepath: string;
// 6907   monitor: string;
// 6908   save_best_only: boolean;
// 6909   save_weights_only: boolean;
// 6910 }
// 6911 // *CIDO - BÖLÜM - 852 - TensorBoardConfig - TensorBoard - Log Dizini - Histogram - Serde
// 6912 export interface TensorBoardConfig {
// 6913   log_dir: string;
// 6914   histogram_freq: number;
// 6915   write_graph: boolean;
// 6916   write_images: boolean;
// 6917 }
// 6918 // *CIDO - BÖLÜM - 853 - DataGeneratorConfig - Veri Üretici - Artırma - Karıştırma - Serde
// 6919 export interface DataGeneratorConfig {
// 6920   batch_size: number;
// 6921   shuffle: boolean;
// 6922   augmentation: boolean;
// 6923   seed: number;
// 6924 }
// 6925 // *CIDO - BÖLÜM - 854 - ImagePreprocessing - Görsel Ön İşleme - Yeniden Boyutlandırma - Normalleştirme - Serde
// 6926 export interface ImagePreprocessing {
// 6927   target_size: [number, number];
// 6928   rescale: number;
// 6929   mean_subtraction: number[];
// 6930   std_division: number[];
// 6931 }
// 6932 // *CIDO - BÖLÜM - 855 - AudioPreprocessing - Ses Ön İşleme - Örnekleme Oranı - MFCC - Serde
// 6933 export interface AudioPreprocessing {
// 6934   sample_rate: number;
// 6935   n_mfcc: number;
// 6936   n_fft: number;
// 6937   hop_length: number;
// 6938 }
// 6939 // *CIDO - BÖLÜM - 856 - TransferLearning - Transfer Öğrenme - Temel Model - Dondurma - Serde
// 6940 export interface TransferLearning {
// 6941   base_model: string;
// 6942   freeze_layers: boolean;
// 6943   trainable_from_layer: string;
// 6944 }
// 6945 // *CIDO - BÖLÜM - 857 - FineTuningConfig - İnce Ayar - Aşama - Katman Başına LR - Serde
// 6946 export interface FineTuningConfig {
// 6947   stages: FineTuningStage[];
// 6948 }
// 6949 // *CIDO - BÖLÜM - 858 - FineTuningStage - İnce Ayar Aşaması - Katmanlar - Öğrenme Oranı - Serde
// 6950 export interface FineTuningStage {
// 6951   layers: string[];
// 6952   learning_rate: number;
// 6953   epochs: number;
// 6954 }
// 6955 // *CIDO - BÖLÜM - 859 - ModelEnsemble - Model Topluluğu - Üyeler - Ağırlık - Serde
// 6956 export interface ModelEnsemble {
// 6957   members: string[];
// 6958   weights: number[];
// 6959   method: string;
// 6960 }
// 6961 // *CIDO - BÖLÜM - 860 - StackingModel - İstifleme Modeli - Taban Modeller - Meta Model - Serde
// 6962 export interface StackingModel {
// 6963   base_models: string[];
// 6964   meta_model: string;
// 6965   cv_folds: number;
// 6966 }
// 6967 // *CIDO - BÖLÜM - 861 - BlendingModel - Harmanlama - Eğitim Bölme - Meta Özellikler - Serde
// 6968 export interface BlendingModel {
// 6969   base_models: string[];
// 6970   blend_ratio: number;
// 6971 }
// 6972 // *CIDO - BÖLÜM - 862 - QuantizationConfig - Kuantalama - Duyarlılık - Şema - Serde
// 6973 export interface QuantizationConfig {
// 6974   precision: string;
// 6975   scheme: string;
// 6976   calibration_dataset_size: number;
// 6977 }
// 6978 // *CIDO - BÖLÜM - 863 - PruningConfig - Budama - Seyreklik Hedefi - Program - Serde
// 6979 export interface PruningConfig {
// 6980   target_sparsity: number;
// 6981   schedule: string;
// 6982   begin_step: number;
// 6983   end_step: number;
// 6984 }
// 6985 // *CIDO - BÖLÜM - 864 - KnowledgeDistillation - Bilgi Damıtma - Öğretmen Öğrenci - Sıcaklık - Serde
// 6986 export interface KnowledgeDistillation {
// 6987   teacher_model: string;
// 6988   student_model: string;
// 6989   temperature: number;
// 6990   alpha: number;
// 6991 }
// 6992 // *CIDO - BÖLÜM - 865 - ModelCompression - Model Sıkıştırma - Orijinal Boyut - Sıkıştırılmış - Serde
// 6993 export interface ModelCompression {
// 6994   original_size_mb: number;
// 6995   compressed_size_mb: number;
// 6996   compression_ratio: number;
// 6997   method: string;
// 6998 }
// 6999 // *CIDO - BÖLÜM - 866 - ONNXExport - ONNX Dışa Aktarım - Opset - Girdi Adı - Serde
// 7000 export interface ONNXExport {
// 7001   model_path: string;
// 7002   opset_version: number;
// 7003   input_names: string[];
// 7004   output_names: string[];
// 7005 }
// 7006 // *CIDO - BÖLÜM - 867 - TensorRTConfig - TensorRT - Duyarlılık - Maks Batch - Serde
// 7007 export interface TensorRTConfig {
// 7008   precision: string;
// 7009   max_batch_size: number;
// 7010   workspace_size_mb: number;
// 7011 }
// 7012 // *CIDO - BÖLÜM - 868 - OpenVINOConfig - OpenVINO - Cihaz - İş Parçacığı - Serde
// 7013 export interface OpenVINOConfig {
// 7014   device: string;
// 7015   num_threads: number;
// 7016   precision: string;
// 7017 }
// 7018 // *CIDO - BÖLÜM - 869 - CoreMLConfig - CoreML - Model Tipi - Hedef - Serde
// 7019 export interface CoreMLConfig {
// 7020   model_type: string;
// 7021   target: string;
// 7022   minimum_deployment_target: string;
// 7023 }
// 7024 // *CIDO - BÖLÜM - 870 - TFLiteConfig - TFLite - Optimizasyon - Temsilci - Serde
// 7025 export interface TFLiteConfig {
// 7026   optimization: string;
// 7027   delegate: string;
// 7028   quantized: boolean;
// 7029 }
// 7030 // *CIDO - BÖLÜM - 871 - MLflowTracking - MLflow İzleme - Deney Kimliği - Çalışma Adı - Serde
// 7031 export interface MLflowTracking {
// 7032   experiment_id: string;
// 7033   run_name: string;
// 7034   params: Record<string, unknown>;
// 7035   metrics: Record<string, number>;
// 7036 }
// 7037 // *CIDO - BÖLÜM - 872 - ModelRegistry - Model Kayıt Defteri - Sürüm - Aşama - Serde
// 7038 export interface ModelRegistry {
// 7039   model_name: string;
// 7040   version: number;
// 7041   stage: string;
// 7042   run_id: string;
// 7043 }
// 7044 // *CIDO - BÖLÜM - 873 - ModelServing - Model Sunumu - REST Endpoint - Giriş Şema - Serde
// 7045 export interface ModelServing {
// 7046   endpoint_url: string;
// 7047   input_schema: Record<string, string>;
// 7048   output_schema: Record<string, string>;
// 7049 }
// 7050 // *CIDO - BÖLÜM - 874 - BatchInferenceJob - Toplu Çıkarım - Veri Yolu - Çıktı - Serde
// 7051 export interface BatchInferenceJob {
// 7052   id: string;
// 7053   input_path: string;
// 7054   output_path: string;
// 7055   status: string;
// 7056   started_at: number;
// 7057 }
// 7058 // *CIDO - BÖLÜM - 875 - InferenceLatency - Çıkarım Gecikmesi - Ortalama p99 - Model - Serde
// 7059 export interface InferenceLatency {
// 7060   model: string;
// 7061   mean_ms: number;
// 7062   p99_ms: number;
// 7063   throughput_rps: number;
// 7064 }
// 7065 // *CIDO - BÖLÜM - 876 - DataDriftReport - Veri Kayması - PSI - Özellik Sapması - Serde
// 7066 export interface DataDriftReport {
// 7067   feature: string;
// 7068   psi: number;
// 7069   drift_detected: boolean;
// 7070   reference_distribution: number[];
// 7071   current_distribution: number[];
// 7072 }
// 7073 // *CIDO - BÖLÜM - 877 - ModelDriftReport - Model Kayması - Tahmin Sapması - Doğruluk - Serde
// 7074 export interface ModelDriftReport {
// 7075   metric: string;
// 7076   reference_value: number;
// 7077   current_value: number;
// 7078   drift_detected: boolean;
// 7079 }
// 7080 // *CIDO - BÖLÜM - 878 - RetrainingTrigger - Yeniden Eğitim - Koşul - Frekans - Serde
// 7081 export interface RetrainingTrigger {
// 7082   condition: string;
// 7083   metric: string;
// 7084   threshold: number;
// 7085   cooldown_days: number;
// 7086 }
// 7087 // *CIDO - BÖLÜM - 879 - ABModelTest - A/B Model Testi - Şampiyon Meydan Okuyan - Trafik - Serde
// 7088 export interface ABModelTest {
// 7089   champion_model: string;
// 7090   challenger_model: string;
// 7091   traffic_split: number;
// 7092   metric: string;
// 7093   duration_days: number;
// 7094 }
// 7095 // *CIDO - BÖLÜM - 880 - ChampionChallenger - Şampiyon Meydan Okuyan - Kazanan - Promosyon - Serde
// 7096 export interface ChampionChallenger {
// 7097   status: string;
// 7098   winner: string;
// 7099   promotion_date: number;
// 7100 }
// 7101 // *CIDO - BÖLÜM - 881 - ShadowDeployment - Gölge Dağıtım - Canlı Trafik Kopyası - Karşılaştırma - Serde
// 7102 export interface ShadowDeployment {
// 7103   shadow_model: string;
// 7104   traffic_percent: number;
// 7105   compare_metrics: string[];
// 7106 }
// 7107 // *CIDO - BÖLÜM - 882 - CanaryModelDeployment - Kanarya Model - Kademeli Trafik - Geri Alma - Serde
// 7108 export interface CanaryModelDeployment {
// 7109   model_version: string;
// 7110   traffic_percent: number;
// 7111   evaluation_minutes: number;
// 7112   rollback_threshold: number;
// 7113 }
// 7114 // *CIDO - BÖLÜM - 883 - MultiArmedBandit - Çok Kollu Bandit - Keşif Sömürü - Ödül - Serde
// 7115 export interface MultiArmedBandit {
// 7116   arms: BanditArm[];
// 7117   strategy: string;
// 7118 }
// 7119 // *CIDO - BÖLÜM - 884 - BanditArm - Bandit Kolu - Gösterim - Ödül - Değer - Serde
// 7120 export interface BanditArm {
// 7121   id: string;
// 7122   impressions: number;
// 7123   rewards: number;
// 7124   estimated_value: number;
// 7125 }
// 7126 // *CIDO - BÖLÜM - 885 - ContextualBandit - Bağlamsal Bandit - Bağlam Özellikleri - Politika - Serde
// 7127 export interface ContextualBandit {
// 7128   context_features: string[];
// 7129   policy: string;
// 7130   arms: BanditArm[];
// 7131 }
// 7132 // *CIDO - BÖLÜM - 886 - ReinforcementLearning - Pekiştirmeli Öğrenme - Ortam Durum - Ödül - Serde
// 7133 export interface ReinforcementLearning {
// 7134   environment: string;
// 7135   state_dim: number;
// 7136   action_dim: number;
// 7137   algorithm: string;
// 7138 }
// 7139 // *CIDO - BÖLÜM - 887 - QLearningConfig - Q-Learning - Alfa Gama - Epsilon - Serde
// 7140 export interface QLearningConfig {
// 7141   alpha: number;
// 7142   gamma: number;
// 7143   epsilon: number;
// 7144   epsilon_decay: number;
// 7145 }
// 7146 // *CIDO - BÖLÜM - 888 - DQNConfig - DQN - Deneyim Tekrarı - Hedef Ağ - Serde
// 7147 export interface DQNConfig {
// 7148   replay_buffer_size: number;
// 7149   batch_size: number;
// 7150   target_update_freq: number;
// 7151 }
// 7152 // *CIDO - BÖLÜM - 889 - PolicyGradient - Politika Gradyanı - Aktör Kritik - GAE - Serde
// 7153 export interface PolicyGradient {
// 7154   actor_lr: number;
// 7155   critic_lr: number;
// 7156   gamma: number;
// 7157   gae_lambda: number;
// 7158 }
// 7159 // *CIDO - BÖLÜM - 890 - PPOConfig - PPO - Klip Epsilon - Değer Katsayısı - Serde
// 7160 export interface PPOConfig {
// 7161   clip_epsilon: number;
// 7162   value_coefficient: number;
// 7163   entropy_coefficient: number;
// 7164   max_grad_norm: number;
// 7165 }
// 7166 // *CIDO - BÖLÜM - 891 - SACConfig - SAC - Sıcaklık - Hedef Entropi - Serde
// 7167 export interface SACConfig {
// 7168   temperature: number;
// 7169   target_entropy: number;
// 7170   actor_lr: number;
// 7171   critic_lr: number;
// 7172 }
// 7173 // *CIDO - BÖLÜM - 892 - TD3Config - TD3 - Politika Gecikmesi - Hedef Gürültü - Serde
// 7174 export interface TD3Config {
// 7175   policy_delay: number;
// 7176   target_noise: number;
// 7177   noise_clip: number;
// 7178 }
// 7179 // *CIDO - BÖLÜM - 893 - ExplorationStrategy - Keşif Stratejisi - Tip - Parametre - Serde
// 7180 export interface ExplorationStrategy {
// 7181   type: string;
// 7182   epsilon_start: number;
// 7183   epsilon_end: number;
// 7184   decay_steps: number;
// 7185 }
// 7186 // *CIDO - BÖLÜM - 894 - EnvironmentConfig - Ortam Konfigürasyonu - Gözlem Aksiyon - Ödül - Serde
// 7187 export interface EnvironmentConfig {
// 7188   observation_space: string;
// 7189   action_space: string;
// 7190   reward_range: [number, number];
// 7191 }
// 7192 // *CIDO - BÖLÜM - 895 - EpisodeRecord - Bölüm Kaydı - Adım Sayısı - Toplam Ödül - Serde
// 7193 export interface EpisodeRecord {
// 7194   episode: number;
// 7195   steps: number;
// 7196   total_reward: number;
// 7197   avg_loss: number;
// 7198 }
// 7199 // *CIDO - BÖLÜM - 896 - TrainingCurve - Eğitim Eğrisi - Bölüm Ödül - Kayan Ortalama - Serde
// 7200 export interface TrainingCurve {
// 7201   episodes: number[];
// 7202   rewards: number[];
// 7203   moving_avg_window: number;
// 7204   smoothed_rewards: number[];
// 7205 }
// 7206 // *CIDO - BÖLÜM - 897 - GymEnvironment - Gym Ortamı - Ad - Sürüm - Kayıt - Serde
// 7207 export interface GymEnvironment {
// 7208   name: string;
// 7209   version: string;
// 7210   entry_point: string;
// 7211 }
// 7212 // *CIDO - BÖLÜM - 898 - CustomEnvironment - Özel Ortam - Gözlem Şekli - Eylem Sayısı - Serde
// 7213 export interface CustomEnvironment {
// 7214   obs_shape: number[];
// 7215   n_actions: number;
// 7216   max_steps: number;
// 7217 }
// 7218 // *CIDO - BÖLÜM - 899 - SimulatorConfig - Simülatör - Fizik Motoru - Zaman Adımı - Serde
// 7219 export interface SimulatorConfig {
// 7220   engine: string;
// 7221   time_step: number;
// 7222   gravity: [number, number, number];
// 7223 }
// 7224 // *CIDO - BÖLÜM - 900 - DigitalTwinConfig - Dijital İkiz - Varlık Kimliği - Sensörler - Serde
// 7225 export interface DigitalTwinConfig {
// 7226   asset_id: string;
// 7227   sensors: string[];
// 7228   update_frequency_hz: number;
// 7229 }
// 7230 // *CIDO - BÖLÜM - 901 - AIGym - AI Gym - Ajan Adı - Ortam - Algoritma - Serde
// 7231 export interface AIGym {
// 7232   agent_name: string;
// 7233   environment: string;
// 7234   algorithm: string;
// 7235   total_timesteps: number;
// 7236 }
// 7237 // *CIDO - BÖLÜM - 902 - RayTuneConfig - Ray Tune - Arama Algoritması - Programlayıcı - Serde
// 7238 export interface RayTuneConfig {
// 7239   search_algorithm: string;
// 7240   scheduler: string;
// 7241   num_samples: number;
// 7242   max_concurrent_trials: number;
// 7243 }
// 7244 // *CIDO - BÖLÜM - 903 - OptunaConfig - Optuna - Yön - Çalışma Adı - Serde
// 7245 export interface OptunaConfig {
// 7246   direction: string;
// 7247   study_name: string;
// 7248   n_trials: number;
// 7249   storage_url: string;
// 7250 }
// 7251 // *CIDO - BÖLÜM - 904 - HyperoptConfig - Hyperopt - Algoritma - Maks Değerlendirme - Serde
// 7252 export interface HyperoptConfig {
// 7253   algorithm: string;
// 7254   max_evals: number;
// 7255   loss_threshold: number;
// 7256 }
// 7257 // *CIDO - BÖLÜM - 905 - BayesianOptimization - Bayesci Optimizasyon - Edinme - Keşif - Serde
// 7258 export interface BayesianOptimization {
// 7259   acquisition_function: string;
// 7260   kappa: number;
// 7261   xi: number;
// 7262   n_iter: number;
// 7263 }
// 7264 // *CIDO - BÖLÜM - 906 - GridSearchConfig - Izgara Araması - Parametre Izgarası - CV - Serde
// 7265 export interface GridSearchConfig {
// 7266   param_grid: Record<string, unknown[]>;
// 7267   cv: number;
// 7268   scoring: string;
// 7269   n_jobs: number;
// 7270 }
// 7271 // *CIDO - BÖLÜM - 907 - RandomSearchConfig - Rastgele Arama - Dağılımlar - İterasyon - Serde
// 7272 export interface RandomSearchConfig {
// 7273   param_distributions: Record<string, unknown>;
// 7274   n_iter: number;
// 7275   cv: number;
// 7276   scoring: string;
// 7277 }
// 7278 // *CIDO - BÖLÜM - 908 - GeneticAlgorithm - Genetik Algoritma - Popülasyon - Nesil - Serde
// 7279 export interface GeneticAlgorithm {
// 7280   population_size: number;
// 7281   generations: number;
// 7282   crossover_rate: number;
// 7283   mutation_rate: number;
// 7284 }
// 7285 // *CIDO - BÖLÜM - 909 - SimulatedAnnealing - Tavlama Benzetimi - Sıcaklık - Soğutma - Serde
// 7286 export interface SimulatedAnnealing {
// 7287   initial_temperature: number;
// 7288   cooling_rate: number;
// 7289   min_temperature: number;
// 7290   iterations_per_temp: number;
// 7291 }
// 7292 // *CIDO - BÖLÜM - 910 - ParticleSwarm - Parçacık Sürüsü - Atalet - Bilişsel Sosyal - Serde
// 7293 export interface ParticleSwarm {
// 7294   n_particles: number;
// 7295   inertia: number;
// 7296   cognitive_weight: number;
// 7297   social_weight: number;
// 7298 }
// 7299 // *CIDO - BÖLÜM - 911 - AntColony - Karınca Kolonisi - Feromon - Buharlaşma - Serde
// 7300 export interface AntColony {
// 7301   n_ants: number;
// 7302   evaporation_rate: number;
// 7303   alpha: number;
// 7304   beta: number;
// 7305 }
// 7306 // *CIDO - BÖLÜM - 912 - DifferentialEvolution - Diferansiyel Evrim - F CR - Strateji - Serde
// 7307 export interface DifferentialEvolution {
// 7308   F: number;
// 7309   CR: number;
// 7310   strategy: string;
// 7311   max_generations: number;
// 7312 }
// 7313 // *CIDO - BÖLÜM - 913 - NelderMead - Nelder-Mead - Simpleks - Yansıma Genişleme - Serde
// 7314 export interface NelderMead {
// 7315   alpha: number;
// 7316   gamma: number;
// 7317   rho: number;
// 7318   sigma: number;
// 7319 }
// 7320 // *CIDO - BÖLÜM - 914 - BFGSOptimizer - BFGS - Yakınsama Toleransı - Maks İterasyon - Serde
// 7321 export interface BFGSOptimizer {
// 7322   gtol: number;
// 7323   max_iter: number;
// 7324   max_linesearch: number;
// 7325 }
// 7326 // *CIDO - BÖLÜM - 915 - LinearProgram - Doğrusal Programlama - Amaç Katsayıları - Kısıtlar - Serde
// 7327 export interface LinearProgram {
// 7328   objective_coefficients: number[];
// 7329   constraint_matrix: number[][];
// 7330   bounds: [number, number][];
// 7331 }
// 7332 // *CIDO - BÖLÜM - 916 - IntegerProgram - Tamsayı Programlama - Değişken Sınırları - Tip - Serde
// 7333 export interface IntegerProgram {
// 7334   variable_bounds: [number, number][];
// 7335   integer_variables: number[];
// 7336   method: string;
// 7337 }
// 7338 // *CIDO - BÖLÜM - 917 - NonlinearProgram - Doğrusal Olmayan - Amaç Fonksiyonu - Kısıtlar - Serde
// 7339 export interface NonlinearProgram {
// 7340   objective: string;
// 7341   constraints: string[];
// 7342   initial_guess: number[];
// 7343 }
// 7344 // *CIDO - BÖLÜM - 918 - ConvexOptimization - Konveks Optimizasyon - Disiplinli - Çözücü - Serde
// 7345 export interface ConvexOptimization {
// 7346   solver: string;
// 7347   verbose: boolean;
// 7348   max_iters: number;
// 7349 }
// 7350 // *CIDO - BÖLÜM - 919 - MILPSolver - MILP Çözücü - Boşluk Toleransı - Zaman Aşımı - Serde
// 7351 export interface MILPSolver {
// 7352   solver: string;
// 7353   gap_tolerance: number;
// 7354   time_limit_seconds: number;
// 7355   threads: number;
// 7356 }
// 7357 // *CIDO - BÖLÜM - 920 - DynamicProgramming - Dinamik Programlama - Durum Geçişi - Değer - Serde
// 7358 export interface DynamicProgramming {
// 7359   state_space_size: number;
// 7360   transition_function: string;
// 7361   value_function: number[];
// 7362 }
// 7363 // *CIDO - BÖLÜM - 921 - BranchAndBound - Dal ve Sınır - Düğüm Sayısı - Alt Sınır - Serde
// 7364 export interface BranchAndBound {
// 7365   nodes_explored: number;
// 7366   lower_bound: number;
// 7367   upper_bound: number;
// 7368 }
// 7369 // *CIDO - BÖLÜM - 922 - HeuristicConfig - Sezgisel - Tip - Problem Boyutu - Serde
// 7370 export interface HeuristicConfig {
// 7371   type: string;
// 7372   problem_size: number;
// 7373   parameters: Record<string, unknown>;
// 7374 }
// 7375 // *CIDO - BÖLÜM - 923 - MetaheuristicConfig - Metasezgisel - Hibrit - Uyarlanabilir - Serde
// 7376 export interface MetaheuristicConfig {
// 7377   algorithm: string;
// 7378   hybridization: boolean;
// 7379   adaptive: boolean;
// 7380 }
// 7381 // *CIDO - BÖLÜM - 924 - ConstraintSatisfaction - Kısıt Tatmini - Değişkenler - Alanlar - Serde
// 7382 export interface ConstraintSatisfaction {
// 7383   variables: string[];
// 7384   domains: unknown[][];
// 7385   constraints: string[];
// 7386 }
// 7387 // *CIDO - BÖLÜM - 925 - BacktrackingConfig - Geri İzleme - Değişken Sıralama - Değer Sıralama - Serde
// 7388 export interface BacktrackingConfig {
// 7389   variable_ordering: string;
// 7390   value_ordering: string;
// 7391   inference: string;
// 7392 }
// 7393 // *CIDO - BÖLÜM - 926 - ForwardChecking - İleri Kontrol - Tutarlılık - Yayılma - Serde
// 7394 export interface ForwardChecking {
// 7395   consistency_level: string;
// 7396   propagate: boolean;
// 7397 }
// 7398 // *CIDO - BÖLÜM - 927 - ArcConsistency - Yay Tutarlılığı - AC-3 - Kuyruk - Serde
// 7399 export interface ArcConsistency {
// 7400   algorithm: string;
// 7401   queue_size: number;
// 7402   revisions: number;
// 7403 }
// 7404 // *CIDO - BÖLÜM - 928 - LocalSearchConfig - Yerel Arama - Komşuluk - Yeniden Başlatma - Serde
// 7405 export interface LocalSearchConfig {
// 7406   neighborhood: string;
// 7407   restarts: number;
// 7408   max_iterations: number;
// 7409 }
// 7410 // *CIDO - BÖLÜM - 929 - TabuSearch - Tabu Araması - Görev Süresi - Tabu Listesi Boyutu - Serde
// 7411 export interface TabuSearch {
// 7412   tenure: number;
// 7413   tabu_list_size: number;
// 7414   aspiration_criteria: string;
// 7415 }
// 7416 // *CIDO - BÖLÜM - 930 - GreedyAlgorithm - Açgözlü Algoritma - Seçim Kriteri - Optimalite - Serde
// 7417 export interface GreedyAlgorithm {
// 7418   selection_criterion: string;
// 7419   guarantee_optimal: boolean;
// 7420 }
// 7421 // *CIDO - BÖLÜM - 931 - DivideAndConquer - Böl ve Fethet - Özyineleme Derinliği - Temel Durum - Serde
// 7422 export interface DivideAndConquer {
// 7423   max_recursion_depth: number;
// 7424   base_case_size: number;
// 7425 }
// 7426 // *CIDO - BÖLÜM - 932 - ParallelAlgorithm - Paralel Algoritma - İş Parçacığı - Hızlanma - Serde
// 7427 export interface ParallelAlgorithm {
// 7428   num_threads: number;
// 7429   speedup: number;
// 7430   efficiency: number;
// 7431 }
// 7432 // *CIDO - BÖLÜM - 933 - DistributedAlgorithm - Dağıtık Algoritma - Düğümler - Mesaj Geçirme - Serde
// 7433 export interface DistributedAlgorithm {
// 7434   num_nodes: number;
// 7435   message_complexity: number;
// 7436   time_complexity: number;
// 7437 }
// 7438 // *CIDO - BÖLÜM - 934 - StreamingAlgorithm - Akış Algoritması - Pencere Boyutu - Bellek - Serde
// 7439 export interface StreamingAlgorithm {
// 7440   window_size: number;
// 7441   memory_bytes: number;
// 7442   error_bound: number;
// 7443 }
// 7444 // *CIDO - BÖLÜM - 935 - OnlineAlgorithm - Çevrimiçi Algoritma - Pişmanlık Sınırı - Rekabet Oranı - Serde
// 7445 export interface OnlineAlgorithm {
// 7446   regret_bound: number;
// 7447   competitive_ratio: number;
// 7448   learning_rate: number;
// 7449 }
// 7450 // *CIDO - BÖLÜM - 936 - ApproximationAlgorithm - Yaklaşım Algoritması - Oran - Garanti - Serde
// 7451 export interface ApproximationAlgorithm {
// 7452   approximation_ratio: number;
// 7453   guarantee_type: string;
// 7454 }
// 7455 // *CIDO - BÖLÜM - 937 - RandomizedAlgorithm - Rastgele Algoritma - Monte Carlo Las Vegas - Tohum - Serde
// 7456 export interface RandomizedAlgorithm {
// 7457   type: string;
// 7458   seed: number;
// 7459   success_probability: number;
// 7460 }
// 7461 // *CIDO - BÖLÜM - 938 - GraphAlgorithm - Graf Algoritması - Tip - Düğüm Kenar - Serde
// 7462 export interface GraphAlgorithm {
// 7463   type: string;
// 7464   num_vertices: number;
// 7465   num_edges: number;
// 7466 }
// 7467 // *CIDO - BÖLÜM - 939 - ShortestPath - En Kısa Yol - Dijkstra A* - Mesafe - Serde
// 7468 export interface ShortestPath {
// 7469   algorithm: string;
// 7470   source: string;
// 7471   target: string;
// 7472   distance: number;
// 7473   path: string[];
// 7474 }
// 7475 // *CIDO - BÖLÜM - 940 - MinimumSpanningTree - Minimum Kapsayan Ağaç - Prim Kruskal - Ağırlık - Serde
// 7476 export interface MinimumSpanningTree {
// 7477   algorithm: string;
// 7478   total_weight: number;
// 7479   edges: [string, string, number][];
// 7480 }
// 7481 // *CIDO - BÖLÜM - 941 - MaxFlow - Maksimum Akış - Ford-Fulkerson - Kapasite - Serde
// 7482 export interface MaxFlow {
// 7483   source: string;
// 7484   sink: string;
// 7485   max_flow: number;
// 7486   flow_edges: [string, string, number][];
// 7487 }
// 7488 // *CIDO - BÖLÜM - 942 - BipartiteMatching - İki Parçalı Eşleme - Maksimum - Sol Sağ - Serde
// 7489 export interface BipartiteMatching {
// 7490   left_nodes: string[];
// 7491   right_nodes: string[];
// 7492   matching: [string, string][];
// 7493   size: number;
// 7494 }
// 7495 // *CIDO - BÖLÜM - 943 - TopologicalSort - Topolojik Sıralama - DAG - Sıra - Serde
// 7496 export interface TopologicalSort {
// 7497   order: string[];
// 7498   has_cycle: boolean;
// 7499 }
// 7500 // *CIDO - BÖLÜM - 944 - StronglyConnected - Güçlü Bağlı - Kosaraju Tarjan - Bileşen - Serde
// 7501 export interface StronglyConnected {
// 7502   algorithm: string;
// 7503   components: string[][];
// 7504   component_count: number;
// 7505 }
// 7506 // *CIDO - BÖLÜM - 945 - NetworkFlow - Ağ Akışı - Maliyet Kapasite - Dolaşım - Serde
// 7507 export interface NetworkFlow {
// 7508   flow: number;
// 7509   cost: number;
// 7510   feasible: boolean;
// 7511 }
// 7512 // *CIDO - BÖLÜM - 946 - TravelingSalesman - Gezgin Satıcı - Tur - Maliyet - Serde
// 7513 export interface TravelingSalesman {
// 7514   tour: string[];
// 7515   total_cost: number;
// 7516   optimal_gap_percent: number;
// 7517 }
// 7518 // *CIDO - BÖLÜM - 947 - VehicleRouting - Araç Rotalama - Araç Sayısı - Rota - Serde
// 7519 export interface VehicleRouting {
// 7520   num_vehicles: number;
// 7521   routes: string[][];
// 7522   total_distance: number;
// 7523 }
// 7524 // *CIDO - BÖLÜM - 948 - KnapsackProblem - Sırt Çantası - Kapasite - Seçilen Değer - Serde
// 7525 export interface KnapsackProblem {
// 7526   capacity: number;
// 7527   selected_items: number[];
// 7528   total_value: number;
// 7529   total_weight: number;
// 7530 }
// 7531 // *CIDO - BÖLÜM - 949 - BinPacking - Kutu Paketleme - Kutu Sayısı - Atama - Serde
// 7532 export interface BinPacking {
// 7533   num_bins: number;
// 7534   assignments: number[][];
// 7535   bin_capacity: number;
// 7536 }
// 7537 // *CIDO - BÖLÜM - 950 - SchedulingProblem - Çizelgeleme - Makine Sayısı - Makespan - Serde
// 7538 export interface SchedulingProblem {
// 7539   num_machines: number;
// 7540   num_jobs: number;
// 7541   makespan: number;
// 7542   schedule: JobAssignment[];
// 7543 }
// 7544 // *CIDO - BÖLÜM - 951 - JobAssignment - İş Ataması - İş Kimliği - Makine Başlangıç - Serde
// 7545 export interface JobAssignment {
// 7546   job_id: string;
// 7547   machine: number;
// 7548   start_time: number;
// 7549   end_time: number;
// 7550 }
// 7551 // *CIDO - BÖLÜM - 952 - InventoryOptimization - Envanter Optimizasyonu - Sipariş Noktası - EOQ - Serde
// 7552 export interface InventoryOptimization {
// 7553   reorder_point: number;
// 7554   eoq: number;
// 7555   safety_stock: number;
// 7556   holding_cost: number;
// 7557 }
// 7558 // *CIDO - BÖLÜM - 953 - SupplyChainNetwork - Tedarik Zinciri Ağı - Düğümler - Akış - Serde
// 7559 export interface SupplyChainNetwork {
// 7560   nodes: SupplyChainNode[];
// 7561   flows: SupplyChainFlow[];
// 7562 }
// 7563 // *CIDO - BÖLÜM - 954 - SupplyChainNode - Tedarik Zinciri Düğümü - Tip - Kapasite - Serde
// 7564 export interface SupplyChainNode {
// 7565   id: string;
// 7566   type: string;
// 7567   capacity: number;
// 7568   location: string;
// 7569 }
// 7570 // *CIDO - BÖLÜM - 955 - SupplyChainFlow - Tedarik Zinciri Akışı - Kaynak Hedef - Miktar - Serde
// 7571 export interface SupplyChainFlow {
// 7572   from: string;
// 7573   to: string;
// 7574   quantity: number;
// 7575   cost_per_unit: number;
// 7576 }
// 7577 // *CIDO - BÖLÜM - 956 - DemandForecast - Talep Tahmini - Ürün - Dönem - Miktar - Serde
// 7578 export interface DemandForecast {
// 7579   product_id: string;
// 7580   period: string;
// 7581   forecast_quantity: number;
// 7582   confidence_lower: number;
// 7583   confidence_upper: number;
// 7584 }
// 7585 // *CIDO - BÖLÜM - 957 - PriceOptimization - Fiyat Optimizasyonu - Elastikiyet - Optimum Fiyat - Serde
// 7586 export interface PriceOptimization {
// 7587   product_id: string;
// 7588   price_elasticity: number;
// 7589   optimal_price: number;
// 7590   expected_revenue: number;
// 7591 }
// 7592 // *CIDO - BÖLÜM - 958 - MarkdownOptimization - İndirim Optimizasyonu - Sezonluk - İndirim Oranı - Serde
// 7593 export interface MarkdownOptimization {
// 7594   product_id: string;
// 7595   seasonality_factor: number;
// 7596   markdown_percent: number;
// 7597   clearance_price: number;
// 7598 }
// 7599 // *CIDO - BÖLÜM - 959 - AssortmentOptimization - Ürün Çeşidi - SKU Sayısı - Transfer - Serde
// 7600 export interface AssortmentOptimization {
// 7601   category: string;
// 7602   current_sku_count: number;
// 7603   optimized_sku_count: number;
// 7604   cannibalization_rate: number;
// 7605 }
// 7606 // *CIDO - BÖLÜM - 960 - SpaceOptimization - Alan Optimizasyonu - Raf Payı - Görünürlük - Serde
// 7607 export interface SpaceOptimization {
// 7608   shelf_id: string;
// 7609   product_id: string;
// 7610   facings: number;
// 7611   visibility_score: number;
// 7612 }
// 7613 // *CIDO - BÖLÜM - 961 - WorkforceOptimization - İş Gücü - Vardiya - Talep Karşılama - Serde
// 7614 export interface WorkforceOptimization {
// 7615   day: string;
// 7616   required_staff: number;
// 7617   assigned_staff: number;
// 7618   shifts: ShiftAssignment[];
// 7619 }
// 7620 // *CIDO - BÖLÜM - 962 - ShiftAssignment - Vardiya Ataması - Çalışan Başlangıç - Bitiş - Serde
// 7621 export interface ShiftAssignment {
// 7622   employee_id: string;
// 7623   start_time: string;
// 7624   end_time: string;
// 7625   role: string;
// 7626 }
// 7627 // *CIDO - BÖLÜM - 963 - RouteOptimization - Rota Optimizasyonu - Duraklar - Mesafe - Serde
// 7628 export interface RouteOptimization {
// 7629   stops: string[];
// 7630   sequence: number[];
// 7631   total_distance_km: number;
// 7632   total_time_minutes: number;
// 7633 }
// 7634 // *CIDO - BÖLÜM - 964 - FacilityLocation - Tesis Yerleşimi - Adaylar - Seçilen - Serde
// 7635 export interface FacilityLocation {
// 7636   candidates: string[];
// 7637   selected: string[];
// 7638   objective_value: number;
// 7639 }
// 7640 // *CIDO - BÖLÜM - 965 - ResourceAllocation - Kaynak Tahsisi - Kaynak Görev - Kullanım - Serde
// 7641 export interface ResourceAllocation {
// 7642   resources: string[];
// 7643   tasks: string[];
// 7644   allocation: [string, string][];
// 7645   utilization_percent: number;
// 7646 }
// 7647 // *CIDO - BÖLÜM - 966 - PortfolioOptimization - Portföy Optimizasyonu - Getiri Risk - Ağırlık - Serde
// 7648 export interface PortfolioOptimization {
// 7649   assets: string[];
// 7650   weights: number[];
// 7651   expected_return: number;
// 7652   risk: number;
// 7653   sharpe_ratio: number;
// 7654 }
// 7655 // *CIDO - BÖLÜM - 967 - RiskParity - Risk Paritesi - Bütçe - Katkı - Serde
// 7656 export interface RiskParity {
// 7657   assets: string[];
// 7658   risk_budget: number[];
// 7659   risk_contribution: number[];
// 7660 }
// 7661 // *CIDO - BÖLÜM - 968 - BlackLitterman - Black-Litterman - Görüşler - Denge - Serde
// 7662 export interface BlackLitterman {
// 7663   views: string[];
// 7664   confidence: number[];
// 7665   equilibrium_returns: number[];
// 7666   posterior_returns: number[];
// 7667 }
// 7668 // *CIDO - BÖLÜM - 969 - MonteCarloVaR - Monte Carlo VaR - Simülasyon - Güven Seviyesi - Serde
// 7669 export interface MonteCarloVaR {
// 7670   var: number;
// 7671   cvar: number;
// 7672   confidence_level: number;
// 7673   horizon_days: number;
// 7674 }
// 7675 // *CIDO - BÖLÜM - 970 - StressTestScenario - Stres Testi - Şok - Etki - Serde
// 7676 export interface StressTestScenario {
// 7677   name: string;
// 7678   shock_percent: number;
// 7679   affected_assets: string[];
// 7680   portfolio_impact: number;
// 7681 }
// 7682 // *CIDO - BÖLÜM - 971 - OptionPricing - Opsiyon Fiyatlama - Black-Scholes - Çağrı Satım - Serde
// 7683 export interface OptionPricing {
// 7684   option_type: string;
// 7685   spot: number;
// 7686   strike: number;
// 7687   volatility: number;
// 7688   time_to_expiry: number;
// 7689   price: number;
// 7690   greeks: OptionGreeks;
// 7691 }
// 7692 // *CIDO - BÖLÜM - 972 - OptionGreeks - Opsiyon Yunanları - Delta Gama - Vega Theta - Serde
// 7693 export interface OptionGreeks {
// 7694   delta: number;
// 7695   gamma: number;
// 7696   vega: number;
// 7697   theta: number;
// 7698   rho: number;
// 7699 }
// 7700 // *CIDO - BÖLÜM - 973 - FixedIncome - Sabit Getiri - Vade Getiri - Süre - Serde
// 7701 export interface FixedIncome {
// 7702   bond_name: string;
// 7703   yield_to_maturity: number;
// 7704   duration: number;
// 7705   convexity: number;
// 7706 }
// 7707 // *CIDO - BÖLÜM - 974 - YieldCurve - Getiri Eğrisi - Vade Getiri - İnterpolasyon - Serde
// 7708 export interface YieldCurve {
// 7709   maturities: number[];
// 7710   yields: number[];
// 7711   interpolation_method: string;
// 7712 }
// 7713 // *CIDO - BÖLÜM - 975 - CreditRisk - Kredi Riski - PD LGD EAD - Beklenen Kayıp - Serde
// 7714 export interface CreditRisk {
// 7715   pd: number;
// 7716   lgd: number;
// 7717   ead: number;
// 7718   expected_loss: number;
// 7719 }
// 7720 // *CIDO - BÖLÜM - 976 - CreditScoring - Kredi Skorlaması - Özellikler - Skor - Serde
// 7721 export interface CreditScoring {
// 7722   applicant_id: string;
// 7723   score: number;
// 7724   features: Record<string, number>;
// 7725   decision: string;
// 7726 }
// 7727 // *CIDO - BÖLÜM - 977 - TimeSeriesForecast - Zaman Serisi - ARIMA LSTM - Ufuk - Serde
// 7728 export interface TimeSeriesForecast {
// 7729   model: string;
// 7730   horizon: number;
// 7731   forecasts: number[];
// 7732   prediction_intervals: [number, number][];
// 7733 }
// 7734 // *CIDO - BÖLÜM - 978 - VolatilityModel - Volatilite Modeli - GARCH - Omega Alfa Beta - Serde
// 7735 export interface VolatilityModel {
// 7736   model: string;
// 7737   omega: number;
// 7738   alpha: number;
// 7739   beta: number;
// 7740   persistence: number;
// 7741 }
// 7742 // *CIDO - BÖLÜM - 979 - CopulaModel - Kopula Modeli - Tür - Parametre - Serde
// 7743 export interface CopulaModel {
// 7744   type: string;
// 7745   parameter: number;
// 7746   dimensions: number;
// 7747 }
// 7748 // *CIDO - BÖLÜM - 980 - RegimeSwitching - Rejim Değişimi - Markov Zinciri - Durum - Serde
// 7749 export interface RegimeSwitching {
// 7750   n_regimes: number;
// 7751   transition_matrix: number[][];
// 7752   regime_probabilities: number[];
// 7753 }
// 7754 // *CIDO - BÖLÜM - 981 - CointegrationTest - Eşbütünleşme - p-değeri - İlişki - Serde
// 7755 export interface CointegrationTest {
// 7756   series1: string;
// 7757   series2: string;
// 7758   p_value: number;
// 7759   cointegrated: boolean;
// 7760   hedge_ratio: number;
// 7761 }
// 7762 // *CIDO - BÖLÜM - 982 - PairsTrading - Çift Ticareti - Yayılma - Giriş Çıkış - Serde
// 7763 export interface PairsTrading {
// 7764   pair: [string, string];
// 7765   spread: number[];
// 7766   entry_threshold: number;
// 7767   exit_threshold: number;
// 7768   signals: number[];
// 7769 }
// 7770 // *CIDO - BÖLÜM - 983 - MarketMicrostructure - Piyasa Mikroyapısı - Emir Defteri - Spread - Serde
// 7771 export interface MarketMicrostructure {
// 7772   bid: number;
// 7773   ask: number;
// 7774   spread: number;
// 7775   depth_levels: number;
// 7776 }
// 7777 // *CIDO - BÖLÜM - 984 - OrderBookSnapshot - Emir Defteri - Seviye - Hacim - Serde
// 7778 export interface OrderBookSnapshot {
// 7779   timestamp: number;
// 7780   bids: [number, number][];
// 7781   asks: [number, number][];
// 7782 }
// 7783 // *CIDO - BÖLÜM - 985 - TradeExecution - Ticaret İcrası - Kayma - Etki - Serde
// 7784 export interface TradeExecution {
// 7785   order_id: string;
// 7786   executed_price: number;
// 7787   slippage_percent: number;
// 7788   market_impact: number;
// 7789 }
// 7790 // *CIDO - BÖLÜM - 986 - VWAPStrategy - VWAP Stratejisi - Hedef Hacim - Gerçekleşen - Serde
// 7791 export interface VWAPStrategy {
// 7792   target_volume: number;
// 7793   executed_volume: number;
// 7794   vwap_price: number;
// 7795   deviation_percent: number;
// 7796 }
// 7797 // *CIDO - BÖLÜM - 987 - TWAPStrategy - TWAP Stratejisi - Dilim Sayısı - Aralık - Serde
// 7798 export interface TWAPStrategy {
// 7799   slices: number;
// 7800   interval_seconds: number;
// 7801   twap_price: number;
// 7802 }
// 7803 // *CIDO - BÖLÜM - 988 - IcebergOrder - Buzdağı Emir - Görünen - Gizli - Serde
// 7804 export interface IcebergOrder {
// 7805   total_quantity: number;
// 7806   visible_quantity: number;
// 7807   hidden_quantity: number;
// 7808 }
// 7809 // *CIDO - BÖLÜM - 989 - MarketMaking - Piyasa Yapıcılığı - Alış Satış - Stok - Serde
// 7810 export interface MarketMaking {
// 7811   bid_price: number;
// 7812   ask_price: number;
// 7813   inventory: number;
// 7814   target_spread: number;
// 7815 }
// 7816 // *CIDO - BÖLÜM - 990 - StatisticalArbitrage - İstatistiksel Arbitraj - Ortalama Dönüş - Yarı Ömür - Serde
// 7817 export interface StatisticalArbitrage {
// 7818   half_life: number;
// 7819   mean_reversion_speed: number;
// 7820   signal_threshold: number;
// 7821 }
// 7822 // *CIDO - BÖLÜM - 991 - HighFrequencyData - Yüksek Frekans - İşlem Fiyat - Mikrosaniye - Serde
// 7823 export interface HighFrequencyData {
// 7824   timestamp_us: number;
// 7825   price: number;
// 7826   volume: number;
// 7827   trade_direction: string;
// 7828 }
// 7829 // *CIDO - BÖLÜM - 992 - TickData - Tik Verisi - Fiyat Hacim - Bayrak - Serde
// 7830 export interface TickData {
// 7831   timestamp: number;
// 7832   price: number;
// 7833   volume: number;
// 7834   flags: string[];
// 7835 }
// 7836 // *CIDO - BÖLÜM - 993 - BarData - Bar Verisi - Açık Yüksek Düşük Kapanış - Serde
// 7837 export interface BarData {
// 7838   timestamp: number;
// 7839   open: number;
// 7840   high: number;
// 7841   low: number;
// 7842   close: number;
// 7843   volume: number;
// 7844 }
// 7845 // *CIDO - BÖLÜM - 994 - ResampleConfig - Yeniden Örnekleme - Frekans - Toplama - Serde
// 7846 export interface ResampleConfig {
// 7847   frequency: string;
// 7848   aggregation: Record<string, string>;
// 7849 }
// 7850 // *CIDO - BÖLÜM - 995 - TechnicalIndicator - Teknik Gösterge - Parametre - Değer - Serde
// 7851 export interface TechnicalIndicator {
// 7852   name: string;
// 7853   parameters: Record<string, unknown>;
// 7854   values: number[];
// 7855 }
// 7856 // *CIDO - BÖLÜM - 996 - MovingAverage - Hareketli Ortalama - SMA EMA - Serde
// 7857 export interface MovingAverage {
// 7858   type: string;
// 7859   period: number;
// 7860   values: number[];
// 7861 }
// 7862 // *CIDO - BÖLÜM - 997 - BollingerBands - Bollinger Bantları - Orta Üst Alt - Serde
// 7863 export interface BollingerBands {
// 7864   middle: number[];
// 7865   upper: number[];
// 7866   lower: number[];
// 7867   std_multiplier: number;
// 7868 }
// 7869 // *CIDO - BÖLÜM - 998 - MACDIndicator - MACD - Hızlı Yavaş Sinyal - Serde
// 7870 export interface MACDIndicator {
// 7871   macd_line: number[];
// 7872   signal_line: number[];
// 7873   histogram: number[];
// 7874 }
// 7875 // *CIDO - BÖLÜM - 999 - RSIIndicator - RSI - Dönem - Aşırı Alım Satım - Serde
// 7876 export interface RSIIndicator {
// 7877   period: number;
// 7878   values: number[];
// 7879   overbought_threshold: number;
// 7880   oversold_threshold: number;
// 7881 }
// 7882 // *CIDO - BÖLÜM - 1000 - StochasticOscillator - Stokastik - %K %D - Yavaş - Serde
// 7883 export interface StochasticOscillator {
// 7884   k_period: number;
// 7885   d_period: number;
// 7886   k_values: number[];
// 7887   d_values: number[];
// 7888 }
// 7889 // *CIDO - BÖLÜM - 1001 - ATRIndicator - ATR - Ortalama Gerçek Aralık - Serde
// 7890 export interface ATRIndicator {
// 7891   period: number;
// 7892   values: number[];
// 7893 }
// 7894 // *CIDO - BÖLÜM - 1002 - ADXIndicator - ADX - Yön Hareketi - Trend Gücü - Serde
// 7895 export interface ADXIndicator {
// 7896   period: number;
// 7897   adx: number[];
// 7898   plus_di: number[];
// 7899   minus_di: number[];
// 7900 }
// 7901 // *CIDO - BÖLÜM - 1003 - IchimokuCloud - Ichimoku - Tenkan Kijun Senkou - Serde
// 7902 export interface IchimokuCloud {
// 7903   tenkan_sen: number[];
// 7904   kijun_sen: number[];
// 7905   senkou_span_a: number[];
// 7906   senkou_span_b: number[];
// 7907   chikou_span: number[];
// 7908 }
// 7909 // *CIDO - BÖLÜM - 1004 - ParabolicSAR - Parabolik SAR - Hızlanma - Serde
// 7910 export interface ParabolicSAR {
// 7911   acceleration: number;
// 7912   maximum: number;
// 7913   values: number[];
// 7914 }
// 7915 // *CIDO - BÖLÜM - 1005 - FibonacciRetracement - Fibonacci - Seviyeler - Salınım - Serde
// 7916 export interface FibonacciRetracement {
// 7917   swing_high: number;
// 7918   swing_low: number;
// 7919   levels: Record<string, number>;
// 7920 }
// 7921 // *CIDO - BÖLÜM - 1006 - PivotPoints - Pivot Noktaları - Destek Direnç - Serde
// 7922 export interface PivotPoints {
// 7923   pivot: number;
// 7924   resistance: number[];
// 7925   support: number[];
// 7926 }
// 7927 // *CIDO - BÖLÜM - 1007 - VolumeProfile - Hacim Profili - Fiyat Seviyesi - Hacim - Serde
// 7928 export interface VolumeProfile {
// 7929   price_levels: number[];
// 7930   volumes: number[];
// 7931   poc: number;
// 7932   value_area_high: number;
// 7933   value_area_low: number;
// 7934 }
// 7935 // *CIDO - BÖLÜM - 1008 - MarketDepth - Piyasa Derinliği - Fiyat Kümülatif - Serde
// 7936 export interface MarketDepth {
// 7937   bid_depth: [number, number][];
// 7938   ask_depth: [number, number][];
// 7939 }
// 7940 // *CIDO - BÖLÜM - 1009 - OrderFlowImbalance - Emir Akışı - Dengesizlik - Yön - Serde
// 7941 export interface OrderFlowImbalance {
// 7942   buy_volume: number;
// 7943   sell_volume: number;
// 7944   imbalance_ratio: number;
// 7945 }
// 7946 // *CIDO - BÖLÜM - 1010 - AssetCorrelationMatrix - Varlık Korelasyonu - Varlıklar - Katsayı - Serde
// 7947 export interface AssetCorrelationMatrix {
// 7948   assets: string[];
// 7949   coefficients: number[][];
// 7950 }
// 7951 // *CIDO - BÖLÜM - 1011 - CovarianceMatrix - Kovaryans - Varyans - Standart Sapma - Serde
// 7952 export interface CovarianceMatrix {
// 7953   assets: string[];
// 7954   variances: number[];
// 7955   covariances: number[][];
// 7956 }
// 7957 // *CIDO - BÖLÜM - 1012 - BetaCalculation - Beta - Benchmark - Hassasiyet - Serde
// 7958 export interface BetaCalculation {
// 7959   asset: string;
// 7960   benchmark: string;
// 7961   beta: number;
// 7962   r_squared: number;
// 7963 }
// 7964 // *CIDO - BÖLÜM - 1013 - AlphaCalculation - Alfa - Jensen - Artık Getiri - Serde
// 7965 export interface AlphaCalculation {
// 7966   portfolio: string;
// 7967   benchmark: string;
// 7968   alpha: number;
// 7969   annualized_alpha: number;
// 7970 }
// 7971 // *CIDO - BÖLÜM - 1014 - SharpeRatio - Sharpe Oranı - Getiri Risk - Risksiz Oran - Serde
// 7972 export interface SharpeRatio {
// 7973   portfolio: string;
// 7974   annual_return: number;
// 7975   annual_volatility: number;
// 7976   risk_free_rate: number;
// 7977   sharpe: number;
// 7978 }
// 7979 // *CIDO - BÖLÜM - 1015 - SortinoRatio - Sortino Oranı - Aşağı Yönlü Risk - Serde
// 7980 export interface SortinoRatio {
// 7981   portfolio: string;
// 7982   downside_deviation: number;
// 7983   sortino: number;
// 7984 }
// 7985 // *CIDO - BÖLÜM - 1016 - CalmarRatio - Calmar Oranı - Maksimum Drawdown - Serde
// 7986 export interface CalmarRatio {
// 7987   portfolio: string;
// 7988   annual_return: number;
// 7989   max_drawdown: number;
// 7990   calmar: number;
// 7991 }
// 7992 // *CIDO - BÖLÜM - 1017 - InformationRatio - Bilgi Oranı - İzleme Hatası - Serde
// 7993 export interface InformationRatio {
// 7994   portfolio: string;
// 7995   benchmark: string;
// 7996   tracking_error: number;
// 7997   information_ratio: number;
// 7998 }
// 7999 // *CIDO - BÖLÜM - 1018 - DrawdownAnalysis - Drawdown - Tepe Vadi - Süre - Serde
// 8000 export interface DrawdownAnalysis {
// 8001   max_drawdown: number;
// 8002   peak_date: string;
// 8003   trough_date: string;
// 8004   recovery_date?: string;
// 8005   duration_days: number;
// 8006 }
// 8007 // *CIDO - BÖLÜM - 1019 - PerformanceAttribution - Performans Atıf - Sektör Faktör - Katkı - Serde
// 8008 export interface PerformanceAttribution {
// 8009   portfolio: string;
// 8010   benchmark: string;
// 8011   allocation_effect: number;
// 8012   selection_effect: number;
// 8013   interaction_effect: number;
// 8014 }
// 8015 // *CIDO - BÖLÜM - 1020 - FactorModel - Faktör Modeli - Fama French - Carhart - Serde
// 8016 export interface FactorModel {
// 8017   market_beta: number;
// 8018   size_smb: number;
// 8019   value_hml: number;
// 8020   momentum_wml: number;
// 8021 }
// 8022 // *CIDO - BÖLÜM - 1021 - PrincipalComponentAnalysis - PCA - Bileşen - Varyans - Serde
// 8023 export interface PrincipalComponentAnalysis {
// 8024   n_components: number;
// 8025   components: number[][];
// 8026   loadings: number[][];
// 8027 }
// 8028 // *CIDO - BÖLÜM - 1022 - FactorLoading - Faktör Yüklemesi - Değişken - Yükleme - Serde
// 8029 export interface FactorLoading {
// 8030   variable: string;
// 8031   factor: number;
// 8032   loading: number;
// 8033 }
// 8034 // *CIDO - BÖLÜM - 1023 - EigenDecomposition - Özdeğer - Vektör - Açıklanan - Serde
// 8035 export interface EigenDecomposition {
// 8036   eigenvalues: number[];
// 8037   eigenvectors: number[][];
// 8038   explained_variance: number[];
// 8039 }
// 8040 // *CIDO - BÖLÜM - 1024 - CholeskyDecomposition - Cholesky - Alt Üçgen - Serde
// 8041 export interface CholeskyDecomposition {
// 8042   lower_triangular: number[][];
// 8043   is_positive_definite: boolean;
// 8044 }
// 8045 // *CIDO - BÖLÜM - 1025 - LUDecomposition - LU - Alt Üst - Permütasyon - Serde
// 8046 export interface LUDecomposition {
// 8047   lower: number[][];
// 8048   upper: number[][];
// 8049   permutation: number[];
// 8050 }
// 8051 // *CIDO - BÖLÜM - 1026 - QRDecomposition - QR - Dik - Üst Üçgen - Serde
// 8052 export interface QRDecomposition {
// 8053   q: number[][];
// 8054   r: number[][];
// 8055 }
// 8056 // *CIDO - BÖLÜM - 1027 - SVDDecomposition - SVD - Tekil Değer - Sol Sağ - Serde
// 8057 export interface SVDDecomposition {
// 8058   u: number[][];
// 8059   singular_values: number[];
// 8060   vt: number[][];
// 8061 }
// 8062 // *CIDO - BÖLÜM - 1028 - MatrixInversion - Matris Tersi - Koşul Numarası - Serde
// 8063 export interface MatrixInversion {
// 8064   inverse: number[][];
// 8065   condition_number: number;
// 8066 }
// 8067 // *CIDO - BÖLÜM - 1029 - LinearSystemSolver - Doğrusal Sistem - Çözüm - Artık - Serde
// 8068 export interface LinearSystemSolver {
// 8069   solution: number[];
// 8070   residual: number;
// 8071   iterations: number;
// 8072 }
// 8073 // *CIDO - BÖLÜM - 1030 - InterpolationMethod - İnterpolasyon - Doğrusal Kübik - Spline - Serde
// 8074 export interface InterpolationMethod {
// 8075   method: string;
// 8076   x: number[];
// 8077   y: number[];
// 8078   interpolated_x: number[];
// 8079   interpolated_y: number[];
// 8080 }
// 8081 // *CIDO - BÖLÜM - 1031 - SplineInterpolation - Spline - Düğümler - Katsayılar - Serde
// 8082 export interface SplineInterpolation {
// 8083   knots: number[];
// 8084   coefficients: number[][];
// 8085   degree: number;
// 8086 }
// 8087 // *CIDO - BÖLÜM - 1032 - PolynomialFitting - Polinom - Derece - Katsayılar - Serde
// 8088 export interface PolynomialFitting {
// 8089   degree: number;
// 8090   coefficients: number[];
// 8091   r_squared: number;
// 8092 }
// 8093 // *CIDO - BÖLÜM - 1033 - CurveFitting - Eğri Uydurma - Model - Parametreler - Serde
// 8094 export interface CurveFitting {
// 8095   model: string;
// 8096   parameters: number[];
// 8097   mse: number;
// 8098 }
// 8099 // *CIDO - BÖLÜM - 1034 - ExtrapolationMethod - Ekstrapolasyon - Yöntem - Tahmin - Serde
// 8100 export interface ExtrapolationMethod {
// 8101   method: string;
// 8102   data_x: number[];
// 8103   data_y: number[];
// 8104   extrapolated_x: number[];
// 8105   extrapolated_y: number[];
// 8106 }
// 8107 // *CIDO - BÖLÜM - 1035 - SignalProcessing - Sinyal İşleme - Filtre - Kesme Frekansı - Serde
// 8108 export interface SignalProcessing {
// 8109   filter_type: string;
// 8110   cutoff_frequency: number;
// 8111   sampling_rate: number;
// 8112   filtered_signal: number[];
// 8113 }
// 8114 // *CIDO - BÖLÜM - 1036 - LowPassFilter - Alçak Geçiren - Butterworth - Derece - Serde
// 8115 export interface LowPassFilter {
// 8116   order: number;
// 8117   cutoff: number;
// 8118   type: string;
// 8119 }
// 8120 // *CIDO - BÖLÜM - 1037 - HighPassFilter - Yüksek Geçiren - Chebyshev - Dalgalanma - Serde
// 8121 export interface HighPassFilter {
// 8122   order: number;
// 8123   cutoff: number;
// 8124   ripple_db: number;
// 8125 }
// 8126 // *CIDO - BÖLÜM - 1038 - BandPassFilter - Bant Geçiren - Alt Üst Kesim - Serde
// 8127 export interface BandPassFilter {
// 8128   low_cut: number;
// 8129   high_cut: number;
// 8130   order: number;
// 8131 }
// 8132 // *CIDO - BÖLÜM - 1039 - FFTResult - FFT - Frekans Genlik - Faz - Serde
// 8133 export interface FFTResult {
// 8134   frequencies: number[];
// 8135   amplitudes: number[];
// 8136   phases: number[];
// 8137 }
// 8138 // *CIDO - BÖLÜM - 1040 - STFTResult - STFT - Zaman Frekans - Spektrogram - Serde
// 8139 export interface STFTResult {
// 8140   times: number[];
// 8141   frequencies: number[];
// 8142   spectrogram: number[][];
// 8143 }
// 8144 // *CIDO - BÖLÜM - 1041 - WaveletTransform - Dalgacık - Anne Dalgacık - Seviye - Serde
// 8145 export interface WaveletTransform {
// 8146   wavelet: string;
// 8147   level: number;
// 8148   coefficients: number[][];
// 8149 }
// 8150 // *CIDO - BÖLÜM - 1042 - HilbertTransform - Hilbert - Anlık Genlik - Faz - Serde
// 8151 export interface HilbertTransform {
// 8152   analytic_signal: number[][];
// 8153   instantaneous_amplitude: number[];
// 8154   instantaneous_phase: number[];
// 8155   instantaneous_frequency: number[];
// 8156 }
// 8157 // *CIDO - BÖLÜM - 1043 - ConvolutionFilter - Evrişim - Çekirdek - Padding - Serde
// 8158 export interface ConvolutionFilter {
// 8159   kernel: number[];
// 8160   padding: string;
// 8161   filtered: number[];
// 8162 }
// 8163 // *CIDO - BÖLÜM - 1044 - DeconvolutionFilter - Ters Evrişim - PSF - İterasyon - Serde
// 8164 export interface DeconvolutionFilter {
// 8165   psf: number[];
// 8166   iterations: number;
// 8167   restored_signal: number[];
// 8168 }
// 8169 // *CIDO - BÖLÜM - 1045 - KalmanFilter - Kalman - Durum Geçişi - Gözlem - Serde
// 8170 export interface KalmanFilter {
// 8171   state_estimate: number[];
// 8172   covariance: number[][];
// 8173   kalman_gain: number[][];
// 8174 }
// 8175 // *CIDO - BÖLÜM - 1046 - ParticleFilter - Parçacık Filtresi - Parçacık Sayısı - Yeniden Örnekleme - Serde
// 8176 export interface ParticleFilter {
// 8177   num_particles: number;
// 8178   particles: number[][];
// 8179   weights: number[];
// 8180   resampling_method: string;
// 8181 }
// 8182 // *CIDO - BÖLÜM - 1047 - MovingAverageFilter - Hareketli Ortalama - Pencere - Gecikme - Serde
// 8183 export interface MovingAverageFilter {
// 8184   window_size: number;
// 8185   lag: number;
// 8186   smoothed: number[];
// 8187 }
// 8188 // *CIDO - BÖLÜM - 1048 - MedianFilter - Medyan Filtre - Pencere - Aykırı Değer - Serde
// 8189 export interface MedianFilter {
// 8190   window_size: number;
// 8191   filtered: number[];
// 8192 }
// 8193 // *CIDO - BÖLÜM - 1049 - SavitzkyGolayFilter - Savitzky-Golay - Pencere Derece - Serde
// 8194 export interface SavitzkyGolayFilter {
// 8195   window_size: number;
// 8196   poly_order: number;
// 8197   coefficients: number[];
// 8198 }
// 8199 // *CIDO - BÖLÜM - 1050 - ButterworthFilter - Butterworth - Derece Kesim - Serde
// 8200 export interface ButterworthFilter {
// 8201   order: number;
// 8202   cutoff: number;
// 8203   type: string;
// 8204 }
// 8205 // *CIDO - BÖLÜM - 1051 - NotchFilter - Çentik Filtre - Merkez Frekans - Q Faktörü - Serde
// 8206 export interface NotchFilter {
// 8207   center_frequency: number;
// 8208   q_factor: number;
// 8209 }
// 8210 // *CIDO - BÖLÜM - 1052 - PeakDetection - Tepe Tespiti - Yükseklik - Mesafe - Serde
// 8211 export interface PeakDetection {
// 8212   peaks: number[];
// 8213   heights: number[];
// 8214   prominence: number[];
// 8215 }
// 8216 // *CIDO - BÖLÜM - 1053 - ValleyDetection - Vadi Tespiti - Derinlik - Genişlik - Serde
// 8217 export interface ValleyDetection {
// 8218   valleys: number[];
// 8219   depths: number[];
// 8220 }
// 8221 // *CIDO - BÖLÜM - 1054 - ZeroCrossingRate - Sıfır Geçiş Oranı - Pencere - Oran - Serde
// 8222 export interface ZeroCrossingRate {
// 8223   window_size: number;
// 8224   rates: number[];
// 8225 }
// 8226 // *CIDO - BÖLÜM - 1055 - AutocorrelationFunction - Otokorelasyon - Gecikme - Korelasyon - Serde
// 8227 export interface AutocorrelationFunction {
// 8228   lags: number[];
// 8229   correlations: number[];
// 8230   confidence_interval: [number, number];
// 8231 }
// 8232 // *CIDO - BÖLÜM - 1056 - PartialAutocorrelation - Kısmi Otokorelasyon - Gecikme - Serde
// 8233 export interface PartialAutocorrelation {
// 8234   lags: number[];
// 8235   pacf: number[];
// 8236 }
// 8237 // *CIDO - BÖLÜM - 1057 - CrossCorrelation - Çapraz Korelasyon - İki Sinyal - Gecikme - Serde
// 8238 export interface CrossCorrelation {
// 8239   lags: number[];
// 8240   correlations: number[];
// 8241   max_correlation_lag: number;
// 8242 }
// 8243 // *CIDO - BÖLÜM - 1058 - CoherenceFunction - Koherens - Frekans - Büyüklük - Serde
// 8244 export interface CoherenceFunction {
// 8245   frequencies: number[];
// 8246   coherence: number[];
// 8247 }
// 8248 // *CIDO - BÖLÜM - 1059 - PowerSpectralDensity - Güç Spektrumu - Welch - Çözünürlük - Serde
// 8249 export interface PowerSpectralDensity {
// 8250   frequencies: number[];
// 8251   psd: number[];
// 8252   method: string;
// 8253 }
// 8254 // *CIDO - BÖLÜM - 1060 - CepstrumAnalysis - Kepstrum - Quefrency - Serde
// 8255 export interface CepstrumAnalysis {
// 8256   quefrency: number[];
// 8257   cepstrum: number[];
// 8258 }
// 8259 // *CIDO - BÖLÜM - 1061 - EnvelopeDetection - Zarf Tespiti - Hilbert - Tepe - Serde
// 8260 export interface EnvelopeDetection {
// 8261   method: string;
// 8262   envelope: number[];
// 8263 }
// 8264 // *CIDO - BÖLÜM - 1062 - SNRCalculation - SNR - Sinyal Gürültü - dB - Serde
// 8265 export interface SNRCalculation {
// 8266   signal_power: number;
// 8267   noise_power: number;
// 8268   snr_db: number;
// 8269 }
// 8270 // *CIDO - BÖLÜM - 1063 - DistortionMeasurement - Bozulma - THD - SINAD - Serde
// 8271 export interface DistortionMeasurement {
// 8272   thd_percent: number;
// 8273   sinad_db: number;
// 8274 }
// 8275 // *CIDO - BÖLÜM - 1064 - DynamicRange - Dinamik Aralık - Tepe Dip - dB - Serde
// 8276 export interface DynamicRange {
// 8277   peak_db: number;
// 8278   noise_floor_db: number;
// 8279   dynamic_range_db: number;
// 8280 }
// 8281 // *CIDO - BÖLÜM - 1065 - AudioFeatures - Ses Özellikleri - MFCC Spektral - ZeroCross - Serde
// 8282 export interface AudioFeatures {
// 8283   mfcc: number[][];
// 8284   spectral_centroid: number[];
// 8285   spectral_bandwidth: number[];
// 8286   zero_crossing_rate: number[];
// 8287 }
// 8288 // *CIDO - BÖLÜM - 1066 - ImageFilter - Görsel Filtresi - Gauss Median - Çekirdek - Serde
// 8289 export interface ImageFilter {
// 8290   type: string;
// 8291   kernel_size: number;
// 8292   sigma: number;
// 8293 }
// 8294 // *CIDO - BÖLÜM - 1067 - EdgeDetection - Kenar Tespiti - Canny Sobel - Eşik - Serde
// 8295 export interface EdgeDetection {
// 8296   method: string;
// 8297   low_threshold: number;
// 8298   high_threshold: number;
// 8299 }
// 8300 // *CIDO - BÖLÜM - 1068 - CornerDetection - Köşe Tespiti - Harris - Kalite Seviyesi - Serde
// 8301 export interface CornerDetection {
// 8302   method: string;
// 8303   quality_level: number;
// 8304   min_distance: number;
// 8305   corners: [number, number][];
// 8306 }
// 8307 // *CIDO - BÖLÜM - 1069 - BlobDetection - Leke Tespiti - LoG DoG - Eşik - Serde
// 8308 export interface BlobDetection {
// 8309   method: string;
// 8310   threshold: number;
// 8311   min_area: number;
// 8312   max_area: number;
// 8313 }
// 8314 // *CIDO - BÖLÜM - 1070 - HistogramEqualization - Histogram - Eşitleme - Kümülatif - Serde
// 8315 export interface HistogramEqualization {
// 8316   method: string;
// 8317   bins: number;
// 8318   range: [number, number];
// 8319 }
// 8320 // *CIDO - BÖLÜM - 1071 - MorphologicalOperation - Morfolojik - Erozyon Genişleme - Yapı Elemanı - Serde
// 8321 export interface MorphologicalOperation {
// 8322   operation: string;
// 8323   structuring_element: string;
// 8324   iterations: number;
// 8325 }
// 8326 // *CIDO - BÖLÜM - 1072 - ThresholdingMethod - Eşikleme - Otsu Uyarlanabilir - Blok Boyutu - Serde
// 8327 export interface ThresholdingMethod {
// 8328   method: string;
// 8329   block_size: number;
// 8330   constant: number;
// 8331 }
// 8332 // *CIDO - BÖLÜM - 1073 - SegmentationMask - Segmentasyon - Maske - Sınıf - Serde
// 8333 export interface SegmentationMask {
// 8334   class_id: number;
// 8335   class_name: string;
// 8336   mask: number[][];
// 8337   confidence: number;
// 8338 }
// 8339 // *CIDO - BÖLÜM - 1074 - ObjectDetection - Nesne Tespiti - Sınırlayıcı Kutu - Sınıf - Serde
// 8340 export interface ObjectDetection {
// 8341   bbox: [number, number, number, number];
// 8342   class_name: string;
// 8343   confidence: number;
// 8344 }
// 8345 // *CIDO - BÖLÜM - 1075 - FaceDetection - Yüz Tespiti - Landmark - Göz Burun - Serde
// 8346 export interface FaceDetection {
// 8347   bbox: [number, number, number, number];
// 8348   landmarks: [number, number][];
// 8349   confidence: number;
// 8350 }
// 8351 // *CIDO - BÖLÜM - 1076 - OpticalFlow - Optik Akış - Seyrek Yoğun - Vektör - Serde
// 8352 export interface OpticalFlow {
// 8353   method: string;
// 8354   flow_vectors: [number, number][][];
// 8355 }
// 8356 // *CIDO - BÖLÜM - 1077 - TemplateMatching - Şablon Eşleme - Benzerlik - Konum - Serde
// 8357 export interface TemplateMatching {
// 8358   method: string;
// 8359   similarity: number;
// 8360   location: [number, number];
// 8361 }
// 8362 // *CIDO - BÖLÜM - 1078 - FeatureMatching - Özellik Eşleme - ORB SIFT - Eşleşme - Serde
// 8363 export interface FeatureMatching {
// 8364   detector: string;
// 8365   matches: [number, number][];
// 8366   match_count: number;
// 8367 }
// 8368 // *CIDO - BÖLÜM - 1079 - HomographyEstimation - Homografi - Dönüşüm Matrisi - İç Nokta - Serde
// 8369 export interface HomographyEstimation {
// 8370   matrix: number[][];
// 8371   inliers: number;
// 8372   reprojection_error: number;
// 8373 }
// 8374 // *CIDO - BÖLÜM - 1080 - CameraCalibration - Kamera Kalibrasyonu - İçsel - Bozulma - Serde
// 8375 export interface CameraCalibration {
// 8376   intrinsics: number[][];
// 8377   distortion: number[];
// 8378   reprojection_error: number;
// 8379 }
// 8380 // *CIDO - BÖLÜM - 1081 - StereoRectification - Stereo - Doğrultma - Temel Matris - Serde
// 8381 export interface StereoRectification {
// 8382   fundamental_matrix: number[][];
// 8383   essential_matrix: number[][];
// 8384   rectification_matrices: number[][][];
// 8385 }
// 8386 // *CIDO - BÖLÜM - 1082 - DepthEstimation - Derinlik Tahmini - Eşitsizlik - Baz - Serde
// 8387 export interface DepthEstimation {
// 8388   disparity: number[][];
// 8389   depth: number[][];
// 8390   baseline: number;
// 8391 }
// 8392 // *CIDO - BÖLÜM - 1083 - PointCloudGeneration - Nokta Bulutu - 3D Koordinat - Renk - Serde
// 8393 export interface PointCloudGeneration {
// 8394   points: [number, number, number][];
// 8395   colors: [number, number, number][];
// 8396   point_count: number;
// 8397 }
// 8398 // *CIDO - BÖLÜM - 1084 - MeshReconstruction - Ağ - Üçgenler - Köşeler - Serde
// 8399 export interface MeshReconstruction {
// 8400   vertices: [number, number, number][];
// 8401   triangles: [number, number, number][];
// 8402   faces: number;
// 8403 }
// 8404 // *CIDO - BÖLÜM - 1085 - VolumeRendering - Hacim - Işın İzleme - Aktarım İşlevi - Serde
// 8405 export interface VolumeRendering {
// 8406   method: string;
// 8407   transfer_function: [number, number, number, number][];
// 8408 }
// 8409 // *CIDO - BÖLÜM - 1086 - ImagePyramid - Görsel Piramidi - Seviyeler - Ölçek - Serde
// 8410 export interface ImagePyramid {
// 8411   levels: number;
// 8412   scale_factor: number;
// 8413   images: string[];
// 8414 }
// 8415 // *CIDO - BÖLÜM - 1087 - SuperResolution - Süper Çözünürlük - Ölçek - Model - Serde
// 8416 export interface SuperResolution {
// 8417   scale: number;
// 8418   model: string;
// 8419   output_width: number;
// 8420   output_height: number;
// 8421 }
// 8422 // *CIDO - BÖLÜM - 1088 - ImageDenoising - Görsel Gürültü Giderme - Yöntem - Güç - Serde
// 8423 export interface ImageDenoising {
// 8424   method: string;
// 8425   strength: number;
// 8426 }
// 8427 // *CIDO - BÖLÜM - 1089 - ImageInpainting - Görsel İç Boyama - Maske - Yama Boyutu - Serde
// 8428 export interface ImageInpainting {
// 8429   mask: number[][];
// 8430   patch_size: number;
// 8431   method: string;
// 8432 }
// 8433 // *CIDO - BÖLÜM - 1090 - StyleTransfer - Stil Transferi - Stil Görseli - İçerik Ağırlık - Serde
// 8434 export interface StyleTransfer {
// 8435   style_image_url: string;
// 8436   content_weight: number;
// 8437   style_weight: number;
// 8438   iterations: number;
// 8439 }
// 8440 // *CIDO - BÖLÜM - 1091 - ImageColorization - Renklendirme - Model - Palet - Serde
// 8441 export interface ImageColorization {
// 8442   model: string;
// 8443   palette: [number, number, number][];
// 8444 }
// 8445 // *CIDO - BÖLÜM - 1092 - ImageCompression - Görsel Sıkıştırma - Kalite - Biçim - Serde
// 8446 export interface ImageCompression {
// 8447   quality: number;
// 8448   format: string;
// 8449   original_size_bytes: number;
// 8450   compressed_size_bytes: number;
// 8451   compression_ratio: number;
// 8452 }
// 8453 // *CIDO - BÖLÜM - 1093 - WatermarkEmbedding - Filigran - Görünürlük - Konum - Serde
// 8454 export interface WatermarkEmbedding {
// 8455   text: string;
// 8456   opacity: number;
// 8457   position: string;
// 8458   rotation_degrees: number;
// 8459 }
// 8460 // *CIDO - BÖLÜM - 1094 - TextRecognition - Metin Tanıma - OCR - Dil - Serde
// 8461 export interface TextRecognition {
// 8462   text: string;
// 8463   confidence: number;
// 8464   language: string;
// 8465   bounding_boxes: [number, number, number, number][];
// 8466 }
// 8467 // *CIDO - BÖLÜM - 1095 - BarcodeDetection - Barkod - Tip Veri - Konum - Serde
// 8468 export interface BarcodeDetection {
// 8469   type: string;
// 8470   data: string;
// 8471   bbox: [number, number, number, number];
// 8472 }
// 8473 // *CIDO - BÖLÜM - 1096 - QRCodeGeneration - QR Kod - Veri - Hata Düzeltme - Serde
// 8474 export interface QRCodeGeneration {
// 8475   data: string;
// 8476   error_correction: string;
// 8477   size: number;
// 8478   image_base64: string;
// 8479 }
// 8480 // *CIDO - BÖLÜM - 1097 - ImageSimilarity - Görsel Benzerlik - Hash - Mesafe - Serde
// 8481 export interface ImageSimilarity {
// 8482   method: string;
// 8483   distance: number;
// 8484   similar: boolean;
// 8485 }
// 8486 // *CIDO - BÖLÜM - 1098 - ImageHash - Görsel Hash - Algısal - Fark - Serde
// 8487 export interface ImageHash {
// 8488   algorithm: string;
// 8489   hash_hex: string;
// 8490   hash_bits: number;
// 8491 }
// 8492 // *CIDO - BÖLÜM - 1099 - DuplicateDetection - Kopya Tespiti - Hash - Eşik - Serde
// 8493 export interface DuplicateDetection {
// 8494   hash_method: string;
// 8495   threshold: number;
// 8496   duplicates: [string, string][];
// 8497 }
// 8498 // *CIDO - BÖLÜM - 1100 - NSFWDetection - NSFW Tespiti - Sınıf - Puan - Serde
// 8499 export interface NSFWDetection {
// 8500   class: string;
// 8501   score: number;
// 8502   safe: boolean;
// 8503 }
// 8504 // *CIDO - BÖLÜM - 1101 - ContentModeration - İçerik Moderatörü - İhlal - Eylem - Serde
// 8505 export interface ContentModeration {
// 8506   violations: string[];
// 8507   confidence: number;
// 8508   action: string;
// 8509   review_required: boolean;
// 8510 }
// 8511 // *CIDO - BÖLÜM - 1102 - SentimentAnalysis - Duygu Analizi - Pozitif Negatif - Nötr - Serde
// 8512 export interface SentimentAnalysis {
// 8513   sentiment: string;
// 8514   score: number;
// 8515   magnitude: number;
// 8516 }
// 8517 // *CIDO - BÖLÜM - 1103 - EntityExtraction - Varlık Çıkarma - Tip Metin - Konum - Serde
// 8518 export interface EntityExtraction {
// 8519   entities: EntityInfo[];
// 8520 }
// 8521 // *CIDO - BÖLÜM - 1104 - EntityInfo - Varlık Bilgisi - İsim Tip - Başlangıç Bitiş - Serde
// 8522 export interface EntityInfo {
// 8523   name: string;
// 8524   type: string;
// 8525   start: number;
// 8526   end: number;
// 8527   confidence: number;
// 8528 }
// 8529 // *CIDO - BÖLÜM - 1105 - KeywordExtraction - Anahtar Kelime - Puan - Sıralama - Serde
// 8530 export interface KeywordExtraction {
// 8531   keywords: KeywordScore[];
// 8532 }
// 8533 // *CIDO - BÖLÜM - 1106 - KeywordScore - Anahtar Kelime Puanı - Metin - Ağırlık - Serde
// 8534 export interface KeywordScore {
// 8535   keyword: string;
// 8536   score: number;
// 8537 }
// 8538 // *CIDO - BÖLÜM - 1107 - TopicModeling - Konu Modelleme - LDA - Konu Kelime - Serde
// 8539 export interface TopicModeling {
// 8540   topics: TopicInfo[];
// 8541   coherence_score: number;
// 8542 }
// 8543 // *CIDO - BÖLÜM - 1108 - TopicInfo - Konu Bilgisi - Kimlik Kelimeler - Ağırlık - Serde
// 8544 export interface TopicInfo {
// 8545   id: number;
// 8546   words: string[];
// 8547   weights: number[];
// 8548 }
// 8549 // *CIDO - BÖLÜM - 1109 - TextClassification - Metin Sınıflandırma - Etiket - Güven - Serde
// 8550 export interface TextClassification {
// 8551   label: string;
// 8552   confidence: number;
// 8553 }
// 8554 // *CIDO - BÖLÜM - 1110 - SummarizationConfig - Özetleme - Maks Uzunluk - Oran - Serde
// 8555 export interface SummarizationConfig {
// 8556   max_length: number;
// 8557   min_length: number;
// 8558   ratio: number;
// 8559 }
// 8560 // *CIDO - BÖLÜM - 1111 - AbstractiveSummary - Soyut Özet - Model - Metin - Serde
// 8561 export interface AbstractiveSummary {
// 8562   summary: string;
// 8563   model: string;
// 8564   rouge_score: number;
// 8565 }
// 8566 // *CIDO - BÖLÜM - 1112 - ExtractiveSummary - Çıkarımsal Özet - Cümleler - Puan - Serde
// 8567 export interface ExtractiveSummary {
// 8568   sentences: string[];
// 8569   scores: number[];
// 8570 }
// 8571 // *CIDO - BÖLÜM - 1113 - QuestionAnswering - Soru Cevaplama - Bağlam - Cevap - Serde
// 8572 export interface QuestionAnswering {
// 8573   question: string;
// 8574   answer: string;
// 8575   context: string;
// 8576   confidence: number;
// 8577 }
// 8578 // *CIDO - BÖLÜM - 1114 - MachineTranslation - Makine Çevirisi - Kaynak Hedef - Model - Serde
// 8579 export interface MachineTranslation {
// 8580   source_language: string;
// 8581   target_language: string;
// 8582   translated_text: string;
// 8583   model: string;
// 8584 }
// 8585 // *CIDO - BÖLÜM - 1115 - TransliterationResult - Transliterasyon - Orijinal - Dönüştürülmüş - Serde
// 8586 export interface TransliterationResult {
// 8587   original: string;
// 8588   transliterated: string;
// 8589   script_from: string;
// 8590   script_to: string;
// 8591 }
// 8592 // *CIDO - BÖLÜM - 1116 - GrammarCorrection - Dilbilgisi - Hatalar - Düzeltme - Serde
// 8593 export interface GrammarCorrection {
// 8594   original: string;
// 8595   corrected: string;
// 8596   errors: GrammarError[];
// 8597 }
// 8598 // *CIDO - BÖLÜM - 1117 - GrammarError - Dilbilgisi Hatası - Konum - Öneri - Serde
// 8599 export interface GrammarError {
// 8600   start: number;
// 8601   end: number;
// 8602   suggestion: string;
// 8603   type: string;
// 8604 }
// 8605 // *CIDO - BÖLÜM - 1118 - SpellChecker - Yazım Denetleyici - Hatalı Kelime - Öneriler - Serde
// 8606 export interface SpellChecker {
// 8607   misspelled: string;
// 8608   suggestions: string[];
// 8609   context: string;
// 8610 }
// 8611 // *CIDO - BÖLÜM - 1119 - IntentRecognition - Niyet Tanıma - Etiket - Varlıklar - Serde
// 8612 export interface IntentRecognition {
// 8613   intent: string;
// 8614   confidence: number;
// 8615   entities: Record<string, string>;
// 8616 }
// 8617 // *CIDO - BÖLÜM - 1120 - SlotFilling - Slot Doldurma - Niyet - Slotlar - Serde
// 8618 export interface SlotFilling {
// 8619   intent: string;
// 8620   slots: Record<string, string>;
// 8621   missing_slots: string[];
// 8622 }
// 8623 // *CIDO - BÖLÜM - 1121 - DialogueState - Diyalog Durumu - Tur - Bağlam - Serde
// 8624 export interface DialogueState {
// 8625   turn: number;
// 8626   intent: string;
// 8627   slots: Record<string, string>;
// 8628   context: Record<string, unknown>;
// 8629 }
// 8630 // *CIDO - BÖLÜM - 1122 - ResponseGeneration - Yanıt Üretimi - Şablon - Parametre - Serde
// 8631 export interface ResponseGeneration {
// 8632   template_id: string;
// 8633   parameters: Record<string, string>;
// 8634   response_text: string;
// 8635 }
// 8636 // *CIDO - BÖLÜM - 1123 - PromptTemplate - İstem Şablonu - Değişkenler - Metin - Serde
// 8637 export interface PromptTemplate {
// 8638   name: string;
// 8639   template: string;
// 8640   variables: string[];
// 8641 }
// 8642 // *CIDO - BÖLÜM - 1124 - PromptConfig - İstem Konfigürasyonu - Sistem Bağlam - Örnekler - Serde
// 8643 export interface PromptConfig {
// 8644   system_prompt: string;
// 8645   context: string;
// 8646   examples: PromptExample[];
// 8647   max_tokens: number;
// 8648 }
// 8649 // *CIDO - BÖLÜM - 1125 - PromptExample - İstem Örneği - Kullanıcı Asistan - Serde
// 8650 export interface PromptExample {
// 8651   user: string;
// 8652   assistant: string;
// 8653 }
// 8654 // *CIDO - BÖLÜM - 1126 - ChainOfThought - Düşünce Zinciri - Adımlar - Sonuç - Serde
// 8655 export interface ChainOfThought {
// 8656   question: string;
// 8657   reasoning_steps: string[];
// 8658   answer: string;
// 8659 }
// 8660 // *CIDO - BÖLÜM - 1127 - FewShotExample - Az Örnekli - Girdi Çıktı - Açıklama - Serde
// 8661 export interface FewShotExample {
// 8662   input: string;
// 8663   output: string;
// 8664   explanation: string;
// 8665 }
// 8666 // *CIDO - BÖLÜM - 1128 - ToolUse - Araç Kullanımı - İsim Parametre - Sonuç - Serde
// 8667 export interface ToolUse {
// 8668   tool_name: string;
// 8669   parameters: Record<string, unknown>;
// 8670   result: unknown;
// 8671   error?: string;
// 8672 }
// 8673 // *CIDO - BÖLÜM - 1129 - FunctionCalling - Fonksiyon Çağrısı - İsim Argüman - Yanıt - Serde
// 8674 export interface FunctionCalling {
// 8675   function_name: string;
// 8676   arguments: Record<string, unknown>;
// 8677   response: unknown;
// 8678 }
// 8679 // *CIDO - BÖLÜM - 1130 - AgentAction - Ajan Eylemi - Tip - Parametre - Serde
// 8680 export interface AgentAction {
// 8681   type: string;
// 8682   params: Record<string, unknown>;
// 8683   reasoning: string;
// 8684 }
// 8685 // *CIDO - BÖLÜM - 1131 - AgentMemory - Ajan Hafızası - Kısa Uzun - Özet - Serde
// 8686 export interface AgentMemory {
// 8687   short_term: string[];
// 8688   long_term_summary: string;
// 8689   max_short_term_items: number;
// 8690 }
// 8691 // *CIDO - BÖLÜM - 1132 - ReActLoop - ReAct Döngüsü - Düşünce Eylem - Gözlem - Serde
// 8692 export interface ReActLoop {
// 8693   thought: string;
// 8694   action: string;
// 8695   observation: string;
// 8696   iterations: number;
// 8697 }
// 8698 // *CIDO - BÖLÜM - 1133 - PlanAndExecute - Planla Uygula - Plan Adımları - Sonuç - Serde
// 8699 export interface PlanAndExecute {
// 8700   plan: string[];
// 8701   current_step: number;
// 8702   results: string[];
// 8703   final_answer: string;
// 8704 }
// 8705 // *CIDO - BÖLÜM - 1134 - ReflectionAgent - Yansıma - Öz Eleştiri - İyileştirme - Serde
// 8706 export interface ReflectionAgent {
// 8707   initial_response: string;
// 8708   self_critique: string;
// 8709   refined_response: string;
// 8710 }
// 8711 // *CIDO - BÖLÜM - 1135 - MultiAgentSystem - Çok Ajanlı - Ajan Rolleri - Görev - Serde
// 8712 export interface MultiAgentSystem {
// 8713   agents: MultiAgent[];
// 8714   task: string;
// 8715   result: string;
// 8716 }
// 8717 // *CIDO - BÖLÜM - 1136 - MultiAgent - Çoklu Ajan - İsim Rol - Yetenek - Serde
// 8718 export interface MultiAgent {
// 8719   name: string;
// 8720   role: string;
// 8721   capability: string;
// 8722 }
// 8723 // *CIDO - BÖLÜM - 1137 - RAGPipeline - RAG - Alma - Üretme - Serde
// 8724 export interface RAGPipeline {
// 8725   query: string;
// 8726   retrieved_docs: string[];
// 8727   context: string;
// 8728   generated_answer: string;
// 8729 }
// 8730 // *CIDO - BÖLÜM - 1138 - DocumentChunking - Belge Parçalama - Boyut - Örtüşme - Serde
// 8731 export interface DocumentChunking {
// 8732   chunk_size: number;
// 8733   overlap: number;
// 8734   chunks: string[];
// 8735 }
// 8736 // *CIDO - BÖLÜM - 1139 - DocumentLoader - Belge Yükleyici - Tür - Yol - Serde
// 8737 export interface DocumentLoader {
// 8738   type: string;
// 8739   path: string;
// 8740   metadata: Record<string, unknown>;
// 8741 }
// 8742 // *CIDO - BÖLÜM - 1140 - VectorStoreConfig - Vektör Deposu - Arka Uç - Boyut - Serde
// 8743 export interface VectorStoreConfig {
// 8744   backend: string;
// 8745   dimensions: number;
// 8746   metric: string;
// 8747 }
// 8748 // *CIDO - BÖLÜM - 1141 - RetrieverConfig - Alıcı Konfigürasyonu - Tip - TopK - Serde
// 8749 export interface RetrieverConfig {
// 8750   type: string;
// 8751   top_k: number;
// 8752   fetch_k: number;
// 8753   lambda_mult: number;
// 8754 }
// 8755 // *CIDO - BÖLÜM - 1142 - LLMConfig - LLM Konfigürasyonu - Model Sağlayıcı - Serde
// 8756 export interface LLMConfig {
// 8757   model: string;
// 8758   provider: string;
// 8759   temperature: number;
// 8760   max_tokens: number;
// 8761   stop_sequences: string[];
// 8762 }
// 8763 // *CIDO - BÖLÜM - 1143 - EmbeddingModelConfig - Gömme Modeli - Sağlayıcı Boyut - Serde
// 8764 export interface EmbeddingModelConfig {
// 8765   model: string;
// 8766   provider: string;
// 8767   dimensions: number;
// 8768   max_input_tokens: number;
// 8769 }
// 8770 // *CIDO - BÖLÜM - 1144 - ModelComparison - Model Karşılaştırması - Metrik - Değerler - Serde
// 8771 export interface ModelComparison {
// 8772   metric: string;
// 8773   model_scores: Record<string, number>;
// 8774   best_model: string;
// 8775 }
// 8776 // *CIDO - BÖLÜM - 1145 - ModelSelection - Model Seçimi - Kriter - Seçilen - Serde
// 8777 export interface ModelSelection {
// 8778   criteria: string[];
// 8779   candidates: string[];
// 8780   selected: string;
// 8781   reasoning: string;
// 8782 }
// 8783 // *CIDO - BÖLÜM - 1146 - CostOptimization - Maliyet Optimizasyonu - Token Maliyet - Önbellek - Serde
// 8784 export interface CostOptimization {
// 8785   input_cost_per_1k: number;
// 8786   output_cost_per_1k: number;
// 8787   cache_hit_rate: number;
// 8788   estimated_savings: number;
// 8789 }
// 8790 // *CIDO - BÖLÜM - 1147 - TokenCounting - Token Sayımı - Girdi Çıktı - Toplam - Serde
// 8791 export interface TokenCounting {
// 8792   input_tokens: number;
// 8793   output_tokens: number;
// 8794   total_tokens: number;
// 8795   tokenizer: string;
// 8796 }
// 8797 // *CIDO - BÖLÜM - 1148 - RateLimitStrategy - Hız Sınırı - İstek Dakika - Bekleme - Serde
// 8798 export interface RateLimitStrategy {
// 8799   requests_per_minute: number;
// 8800   burst_limit: number;
// 8801   wait_strategy: string;
// 8802 }
// 8803 // *CIDO - BÖLÜM - 1149 - RetryStrategy - Yeniden Deneme - Maks Gecikme - Jitter - Serde
// 8804 export interface RetryStrategy {
// 8805   max_retries: number;
// 8806   initial_delay_ms: number;
// 8807   max_delay_ms: number;
// 8808   jitter: boolean;
// 8809 }
// 8810 // *CIDO - BÖLÜM - 1150 - FallbackConfig - Yedek Konfigürasyonu - Modeller - Eşik - Serde
// 8811 export interface FallbackConfig {
// 8812   primary_model: string;
// 8813   fallback_models: string[];
// 8814   error_threshold: number;
// 8815 }
// 8816 // *CIDO - BÖLÜM - 1151 - OutputParser - Çıktı Ayrıştırıcı - Tip - Şema - Serde
// 8817 export interface OutputParser {
// 8818   type: string;
// 8819   schema: Record<string, string>;
// 8820   format_instructions: string;
// 8821 }
// 8822 // *CIDO - BÖLÜM - 1152 - JSONOutputParser - JSON Ayrıştırıcı - Şema - Onarım - Serde
// 8823 export interface JSONOutputParser {
// 8824   schema: Record<string, unknown>;
// 8825   repair_json: boolean;
// 8826 }
// 8827 // *CIDO - BÖLÜM - 1153 - StructuredOutput - Yapılandırılmış Çıktı - Tip - Değer - Serde
// 8828 export interface StructuredOutput {
// 8829   type: string;
// 8830   value: unknown;
// 8831   valid: boolean;
// 8832 }
// 8833 // *CIDO - BÖLÜM - 1154 - HumanFeedback - İnsan Geri Bildirimi - Değerlendirme - Düzeltme - Serde
// 8834 export interface HumanFeedback {
// 8835   rating: number;
// 8836   correction: string;
// 8837   feedback_text: string;
// 8838   timestamp: number;
// 8839 }
// 8840 // *CIDO - BÖLÜM - 1155 - RLHFTraining - RLHF - Tercih Verisi - Ödül Modeli - Serde
// 8841 export interface RLHFTraining {
// 8842   preference_pairs: [string, string][];
// 8843   reward_model: string;
// 8844   policy_model: string;
// 8845 }
// 8846 // *CIDO - BÖLÜM - 1156 - ConstitutionalAI - Anayasal AI - İlke - Eleştiri - Revizyon - Serde
// 8847 export interface ConstitutionalAI {
// 8848   principles: string[];
// 8849   critique: string;
// 8850   revision: string;
// 8851 }
// 8852 // *CIDO - BÖLÜM - 1157 - GuardrailConfig - Korkuluk - Girdi Çıktı - Kural - Serde
// 8853 export interface GuardrailConfig {
// 8854   input_rules: string[];
// 8855   output_rules: string[];
// 8856   action: string;
// 8857 }
// 8858 // *CIDO - BÖLÜM - 1158 - BiasDetection - Önyargı Tespiti - Tür - Puan - Serde
// 8859 export interface BiasDetection {
// 8860   bias_type: string;
// 8861   score: number;
// 8862   affected_group: string;
// 8863   recommendation: string;
// 8864 }
// 8865 // *CIDO - BÖLÜM - 1159 - ToxicityFilter - Toksisite Filtresi - Puan - Eylem - Serde
// 8866 export interface ToxicityFilter {
// 8867   toxicity_score: number;
// 8868   categories: Record<string, number>;
// 8869   action: string;
// 8870 }
// 8871 // *CIDO - BÖLÜM - 1160 - HallucinationCheck - Halüsinasyon - Doğruluk - Kaynak - Serde
// 8872 export interface HallucinationCheck {
// 8873   claim: string;
// 8874   verified: boolean;
// 8875   source: string;
// 8876   confidence: number;
// 8877 }
// 8878 // *CIDO - BÖLÜM - 1161 - FactualityScore - Doğruluk Skoru - İddia Kanıt - Uyum - Serde
// 8879 export interface FactualityScore {
// 8880   score: number;
// 8881   claims_checked: number;
// 8882   claims_supported: number;
// 8883 }
// 8884 // *CIDO - BÖLÜM - 1162 - GroundingCheck - Temellendirme - Bağlam - Destek - Serde
// 8885 export interface GroundingCheck {
// 8886   statement: string;
// 8887   grounded: boolean;
// 8888   supporting_context: string;
// 8889 }
// 8890 // *CIDO - BÖLÜM - 1163 - CitationFormat - Atıf Biçimi - Kaynak - Metin - Serde
// 8891 export interface CitationFormat {
// 8892   source_id: string;
// 8893   text: string;
// 8894   page: number;
// 8895   format: string;
// 8896 }
// 8897 // *CIDO - BÖLÜM - 1164 - EvaluationMetrics - Değerlendirme - BLEU ROUGE - BERTScore - Serde
// 8898 export interface EvaluationMetrics {
// 8899   bleu: number;
// 8900   rouge_l: number;
// 8901   bert_score: number;
// 8902 }
// 8903 // *CIDO - BÖLÜM - 1165 - HumanEvalScore - İnsan Değerlendirme - Akıcılık - İlgililik - Serde
// 8904 export interface HumanEvalScore {
// 8905   fluency: number;
// 8906   relevance: number;
// 8907   coherence: number;
// 8908   overall: number;
// 8909 }
// 8910 // *CIDO - BÖLÜM - 1166 - AutoEvalConfig - Otomatik Değerlendirme - Metrikler - Model - Serde
// 8911 export interface AutoEvalConfig {
// 8912   judge_model: string;
// 8913   metrics: string[];
// 8914   prompt_template: string;
// 8915 }
// 8916 // *CIDO - BÖLÜM - 1167 - AITestingSuite - AI Test Süiti - Testler - Beklenen - Serde
// 8917 export interface AITestingSuite {
// 8918   name: string;
// 8919   tests: AITestCase[];
// 8920   pass_criteria: string;
// 8921 }
// 8922 // *CIDO - BÖLÜM - 1168 - AITestCase - AI Test Durumu - Girdi - Beklenen Çıktı - Serde
// 8923 export interface AITestCase {
// 8924   input: string;
// 8925   expected_output: string;
// 8926   tolerance: number;
// 8927 }
// 8928 // *CIDO - BÖLÜM - 1169 - AdversarialTest - Düşmanca Test - Saldırı - Savunma - Serde
// 8929 export interface AdversarialTest {
// 8930   attack_type: string;
// 8931   perturbation: string;
// 8932   defense: string;
// 8933   success: boolean;
// 8934 }
// 8935 // *CIDO - BÖLÜM - 1170 - RedTeaming - Kırmızı Takım - Senaryo - Bulgu - Serde
// 8936 export interface RedTeaming {
// 8937   scenario: string;
// 8938   attempt: string;
// 8939   finding: string;
// 8940   severity: string;
// 8941 }
// 8942 // *CIDO - BÖLÜM - 1171 - JailbreakAttempt - Jailbreak - Yöntem - Başarılı - Serde
// 8943 export interface JailbreakAttempt {
// 8944   method: string;
// 8945   prompt: string;
// 8946   successful: boolean;
// 8947   response: string;
// 8948 }
// 8949 // *CIDO - BÖLÜM - 1172 - PromptInjection - İstem Enjeksiyonu - Tür - Yakalanan - Serde
// 8950 export interface PromptInjection {
// 8951   type: string;
// 8952   injected_prompt: string;
// 8953   caught: boolean;
// 8954 }
// 8955 // *CIDO - BÖLÜM - 1173 - DataPoisoning - Veri Zehirleme - Etkilenen - Tespit - Serde
// 8956 export interface DataPoisoning {
// 8957   affected_samples: number;
// 8958   detection_method: string;
// 8959   cleaned: boolean;
// 8960 }
// 8961 // *CIDO - BÖLÜM - 1174 - ModelInversion - Model Tersine Çevirme - Saldırı - Maruziyet - Serde
// 8962 export interface ModelInversion {
// 8963   attack_type: string;
// 8964   data_exposed: string;
// 8965   risk_level: string;
// 8966 }
// 8967 // *CIDO - BÖLÜM - 1175 - MembershipInference - Üyelik Çıkarımı - Saldırı - AUC - Serde
// 8968 export interface MembershipInference {
// 8969   attack_auc: number;
// 8970   vulnerable: boolean;
// 8971   mitigation: string;
// 8972 }
// 8973 // *CIDO - BÖLÜM - 1176 - DifferentialPrivacy - Diferansiyel Gizlilik - Epsilon Delta - Gürültü - Serde
// 8974 export interface DifferentialPrivacy {
// 8975   epsilon: number;
// 8976   delta: number;
// 8977   noise_mechanism: string;
// 8978   privacy_budget_used: number;
// 8979 }
// 8980 // *CIDO - BÖLÜM - 1177 - FederatedLearning - Federe Öğrenme - Tur - İstemci - Serde
// 8981 export interface FederatedLearning {
// 8982   round: number;
// 8983   num_clients: number;
// 8984   aggregation_method: string;
// 8985   global_model_accuracy: number;
// 8986 }
// 8987 // *CIDO - BÖLÜM - 1178 - SecureAggregation - Güvenli Toplama - Protokol - Katılımcı - Serde
// 8988 export interface SecureAggregation {
// 8989   protocol: string;
// 8990   participants: number;
// 8991   dropped_participants: number;
// 8992 }
// 8993 // *CIDO - BÖLÜM - 1179 - HomomorphicEncryption - Homomorfik Şifreleme - Şema - Seviye - Serde
// 8994 export interface HomomorphicEncryption {
// 8995   scheme: string;
// 8996   level: string;
// 8997   key_size: number;
// 8998 }
// 8999 // *CIDO - BÖLÜM - 1180 - TrustedExecutionEnv - TEE - SGX Nitro - Atestasyon - Serde
// 9000 export interface TrustedExecutionEnv {
// 9001   technology: string;
// 9002   attestation: string;
// 9003   enclave_size_mb: number;
// 9004 }
// 9005 // *CIDO - BÖLÜM - 1181 - ModelWatermarking - Model Filigranı - Gömme - Çıkarma - Serde
// 9006 export interface ModelWatermarking {
// 9007   method: string;
// 9008   payload: string;
// 9009   extraction_success: boolean;
// 9010 }
// 9011 // *CIDO - BÖLÜM - 1182 - ModelFingerprinting - Model Parmak İzi - Sorgu Seti - Benzersizlik - Serde
// 9012 export interface ModelFingerprinting {
// 9013   query_set: string[];
// 9014   fingerprint: string;
// 9015   uniqueness_score: number;
// 9016 }
// 9017 // *CIDO - BÖLÜM - 1183 - AIGovernance - AI Yönetişimi - Politika - Uyum - Serde
// 9018 export interface AIGovernance {
// 9019   policy_name: string;
// 9020   compliance_status: string;
// 9021   last_audited: number;
// 9022 }
// 9023 // *CIDO - BÖLÜM - 1184 - AIEthicsReview - AI Etik İncelemesi - Adalet - Şeffaflık - Serde
// 9024 export interface AIEthicsReview {
// 9025   fairness_score: number;
// 9026   transparency_score: number;
// 9027   accountability_score: number;
// 9028   overall_risk: string;
// 9029 }
// 9030 // *CIDO - BÖLÜM - 1185 - ExplainabilityReport - Açıklanabilirlik - Yöntem - Önem - Serde
// 9031 export interface ExplainabilityReport {
// 9032   method: string;
// 9033   feature_importance: Record<string, number>;
// 9034   decision_rules: string[];
// 9035 }
// 9036 // *CIDO - BÖLÜM - 1186 - SHAPExplanation - SHAP - Temel Değer - Katkı - Serde
// 9037 export interface SHAPExplanation {
// 9038   base_value: number;
// 9039   shap_values: number[];
// 9040   feature_names: string[];
// 9041 }
// 9042 // *CIDO - BÖLÜM - 1187 - LIMEExplanation - LIME - Yerel Model - Ağırlık - Serde
// 9043 export interface LIMEExplanation {
// 9044   local_model: string;
// 9045   feature_weights: Record<string, number>;
// 9046   intercept: number;
// 9047 }
// 9048 // *CIDO - BÖLÜM - 1188 - CounterfactualExample - Karşı Olgusal - Değişiklik - Sonuç - Serde
// 9049 export interface CounterfactualExample {
// 9050   original_input: Record<string, unknown>;
// 9051   changed_features: Record<string, unknown>;
// 9052   original_prediction: string;
// 9053   counterfactual_prediction: string;
// 9054 }
// 9055 // *CIDO - BÖLÜM - 1189 - AdversarialRobustness - Düşmanca Dayanıklılık - Saldırı - Doğruluk - Serde
// 9056 export interface AdversarialRobustness {
// 9057   attack: string;
// 9058   clean_accuracy: number;
// 9059   adversarial_accuracy: number;
// 9060   robustness_score: number;
// 9061 }
// 9062 // *CIDO - BÖLÜM - 1190 - UncertaintyQuantification - Belirsizlik - Epistemik Aleatorik - Serde
// 9063 export interface UncertaintyQuantification {
// 9064   epistemic: number;
// 9065   aleatoric: number;
// 9066   total_uncertainty: number;
// 9067 }
// 9068 // *CIDO - BÖLÜM - 1191 - CalibrationMetrics - Kalibrasyon - ECE MCE - Güvenilirlik - Serde
// 9069 export interface CalibrationMetrics {
// 9070   ece: number;
// 9071   mce: number;
// 9072   brier_score: number;
// 9073 }
// 9074 // *CIDO - BÖLÜM - 1192 - OODDetection - Dağıtım Dışı - Yöntem - Puan - Serde
// 9075 export interface OODDetection {
// 9076   method: string;
// 9077   score: number;
// 9078   is_ood: boolean;
// 9079 }
// 9080 // *CIDO - BÖLÜM - 1193 - OpenSetRecognition - Açık Küme - Bilinmeyen - Reddetme - Serde
// 9081 export interface OpenSetRecognition {
// 9082   known_classes: string[];
// 9083   prediction: string;
// 9084   is_unknown: boolean;
// 9085   confidence: number;
// 9086 }
// 9087 // *CIDO - BÖLÜM - 1194 - ZeroShotLearning - Sıfır Atış - Görülen Görülmeyen - Transfer - Serde
// 9088 export interface ZeroShotLearning {
// 9089   seen_classes: string[];
// 9090   unseen_classes: string[];
// 9091   accuracy_unseen: number;
// 9092 }
// 9093 // *CIDO - BÖLÜM - 1195 - FewShotLearning - Az Atış - Destek Sorgu - Prototip - Serde
// 9094 export interface FewShotLearning {
// 9095   n_way: number;
// 9096   k_shot: number;
// 9097   accuracy: number;
// 9098 }
// 9099 // *CIDO - BÖLÜM - 1196 - SelfSupervisedLearning - Kendi Kendine - Bahane Görev - Aşağı Akış - Serde
// 9100 export interface SelfSupervisedLearning {
// 9101   pretext_task: string;
// 9102   encoder: string;
// 9103   downstream_task: string;
// 9104   downstream_accuracy: number;
// 9105 }
// 9106 // *CIDO - BÖLÜM - 1197 - ContrastiveLearning - Karşılaştırmalı - Sıcaklık - Projeksiyon - Serde
// 9107 export interface ContrastiveLearning {
// 9108   temperature: number;
// 9109   projection_dim: number;
// 9110   batch_size: number;
// 9111 }
// 9112 // *CIDO - BÖLÜM - 1198 - MultiModalLearning - Çok Modlu - Görüntü Metin - Füzyon - Serde
// 9113 export interface MultiModalLearning {
// 9114   modalities: string[];
// 9115   fusion_method: string;
// 9116   alignment_loss: string;
// 9117 }
// 9118 // *CIDO - BÖLÜM - 1199 - VisionLanguageModel - Görüntü Dil - CLIP BLIP - Serde
// 9119 export interface VisionLanguageModel {
// 9120   model: string;
// 9121   vision_encoder: string;
// 9122   text_encoder: string;
// 9123   projection_dim: number;
// 9124 }
// 9125 // *CIDO - BÖLÜM - 1200 - ImageCaptioning - Görsel Altyazı - Model - Dil - Serde
// 9126 export interface ImageCaptioning {
// 9127   model: string;
// 9128   caption: string;
// 9129   language: string;
// 9130   confidence: number;
// 9131 }
// 9132 // *CIDO - BÖLÜM - 1201 - VisualQuestionAnswering - Görsel Soru Cevap - Soru Cevap - Serde
// 9133 export interface VisualQuestionAnswering {
// 9134   question: string;
// 9135   answer: string;
// 9136   confidence: number;
// 9137 }
// 9138 // *CIDO - BÖLÜM - 1202 - VideoUnderstanding - Video Anlama - Eylem - Zaman - Serde
// 9139 export interface VideoUnderstanding {
// 9140   video_duration_seconds: number;
// 9141   actions: VideoAction[];
// 9142   summary: string;
// 9143 }
// 9144 // *CIDO - BÖLÜM - 1203 - VideoAction - Video Eylemi - Etiket - Başlangıç Bitiş - Serde
// 9145 export interface VideoAction {
// 9146   label: string;
// 9147   start_seconds: number;
// 9148   end_seconds: number;
// 9149   confidence: number;
// 9150 }
// 9151 // *CIDO - BÖLÜM - 1204 - AudioClassification - Ses Sınıflandırma - Olay - Etiket - Serde
// 9152 export interface AudioClassification {
// 9153   label: string;
// 9154   confidence: number;
// 9155   start_seconds: number;
// 9156   end_seconds: number;
// 9157 }
// 9158 // *CIDO - BÖLÜM - 1205 - SpeakerDiarization - Konuşmacı - Bölütleme - Kimlik - Serde
// 9159 export interface SpeakerDiarization {
// 9160   segments: SpeakerSegment[];
// 9161   num_speakers: number;
// 9162 }
// 9163 // *CIDO - BÖLÜM - 1206 - SpeakerSegment - Konuşmacı Bölütü - Başlangıç Bitiş - Serde
// 9164 export interface SpeakerSegment {
// 9165   speaker_id: string;
// 9166   start_seconds: number;
// 9167   end_seconds: number;
// 9168   text: string;
// 9169 }
// 9170 // *CIDO - BÖLÜM - 1207 - EmotionRecognition - Duygu Tanıma - Ses Yüz - Duygu - Serde
// 9171 export interface EmotionRecognition {
// 9172   modality: string;
// 9173   emotion: string;
// 9174   confidence: number;
// 9175 }
// 9176 // *CIDO - BÖLÜM - 1208 - GestureRecognition - Jest Tanıma - El Pozu - İskelet - Serde
// 9177 export interface GestureRecognition {
// 9178   gesture: string;
// 9179   confidence: number;
// 9180   hand_landmarks: [number, number, number][];
// 9181 }
// 9182 // *CIDO - BÖLÜM - 1209 - PoseEstimation - Poz Tahmini - Anahtar Nokta - İskelet - Serde
// 9183 export interface PoseEstimation {
// 9184   keypoints: PoseKeypoint[];
// 9185   confidence: number;
// 9186 }
// 9187 // *CIDO - BÖLÜM - 1210 - PoseKeypoint - Poz Anahtar Noktası - İsim Konum - Puan - Serde
// 9188 export interface PoseKeypoint {
// 9189   name: string;
// 9190   x: number;
// 9191   y: number;
// 9192   z: number;
// 9193   confidence: number;
// 9194 }
// 9195 // *CIDO - BÖLÜM - 1211 - ActionRecognition - Eylem Tanıma - Sınıf - Süre - Serde
// 9196 export interface ActionRecognition {
// 9197   action_class: string;
// 9198   confidence: number;
// 9199   start_frame: number;
// 9200   end_frame: number;
// 9201 }
// 9202 // *CIDO - BÖLÜM - 1212 - AnomalyDetectionVideo - Video Anomali - Olay - Zaman - Serde
// 9203 export interface AnomalyDetectionVideo {
// 9204   anomaly_type: string;
// 9205   timestamp_seconds: number;
// 9206   confidence: number;
// 9207 }
// 9208 // *CIDO - BÖLÜM - 1213 - CrowdAnalysis - Kalabalık Analizi - Sayım - Yoğunluk - Serde
// 9209 export interface CrowdAnalysis {
// 9210   count: number;
// 9211   density: number;
// 9212   hotspots: [number, number, number][];
// 9213 }
// 9214 // *CIDO - BÖLÜM - 1214 - TrafficAnalysis - Trafik Analizi - Araç Sayısı - Hız - Serde
// 9215 export interface TrafficAnalysis {
// 9216   vehicle_count: number;
// 9217   average_speed_kmh: number;
// 9218   congestion_level: string;
// 9219 }
// 9220 // *CIDO - BÖLÜM - 1215 - LicensePlateRecognition - Plaka Tanıma - Metin - Ülke - Serde
// 9221 export interface LicensePlateRecognition {
// 9222   plate_text: string;
// 9223   country: string;
// 9224   confidence: number;
// 9225 }
// 9226 // *CIDO - BÖLÜM - 1216 - DocumentParsing - Belge Ayrıştırma - Yapı - Alanlar - Serde
// 9227 export interface DocumentParsing {
// 9228   document_type: string;
// 9229   fields: Record<string, string>;
// 9230   confidence: number;
// 9231 }
// 9232 // *CIDO - BÖLÜM - 1217 - TableExtraction - Tablo Çıkarma - Satır Sütun - Hücre - Serde
// 9233 export interface TableExtraction {
// 9234   rows: number;
// 9235   columns: number;
// 9236   cells: string[][];
// 9237 }
// 9238 // *CIDO - BÖLÜM - 1218 - InvoiceParsing - Fatura Ayrıştırma - Satıcı Tarih - Kalemler - Serde
// 9239 export interface InvoiceParsing {
// 9240   vendor: string;
// 9241   date: string;
// 9242   total: number;
// 9243   line_items: InvoiceLineItem[];
// 9244 }
// 9245 // *CIDO - BÖLÜM - 1219 - InvoiceLineItem - Fatura Kalemi - Açıklama Miktar - Fiyat - Serde
// 9246 export interface InvoiceLineItem {
// 9247   description: string;
// 9248   quantity: number;
// 9249   unit_price: number;
// 9250   total: number;
// 9251 }
// 9252 // *CIDO - BÖLÜM - 1220 - ReceiptParsing - Fiş Ayrıştırma - Mağaza - Ürünler - Serde
// 9253 export interface ReceiptParsing {
// 9254   store: string;
// 9255   date: string;
// 9256   total: number;
// 9257   items: string[];
// 9258 }
// 9259 // *CIDO - BÖLÜM - 1221 - IDCardParsing - Kimlik Kartı - İsim Numara - Doğum - Serde
// 9260 export interface IDCardParsing {
// 9261   name: string;
// 9262   id_number: string;
// 9263   date_of_birth: string;
// 9264   nationality: string;
// 9265 }
// 9266 // *CIDO - BÖLÜM - 1222 - PassportParsing - Pasaport - Ülke Numara - Geçerlilik - Serde
// 9267 export interface PassportParsing {
// 9268   country: string;
// 9269   passport_number: string;
// 9270   surname: string;
// 9271   given_names: string;
// 9272   expiry_date: string;
// 9273 }
// 9274 // *CIDO - BÖLÜM - 1223 - ResumeParsing - Özgeçmiş - Beceri Deneyim - Eğitim - Serde
// 9275 export interface ResumeParsing {
// 9276   skills: string[];
// 9277   experience: ResumeExperience[];
// 9278   education: ResumeEducation[];
// 9279 }
// 9280 // *CIDO - BÖLÜM - 1224 - ResumeExperience - Deneyim - Şirket Pozisyon - Tarih - Serde
// 9281 export interface ResumeExperience {
// 9282   company: string;
// 9283   position: string;
// 9284   start_date: string;
// 9285   end_date?: string;
// 9286   description: string;
// 9287 }
// 9288 // *CIDO - BÖLÜM - 1225 - ResumeEducation - Eğitim - Okul Derece - Tarih - Serde
// 9289 export interface ResumeEducation {
// 9290   school: string;
// 9291   degree: string;
// 9292   field: string;
// 9293   graduation_date: string;
// 9294 }
// 9295 // *CIDO - BÖLÜM - 1226 - MedicalImageAnalysis - Tıbbi Görüntü - Bulgu - Bölge - Serde
// 9296 export interface MedicalImageAnalysis {
// 9297   modality: string;
// 9298   findings: string[];
// 9299   region_of_interest: [number, number, number, number][];
// 9300 }
// 9301 // *CIDO - BÖLÜM - 1227 - DiseaseClassification - Hastalık Sınıflandırma - Teşhis - Olasılık - Serde
// 9302 export interface DiseaseClassification {
// 9303   diagnosis: string;
// 9304   probability: number;
// 9305   differential_diagnoses: string[];
// 9306 }
// 9307 // *CIDO - BÖLÜM - 1228 - LesionSegmentation - Lezyon Bölütleme - Maske - Hacim - Serde
// 9308 export interface LesionSegmentation {
// 9309   mask: number[][];
// 9310   volume_mm3: number;
// 9311   malignancy_score: number;
// 9312 }
// 9313 // *CIDO - BÖLÜM - 1229 - DrugInteraction - İlaç Etkileşimi - İlaçlar - Şiddet - Serde
// 9314 export interface DrugInteraction {
// 9315   drugs: string[];
// 9316   severity: string;
// 9317   description: string;
// 9318   recommendation: string;
// 9319 }
// 9320 // *CIDO - BÖLÜM - 1230 - GenomicAnalysis - Genomik - Varyant Gen - Etki - Serde
// 9321 export interface GenomicAnalysis {
// 9322   gene: string;
// 9323   variant: string;
// 9324   impact: string;
// 9325   clinical_significance: string;
// 9326 }
// 9327 // *CIDO - BÖLÜM - 1231 - ProteinStructure - Protein Yapısı - Katlanma - Bağlanma - Serde
// 9328 export interface ProteinStructure {
// 9329   pdb_id: string;
// 9330   secondary_structure: string;
// 9331   binding_sites: [number, number, number][];
// 9332 }
// 9333 // *CIDO - BÖLÜM - 1232 - MoleculeGeneration - Molekül Üretimi - SMILES - Özellik - Serde
// 9334 export interface MoleculeGeneration {
// 9335   smiles: string;
// 9336   molecular_weight: number;
// 9337   logp: number;
// 9338   qed: number;
// 9339 }
// 9340 // *CIDO - BÖLÜM - 1233 - DrugDiscovery - İlaç Keşfi - Hedef Bileşik - Afinite - Serde
// 9341 export interface DrugDiscovery {
// 9342   target_protein: string;
// 9343   compound: string;
// 9344   binding_affinity: number;
// 9345   toxicity_risk: string;
// 9346 }
// 9347 // *CIDO - BÖLÜM - 1234 - ClinicalTrialMatching - Klinik Deney - Uygunluk - Eşleşme - Serde
// 9348 export interface ClinicalTrialMatching {
// 9349   trial_id: string;
// 9350   match_score: number;
// 9351   eligibility_criteria: string[];
// 9352 }
// 9353 // *CIDO - BÖLÜM - 1235 - PatientRiskScore - Hasta Risk Skoru - Faktörler - Skor - Serde
// 9354 export interface PatientRiskScore {
// 9355   patient_id: string;
// 9356   risk_score: number;
// 9357   risk_factors: string[];
// 9358 }
// 9359 // *CIDO - BÖLÜM - 1236 - ReadmissionPrediction - Tekrar Yatış - Olasılık - Pencere - Serde
// 9360 export interface ReadmissionPrediction {
// 9361   probability: number;
// 9362   window_days: number;
// 9363   top_factors: string[];
// 9364 }
// 9365 // *CIDO - BÖLÜM - 1237 - LengthOfStayPrediction - Kalış Süresi - Gün - Aralık - Serde
// 9366 export interface LengthOfStayPrediction {
// 9367   predicted_days: number;
// 9368   lower_bound: number;
// 9369   upper_bound: number;
// 9370 }
// 9371 // *CIDO - BÖLÜM - 1238 - SepsisPrediction - Sepsis Tahmini - Skor - Pencere - Serde
// 9372 export interface SepsisPrediction {
// 9373   score: number;
// 9374   prediction_window_hours: number;
// 9375   alert: boolean;
// 9376 }
// 9377 // *CIDO - BÖLÜM - 1239 - RadiologyReport - Radyoloji Raporu - Bulgu - İzlenim - Serde
// 9378 export interface RadiologyReport {
// 9379   study_type: string;
// 9380   findings: string;
// 9381   impression: string;
// 9382   critical_findings: string[];
// 9383 }
// 9384 // *CIDO - BÖLÜM - 1240 - PathologyReport - Patoloji Raporu - Doku - Teşhis - Serde
// 9385 export interface PathologyReport {
// 9386   tissue_type: string;
// 9387   diagnosis: string;
// 9388   grade: string;
// 9389   biomarkers: Record<string, string>;
// 9390 }
// 9391 // *CIDO - BÖLÜM - 1241 - TelemedicineSession - Teletıp - Katılımcı - Süre - Serde
// 9392 export interface TelemedicineSession {
// 9393   session_id: string;
// 9394   participants: string[];
// 9395   duration_minutes: number;
// 9396   notes: string;
// 9397 }
// 9398 // *CIDO - BÖLÜM - 1242 - SymptomChecker - Belirti Denetleyici - Belirtiler - Olasılık - Serde
// 9399 export interface SymptomChecker {
// 9400   symptoms: string[];
// 9401   possible_conditions: string[];
// 9402   triage_level: string;
// 9403   recommendation: string;
// 9404 }
// 9405 // *CIDO - BÖLÜM - 1243 - VitalSignsAnalysis - Hayati Belirtiler - Anormallik - Trend - Serde
// 9406 export interface VitalSignsAnalysis {
// 9407   heart_rate: number;
// 9408   blood_pressure: [number, number];
// 9409   temperature: number;
// 9410   oxygen_saturation: number;
// 9411   abnormalities: string[];
// 9412 }
// 9413 // *CIDO - BÖLÜM - 1244 - ECGInterpretation - EKG Yorumlama - Ritim - Anormallik - Serde
// 9414 export interface ECGInterpretation {
// 9415   rhythm: string;
// 9416   rate: number;
// 9417   abnormalities: string[];
// 9418   qtc_interval: number;
// 9419 }
// 9420 // *CIDO - BÖLÜM - 1245 - EEGAnalysis - EEG Analizi - Bant Gücü - Olay - Serde
// 9421 export interface EEGAnalysis {
// 9422   band_powers: Record<string, number>;
// 9423   events: string[];
// 9424   abnormal_patterns: string[];
// 9425 }
// 9426 // *CIDO - BÖLÜM - 1246 - SleepStageAnalysis - Uyku Evresi - Hipnogram - Verimlilik - Serde
// 9427 export interface SleepStageAnalysis {
// 9428   stages: string[];
// 9429   hypnogram: number[];
// 9430   efficiency: number;
// 9431   apnea_events: number;
// 9432 }
// 9433 // *CIDO - BÖLÜM - 1247 - WearableDataSync - Giyilebilir - Adım Kalori - Uyku - Serde
// 9434 export interface WearableDataSync {
// 9435   device: string;
// 9436   steps: number;
// 9437   calories: number;
// 9438   heart_rate_avg: number;
// 9439   sleep_minutes: number;
// 9440 }
// 9441 // *CIDO - BÖLÜM - 1248 - HealthScore - Sağlık Skoru - Bileşenler - Toplam - Serde
// 9442 export interface HealthScore {
// 9443   overall: number;
// 9444   components: Record<string, number>;
// 9445 }
// 9446 // *CIDO - BÖLÜM - 1249 - NutritionAnalysis - Beslenme Analizi - Kalori Makro - Mikro - Serde
// 9447 export interface NutritionAnalysis {
// 9448   calories: number;
// 9449   protein_g: number;
// 9450   carbs_g: number;
// 9451   fat_g: number;
// 9452   micronutrients: Record<string, number>;
// 9453 }
// 9454 // *CIDO - BÖLÜM - 1250 - FoodRecognition - Yemek Tanıma - Yemek - Porsiyon - Serde
// 9455 export interface FoodRecognition {
// 9456   food_name: string;
// 9457   portion_size: string;
// 9458   confidence: number;
// 9459 }
// 9460 // *CIDO - BÖLÜM - 1251 - MealPlanning - Yemek Planlama - Diyet Tercih - Gün - Serde
// 9461 export interface MealPlanning {
// 9462   diet_type: string;
// 9463   calories_target: number;
// 9464   meals: MealPlan[];
// 9465 }
// 9466 // *CIDO - BÖLÜM - 1252 - MealPlan - Yemek Planı - Öğün - Tarif - Serde
// 9467 export interface MealPlan {
// 9468   meal: string;
// 9469   recipe: string;
// 9470   calories: number;
// 9471   ingredients: string[];
// 9472 }
// 9473 // *CIDO - BÖLÜM - 1253 - ExerciseRecognition - Egzersiz Tanıma - Aktivite - Süre - Serde
// 9474 export interface ExerciseRecognition {
// 9475   activity: string;
// 9476   duration_minutes: number;
// 9477   calories_burned: number;
// 9478   repetitions: number;
// 9479 }
// 9480 // *CIDO - BÖLÜM - 1254 - WorkoutGeneration - Antrenman - Hedef Seviye - Egzersizler - Serde
// 9481 export interface WorkoutGeneration {
// 9482   goal: string;
// 9483   level: string;
// 9484   exercises: WorkoutExercise[];
// 9485   total_duration_minutes: number;
// 9486 }
// 9487 // *CIDO - BÖLÜM - 1255 - WorkoutExercise - Egzersiz - Set Tekrar - Dinlenme - Serde
// 9488 export interface WorkoutExercise {
// 9489   name: string;
// 9490   sets: number;
// 9491   reps: number;
// 9492   rest_seconds: number;
// 9493   video_url: string;
// 9494 }
// 9495 // *CIDO - BÖLÜM - 1256 - FormCorrection - Form Düzeltme - Hata - Geri Bildirim - Serde
// 9496 export interface FormCorrection {
// 9497   exercise: string;
// 9498   error: string;
// 9499   correction: string;
// 9500   confidence: number;
// 9501 }
// 9502 // *CIDO - BÖLÜM - 1257 - YogaPoseDetection - Yoga Pozu - Hizalama - Puan - Serde
// 9503 export interface YogaPoseDetection {
// 9504   pose_name: string;
// 9505   alignment_score: number;
// 9506   corrections: string[];
// 9507 }
// 9508 // *CIDO - BÖLÜM - 1258 - RepetitionCounting - Tekrar Sayımı - Egzersiz - Sayım - Serde
// 9509 export interface RepetitionCounting {
// 9510   exercise: string;
// 9511   count: number;
// 9512   confidence: number;
// 9513 }
// 9514 // *CIDO - BÖLÜM - 1259 - FitnessAssessment - Fitness - VO2max - Esneklik - Serde
// 9515 export interface FitnessAssessment {
// 9516   vo2max: number;
// 9517   flexibility_score: number;
// 9518   strength_score: number;
// 9519   balance_score: number;
// 9520 }
// 9521 // *CIDO - BÖLÜM - 1260 - MusicGeneration - Müzik Üretimi - Tür Anahtar - BPM - Serde
// 9522 export interface MusicGeneration {
// 9523   genre: string;
// 9524   key: string;
// 9525   bpm: number;
// 9526   duration_seconds: number;
// 9527   audio_url: string;
// 9528 }
// 9529 // *CIDO - BÖLÜM - 1261 - MusicTranscription - Müzik Transkripsiyonu - Notalar - Akorlar - Serde
// 9530 export interface MusicTranscription {
// 9531   notes: string[];
// 9532   chords: string[];
// 9533   tempo: number;
// 9534 }
// 9535 // *CIDO - BÖLÜM - 1262 - BeatTracking - Ritim Takibi - Vuruşlar - Downbeat - Serde
// 9536 export interface BeatTracking {
// 9537   beats: number[];
// 9538   downbeats: number[];
// 9539   bpm: number;
// 9540 }
// 9541 // *CIDO - BÖLÜM - 1263 - MelodyExtraction - Melodi Çıkarma - Perde - Başlangıç Bitiş - Serde
// 9542 export interface MelodyExtraction {
// 9543   pitches: number[];
// 9544   onsets: number[];
// 9545   offsets: number[];
// 9546 }
// 9547 // *CIDO - BÖLÜM - 1264 - ChordRecognition - Akor Tanıma - Kök Kalite - Başlangıç - Serde
// 9548 export interface ChordRecognition {
// 9549   root: string;
// 9550   quality: string;
// 9551   start_time: number;
// 9552   duration: number;
// 9553 }
// 9554 // *CIDO - BÖLÜM - 1265 - KeyDetection - Anahtar Tespiti - Ton Mod - Güven - Serde
// 9555 export interface KeyDetection {
// 9556   key: string;
// 9557   mode: string;
// 9558   confidence: number;
// 9559 }
// 9560 // *CIDO - BÖLÜM - 1266 - InstrumentRecognition - Enstrüman - Aile - Aktivasyon - Serde
// 9561 export interface InstrumentRecognition {
// 9562   instrument: string;
// 9563   family: string;
// 9564   activation_regions: [number, number][];
// 9565 }
// 9566 // *CIDO - BÖLÜM - 1267 - SourceSeparation - Kaynak Ayırma - Enstrüman - Ses - Serde
// 9567 export interface SourceSeparation {
// 9568   vocals_url: string;
// 9569   drums_url: string;
// 9570   bass_url: string;
// 9571   other_url: string;
// 9572 }
// 9573 // *CIDO - BÖLÜM - 1268 - AudioEnhancement - Ses İyileştirme - Gürültü Azaltma - Netlik - Serde
// 9574 export interface AudioEnhancement {
// 9575   noise_reduction_db: number;
// 9576   clarity_improvement: number;
// 9577   method: string;
// 9578 }
// 9579 // *CIDO - BÖLÜM - 1269 - TextToSpeech - Metin Konuşma - Ses - Hız - Serde
// 9580 export interface TextToSpeech {
// 9581   text: string;
// 9582   voice: string;
// 9583   speed: number;
// 9584   audio_url: string;
// 9585 }
// 9586 // *CIDO - BÖLÜM - 1270 - VoiceCloning - Ses Klonlama - Referans - Benzerlik - Serde
// 9587 export interface VoiceCloning {
// 9588   reference_audio_url: string;
// 9589   similarity_score: number;
// 9590   cloned_audio_url: string;
// 9591 }
// 9592 // *CIDO - BÖLÜM - 1271 - VoiceConversion - Ses Dönüştürme - Kaynak Hedef - Serde
// 9593 export interface VoiceConversion {
// 9594   source_audio_url: string;
// 9595   target_voice: string;
// 9596   converted_audio_url: string;
// 9597 }
// 9598 // *CIDO - BÖLÜM - 1272 - SoundEventDetection - Ses Olayı - Etiket - Zaman - Serde
// 9599 export interface SoundEventDetection {
// 9600   events: SoundEvent[];
// 9601 }
// 9602 // *CIDO - BÖLÜM - 1273 - SoundEvent - Ses Olayı - Etiket Başlangıç - Bitiş - Serde
// 9603 export interface SoundEvent {
// 9604   label: string;
// 9605   start_seconds: number;
// 9606   end_seconds: number;
// 9607   confidence: number;
// 9608 }
// 9609 // *CIDO - BÖLÜM - 1274 - AcousticSceneClassification - Akustik Sahne - Ortam - Olasılık - Serde
// 9610 export interface AcousticSceneClassification {
// 9611   scene: string;
// 9612   probability: number;
// 9613 }
// 9614 // *CIDO - BÖLÜM - 1275 - RoomImpulseResponse - Oda Dürtü Yanıtı - RT60 - Alan - Serde
// 9615 export interface RoomImpulseResponse {
// 9616   rt60_seconds: number;
// 9617   room_volume_m3: number;
// 9618   clarity_c50: number;
// 9619 }
// 9620 // *CIDO - BÖLÜM - 1276 - EchoCancellation - Yankı İptali - Gecikme - Azaltma - Serde
// 9621 export interface EchoCancellation {
// 9622   echo_delay_ms: number;
// 9623   echo_reduction_db: number;
// 9624   double_talk_detected: boolean;
// 9625 }
// 9626 // *CIDO - BÖLÜM - 1277 - VoiceActivityDetection - Ses Aktivitesi - Konuşma - Sessizlik - Serde
// 9627 export interface VoiceActivityDetection {
// 9628   speech_segments: [number, number][];
// 9629   silence_segments: [number, number][];
// 9630 }
// 9631 // *CIDO - BÖLÜM - 1278 - LanguageIdentification - Dil Tanımlama - Dil - Olasılık - Serde
// 9632 export interface LanguageIdentification {
// 9633   language: string;
// 9634   probability: number;
// 9635   script: string;
// 9636 }
// 9637 // *CIDO - BÖLÜM - 1279 - AccentRecognition - Aksan Tanıma - Aksan - Bölge - Serde
// 9638 export interface AccentRecognition {
// 9639   accent: string;
// 9640   region: string;
// 9641   confidence: number;
// 9642 }
// 9643 // *CIDO - BÖLÜM - 1280 - PronunciationAssessment - Telaffuz - Doğruluk - Akıcılık - Serde
// 9644 export interface PronunciationAssessment {
// 9645   accuracy_score: number;
// 9646   fluency_score: number;
// 9647   completeness_score: number;
// 9648   word_level_scores: Record<string, number>;
// 9649 }
// 9650 // *CIDO - BÖLÜM - 1281 - PhonemeAlignment - Fonem - Hizalama - Başlangıç Bitiş - Serde
// 9651 export interface PhonemeAlignment {
// 9652   phonemes: string[];
// 9653   start_times: number[];
// 9654   end_times: number[];
// 9655 }
// 9656 // *CIDO - BÖLÜM - 1282 - GraphemeToPhoneme - Harf Fonem - Girdi - Çıktı - Serde
// 9657 export interface GraphemeToPhoneme {
// 9658   graphemes: string;
// 9659   phonemes: string;
// 9660   language: string;
// 9661 }
// 9662 // *CIDO - BÖLÜM - 1283 - TextNormalization - Metin Normalleştirme - Sayı Tarih - Serde
// 9663 export interface TextNormalization {
// 9664   original: string;
// 9665   normalized: string;
// 9666   transformations: string[];
// 9667 }
// 9668 // *CIDO - BÖLÜM - 1284 - CodeGeneration - Kod Üretimi - Dil - İstem - Serde
// 9669 export interface CodeGeneration {
// 9670   language: string;
// 9671   prompt: string;
// 9672   generated_code: string;
// 9673 }
// 9674 // *CIDO - BÖLÜM - 1285 - CodeCompletion - Kod Tamamlama - Bağlam - Öneri - Serde
// 9675 export interface CodeCompletion {
// 9676   prefix: string;
// 9677   suffix: string;
// 9678   completions: string[];
// 9679 }
// 9680 // *CIDO - BÖLÜM - 1286 - CodeExplanation - Kod Açıklama - Kod - Açıklama - Serde
// 9681 export interface CodeExplanation {
// 9682   code: string;
// 9683   explanation: string;
// 9684   complexity: string;
// 9685 }
// 9686 // *CIDO - BÖLÜM - 1287 - CodeRefactoring - Kod Yeniden Düzenleme - Orijinal - Öneri - Serde
// 9687 export interface CodeRefactoring {
// 9688   original: string;
// 9689   refactored: string;
// 9690   improvements: string[];
// 9691 }
// 9692 // *CIDO - BÖLÜM - 1288 - CodeReview - Kod İnceleme - Sorun - Öneri - Serde
// 9693 export interface CodeReview {
// 9694   issues: CodeIssue[];
// 9695   overall_quality: string;
// 9696 }
// 9697 // *CIDO - BÖLÜM - 1289 - CodeIssue - Kod Sorunu - Satır - Şiddet - Serde
// 9698 export interface CodeIssue {
// 9699   line: number;
// 9700   severity: string;
// 9701   message: string;
// 9702   suggestion: string;
// 9703 }
// 9704 // *CIDO - BÖLÜM - 1290 - BugDetection - Hata Tespiti - Hata Türü - Olasılık - Serde
// 9705 export interface BugDetection {
// 9706   bug_type: string;
// 9707   probability: number;
// 9708   location: string;
// 9709   fix_suggestion: string;
// 9710 }
// 9711 // *CIDO - BÖLÜM - 1291 - VulnerabilityScanning - Zafiyet Tarama - CWE - Risk - Serde
// 9712 export interface VulnerabilityScanning {
// 9713   cwe_id: string;
// 9714   risk: string;
// 9715   file: string;
// 9716   line: number;
// 9717 }
// 9718 // *CIDO - BÖLÜM - 1292 - DependencyScanning - Bağımlılık Tarama - Paket - CVE - Serde
// 9719 export interface DependencyScanning {
// 9720   package: string;
// 9721   version: string;
// 9722   cve_ids: string[];
// 9723   severity: string;
// 9724 }
// 9725 // *CIDO - BÖLÜM - 1293 - LicenseCompliance - Lisans Uyumu - Lisans - Uyumlu - Serde
// 9726 export interface LicenseCompliance {
// 9727   package: string;
// 9728   license: string;
// 9729   compliant: boolean;
// 9730   restriction: string;
// 9731 }
// 9732 // *CIDO - BÖLÜM - 1294 - TestGeneration - Test Üretimi - Kod - Test - Serde
// 9733 export interface TestGeneration {
// 9734   source_code: string;
// 9735   test_code: string;
// 9736   framework: string;
// 9737 }
// 9738 // *CIDO - BÖLÜM - 1295 - DocumentationGeneration - Dokümantasyon - Kod - Belge - Serde
// 9739 export interface DocumentationGeneration {
// 9740   code: string;
// 9741   documentation: string;
// 9742   format: string;
// 9743 }
// 9744 // *CIDO - BÖLÜM - 1296 - APIEndpointGeneration - API Uç Noktası - Rota - Şema - Serde
// 9745 export interface APIEndpointGeneration {
// 9746   route: string;
// 9747   method: string;
// 9748   request_schema: Record<string, unknown>;
// 9749   response_schema: Record<string, unknown>;
// 9750 }
// 9751 // *CIDO - BÖLÜM - 1297 - DatabaseSchemaGeneration - DB Şeması - Tablo - İlişki - Serde
// 9752 export interface DatabaseSchemaGeneration {
// 9753   tables: DBSchemaTable[];
// 9754   relationships: DBSchemaRelationship[];
// 9755 }
// 9756 // *CIDO - BÖLÜM - 1298 - DBSchemaTable - DB Tablosu - Ad Kolonlar - Serde
// 9757 export interface DBSchemaTable {
// 9758   name: string;
// 9759   columns: DBSchemaColumn[];
// 9760 }
// 9761 // *CIDO - BÖLÜM - 1299 - DBSchemaColumn - DB Kolonu - Tip - Kısıt - Serde
// 9762 export interface DBSchemaColumn {
// 9763   name: string;
// 9764   type: string;
// 9765   constraints: string[];
// 9766 }
// 9767 // *CIDO - BÖLÜM - 1300 - DBSchemaRelationship - DB İlişkisi - Tür - Tablolar - Serde
// 9768 export interface DBSchemaRelationship {
// 9769   type: string;
// 9770   from_table: string;
// 9771   from_column: string;
// 9772   to_table: string;
// 9773   to_column: string;
// 9774 }
// 9775 // *CIDO - BÖLÜM - 1301 - SQLQueryGeneration - SQL Sorgu - Doğal Dil - SQL - Serde
// 9776 export interface SQLQueryGeneration {
// 9777   natural_language: string;
// 9778   sql_query: string;
// 9779   dialect: string;
// 9780 }
// 9781 // *CIDO - BÖLÜM - 1302 - DataMigrationScript - Veri Taşıma - Kaynak Hedef - Komut - Serde
// 9782 export interface DataMigrationScript {
// 9783   source: string;
// 9784   target: string;
// 9785   script: string;
// 9786 }
// 9787 // *CIDO - BÖLÜM - 1303 - ConfigurationGenerator - Konfigürasyon - Format - İçerik - Serde
// 9788 export interface ConfigurationGenerator {
// 9789   format: string;
// 9790   parameters: Record<string, unknown>;
// 9791   config_content: string;
// 9792 }
// 9793 // *CIDO - BÖLÜM - 1304 - InfrastructureAsCode - IaC - Araç - Şablon - Serde
// 9794 export interface InfrastructureAsCode {
// 9795   tool: string;
// 9796   template: string;
// 9797   resources: string[];
// 9798 }
// 9799 // *CIDO - BÖLÜM - 1305 - DockerfileGeneration - Dockerfile - Temel İmaj - Komutlar - Serde
// 9800 export interface DockerfileGeneration {
// 9801   base_image: string;
// 9802   commands: string[];
// 9803   exposed_ports: number[];
// 9804 }
// 9805 // *CIDO - BÖLÜM - 1306 - CICDPipelineGeneration - CI/CD - Aşamalar - İşler - Serde
// 9806 export interface CICDPipelineGeneration {
// 9807   stages: string[];
// 9808   jobs: CICDJob[];
// 9809 }
// 9810 // *CIDO - BÖLÜM - 1307 - CICDJob - CI/CD İşi - İsim Komut - İmaj - Serde
// 9811 export interface CICDJob {
// 9812   name: string;
// 9813   commands: string[];
// 9814   image: string;
// 9815 }
// 9816 // *CIDO - BÖLÜM - 1308 - HelmChartGeneration - Helm Chart - İsim Sürüm - Değerler - Serde
// 9817 export interface HelmChartGeneration {
// 9818   name: string;
// 9819   version: string;
// 9820   values: Record<string, unknown>;
// 9821 }
// 9822 // *CIDO - BÖLÜM - 1309 - KubernetesManifest - K8s Manifestosu - Tür - YAML - Serde
// 9823 export interface KubernetesManifest {
// 9824   kind: string;
// 9825   name: string;
// 9826   namespace: string;
// 9827   yaml_content: string;
// 9828 }
// 9829 // *CIDO - BÖLÜM - 1310 - TerraformModule - Terraform Modülü - Sağlayıcı - Kaynaklar - Serde
// 9830 export interface TerraformModule {
// 9831   provider: string;
// 9832   resources: TerraformResource[];
// 9833 }
// 9834 // *CIDO - BÖLÜM - 1311 - TerraformResource - Terraform Kaynağı - Tür Ad - Özellikler - Serde
// 9835 export interface TerraformResource {
// 9836   type: string;
// 9837   name: string;
// 9838   properties: Record<string, unknown>;
// 9839 }
// 9840 // *CIDO - BÖLÜM - 1312 - AnsiblePlaybook - Ansible - Oyun Adı - Görevler - Serde
// 9841 export interface AnsiblePlaybook {
// 9842   play_name: string;
// 9843   hosts: string;
// 9844   tasks: AnsibleTask[];
// 9845 }
// 9846 // *CIDO - BÖLÜM - 1313 - AnsibleTask - Ansible Görevi - Modül - Parametreler - Serde
// 9847 export interface AnsibleTask {
// 9848   name: string;
// 9849   module: string;
// 9850   parameters: Record<string, unknown>;
// 9851 }
// 9852 // *CIDO - BÖLÜM - 1314 - MonitoringDashboard - İzleme Paneli - Metrik Görsel - Serde
// 9853 export interface MonitoringDashboard {
// 9854   title: string;
// 9855   panels: DashboardPanel[];
// 9856 }
// 9857 // *CIDO - BÖLÜM - 1315 - DashboardPanel - Panel - Başlık Tip - Sorgu - Serde
// 9858 export interface DashboardPanel {
// 9859   title: string;
// 9860   type: string;
// 9861   query: string;
// 9862   position: DashboardPosition;
// 9863 }
// 9864 // *CIDO - BÖLÜM - 1316 - DashboardPosition - Panel Konumu - x y w h - Serde
// 9865 export interface DashboardPosition {
// 9866   x: number;
// 9867   y: number;
// 9868   w: number;
// 9869   h: number;
// 9870 }
// 9871 // *CIDO - BÖLÜM - 1317 - AlertRuleConfig - Uyarı Kuralı - Ad Sorgu - Koşul - Serde
// 9872 export interface AlertRuleConfig {
// 9873   name: string;
// 9874   query: string;
// 9875   condition: string;
// 9876   duration: string;
// 9877   severity: string;
// 9878 }
// 9879 // *CIDO - BÖLÜM - 1318 - MonitoringNotificationTemplate - Bildirim - Başlık Gövde - Kanal - Serde
// 9880 export interface MonitoringNotificationTemplate {
// 9881   title: string;
// 9882   body: string;
// 9883   channel: string;
// 9884 }
// 9885 // *CIDO - BÖLÜM - 1319 - RunbookGeneration - Çalıştırma Kitabı - Senaryo Adımlar - Serde
// 9886 export interface RunbookGeneration {
// 9887   scenario: string;
// 9888   steps: RunbookStep[];
// 9889 }
// 9890 // *CIDO - BÖLÜM - 1320 - PostIncidentReview - Olay Sonrası - Özet - Eylemler - Serde
// 9891 export interface PostIncidentReview {
// 9892   summary: string;
// 9893   timeline: IncidentTimelineEntry[];
// 9894   action_items: string[];
// 9895 }
// 9896 // *CIDO - BÖLÜM - 1321 - IncidentTimelineEntry - Olay Zaman Çizelgesi - Zaman Olay - Serde
// 9897 export interface IncidentTimelineEntry {
// 9898   time: string;
// 9899   event: string;
// 9900 }
// 9901 // *CIDO - BÖLÜM - 1322 - CapacityForecast - Kapasite Tahmini - Trend - Öneri - Serde
// 9902 export interface CapacityForecast {
// 9903   current_usage: number;
// 9904   forecast_30d: number;
// 9905   recommendation: string;
// 9906 }
// 9907 // *CIDO - BÖLÜM - 1323 - CostOptimizationReport - Maliyet Raporu - Tasarruf - Eylem - Serde
// 9908 export interface CostOptimizationReport {
// 9909   current_monthly_cost: number;
// 9910   potential_savings: number;
// 9911   recommendations: string[];
// 9912 }
// 9913 // *CIDO - BÖLÜM - 1324 - SecurityAuditReport - Güvenlik Denetimi - Bulgular - Puan - Serde
// 9914 export interface SecurityAuditReport {
// 9915   overall_score: number;
// 9916   findings: SecurityFinding[];
// 9917   compliance_status: string;
// 9918 }
// 9919 // *CIDO - BÖLÜM - 1325 - SecurityFinding - Güvenlik Bulgusu - Kural - Durum - Serde
// 9920 export interface SecurityFinding {
// 9921   rule: string;
// 9922   status: string;
// 9923   resource: string;
// 9924   severity: string;
// 9925 }
// 9926 // *CIDO - BÖLÜM - 1326 - ComplianceReport - Uyum Raporu - Standart Kontrol - Serde
// 9927 export interface ComplianceReport {
// 9928   standard: string;
// 9929   controls: ComplianceControl[];
// 9930   pass_rate: number;
// 9931 }
// 9932 // *CIDO - BÖLÜM - 1327 - ComplianceControl - Uyum Kontrolü - Kimlik Durum - Kanıt - Serde
// 9933 export interface ComplianceControl {
// 9934   id: string;
// 9935   status: string;
// 9936   evidence: string;
// 9937 }
// 9938 // *CIDO - BÖLÜM - 1328 - RiskAssessmentReport - Risk Değerlendirmesi - Riskler - Seviye - Serde
// 9939 export interface RiskAssessmentReport {
// 9940   overall_risk: string;
// 9941   risks: IdentifiedRisk[];
// 9942 }
// 9943 // *CIDO - BÖLÜM - 1329 - IdentifiedRisk - Tanımlı Risk - Olasılık Etki - Azaltma - Serde
// 9944 export interface IdentifiedRisk {
// 9945   description: string;
// 9946   likelihood: string;
// 9947   impact: string;
// 9948   mitigation: string;
// 9949 }
// 9950 // *CIDO - BÖLÜM - 1330 - BusinessContinuityPlan - İş Sürekliliği - RTO RPO - Strateji - Serde
// 9951 export interface BusinessContinuityPlan {
// 9952   rto_hours: number;
// 9953   rpo_hours: number;
// 9954   strategies: string[];
// 9955 }
// 9956 // *CIDO - BÖLÜM - 1331 - DisasterRecoveryPlan - Felaket Kurtarma - Site - Prosedür - Serde
// 9957 export interface DisasterRecoveryPlan {
// 9958   recovery_site: string;
// 9959   procedures: string[];
// 9960   test_schedule: string;
// 9961 }
// 9962 // *CIDO - BÖLÜM - 1332 - DataBackupPolicy - Yedekleme - Sıklık - Saklama - Serde
// 9963 export interface DataBackupPolicy {
// 9964   frequency: string;
// 9965   retention_days: number;
// 9966   backup_types: string[];
// 9967 }
// 9968 // *CIDO - BÖLÜM - 1333 - EncryptionPolicy - Şifreleme - Algoritma - Anahtar Yönetimi - Serde
// 9969 export interface EncryptionPolicy {
// 9970   algorithm: string;
// 9971   key_rotation_days: number;
// 9972   data_at_rest: boolean;
// 9973   data_in_transit: boolean;
// 9974 }
// 9975 // *CIDO - BÖLÜM - 1334 - AccessControlPolicy - Erişim Kontrolü - Model - Kural - Serde
// 9976 export interface AccessControlPolicy {
// 9977   model: string;
// 9978   rules: AccessRule[];
// 9979 }
// 9980 // *CIDO - BÖLÜM - 1335 - AccessRule - Erişim Kuralı - Özne Kaynak - Eylem - Serde
// 9981 export interface AccessRule {
// 9982   subject: string;
// 9983   resource: string;
// 9984   action: string;
// 9985   effect: string;
// 9986 }
// 9987 // *CIDO - BÖLÜM - 1336 - CloudflareNetworkPolicy - Cloudflare Ağ Politikası - Giriş Çıkış - CIDR - Serde
// 9988 export interface CloudflareNetworkPolicy {
// 9989   ingress: NetworkRule[];
// 9990   egress: NetworkRule[];
// 9991 }
// 9992 // *CIDO - BÖLÜM - 1337 - NetworkRule - Ağ Kuralı - Protokol Port - Kaynak - Serde
// 9993 export interface NetworkRule {
// 9994   protocol: string;
// 9995   port: number;
// 9996   source: string;
// 9997 }
// 9998 // *CIDO - BÖLÜM - 1338 - DNSPolicy - DNS Politikası - Yönlendirme - TTL - Serde
// 9999 export interface DNSPolicy {
// 10000   routing_policy: string;
// 10001   ttl_seconds: number;
// 10002   geo_routing: boolean;
// 10003 }
// 10004 // *CIDO - BÖLÜM - 1339 - CDNConfig - CDN Konfigürasyonu - Önbellek - Sıkıştırma - Serde
// 10005 export interface CDNConfig {
// 10006   cache_policy: string;
// 10007   compression: boolean;
// 10008   edge_locations: string[];
// 10009 }
// 10010 // *CIDO - BÖLÜM - 1340 - WAFPolicy - WAF Politikası - Kural Seti - Mod - Serde
// 10011 export interface WAFPolicy {
// 10012   rule_sets: string[];
// 10013   mode: string;
// 10014   custom_rules: string[];
// 10015 }
// 10016 // *CIDO - BÖLÜM - 1341 - DDoSProtectionPolicy - DDoS - Eşik - Eylem - Serde
// 10017 export interface DDoSProtectionPolicy {
// 10018   threshold_rps: number;
// 10019   action: string;
// 10020   mitigation_timeout_seconds: number;
// 10021 }
// 10022 // *CIDO - BÖLÜM - 1342 - BotManagementPolicy - Bot - Doğrulanmış - Meydan Okuma - Serde
// 10023 export interface BotManagementPolicy {
// 10024   verified_bots: string;
// 10025   challenge_suspicious: boolean;
// 10026   block_bad_bots: boolean;
// 10027 }
// 10028 // *CIDO - BÖLÜM - 1343 - APISecurityPolicy - API Güvenliği - Kimlik Doğrulama - Hız Limit - Serde
// 10029 export interface APISecurityPolicy {
// 10030   auth_method: string;
// 10031   rate_limit_rpm: number;
// 10032   ip_whitelist: string[];
// 10033 }
// 10034 // *CIDO - BÖLÜM - 1344 - ZeroTrustPolicy - Sıfır Güven - Cihaz Duruşu - Oturum - Serde
// 10035 export interface ZeroTrustPolicy {
// 10036   device_posture_required: boolean;
// 10037   session_timeout_minutes: number;
// 10038   mfa_required: boolean;
// 10039 }
// 10040 // *CIDO - BÖLÜM - 1345 - EndpointSecurityPolicy - Uç Nokta - Antivirüs - Güvenlik Duvarı - Serde
// 10041 export interface EndpointSecurityPolicy {
// 10042   antivirus_required: boolean;
// 10043   firewall_enabled: boolean;
// 10044   disk_encryption_required: boolean;
// 10045 }
// 10046 // *CIDO - BÖLÜM - 1346 - PatchManagement - Yama Yönetimi - Program - Otomatik - Serde
// 10047 export interface PatchManagement {
// 10048   schedule: string;
// 10049   auto_approve: boolean;
// 10050   reboot_policy: string;
// 10051 }
// 10052 // *CIDO - BÖLÜM - 1347 - VulnerabilityManagement - Zafiyet Yönetimi - Tarama - Düzeltme - Serde
// 10053 export interface VulnerabilityManagement {
// 10054   scan_frequency: string;
// 10055   remediation_sla_days: number;
// 10056   risk_acceptance_process: string;
// 10057 }
// 10058 // *CIDO - BÖLÜM - 1348 - IncidentResponsePlan - Olay Müdahale - Aşamalar - Ekip - Serde
// 10059 export interface IncidentResponsePlan {
// 10060   phases: string[];
// 10061   team_members: string[];
// 10062   escalation_path: string[];
// 10063 }
// 10064 // *CIDO - BÖLÜM - 1349 - ForensicAnalysis - Adli Analiz - Kanıt - Zaman Çizelgesi - Serde
// 10065 export interface ForensicAnalysis {
// 10066   evidence_collected: string[];
// 10067   timeline: ForensicEvent[];
// 10068   conclusion: string;
// 10069 }
// 10070 // *CIDO - BÖLÜM - 1350 - ForensicEvent - Adli Olay - Zaman - Kaynak - Serde
// 10071 export interface ForensicEvent {
// 10072   timestamp: number;
// 10073   source: string;
// 10074   event: string;
// 10075 }
// 10076 // *CIDO - BÖLÜM - 1351 - ThreatIntelligence - Tehdit İstihbaratı - Gösterge - Kaynak - Serde
// 10077 export interface ThreatIntelligence {
// 10078   indicator: string;
// 10079   type: string;
// 10080   source: string;
// 10081   confidence: number;
// 10082 }
// 10083 // *CIDO - BÖLÜM - 1352 - ThreatHunting - Tehdit Avı - Hipotez - Bulgu - Serde
// 10084 export interface ThreatHunting {
// 10085   hypothesis: string;
// 10086   query: string;
// 10087   findings: string[];
// 10088 }
// 10089 // *CIDO - BÖLÜM - 1353 - DeceptionTechnology - Aldatmaca - Tuzak - Uyarı - Serde
// 10090 export interface DeceptionTechnology {
// 10091   honeypot_type: string;
// 10092   deployment_location: string;
// 10093   alerts_generated: number;
// 10094 }
// 10095 // *CIDO - BÖLÜM - 1354 - SecurityOrchestration - Güvenlik Orkestrasyonu - Playbook - Entegrasyon - Serde
// 10096 export interface SecurityOrchestration {
// 10097   playbook: string;
// 10098   integrations: string[];
// 10099   automated_actions: string[];
// 10100 }
// 10101 // *CIDO - BÖLÜM - 1355 - SOARPlaybook - SOAR Playbook - Tetikleyici - Eylemler - Serde
// 10102 export interface SOARPlaybook {
// 10103   trigger: string;
// 10104   actions: string[];
// 10105   conditional_logic: string;
// 10106 }
// 10107 // *CIDO - BÖLÜM - 1356 - SIEMIntegration - SIEM - Günlük Kaynağı - Ayrıştırma - Serde
// 10108 export interface SIEMIntegration {
// 10109   log_source: string;
// 10110   parser: string;
// 10111   retention_days: number;
// 10112 }
// 10113 // *CIDO - BÖLÜM - 1357 - LogAggregation - Günlük Toplama - Kaynak - Filtre - Serde
// 10114 export interface LogAggregation {
// 10115   sources: string[];
// 10116   filters: string[];
// 10117   destination: string;
// 10118 }
// 10119 // *CIDO - BÖLÜM - 1358 - MetricCollection - Metrik Toplama - Metrik - Etiketler - Serde
// 10120 export interface MetricCollection {
// 10121   metric_name: string;
// 10122   labels: Record<string, string>;
// 10123   value: number;
// 10124   timestamp: number;
// 10125 }
// 10126 // *CIDO - BÖLÜM - 1359 - TracingConfig - İzleme - Örnekleme - Arka Uç - Serde
// 10127 export interface TracingConfig {
// 10128   sampling_rate: number;
// 10129   backend: string;
// 10130   propagation_format: string;
// 10131 }
// 10132 // *CIDO - BÖLÜM - 1360 - SpanContext - Span Bağlamı - İz Kimliği - Ebeveyn - Serde
// 10133 export interface SpanContext {
// 10134   trace_id: string;
// 10135   span_id: string;
// 10136   parent_span_id?: string;
// 10137   sampled: boolean;
// 10138 }
// 10139 // *CIDO - BÖLÜM - 1361 - SpanAttributes - Span Özellikleri - Anahtar Değer - Serde
// 10140 export interface SpanAttributes {
// 10141   attributes: Record<string, string | number | boolean>;
// 10142 }
// 10143 // *CIDO - BÖLÜM - 1362 - SpanEvent - Span Olayı - İsim Zaman - Özellikler - Serde
// 10144 export interface SpanEvent {
// 10145   name: string;
// 10146   timestamp: number;
// 10147   attributes: Record<string, string>;
// 10148 }
// 10149 // *CIDO - BÖLÜM - 1363 - ResourceAttributes - Kaynak Özellikleri - Hizmet Adı - Sürüm - Serde
// 10150 export interface ResourceAttributes {
// 10151   service_name: string;
// 10152   service_version: string;
// 10153   environment: string;
// 10154 }
// 10155 // *CIDO - BÖLÜM - 1364 - SemanticConventions - Anlamsal Kurallar - HTTP DB - Mesajlaşma - Serde
// 10156 export interface SemanticConventions {
// 10157   http_method: string;
// 10158   http_status_code: number;
// 10159   db_system: string;
// 10160   messaging_system: string;
// 10161 }
// 10162 // *CIDO - BÖLÜM - 1365 - ObservabilityPipeline - Gözlemlenebilirlik - İz Log Metrik - Serde
// 10163 export interface ObservabilityPipeline {
// 10164   traces_enabled: boolean;
// 10165   logs_enabled: boolean;
// 10166   metrics_enabled: boolean;
// 10167 }
// 10168 // *CIDO - BÖLÜM - 1366 - SLOConfiguration - SLO - Hedef - Pencere - Serde
// 10169 export interface SLOConfiguration {
// 10170   name: string;
// 10171   target_percent: number;
// 10172   window_days: number;
// 10173 }
// 10174 // *CIDO - BÖLÜM - 1367 - SLIMeasurement - SLI - İyi Toplam - Değer - Serde
// 10175 export interface SLIMeasurement {
// 10176   good_count: number;
// 10177   total_count: number;
// 10178   sli_value: number;
// 10179 }
// 10180 // *CIDO - BÖLÜM - 1368 - ErrorBudget - Hata Bütçesi - Kalan - Tüketim Oranı - Serde
// 10181 export interface ErrorBudget {
// 10182   remaining_minutes: number;
// 10183   burn_rate: number;
// 10184   exhaustion_eta_hours: number;
// 10185 }
// 10186 // *CIDO - BÖLÜM - 1369 - ReleaseMetrics - Sürüm Metrikleri - Dağıtım Sıklığı - MTTR - Serde
// 10187 export interface ReleaseMetrics {
// 10188   deployment_frequency: string;
// 10189   lead_time_minutes: number;
// 10190   mttr_minutes: number;
// 10191   change_failure_rate: number;
// 10192 }
// 10193 // *CIDO - BÖLÜM - 1370 - ValueStreamMap - Değer Akışı - Aşamalar - Süre - Serde
// 10194 export interface ValueStreamMap {
// 10195   stages: ValueStreamStage[];
// 10196   total_lead_time_hours: number;
// 10197   total_process_time_hours: number;
// 10198 }
// 10199 // *CIDO - BÖLÜM - 1371 - ValueStreamStage - Değer Akış Aşaması - Ad Süre - Bekleme - Serde
// 10200 export interface ValueStreamStage {
// 10201   name: string;
// 10202   process_time_hours: number;
// 10203   wait_time_hours: number;
// 10204 }
// 10205 // *CIDO - BÖLÜM - 1372 - FlowMetrics - Akış Metrikleri - WIP - Verim - Serde
// 10206 export interface FlowMetrics {
// 10207   wip_count: number;
// 10208   throughput_per_week: number;
// 10209   cycle_time_days: number;
// 10210 }
// 10211 // *CIDO - BÖLÜM - 1373 - DevSecOpsPipeline - DevSecOps - Aşama Araçları - Kapı - Serde
// 10212 export interface DevSecOpsPipeline {
// 10213   stage: string;
// 10214   tools: string[];
// 10215   quality_gate: string;
// 10216 }
// 10217 // *CIDO - BÖLÜM - 1374 - QualityGate - Kalite Kapısı - Metrik Eşik - Eylem - Serde
// 10218 export interface QualityGate {
// 10219   metric: string;
// 10220   threshold: string;
// 10221   action: string;
// 10222 }
// 10223 // *CIDO - BÖLÜM - 1375 - ApprovalGate - Onay Kapısı - Onaylayıcı - Koşul - Serde
// 10224 export interface ApprovalGate {
// 10225   approvers: string[];
// 10226   required_approvals: number;
// 10227   timeout_hours: number;
// 10228 }
// 10229 // *CIDO - BÖLÜM - 1376 - FeatureFlagConfig - Özellik Bayrağı - Kural - Hedefleme - Serde
// 10230 export interface FeatureFlagConfig {
// 10231   flag_name: string;
// 10232   rules: FeatureFlagRule[];
// 10233   default_value: boolean;
// 10234 }
// 10235 // *CIDO - BÖLÜM - 1377 - FeatureFlagRule - Bayrak Kuralı - Özellik Operatör - Değer - Serde
// 10236 export interface FeatureFlagRule {
// 10237   attribute: string;
// 10238   operator: string;
// 10239   value: string;
// 10240 }
// 10241 // *CIDO - BÖLÜM - 1378 - CanaryRelease - Kanarya - Trafik Yüzdesi - Süre - Serde
// 10242 export interface CanaryRelease {
// 10243   version: string;
// 10244   traffic_percent: number;
// 10245   duration_minutes: number;
// 10246   metrics_to_monitor: string[];
// 10247 }
// 10248 // *CIDO - BÖLÜM - 1379 - BlueGreenDeployment - Mavi Yeşil - Aktif Pasif - Geçiş - Serde
// 10249 export interface BlueGreenDeployment {
// 10250   active_color: string;
// 10251   inactive_color: string;
// 10252   switchover_strategy: string;
// 10253 }
// 10254 // *CIDO - BÖLÜM - 1380 - RollingUpdate - Kademeli - Maks Kullanılamaz - Maks Dalga - Serde
// 10255 export interface RollingUpdate {
// 10256   max_unavailable: number;
// 10257   max_surge: number;
// 10258   batch_interval_seconds: number;
// 10259 }
// 10260 // *CIDO - BÖLÜM - 1381 - ABTestingConfig - A/B Testi - Trafik Bölme - Varyant - Serde
// 10261 export interface ABTestingConfig {
// 10262   variants: ABTestingVariant[];
// 10263   traffic_split: number[];
// 10264   sticky_sessions: boolean;
// 10265 }
// 10266 // *CIDO - BÖLÜM - 1382 - ABTestingVariant - A/B Varyantı - İsim Ağırlık - Yapılandırma - Serde
// 10267 export interface ABTestingVariant {
// 10268   name: string;
// 10269   weight: number;
// 10270   config: Record<string, unknown>;
// 10271 }
// 10272 // *CIDO - BÖLÜM - 1383 - ProgressiveDelivery - Aşamalı Teslimat - Halkalar - Süre - Serde
// 10273 export interface ProgressiveDelivery {
// 10274   rings: ProgressiveRing[];
// 10275   evaluation_period_hours: number;
// 10276 }
// 10277 // *CIDO - BÖLÜM - 1384 - ProgressiveRing - Aşamalı Halka - İsim Yüzde - Süre - Serde
// 10278 export interface ProgressiveRing {
// 10279   name: string;
// 10280   target_percent: number;
// 10281   bake_time_hours: number;
// 10282 }
// 10283 // *CIDO - BÖLÜM - 1385 - GitOpsConfig - GitOps - Depo Yol - Senkronizasyon - Serde
// 10284 export interface GitOpsConfig {
// 10285   repo_url: string;
// 10286   path: string;
// 10287   sync_interval_seconds: number;
// 10288   auto_sync: boolean;
// 10289 }
// 10290 // *CIDO - BÖLÜM - 1386 - OperatorPattern - Operatör Deseni - CRD - Denetleyici - Serde
// 10291 export interface OperatorPattern {
// 10292   crd_name: string;
// 10293   controller: string;
// 10294   reconciliation_interval_seconds: number;
// 10295 }
// 10296 // *CIDO - BÖLÜM - 1387 - DeclarativeConfig - Bildirimsel - Durum - Sürüklenme - Serde
// 10297 export interface DeclarativeConfig {
// 10298   desired_state: Record<string, unknown>;
// 10299   drift_detection: boolean;
// 10300   auto_remediate: boolean;
// 10301 }
// 10302 // *CIDO - BÖLÜM - 1388 - ImmutableInfrastructure - Değişmez Altyapı - İmaj - Yeniden Oluşturma - Serde
// 10303 export interface ImmutableInfrastructure {
// 10304   image_id: string;
// 10305   recreate_on_change: boolean;
// 10306   instance_refresh_seconds: number;
// 10307 }
// 10308 // *CIDO - BÖLÜM - 1389 - ServiceMeshConfig - Servis Ağı - Istio Linkerd - mTLS - Serde
// 10309 export interface ServiceMeshConfig {
// 10310   mesh_provider: string;
// 10311   mtls_enabled: boolean;
// 10312   traffic_policy: string;
// 10313 }
// 10314 // *CIDO - BÖLÜM - 1390 - CircuitBreakerPolicy - Devre Kesici - Hata Eşiği - Zaman Aşımı - Serde
// 10315 export interface CircuitBreakerPolicy {
// 10316   consecutive_errors: number;
// 10317   timeout_seconds: number;
// 10318   half_open_requests: number;
// 10319 }
// 10320 // *CIDO - BÖLÜM - 1391 - RetryPolicyConfig - Yeniden Deneme - Deneme Başına Zaman Aşımı - Serde
// 10321 export interface RetryPolicyConfig {
// 10322   attempts: number;
// 10323   per_try_timeout_seconds: number;
// 10324   retry_on: string;
// 10325 }
// 10326 // *CIDO - BÖLÜM - 1392 - TimeoutPolicy - Zaman Aşımı - İstek Tepki - Boşta - Serde
// 10327 export interface TimeoutPolicy {
// 10328   request_timeout_seconds: number;
// 10329   idle_timeout_seconds: number;
// 10330 }
// 10331 // *CIDO - BÖLÜM - 1393 - RateLimitingPolicy - Hız Sınırlama - İstek Birim - Serde
// 10332 export interface RateLimitingPolicy {
// 10333   requests_per_unit: number;
// 10334   unit: string;
// 10335   burst_size: number;
// 10336 }
// 10337 // *CIDO - BÖLÜM - 1394 - LoadBalancingPolicy - Yük Dengeleme - Algoritma - Oturum - Serde
// 10338 export interface LoadBalancingPolicy {
// 10339   algorithm: string;
// 10340   session_affinity: boolean;
// 10341   health_check_path: string;
// 10342 }
// 10343 // *CIDO - BÖLÜM - 1395 - TrafficShifting - Trafik Kaydırma - Ağırlık - Hedef - Serde
// 10344 export interface TrafficShifting {
// 10345   destinations: TrafficDestination[];
// 10346 }
// 10347 // *CIDO - BÖLÜM - 1396 - TrafficDestination - Trafik Hedefi - Ana Bilgisayar - Ağırlık - Serde
// 10348 export interface TrafficDestination {
// 10349   host: string;
// 10350   weight: number;
// 10351 }
// 10352 // *CIDO - BÖLÜM - 1397 - FaultInjection - Hata Enjeksiyonu - Gecikme - Durdurma - Serde
// 10353 export interface FaultInjection {
// 10354   delay_percent: number;
// 10355   delay_seconds: number;
// 10356   abort_percent: number;
// 10357   abort_status: number;
// 10358 }
// 10359 // *CIDO - BÖLÜM - 1398 - RequestMirroring - İstek Yansıtma - Hedef - Yüzde - Serde
// 10360 export interface RequestMirroring {
// 10361   mirror_host: string;
// 10362   mirror_percent: number;
// 10363 }
// 10364 // *CIDO - BÖLÜM - 1399 - HeaderManipulation - Başlık Manipülasyonu - Ayarla Ekle Kaldır - Serde
// 10365 export interface HeaderManipulation {
// 10366   set_headers: Record<string, string>;
// 10367   add_headers: Record<string, string>;
// 10368   remove_headers: string[];
// 10369 }
// 10370 // *CIDO - BÖLÜM - 1400 - URLRewrite - URL Yeniden Yazma - URI Yetki - Serde
// 10371 export interface URLRewrite {
// 10372   uri: string;
// 10373   authority: string;
// 10374 }
// 10375 // *CIDO - BÖLÜM - 1401 - CORSConfiguration - CORS - İzin Verilenler - Maks Yaş - Serde
// 10376 export interface CORSConfiguration {
// 10377   allow_origins: string[];
// 10378   allow_methods: string[];
// 10379   allow_headers: string[];
// 10380   max_age_seconds: number;
// 10381 }
// 10382 // *CIDO - BÖLÜM - 1402 - JWTValidation - JWT Doğrulama - İhraççı - İzleyici - Serde
// 10383 export interface JWTValidation {
// 10384   issuer: string;
// 10385   audience: string;
// 10386   jwks_uri: string;
// 10387 }
// 10388 // *CIDO - BÖLÜM - 1403 - OAuth2Proxy - OAuth2 Proxy - Sağlayıcı - Kapsam - Serde
// 10389 export interface OAuth2Proxy {
// 10390   provider: string;
// 10391   client_id: string;
// 10392   scopes: string[];
// 10393 }
// 10394 // *CIDO - BÖLÜM - 1404 - OpenPolicyAgent - OPA - Politika Sorgu - Serde
// 10395 export interface OpenPolicyAgent {
// 10396   policy_query: string;
// 10397   input_document: Record<string, unknown>;
// 10398 }
// 10399 // *CIDO - BÖLÜM - 1405 - CustomAuthService - Özel Kimlik Doğrulama - URL - Başlık - Serde
// 10400 export interface CustomAuthService {
// 10401   auth_url: string;
// 10402   headers_to_forward: string[];
// 10403 }
// 10404 // *CIDO - BÖLÜM - 1406 - APIKeyValidation - API Anahtarı - Konum - Beklenen - Serde
// 10405 export interface APIKeyValidation {
// 10406   location: string;
// 10407   key_name: string;
// 10408   expected_value: string;
// 10409 }
// 10410 // *CIDO - BÖLÜM - 1407 - MutualTLSConfig - Karşılıklı TLS - CA Sertifika - Doğrulama - Serde
// 10411 export interface MutualTLSConfig {
// 10412   ca_certificate: string;
// 10413   verify_depth: number;
// 10414   subject_alt_names: string[];
// 10415 }
// 10416 // *CIDO - BÖLÜM - 1408 - IPAllowList - IP İzin Listesi - CIDR - Eylem - Serde
// 10417 export interface IPAllowList {
// 10418   cidr_blocks: string[];
// 10419   action: string;
// 10420 }
// 10421 // *CIDO - BÖLÜM - 1409 - GeoIPFilter - Coğrafi IP - Ülkeler - Eylem - Serde
// 10422 export interface GeoIPFilter {
// 10423   countries: string[];
// 10424   action: string;
// 10425 }
// 10426 // *CIDO - BÖLÜM - 1410 - WebApplicationFirewall - WAF - SQLi XSS - Mod - Serde
// 10427 export interface WebApplicationFirewall {
// 10428   sql_injection: boolean;
// 10429   xss: boolean;
// 10430   command_injection: boolean;
// 10431   mode: string;
// 10432 }
// 10433 // *CIDO - BÖLÜM - 1411 - VirtualService - Sanal Hizmet - Ana Bilgisayar - Rota - Serde
// 10434 export interface VirtualService {
// 10435   hosts: string[];
// 10436   routes: VirtualServiceRoute[];
// 10437 }
// 10438 // *CIDO - BÖLÜM - 1412 - VirtualServiceRoute - Sanal Rota - Hedef - Ağırlık - Serde
// 10439 export interface VirtualServiceRoute {
// 10440   destination: string;
// 10441   weight: number;
// 10442 }
// 10443 // *CIDO - BÖLÜM - 1413 - DestinationRule - Hedef Kuralı - Alt Küme - Politika - Serde
// 10444 export interface DestinationRule {
// 10445   host: string;
// 10446   subsets: ServiceSubset[];
// 10447   traffic_policy: string;
// 10448 }
// 10449 // *CIDO - BÖLÜM - 1414 - ServiceSubset - Hizmet Alt Kümesi - İsim Etiketler - Serde
// 10450 export interface ServiceSubset {
// 10451   name: string;
// 10452   labels: Record<string, string>;
// 10453 }
// 10454 // *CIDO - BÖLÜM - 1415 - GatewayConfig - Ağ Geçidi - Sunucular - Seçici - Serde
// 10455 export interface GatewayConfig {
// 10456   servers: GatewayServer[];
// 10457   selector: Record<string, string>;
// 10458 }
// 10459 // *CIDO - BÖLÜM - 1416 - GatewayServer - Ağ Geçidi Sunucusu - Port Ana Bilgisayar - TLS - Serde
// 10460 export interface GatewayServer {
// 10461   port: number;
// 10462   hosts: string[];
// 10463   tls_mode: string;
// 10464 }
// 10465 // *CIDO - BÖLÜM - 1417 - SidecarConfig - Yardımcı - Giriş Çıkış - Serde
// 10466 export interface SidecarConfig {
// 10467   egress_hosts: string[];
// 10468   ingress_ports: number[];
// 10469 }
// 10470 // *CIDO - BÖLÜM - 1418 - PeerAuthentication - Eş Kimlik Doğrulama - mTLS Modu - Serde
// 10471 export interface PeerAuthentication {
// 10472   mtls_mode: string;
// 10473 }
// 10474 // *CIDO - BÖLÜM - 1419 - RequestAuthentication - İstek Kimlik Doğrulama - JWT - Serde
// 10475 export interface RequestAuthentication {
// 10476   jwt_rules: JWTRule[];
// 10477 }
// 10478 // *CIDO - BÖLÜM - 1420 - JWTRule - JWT Kuralı - İhraççı - JWKS - Serde
// 10479 export interface JWTRule {
// 10480   issuer: string;
// 10481   jwks_uri: string;
// 10482   audiences: string[];
// 10483 }
// 10484 // *CIDO - BÖLÜM - 1421 - AuthorizationPolicy - Yetkilendirme - Kural - Serde
// 10485 export interface AuthorizationPolicy {
// 10486   rules: AuthorizationRule[];
// 10487 }
// 10488 // *CIDO - BÖLÜM - 1422 - AuthorizationRule - Yetkilendirme Kuralı - Kimden - Nereye - Serde
// 10489 export interface AuthorizationRule {
// 10490   from: string[];
// 10491   to: string[];
// 10492   when: string[];
// 10493 }
// 10494 // *CIDO - BÖLÜM - 1423 - ServiceEntry - Hizmet Girişi - Ana Bilgisayar - Konum - Serde
// 10495 export interface ServiceEntry {
// 10496   hosts: string[];
// 10497   location: string;
// 10498   ports: ServicePort[];
// 10499 }
// 10500 // *CIDO - BÖLÜM - 1424 - ServicePort - Hizmet Portu - Numara Protokol - Serde
// 10501 export interface ServicePort {
// 10502   number: number;
// 10503   protocol: string;
// 10504   name: string;
// 10505 }
// 10506 // *CIDO - BÖLÜM - 1425 - WorkloadEntry - İş Yükü - Adres - Ağ - Serde
// 10507 export interface WorkloadEntry {
// 10508   address: string;
// 10509   network: string;
// 10510   labels: Record<string, string>;
// 10511 }
// 10512 // *CIDO - BÖLÜM - 1426 - EnvoyFilter - Elçi Filtresi - Bağlam - Yama - Serde
// 10513 export interface EnvoyFilter {
// 10514   context: string;
// 10515   patch: Record<string, unknown>;
// 10516 }
// 10517 // *CIDO - BÖLÜM - 1427 - WASMPlugin - WASM Eklentisi - URL - Aşama - Serde
// 10518 export interface WASMPlugin {
// 10519   url: string;
// 10520   phase: string;
// 10521   plugin_config: Record<string, unknown>;
// 10522 }
// 10523 // *CIDO - BÖLÜM - 1428 - TelemetryConfig - Telemetri - Sağlayıcı - Örnekleme - Serde
// 10524 export interface TelemetryConfig {
// 10525   provider: string;
// 10526   sampling_rate: number;
// 10527   metrics_overrides: Record<string, string>;
// 10528 }
// 10529 // *CIDO - BÖLÜM - 1429 - ProxyConfig - Proxy - Küme Adı - İstatistik - Serde
// 10530 export interface ProxyConfig {
// 10531   cluster_name: string;
// 10532   stats_flush_interval_seconds: number;
// 10533 }
// 10534 // *CIDO - BÖLÜM - 1430 - MeshConfig - Ağ - Erişim Günlüğü - İzleme - Serde
// 10535 export interface MeshConfig {
// 10536   access_log_file: string;
// 10537   enable_tracing: boolean;
// 10538   default_config: Record<string, unknown>;
// 10539 }
// 10540 // *CIDO - BÖLÜM - 1431 - IngressGateway - Giriş Ağ Geçidi - Dış IP - Port - Serde
// 10541 export interface IngressGateway {
// 10542   external_ip: string;
// 10543   ports: number[];
// 10544 }
// 10545 // *CIDO - BÖLÜM - 1432 - EgressGateway - Çıkış Ağ Geçidi - Çıkış IP'si - CIDR - Serde
// 10546 export interface EgressGateway {
// 10547   egress_ip: string;
// 10548   destination_cidrs: string[];
// 10549 }
// 10550 // *CIDO - BÖLÜM - 1433 - NetworkTopology - Ağ Topolojisi - Bölgeler - Gecikme - Serde
// 10551 export interface NetworkTopology {
// 10552   regions: string[];
// 10553   latency_matrix: number[][];
// 10554 }
// 10555 // *CIDO - BÖLÜM - 1434 - MultiClusterConfig - Çoklu Küme - Uzak Sır - Ağ Geçidi - Serde
// 10556 export interface MultiClusterConfig {
// 10557   remote_secrets: string[];
// 10558   eastwest_gateway: boolean;
// 10559 }
// 10560 // *CIDO - BÖLÜM - 1435 - FederationConfig - Federasyon - Güven Etki Alanı - İhracat - Serde
// 10561 export interface FederationConfig {
// 10562   trust_domain: string;
// 10563   exported_services: string[];
// 10564 }
// 10565 // *CIDO - BÖLÜM - 1436 - LocalityLoadBalancing - Yerellik - Bölge Ağırlığı - Serde
// 10566 export interface LocalityLoadBalancing {
// 10567   region_weights: Record<string, number>;
// 10568   failover_priority: string[];
// 10569 }
// 10570 // *CIDO - BÖLÜM - 1437 - OutlierDetectionConfig - Aykırı Değer - Ardışık Hata - Çıkarma - Serde
// 10571 export interface OutlierDetectionConfig {
// 10572   consecutive_errors: number;
// 10573   ejection_duration_seconds: number;
// 10574   max_ejection_percent: number;
// 10575 }
// 10576 // *CIDO - BÖLÜM - 1438 - ConnectionPoolConfig - Bağlantı Havuzu - Maks İstek - Serde
// 10577 export interface ConnectionPoolConfig {
// 10578   max_requests: number;
// 10579   max_pending_requests: number;
// 10580   max_retries: number;
// 10581 }
// 10582 // *CIDO - BÖLÜM - 1439 - HealthCheckPolicy - Sağlık Kontrolü - Yol - Aralık - Serde
// 10583 export interface HealthCheckPolicy {
// 10584   path: string;
// 10585   interval_seconds: number;
// 10586   timeout_seconds: number;
// 10587   healthy_threshold: number;
// 10588 }
// 10589 // *CIDO - BÖLÜM - 1440 - SecretDiscoveryService - Gizli Keşif - Referans - Serde
// 10590 export interface SecretDiscoveryService {
// 10591   secret_ref: string;
// 10592   refresh_interval_seconds: number;
// 10593 }
// 10594 // *CIDO - BÖLÜM - 1441 - WorkloadIdentity - İş Yükü Kimliği - Hizmet Hesabı - Serde
// 10595 export interface WorkloadIdentity {
// 10596   service_account: string;
// 10597   namespace: string;
// 10598 }
// 10599 // *CIDO - BÖLÜM - 1442 - KubernetesService - K8s Hizmeti - Küme IP - Seçici - Serde
// 10600 export interface KubernetesService {
// 10601   cluster_ip: string;
// 10602   selector: Record<string, string>;
// 10603   ports: ServicePort[];
// 10604 }
// 10605 // *CIDO - BÖLÜM - 1443 - KubernetesDeployment - K8s Dağıtımı - Kopya - İmaj - Serde
// 10606 export interface KubernetesDeployment {
// 10607   replicas: number;
// 10608   image: string;
// 10609   resources: ResourceRequirements;
// 10610 }
// 10611 // *CIDO - BÖLÜM - 1444 - ResourceRequirements - Kaynak - CPU Bellek - Serde
// 10612 export interface ResourceRequirements {
// 10613   cpu_request: string;
// 10614   cpu_limit: string;
// 10615   memory_request: string;
// 10616   memory_limit: string;
// 10617 }
// 10618 // *CIDO - BÖLÜM - 1445 - PodSecurityContext - Pod Güvenlik - Kullanıcı Grup - FSGroup - Serde
// 10619 export interface PodSecurityContext {
// 10620   run_as_user: number;
// 10621   run_as_group: number;
// 10622   fs_group: number;
// 10623 }
// 10624 // *CIDO - BÖLÜM - 1446 - PodAffinity - Pod Yakınlığı - Topoloji - Ağırlık - Serde
// 10625 export interface PodAffinity {
// 10626   topology_key: string;
// 10627   weight: number;
// 10628   pod_labels: Record<string, string>;
// 10629 }
// 10630 // *CIDO - BÖLÜM - 1447 - PodAntiAffinity - Pod Anti-Yakınlık - Gerekli Tercih Edilen - Serde
// 10631 export interface PodAntiAffinity {
// 10632   required: boolean;
// 10633   topology_key: string;
// 10634 }
// 10635 // *CIDO - BÖLÜM - 1448 - NodeSelector - Düğüm Seçici - Etiketler - Serde
// 10636 export interface NodeSelector {
// 10637   labels: Record<string, string>;
// 10638 }
// 10639 // *CIDO - BÖLÜM - 1449 - TaintToleration - Leke Toleransı - Anahtar Etki - Serde
// 10640 export interface TaintToleration {
// 10641   key: string;
// 10642   operator: string;
// 10643   effect: string;
// 10644 }
// 10645 // *CIDO - BÖLÜM - 1450 - PodDisruptionBudget - Pod Bozulma Bütçesi - Min Müsait - Serde
// 10646 export interface PodDisruptionBudget {
// 10647   min_available: number;
// 10648   max_unavailable: number;
// 10649 }
// 10650 // *CIDO - BÖLÜM - 1451 - HorizontalPodAutoscaler - Yatay Pod - Min Maks - Hedef - Serde
// 10651 export interface HorizontalPodAutoscaler {
// 10652   min_replicas: number;
// 10653   max_replicas: number;
// 10654   target_cpu_percent: number;
// 10655 }
// 10656 // *CIDO - BÖLÜM - 1452 - VerticalPodAutoscaler - Dikey Pod - Güncelleme Modu - Serde
// 10657 export interface VerticalPodAutoscaler {
// 10658   update_mode: string;
// 10659   min_cpu: string;
// 10660   max_cpu: string;
// 10661 }
// 10662 // *CIDO - BÖLÜM - 1453 - ClusterAutoscaler - Küme Otomatik Ölçekleyici - Maks Düğüm - Serde
// 10663 export interface ClusterAutoscaler {
// 10664   min_nodes: number;
// 10665   max_nodes: number;
// 10666   scale_down_delay_minutes: number;
// 10667 }
// 10668 // *CIDO - BÖLÜM - 1454 - PersistentVolumeClaim - Kalıcı Hacim - Depolama Sınıfı - Boyut - Serde
// 10669 export interface PersistentVolumeClaim {
// 10670   storage_class: string;
// 10671   size_gb: number;
// 10672   access_mode: string;
// 10673 }
// 10674 // *CIDO - BÖLÜM - 1455 - ConfigMap - Konfigürasyon Haritası - Veri - İkili Veri - Serde
// 10675 export interface ConfigMap {
// 10676   data: Record<string, string>;
// 10677   binary_data: Record<string, string>;
// 10678 }
// 10679 // *CIDO - BÖLÜM - 1456 - K8sSecret - Kubernetes Gizli - Tür - Veri - Serde
// 10680 export interface K8sSecret {
// 10681   type: string;
// 10682   data: Record<string, string>;
// 10683 }
// 10684 // *CIDO - BÖLÜM - 1457 - ServiceAccount - Hizmet Hesabı - Sırlar - Otomatik Bağlama - Serde
// 10685 export interface ServiceAccount {
// 10686   secrets: string[];
// 10687   automount_token: boolean;
// 10688 }
// 10689 // *CIDO - BÖLÜM - 1458 - Role - Rol - Kurallar - Serde
// 10690 export interface Role {
// 10691   rules: RoleRule[];
// 10692 }
// 10693 // *CIDO - BÖLÜM - 1459 - RoleRule - Rol Kuralı - API Grupları - Kaynaklar - Serde
// 10694 export interface RoleRule {
// 10695   api_groups: string[];
// 10696   resources: string[];
// 10697   verbs: string[];
// 10698 }
// 10699 // *CIDO - BÖLÜM - 1460 - ClusterRole - Küme Rolü - Toplama Kuralı - Serde
// 10700 export interface ClusterRole {
// 10701   aggregation_rule: string;
// 10702   rules: RoleRule[];
// 10703 }
// 10704 // *CIDO - BÖLÜM - 1461 - K8sRoleBinding - Kubernetes Rol Bağlama - Özneler - Rol Referansı - Serde
// 10705 export interface K8sRoleBinding {
// 10706   subjects: RoleSubject[];
// 10707   role_ref: RoleRef;
// 10708 }
// 10709 // *CIDO - BÖLÜM - 1462 - RoleSubject - Rol Öznesi - Tür İsim - Ad Alanı - Serde
// 10710 export interface RoleSubject {
// 10711   kind: string;
// 10712   name: string;
// 10713   namespace: string;
// 10714 }
// 10715 // *CIDO - BÖLÜM - 1463 - RoleRef - Rol Referansı - Tür İsim - API Grubu - Serde
// 10716 export interface RoleRef {
// 10717   kind: string;
// 10718   name: string;
// 10719   api_group: string;
// 10720 }
// 10721 // *CIDO - BÖLÜM - 1464 - K8sNetworkPolicy - K8s Ağ Politikası - Pod Seçici - Giriş Çıkış - Serde
// 10722 export interface K8sNetworkPolicy {
// 10723   pod_selector: Record<string, string>;
// 10724   ingress: NetworkPolicyRule[];
// 10725   egress: NetworkPolicyRule[];
// 10726 }
// 10727 // *CIDO - BÖLÜM - 1465 - NetworkPolicyRule - Ağ Politikası Kuralı - Portlar - Serde
// 10728 export interface NetworkPolicyRule {
// 10729   ports: NetworkPort[];
// 10730   from: NetworkPeer[];
// 10731 }
// 10732 // *CIDO - BÖLÜM - 1466 - NetworkPort - Ağ Portu - Protokol Port - Serde
// 10733 export interface NetworkPort {
// 10734   protocol: string;
// 10735   port: number;
// 10736 }
// 10737 // *CIDO - BÖLÜM - 1467 - NetworkPeer - Ağ Eşi - Pod Ad Alanı - IP Bloğu - Serde
// 10738 export interface NetworkPeer {
// 10739   pod_selector?: Record<string, string>;
// 10740   namespace_selector?: Record<string, string>;
// 10741   ip_block?: string;
// 10742 }
// 10743 // *CIDO - BÖLÜM - 1468 - ResourceQuota - Kaynak Kotası - Sert - Kapsam - Serde
// 10744 export interface ResourceQuota {
// 10745   hard: Record<string, string>;
// 10746   scopes: string[];
// 10747 }
// 10748 // *CIDO - BÖLÜM - 1469 - LimitRange - Sınır Aralığı - Varsayılan - Maks Min - Serde
// 10749 export interface LimitRange {
// 10750   default_request: Record<string, string>;
// 10751   max: Record<string, string>;
// 10752   min: Record<string, string>;
// 10753 }
// 10754 // *CIDO - BÖLÜM - 1470 - CustomResourceDefinition - CRD - Grup Sürüm - Kapsam - Serde
// 10755 export interface CustomResourceDefinition {
// 10756   group: string;
// 10757   version: string;
// 10758   scope: string;
// 10759   names: CRDNames;
// 10760 }
// 10761 // *CIDO - BÖLÜM - 1471 - CRDNames - CRD İsimleri - Çoğul Tekil - Kısa İsim - Serde
// 10762 export interface CRDNames {
// 10763   plural: string;
// 10764   singular: string;
// 10765   kind: string;
// 10766   short_names: string[];
// 10767 }
// 10768 // *CIDO - BÖLÜM - 1472 - AdmissionWebhook - Kabul Webhook - URL - Sertifika - Serde
// 10769 export interface AdmissionWebhook {
// 10770   url: string;
// 10771   ca_bundle: string;
// 10772   failure_policy: string;
// 10773 }
// 10774 // *CIDO - BÖLÜM - 1473 - MutatingWebhook - Değiştiren Webhook - Yeniden Enjeksiyon - Serde
// 10775 export interface MutatingWebhook {
// 10776   reinvocation_policy: string;
// 10777   rules: WebhookRule[];
// 10778 }
// 10779 // *CIDO - BÖLÜM - 1474 - WebhookRule - Webhook Kuralı - İşlemler - Kapsam - Serde
// 10780 export interface WebhookRule {
// 10781   operations: string[];
// 10782   scope: string;
// 10783 }
// 10784 // *CIDO - BÖLÜM - 1475 - ValidatingWebhook - Doğrulayan Webhook - Eşleme Politikası - Serde
// 10785 export interface ValidatingWebhook {
// 10786   match_policy: string;
// 10787   object_selector: Record<string, string>;
// 10788 }
// 10789 // *CIDO - BÖLÜM - 1476 - AuditPolicy - Denetim Politikası - Seviye - Aşama - Serde
// 10790 export interface AuditPolicy {
// 10791   level: string;
// 10792   stages: string[];
// 10793 }
// 10794 // *CIDO - BÖLÜM - 1477 - EventRateLimit - Olay Hız Sınırı - Sunucu Ad Alanı - Kova - Serde
// 10795 export interface EventRateLimit {
// 10796   server_burst: number;
// 10797   namespace_burst: number;
// 10798 }
// 10799 // *CIDO - BÖLÜM - 1478 - EncryptionConfiguration - Şifreleme - Sağlayıcı - Sır - Serde
// 10800 export interface EncryptionConfiguration {
// 10801   provider: string;
// 10802   secretbox_key: string;
// 10803 }
// 10804 // *CIDO - BÖLÜM - 1479 - KubeletConfig - Kubelet - Rezerve Edilmiş - Maks Pod - Serde
// 10805 export interface KubeletConfig {
// 10806   reserved_resources: Record<string, string>;
// 10807   max_pods: number;
// 10808 }
// 10809 // *CIDO - BÖLÜM - 1480 - KubeProxyConfig - Kube-proxy - Mod - IPVS - Serde
// 10810 export interface KubeProxyConfig {
// 10811   mode: string;
// 10812   ipvs_strict_arp: boolean;
// 10813 }
// 10814 // *CIDO - BÖLÜM - 1481 - CoreDNSConfig - CoreDNS - Önbellek - İletme - Serde
// 10815 export interface CoreDNSConfig {
// 10816   cache_ttl_seconds: number;
// 10817   forward_to: string[];
// 10818 }
// 10819 // *CIDO - BÖLÜM - 1482 - EtcdConfig - etcd - Kota Arka Uç - Önbellek Boyutu - Serde
// 10820 export interface EtcdConfig {
// 10821   quota_backend_bytes: number;
// 10822   snapshot_count: number;
// 10823   heartbeat_interval_ms: number;
// 10824 }
// 10825 // *CIDO - BÖLÜM - 1483 - APIServerConfig - API Sunucusu - İzin Verme - Kimlik Doğrulama - Serde
// 10826 export interface APIServerConfig {
// 10827   admission_plugins: string[];
// 10828   auth_modes: string[];
// 10829 }
// 10830 // *CIDO - BÖLÜM - 1484 - ControllerManagerConfig - Denetleyici Yöneticisi - Lider Seçimi - Serde
// 10831 export interface ControllerManagerConfig {
// 10832   leader_elect: boolean;
// 10833   node_monitor_grace_period: string;
// 10834 }
// 10835 // *CIDO - BÖLÜM - 1485 - SchedulerConfig - Zamanlayıcı - Profiller - Yüzde - Serde
// 10836 export interface SchedulerConfig {
// 10837   profiles: string[];
// 10838   percentage_of_nodes_to_score: number;
// 10839 }
// 10840 // *CIDO - BÖLÜM - 1486 - ContainerRuntime - Konteyner Çalışma Zamanı - Varsayılan - Sandbox - Serde
// 10841 export interface ContainerRuntime {
// 10842   default_runtime: string;
// 10843   sandbox_image: string;
// 10844 }
// 10845 // *CIDO - BÖLÜM - 1487 - CNIConfig - CNI - Eklenti - IPAM - Serde
// 10846 export interface CNIConfig {
// 10847   plugin: string;
// 10848   ipam_type: string;
// 10849   pod_cidr: string;
// 10850 }
// 10851 // *CIDO - BÖLÜM - 1488 - StorageClass - Depolama Sınıfı - Sağlayıcı - Geri Kazanım - Serde
// 10852 export interface StorageClass {
// 10853   provisioner: string;
// 10854   reclaim_policy: string;
// 10855   volume_binding_mode: string;
// 10856 }
// 10857 // *CIDO - BÖLÜM - 1489 - CSIStorageCapacity - CSI Depolama Kapasitesi - Düğüm Topolojisi - Serde
// 10858 export interface CSIStorageCapacity {
// 10859   node_topology: Record<string, string>;
// 10860   storage_class_name: string;
// 10861 }
// 10862 // *CIDO - BÖLÜM - 1490 - VolumeSnapshot - Hacim Anlık Görüntüsü - Kaynak - Sınıf - Serde
// 10863 export interface VolumeSnapshot {
// 10864   source_pvc: string;
// 10865   snapshot_class: string;
// 10866 }
// 10867 // *CIDO - BÖLÜM - 1491 - ClusterBackup - Küme Yedeği - Dahil Edilenler - Konum - Serde
// 10868 export interface ClusterBackup {
// 10869   included_namespaces: string[];
// 10870   backup_location: string;
// 10871   ttl_hours: number;
// 10872 }
// 10873 // *CIDO - BÖLÜM - 1492 - ClusterRestore - Küme Geri Yükleme - Yedek - Hariç Tut - Serde
// 10874 export interface ClusterRestore {
// 10875   backup_name: string;
// 10876   excluded_resources: string[];
// 10877 }
// 10878 // *CIDO - BÖLÜM - 1493 - UpgradePlan - Yükseltme Planı - Hedef Sürüm - Düğüm Havuzu - Serde
// 10879 export interface UpgradePlan {
// 10880   target_version: string;
// 10881   node_pools: string[];
// 10882   surge_upgrade: boolean;
// 10883 }
// 10884 // *CIDO - BÖLÜM - 1494 - NodePool - Düğüm Havuzu - Makine Tipi - Disk Boyutu - Serde
// 10885 export interface NodePool {
// 10886   machine_type: string;
// 10887   disk_size_gb: number;
// 10888   initial_node_count: number;
// 10889 }
// 10890 // *CIDO - BÖLÜM - 1495 - AddonConfig - Eklenti - İsim Sürüm - Yapılandırma - Serde
// 10891 export interface AddonConfig {
// 10892   name: string;
// 10893   version: string;
// 10894   configuration: Record<string, string>;
// 10895 }
// 10896 // *CIDO - BÖLÜM - 1496 - LoggingConfig - Günlükleme - Sürücü - Günlük Seviyesi - Serde
// 10897 export interface LoggingConfig {
// 10898   driver: string;
// 10899   log_level: string;
// 10900   fluentd_config: Record<string, unknown>;
// 10901 }
// 10902 // *CIDO - BÖLÜM - 1497 - MonitoringStack - İzleme Yığını - Prometheus Grafana - Alertmanager - Serde
// 10903 export interface MonitoringStack {
// 10904   prometheus_retention_days: number;
// 10905   grafana_admin_password: string;
// 10906   alertmanager_receivers: string[];
// 10907 }
// 10908 // *CIDO - BÖLÜM - 1498 - TracingBackend - İzleme Arka Ucu - Jaeger Zipkin - Örnekleme - Serde
// 10909 export interface TracingBackend {
// 10910   type: string;
// 10911   sampling_fraction: number;
// 10912   endpoint: string;
// 10913 }
// 10914 // *CIDO - BÖLÜM - 1499 - ServiceMeshDashboard - Servis Ağı Paneli - Grafana JSON - Serde
// 10915 export interface ServiceMeshDashboard {
// 10916   title: string;
// 10917   grafana_json: Record<string, unknown>;
// 10918 }
// 10919 // *CIDO - BÖLÜM - 1500 - RunbookAutomation - Çalıştırma Kitabı Otomasyonu - Betik - Tetikleyici - Serde
// 10920 export interface RunbookAutomation {
// 10921   script: string;
// 10922   trigger: string;
// 10923   timeout_seconds: number;
// 10924 }
// 10925 // *CIDO - BÖLÜM - 1501 - SelfHealingAction - Kendi Kendini İyileştirme - Eylem - Koşul - Serde
// 10926 export interface SelfHealingAction {
// 10927   condition: string;
// 10928   action: string;
// 10929   cooldown_seconds: number;
// 10930   max_attempts: number;
// 10931 }
// 10932 // *CIDO - BÖLÜM - 1502 - RemediationStrategy - Düzeltme Stratejisi - Yeniden Başlatma - Yeniden Oluşturma - Serde
// 10933 export interface RemediationStrategy {
// 10934   restart_policy: string;
// 10935   recreate_timeout_seconds: number;
// 10936   node_replacement_enabled: boolean;
// 10937 }
// 10938 // *CIDO - BÖLÜM - 1503 - EventBusConfig - Olay Yolu - Sağlayıcı - Konu - Serde
// 10939 export interface EventBusConfig {
// 10940   provider: string;
// 10941   topic_prefix: string;
// 10942   dead_letter_queue: string;
// 10943 }
// 10944 // *CIDO - BÖLÜM - 1504 - EventSourceConfig - Olay Kaynağı - Tür - Filtre - Serde
// 10945 export interface EventSourceConfig {
// 10946   type: string;
// 10947   filter: string;
// 10948   destination_topic: string;
// 10949 }
// 10950 // *CIDO - BÖLÜM - 1505 - EventTransformer - Olay Dönüştürücü - Girdi Şeması - Çıktı Şeması - Serde
// 10951 export interface EventTransformer {
// 10952   input_schema: Record<string, string>;
// 10953   output_schema: Record<string, string>;
// 10954   transformation_template: string;
// 10955 }
// 10956 // *CIDO - BÖLÜM - 1506 - CloudEventFormat - CloudEvents - Tür Kaynak - Veri - Serde
// 10957 export interface CloudEventFormat {
// 10958   type: string;
// 10959   source: string;
// 10960   subject: string;
// 10961   data: Record<string, unknown>;
// 10962   data_content_type: string;
// 10963 }
// 10964 // *CIDO - BÖLÜM - 1507 - WorkflowDefinition - İş Akışı - Adımlar - Girdi - Serde
// 10965 export interface WorkflowDefinition {
// 10966   name: string;
// 10967   steps: WorkflowStep[];
// 10968   input_parameters: Record<string, string>;
// 10969 }
// 10970 // *CIDO - BÖLÜM - 1508 - WorkflowStep - İş Akışı Adımı - Eylem - Sonraki - Serde
// 10971 export interface WorkflowStep {
// 10972   action: string;
// 10973   next_on_success: string;
// 10974   next_on_failure: string;
// 10975   timeout_seconds: number;
// 10976 }
// 10977 // *CIDO - BÖLÜM - 1509 - StateMachineConfig - Durum Makinesi - Durumlar - Geçişler - Serde
// 10978 export interface StateMachineConfig {
// 10979   initial_state: string;
// 10980   states: Record<string, StateDefinition>;
// 10981 }
// 10982 // *CIDO - BÖLÜM - 1510 - StateDefinition - Durum Tanımı - Tür - Sonraki - Serde
// 10983 export interface StateDefinition {
// 10984   type: string;
// 10985   next: string;
// 10986   end: boolean;
// 10987   retry_policy?: RetryPolicy;
// 10988 }
// 10989 // *CIDO - BÖLÜM - 1511 - SagaOrchestrator - Saga - Adımlar - Telafi - Serde
// 10990 export interface SagaOrchestrator {
// 10991   saga_id: string;
// 10992   steps: SagaStep[];
// 10993   status: string;
// 10994 }
// 10995 // *CIDO - BÖLÜM - 1512 - SagaStep - Saga Adımı - Eylem - Telafi - Serde
// 10996 export interface SagaStep {
// 10997   action: string;
// 10998   compensation: string;
// 10999   status: string;
// 11000   executed_at?: number;
// 11001 }
// 11002 // *CIDO - BÖLÜM - 1513 - OutboxPattern - Giden Kutusu - Olay - Durum - Serde
// 11003 export interface OutboxPattern {
// 11004   event_id: string;
// 11005   event_type: string;
// 11006   payload: Record<string, unknown>;
// 11007   status: string;
// 11008   created_at: number;
// 11009 }
// 11010 // *CIDO - BÖLÜM - 1514 - InboxPattern - Gelen Kutusu - Idempotent - İşlenmiş - Serde
// 11011 export interface InboxPattern {
// 11012   message_id: string;
// 11013   processed: boolean;
// 11014   processed_at?: number;
// 11015   handler: string;
// 11016 }
// 11017 // *CIDO - BÖLÜM - 1515 - ChangeDataCapture - CDC - Kaynak Tablo - Hedef - Serde
// 11018 export interface ChangeDataCapture {
// 11019   source_table: string;
// 11020   target_topic: string;
// 11021   operation_types: string[];
// 11022 }
// 11023 // *CIDO - BÖLÜM - 1516 - DataPipeline - Veri Hattı - Kaynak - Dönüşüm - Havuz - Serde
// 11024 export interface DataPipeline {
// 11025   source: string;
// 11026   transformations: string[];
// 11027   sink: string;
// 11028 }
// 11029 // *CIDO - BÖLÜM - 1517 - ETLJob - ETL İşi - Çıkarma - Dönüştürme - Yükleme - Serde
// 11030 export interface ETLJob {
// 11031   extract_query: string;
// 11032   transform_script: string;
// 11033   load_target: string;
// 11034 }
// 11035 // *CIDO - BÖLÜM - 1518 - DataLakeConfig - Veri Gölü - Format - Bölümleme - Serde
// 11036 export interface DataLakeConfig {
// 11037   format: string;
// 11038   partitioning_columns: string[];
// 11039   compression: string;
// 11040 }
// 11041 // *CIDO - BÖLÜM - 1519 - DataWarehouseSchema - Veri Ambarı - Yıldız Şeması - Boyut - Serde
// 11042 export interface DataWarehouseSchema {
// 11043   fact_tables: string[];
// 11044   dimension_tables: string[];
// 11045   relationships: DBSchemaRelationship[];
// 11046 }
// 11047 // *CIDO - BÖLÜM - 1520 - OLAPCube - OLAP Küpü - Boyutlar - Ölçüler - Serde
// 11048 export interface OLAPCube {
// 11049   name: string;
// 11050   dimensions: string[];
// 11051   measures: string[];
// 11052 }
// 11053 // *CIDO - BÖLÜM - 1521 - DataMartConfig - Veri Martı - Kaynak Küp - Filtre - Serde
// 11054 export interface DataMartConfig {
// 11055   source_cube: string;
// 11056   filter_expression: string;
// 11057   target_tables: string[];
// 11058 }
// 11059 // *CIDO - BÖLÜM - 1522 - StreamProcessing - Akış İşleme - Pencere - Toplama - Serde
// 11060 export interface StreamProcessing {
// 11061   window_type: string;
// 11062   window_size_seconds: number;
// 11063   aggregations: string[];
// 11064 }
// 11065 // *CIDO - BÖLÜM - 1523 - ComplexEventProcessing - Karmaşık Olay - Desen - Eylem - Serde
// 11066 export interface ComplexEventProcessing {
// 11067   pattern: string;
// 11068   within_seconds: number;
// 11069   action: string;
// 11070 }
// 11071 // *CIDO - BÖLÜM - 1524 - DataQualityRule - Veri Kalitesi - Sütun - Kural - Serde
// 11072 export interface DataQualityRule {
// 11073   column: string;
// 11074   rule_type: string;
// 11075   expectation: string;
// 11076 }
// 11077 // *CIDO - BÖLÜM - 1525 - DataQualityReport - Veri Kalitesi Raporu - Başarılı Başarısız - Serde
// 11078 export interface DataQualityReport {
// 11079   rules_checked: number;
// 11080   rules_passed: number;
// 11081   rules_failed: number;
// 11082   failures: DataQualityFailure[];
// 11083 }
// 11084 // *CIDO - BÖLÜM - 1526 - DataQualityFailure - Kalite Başarısızlığı - Sütun Değer - Beklenen - Serde
// 11085 export interface DataQualityFailure {
// 11086   column: string;
// 11087   value: unknown;
// 11088   expected: string;
// 11089   rule: string;
// 11090 }
// 11091 // *CIDO - BÖLÜM - 1527 - DataLineage - Veri Soyu - Kaynak - Hedef - Serde
// 11092 export interface DataLineage {
// 11093   source_table: string;
// 11094   target_table: string;
// 11095   transformation: string;
// 11096 }
// 11097 // *CIDO - BÖLÜM - 1528 - DataCatalog - Veri Kataloğu - Tablo - Sütunlar - Serde
// 11098 export interface DataCatalog {
// 11099   table_name: string;
// 11100   columns: DataCatalogColumn[];
// 11101   owner: string;
// 11102   tags: string[];
// 11103 }
// 11104 // *CIDO - BÖLÜM - 1529 - DataCatalogColumn - Katalog Sütunu - Tip - Açıklama - Serde
// 11105 export interface DataCatalogColumn {
// 11106   name: string;
// 11107   type: string;
// 11108   description: string;
// 11109   nullable: boolean;
// 11110 }
// 11111 // *CIDO - BÖLÜM - 1530 - DataProfiling - Veri Profilleme - İstatistikler - Histogram - Serde
// 11112 export interface DataProfiling {
// 11113   column: string;
// 11114   min: number | string;
// 11115   max: number | string;
// 11116   null_count: number;
// 11117   distinct_count: number;
// 11118 }
// 11119 // *CIDO - BÖLÜM - 1531 - DataMasking - Veri Maskeleme - Sütun - Yöntem - Serde
// 11120 export interface DataMasking {
// 11121   column: string;
// 11122   method: string;
// 11123   format: string;
// 11124 }
// 11125 // *CIDO - BÖLÜM - 1532 - DataTokenization - Veri Tokenizasyonu - Değer - Token - Serde
// 11126 export interface DataTokenization {
// 11127   original_value: string;
// 11128   token: string;
// 11129   vault_key: string;
// 11130 }
// 11131 // *CIDO - BÖLÜM - 1533 - GDPRRequest - GDPR Talebi - Tür - Durum - Serde
// 11132 export interface GDPRRequest {
// 11133   request_type: string;
// 11134   user_id: string;
// 11135   status: string;
// 11136   submitted_at: number;
// 11137   completed_at?: number;
// 11138 }
// 11139 // *CIDO - BÖLÜM - 1534 - CCPARequest - CCPA Talebi - Silme - Erişim - Serde
// 11140 export interface CCPARequest {
// 11141   request_type: string;
// 11142   user_id: string;
// 11143   status: string;
// 11144   verification_method: string;
// 11145 }
// 11146 // *CIDO - BÖLÜM - 1535 - CookiePolicyConfig - Çerez Politikası - Kategoriler - Serde
// 11147 export interface CookiePolicyConfig {
// 11148   categories: CookieCategory[];
// 11149   consent_duration_days: number;
// 11150 }
// 11151 // *CIDO - BÖLÜM - 1536 - CookieCategory - Çerez Kategorisi - İsim - Gerekli - Serde
// 11152 export interface CookieCategory {
// 11153   name: string;
// 11154   required: boolean;
// 11155   description: string;
// 11156 }
// 11157 // *CIDO - BÖLÜM - 1537 - ConsentLog - Onay Günlüğü - Kullanıcı - Kategoriler - Serde
// 11158 export interface ConsentLog {
// 11159   user_id: string;
// 11160   accepted_categories: string[];
// 11161   rejected_categories: string[];
// 11162   timestamp: number;
// 11163 }
// 11164 // *CIDO - BÖLÜM - 1538 - PrivacyImpactAssessment - Gizlilik Etki - Proje - Risk - Serde
// 11165 export interface PrivacyImpactAssessment {
// 11166   project_name: string;
// 11167   data_types: string[];
// 11168   risk_level: string;
// 11169   mitigations: string[];
// 11170 }
// 11171 // *CIDO - BÖLÜM - 1539 - DataTransferAgreement - Veri Aktarımı - SCC - BCR - Serde
// 11172 export interface DataTransferAgreement {
// 11173   mechanism: string;
// 11174   countries: string[];
// 11175   effective_date: number;
// 11176   expiration_date: number;
// 11177 }
// 11178 // *CIDO - BÖLÜM - 1540 - IncidentNotification - Olay Bildirimi - Otorite - Süre - Serde
// 11179 export interface IncidentNotification {
// 11180   authority: string;
// 11181   notification_deadline_hours: number;
// 11182   reported_at?: number;
// 11183   report_content: string;
// 11184 }
// 11185 // *CIDO - BÖLÜM - 1541 - DataBreachAssessment - Veri İhlali - Risk - Bildirim - Serde
// 11186 export interface DataBreachAssessment {
// 11187   breach_id: string;
// 11188   risk_to_individuals: string;
// 11189   notification_required: boolean;
// 11190   affected_data_categories: string[];
// 11191 }
// 11192 // *CIDO - BÖLÜM - 1542 - RecordOfProcessing - İşleme Kaydı - Amaç - Hukuki Sebep - Serde
// 11193 export interface RecordOfProcessing {
// 11194   activity_name: string;
// 11195   purpose: string;
// 11196   legal_basis: string;
// 11197   data_subjects: string[];
// 11198   retention_period_days: number;
// 11199 }
// 11200 // *CIDO - BÖLÜM - 1543 - DPOContact - Veri Koruma Görevlisi - İsim İletişim - Serde
// 11201 export interface DPOContact {
// 11202   name: string;
// 11203   email: string;
// 11204   phone: string;
// 11205 }
// 11206 // *CIDO - BÖLÜM - 1544 - EURepresentative - AB Temsilcisi - Şirket - Adres - Serde
// 11207 export interface EURepresentative {
// 11208   company_name: string;
// 11209   address: string;
// 11210   email: string;
// 11211 }
// 11212 // *CIDO - BÖLÜM - 1545 - SupervisoryAuthority - Denetim Otoritesi - Ülke - İletişim - Serde
// 11213 export interface SupervisoryAuthority {
// 11214   country: string;
// 11215   name: string;
// 11216   website: string;
// 11217   complaint_form_url: string;
// 11218 }
// 11219 // *CIDO - BÖLÜM - 1546 - CookieScanner - Çerez Tarayıcı - URL - Çerezler - Serde
// 11220 export interface CookieScanner {
// 11221   url: string;
// 11222   cookies_found: ScannedCookie[];
// 11223   scan_date: number;
// 11224 }
// 11225 // *CIDO - BÖLÜM - 1547 - ScannedCookie - Taranan Çerez - İsim Alan Adı - Süre - Serde
// 11226 export interface ScannedCookie {
// 11227   name: string;
// 11228   domain: string;
// 11229   duration_seconds: number;
// 11230   category: string;
// 11231 }
// 11232 // *CIDO - BÖLÜM - 1548 - PrivacyPolicyVersion - Gizlilik Politikası - Sürüm - URL - Serde
// 11233 export interface PrivacyPolicyVersion {
// 11234   version: string;
// 11235   effective_date: number;
// 11236   url: string;
// 11237 }
// 11238 // *CIDO - BÖLÜM - 1549 - TermsOfServiceVersion - Kullanım Koşulları - Sürüm - Kabul - Serde
// 11239 export interface TermsOfServiceVersion {
// 11240   version: string;
// 11241   acceptance_required: boolean;
// 11242   accepted_users_count: number;
// 11243 }
// 11244 // *CIDO - BÖLÜM - 1550 - APIChangelog - API Değişiklik Günlüğü - Sürüm - Değişiklikler - Serde
// 11245 export interface APIChangelog {
// 11246   version: string;
// 11247   changes: APIChange[];
// 11248   release_date: number;
// 11249 }
// 11250 // *CIDO - BÖLÜM - 1551 - APIChange - API Değişikliği - Uç Nokta - Tür - Serde
// 11251 export interface APIChange {
// 11252   endpoint: string;
// 11253   type: string;
// 11254   description: string;
// 11255   breaking: boolean;
// 11256 }
// 11257 // *CIDO - BÖLÜM - 1552 - SDKRelease - SDK Sürümü - Dil - Sürüm - Serde
// 11258 export interface SDKRelease {
// 11259   language: string;
// 11260   version: string;
// 11261   download_url: string;
// 11262   release_notes: string;
// 11263 }
// 11264 // *CIDO - BÖLÜM - 1553 - APIMigrationGuide - API Geçiş Rehberi - Kaynak Hedef - Serde
// 11265 export interface APIMigrationGuide {
// 11266   from_version: string;
// 11267   to_version: string;
// 11268   steps: string[];
// 11269   code_examples: Record<string, string>;
// 11270 }
// 11271 // *CIDO - BÖLÜM - 1554 - DeprecationSchedule - Kullanımdan Kaldırma - Tarih - Alternatif - Serde
// 11272 export interface DeprecationSchedule {
// 11273   feature: string;
// 11274   deprecation_date: number;
// 11275   sunset_date: number;
// 11276   alternative: string;
// 11277 }
// 11278 // *CIDO - BÖLÜM - 1555 - SunsetHeader - Sunset Başlığı - Tarih - Bağlantı - Serde
// 11279 export interface SunsetHeader {
// 11280   date: string;
// 11281   link: string;
// 11282   deprecation_policy_url: string;
// 11283 }
// 11284 // *CIDO - BÖLÜM - 1556 - AnnouncementBanner - Duyuru Bannerı - Mesaj - Tür - Serde
// 11285 export interface AnnouncementBanner {
// 11286   message: string;
// 11287   type: string;
// 11288   dismissible: boolean;
// 11289   expires_at: number;
// 11290 }
// 11291 // *CIDO - BÖLÜM - 1557 - StatusPageIncident - Durum Sayfası - Olay - Güncellemeler - Serde
// 11292 export interface StatusPageIncident {
// 11293   id: string;
// 11294   title: string;
// 11295   status: string;
// 11296   updates: StatusUpdate[];
// 11297   created_at: number;
// 11298 }
// 11299 // *CIDO - BÖLÜM - 1558 - StatusUpdate - Durum Güncellemesi - Mesaj - Zaman - Serde
// 11300 export interface StatusUpdate {
// 11301   message: string;
// 11302   status: string;
// 11303   timestamp: number;
// 11304 }
// 11305 // *CIDO - BÖLÜM - 1559 - ComponentStatus - Bileşen Durumu - İsim - Operasyonel - Serde
// 11306 export interface ComponentStatus {
// 11307   name: string;
// 11308   status: string;
// 11309   description: string;
// 11310 }
// 11311 // *CIDO - BÖLÜM - 1560 - UptimeMetric - Çalışma Süresi - Yüzde - Dönem - Serde
// 11312 export interface UptimeMetric {
// 11313   period: string;
// 11314   uptime_percentage: number;
// 11315   downtime_minutes: number;
// 11316 }
// 11317 // *CIDO - BÖLÜM - 1561 - IncidentFrequency - Olay Sıklığı - Sayı - Dönem - Serde
// 11318 export interface IncidentFrequency {
// 11319   period: string;
// 11320   incident_count: number;
// 11321   avg_resolution_minutes: number;
// 11322 }
// 11323 // *CIDO - BÖLÜM - 1562 - TenantHealthReport - Kiracı Sağlığı - Durum - Olaylar - Serde
// 11324 export interface TenantHealthReport {
// 11325   tenant_id: string;
// 11326   overall_status: string;
// 11327   active_incidents: number;
// 11328   uptime_30d: number;
// 11329 }
// 11330 // *CIDO - BÖLÜM - 1563 - ScheduledMaintenanceNotice - Planlı Bakım - Başlangıç Bitiş - Serde
// 11331 export interface ScheduledMaintenanceNotice {
// 11332   id: string;
// 11333   title: string;
// 11334   start_time: number;
// 11335   end_time: number;
// 11336   affected_services: string[];
// 11337 }
// 11338 // *CIDO - BÖLÜM - 1564 - SubscriberList - Abone Listesi - E-posta - Telefon - Serde
// 11339 export interface SubscriberList {
// 11340   id: string;
// 11341   tenant_id: string;
// 11342   name: string;
// 11343   subscriber_count: number;
// 11344 }
// 11345 // *CIDO - BÖLÜM - 1565 - SubscriberInfo - Abone Bilgisi - E-posta - Durum - Serde
// 11346 export interface SubscriberInfo {
// 11347   email: string;
// 11348   status: string;
// 11349   subscribed_at: number;
// 11350   unsubscribed_at?: number;
// 11351 }
// 11352 // *CIDO - BÖLÜM - 1566 - EmailCampaignStats - Kampanya İstatistikleri - Gönderilen Açılan - Serde
// 11353 export interface EmailCampaignStats {
// 11354   campaign_id: string;
// 11355   sent: number;
// 11356   delivered: number;
// 11357   opened: number;
// 11358   clicked: number;
// 11359   bounced: number;
// 11360 }
// 11361 // *CIDO - BÖLÜM - 1567 - ABTestCampaign - A/B Test Kampanyası - Varyantlar - Serde
// 11362 export interface ABTestCampaign {
// 11363   id: string;
// 11364   variants: CampaignVariant[];
// 11365   winner_criteria: string;
// 11366 }
// 11367 // *CIDO - BÖLÜM - 1568 - CampaignVariant - Kampanya Varyantı - Konu - İçerik - Serde
// 11368 export interface CampaignVariant {
// 11369   subject: string;
// 11370   content: string;
// 11371   recipient_percent: number;
// 11372 }
// 11373 // *CIDO - BÖLÜM - 1569 - AutomationWorkflow - Otomasyon İş Akışı - Tetikleyici - Eylem - Serde
// 11374 export interface AutomationWorkflow {
// 11375   id: string;
// 11376   trigger: string;
// 11377   actions: AutomationAction[];
// 11378   is_active: boolean;
// 11379 }
// 11380 // *CIDO - BÖLÜM - 1570 - AutomationAction - Otomasyon Eylemi - Tür - Gecikme - Serde
// 11381 export interface AutomationAction {
// 11382   type: string;
// 11383   delay_seconds: number;
// 11384   config: Record<string, unknown>;
// 11385 }
// 11386 // *CIDO - BÖLÜM - 1571 - PersonalizationRule - Kişiselleştirme - Segment - İçerik - Serde
// 11387 export interface PersonalizationRule {
// 11388   segment: string;
// 11389   content_template: string;
// 11390   priority: number;
// 11391 }
// 11392 // *CIDO - BÖLÜM - 1572 - DynamicContent - Dinamik İçerik - Alan - Değer - Serde
// 11393 export interface DynamicContent {
// 11394   field: string;
// 11395   value: string;
// 11396   fallback: string;
// 11397 }
// 11398 // *CIDO - BÖLÜM - 1573 - RecommendationEngine - Öneri Motoru - Strateji - Model - Serde
// 11399 export interface RecommendationEngine {
// 11400   strategy: string;
// 11401   model_version: string;
// 11402   max_recommendations: number;
// 11403 }
// 11404 // *CIDO - BÖLÜM - 1574 - CustomerSegment - Müşteri Segmenti - Kriter - Boyut - Serde
// 11405 export interface CustomerSegment {
// 11406   id: string;
// 11407   name: string;
// 11408   criteria: string;
// 11409   estimated_size: number;
// 11410 }
// 11411 // *CIDO - BÖLÜM - 1575 - AudienceBuilder - Kitle Oluşturucu - Filtreler - Mantık - Serde
// 11412 export interface AudienceBuilder {
// 11413   filters: AudienceFilter[];
// 11414   logic: string;
// 11415 }
// 11416 // *CIDO - BÖLÜM - 1576 - AudienceFilter - Kitle Filtresi - Alan Operatör - Değer - Serde
// 11417 export interface AudienceFilter {
// 11418   field: string;
// 11419   operator: string;
// 11420   value: string | number;
// 11421 }
// 11422 // *CIDO - BÖLÜM - 1577 - JourneyBuilder - Yolculuk Oluşturucu - Adımlar - Hedef - Serde
// 11423 export interface JourneyBuilder {
// 11424   name: string;
// 11425   steps: JourneyStep[];
// 11426   goal: string;
// 11427 }
// 11428 // *CIDO - BÖLÜM - 1578 - JourneyStep - Yolculuk Adımı - Eylem - Bekleme - Serde
// 11429 export interface JourneyStep {
// 11430   action: string;
// 11431   wait_duration_seconds: number;
// 11432   condition: string;
// 11433 }
// 11434 // *CIDO - BÖLÜM - 1579 - AttributionModel - Atıf Modeli - Kanal - Ağırlık - Serde
// 11435 export interface AttributionModel {
// 11436   model_type: string;
// 11437   channel_weights: Record<string, number>;
// 11438   lookback_window_days: number;
// 11439 }
// 11440 // *CIDO - BÖLÜM - 1580 - ConversionPath - Dönüşüm Yolu - Adımlar - Süre - Serde
// 11441 export interface ConversionPath {
// 11442   user_id: string;
// 11443   steps: ConversionStep[];
// 11444   total_duration_days: number;
// 11445   converted: boolean;
// 11446 }
// 11447 // *CIDO - BÖLÜM - 1581 - ConversionStep - Dönüşüm Adımı - Kanal - Zaman - Serde
// 11448 export interface ConversionStep {
// 11449   channel: string;
// 11450   timestamp: number;
// 11451   campaign_id?: string;
// 11452 }
// 11453 // *CIDO - BÖLÜM - 1582 - ROASCalculation - ROAS Hesaplama - Harcama - Gelir - Serde
// 11454 export interface ROASCalculation {
// 11455   campaign_id: string;
// 11456   spend: number;
// 11457   revenue: number;
// 11458   roas: number;
// 11459 }
// 11460 // *CIDO - BÖLÜM - 1583 - CACCalculation - CAC Hesaplama - Maliyet - Kazanılan - Serde
// 11461 export interface CACCalculation {
// 11462   period: string;
// 11463   total_marketing_spend: number;
// 11464   new_customers: number;
// 11465   cac: number;
// 11466 }
// 11467 // *CIDO - BÖLÜM - 1584 - LTVReport - LTV Raporu - Segment - Ortalama - Serde
// 11468 export interface LTVReport {
// 11469   segment: string;
// 11470   avg_ltv: number;
// 11471   avg_cac: number;
// 11472   ltv_cac_ratio: number;
// 11473 }
// 11474 // *CIDO - BÖLÜM - 1585 - ChurnRateAnalysis - Kayıp Oranı - Dönem - Oran - Serde
// 11475 export interface ChurnRateAnalysis {
// 11476   period: string;
// 11477   churn_rate: number;
// 11478   lost_customers: number;
// 11479   retained_customers: number;
// 11480 }
// 11481 // *CIDO - BÖLÜM - 1586 - NPSDashboard - NPS Paneli - Skor - Trend - Serde
// 11482 export interface NPSDashboard {
// 11483   current_score: number;
// 11484   previous_score: number;
// 11485   trend: string;
// 11486   responses_this_month: number;
// 11487 }
// 11488 // *CIDO - BÖLÜM - 1587 - CSATDashboard - CSAT Paneli - Memnuniyet - Kategori - Serde
// 11489 export interface CSATDashboard {
// 11490   overall_score: number;
// 11491   category_scores: Record<string, number>;
// 11492   response_rate: number;
// 11493 }
// 11494 // *CIDO - BÖLÜM - 1588 - TicketVolumeReport - Bilet Hacmi - Açılan Kapanan - Bekleyen - Serde
// 11495 export interface TicketVolumeReport {
// 11496   opened: number;
// 11497   closed: number;
// 11498   pending: number;
// 11499   avg_resolution_hours: number;
// 11500 }
// 11501 // *CIDO - BÖLÜM - 1589 - AgentPerformance - Temsilci Performansı - Çözülen - Puan - Serde
// 11502 export interface AgentPerformance {
// 11503   agent_id: string;
// 11504   tickets_resolved: number;
// 11505   avg_rating: number;
// 11506   avg_response_minutes: number;
// 11507 }
// 11508 // *CIDO - BÖLÜM - 1590 - SLAReport - SLA Raporu - Uyum - İhlal - Serde
// 11509 export interface SLAReport {
// 11510   period: string;
// 11511   sla_compliance_percent: number;
// 11512   breaches: number;
// 11513   avg_response_minutes: number;
// 11514 }
// 11515 // *CIDO - BÖLÜM - 1591 - KnowledgeBaseAnalytics - Bilgi Tabanı - Görüntüleme - Arama - Serde
// 11516 export interface KnowledgeBaseAnalytics {
// 11517   top_articles: KnowledgeArticleMetric[];
// 11518   search_terms: string[];
// 11519   helpfulness_rate: number;
// 11520 }
// 11521 // *CIDO - BÖLÜM - 1592 - KnowledgeArticleMetric - Makale Metriği - Görüntüleme - Yararlı - Serde
// 11522 export interface KnowledgeArticleMetric {
// 11523   article_id: string;
// 11524   views: number;
// 11525   helpful_count: number;
// 11526   not_helpful_count: number;
// 11527 }
// 11528 // *CIDO - BÖLÜM - 1593 - ChatbotAnalytics - Chatbot - Konuşma - Eskalasyon - Serde
// 11529 export interface ChatbotAnalytics {
// 11530   total_conversations: number;
// 11531   auto_resolved: number;
// 11532   escalated_to_human: number;
// 11533   avg_conversation_turns: number;
// 11534 }
// 11535 // *CIDO - BÖLÜM - 1594 - IntentDistribution - Niyet Dağılımı - Niyet - Sayı - Serde
// 11536 export interface IntentDistribution {
// 11537   intent: string;
// 11538   count: number;
// 11539   percentage: number;
// 11540 }
// 11541 // *CIDO - BÖLÜM - 1595 - ModelAccuracyDashboard - Model Doğruluğu - Zaman İçinde - Serde
// 11542 export interface ModelAccuracyDashboard {
// 11543   model_name: string;
// 11544   accuracy_over_time: ModelAccuracyPoint[];
// 11545   current_accuracy: number;
// 11546 }
// 11547 // *CIDO - BÖLÜM - 1596 - ModelAccuracyPoint - Doğruluk Noktası - Tarih - Değer - Serde
// 11548 export interface ModelAccuracyPoint {
// 11549   date: string;
// 11550   accuracy: number;
// 11551   f1_score: number;
// 11552 }
// 11553 // *CIDO - BÖLÜM - 1597 - DriftMonitoringDashboard - Kayma İzleme - Özellik - PSI - Serde
// 11554 export interface DriftMonitoringDashboard {
// 11555   features: DriftFeatureStatus[];
// 11556   overall_drift_detected: boolean;
// 11557   last_checked: number;
// 11558 }
// 11559 // *CIDO - BÖLÜM - 1598 - DriftFeatureStatus - Kayma Özellik Durumu - PSI - Durum - Serde
// 11560 export interface DriftFeatureStatus {
// 11561   feature: string;
// 11562   psi_value: number;
// 11563   drift_detected: boolean;
// 11564 }
// 11565 // *CIDO - BÖLÜM - 1599 - ExperimentDashboard - Deney Paneli - Aktif - Tamamlanan - Serde
// 11566 export interface ExperimentDashboard {
// 11567   active_experiments: number;
// 11568   completed_experiments: number;
// 11569   total_users_in_experiments: number;
// 11570 }
// 11571 // *CIDO - BÖLÜM - 1600 - FeatureFlagDashboard - Özellik Bayrağı - Aktif - Kullanım - Serde
// 11572 export interface FeatureFlagDashboard {
// 11573   total_flags: number;
// 11574   active_flags: number;
// 11575   flags_used_in_production: number;
// 11576 }
// 11577 // *CIDO - BÖLÜM - 1601 - AuditLogDashboard - Denetim Günlüğü - Olaylar - Eğilim - Serde
// 11578 export interface AuditLogDashboard {
// 11579   total_events: number;
// 11580   event_trend: EventTrendPoint[];
// 11581   top_actions: ActionCount[];
// 11582 }
// 11583 // *CIDO - BÖLÜM - 1602 - EventTrendPoint - Olay Eğilimi - Tarih - Sayı - Serde
// 11584 export interface EventTrendPoint {
// 11585   date: string;
// 11586   count: number;
// 11587 }
// 11588 // *CIDO - BÖLÜM - 1603 - ActionCount - Eylem Sayısı - Eylem - Sayı - Serde
// 11589 export interface ActionCount {
// 11590   action: string;
// 11591   count: number;
// 11592 }
// 11593 // *CIDO - BÖLÜM - 1604 - UserActivityDashboard - Kullanıcı Aktivitesi - DAU MAU - Yapışkanlık - Serde
// 11594 export interface UserActivityDashboard {
// 11595   dau: number;
// 11596   mau: number;
// 11597   stickiness_ratio: number;
// 11598   new_users_today: number;
// 11599 }
// 11600 // *CIDO - BÖLÜM - 1605 - RetentionDashboard - Elde Tutma - Gün - Yüzde - Serde
// 11601 export interface RetentionDashboard {
// 11602   day1_retention: number;
// 11603   day7_retention: number;
// 11604   day30_retention: number;
// 11605 }
// 11606 // *CIDO - BÖLÜM - 1606 - RevenueDashboard - Gelir Paneli - MRR ARR - Büyüme - Serde
// 11607 export interface RevenueDashboard {
// 11608   mrr: number;
// 11609   arr: number;
// 11610   mrr_growth_percent: number;
// 11611   net_revenue_retention: number;
// 11612 }
// 11613 // *CIDO - BÖLÜM - 1607 - SubscriptionDashboard - Abonelik - Aktif - Genişletme - Serde
// 11614 export interface SubscriptionDashboard {
// 11615   active_subscriptions: number;
// 11616   new_subscriptions: number;
// 11617   cancellations: number;
// 11618   expansion_mrr: number;
// 11619 }
// 11620 // *CIDO - BÖLÜM - 1608 - UsageDashboard - Kullanım Paneli - API KV D1 - Serde
// 11621 export interface UsageDashboard {
// 11622   api_requests_today: number;
// 11623   kv_reads_today: number;
// 11624   d1_queries_today: number;
// 11625   storage_used_gb: number;
// 11626 }
// 11627 // *CIDO - BÖLÜM - 1609 - CostDashboard - Maliyet Paneli - Günlük Aylık - Tahmin - Serde
// 11628 export interface CostDashboard {
// 11629   daily_cost: number;
// 11630   monthly_cost: number;
// 11631   forecasted_monthly_cost: number;
// 11632   cost_by_service: Record<string, number>;
// 11633 }
// 11634 // *CIDO - BÖLÜM - 1610 - SecurityDashboard - Güvenlik Paneli - Olaylar - Puan - Serde
// 11635 export interface SecurityDashboard {
// 11636   incidents_today: number;
// 11637   blocked_requests: number;
// 11638   security_score: number;
// 11639   open_vulnerabilities: number;
// 11640 }
// 11641 // *CIDO - BÖLÜM - 1611 - ComplianceDashboard - Uyum Paneli - Standartlar - Durum - Serde
// 11642 export interface ComplianceDashboard {
// 11643   standards: ComplianceStandardStatus[];
// 11644   overall_compliance_percent: number;
// 11645   audit_readiness: string;
// 11646 }
// 11647 // *CIDO - BÖLÜM - 1612 - ComplianceStandardStatus - Standart Durumu - İsim - Yüzde - Serde
// 11648 export interface ComplianceStandardStatus {
// 11649   standard: string;
// 11650   compliance_percent: number;
// 11651   last_audit_date: number;
// 11652 }
// 11653 // *CIDO - BÖLÜM - 1613 - AlertDashboard - Uyarı Paneli - Aktif - Onaylanmış - Serde
// 11654 export interface AlertDashboard {
// 11655   active_alerts: number;
// 11656   acknowledged_alerts: number;
// 11657   alerts_by_severity: Record<string, number>;
// 11658 }
// 11659 // *CIDO - BÖLÜM - 1614 - TenantOverviewDashboard - Kiracı Genel Bakış - Limitler - Kullanım - Serde
// 11660 export interface TenantOverviewDashboard {
// 11661   tenant_id: string;
// 11662   plan: TenantPlan;
// 11663   usage_percent: Record<string, number>;
// 11664   health_status: string;
// 11665 }
// 11666 // *CIDO - BÖLÜM - 1615 - QuickActions - Hızlı Eylemler - Bağlantı - Simge - Serde
// 11667 export interface QuickActions {
// 11668   actions: QuickAction[];
// 11669 }
// 11670 // *CIDO - BÖLÜM - 1616 - QuickAction - Hızlı Eylem - Etiket URL - Simge - Serde
// 11671 export interface QuickAction {
// 11672   label: string;
// 11673   url: string;
// 11674   icon: string;
// 11675 }
// 11676 // *CIDO - BÖLÜM - 1617 - OnboardingProgress - Karşılama İlerlemesi - Tamamlanan Adımlar - Serde
// 11677 export interface OnboardingProgress {
// 11678   user_id: string;
// 11679   completed_steps: string[];
// 11680   total_steps: number;
// 11681   completion_percent: number;
// 11682 }
// 11683 // *CIDO - BÖLÜM - 1618 - GettingStartedGuide - Başlangıç Rehberi - Başlık - Adımlar - Serde
// 11684 export interface GettingStartedGuide {
// 11685   title: string;
// 11686   steps: GettingStartedStep[];
// 11687 }
// 11688 // *CIDO - BÖLÜM - 1619 - GettingStartedStep - Başlangıç Adımı - Başlık - Eylem - Serde
// 11689 export interface GettingStartedStep {
// 11690   title: string;
// 11691   description: string;
// 11692   action_label: string;
// 11693   action_url: string;
// 11694 }
// 11695 // *CIDO - BÖLÜM - 1620 - ResourceCenter - Kaynak Merkezi - Makaleler - Videolar - Serde
// 11696 export interface ResourceCenter {
// 11697   articles: ResourceLink[];
// 11698   videos: ResourceLink[];
// 11699   documentation: ResourceLink[];
// 11700 }
// 11701 // *CIDO - BÖLÜM - 1621 - ResourceLink - Kaynak Bağlantısı - Başlık URL - Tür - Serde
// 11702 export interface ResourceLink {
// 11703   title: string;
// 11704   url: string;
// 11705   type: string;
// 11706 }
// 11707 // *CIDO - BÖLÜM - 1622 - ChangelogWidget - Değişiklik Günlüğü - Son Sürüm - Serde
// 11708 export interface ChangelogWidget {
// 11709   latest_version: string;
// 11710   latest_changes: string[];
// 11711   release_date: number;
// 11712 }
// 11713 // *CIDO - BÖLÜM - 1623 - FeedbackWidget - Geri Bildirim - Mesaj - Puan - Serde
// 11714 export interface FeedbackWidget {
// 11715   message: string;
// 11716   rating: number;
// 11717   submitted_at: number;
// 11718 }
// 11719 // *CIDO - BÖLÜM - 1624 - ContextualHelp - Bağlamsal Yardım - İpucu - Hedef - Serde
// 11720 export interface ContextualHelp {
// 11721   tip: string;
// 11722   target_element: string;
// 11723   placement: string;
// 11724 }
// 11725 // *CIDO - BÖLÜM - 1625 - SearchBarConfig - Arama Çubuğu - Yer Tutucu - Kapsam - Serde
// 11726 export interface SearchBarConfig {
// 11727   placeholder: string;
// 11728   scope: string;
// 11729   min_query_length: number;
// 11730 }
// 11731 // *CIDO - BÖLÜM - 1626 - CommandPalette - Komut Paleti - Komutlar - Kısayol - Serde
// 11732 export interface CommandPalette {
// 11733   commands: PaletteCommand[];
// 11734   shortcut: string;
// 11735 }
// 11736 // *CIDO - BÖLÜM - 1627 - PaletteCommand - Palet Komutu - Etiket - Eylem - Serde
// 11737 export interface PaletteCommand {
// 11738   label: string;
// 11739   action: string;
// 11740   category: string;
// 11741 }
// 11742 // *CIDO - BÖLÜM - 1628 - KeyboardShortcut - Klavye Kısayolu - Tuşlar - Eylem - Serde
// 11743 export interface KeyboardShortcut {
// 11744   keys: string;
// 11745   action: string;
// 11746   description: string;
// 11747 }
// 11748 // *CIDO - BÖLÜM - 1629 - BreadcrumbConfig - Ekmek Kırıntısı - Öğeler - Ayırıcı - Serde
// 11749 export interface BreadcrumbConfig {
// 11750   items: BreadcrumbItem[];
// 11751   separator: string;
// 11752 }
// 11753 // *CIDO - BÖLÜM - 1630 - PaginationConfig - Sayfalama - Geçerli Sayfa - Toplam - Serde
// 11754 export interface PaginationConfig {
// 11755   current_page: number;
// 11756   total_pages: number;
// 11757   total_items: number;
// 11758   items_per_page: number;
// 11759 }
// 11760 // *CIDO - BÖLÜM - 1631 - EmptyState - Boş Durum - Mesaj - Eylem - Serde
// 11761 export interface EmptyState {
// 11762   message: string;
// 11763   illustration_url: string;
// 11764   action_label: string;
// 11765   action_url: string;
// 11766 }
// 11767 // *CIDO - BÖLÜM - 1632 - ErrorState - Hata Durumu - Mesaj - Yeniden Dene - Serde
// 11768 export interface ErrorState {
// 11769   message: string;
// 11770   retry_action: string;
// 11771   support_contact: string;
// 11772 }
// 11773 // *CIDO - BÖLÜM - 1633 - LoadingState - Yükleme Durumu - İskelet - Döndürücü - Serde
// 11774 export interface LoadingState {
// 11775   type: string;
// 11776   skeleton_lines: number;
// 11777   overlay: boolean;
// 11778 }
// 11779 // *CIDO - BÖLÜM - 1634 - ToastNotification - Bildirim - Mesaj - Tür - Serde
// 11780 export interface ToastNotification {
// 11781   message: string;
// 11782   type: string;
// 11783   duration_ms: number;
// 11784   dismissible: boolean;
// 11785 }
// 11786 // *CIDO - BÖLÜM - 1635 - ModalConfig - Modal - Başlık - Boyut - Serde
// 11787 export interface ModalConfig {
// 11788   title: string;
// 11789   size: string;
// 11790   close_on_backdrop: boolean;
// 11791   close_on_escape: boolean;
// 11792 }
// 11793 // *CIDO - BÖLÜM - 1636 - DrawerConfig - Çekmece - Yerleşim - Genişlik - Serde
// 11794 export interface DrawerConfig {
// 11795   placement: string;
// 11796   width_percent: number;
// 11797   closable: boolean;
// 11798 }
// 11799 // *CIDO - BÖLÜM - 1637 - TooltipConfig - İpucu - Metin - Yerleşim - Serde
// 11800 export interface TooltipConfig {
// 11801   text: string;
// 11802   placement: string;
// 11803   trigger: string;
// 11804 }
// 11805 // *CIDO - BÖLÜM - 1638 - DropdownMenu - Açılır Menü - Öğeler - Bölücü - Serde
// 11806 export interface DropdownMenu {
// 11807   items: DropdownMenuItem[];
// 11808 }
// 11809 // *CIDO - BÖLÜM - 1639 - DropdownMenuItem - Menü Öğesi - Etiket - Eylem - Serde
// 11810 export interface DropdownMenuItem {
// 11811   label: string;
// 11812   action: string;
// 11813   icon: string;
// 11814   disabled: boolean;
// 11815   divider_after: boolean;
// 11816 }
// 11817 // *CIDO - BÖLÜM - 1640 - TabsConfig - Sekmeler - Öğeler - Aktif - Serde
// 11818 export interface TabsConfig {
// 11819   tabs: TabItem[];
// 11820   active_tab: string;
// 11821 }
// 11822 // *CIDO - BÖLÜM - 1641 - TabItem - Sekme Öğesi - Etiket - İçerik - Serde
// 11823 export interface TabItem {
// 11824   label: string;
// 11825   id: string;
// 11826   content: string;
// 11827 }
// 11828 // *CIDO - BÖLÜM - 1642 - AccordionConfig - Akordiyon - Öğeler - Çoklu - Serde
// 11829 export interface AccordionConfig {
// 11830   items: AccordionItem[];
// 11831   allow_multiple: boolean;
// 11832 }
// 11833 // *CIDO - BÖLÜM - 1643 - AccordionItem - Akordiyon Öğesi - Başlık - İçerik - Serde
// 11834 export interface AccordionItem {
// 11835   title: string;
// 11836   content: string;
// 11837   expanded: boolean;
// 11838 }
// 11839 // *CIDO - BÖLÜM - 1644 - CardConfig - Kart - Başlık - Alt Bilgi - Serde
// 11840 export interface CardConfig {
// 11841   header: string;
// 11842   body: string;
// 11843   footer: string;
// 11844   image_url: string;
// 11845 }
// 11846 // *CIDO - BÖLÜM - 1645 - TableColumn - Tablo Sütunu - Başlık - Veri Anahtarı - Serde
// 11847 export interface TableColumn {
// 11848   header: string;
// 11849   data_key: string;
// 11850   sortable: boolean;
// 11851   width: string;
// 11852 }
// 11853 // *CIDO - BÖLÜM - 1646 - TableConfig - Tablo - Sütunlar - Veri - Serde
// 11854 export interface TableConfig {
// 11855   columns: TableColumn[];
// 11856   data: Record<string, unknown>[];
// 11857   selectable: boolean;
// 11858   pagination: PaginationConfig;
// 11859 }
// 11860 // *CIDO - BÖLÜM - 1647 - FilterBar - Filtre Çubuğu - Filtreler - Uygula - Serde
// 11861 export interface FilterBar {
// 11862   filters: FilterField[];
// 11863   on_apply: string;
// 11864   on_clear: string;
// 11865 }
// 11866 // *CIDO - BÖLÜM - 1648 - FilterField - Filtre Alanı - Etiket - Tür - Serde
// 11867 export interface FilterField {
// 11868   label: string;
// 11869   field: string;
// 11870   type: string;
// 11871   options: string[];
// 11872 }
// 11873 // *CIDO - BÖLÜM - 1649 - SortConfig - Sıralama - Alan - Yön - Serde
// 11874 export interface SortConfig {
// 11875   field: string;
// 11876   direction: string;
// 11877 }
// 11878 // *CIDO - BÖLÜM - 1650 - BulkActionBar - Toplu Eylem - Seçili - Eylemler - Serde
// 11879 export interface BulkActionBar {
// 11880   selected_count: number;
// 11881   actions: BulkAction[];
// 11882 }
// 11883 // *CIDO - BÖLÜM - 1651 - BulkAction - Toplu Eylem - Etiket - Eylem - Serde
// 11884 export interface BulkAction {
// 11885   label: string;
// 11886   action: string;
// 11887   confirmation_required: boolean;
// 11888 }
// 11889 // *CIDO - BÖLÜM - 1652 - ExportConfig - Dışa Aktarım - Format - Sütunlar - Serde
// 11890 export interface ExportConfig {
// 11891   format: string;
// 11892   columns: string[];
// 11893   filename: string;
// 11894 }
// 11895 // *CIDO - BÖLÜM - 1653 - ImportConfig - İçe Aktarım - Format - Eşleme - Serde
// 11896 export interface ImportConfig {
// 11897   format: string;
// 11898   column_mapping: Record<string, string>;
// 11899   validation_rules: string[];
// 11900 }
// 11901 // *CIDO - BÖLÜM - 1654 - FileUploadConfig - Dosya Yükleme - Kabul - Maks Boyut - Serde
// 11902 export interface FileUploadConfig {
// 11903   accept: string[];
// 11904   max_size_bytes: number;
// 11905   multiple: boolean;
// 11906 }
// 11907 // *CIDO - BÖLÜM - 1655 - ImageUploadConfig - Görsel Yükleme - Kırpma - Önizleme - Serde
// 11908 export interface ImageUploadConfig {
// 11909   aspect_ratio: number;
// 11910   enable_crop: boolean;
// 11911   preview_width: number;
// 11912 }
// 11913 // *CIDO - BÖLÜM - 1656 - RichTextEditor - Zengin Metin - Araç Çubuğu - Yer Tutucu - Serde
// 11914 export interface RichTextEditor {
// 11915   toolbar: string[];
// 11916   placeholder: string;
// 11917   max_length: number;
// 11918 }
// 11919 // *CIDO - BÖLÜM - 1657 - CodeEditor - Kod Editörü - Dil - Tema - Serde
// 11920 export interface CodeEditor {
// 11921   language: string;
// 11922   theme: string;
// 11923   read_only: boolean;
// 11924 }
// 11925 // *CIDO - BÖLÜM - 1658 - DatePicker - Tarih Seçici - Aralık - Format - Serde
// 11926 export interface DatePicker {
// 11927   mode: string;
// 11928   format: string;
// 11929   min_date: string;
// 11930   max_date: string;
// 11931 }
// 11932 // *CIDO - BÖLÜM - 1659 - ColorPicker - Renk Seçici - Ön Ayarlar - Format - Serde
// 11933 export interface ColorPicker {
// 11934   presets: string[];
// 11935   format: string;
// 11936   allow_opacity: boolean;
// 11937 }
// 11938 // *CIDO - BÖLÜM - 1660 - JSONEditor - JSON Editörü - Şema - Doğrulama - Serde
// 11939 export interface JSONEditor {
// 11940   schema: Record<string, unknown>;
// 11941   validate_on_change: boolean;
// 11942   format_on_save: boolean;
// 11943 }
// 11944 // *CIDO - BÖLÜM - 1661 - FormBuilder - Form Oluşturucu - Alanlar - Düzen - Serde
// 11945 export interface FormBuilder {
// 11946   fields: FormField[];
// 11947   layout: string;
// 11948   submit_label: string;
// 11949 }
// 11950 // *CIDO - BÖLÜM - 1662 - FormField - Form Alanı - Tür - Doğrulama - Serde
// 11951 export interface FormField {
// 11952   name: string;
// 11953   label: string;
// 11954   type: string;
// 11955   required: boolean;
// 11956   validation_rules: string[];
// 11957 }
// 11958 // *CIDO - BÖLÜM - 1663 - FormValidation - Form Doğrulama - Hatalar - Geçerli - Serde
// 11959 export interface FormValidation {
// 11960   valid: boolean;
// 11961   errors: Record<string, string[]>;
// 11962 }
// 11963 // *CIDO - BÖLÜM - 1664 - WizardConfig - Sihirbaz - Adımlar - Doğrusal - Serde
// 11964 export interface WizardConfig {
// 11965   steps: WizardStep[];
// 11966   linear: boolean;
// 11967   current_step: number;
// 11968 }
// 11969 // *CIDO - BÖLÜM - 1665 - WizardStep - Sihirbaz Adımı - Başlık - İçerik - Serde
// 11970 export interface WizardStep {
// 11971   title: string;
// 11972   content: string;
// 11973   valid: boolean;
// 11974 }
// 11975 // *CIDO - BÖLÜM - 1666 - StepperConfig - Adımlayıcı - Adımlar - Yön - Serde
// 11976 export interface StepperConfig {
// 11977   steps: StepperStep[];
// 11978   orientation: string;
// 11979 }
// 11980 // *CIDO - BÖLÜM - 1667 - StepperStep - Adımlayıcı Adımı - Etiket - Durum - Serde
// 11981 export interface StepperStep {
// 11982   label: string;
// 11983   status: string;
// 11984   optional: boolean;
// 11985 }
// 11986 // *CIDO - BÖLÜM - 1668 - ProgressBarConfig - İlerleme Çubuğu - Değer - Maks - Serde
// 11987 export interface ProgressBarConfig {
// 11988   value: number;
// 11989   max: number;
// 11990   label: string;
// 11991   show_percentage: boolean;
// 11992 }
// 11993 // *CIDO - BÖLÜM - 1669 - SkeletonLoader - İskelet Yükleyici - Tür - Sayı - Serde
// 11994 export interface SkeletonLoader {
// 11995   type: string;
// 11996   count: number;
// 11997   animation: boolean;
// 11998 }
// 11999 // *CIDO - BÖLÜM - 1670 - AvatarConfig - Avatar - İsim - Boyut - Serde
// 12000 export interface AvatarConfig {
// 12001   name: string;
// 12002   size: string;
// 12003   shape: string;
// 12004   image_url: string;
// 12005 }
// 12006 // *CIDO - BÖLÜM - 1671 - BadgeConfig - Rozet - Metin - Renk - Serde
// 12007 export interface BadgeConfig {
// 12008   text: string;
// 12009   color: string;
// 12010   variant: string;
// 12011 }
// 12012 // *CIDO - BÖLÜM - 1672 - ChipConfig - Çip - Etiket - Kapatılabilir - Serde
// 12013 export interface ChipConfig {
// 12014   label: string;
// 12015   closable: boolean;
// 12016   color: string;
// 12017 }
// 12018 // *CIDO - BÖLÜM - 1673 - TimelineConfig - Zaman Çizelgesi - Öğeler - Hizalama - Serde
// 12019 export interface TimelineConfig {
// 12020   items: TimelineItem[];
// 12021   align: string;
// 12022 }
// 12023 // *CIDO - BÖLÜM - 1674 - TimelineItem - Zaman Çizelgesi Öğesi - Zaman - Başlık - Serde
// 12024 export interface TimelineItem {
// 12025   time: string;
// 12026   title: string;
// 12027   description: string;
// 12028 }
// 12029 // *CIDO - BÖLÜM - 1675 - StatCard - İstatistik Kartı - Değer - Etiket - Serde
// 12030 export interface StatCard {
// 12031   value: number | string;
// 12032   label: string;
// 12033   trend: string;
// 12034   trend_value: number;
// 12035 }
// 12036 // *CIDO - BÖLÜM - 1676 - ChartConfig - Grafik - Tür - Veri - Serde
// 12037 export interface ChartConfig {
// 12038   type: string;
// 12039   labels: string[];
// 12040   datasets: ChartDataset[];
// 12041 }
// 12042 // *CIDO - BÖLÜM - 1677 - ChartDataset - Grafik Veri Kümesi - Etiket - Veri - Serde
// 12043 export interface ChartDataset {
// 12044   label: string;
// 12045   data: number[];
// 12046   color: string;
// 12047 }
// 12048 // *CIDO - BÖLÜM - 1678 - MapConfig - Harita - Merkez - Yakınlaştırma - Serde
// 12049 export interface MapConfig {
// 12050   center: [number, number];
// 12051   zoom: number;
// 12052   markers: MapMarker[];
// 12053 }
// 12054 // *CIDO - BÖLÜM - 1679 - MapMarker - Harita İşaretçisi - Konum - Başlık - Serde
// 12055 export interface MapMarker {
// 12056   position: [number, number];
// 12057   title: string;
// 12058   description: string;
// 12059 }
// 12060 // *CIDO - BÖLÜM - 1680 - CalendarConfig - Takvim - Görünüm - Olaylar - Serde
// 12061 export interface CalendarConfig {
// 12062   view: string;
// 12063   events: CalendarEvent[];
// 12064   editable: boolean;
// 12065 }
// 12066 // *CIDO - BÖLÜM - 1681 - CalendarEvent - Takvim Olayı - Başlık - Başlangıç - Serde
// 12067 export interface CalendarEvent {
// 12068   title: string;
// 12069   start: string;
// 12070   end: string;
// 12071   color: string;
// 12072 }
// 12073 // *CIDO - BÖLÜM - 1682 - KanbanBoard - Kanban Panosu - Sütunlar - Kartlar - Serde
// 12074 export interface KanbanBoard {
// 12075   columns: KanbanColumn[];
// 12076   cards: KanbanCard[];
// 12077 }
// 12078 // *CIDO - BÖLÜM - 1683 - KanbanColumn - Kanban Sütunu - Başlık - Durum - Serde
// 12079 export interface KanbanColumn {
// 12080   id: string;
// 12081   title: string;
// 12082   status: string;
// 12083 }
// 12084 // *CIDO - BÖLÜM - 1684 - KanbanCard - Kanban Kartı - Başlık - Sütun - Serde
// 12085 export interface KanbanCard {
// 12086   id: string;
// 12087   title: string;
// 12088   column_id: string;
// 12089   assignee: string;
// 12090 }
// 12091 // *CIDO - BÖLÜM - 1685 - GanttChart - Gantt Şeması - Görevler - Bağımlılık - Serde
// 12092 export interface GanttChart {
// 12093   tasks: GanttTask[];
// 12094   dependencies: GanttDependency[];
// 12095 }
// 12096 // *CIDO - BÖLÜM - 1686 - GanttTask - Gantt Görevi - Başlangıç - Bitiş - Serde
// 12097 export interface GanttTask {
// 12098   id: string;
// 12099   name: string;
// 12100   start: string;
// 12101   end: string;
// 12102   progress: number;
// 12103 }
// 12104 // *CIDO - BÖLÜM - 1687 - GanttDependency - Gantt Bağımlılığı - Önceki - Sonraki - Serde
// 12105 export interface GanttDependency {
// 12106   predecessor: string;
// 12107   successor: string;
// 12108 }
// 12109 // *CIDO - BÖLÜM - 1688 - TreeView - Ağaç Görünümü - Düğümler - Genişletilmiş - Serde
// 12110 export interface TreeView {
// 12111   nodes: TreeNode[];
// 12112   expanded_ids: string[];
// 12113 }
// 12114 // *CIDO - BÖLÜM - 1689 - TreeNode - Ağaç Düğümü - Etiket - Çocuklar - Serde
// 12115 export interface TreeNode {
// 12116   id: string;
// 12117   label: string;
// 12118   children: TreeNode[];
// 12119   icon: string;
// 12120 }
// 12121 // *CIDO - BÖLÜM - 1690 - OrgChart - Organizasyon Şeması - Çalışanlar - İlişkiler - Serde
// 12122 export interface OrgChart {
// 12123   employees: OrgEmployee[];
// 12124   relationships: OrgRelationship[];
// 12125 }
// 12126 // *CIDO - BÖLÜM - 1691 - OrgEmployee - Çalışan - İsim - Unvan - Serde
// 12127 export interface OrgEmployee {
// 12128   id: string;
// 12129   name: string;
// 12130   title: string;
// 12131   manager_id: string;
// 12132 }
// 12133 // *CIDO - BÖLÜM - 1692 - OrgRelationship - İlişki - Yönetici - Alt - Serde
// 12134 export interface OrgRelationship {
// 12135   manager_id: string;
// 12136   subordinate_id: string;
// 12137 }
// 12138 // *CIDO - BÖLÜM - 1693 - FlowchartConfig - Akış Şeması - Düğümler - Bağlantılar - Serde
// 12139 export interface FlowchartConfig {
// 12140   nodes: FlowchartNode[];
// 12141   edges: FlowchartEdge[];
// 12142 }
// 12143 // *CIDO - BÖLÜM - 1694 - FlowchartNode - Akış Düğümü - Şekil - Etiket - Serde
// 12144 export interface FlowchartNode {
// 12145   id: string;
// 12146   shape: string;
// 12147   label: string;
// 12148   x: number;
// 12149   y: number;
// 12150 }
// 12151 // *CIDO - BÖLÜM - 1695 - FlowchartEdge - Akış Kenarı - Kaynak - Hedef - Serde
// 12152 export interface FlowchartEdge {
// 12153   source: string;
// 12154   target: string;
// 12155   label: string;
// 12156 }
// 12157 // *CIDO - BÖLÜM - 1696 - MindMapNode - Zihin Haritası - Merkez - Dallar - Serde
// 12158 export interface MindMapNode {
// 12159   id: string;
// 12160   text: string;
// 12161   children: MindMapNode[];
// 12162 }
// 12163 // *CIDO - BÖLÜM - 1697 - WhiteboardConfig - Beyaz Tahta - Öğeler - Arka Plan - Serde
// 12164 export interface WhiteboardConfig {
// 12165   elements: WhiteboardElement[];
// 12166   background: string;
// 12167 }
// 12168 // *CIDO - BÖLÜM - 1698 - WhiteboardElement - Tahta Öğesi - Tür - Konum - Serde
// 12169 export interface WhiteboardElement {
// 12170   type: string;
// 12171   x: number;
// 12172   y: number;
// 12173   width: number;
// 12174   height: number;
// 12175   content: string;
// 12176 }
// 12177 // *CIDO - BÖLÜM - 1699 - DiagramToolbar - Diyagram Araç Çubuğu - Araçlar - Seçili - Serde
// 12178 export interface DiagramToolbar {
// 12179   tools: DiagramTool[];
// 12180   selected_tool: string;
// 12181 }
// 12182 // *CIDO - BÖLÜM - 1700 - DiagramTool - Diyagram Aracı - İsim Simge - Kısayol - Serde
// 12183 export interface DiagramTool {
// 12184   name: string;
// 12185   icon: string;
// 12186   shortcut: string;
// 12187 }
// 12188 // *CIDO - BÖLÜM - 1701 - ZoomControls - Yakınlaştırma - Seviye - Sığdır - Serde
// 12189 export interface ZoomControls {
// 12190   zoom_level: number;
// 12191   fit_to_screen: boolean;
// 12192 }
// 12193 // *CIDO - BÖLÜM - 1702 - UndoRedoState - Geri Al İleri Al - Yığın - İşaretçi - Serde
// 12194 export interface UndoRedoState {
// 12195   undo_stack: unknown[];
// 12196   redo_stack: unknown[];
// 12197   pointer: number;
// 12198 }
// 12199 // *CIDO - BÖLÜM - 1703 - CollaborationCursor - İşbirliği İmleci - Kullanıcı - Konum - Serde
// 12200 export interface CollaborationCursor {
// 12201   user_id: string;
// 12202   user_name: string;
// 12203   color: string;
// 12204   x: number;
// 12205   y: number;
// 12206 }
// 12207 // *CIDO - BÖLÜM - 1704 - PresenceIndicator - Varlık Göstergesi - Kullanıcılar - Çevrimiçi - Serde
// 12208 export interface PresenceIndicator {
// 12209   online_users: string[];
// 12210   typing_users: string[];
// 12211 }
// 12212 // *CIDO - BÖLÜM - 1705 - NotificationCenter - Bildirim Merkezi - Okunmamış - Liste - Serde
// 12213 export interface NotificationCenter {
// 12214   unread_count: number;
// 12215   notifications: NotificationItem[];
// 12216 }
// 12217 // *CIDO - BÖLÜM - 1706 - NotificationItem - Bildirim Öğesi - Başlık - Gövde - Serde
// 12218 export interface NotificationItem {
// 12219   id: string;
// 12220   title: string;
// 12221   body: string;
// 12222   read: boolean;
// 12223   timestamp: number;
// 12224   action_url: string;
// 12225 }
// 12226 // *CIDO - BÖLÜM - 1707 - UserMenuConfig - Kullanıcı Menüsü - Profil - Bağlantılar - Serde
// 12227 export interface UserMenuConfig {
// 12228   avatar_url: string;
// 12229   display_name: string;
// 12230   menu_items: DropdownMenuItem[];
// 12231 }
// 12232 // *CIDO - BÖLÜM - 1708 - SidebarConfig - Kenar Çubuğu - Gezinme - Daraltılmış - Serde
// 12233 export interface SidebarConfig {
// 12234   navigation: SidebarNavItem[];
// 12235   collapsed: boolean;
// 12236 }
// 12237 // *CIDO - BÖLÜM - 1709 - SidebarNavItem - Gezinme Öğesi - Etiket - Simge - Serde
// 12238 export interface SidebarNavItem {
// 12239   label: string;
// 12240   icon: string;
// 12241   url: string;
// 12242   children: SidebarNavItem[];
// 12243 }
// 12244 // *CIDO - BÖLÜM - 1710 - TopbarConfig - Üst Çubuk - Logo - Eylemler - Serde
// 12245 export interface TopbarConfig {
// 12246   logo_url: string;
// 12247   title: string;
// 12248   actions: TopbarAction[];
// 12249 }
// 12250 // *CIDO - BÖLÜM - 1711 - TopbarAction - Üst Çubuk Eylemi - Simge - Etiket - Serde
// 12251 export interface TopbarAction {
// 12252   icon: string;
// 12253   label: string;
// 12254   action: string;
// 12255 }
// 12256 // *CIDO - BÖLÜM - 1712 - FooterConfig - Alt Bilgi - Bağlantılar - Telif Hakkı - Serde
// 12257 export interface FooterConfig {
// 12258   links: FooterLink[];
// 12259   copyright: string;
// 12260 }
// 12261 // *CIDO - BÖLÜM - 1713 - FooterLink - Alt Bilgi Bağlantısı - Etiket URL - Serde
// 12262 export interface FooterLink {
// 12263   label: string;
// 12264   url: string;
// 12265 }
// 12266 // *CIDO - BÖLÜM - 1714 - ThemeConfig - Tema - Mod - Renkler - Serde
// 12267 export interface ThemeConfig {
// 12268   mode: string;
// 12269   primary_color: string;
// 12270   font_size: string;
// 12271   border_radius: string;
// 12272 }
// 12273 // *CIDO - BÖLÜM - 1715 - LayoutConfig - Düzen - Tür - Kenar Çubuğu - Serde
// 12274 export interface LayoutConfig {
// 12275   type: string;
// 12276   sidebar_width: number;
// 12277   content_max_width: number;
// 12278 }
// 12279 // *CIDO - BÖLÜM - 1716 - ResponsiveBreakpoint - Duyarlı Kırılma Noktası - Genişlik - Sütun - Serde
// 12280 export interface ResponsiveBreakpoint {
// 12281   width: number;
// 12282   columns: number;
// 12283   visible: boolean;
// 12284 }
// 12285 // *CIDO - BÖLÜM - 1717 - GridConfig - Izgara - Sütunlar - Aralık - Serde
// 12286 export interface GridConfig {
// 12287   columns: number;
// 12288   gap: number;
// 12289   items: GridItem[];
// 12290 }
// 12291 // *CIDO - BÖLÜM - 1718 - GridItem - Izgara Öğesi - Kolon Satır - İçerik - Serde
// 12292 export interface GridItem {
// 12293   col_start: number;
// 12294   col_span: number;
// 12295   row_start: number;
// 12296   content: string;
// 12297 }
// 12298 // *CIDO - BÖLÜM - 1719 - FlexConfig - Esnek Kutu - Yön - Hizalama - Serde
// 12299 export interface FlexConfig {
// 12300   direction: string;
// 12301   justify: string;
// 12302   align: string;
// 12303   wrap: boolean;
// 12304 }
// 12305 // *CIDO - BÖLÜM - 1720 - SpacerConfig - Boşluk - Yükseklik - Genişlik - Serde
// 12306 export interface SpacerConfig {
// 12307   height: number;
// 12308   width: number;
// 12309 }
// 12310 // *CIDO - BÖLÜM - 1721 - DividerConfig - Ayırıcı - Yön - Kalınlık - Serde
// 12311 export interface DividerConfig {
// 12312   orientation: string;
// 12313   thickness: number;
// 12314   color: string;
// 12315 }
// 12316 // *CIDO - BÖLÜM - 1722 - ScrollArea - Kaydırma Alanı - Yükseklik - Genişlik - Serde
// 12317 export interface ScrollArea {
// 12318   height: number;
// 12319   width: number;
// 12320   scrollbar_visible: boolean;
// 12321 }
// 12322 // *CIDO - BÖLÜM - 1723 - StickyHeader - Yapışkan Başlık - Ofset - z-index - Serde
// 12323 export interface StickyHeader {
// 12324   offset: number;
// 12325   z_index: number;
// 12326 }
// 12327 // *CIDO - BÖLÜM - 1724 - BackToTop - Başa Dön - Görünürlük - Ofset - Serde
// 12328 export interface BackToTop {
// 12329   visible: boolean;
// 12330   show_after_scroll: number;
// 12331 }
// 12332 // *CIDO - BÖLÜM - 1725 - PrintStyles - Yazdırma Stilleri - Kenar Boşluğu - Sayfa Boyutu - Serde
// 12333 export interface PrintStyles {
// 12334   margin: string;
// 12335   page_size: string;
// 12336   hide_elements: string[];
// 12337 }
// 12338 // *CIDO - BÖLÜM - 1726 - FocusTrap - Odak Tuzağı - Etkin - Hedef - Serde
// 12339 export interface FocusTrap {
// 12340   enabled: boolean;
// 12341   target_selector: string;
// 12342 }
// 12343 // *CIDO - BÖLÜM - 1727 - SkipLink - Atlama Bağlantısı - Metin - Hedef - Serde
// 12344 export interface SkipLink {
// 12345   text: string;
// 12346   target: string;
// 12347 }
// 12348 // *CIDO - BÖLÜM - 1728 - ScreenReaderText - Ekran Okuyucu - Metin - Görünür - Serde
// 12349 export interface ScreenReaderText {
// 12350   text: string;
// 12351   visible: boolean;
// 12352 }
// 12353 // *CIDO - BÖLÜM - 1729 - ARIAConfig - ARIA - Rol - Etiket - Serde
// 12354 export interface ARIAConfig {
// 12355   role: string;
// 12356   label: string;
// 12357   described_by: string;
// 12358 }
// 12359 // *CIDO - BÖLÜM - 1730 - HighContrastMode - Yüksek Karşıtlık - Etkin - Tema - Serde
// 12360 export interface HighContrastMode {
// 12361   enabled: boolean;
// 12362   theme: string;
// 12363 }
// 12364 // *CIDO - BÖLÜM - 1731 - ReducedMotion - Azaltılmış Hareket - Etkin - Geçişler - Serde
// 12365 export interface ReducedMotion {
// 12366   enabled: boolean;
// 12367   disable_transitions: boolean;
// 12368 }
// 12369 // *CIDO - BÖLÜM - 1732 - FontSizeAdjust - Yazı Tipi Ayarı - Ölçek - Maks - Serde
// 12370 export interface FontSizeAdjust {
// 12371   scale: number;
// 12372   min_scale: number;
// 12373   max_scale: number;
// 12374 }
// 12375 // *CIDO - BÖLÜM - 1733 - LetterSpacing - Harf Aralığı - Değer - Birim - Serde
// 12376 export interface LetterSpacing {
// 12377   value: number;
// 12378   unit: string;
// 12379 }
// 12380 // *CIDO - BÖLÜM - 1734 - LineHeight - Satır Yüksekliği - Değer - Birim - Serde
// 12381 export interface LineHeight {
// 12382   value: number;
// 12383   unit: string;
// 12384 }
// 12385 // *CIDO - BÖLÜM - 1735 - WordBreak - Kelime Kırma - Politika - Taşma - Serde
// 12386 export interface WordBreak {
// 12387   policy: string;
// 12388   overflow_wrap: string;
// 12389 }
// 12390 // *CIDO - BÖLÜM - 1736 - TextTruncate - Metin Kesme - Satır - Üç Nokta - Serde
// 12391 export interface TextTruncate {
// 12392   lines: number;
// 12393   ellipsis: boolean;
// 12394 }
// 12395 // *CIDO - BÖLÜM - 1737 - ImageOptimization - Görsel Optimizasyonu - Tembel Yükleme - Serde
// 12396 export interface ImageOptimization {
// 12397   lazy_loading: boolean;
// 12398   placeholder: string;
// 12399   srcset_sizes: string[];
// 12400 }
// 12401 // *CIDO - BÖLÜM - 1738 - VideoPlayerConfig - Video Oynatıcı - Otomatik Oynatma - Kontroller - Serde
// 12402 export interface VideoPlayerConfig {
// 12403   autoplay: boolean;
// 12404   controls: boolean;
// 12405   muted: boolean;
// 12406   loop: boolean;
// 12407 }
// 12408 // *CIDO - BÖLÜM - 1739 - AudioPlayerConfig - Ses Oynatıcı - Ön Yükleme - Ses Seviyesi - Serde
// 12409 export interface AudioPlayerConfig {
// 12410   preload: string;
// 12411   default_volume: number;
// 12412   show_waveform: boolean;
// 12413 }
// 12414 // *CIDO - BÖLÜM - 1740 - CarouselConfig - Karusel - Otomatik Oynatma - Aralık - Serde
// 12415 export interface CarouselConfig {
// 12416   autoplay: boolean;
// 12417   interval_ms: number;
// 12418   show_dots: boolean;
// 12419   show_arrows: boolean;
// 12420 }
// 12421 // *CIDO - BÖLÜM - 1741 - LightboxConfig - Işık Kutusu - Yakınlaştırma - İndir - Serde
// 12422 export interface LightboxConfig {
// 12423   enable_zoom: boolean;
// 12424   enable_download: boolean;
// 12425   show_counter: boolean;
// 12426 }
// 12427 // *CIDO - BÖLÜM - 1742 - MasonryLayout - Duvar Düzeni - Sütunlar - Aralık - Serde
// 12428 export interface MasonryLayout {
// 12429   columns: number;
// 12430   gap: number;
// 12431 }
// 12432 // *CIDO - BÖLÜM - 1743 - InfiniteScroll - Sonsuz Kaydırma - Eşik - Yükleme - Serde
// 12433 export interface InfiniteScroll {
// 12434   threshold_px: number;
// 12435   loading_message: string;
// 12436   has_more: boolean;
// 12437 }
// 12438 // *CIDO - BÖLÜM - 1744 - PullToRefresh - Çek Yenile - Hassasiyet - Geri Bildirim - Serde
// 12439 export interface PullToRefresh {
// 12440   sensitivity: number;
// 12441   feedback_message: string;
// 12442 }
// 12443 // *CIDO - BÖLÜM - 1745 - SwipeableCard - Kaydırılabilir Kart - Eşik - Yön - Serde
// 12444 export interface SwipeableCard {
// 12445   threshold: number;
// 12446   allowed_directions: string[];
// 12447 }
// 12448 // *CIDO - BÖLÜM - 1746 - DragAndDrop - Sürükle Bırak - Grup - Animasyon - Serde
// 12449 export interface DragAndDrop {
// 12450   group: string;
// 12451   animation_ms: number;
// 12452   handle_selector: string;
// 12453 }
// 12454 // *CIDO - BÖLÜM - 1747 - SortableList - Sıralanabilir Liste - Animasyon - Tutmaç - Serde
// 12455 export interface SortableList {
// 12456   animation: number;
// 12457   handle: boolean;
// 12458 }
// 12459 // *CIDO - BÖLÜM - 1748 - VirtualList - Sanal Liste - Öğe Yüksekliği - Fazla Tarama - Serde
// 12460 export interface VirtualList {
// 12461   item_height: number;
// 12462   overscan: number;
// 12463   total_items: number;
// 12464 }
// 12465 // *CIDO - BÖLÜM - 1749 - TransferList - Transfer Listesi - Sol Sağ - Taşıma - Serde
// 12466 export interface TransferList {
// 12467   left_items: string[];
// 12468   right_items: string[];
// 12469   left_title: string;
// 12470   right_title: string;
// 12471 }
// 12472 // *CIDO - BÖLÜM - 1750 - DualListBox - Çift Liste Kutusu - Seçenekler - Seçili - Serde
// 12473 export interface DualListBox {
// 12474   options: string[];
// 12475   selected: string[];
// 12476   show_search: boolean;
// 12477 }
// 12478 // *CIDO - BÖLÜM - 1751 - TagInput - Etiket Girişi - Öneriler - Maks - Serde
// 12479 export interface TagInput {
// 12480   suggestions: string[];
// 12481   max_tags: number;
// 12482   allow_custom: boolean;
// 12483 }
// 12484 // *CIDO - BÖLÜM - 1752 - MentionsInput - Bahsetme Girişi - Tetikleyici - Kullanıcılar - Serde
// 12485 export interface MentionsInput {
// 12486   trigger_char: string;
// 12487   users: MentionUser[];
// 12488 }
// 12489 // *CIDO - BÖLÜM - 1753 - MentionUser - Bahsedilen Kullanıcı - İsim - Avatar - Serde
// 12490 export interface MentionUser {
// 12491   id: string;
// 12492   name: string;
// 12493   avatar_url: string;
// 12494 }
// 12495 // *CIDO - BÖLÜM - 1754 - EmojiPicker - Emoji Seçici - Kategoriler - Son Kullanılan - Serde
// 12496 export interface EmojiPicker {
// 12497   categories: string[];
// 12498   recent_emojis: string[];
// 12499   skin_tone: string;
// 12500 }
// 12501 // *CIDO - BÖLÜM - 1755 - SignaturePad - İmza Alanı - Genişlik - Kalem Rengi - Serde
// 12502 export interface SignaturePad {
// 12503   width: number;
// 12504   height: number;
// 12505   pen_color: string;
// 12506   background_color: string;
// 12507 }
// 12508 // *CIDO - BÖLÜM - 1756 - BarcodeScanner - Barkod Tarayıcı - Kamera - Format - Serde
// 12509 export interface BarcodeScanner {
// 12510   camera_facing: string;
// 12511   formats: string[];
// 12512   continuous: boolean;
// 12513 }
// 12514 // *CIDO - BÖLÜM - 1757 - WebRTCConfig - WebRTC - Buz Sunucusu - Codec - Serde
// 12515 export interface WebRTCConfig {
// 12516   ice_servers: string[];
// 12517   preferred_codec: string;
// 12518 }
// 12519 // *CIDO - BÖLÜM - 1758 - ScreenShareConfig - Ekran Paylaşımı - Çözünürlük - Kare Hızı - Serde
// 12520 export interface ScreenShareConfig {
// 12521   resolution: string;
// 12522   frame_rate: number;
// 12523 }
// 12524 // *CIDO - BÖLÜM - 1759 - RecordingConfig - Kayıt - Format - Ses - Serde
// 12525 export interface RecordingConfig {
// 12526   format: string;
// 12527   include_audio: boolean;
// 12528   max_duration_seconds: number;
// 12529 }
// 12530 // *CIDO - BÖLÜM - 1760 - StreamingConfig - Akış - Bit Hızı - Çözünürlük - Serde
// 12531 export interface StreamingConfig {
// 12532   bitrate_kbps: number;
// 12533   resolution: string;
// 12534   keyframe_interval_seconds: number;
// 12535 }
// 12536 // *CIDO - BÖLÜM - 1761 - WebSocketConfig - WebSocket - URL - Protokol - Serde
// 12537 export interface WebSocketConfig {
// 12538   url: string;
// 12539   protocols: string[];
// 12540   reconnect_interval_ms: number;
// 12541 }
// 12542 // *CIDO - BÖLÜM - 1762 - SSEConnection - SSE Bağlantısı - URL - Son Olay Kimliği - Serde
// 12543 export interface SSEConnection {
// 12544   url: string;
// 12545   last_event_id: string;
// 12546   reconnect_ms: number;
// 12547 }
// 12548 // *CIDO - BÖLÜM - 1763 - PollingConfig - Yoklama - Aralık - Zaman Aşımı - Serde
// 12549 export interface PollingConfig {
// 12550   interval_ms: number;
// 12551   timeout_ms: number;
// 12552   retry_on_error: boolean;
// 12553 }
// 12554 // *CIDO - BÖLÜM - 1764 - LongPolling - Uzun Yoklama - Zaman Aşımı - Yeniden Bağlanma - Serde
// 12555 export interface LongPolling {
// 12556   timeout_seconds: number;
// 12557   reconnect_delay_ms: number;
// 12558 }
// 12559 // *CIDO - BÖLÜM - 1765 - GraphQLSubscription - GraphQL Abonelik - Sorgu - Değişkenler - Serde
// 12560 export interface GraphQLSubscription {
// 12561   query: string;
// 12562   variables: Record<string, unknown>;
// 12563   operation_name: string;
// 12564 }
// 12565 // *CIDO - BÖLÜM - 1766 - NotificationWebhookRegistration - Bildirim Webhook Kaydı - URL - Olaylar - Serde
// 12566 export interface NotificationWebhookRegistration {
// 12567   url: string;
// 12568   events: string[];
// 12569   secret: string;
// 12570 }
// 12571 // *CIDO - BÖLÜM - 1767 - WebhookVerification - Webhook Doğrulama - İmza - Zaman Damgası - Serde
// 12572 export interface WebhookVerification {
// 12573   signature_header: string;
// 12574   timestamp_tolerance_seconds: number;
// 12575 }
// 12576 // *CIDO - BÖLÜM - 1768 - IPCChannel - IPC Kanalı - Ad - Yön - Serde
// 12577 export interface IPCChannel {
// 12578   name: string;
// 12579   direction: string;
// 12580 }
// 12581 // *CIDO - BÖLÜM - 1769 - MessagePort - Mesaj Portu - Kaynak - Hedef - Serde
// 12582 export interface MessagePort {
// 12583   source: string;
// 12584   target: string;
// 12585 }
// 12586 // *CIDO - BÖLÜM - 1770 - BroadcastChannel - Yayın Kanalı - Ad - Serde
// 12587 export interface BroadcastChannel {
// 12588   name: string;
// 12589 }
// 12590 // *CIDO - BÖLÜM - 1771 - SharedWorker - Paylaşımlı İşçi - URL - Ad - Serde
// 12591 export interface SharedWorker {
// 12592   url: string;
// 12593   name: string;
// 12594 }
// 12595 // *CIDO - BÖLÜM - 1772 - WorkerPool - İşçi Havuzu - Boyut - Kuyruk - Serde
// 12596 export interface WorkerPool {
// 12597   size: number;
// 12598   queue_size: number;
// 12599 }
// 12600 // *CIDO - BÖLÜM - 1773 - BackgroundTask - Arka Plan Görevi - İsim - Öncelik - Serde
// 12601 export interface BackgroundTask {
// 12602   name: string;
// 12603   priority: string;
// 12604   retry_count: number;
// 12605 }
// 12606 // *CIDO - BÖLÜM - 1774 - TaskScheduler - Görev Zamanlayıcı - Cron - Zaman Aşımı - Serde
// 12607 export interface TaskScheduler {
// 12608   cron_expression: string;
// 12609   timeout_seconds: number;
// 12610   overlap_policy: string;
// 12611 }
// 12612 // *CIDO - BÖLÜM - 1775 - JobQueue - İş Kuyruğu - Eşzamanlılık - Duraklatıldı - Serde
// 12613 export interface JobQueue {
// 12614   concurrency: number;
// 12615   paused: boolean;
// 12616   pending_count: number;
// 12617 }
// 12618 // *CIDO - BÖLÜM - 1776 - JobDefinition - İş Tanımı - Ad - İşleyici - Serde
// 12619 export interface JobDefinition {
// 12620   name: string;
// 12621   handler: string;
// 12622   attempts: number;
// 12623   backoff_ms: number;
// 12624 }
// 12625 // *CIDO - BÖLÜM - 1777 - JobResult - İş Sonucu - Başarılı - Hata - Serde
// 12626 export interface JobResult {
// 12627   success: boolean;
// 12628   error_message?: string;
// 12629   duration_ms: number;
// 12630   output: Record<string, unknown>;
// 12631 }
// 12632 // *CIDO - BÖLÜM - 1778 - DeadLetterQueue - Ölü Mektup Kuyruğu - İş - Hata - Serde
// 12633 export interface DeadLetterQueue {
// 12634   job_id: string;
// 12635   error: string;
// 12636   failed_at: number;
// 12637   attempts: number;
// 12638 }
// 12639 // *CIDO - BÖLÜM - 1779 - RateLimiterTokenBucket - Belirteç Kovası - Kapasite - Dolum Oranı - Serde
// 12640 export interface RateLimiterTokenBucket {
// 12641   capacity: number;
// 12642   fill_rate: number;
// 12643   available_tokens: number;
// 12644 }
// 12645 // *CIDO - BÖLÜM - 1780 - LeakyBucket - Sızdıran Kova - Kapasite - Sızıntı Oranı - Serde
// 12646 export interface LeakyBucket {
// 12647   capacity: number;
// 12648   leak_rate: number;
// 12649   current_level: number;
// 12650 }
// 12651 // *CIDO - BÖLÜM - 1781 - FixedWindowCounter - Sabit Pencere - Pencere - Sayaç - Serde
// 12652 export interface FixedWindowCounter {
// 12653   window_start: number;
// 12654   window_size_seconds: number;
// 12655   count: number;
// 12656 }
// 12657 // *CIDO - BÖLÜM - 1782 - SlidingWindowLog - Kayan Pencere - Günlük - Limit - Serde
// 12658 export interface SlidingWindowLog {
// 12659   timestamps: number[];
// 12660   window_size_seconds: number;
// 12661   limit: number;
// 12662 }
// 12663 // *CIDO - BÖLÜM - 1783 - SlidingWindowCounter - Kayan Pencere Sayaç - Geçerli - Önceki - Serde
// 12664 export interface SlidingWindowCounter {
// 12665   current_window_count: number;
// 12666   previous_window_count: number;
// 12667   window_start: number;
// 12668 }
// 12669 // *CIDO - BÖLÜM - 1784 - ConcurrentRequestLimiter - Eşzamanlı İstek - Aktif - Maks - Serde
// 12670 export interface ConcurrentRequestLimiter {
// 12671   active_requests: number;
// 12672   max_concurrent: number;
// 12673   waiting_queue_size: number;
// 12674 }
// 12675 // *CIDO - BÖLÜM - 1785 - SemaphoreConfig - Semafor - İzinler - Maks - Serde
// 12676 export interface SemaphoreConfig {
// 12677   max_permits: number;
// 12678   available_permits: number;
// 12679   fair: boolean;
// 12680 }
// 12681 // *CIDO - BÖLÜM - 1786 - MutexLock - Mutex - Kilitli - Sahip - Serde
// 12682 export interface MutexLock {
// 12683   locked: boolean;
// 12684   owner: string;
// 12685   wait_queue: string[];
// 12686 }
// 12687 // *CIDO - BÖLÜM - 1787 - ReadWriteLock - Okuma Yazma Kilidi - Okuyucu - Yazar - Serde
// 12688 export interface ReadWriteLock {
// 12689   readers: number;
// 12690   writer_active: boolean;
// 12691   writer_waiting: boolean;
// 12692 }
// 12693 // *CIDO - BÖLÜM - 1788 - SpinLock - Döndürme Kilidi - Dönüş - Serde
// 12694 export interface SpinLock {
// 12695   spins: number;
// 12696   max_spins: number;
// 12697 }
// 12698 // *CIDO - BÖLÜM - 1789 - ConditionVariable - Koşul Değişkeni - Bekleyenler - Serde
// 12699 export interface ConditionVariable {
// 12700   waiting_count: number;
// 12701   signaled: boolean;
// 12702 }
// 12703 // *CIDO - BÖLÜM - 1790 - BarrierSync - Bariyer - Sayı - Bekleyen - Serde
// 12704 export interface BarrierSync {
// 12705   count: number;
// 12706   waiting: number;
// 12707 }
// 12708 // *CIDO - BÖLÜM - 1791 - LatchSync - Mandal - Sayım - Serde
// 12709 export interface LatchSync {
// 12710   count: number;
// 12711   released: boolean;
// 12712 }
// 12713 // *CIDO - BÖLÜM - 1792 - PromisePool - Söz Havuzu - Eşzamanlılık - Kuyruk - Serde
// 12714 export interface PromisePool {
// 12715   concurrency: number;
// 12716   pending: number;
// 12717   resolved: number;
// 12718   rejected: number;
// 12719 }
// 12720 // *CIDO - BÖLÜM - 1793 - DebounceConfig - Bastırma - Gecikme - Öncü - Serde
// 12721 export interface DebounceConfig {
// 12722   delay_ms: number;
// 12723   leading: boolean;
// 12724   trailing: boolean;
// 12725 }
// 12726 // *CIDO - BÖLÜM - 1794 - ThrottleConfig - Kısma - Aralık - Öncü - Serde
// 12727 export interface ThrottleConfig {
// 12728   interval_ms: number;
// 12729   leading: boolean;
// 12730   trailing: boolean;
// 12731 }
// 12732 // *CIDO - BÖLÜM - 1795 - MemoizeConfig - Ezberleme - Maks Boyut - TTL - Serde
// 12733 export interface MemoizeConfig {
// 12734   max_size: number;
// 12735   ttl_ms: number;
// 12736   key_resolver: string;
// 12737 }
// 12738 // *CIDO - BÖLÜM - 1796 - LRUCacheConfig - LRU Önbellek - Kapasite - TTL - Serde
// 12739 export interface LRUCacheConfig {
// 12740   capacity: number;
// 12741   ttl_ms: number;
// 12742   eviction_policy: string;
// 12743 }
// 12744 // *CIDO - BÖLÜM - 1797 - LFUCacheConfig - LFU Önbellek - Kapasite - Yaşlanma - Serde
// 12745 export interface LFUCacheConfig {
// 12746   capacity: number;
// 12747   aging_factor: number;
// 12748 }
// 12749 // *CIDO - BÖLÜM - 1798 - TLRUCacheConfig - TL RU Önbellek - Kapasite - TTL - Serde
// 12750 export interface TLRUCacheConfig {
// 12751   capacity: number;
// 12752   ttl_ms: number;
// 12753 }
// 12754 // *CIDO - BÖLÜM - 1799 - CacheStats - Önbellek İstatistikleri - İsabet - Kaçırma - Serde
// 12755 export interface CacheStats {
// 12756   hits: number;
// 12757   misses: number;
// 12758   hit_ratio: number;
// 12759   size: number;
// 12760   evictions: number;
// 12761 }
// 12762 // *CIDO - BÖLÜM - 1800 - BloomFilterConfig - Bloom Filtresi - Beklenen - FPR - Serde
// 12763 export interface BloomFilterConfig {
// 12764   expected_elements: number;
// 12765   false_positive_rate: number;
// 12766   hash_functions: number;
// 12767   bit_array_size: number;
// 12768 }
// 12769 // *CIDO - BÖLÜM - 1801 - CountMinSketch - Count-Min Sketch - Genişlik - Derinlik - Serde
// 12770 export interface CountMinSketch {
// 12771   width: number;
// 12772   depth: number;
// 12773   epsilon: number;
// 12774   delta: number;
// 12775 }
// 12776 // *CIDO - BÖLÜM - 1802 - HyperLogLog - HyperLogLog - Hassasiyet - Kayıt - Serde
// 12777 export interface HyperLogLog {
// 12778   precision: number;
// 12779   registers: number;
// 12780   estimate: number;
// 12781 }
// 12782 // *CIDO - BÖLÜM - 1803 - ConsistentHashRing - Tutarlı Hash - Düğümler - Sanal - Serde
// 12783 export interface ConsistentHashRing {
// 12784   nodes: string[];
// 12785   virtual_nodes: number;
// 12786 }
// 12787 // *CIDO - BÖLÜM - 1804 - GeoHashConfig - GeoHash - Hassasiyet - Sınır Kutusu - Serde
// 12788 export interface GeoHashConfig {
// 12789   precision: number;
// 12790   bounding_box: [number, number, number, number];
// 12791 }
// 12792 // *CIDO - BÖLÜM - 1805 - QuadTreeConfig - Dörtlü Ağaç - Sınır - Kapasite - Serde
// 12793 export interface QuadTreeConfig {
// 12794   bounds: [number, number, number, number];
// 12795   capacity: number;
// 12796   max_depth: number;
// 12797 }
// 12798 // *CIDO - BÖLÜM - 1806 - RTreeConfig - R-Ağacı - Maks Giriş - Min Giriş - Serde
// 12799 export interface RTreeConfig {
// 12800   max_entries: number;
// 12801   min_entries: number;
// 12802 }
// 12803 // *CIDO - BÖLÜM - 1807 - TrieConfig - Trie - Alfabe - Sıkıştırma - Serde
// 12804 export interface TrieConfig {
// 12805   alphabet: string[];
// 12806   compressed: boolean;
// 12807 }
// 12808 // *CIDO - BÖLÜM - 1808 - SuffixTree - Sonek Ağacı - Metin - Düğümler - Serde
// 12809 export interface SuffixTree {
// 12810   text: string;
// 12811   node_count: number;
// 12812 }
// 12813 // *CIDO - BÖLÜM - 1809 - FiniteStateMachine - Sonlu Durum Makinesi - Durumlar - Alfabe - Serde
// 12814 export interface FiniteStateMachine {
// 12815   states: string[];
// 12816   alphabet: string[];
// 12817   transitions: Record<string, Record<string, string>>;
// 12818   initial_state: string;
// 12819   final_states: string[];
// 12820 }
// 12821 // *CIDO - BÖLÜM - 1810 - TuringMachine - Turing Makinesi - Bant - Durum - Serde
// 12822 export interface TuringMachine {
// 12823   tape: string;
// 12824   head_position: number;
// 12825   state: string;
// 12826 }
// 12827 // *CIDO - BÖLÜM - 1811 - RegularExpression - Düzenli İfade - Desen - Bayraklar - Serde
// 12828 export interface RegularExpression {
// 12829   pattern: string;
// 12830   flags: string;
// 12831 }
// 12832 // *CIDO - BÖLÜM - 1812 - ContextFreeGrammar - Bağlamdan Bağımsız - Kurallar - Başlangıç - Serde
// 12833 export interface ContextFreeGrammar {
// 12834   rules: Record<string, string[]>;
// 12835   start_symbol: string;
// 12836 }
// 12837 // *CIDO - BÖLÜM - 1813 - ParserConfig - Ayrıştırıcı - Dilbilgisi - Eylemler - Serde
// 12838 export interface ParserConfig {
// 12839   grammar: ContextFreeGrammar;
// 12840   actions: Record<string, string>;
// 12841 }
// 12842 // *CIDO - BÖLÜM - 1814 - ASTNode - AST Düğümü - Tür - Değer - Serde
// 12843 export interface ASTNode {
// 12844   type: string;
// 12845   value?: string;
// 12846   children: ASTNode[];
// 12847 }
// 12848 // *CIDO - BÖLÜM - 1815 - TokenizerConfig - Belirteçleyici - Kurallar - Yoksay - Serde
// 12849 export interface TokenizerConfig {
// 12850   rules: Record<string, string>;
// 12851   ignore: string[];
// 12852 }
// 12853 // *CIDO - BÖLÜM - 1816 - LexerRule - Sözcüksel Kural - Ad - Desen - Serde
// 12854 export interface LexerRule {
// 12855   name: string;
// 12856   pattern: string;
// 12857   action: string;
// 12858 }
// 12859 // *CIDO - BÖLÜM - 1817 - CompilerOptions - Derleyici Seçenekleri - Optimize - Hata Ayıklama - Serde
// 12860 export interface CompilerOptions {
// 12861   optimize: boolean;
// 12862   debug: boolean;
// 12863   target: string;
// 12864 }
// 12865 // *CIDO - BÖLÜM - 1818 - TranspilerConfig - Dönüştürücü - Kaynak - Hedef - Serde
// 12866 export interface TranspilerConfig {
// 12867   source_language: string;
// 12868   target_language: string;
// 12869   plugins: string[];
// 12870 }
// 12871 // *CIDO - BÖLÜM - 1819 - MinifierConfig - Küçültücü - Sıkıştırma - Mangling - Serde
// 12872 export interface MinifierConfig {
// 12873   compress: boolean;
// 12874   mangle: boolean;
// 12875   source_map: boolean;
// 12876 }
// 12877 // *CIDO - BÖLÜM - 1820 - BundlerConfig - Paketleyici - Giriş - Çıkış - Serde
// 12878 export interface BundlerConfig {
// 12879   entry: string;
// 12880   output: string;
// 12881   format: string;
// 12882   splitting: boolean;
// 12883 }
// 12884 // *CIDO - BÖLÜM - 1821 - HotModuleReplacement - HMR - Etkin - Modüller - Serde
// 12885 export interface HotModuleReplacement {
// 12886   enabled: boolean;
// 12887   accepted_modules: string[];
// 12888 }
// 12889 // *CIDO - BÖLÜM - 1822 - SourceMapConfig - Kaynak Haritası - Tür - Satır İçi - Serde
// 12890 export interface SourceMapConfig {
// 12891   type: string;
// 12892   inline: boolean;
// 12893   include_content: boolean;
// 12894 }
// 12895 // *CIDO - BÖLÜM - 1823 - DevServerConfig - Geliştirme Sunucusu - Port - Proxy - Serde
// 12896 export interface DevServerConfig {
// 12897   port: number;
// 12898   proxy: Record<string, string>;
// 12899   hot: boolean;
// 12900 }
// 12901 // *CIDO - BÖLÜM - 1824 - AssetPipeline - Varlık Hattı - CSS JS - Optimizasyon - Serde
// 12902 export interface AssetPipeline {
// 12903   css: boolean;
// 12904   js: boolean;
// 12905   images: boolean;
// 12906 }
// 12907 // *CIDO - BÖLÜM - 1825 - CSSModulesConfig - CSS Modülleri - Kapsam - Dışa Aktar - Serde
// 12908 export interface CSSModulesConfig {
// 12909   scope: string;
// 12910   export_globals: boolean;
// 12911 }
// 12912 // *CIDO - BÖLÜM - 1826 - PostCSSConfig - PostCSS - Eklentiler - Tarayıcılar - Serde
// 12913 export interface PostCSSConfig {
// 12914   plugins: string[];
// 12915   browsers: string[];
// 12916 }
// 12917 // *CIDO - BÖLÜM - 1827 - SASSConfig - SASS - Sözdizimi - Dahil Et - Serde
// 12918 export interface SASSConfig {
// 12919   syntax: string;
// 12920   include_paths: string[];
// 12921 }
// 12922 // *CIDO - BÖLÜM - 1828 - TailwindConfig - Tailwind - İçerik - Tema - Serde
// 12923 export interface TailwindConfig {
// 12924   content: string[];
// 12925   theme_extensions: Record<string, unknown>;
// 12926 }
// 12927 // *CIDO - BÖLÜM - 1829 - DesignTokens - Tasarım Belirteçleri - Renk Aralık - Serde
// 12928 export interface DesignTokens {
// 12929   colors: Record<string, string>;
// 12930   spacing: Record<string, string>;
// 12931   typography: Record<string, unknown>;
// 12932 }
// 12933 // *CIDO - BÖLÜM - 1830 - IconLibrary - Simge Kütüphanesi - Ad - SVG - Serde
// 12934 export interface IconLibrary {
// 12935   icons: Record<string, string>;
// 12936 }
// 12937 // *CIDO - BÖLÜM - 1831 - IllustrationSet - İllüstrasyon Seti - Stil - URL - Serde
// 12938 export interface IllustrationSet {
// 12939   style: string;
// 12940   base_url: string;
// 12941   illustrations: string[];
// 12942 }
// 12943 // *CIDO - BÖLÜM - 1832 - FontConfig - Yazı Tipi - Aile - Ağırlık - Serde
// 12944 export interface FontConfig {
// 12945   family: string;
// 12946   weights: number[];
// 12947   source: string;
// 12948 }
// 12949 // *CIDO - BÖLÜM - 1833 - BrandKitConfig - Marka Kiti - Logo - Renkler - Serde
// 12950 export interface BrandKitConfig {
// 12951   logo_url: string;
// 12952   colors: string[];
// 12953   fonts: string[];
// 12954 }
// 12955 // *CIDO - BÖLÜM - 1834 - StyleGuide - Stil Rehberi - Bileşenler - Kurallar - Serde
// 12956 export interface StyleGuide {
// 12957   components: Record<string, unknown>;
// 12958   rules: string[];
// 12959 }
// 12960 // *CIDO - BÖLÜM - 1835 - StorybookConfig - Storybook - Hikayeler - Eklentiler - Serde
// 12961 export interface StorybookConfig {
// 12962   stories: string[];
// 12963   addons: string[];
// 12964 }
// 12965 // *CIDO - BÖLÜM - 1836 - ComponentDoc - Bileşen Dokümanı - Destekler - Örnek - Serde
// 12966 export interface ComponentDoc {
// 12967   component_name: string;
// 12968   props: PropDoc[];
// 12969   examples: string[];
// 12970 }
// 12971 // *CIDO - BÖLÜM - 1837 - PropDoc - Destek Dokümanı - Ad - Tür - Serde
// 12972 export interface PropDoc {
// 12973   name: string;
// 12974   type: string;
// 12975   required: boolean;
// 12976   default_value: string;
// 12977   description: string;
// 12978 }
// 12979 // *CIDO - BÖLÜM - 1838 - UnitTestConfig - Birim Testi - Çerçeve - Kapsama - Serde
// 12980 export interface UnitTestConfig {
// 12981   framework: string;
// 12982   coverage_threshold: number;
// 12983   test_match: string;
// 12984 }
// 12985 // *CIDO - BÖLÜM - 1839 - IntegrationTestConfig - Entegrasyon Testi - Ortam - Veritabanı - Serde
// 12986 export interface IntegrationTestConfig {
// 12987   environment: string;
// 12988   database_seed: string;
// 12989   timeout_seconds: number;
// 12990 }
// 12991 // *CIDO - BÖLÜM - 1840 - E2ETestConfig - Uçtan Uca Test - Tarayıcı - Temel URL - Serde
// 12992 export interface E2ETestConfig {
// 12993   browser: string;
// 12994   base_url: string;
// 12995   headless: boolean;
// 12996   retries: number;
// 12997 }
// 12998 // *CIDO - BÖLÜM - 1841 - SnapshotTestConfig - Anlık Görüntü - Güncelleme - Eşik - Serde
// 12999 export interface SnapshotTestConfig {
// 13000   update_snapshots: boolean;
// 13001   threshold: number;
// 13002 }
// 13003 // *CIDO - BÖLÜM - 1842 - MockServiceWorker - MSW - İşleyiciler - Mod - Serde
// 13004 export interface MockServiceWorker {
// 13005   handlers: string[];
// 13006   mode: string;
// 13007 }
// 13008 // *CIDO - BÖLÜM - 1843 - TestFixture - Test Fikstürü - Veri - Kurulum - Serde
// 13009 export interface TestFixture {
// 13010   data: Record<string, unknown>;
// 13011   setup: string;
// 13012   teardown: string;
// 13013 }
// 13014 // *CIDO - BÖLÜM - 1844 - TestDouble - Test İkizi - Tür - Davranış - Serde
// 13015 export interface TestDouble {
// 13016   type: string;
// 13017   target: string;
// 13018   behavior: string;
// 13019 }
// 13020 // *CIDO - BÖLÜM - 1845 - StubConfig - Taslak - Yöntem - Yanıt - Serde
// 13021 export interface StubConfig {
// 13022   method: string;
// 13023   response: Record<string, unknown>;
// 13024 }
// 13025 // *CIDO - BÖLÜM - 1846 - SpyConfig - Casus - Hedef - Yöntem - Serde
// 13026 export interface SpyConfig {
// 13027   target: string;
// 13028   method: string;
// 13029 }
// 13030 // *CIDO - BÖLÜM - 1847 - AssertionConfig - Onaylama - Tür - Beklenen - Serde
// 13031 export interface AssertionConfig {
// 13032   type: string;
// 13033   expected: unknown;
// 13034   actual: unknown;
// 13035 }
// 13036 // *CIDO - BÖLÜM - 1848 - PerformanceTestConfig - Performans Testi - Sanal Kullanıcı - Süre - Serde
// 13037 export interface PerformanceTestConfig {
// 13038   virtual_users: number;
// 13039   duration_seconds: number;
// 13040   ramp_up_seconds: number;
// 13041 }
// 13042 // *CIDO - BÖLÜM - 1849 - SecurityTestConfig - Güvenlik Testi - Tarayıcı - Derinlik - Serde
// 13043 export interface SecurityTestConfig {
// 13044   scanner: string;
// 13045   scan_depth: number;
// 13046   target_url: string;
// 13047 }
// 13048 // *CIDO - BÖLÜM - 1850 - AccessibilityTestConfig - Erişilebilirlik - Standart - Seviye - Serde
// 13049 export interface AccessibilityTestConfig {
// 13050   standard: string;
// 13051   level: string;
// 13052   include_rules: string[];
// 13053 }
// 13054 // *CIDO - BÖLÜM - 1851 - ChaosTestConfig - Kaos Testi - Deney - Süre - Serde
// 13055 export interface ChaosTestConfig {
// 13056   experiment: string;
// 13057   duration_seconds: number;
// 13058   blast_radius: number;
// 13059 }
// 13060 // *CIDO - BÖLÜM - 1852 - ResilienceTestConfig - Dayanıklılık - Hata Enjeksiyonu - Kurtarma - Serde
// 13061 export interface ResilienceTestConfig {
// 13062   fault: string;
// 13063   recovery_timeout_seconds: number;
// 13064 }
// 13065 // *CIDO - BÖLÜM - 1853 - MigrationTestConfig - Göç Testi - Kaynak Hedef - Doğrulama - Serde
// 13066 export interface MigrationTestConfig {
// 13067   source: string;
// 13068   target: string;
// 13069   validation_query: string;
// 13070 }
// 13071 // *CIDO - BÖLÜM - 1854 - UpgradeTestConfig - Yükseltme Testi - Sürüm - Geri Alma - Serde
// 13072 export interface UpgradeTestConfig {
// 13073   from_version: string;
// 13074   to_version: string;
// 13075   rollback_plan: string;
// 13076 }
// 13077 // *CIDO - BÖLÜM - 1855 - CompatibilityTestConfig - Uyumluluk - Tarayıcılar - Cihazlar - Serde
// 13078 export interface CompatibilityTestConfig {
// 13079   browsers: string[];
// 13080   devices: string[];
// 13081   os_versions: string[];
// 13082 }
// 13083 // *CIDO - BÖLÜM - 1856 - LocalizationTestConfig - Yerelleştirme - Diller - Kapsama - Serde
// 13084 export interface LocalizationTestConfig {
// 13085   languages: string[];
// 13086   coverage_percent: number;
// 13087 }
// 13088 // *CIDO - BÖLÜM - 1857 - LoadBalancerTest - Yük Dengeleyici - Arka Uçlar - Sağlık - Serde
// 13089 export interface LoadBalancerTest {
// 13090   backends: string[];
// 13091   health_check_endpoint: string;
// 13092 }
// 13093 // *CIDO - BÖLÜM - 1858 - FailoverTest - Yedekleme Testi - Birincil - İkincil - Serde
// 13094 export interface FailoverTest {
// 13095   primary: string;
// 13096   secondary: string;
// 13097   switchover_timeout_seconds: number;
// 13098 }
// 13099 // *CIDO - BÖLÜM - 1859 - BackupRestoreTest - Yedek Geri Yükleme - Yedek - Doğrulama - Serde
// 13100 export interface BackupRestoreTest {
// 13101   backup_id: string;
// 13102   restore_target: string;
// 13103   validation_checks: string[];
// 13104 }
// 13105 // *CIDO - BÖLÜM - 1860 - DataIntegrityTest - Veri Bütünlüğü - Sağlama - Beklenen - Serde
// 13106 export interface DataIntegrityTest {
// 13107   checksum: string;
// 13108   expected_row_count: number;
// 13109   validation_rules: string[];
// 13110 }
// 13111 // *CIDO - BÖLÜM - 1861 - SchemaValidation - Şema Doğrulama - Şema - Veri - Serde
// 13112 export interface SchemaValidation {
// 13113   schema: Record<string, unknown>;
// 13114   data: Record<string, unknown>;
// 13115   valid: boolean;
// 13116   errors: string[];
// 13117 }
// 13118 // *CIDO - BÖLÜM - 1862 - ContractTest - Sözleşme Testi - Sağlayıcı - Tüketici - Serde
// 13119 export interface ContractTest {
// 13120   provider: string;
// 13121   consumer: string;
// 13122   pact_file: string;
// 13123 }
// 13124 // *CIDO - BÖLÜM - 1863 - APIGatewayTest - API Ağ Geçidi - Rota - Arka Uç - Serde
// 13125 export interface APIGatewayTest {
// 13126   route: string;
// 13127   backend_url: string;
// 13128   expected_status: number;
// 13129 }
// 13130 // *CIDO - BÖLÜM - 1864 - RateLimitTest - Hız Sınırı Testi - İstekler - Beklenen - Serde
// 13131 export interface RateLimitTest {
// 13132   requests_per_second: number;
// 13133   expected_status: number;
// 13134   burst: number;
// 13135 }
// 13136 // *CIDO - BÖLÜM - 1865 - ConcurrencyTest - Eşzamanlılık - Kullanıcı - Süre - Serde
// 13137 export interface ConcurrencyTest {
// 13138   concurrent_users: number;
// 13139   duration_seconds: number;
// 13140   ramp_up_seconds: number;
// 13141 }
// 13142 // *CIDO - BÖLÜM - 1866 - StressTest - Stres Testi - Maks Kullanıcı - Süre - Serde
// 13143 export interface StressTest {
// 13144   max_users: number;
// 13145   duration_seconds: number;
// 13146   step_users: number;
// 13147 }
// 13148 // *CIDO - BÖLÜM - 1867 - SoakTest - Bekletme Testi - Kullanıcı - Süre - Serde
// 13149 export interface SoakTest {
// 13150   users: number;
// 13151   duration_hours: number;
// 13152 }
// 13153 // *CIDO - BÖLÜM - 1868 - SpikeTest - Ani Yük Testi - Ani Yük - Süre - Serde
// 13154 export interface SpikeTest {
// 13155   spike_users: number;
// 13156   spike_duration_seconds: number;
// 13157   base_users: number;
// 13158 }
// 13159 // *CIDO - BÖLÜM - 1869 - ScalabilityTest - Ölçeklenebilirlik - Başlangıç - Maks - Serde
// 13160 export interface ScalabilityTest {
// 13161   start_users: number;
// 13162   max_users: number;
// 13163   step_size: number;
// 13164   step_duration_seconds: number;
// 13165 }
// 13166 // *CIDO - BÖLÜM - 1870 - AvailabilityTest - Kullanılabilirlik - Çalışma Süresi - Kesinti - Serde
// 13167 export interface AvailabilityTest {
// 13168   uptime_target_percent: number;
// 13169   test_duration_hours: number;
// 13170   check_interval_seconds: number;
// 13171 }
// 13172 // *CIDO - BÖLÜM - 1871 - DisasterRecoveryTest - Felaket Kurtarma - Senaryo - RTO - Serde
// 13173 export interface DisasterRecoveryTest {
// 13174   scenario: string;
// 13175   target_rto_minutes: number;
// 13176   actual_rto_minutes: number;
// 13177   success: boolean;
// 13178 }
// 13179 // *CIDO - BÖLÜM - 1872 - PenetrationTestConfig - Sızma Testi - Hedef - Kapsam - Serde
// 13180 export interface PenetrationTestConfig {
// 13181   target: string;
// 13182   scope: string[];
// 13183   methodology: string;
// 13184 }
// 13185 // *CIDO - BÖLÜM - 1873 - RedTeamExercise - Kırmızı Takım - Amaç - Süre - Serde
// 13186 export interface RedTeamExercise {
// 13187   objective: string;
// 13188   duration_days: number;
// 13189   rules_of_engagement: string;
// 13190 }
// 13191 // *CIDO - BÖLÜM - 1874 - BlueTeamExercise - Mavi Takım - Tespit - Yanıt - Serde
// 13192 export interface BlueTeamExercise {
// 13193   detection_rate: number;
// 13194   response_time_minutes: number;
// 13195 }
// 13196 // *CIDO - BÖLÜM - 1875 - PurpleTeamExercise - Mor Takım - İşbirliği - Bulgular - Serde
// 13197 export interface PurpleTeamExercise {
// 13198   collaboration_points: string[];
// 13199   findings: string[];
// 13200   improvements: string[];
// 13201 }
// 13202 // *CIDO - BÖLÜM - 1876 - TabletopExercise - Masaüstü Tatbikatı - Senaryo - Katılımcılar - Serde
// 13203 export interface TabletopExercise {
// 13204   scenario: string;
// 13205   participants: string[];
// 13206   duration_minutes: number;
// 13207   outcomes: string[];
// 13208 }
// 13209 // *CIDO - BÖLÜM - 1877 - SimulationExercise - Simülasyon - Sistem - Parametreler - Serde
// 13210 export interface SimulationExercise {
// 13211   system: string;
// 13212   parameters: Record<string, number>;
// 13213   duration_minutes: number;
// 13214 }
// 13215 // *CIDO - BÖLÜM - 1878 - DryRunTest - Kuru Çalıştırma - Prosedür - Adımlar - Serde
// 13216 export interface DryRunTest {
// 13217   procedure: string;
// 13218   steps: string[];
// 13219   issues_found: string[];
// 13220 }
// 13221 // *CIDO - BÖLÜM - 1879 - SmokeTestSuite - Duman Testi - Kontroller - Sıralı - Serde
// 13222 export interface SmokeTestSuite {
// 13223   checks: SmokeCheck[];
// 13224   sequential: boolean;
// 13225   stop_on_failure: boolean;
// 13226 }
// 13227 // *CIDO - BÖLÜM - 1880 - SmokeCheck - Duman Kontrolü - Uç Nokta - Beklenen - Serde
// 13228 export interface SmokeCheck {
// 13229   endpoint: string;
// 13230   expected_status: number;
// 13231   timeout_ms: number;
// 13232 }
// 13233 // *CIDO - BÖLÜM - 1881 - HealthCheckTest - Sağlık Kontrolü - Bağımlılıklar - Zaman Aşımı - Serde
// 13234 export interface HealthCheckTest {
// 13235   dependencies: string[];
// 13236   timeout_seconds: number;
// 13237   healthy_threshold: number;
// 13238 }
// 13239 // *CIDO - BÖLÜM - 1882 - ReadinessCheck - Hazır Olma - Gecikme - Başarısızlık - Serde
// 13240 export interface ReadinessCheck {
// 13241   initial_delay_seconds: number;
// 13242   failure_threshold: number;
// 13243   success_threshold: number;
// 13244 }
// 13245 // *CIDO - BÖLÜM - 1883 - LivenessCheck - Canlılık - Periyot - Zaman Aşımı - Serde
// 13246 export interface LivenessCheck {
// 13247   period_seconds: number;
// 13248   timeout_seconds: number;
// 13249   failure_threshold: number;
// 13250 }
// 13251 // *CIDO - BÖLÜM - 1884 - StartupProbe - Başlangıç Sondası - Gecikme - Periyot - Serde
// 13252 export interface StartupProbe {
// 13253   initial_delay_seconds: number;
// 13254   period_seconds: number;
// 13255   failure_threshold: number;
// 13256 }
// 13257 // *CIDO - BÖLÜM - 1885 - GracefulShutdown - Zarif Kapatma - Zaman Aşımı - Kanca - Serde
// 13258 export interface GracefulShutdown {
// 13259   timeout_seconds: number;
// 13260   pre_stop_hook: string;
// 13261 }
// 13262 // *CIDO - BÖLÜM - 1886 - RollingRestart - Kademeli Yeniden Başlatma - Aralık - Maks - Serde
// 13263 export interface RollingRestart {
// 13264   interval_seconds: number;
// 13265   max_unavailable: number;
// 13266 }
// 13267 // *CIDO - BÖLÜM - 1887 - BlueGreenSwitch - Mavi Yeşil Geçiş - Yeni - Eski - Serde
// 13268 export interface BlueGreenSwitch {
// 13269   new_version: string;
// 13270   old_version: string;
// 13271   switch_percent: number;
// 13272 }
// 13273 // *CIDO - BÖLÜM - 1888 - CanaryAnalysis - Kanarya Analizi - Metrikler - Karar - Serde
// 13274 export interface CanaryAnalysis {
// 13275   metrics: Record<string, number>;
// 13276   decision: string;
// 13277   confidence: number;
// 13278 }
// 13279 // *CIDO - BÖLÜM - 1889 - AutomatedRollback - Otomatik Geri Alma - Tetikleyici - Hedef - Serde
// 13280 export interface AutomatedRollback {
// 13281   trigger: string;
// 13282   target_version: string;
// 13283   cooldown_minutes: number;
// 13284 }
// 13285 // *CIDO - BÖLÜM - 1890 - DeploymentFreeze - Dağıtım Dondurma - Başlangıç Bitiş - Sebep - Serde
// 13286 export interface DeploymentFreeze {
// 13287   start_time: number;
// 13288   end_time: number;
// 13289   reason: string;
// 13290 }
// 13291 // *CIDO - BÖLÜM - 1891 - ChangeWindow - Değişiklik Penceresi - Gün - Başlangıç - Serde
// 13292 export interface ChangeWindow {
// 13293   days: string[];
// 13294   start_hour: number;
// 13295   end_hour: number;
// 13296 }
// 13297 // *CIDO - BÖLÜM - 1892 - MaintenanceMode - Bakım Modu - Etkin - Mesaj - Serde
// 13298 export interface MaintenanceMode {
// 13299   enabled: boolean;
// 13300   message: string;
// 13301   allowed_ips: string[];
// 13302 }
// 13303 // *CIDO - BÖLÜM - 1893 - DrainMode - Boşaltma Modu - Etkin - Zaman Aşımı - Serde
// 13304 export interface DrainMode {
// 13305   enabled: boolean;
// 13306   timeout_seconds: number;
// 13307 }
// 13308 // *CIDO - BÖLÜM - 1894 - QuiesceMode - Susturma Modu - Etkin - Bekleyen - Serde
// 13309 export interface QuiesceMode {
// 13310   enabled: boolean;
// 13311   pending_requests: number;
// 13312 }
// 13313 // *CIDO - BÖLÜM - 1895 - RunLevel - Çalışma Seviyesi - Seviye - Hizmetler - Serde
// 13314 export interface RunLevel {
// 13315   level: number;
// 13316   services: string[];
// 13317 }
// 13318 // *CIDO - BÖLÜM - 1896 - SystemdUnit - Systemd Birimi - Ad - Durum - Serde
// 13319 export interface SystemdUnit {
// 13320   name: string;
// 13321   status: string;
// 13322   enabled: boolean;
// 13323 }
// 13324 // *CIDO - BÖLÜM - 1897 - SupervisorConfig - Süpervizör - Programlar - Serde
// 13325 export interface SupervisorConfig {
// 13326   programs: SupervisorProgram[];
// 13327 }
// 13328 // *CIDO - BÖLÜM - 1898 - SupervisorProgram - Program - Komut - Otomatik Başlatma - Serde
// 13329 export interface SupervisorProgram {
// 13330   name: string;
// 13331   command: string;
// 13332   autostart: boolean;
// 13333   autorestart: boolean;
// 13334 }
// 13335 // *CIDO - BÖLÜM - 1899 - ProcessManager - Süreç Yöneticisi - Süreçler - PID - Serde
// 13336 export interface ProcessManager {
// 13337   processes: ProcessInfo[];
// 13338 }
// 13339 // *CIDO - BÖLÜM - 1900 - ProcessInfo - Süreç Bilgisi - PID - CPU - Serde
// 13340 export interface ProcessInfo {
// 13341   pid: number;
// 13342   cpu_percent: number;
// 13343   memory_mb: number;
// 13344   uptime_seconds: number;
// 13345 }
// 13346 // *CIDO - BÖLÜM - 1901 - CronJob - Cron İşi - İfade - Komut - Serde
// 13347 export interface CronJob {
// 13348   expression: string;
// 13349   command: string;
// 13350   user: string;
// 13351   enabled: boolean;
// 13352 }
// 13353 // *CIDO - BÖLÜM - 1902 - LogRotateConfig - Günlük Döndürme - Desen - Saklama - Serde
// 13354 export interface LogRotateConfig {
// 13355   pattern: string;
// 13356   retention_count: number;
// 13357   compress: boolean;
// 13358 }
// 13359 // *CIDO - BÖLÜM - 1903 - CertRenewal - Sertifika Yenileme - Alan Adı - Bitiş - Serde
// 13360 export interface CertRenewal {
// 13361   domain: string;
// 13362   expires_at: number;
// 13363   auto_renew: boolean;
// 13364 }
// 13365 // *CIDO - BÖLÜM - 1904 - DNSCacheFlush - DNS Önbellek Temizleme - Alan Adı - Serde
// 13366 export interface DNSCacheFlush {
// 13367   domain: string;
// 13368   flushed_at: number;
// 13369 }
// 13370 // *CIDO - BÖLÜM - 1905 - OSUpdatePolicy - İşletim Sistemi Güncelleme - Program - Yeniden Başlatma - Serde
// 13371 export interface OSUpdatePolicy {
// 13372   schedule: string;
// 13373   auto_reboot: boolean;
// 13374   security_only: boolean;
// 13375 }
// 13376 // *CIDO - BÖLÜM - 1906 - PackageManager - Paket Yöneticisi - Kurulu - Güncellemeler - Serde
// 13377 export interface PackageManager {
// 13378   installed: Record<string, string>;
// 13379   available_updates: Record<string, string>;
// 13380 }
// 13381 // *CIDO - BÖLÜM - 1907 - DependencyTree - Bağımlılık Ağacı - Paket - Bağımlılıklar - Serde
// 13382 export interface DependencyTree {
// 13383   package: string;
// 13384   version: string;
// 13385   dependencies: DependencyTree[];
// 13386 }
// 13387 // *CIDO - BÖLÜM - 1908 - SBOMConfig - SBOM - Format - Bileşenler - Serde
// 13388 export interface SBOMConfig {
// 13389   format: string;
// 13390   components: SBOMComponent[];
// 13391 }
// 13392 // *CIDO - BÖLÜM - 1909 - SBOMComponent - SBOM Bileşeni - Ad Sürüm - Lisans - Serde
// 13393 export interface SBOMComponent {
// 13394   name: string;
// 13395   version: string;
// 13396   license: string;
// 13397   purl: string;
// 13398 }
// 13399 // *CIDO - BÖLÜM - 1910 - VulnerabilityDatabase - Zafiyet Veritabanı - CVE - Önem - Serde
// 13400 export interface VulnerabilityDatabase {
// 13401   cve_id: string;
// 13402   severity: string;
// 13403   affected_versions: string[];
// 13404   fixed_version: string;
// 13405 }
// 13406 // *CIDO - BÖLÜM - 1911 - SecurityBulletin - Güvenlik Bülteni - Kimlik - Özet - Serde
// 13407 export interface SecurityBulletin {
// 13408   id: string;
// 13409   summary: string;
// 13410   severity: string;
// 13411   published_at: number;
// 13412 }
// 13413 // *CIDO - BÖLÜM - 1912 - PatchTuesday - Salı Yamaları - Tarih - Yamalar - Serde
// 13414 export interface PatchTuesday {
// 13415   date: string;
// 13416   patches: PatchInfo[];
// 13417 }
// 13418 // *CIDO - BÖLÜM - 1913 - PatchInfo - Yama Bilgisi - KB - Başlık - Serde
// 13419 export interface PatchInfo {
// 13420   kb_id: string;
// 13421   title: string;
// 13422   severity: string;
// 13423   reboot_required: boolean;
// 13424 }
// 13425 // *CIDO - BÖLÜM - 1914 - ComplianceScanConfig - Uyum Taraması - Standart - Profil - Serde
// 13426 export interface ComplianceScanConfig {
// 13427   standard: string;
// 13428   profile: string;
// 13429   target_hosts: string[];
// 13430 }
// 13431 // *CIDO - BÖLÜM - 1915 - ComplianceScanResult - Uyum Taraması - Başarılı - Bulgular - Serde
// 13432 export interface ComplianceScanResult {
// 13433   passed: number;
// 13434   failed: number;
// 13435   findings: ComplianceFinding[];
// 13436 }
// 13437 // *CIDO - BÖLÜM - 1916 - ComplianceFinding - Uyum Bulgusu - Kural - Durum - Serde
// 13438 export interface ComplianceFinding {
// 13439   rule_id: string;
// 13440   status: string;
// 13441   description: string;
// 13442 }
// 13443 // *CIDO - BÖLÜM - 1917 - RemediationPlaybook - Düzeltme Oyun Kitabı - Bulgu - Adımlar - Serde
// 13444 export interface RemediationPlaybook {
// 13445   finding_id: string;
// 13446   steps: string[];
// 13447   estimated_time_minutes: number;
// 13448 }
// 13449 // *CIDO - BÖLÜM - 1918 - ExceptionRequest - İstisna Talebi - Kural - Gerekçe - Serde
// 13450 export interface ExceptionRequest {
// 13451   rule_id: string;
// 13452   justification: string;
// 13453   duration_days: number;
// 13454   approver: string;
// 13455 }
// 13456 // *CIDO - BÖLÜM - 1919 - RiskAcceptance - Risk Kabulü - Risk - Kabul Eden - Serde
// 13457 export interface RiskAcceptance {
// 13458   risk_id: string;
// 13459   accepted_by: string;
// 13460   accepted_until: number;
// 13461 }
// 13462 // *CIDO - BÖLÜM - 1920 - ControlImplementation - Kontrol Uygulaması - Kontrol - Durum - Serde
// 13463 export interface ControlImplementation {
// 13464   control_id: string;
// 13465   status: string;
// 13466   evidence: string;
// 13467   implemented_at: number;
// 13468 }
// 13469 // *CIDO - BÖLÜM - 1921 - PolicyDocument - Politika Belgesi - Başlık - İçerik - Serde
// 13470 export interface PolicyDocument {
// 13471   title: string;
// 13472   content: string;
// 13473   version: string;
// 13474   effective_date: number;
// 13475   review_date: number;
// 13476 }
// 13477 // *CIDO - BÖLÜM - 1922 - PolicyAcknowledgement - Politika Kabulü - Kullanıcı - Kabul - Serde
// 13478 export interface PolicyAcknowledgement {
// 13479   user_id: string;
// 13480   policy_id: string;
// 13481   acknowledged_at: number;
// 13482 }
// 13483 // *CIDO - BÖLÜM - 1923 - TrainingModule - Eğitim Modülü - Başlık - İlerleme - Serde
// 13484 export interface TrainingModule {
// 13485   title: string;
// 13486   progress_percent: number;
// 13487   completed: boolean;
// 13488   due_date: number;
// 13489 }
// 13490 // *CIDO - BÖLÜM - 1924 - SecurityAwareness - Güvenlik Farkındalığı - Phishing - Puan - Serde
// 13491 export interface SecurityAwareness {
// 13492   phishing_test_score: number;
// 13493   training_completion_rate: number;
// 13494   incident_reporting_rate: number;
// 13495 }
// 13496 // *CIDO - BÖLÜM - 1925 - IncidentResponseTeam - Olay Müdahale Ekibi - Üyeler - Rol - Serde
// 13497 export interface IncidentResponseTeam {
// 13498   members: IRTMember[];
// 13499   on_call_rotation: string;
// 13500 }
// 13501 // *CIDO - BÖLÜM - 1926 - IRTMember - IRT Üyesi - İsim Rol - İletişim - Serde
// 13502 export interface IRTMember {
// 13503   name: string;
// 13504   role: string;
// 13505   contact: string;
// 13506 }
// 13507 // *CIDO - BÖLÜM - 1927 - WarRoom - Savaş Odası - Olay - Katılımcılar - Serde
// 13508 export interface WarRoom {
// 13509   incident_id: string;
// 13510   participants: string[];
// 13511   bridge_url: string;
// 13512   started_at: number;
// 13513 }
// 13514 // *CIDO - BÖLÜM - 1928 - CommunicationPlan - İletişim Planı - Paydaşlar - Mesaj - Serde
// 13515 export interface CommunicationPlan {
// 13516   stakeholders: string[];
// 13517   message_template: string;
// 13518   channels: string[];
// 13519 }
// 13520 // *CIDO - BÖLÜM - 1929 - EscalationMatrix - Eskalasyon Matrisi - Seviye - Kişi - Serde
// 13521 export interface EscalationMatrix {
// 13522   levels: EscalationLevel[];
// 13523 }
// 13524 // *CIDO - BÖLÜM - 1930 - EscalationLevel - Eskalasyon Seviyesi - Seviye - Kişi - Serde
// 13525 export interface EscalationLevel {
// 13526   level: number;
// 13527   person: string;
// 13528   contact: string;
// 13529   timeout_minutes: number;
// 13530 }
// 13531 // *CIDO - BÖLÜM - 1931 - StakeholderNotification - Paydaş Bildirimi - Paydaş - Şablon - Serde
// 13532 export interface StakeholderNotification {
// 13533   stakeholder: string;
// 13534   template: string;
// 13535   sent_at: number;
// 13536 }
// 13537 // *CIDO - BÖLÜM - 1932 - PressRelease - Basın Açıklaması - Başlık - İçerik - Serde
// 13538 export interface PressRelease {
// 13539   headline: string;
// 13540   content: string;
// 13541   release_time: number;
// 13542   embargo_until: number;
// 13543 }
// 13544 // *CIDO - BÖLÜM - 1933 - SocialMediaPost - Sosyal Medya - Platform - İçerik - Serde
// 13545 export interface SocialMediaPost {
// 13546   platform: string;
// 13547   content: string;
// 13548   scheduled_time: number;
// 13549 }
// 13550 // *CIDO - BÖLÜM - 1934 - CustomerNotification - Müşteri Bildirimi - Segment - Mesaj - Serde
// 13551 export interface CustomerNotification {
// 13552   segment: string;
// 13553   message: string;
// 13554   channels: string[];
// 13555 }
// 13556 // *CIDO - BÖLÜM - 1935 - RegulatorNotification - Düzenleyici Bildirimi - Kurum - Rapor - Serde
// 13557 export interface RegulatorNotification {
// 13558   agency: string;
// 13559   report: string;
// 13560   deadline: number;
// 13561   submitted_at: number;
// 13562 }
// 13563 // *CIDO - BÖLÜM - 1936 - LegalReview - Hukuki İnceleme - Belge - Avukat - Serde
// 13564 export interface LegalReview {
// 13565   document: string;
// 13566   reviewer: string;
// 13567   status: string;
// 13568   completed_at: number;
// 13569 }
// 13570 // *CIDO - BÖLÜM - 1937 - InsuranceClaim - Sigorta Talebi - Poliçe - Tutar - Serde
// 13571 export interface InsuranceClaim {
// 13572   policy_number: string;
// 13573   claim_amount: number;
// 13574   status: string;
// 13575   filed_at: number;
// 13576 }
// 13577 // *CIDO - BÖLÜM - 1938 - RootCauseAnalysis - Kök Neden Analizi - Yöntem - Bulgular - Serde
// 13578 export interface RootCauseAnalysis {
// 13579   method: string;
// 13580   findings: string[];
// 13581   root_cause: string;
// 13582   contributing_factors: string[];
// 13583 }
// 13584 // *CIDO - BÖLÜM - 1939 - FiveWhys - Beş Neden - Soru - Cevaplar - Serde
// 13585 export interface FiveWhys {
// 13586   question: string;
// 13587   answers: string[];
// 13588   root_cause: string;
// 13589 }
// 13590 // *CIDO - BÖLÜM - 1940 - FishboneDiagram - Balık Kılçığı - Kategoriler - Nedenler - Serde
// 13591 export interface FishboneDiagram {
// 13592   categories: string[];
// 13593   causes: Record<string, string[]>;
// 13594 }
// 13595 // *CIDO - BÖLÜM - 1941 - FaultTreeAnalysis - Hata Ağacı - Olay - Kapılar - Serde
// 13596 export interface FaultTreeAnalysis {
// 13597   top_event: string;
// 13598   gates: FaultTreeGate[];
// 13599   basic_events: string[];
// 13600 }
// 13601 // *CIDO - BÖLÜM - 1942 - FaultTreeGate - Hata Ağacı Kapısı - Tür - Girdiler - Serde
// 13602 export interface FaultTreeGate {
// 13603   type: string;
// 13604   inputs: string[];
// 13605 }
// 13606 // *CIDO - BÖLÜM - 1943 - TimelineReconstruction - Zaman Çizelgesi - Olaylar - Kaynaklar - Serde
// 13607 export interface TimelineReconstruction {
// 13608   events: TimelineEvent[];
// 13609   sources: string[];
// 13610 }
// 13611 // *CIDO - BÖLÜM - 1944 - TimelineEvent - Zaman Çizelgesi Olayı - Zaman - Açıklama - Serde
// 13612 export interface TimelineEvent {
// 13613   timestamp: number;
// 13614   description: string;
// 13615   source: string;
// 13616 }
// 13617 // *CIDO - BÖLÜM - 1945 - EvidenceCollection - Kanıt Toplama - Eserler - Zincir - Serde
// 13618 export interface EvidenceCollection {
// 13619   artifacts: EvidenceArtifact[];
// 13620   chain_of_custody: string[];
// 13621 }
// 13622 // *CIDO - BÖLÜM - 1946 - EvidenceArtifact - Kanıt Eseri - Tür - Konum - Serde
// 13623 export interface EvidenceArtifact {
// 13624   type: string;
// 13625   location: string;
// 13626   hash: string;
// 13627   collected_at: number;
// 13628 }
// 13629 // *CIDO - BÖLÜM - 1947 - ForensicImage - Adli Görüntü - Disk - Format - Serde
// 13630 export interface ForensicImage {
// 13631   disk_id: string;
// 13632   format: string;
// 13633   image_path: string;
// 13634   verified: boolean;
// 13635 }
// 13636 // *CIDO - BÖLÜM - 1948 - MemoryAnalysis - Bellek Analizi - Süreç - Modüller - Serde
// 13637 export interface MemoryAnalysis {
// 13638   process_name: string;
// 13639   loaded_modules: string[];
// 13640   injected_code_detected: boolean;
// 13641 }
// 13642 // *CIDO - BÖLÜM - 1949 - NetworkCapture - Ağ Yakalama - Arayüz - Filtre - Serde
// 13643 export interface NetworkCapture {
// 13644   interface: string;
// 13645   filter: string;
// 13646   file_path: string;
// 13647   duration_seconds: number;
// 13648 }
// 13649 // *CIDO - BÖLÜM - 1950 - PacketAnalysis - Paket Analizi - Protokol - Akış - Serde
// 13650 export interface PacketAnalysis {
// 13651   protocol: string;
// 13652   flows: PacketFlow[];
// 13653   anomalies: string[];
// 13654 }
// 13655 // *CIDO - BÖLÜM - 1951 - PacketFlow - Paket Akışı - Kaynak Hedef - Bayt - Serde
// 13656 export interface PacketFlow {
// 13657   source_ip: string;
// 13658   dest_ip: string;
// 13659   source_port: number;
// 13660   dest_port: number;
// 13661   bytes: number;
// 13662 }
// 13663 // *CIDO - BÖLÜM - 1952 - LogAnalysis - Günlük Analizi - Dosya - Desen - Serde
// 13664 export interface LogAnalysis {
// 13665   file_path: string;
// 13666   pattern: string;
// 13667   matches: LogMatch[];
// 13668 }
// 13669 // *CIDO - BÖLÜM - 1953 - LogMatch - Günlük Eşleşmesi - Satır - Zaman Damgası - Serde
// 13670 export interface LogMatch {
// 13671   line_number: number;
// 13672   timestamp: number;
// 13673   content: string;
// 13674 }
// 13675 // *CIDO - BÖLÜM - 1954 - MalwareAnalysis - Kötü Amaçlı Yazılım - Dosya - Davranış - Serde
// 13676 export interface MalwareAnalysis {
// 13677   file_hash: string;
// 13678   file_name: string;
// 13679   behaviors: string[];
// 13680   verdict: string;
// 13681 }
// 13682 // *CIDO - BÖLÜM - 1955 - SandboxExecution - Korumalı Alan - Dosya - Sonuç - Serde
// 13683 export interface SandboxExecution {
// 13684   file_hash: string;
// 13685   execution_time_seconds: number;
// 13686   syscalls: string[];
// 13687   network_connections: string[];
// 13688 }
// 13689 // *CIDO - BÖLÜM - 1956 - ThreatIndicator - Tehdit Göstergesi - IOC - Tür - Serde
// 13690 export interface ThreatIndicator {
// 13691   ioc: string;
// 13692   type: string;
// 13693   confidence: number;
// 13694   source: string;
// 13695 }
// 13696 // *CIDO - BÖLÜM - 1957 - IndicatorOfCompromise - Uzlaşma Göstergesi - Değer - Bağlam - Serde
// 13697 export interface IndicatorOfCompromise {
// 13698   value: string;
// 13699   context: string;
// 13700   first_seen: number;
// 13701   last_seen: number;
// 13702 }
// 13703 // *CIDO - BÖLÜM - 1958 - ThreatActorProfile - Tehdit Aktörü - İsim - TTP - Serde
// 13704 export interface ThreatActorProfile {
// 13705   name: string;
// 13706   aliases: string[];
// 13707   ttps: string[];
// 13708   motivation: string;
// 13709 }
// 13710 // *CIDO - BÖLÜM - 1959 - AttackPattern - Saldırı Deseni - MITRE - Taktik - Serde
// 13711 export interface AttackPattern {
// 13712   mitre_id: string;
// 13713   tactic: string;
// 13714   technique: string;
// 13715   sub_technique: string;
// 13716 }
// 13717 // *CIDO - BÖLÜM - 1960 - MitreAttackMatrix - MITRE ATT&CK - Platform - Matris - Serde
// 13718 export interface MitreAttackMatrix {
// 13719   platform: string;
// 13720   matrix: string[][];
// 13721 }
// 13722 // *CIDO - BÖLÜM - 1961 - KillChainPhase - Öldürme Zinciri - Aşama - Algılama - Serde
// 13723 export interface KillChainPhase {
// 13724   phase: string;
// 13725   detected: boolean;
// 13726   detection_method: string;
// 13727 }
// 13728 // *CIDO - BÖLÜM - 1962 - DiamondModel - Elmas Modeli - Düşman - Altyapı - Serde
// 13729 export interface DiamondModel {
// 13730   adversary: string;
// 13731   infrastructure: string;
// 13732   capability: string;
// 13733   victim: string;
// 13734 }
// 13735 // *CIDO - BÖLÜM - 1963 - ATTACKNavigator - ATT&CK Gezgini - Katman - Teknikler - Serde
// 13736 export interface ATTACKNavigator {
// 13737   layer_name: string;
// 13738   techniques: string[];
// 13739   scores: number[];
// 13740 }
// 13741 // *CIDO - BÖLÜM - 1964 - ThreatHuntingQuery - Tehdit Avı Sorgusu - Veri Kaynağı - Sorgu - Serde
// 13742 export interface ThreatHuntingQuery {
// 13743   data_source: string;
// 13744   query: string;
// 13745   hypothesis: string;
// 13746 }
// 13747 // *CIDO - BÖLÜM - 1965 - HuntingLead - Av İpucu - Gösterge - Araştırma - Serde
// 13748 export interface HuntingLead {
// 13749   indicator: string;
// 13750   investigation_status: string;
// 13751   assigned_to: string;
// 13752 }
// 13753 // *CIDO - BÖLÜM - 1966 - DetectionRule - Tespit Kuralı - Ad - Sorgu - Serde
// 13754 export interface DetectionRule {
// 13755   name: string;
// 13756   query: string;
// 13757   severity: string;
// 13758   enabled: boolean;
// 13759 }
// 13760 // *CIDO - BÖLÜM - 1967 - SigmaRule - Sigma Kuralı - Başlık - Günlük Kaynağı - Serde
// 13761 export interface SigmaRule {
// 13762   title: string;
// 13763   log_source: string;
// 13764   detection: Record<string, unknown>;
// 13765 }
// 13766 // *CIDO - BÖLÜM - 1968 - YARARule - YARA Kuralı - Ad - Dizeler - Serde
// 13767 export interface YARARule {
// 13768   name: string;
// 13769   strings: Record<string, string>;
// 13770   condition: string;
// 13771 }
// 13772 // *CIDO - BÖLÜM - 1969 - SuricataRule - Suricata Kuralı - Eylem - İmza - Serde
// 13773 export interface SuricataRule {
// 13774   action: string;
// 13775   signature: string;
// 13776   category: string;
// 13777 }
// 13778 // *CIDO - BÖLÜM - 1970 - SnortRule - Snort Kuralı - Protokol - İçerik - Serde
// 13779 export interface SnortRule {
// 13780   protocol: string;
// 13781   content: string;
// 13782   sid: number;
// 13783 }
// 13784 // *CIDO - BÖLÜM - 1971 - CorrelationRule - Korelasyon Kuralı - Koşul - Eylem - Serde
// 13785 export interface CorrelationRule {
// 13786   condition: string;
// 13787   action: string;
// 13788   time_window_seconds: number;
// 13789 }
// 13790 // *CIDO - BÖLÜM - 1972 - AlertTriage - Uyarı Triyajı - Uyarı - Karar - Serde
// 13791 export interface AlertTriage {
// 13792   alert_id: string;
// 13793   decision: string;
// 13794   reason: string;
// 13795   triaged_by: string;
// 13796 }
// 13797 // *CIDO - BÖLÜM - 1973 - FalsePositiveAnalysis - Yanlış Pozitif - Kural - Ayarlama - Serde
// 13798 export interface FalsePositiveAnalysis {
// 13799   rule_id: string;
// 13800   false_positive_count: number;
// 13801   tuning_suggestion: string;
// 13802 }
// 13803 // *CIDO - BÖLÜM - 1974 - DetectionEngineering - Tespit Mühendisliği - Kural - Geri Bildirim - Serde
// 13804 export interface DetectionEngineering {
// 13805   rule_id: string;
// 13806   feedback: string;
// 13807   status: string;
// 13808   iterations: number;
// 13809 }
// 13810 // *CIDO - BÖLÜM - 1975 - BaselineProfile - Temel Profil - Metrik - Normal Aralık - Serde
// 13811 export interface BaselineProfile {
// 13812   metric: string;
// 13813   normal_range: [number, number];
// 13814   training_period_days: number;
// 13815 }
// 13816 // *CIDO - BÖLÜM - 1976 - AnomalyBaseline - Anomali Temeli - Mevsimsellik - Eşik - Serde
// 13817 export interface AnomalyBaseline {
// 13818   seasonality: string;
// 13819   threshold_multiplier: number;
// 13820   last_trained: number;
// 13821 }
// 13822 // *CIDO - BÖLÜM - 1977 - BehavioralAnalytics - Davranışsal Analitik - Varlık - Puan - Serde
// 13823 export interface BehavioralAnalytics {
// 13824   entity: string;
// 13825   score: number;
// 13826   baseline_deviation: number;
// 13827 }
// 13828 // *CIDO - BÖLÜM - 1978 - UEBAProfile - UEBA Profili - Kullanıcı - Risk - Serde
// 13829 export interface UEBAProfile {
// 13830   user_id: string;
// 13831   risk_score: number;
// 13832   anomalous_activities: string[];
// 13833 }
// 13834 // *CIDO - BÖLÜM - 1979 - PeerGroupAnalysis - Akran Grubu - Grup - Sapma - Serde
// 13835 export interface PeerGroupAnalysis {
// 13836   group: string;
// 13837   member_id: string;
// 13838   deviation_score: number;
// 13839 }
// 13840 // *CIDO - BÖLÜM - 1980 - EntityResolution - Varlık Çözümleme - Takma Ad - Kanonik - Serde
// 13841 export interface EntityResolution {
// 13842   aliases: string[];
// 13843   canonical_id: string;
// 13844   confidence: number;
// 13845 }
// 13846 // *CIDO - BÖLÜM - 1981 - AssetInventory - Varlık Envanteri - Ana Bilgisayar - İşletim Sistemi - Serde
// 13847 export interface AssetInventory {
// 13848   hostname: string;
// 13849   os: string;
// 13850   ip_address: string;
// 13851   last_seen: number;
// 13852 }
// 13853 // *CIDO - BÖLÜM - 1982 - AssetCriticality - Varlık Kritikliği - Varlık - Seviye - Serde
// 13854 export interface AssetCriticality {
// 13855   asset_id: string;
// 13856   criticality_level: string;
// 13857   business_impact: string;
// 13858 }
// 13859 // *CIDO - BÖLÜM - 1983 - AttackSurfaceMonitoring - Saldırı Yüzeyi - Portlar - Hizmetler - Serde
// 13860 export interface AttackSurfaceMonitoring {
// 13861   target: string;
// 13862   open_ports: number[];
// 13863   services: string[];
// 13864   vulnerabilities: number;
// 13865 }
// 13866 // *CIDO - BÖLÜM - 1984 - ExternalFootprint - Dış Ayak İzi - Alan Adı - Alt Alan Adları - Serde
// 13867 export interface ExternalFootprint {
// 13868   domain: string;
// 13869   subdomains: string[];
// 13870   ips: string[];
// 13871 }
// 13872 // *CIDO - BÖLÜM - 1985 - DigitalCertificateMonitoring - Dijital Sertifika - Alan Adı - Bitiş - Serde
// 13873 export interface DigitalCertificateMonitoring {
// 13874   domain: string;
// 13875   issuer: string;
// 13876   expires_at: number;
// 13877   issues: string[];
// 13878 }
// 13879 // *CIDO - BÖLÜM - 1986 - BrandMonitoring - Marka İzleme - Anahtar Kelime - Bahseden - Serde
// 13880 export interface BrandMonitoring {
// 13881   keyword: string;
// 13882   mentions: BrandMention[];
// 13883 }
// 13884 // *CIDO - BÖLÜM - 1987 - BrandMention - Marka Bahsi - Kaynak - URL - Serde
// 13885 export interface BrandMention {
// 13886   source: string;
// 13887   url: string;
// 13888   sentiment: string;
// 13889   detected_at: number;
// 13890 }
// 13891 // *CIDO - BÖLÜM - 1988 - DarkWebMonitoring - Karanlık Ağ - Kimlik Bilgisi - Tespit - Serde
// 13892 export interface DarkWebMonitoring {
// 13893   credentials_exposed: number;
// 13894   last_scan_at: number;
// 13895   findings: string[];
// 13896 }
// 13897 // *CIDO - BÖLÜM - 1989 - DataLeakDetection - Veri Sızıntısı - Kaynak - Veri Türü - Serde
// 13898 export interface DataLeakDetection {
// 13899   source: string;
// 13900   data_types: string[];
// 13901   record_count: number;
// 13902   detected_at: number;
// 13903 }
// 13904 // *CIDO - BÖLÜM - 1990 - SupplyChainRisk - Tedarik Zinciri Riski - Satıcı - Puan - Serde
// 13905 export interface SupplyChainRisk {
// 13906   vendor: string;
// 13907   risk_score: number;
// 13908   factors: string[];
// 13909 }
// 13910 // *CIDO - BÖLÜM - 1991 - ThirdPartyAssessment - Üçüncü Parti - Değerlendirme - Puan - Serde
// 13911 export interface ThirdPartyAssessment {
// 13912   vendor: string;
// 13913   security_score: number;
// 13914   compliance_status: string;
// 13915 }
// 13916 // *CIDO - BÖLÜM - 1992 - VendorQuestionnaire - Satıcı Anketi - Sorular - Cevaplar - Serde
// 13917 export interface VendorQuestionnaire {
// 13918   vendor: string;
// 13919   questions: string[];
// 13920   answers: string[];
// 13921   completed_at: number;
// 13922 }
// 13923 // *CIDO - BÖLÜM - 1993 - SecurityRating - Güvenlik Derecelendirmesi - Varlık - Puan - Serde
// 13924 export interface SecurityRating {
// 13925   asset: string;
// 13926   score: number;
// 13927   grade: string;
// 13928   assessed_at: number;
// 13929 }
// 13930 // *CIDO - BÖLÜM - 1994 - CyberInsurance - Siber Sigorta - Poliçe - Kapsam - Serde
// 13931 export interface CyberInsurance {
// 13932   policy_number: string;
// 13933   coverage_amount: number;
// 13934   deductible: number;
// 13935   expires_at: number;
// 13936 }
// 13937 // *CIDO - BÖLÜM - 1995 - RiskRegister - Risk Kaydı - Risk - Durum - Serde
// 13938 export interface RiskRegister {
// 13939   risks: RiskRegisterItem[];
// 13940 }
// 13941 // *CIDO - BÖLÜM - 1996 - RiskRegisterItem - Risk Kaydı Öğesi - Tanım - Seviye - Serde
// 13942 export interface RiskRegisterItem {
// 13943   description: string;
// 13944   likelihood: string;
// 13945   impact: string;
// 13946   risk_level: string;
// 13947   mitigation: string;
// 13948 }
// 13949 // *CIDO - BÖLÜM - 1997 - RiskHeatmap - Risk Isı Haritası - Riskler - Konum - Serde
// 13950 export interface RiskHeatmap {
// 13951   risks: RiskHeatmapEntry[];
// 13952 }
// 13953 // *CIDO - BÖLÜM - 1998 - RiskHeatmapEntry - Isı Haritası Girişi - x y - Etiket - Serde
// 13954 export interface RiskHeatmapEntry {
// 13955   x: number;
// 13956   y: number;
// 13957   label: string;
// 13958   severity: string;
// 13959 }
// 13960 // *CIDO - BÖLÜM - 1999 - RiskAppetite - Risk İştahı - Maks - Tolerans - Serde
// 13961 export interface RiskAppetite {
// 13962   max_acceptable_risk: string;
// 13963   tolerance_thresholds: Record<string, string>;
// 13964 }
// 13965 // *CIDO - BÖLÜM - 2000 - KeyRiskIndicator - Anahtar Risk Göstergesi - Gösterge - Eşik - Serde
// 13966 export interface KeyRiskIndicator {
// 13967   indicator: string;
// 13968   threshold_green: number;
// 13969   threshold_amber: number;
// 13970   threshold_red: number;
// 13971   current_value: number;
// 13972 }
// 13973 // *CIDO - BÖLÜM - 2001 - ControlFramework - Kontrol Çerçevesi - Standart - Kontroller - Serde
// 13974 export interface ControlFramework {
// 13975   standard: string;
// 13976   controls: FrameworkControl[];
// 13977 }
// 13978 // *CIDO - BÖLÜM - 2002 - FrameworkControl - Çerçeve Kontrolü - Kimlik - Açıklama - Serde
// 13979 export interface FrameworkControl {
// 13980   id: string;
// 13981   description: string;
// 13982   implementation_status: string;
// 13983 }
// 13984 // *CIDO - BÖLÜM - 2003 - MaturityModel - Olgunluk Modeli - Alan - Seviye - Serde
// 13985 export interface MaturityModel {
// 13986   domain: string;
// 13987   current_level: number;
// 13988   target_level: number;
// 13989 }
// 13990 // *CIDO - BÖLÜM - 2004 - CapabilityAssessment - Yetenek Değerlendirmesi - Yetenek - Puan - Serde
// 13991 export interface CapabilityAssessment {
// 13992   capability: string;
// 13993   score: number;
// 13994   gap_analysis: string;
// 13995 }
// 13996 // *CIDO - BÖLÜM - 2005 - ContinuousImprovement - Sürekli İyileştirme - Girişim - İlerleme - Serde
// 13997 export interface ContinuousImprovement {
// 13998   initiative: string;
// 13999   progress_percent: number;
// 14000   next_milestone: string;
// 14001 }
// 14002 // *CIDO - BÖLÜM - 2006 - LessonsLearned - Alınan Dersler - Olay - Ders - Serde
// 14003 export interface LessonsLearned {
// 14004   incident_id: string;
// 14005   lesson: string;
// 14006   action_item: string;
// 14007   owner: string;
// 14008 }
// 14009 // *CIDO - BÖLÜM - 2007 - AfterActionReport - Eylem Sonrası Raporu - Olay - Bulgular - Serde
// 14010 export interface AfterActionReport {
// 14011   event: string;
// 14012   findings: string[];
// 14013   recommendations: string[];
// 14014 }
// 14015 // *CIDO - BÖLÜM - 2008 - BestPracticesGuide - En İyi Uygulamalar - Konu - Yönergeler - Serde
// 14016 export interface BestPracticesGuide {
// 14017   topic: string;
// 14018   guidelines: string[];
// 14019 }
// 14020 // *CIDO - BÖLÜM - 2009 - StandardOperatingProcedure - SOP - Başlık - Adımlar - Serde
// 14021 export interface StandardOperatingProcedure {
// 14022   title: string;
// 14023   steps: SOPStep[];
// 14024 }
// 14025 // *CIDO - BÖLÜM - 2010 - SOPStep - SOP Adımı - Eylem - Sorumlu - Serde
// 14026 export interface SOPStep {
// 14027   action: string;
// 14028   responsible: string;
// 14029   expected_outcome: string;
// 14030 }
// 14031 // *CIDO - BÖLÜM - 2011 - OperationalPlaybook - Operasyonel Oyun Kitabı - Senaryo - Adımlar - Serde
// 14032 export interface OperationalPlaybook {
// 14033   scenario: string;
// 14034   steps: string[];
// 14035 }
// 14036 // *CIDO - BÖLÜM - 2012 - TroubleshootingGuide - Sorun Giderme - Belirti - Çözüm - Serde
// 14037 export interface TroubleshootingGuide {
// 14038   symptom: string;
// 14039   causes: string[];
// 14040   solutions: string[];
// 14041 }
// 14042 // *CIDO - BÖLÜM - 2013 - DiagnosticFlowchart - Teşhis Akış Şeması - Başlangıç - Düğümler - Serde
// 14043 export interface DiagnosticFlowchart {
// 14044   start_question: string;
// 14045   nodes: DiagnosticNode[];
// 14046 }
// 14047 // *CIDO - BÖLÜM - 2014 - DiagnosticNode - Teşhis Düğümü - Soru - Cevaplar - Serde
// 14048 export interface DiagnosticNode {
// 14049   question: string;
// 14050   answers: Record<string, string>;
// 14051 }
// 14052 // *CIDO - BÖLÜM - 2015 - DecisionTree - Karar Ağacı - Kök - Düğümler - Serde
// 14053 export interface DecisionTree {
// 14054   root_id: string;
// 14055   nodes: DecisionTreeNode[];
// 14056 }
// 14057 // *CIDO - BÖLÜM - 2016 - DecisionTreeNode - Karar Ağacı Düğümü - Koşul - Sonuç - Serde
// 14058 export interface DecisionTreeNode {
// 14059   id: string;
// 14060   condition: string;
// 14061   true_branch: string;
// 14062   false_branch: string;
// 14063   result: string;
// 14064 }
// 14065 // *CIDO - BÖLÜM - 2017 - TroubleshootingScript - Sorun Giderme Betiği - Ad - Komutlar - Serde
// 14066 export interface TroubleshootingScript {
// 14067   name: string;
// 14068   commands: string[];
// 14069   expected_outputs: string[];
// 14070 }
// 14071 // *CIDO - BÖLÜM - 2018 - DiagnosticReportConfig - Teşhis Raporu - Bileşenler - Serde
// 14072 export interface DiagnosticReportConfig {
// 14073   components: string[];
// 14074   collect_logs: boolean;
// 14075   collect_metrics: boolean;
// 14076 }
// 14077 // *CIDO - BÖLÜM - 2019 - SupportBundle - Destek Paketi - Dosyalar - Boyut - Serde
// 14078 export interface SupportBundle {
// 14079   files: string[];
// 14080   total_size_bytes: number;
// 14081   created_at: number;
// 14082 }
// 14083 // *CIDO - BÖLÜM - 2020 - HealthCheckSummary - Sağlık Kontrolü Özeti - Geçti Kaldı - Serde
// 14084 export interface HealthCheckSummary {
// 14085   checks_passed: number;
// 14086   checks_failed: number;
// 14087   overall_status: string;
// 14088 }
// 14089 // *CIDO - BÖLÜM - 2021 - SystemReport - Sistem Raporu - İşletim Sistemi - Kaynaklar - Serde
// 14090 export interface SystemReport {
// 14091   os_info: string;
// 14092   resource_usage: ResourceUtilization;
// 14093   uptime_days: number;
// 14094 }
// 14095 // *CIDO - BÖLÜM - 2022 - PerformanceProfile - Performans Profili - Uygulama - Metrikler - Serde
// 14096 export interface PerformanceProfile {
// 14097   application: string;
// 14098   metrics: Record<string, number>;
// 14099   profile_date: number;
// 14100 }
// 14101 // *CIDO - BÖLÜM - 2023 - BottleneckAnalysis - Darboğaz Analizi - Kaynak - Kullanım - Serde
// 14102 export interface BottleneckAnalysis {
// 14103   resource: string;
// 14104   utilization_percent: number;
// 14105   impact: string;
// 14106 }
// 14107 // *CIDO - BÖLÜM - 2024 - LatencyBreakdown - Gecikme Dağılımı - Bileşen - Süre - Serde
// 14108 export interface LatencyBreakdown {
// 14109   component: string;
// 14110   duration_ms: number;
// 14111   percentage: number;
// 14112 }
// 14113 // *CIDO - BÖLÜM - 2025 - ThroughputAnalysis - Verim Analizi - Operasyon - Oran - Serde
// 14114 export interface ThroughputAnalysis {
// 14115   operation: string;
// 14116   rate_per_second: number;
// 14117   period: string;
// 14118 }
// 14119 // *CIDO - BÖLÜM - 2026 - QueueDepthAnalysis - Kuyruk Derinliği - Kuyruk - Derinlik - Serde
// 14120 export interface QueueDepthAnalysis {
// 14121   queue_name: string;
// 14122   depth: number;
// 14123   avg_wait_ms: number;
// 14124 }
// 14125 // *CIDO - BÖLÜM - 2027 - ConnectionPoolAnalysis - Bağlantı Havuzu - Aktif - Boşta - Serde
// 14126 export interface ConnectionPoolAnalysis {
// 14127   pool_name: string;
// 14128   active: number;
// 14129   idle: number;
// 14130   pending: number;
// 14131 }
// 14132 // *CIDO - BÖLÜM - 2028 - GarbageCollectionAnalysis - Çöp Toplama - Frekans - Duraklama - Serde
// 14133 export interface GarbageCollectionAnalysis {
// 14134   frequency_per_hour: number;
// 14135   avg_pause_ms: number;
// 14136   max_pause_ms: number;
// 14137 }
// 14138 // *CIDO - BÖLÜM - 2029 - HeapAnalysis - Yığın Analizi - Kullanılan - Maks - Serde
// 14139 export interface HeapAnalysis {
// 14140   used_mb: number;
// 14141   committed_mb: number;
// 14142   max_mb: number;
// 14143   fragmentation_percent: number;
// 14144 }
// 14145 // *CIDO - BÖLÜM - 2030 - ThreadDump - İş Parçacığı Dökümü - İş Parçacığı - Durum - Serde
// 14146 export interface ThreadDump {
// 14147   thread_name: string;
// 14148   state: string;
// 14149   stack_trace: string[];
// 14150 }
// 14151 // *CIDO - BÖLÜM - 2031 - CPUProfile - CPU Profili - Süreç - Kullanım - Serde
// 14152 export interface CPUProfile {
// 14153   process: string;
// 14154   cpu_percent: number;
// 14155   user_percent: number;
// 14156   system_percent: number;
// 14157 }
// 14158 // *CIDO - BÖLÜM - 2032 - MemoryProfile - Bellek Profili - RSS - VSZ - Serde
// 14159 export interface MemoryProfile {
// 14160   process: string;
// 14161   rss_mb: number;
// 14162   vsz_mb: number;
// 14163   shared_mb: number;
// 14164 }
// 14165 // *CIDO - BÖLÜM - 2033 - DiskIOProfile - Disk IO Profili - Okuma - Yazma - Serde
// 14166 export interface DiskIOProfile {
// 14167   device: string;
// 14168   read_mbps: number;
// 14169   write_mbps: number;
// 14170   iops: number;
// 14171 }
// 14172 // *CIDO - BÖLÜM - 2034 - NetworkIOProfile - Ağ IO Profili - Arayüz - Bant Genişliği - Serde
// 14173 export interface NetworkIOProfile {
// 14174   interface: string;
// 14175   rx_mbps: number;
// 14176   tx_mbps: number;
// 14177   packets_per_second: number;
// 14178 }
// 14179 // *CIDO - BÖLÜM - 2035 - FileDescriptorUsage - Dosya Tanımlayıcı - Kullanılan - Maks - Serde
// 14180 export interface FileDescriptorUsage {
// 14181   used: number;
// 14182   max: number;
// 14183   process: string;
// 14184 }
// 14185 // *CIDO - BÖLÜM - 2036 - SystemLimitConfig - Sistem Limiti - Kaynak - Yumuşak Sert - Serde
// 14186 export interface SystemLimitConfig {
// 14187   resource: string;
// 14188   soft_limit: number;
// 14189   hard_limit: number;
// 14190 }
// 14191 // *CIDO - BÖLÜM - 2037 - KernelParameter - Çekirdek Parametresi - Anahtar - Değer - Serde
// 14192 export interface KernelParameter {
// 14193   key: string;
// 14194   value: string;
// 14195   description: string;
// 14196 }
// 14197 // *CIDO - BÖLÜM - 2038 - SysctlConfig - Sysctl - Parametreler - Serde
// 14198 export interface SysctlConfig {
// 14199   parameters: Record<string, string>;
// 14200 }
// 14201 // *CIDO - BÖLÜM - 2039 - EnvironmentVariable - Ortam Değişkeni - Anahtar - Değer - Serde
// 14202 export interface EnvironmentVariable {
// 14203   key: string;
// 14204   value: string;
// 14205   secret: boolean;
// 14206 }
// 14207 // *CIDO - BÖLÜM - 2040 - ShellConfig - Kabuk - Tür - Başlangıç - Serde
// 14208 export interface ShellConfig {
// 14209   shell_type: string;
// 14210   init_file: string;
// 14211   aliases: Record<string, string>;
// 14212 }
// 14213 // *CIDO - BÖLÜM - 2041 - PathConfig - Yol - Dizinler - Serde
// 14214 export interface PathConfig {
// 14215   directories: string[];
// 14216 }
// 14217 // *CIDO - BÖLÜM - 2042 - LibraryPath - Kütüphane Yolu - Dizinler - Serde
// 14218 export interface LibraryPath {
// 14219   directories: string[];
// 14220 }
// 14221 // *CIDO - BÖLÜM - 2043 - PythonPathConfig - Python Yolu - Site Paketleri - Serde
// 14222 export interface PythonPathConfig {
// 14223   site_packages: string[];
// 14224   user_base: string;
// 14225 }
// 14226 // *CIDO - BÖLÜM - 2044 - NodePathConfig - Node Yolu - Global Modüller - Serde
// 14227 export interface NodePathConfig {
// 14228   node_modules: string;
// 14229   global_modules: string;
// 14230 }
// 14231 // *CIDO - BÖLÜM - 2045 - JavaClasspath - Java Sınıf Yolu - Kavanozlar - Serde
// 14232 export interface JavaClasspath {
// 14233   jars: string[];
// 14234   directories: string[];
// 14235 }
// 14236 // *CIDO - BÖLÜM - 2046 - RubyLoadPath - Ruby Yükleme Yolu - Gemler - Serde
// 14237 export interface RubyLoadPath {
// 14238   gems: string[];
// 14239   lib_paths: string[];
// 14240 }
// 14241 // *CIDO - BÖLÜM - 2047 - GoPathConfig - Go Yolu - GOPATH - GOROOT - Serde
// 14242 export interface GoPathConfig {
// 14243   gopath: string;
// 14244   goroot: string;
// 14245   gobin: string;
// 14246 }
// 14247 // *CIDO - BÖLÜM - 2048 - RustPathConfig - Rust Yolu - Kargo Ana Sayfa - Serde
// 14248 export interface RustPathConfig {
// 14249   cargo_home: string;
// 14250   rustup_home: string;
// 14251 }
// 14252 // *CIDO - BÖLÜM - 2049 - DotNetConfig - .NET - Çalışma Zamanı - SDK - Serde
// 14253 export interface DotNetConfig {
// 14254   runtime_version: string;
// 14255   sdk_version: string;
// 14256   nuget_sources: string[];
// 14257 }
// 14258 // *CIDO - BÖLÜM - 2050 - PHPConfig - PHP - Sürüm - Uzantılar - Serde
// 14259 export interface PHPConfig {
// 14260   version: string;
// 14261   extensions: string[];
// 14262   ini_settings: Record<string, string>;
// 14263 }
// 14264 // *CIDO - BÖLÜM - 2051 - PerlConfig - Perl - Sürüm - Modüller - Serde
// 14265 export interface PerlConfig {
// 14266   version: string;
// 14267   modules: Record<string, string>;
// 14268 }
// 14269 // *CIDO - BÖLÜM - 2052 - RubyConfig - Ruby - Sürüm - Gemler - Serde
// 14270 export interface RubyConfig {
// 14271   version: string;
// 14272   gems: Record<string, string>;
// 14273 }
// 14274 // *CIDO - BÖLÜM - 2053 - PythonConfig - Python - Sürüm - Paketler - Serde
// 14275 export interface PythonConfig {
// 14276   version: string;
// 14277   packages: Record<string, string>;
// 14278   virtual_env: string;
// 14279 }
// 14280 // *CIDO - BÖLÜM - 2054 - NodeConfig - Node - Sürüm - Paketler - Serde
// 14281 export interface NodeConfig {
// 14282   version: string;
// 14283   packages: Record<string, string>;
// 14284 }
// 14285 // *CIDO - BÖLÜM - 2055 - DatabaseConfig - Veritabanı - Tür - Bağlantı - Serde
// 14286 export interface DatabaseConfig {
// 14287   type: string;
// 14288   host: string;
// 14289   port: number;
// 14290   database: string;
// 14291   user: string;
// 14292   pool_size: number;
// 14293 }
// 14294 // *CIDO - BÖLÜM - 2056 - CacheConfig - Önbellek - Tür - Düğümler - Serde
// 14295 export interface CacheConfig {
// 14296   type: string;
// 14297   nodes: string[];
// 14298   password_encrypted: string;
// 14299 }
// 14300 // *CIDO - BÖLÜM - 2057 - MessageBrokerConfig - Mesaj Aracısı - Tür - Konular - Serde
// 14301 export interface MessageBrokerConfig {
// 14302   type: string;
// 14303   brokers: string[];
// 14304   topics: string[];
// 14305 }
// 14306 // *CIDO - BÖLÜM - 2058 - SearchEngineConfig - Arama Motoru - Tür - Uç Nokta - Serde
// 14307 export interface SearchEngineConfig {
// 14308   type: string;
// 14309   endpoints: string[];
// 14310   index_prefix: string;
// 14311 }
// 14312 // *CIDO - BÖLÜM - 2059 - ObjectStorageConfig - Nesne Depolama - Tür - Kova - Serde
// 14313 export interface ObjectStorageConfig {
// 14314   type: string;
// 14315   endpoint: string;
// 14316   bucket: string;
// 14317   region: string;
// 14318 }
// 14319 // *CIDO - BÖLÜM - 2060 - CDNOriginConfig - CDN Kaynağı - Ana Bilgisayar - Protokol - Serde
// 14320 export interface CDNOriginConfig {
// 14321   host: string;
// 14322   protocol: string;
// 14323   port: number;
// 14324 }
// 14325 // *CIDO - BÖLÜM - 2061 - LoadBalancerBackend - Yük Dengeleyici Arka Uç - Ana Bilgisayar - Ağırlık - Serde
// 14326 export interface LoadBalancerBackend {
// 14327   host: string;
// 14328   port: number;
// 14329   weight: number;
// 14330   health_check_url: string;
// 14331 }
// 14332 // *CIDO - BÖLÜM - 2062 - ReverseProxyConfig - Ters Proxy - Yukarı Akış - Zaman Aşımı - Serde
// 14333 export interface ReverseProxyConfig {
// 14334   upstreams: string[];
// 14335   connect_timeout_seconds: number;
// 14336   read_timeout_seconds: number;
// 14337 }
// 14338 // *CIDO - BÖLÜM - 2063 - APIGatewayRoute - API Ağ Geçidi - Yol - Yöntem - Serde
// 14339 export interface APIGatewayRoute {
// 14340   path: string;
// 14341   method: string;
// 14342   backend_service: string;
// 14343 }
// 14344 // *CIDO - BÖLÜM - 2064 - ServiceRegistry - Hizmet Kaydı - Ad - Adres - Serde
// 14345 export interface ServiceRegistry {
// 14346   services: ServiceRegistryEntry[];
// 14347 }
// 14348 // *CIDO - BÖLÜM - 2065 - ServiceRegistryEntry - Kayıt Girişi - Ad - Ana Bilgisayar - Serde
// 14349 export interface ServiceRegistryEntry {
// 14350   name: string;
// 14351   host: string;
// 14352   port: number;
// 14353   health_check_url: string;
// 14354 }
// 14355 // *CIDO - BÖLÜM - 2066 - ServiceDiscovery - Hizmet Keşfi - DNS - Statik - Serde
// 14356 export interface ServiceDiscovery {
// 14357   method: string;
// 14358   dns_name: string;
// 14359   static_hosts: string[];
// 14360 }
// 14361 // *CIDO - BÖLÜM - 2067 - DNSSRVRecord - DNS SRV - Öncelik - Ağırlık - Serde
// 14362 export interface DNSSRVRecord {
// 14363   priority: number;
// 14364   weight: number;
// 14365   port: number;
// 14366   target: string;
// 14367 }
// 14368 // *CIDO - BÖLÜM - 2068 - NginxConfig - Nginx - Sunucu Blokları - Konumlar - Serde
// 14369 export interface NginxConfig {
// 14370   server_blocks: NginxServerBlock[];
// 14371 }
// 14372 // *CIDO - BÖLÜM - 2069 - NginxServerBlock - Sunucu Bloğu - Dinle - Sunucu Adı - Serde
// 14373 export interface NginxServerBlock {
// 14374   listen: number;
// 14375   server_name: string;
// 14376   locations: NginxLocation[];
// 14377 }
// 14378 // *CIDO - BÖLÜM - 2070 - NginxLocation - Konum - Yol - Proxy - Serde
// 14379 export interface NginxLocation {
// 14380   path: string;
// 14381   proxy_pass: string;
// 14382   extra_directives: Record<string, string>;
// 14383 }
// 14384 // *CIDO - BÖLÜM - 2071 - ApacheConfig - Apache - Sanal Ana Bilgisayar - Serde
// 14385 export interface ApacheConfig {
// 14386   virtual_hosts: ApacheVirtualHost[];
// 14387 }
// 14388 // *CIDO - BÖLÜM - 2072 - ApacheVirtualHost - Sanal Ana Bilgisayar - Port - Belge Kökü - Serde
// 14389 export interface ApacheVirtualHost {
// 14390   port: number;
// 14391   server_name: string;
// 14392   document_root: string;
// 14393 }
// 14394 // *CIDO - BÖLÜM - 2073 - CaddyConfig - Caddy - Site Adresi - Ters Proxy - Serde
// 14395 export interface CaddyConfig {
// 14396   site_address: string;
// 14397   reverse_proxy: string;
// 14398   tls_email: string;
// 14399 }
// 14400 // *CIDO - BÖLÜM - 2074 - HAProxyConfig - HAProxy - Ön Uç - Arka Uç - Serde
// 14401 export interface HAProxyConfig {
// 14402   frontends: HAProxyFrontend[];
// 14403   backends: HAProxyBackend[];
// 14404 }
// 14405 // *CIDO - BÖLÜM - 2075 - HAProxyFrontend - Ön Uç - Bağlama - Varsayılan Arka Uç - Serde
// 14406 export interface HAProxyFrontend {
// 14407   bind: string;
// 14408   default_backend: string;
// 14409 }
// 14410 // *CIDO - BÖLÜM - 2076 - HAProxyBackend - Arka Uç - Sunucular - Denge - Serde
// 14411 export interface HAProxyBackend {
// 14412   name: string;
// 14413   servers: string[];
// 14414   balance: string;
// 14415 }
// 14416 // *CIDO - BÖLÜM - 2077 - EnvoyConfig - Elçi - Dinleyiciler - Kümeler - Serde
// 14417 export interface EnvoyConfig {
// 14418   listeners: EnvoyListener[];
// 14419   clusters: EnvoyCluster[];
// 14420 }
// 14421 // *CIDO - BÖLÜM - 2078 - EnvoyListener - Dinleyici - Ad - Adres - Serde
// 14422 export interface EnvoyListener {
// 14423   name: string;
// 14424   address: string;
// 14425   port: number;
// 14426 }
// 14427 // *CIDO - BÖLÜM - 2079 - EnvoyCluster - Küme - Ad - Uç Noktalar - Serde
// 14428 export interface EnvoyCluster {
// 14429   name: string;
// 14430   endpoints: string[];
// 14431 }
// 14432 // *CIDO - BÖLÜM - 2080 - TraefikConfig - Traefik - Giriş Noktaları - Yönlendiriciler - Serde
// 14433 export interface TraefikConfig {
// 14434   entry_points: string[];
// 14435   routers: TraefikRouter[];
// 14436 }
// 14437 // *CIDO - BÖLÜM - 2081 - TraefikRouter - Yönlendirici - Kural - Hizmet - Serde
// 14438 export interface TraefikRouter {
// 14439   rule: string;
// 14440   service: string;
// 14441   middlewares: string[];
// 14442 }
// 14443 // *CIDO - BÖLÜM - 2082 - OpenTelemetryConfig - OpenTelemetry - İhracatçı - Örnekleme - Serde
// 14444 export interface OpenTelemetryConfig {
// 14445   exporter: string;
// 14446   endpoint: string;
// 14447   sampling_rate: number;
// 14448 }
// 14449 // *CIDO - BÖLÜM - 2083 - PrometheusConfig - Prometheus - Kazıma - Aralık - Serde
// 14450 export interface PrometheusConfig {
// 14451   scrape_interval_seconds: number;
// 14452   evaluation_interval_seconds: number;
// 14453   targets: string[];
// 14454 }
// 14455 // *CIDO - BÖLÜM - 2084 - GrafanaDashboardJSON - Grafana - Panel JSON - Serde
// 14456 export interface GrafanaDashboardJSON {
// 14457   title: string;
// 14458   panels: Record<string, unknown>[];
// 14459   uid: string;
// 14460 }
// 14461 // *CIDO - BÖLÜM - 2085 - AlertManagerConfig - Alertmanager - Alıcı - Rota - Serde
// 14462 export interface AlertManagerConfig {
// 14463   receivers: AlertManagerReceiver[];
// 14464   route: AlertManagerRoute;
// 14465 }
// 14466 // *CIDO - BÖLÜM - 2086 - AlertManagerReceiver - Alıcı - Ad - Entegrasyonlar - Serde
// 14467 export interface AlertManagerReceiver {
// 14468   name: string;
// 14469   integrations: Record<string, unknown>;
// 14470 }
// 14471 // *CIDO - BÖLÜM - 2087 - AlertManagerRoute - Rota - Grup - Alıcı - Serde
// 14472 export interface AlertManagerRoute {
// 14473   group_by: string[];
// 14474   receiver: string;
// 14475   routes: Record<string, unknown>[];
// 14476 }
// 14477 // *CIDO - BÖLÜM - 2088 - LokiConfig - Loki - Tutma - Depolama - Serde
// 14478 export interface LokiConfig {
// 14479   retention_days: number;
// 14480   storage_backend: string;
// 14481   ingestion_rate_mb: number;
// 14482 }
// 14483 // *CIDO - BÖLÜM - 2089 - TempoConfig - Tempo - Arka Uç - Tutma - Serde
// 14484 export interface TempoConfig {
// 14485   backend: string;
// 14486   retention_hours: number;
// 14487   receivers: Record<string, unknown>;
// 14488 }
// 14489 // *CIDO - BÖLÜM - 2090 - MimirConfig - Mimir - Depolama - Tutma - Serde
// 14490 export interface MimirConfig {
// 14491   storage_backend: string;
// 14492   retention_days: number;
// 14493   replication_factor: number;
// 14494 }
// 14495 // *CIDO - BÖLÜM - 2091 - PyroscopeConfig - Pyroscope - Uygulama - Sunucu - Serde
// 14496 export interface PyroscopeConfig {
// 14497   application_name: string;
// 14498   server_address: string;
// 14499   sample_rate: number;
// 14500 }
// 14501 // *CIDO - BÖLÜM - 2092 - FluentBitConfig - Fluent Bit - Girdi Çıktı - Filtre - Serde
// 14502 export interface FluentBitConfig {
// 14503   inputs: FluentBitInput[];
// 14504   outputs: FluentBitOutput[];
// 14505   filters: FluentBitFilter[];
// 14506 }
// 14507 // *CIDO - BÖLÜM - 2093 - FluentBitInput - Girdi - Ad - Etiket - Serde
// 14508 export interface FluentBitInput {
// 14509   name: string;
// 14510   tag: string;
// 14511   config: Record<string, string>;
// 14512 }
// 14513 // *CIDO - BÖLÜM - 2094 - FluentBitOutput - Çıktı - Ad - Eşleşme - Serde
// 14514 export interface FluentBitOutput {
// 14515   name: string;
// 14516   match: string;
// 14517   config: Record<string, string>;
// 14518 }
// 14519 // *CIDO - BÖLÜM - 2095 - FluentBitFilter - Filtre - Ad - Eşleşme - Serde
// 14520 export interface FluentBitFilter {
// 14521   name: string;
// 14522   match: string;
// 14523   config: Record<string, string>;
// 14524 }
// 14525 // *CIDO - BÖLÜM - 2096 - VectorConfig - Vector - Kaynaklar - Havuzlar - Serde
// 14526 export interface VectorConfig {
// 14527   sources: Record<string, unknown>;
// 14528   sinks: Record<string, unknown>;
// 14529   transforms: Record<string, unknown>;
// 14530 }
// 14531 // *CIDO - BÖLÜM - 2097 - LogStashConfig - LogStash - Girdi Filtre - Çıktı - Serde
// 14532 export interface LogStashConfig {
// 14533   input: Record<string, unknown>;
// 14534   filter: Record<string, unknown>[];
// 14535   output: Record<string, unknown>;
// 14536 }
// 14537 // *CIDO - BÖLÜM - 2098 - FilebeatConfig - Filebeat - Girdiler - Çıktı - Serde
// 14538 export interface FilebeatConfig {
// 14539   inputs: FilebeatInput[];
// 14540   output: Record<string, unknown>;
// 14541 }
// 14542 // *CIDO - BÖLÜM - 2099 - FilebeatInput - Girdi - Tür - Yollar - Serde
// 14543 export interface FilebeatInput {
// 14544   type: string;
// 14545   paths: string[];
// 14546   fields: Record<string, string>;
// 14547 }
// 14548 // *CIDO - BÖLÜM - 2100 - ElasticsearchConfig - Elasticsearch - Düğümler - Dizin - Serde
// 14549 export interface ElasticsearchConfig {
// 14550   nodes: string[];
// 14551   index_prefix: string;
// 14552   shards: number;
// 14553   replicas: number;
// 14554 }
// 14555 // *CIDO - BÖLÜM - 2101 - KibanaConfig - Kibana - Elasticsearch - Serde
// 14556 export interface KibanaConfig {
// 14557   elasticsearch_hosts: string[];
// 14558   server_port: number;
// 14559 }
// 14560 // *CIDO - BÖLÜM - 2102 - JaegerConfig - Jaeger - Toplayıcı - Sorgu - Serde
// 14561 export interface JaegerConfig {
// 14562   collector_endpoint: string;
// 14563   query_endpoint: string;
// 14564   sampling_strategies: Record<string, number>;
// 14565 }
// 14566 // *CIDO - BÖLÜM - 2103 - ZipkinConfig - Zipkin - Toplayıcı - Depolama - Serde
// 14567 export interface ZipkinConfig {
// 14568   collector_endpoint: string;
// 14569   storage_type: string;
// 14570 }
// 14571 // *CIDO - BÖLÜM - 2104 - KafkaConfig - Kafka - Aracılar - Konular - Serde
// 14572 export interface KafkaConfig {
// 14573   brokers: string[];
// 14574   topics: KafkaTopic[];
// 14575 }
// 14576 // *CIDO - BÖLÜM - 2105 - KafkaTopic - Konu - Ad - Bölümler - Serde
// 14577 export interface KafkaTopic {
// 14578   name: string;
// 14579   partitions: number;
// 14580   replication_factor: number;
// 14581 }
// 14582 // *CIDO - BÖLÜM - 2106 - RabbitMQConfig - RabbitMQ - Kuyruklar - Değişimler - Serde
// 14583 export interface RabbitMQConfig {
// 14584   queues: RabbitMQQueue[];
// 14585   exchanges: RabbitMQExchange[];
// 14586   bindings: RabbitMQBinding[];
// 14587 }
// 14588 // *CIDO - BÖLÜM - 2107 - RabbitMQQueue - Kuyruk - Ad - Dayanıklı - Serde
// 14589 export interface RabbitMQQueue {
// 14590   name: string;
// 14591   durable: boolean;
// 14592   exclusive: boolean;
// 14593   auto_delete: boolean;
// 14594 }
// 14595 // *CIDO - BÖLÜM - 2108 - RabbitMQExchange - Değişim - Ad - Tür - Serde
// 14596 export interface RabbitMQExchange {
// 14597   name: string;
// 14598   type: string;
// 14599   durable: boolean;
// 14600 }
// 14601 // *CIDO - BÖLÜM - 2109 - RabbitMQBinding - Bağlama - Değişim - Kuyruk - Serde
// 14602 export interface RabbitMQBinding {
// 14603   exchange: string;
// 14604   queue: string;
// 14605   routing_key: string;
// 14606 }
// 14607 // *CIDO - BÖLÜM - 2110 - NATSConfig - NATS - Sunucular - Konular - Serde
// 14608 export interface NATSConfig {
// 14609   servers: string[];
// 14610   subjects: string[];
// 14611 }
// 14612 // *CIDO - BÖLÜM - 2111 - RedisConfig - Redis - Düğümler - Veritabanı - Serde
// 14613 export interface RedisConfig {
// 14614   nodes: string[];
// 14615   database: number;
// 14616   password_encrypted: string;
// 14617 }
// 14618 // *CIDO - BÖLÜM - 2112 - MemcachedConfig - Memcached - Sunucular - Serde
// 14619 export interface MemcachedConfig {
// 14620   servers: string[];
// 14621 }
// 14622 // *CIDO - BÖLÜM - 2113 - PostgresConfig - Postgres - Ana Bilgisayar - Veritabanı - Serde
// 14623 export interface PostgresConfig {
// 14624   host: string;
// 14625   port: number;
// 14626   database: string;
// 14627   user: string;
// 14628   max_connections: number;
// 14629 }
// 14630 // *CIDO - BÖLÜM - 2114 - MySQLConfig - MySQL - Ana Bilgisayar - Veritabanı - Serde
// 14631 export interface MySQLConfig {
// 14632   host: string;
// 14633   port: number;
// 14634   database: string;
// 14635   user: string;
// 14636   max_connections: number;
// 14637 }
// 14638 // *CIDO - BÖLÜM - 2115 - MariaDBConfig - MariaDB - Ana Bilgisayar - Veritabanı - Serde
// 14639 export interface MariaDBConfig {
// 14640   host: string;
// 14641   port: number;
// 14642   database: string;
// 14643   user: string;
// 14644   max_connections: number;
// 14645 }
// 14646 // *CIDO - BÖLÜM - 2116 - MongoDBConfig - MongoDB - URI - Veritabanı - Serde
// 14647 export interface MongoDBConfig {
// 14648   uri: string;
// 14649   database: string;
// 14650   max_pool_size: number;
// 14651 }
// 14652 // *CIDO - BÖLÜM - 2117 - DynamoDBConfig - DynamoDB - Bölge - Tablo - Serde
// 14653 export interface DynamoDBConfig {
// 14654   region: string;
// 14655   table_prefix: string;
// 14656   read_capacity: number;
// 14657   write_capacity: number;
// 14658 }
// 14659 // *CIDO - BÖLÜM - 2118 - CassandraConfig - Cassandra - Düğümler - Anahtar Uzayı - Serde
// 14660 export interface CassandraConfig {
// 14661   nodes: string[];
// 14662   keyspace: string;
// 14663   replication_factor: number;
// 14664 }
// 14665 // *CIDO - BÖLÜM - 2119 - S3Config - S3 - Kova - Bölge - Serde
// 14666 export interface S3Config {
// 14667   bucket: string;
// 14668   region: string;
// 14669   access_key_encrypted: string;
// 14670 }
// 14671 // *CIDO - BÖLÜM - 2120 - GCSConfig - GCS - Kova - Proje - Serde
// 14672 export interface GCSConfig {
// 14673   bucket: string;
// 14674   project_id: string;
// 14675 }
// 14676 // *CIDO - BÖLÜM - 2121 - AzureBlobConfig - Azure Blob - Hesap Konteyner - Serde
// 14677 export interface AzureBlobConfig {
// 14678   account_name: string;
// 14679   container_name: string;
// 14680 }
// 14681 // *CIDO - BÖLÜM - 2122 - MinioConfig - MinIO - Uç Nokta - Kova - Serde
// 14682 export interface MinioConfig {
// 14683   endpoint: string;
// 14684   bucket: string;
// 14685   access_key: string;
// 14686   use_ssl: boolean;
// 14687 }
// 14688 // *CIDO - BÖLÜM - 2123 - GitHubActionsConfig - GitHub Actions - İş Akışı - Tetikleyici - Serde
// 14689 export interface GitHubActionsConfig {
// 14690   workflow_name: string;
// 14691   triggers: string[];
// 14692   jobs: Record<string, unknown>;
// 14693 }
// 14694 // *CIDO - BÖLÜM - 2124 - GitLabCIConfig - GitLab CI - Aşamalar - İşler - Serde
// 14695 export interface GitLabCIConfig {
// 14696   stages: string[];
// 14697   jobs: Record<string, unknown>;
// 14698 }
// 14699 // *CIDO - BÖLÜM - 2125 - Jenkinsfile - Jenkins - Pipeline - Aşamalar - Serde
// 14700 export interface Jenkinsfile {
// 14701   pipeline: string;
// 14702   stages: string[];
// 14703   agent: string;
// 14704 }
// 14705 // *CIDO - BÖLÜM - 2126 - CircleCIConfig - CircleCI - İşler - İş Akışları - Serde
// 14706 export interface CircleCIConfig {
// 14707   jobs: Record<string, unknown>;
// 14708   workflows: Record<string, unknown>;
// 14709 }
// 14710 // *CIDO - BÖLÜM - 2127 - TravisCIConfig - Travis CI - Dil - Betik - Serde
// 14711 export interface TravisCIConfig {
// 14712   language: string;
// 14713   script: string[];
// 14714 }
// 14715 // *CIDO - BÖLÜM - 2128 - DroneCIConfig - Drone CI - Tür - Adımlar - Serde
// 14716 export interface DroneCIConfig {
// 14717   kind: string;
// 14718   type: string;
// 14719   steps: Record<string, unknown>[];
// 14720 }
// 14721 // *CIDO - BÖLÜM - 2129 - ArgoCDApplication - ArgoCD - Kaynak - Hedef - Serde
// 14722 export interface ArgoCDApplication {
// 14723   source_repo_url: string;
// 14724   source_path: string;
// 14725   destination_server: string;
// 14726   destination_namespace: string;
// 14727 }
// 14728 // *CIDO - BÖLÜM - 2130 - FluxCDConfig - Flux CD - Kaynak - Uzlaştırma - Serde
// 14729 export interface FluxCDConfig {
// 14730   source_url: string;
// 14731   reconcile_interval_minutes: number;
// 14732 }
// 14733 // *CIDO - BÖLÜM - 2131 - HelmRelease - Helm Sürümü - Grafik - Değerler - Serde
// 14734 export interface HelmRelease {
// 14735   chart_name: string;
// 14736   chart_version: string;
// 14737   values: Record<string, unknown>;
// 14738 }
// 14739 // *CIDO - BÖLÜM - 2132 - KustomizeOverlay - Kustomize - Taban - Yama - Serde
// 14740 export interface KustomizeOverlay {
// 14741   bases: string[];
// 14742   patches: string[];
// 14743 }
// 14744 // *CIDO - BÖLÜM - 2133 - JsonnetConfig - Jsonnet - Dosya - Değişkenler - Serde
// 14745 export interface JsonnetConfig {
// 14746   file: string;
// 14747   ext_vars: Record<string, string>;
// 14748 }
// 14749 // *CIDO - BÖLÜM - 2134 - PulumiStack - Pulumi Yığını - Proje - Yığın - Serde
// 14750 export interface PulumiStack {
// 14751   project: string;
// 14752   stack: string;
// 14753   config: Record<string, string>;
// 14754 }
// 14755 // *CIDO - BÖLÜM - 2135 - CDKTFStack - CDKTF - Dil - Yığın - Serde
// 14756 export interface CDKTFStack {
// 14757   language: string;
// 14758   stack_name: string;
// 14759 }
// 14760 // *CIDO - BÖLÜM - 2136 - TerraformWorkspace - Terraform Çalışma Alanı - Ad - Değişkenler - Serde
// 14761 export interface TerraformWorkspace {
// 14762   name: string;
// 14763   variables: Record<string, string>;
// 14764 }
// 14765 // *CIDO - BÖLÜM - 2137 - CrossplaneClaim - Crossplane - Talep - Kaynak - Serde
// 14766 export interface CrossplaneClaim {
// 14767   claim_name: string;
// 14768   resource_class: string;
// 14769 }
// 14770 // *CIDO - BÖLÜM - 2138 - SpinnakerPipeline - Spinnaker - Pipeline - Aşamalar - Serde
// 14771 export interface SpinnakerPipeline {
// 14772   pipeline_name: string;
// 14773   stages: Record<string, unknown>[];
// 14774 }
// 14775 // *CIDO - BÖLÜM - 2139 - TektonPipeline - Tekton - Görevler - Pipeline - Serde
// 14776 export interface TektonPipeline {
// 14777   tasks: TektonTask[];
// 14778 }
// 14779 // *CIDO - BÖLÜM - 2140 - TektonTask - Tekton Görevi - Ad - Adımlar - Serde
// 14780 export interface TektonTask {
// 14781   name: string;
// 14782   steps: TektonStep[];
// 14783 }
// 14784 // *CIDO - BÖLÜM - 2141 - TektonStep - Tekton Adımı - Ad - Görüntü - Serde
// 14785 export interface TektonStep {
// 14786   name: string;
// 14787   image: string;
// 14788   command: string[];
// 14789 }
// 14790 // *CIDO - BÖLÜM - 2142 - BuildKitConfig - BuildKit - Dockerfile - Bağlam - Serde
// 14791 export interface BuildKitConfig {
// 14792   dockerfile: string;
// 14793   context: string;
// 14794   platforms: string[];
// 14795 }
// 14796 // *CIDO - BÖLÜM - 2143 - KanikoConfig - Kaniko - Dockerfile - Bağlam - Serde
// 14797 export interface KanikoConfig {
// 14798   dockerfile: string;
// 14799   context: string;
// 14800   destination: string;
// 14801 }
// 14802 // *CIDO - BÖLÜM - 2144 - BuildahConfig - Buildah - Dockerfile - Etiket - Serde
// 14803 export interface BuildahConfig {
// 14804   dockerfile: string;
// 14805   tag: string;
// 14806 }
// 14807 // *CIDO - BÖLÜM - 2145 - PackerConfig - Packer - İnşacılar - Tedarikçiler - Serde
// 14808 export interface PackerConfig {
// 14809   builders: Record<string, unknown>[];
// 14810   provisioners: Record<string, unknown>[];
// 14811 }
// 14812 // *CIDO - BÖLÜM - 2146 - VagrantConfig - Vagrant - Kutu - Sağlayıcı - Serde
// 14813 export interface VagrantConfig {
// 14814   box: string;
// 14815   provider: string;
// 14816   provision_script: string;
// 14817 }
// 14818 // *CIDO - BÖLÜM - 2147 - DevContainerJSON - Dev Container - Dockerfile - Özellikler - Serde
// 14819 export interface DevContainerJSON {
// 14820   dockerfile: string;
// 14821   features: Record<string, unknown>;
// 14822   post_create_command: string;
// 14823 }
// 14824 // *CIDO - BÖLÜM - 2148 - CloudInitConfig - Cloud-Init - Paketler - Çalıştırma - Serde
// 14825 export interface CloudInitConfig {
// 14826   packages: string[];
// 14827   runcmd: string[];
// 14828 }
// 14829 // *CIDO - BÖLÜM - 2149 - IgnitionConfig - Ignition - Sistem - Depolama - Serde
// 14830 export interface IgnitionConfig {
// 14831   systemd_units: string[];
// 14832   storage_files: Record<string, string>[];
// 14833 }
// 14834 // *CIDO - BÖLÜM - 2150 - KickstartConfig - Kickstart - Dil - Ağ - Serde
// 14835 export interface KickstartConfig {
// 14836   lang: string;
// 14837   network: string;
// 14838   packages: string[];
// 14839 }
// 14840 // *CIDO - BÖLÜM - 2151 - PreseedConfig - Preseed - Yerel Ayar - Ayna - Serde
// 14841 export interface PreseedConfig {
// 14842   locale: string;
// 14843   mirror: string;
// 14844   packages: string[];
// 14845 }
// 14846 // *CIDO - BÖLÜM - 2152 - AutoinstallConfig - Otomatik Kurulum - Kimlik - Depolama - Serde
// 14847 export interface AutoinstallConfig {
// 14848   identity: Record<string, string>;
// 14849   storage_layout: string;
// 14850 }
// 14851 // *CIDO - BÖLÜM - 2153 - AnacondaConfig - Anaconda - Depolama - Ağ - Serde
// 14852 export interface AnacondaConfig {
// 14853   storage: string;
// 14854   network: string;
// 14855 }
// 14856 // *CIDO - BÖLÜM - 2154 - CobblerProfile - Cobbler Profili - Dağıtım - Sistem - Serde
// 14857 export interface CobblerProfile {
// 14858   distro: string;
// 14859   system_name: string;
// 14860 }
// 14861 // *CIDO - BÖLÜM - 2155 - MAASConfig - MAAS - Bölge - Raf - Serde
// 14862 export interface MAASConfig {
// 14863   region_controller: string;
// 14864   rack_controller: string;
// 14865 }
// 14866 // *CIDO - BÖLÜM - 2156 - ForemanConfig - Foreman - Ana Bilgisayar Grubu - Parametreler - Serde
// 14867 export interface ForemanConfig {
// 14868   hostgroup: string;
// 14869   parameters: Record<string, string>;
// 14870 }
// 14871 // *CIDO - BÖLÜM - 2157 - StackiConfig - Stacki - Paletler - Kutular - Serde
// 14872 export interface StackiConfig {
// 14873   pallets: string[];
// 14874   boxes: string[];
// 14875 }
// 14876 // *CIDO - BÖLÜM - 2158 - XCATConfig - xCAT - Düğüm Grubu - Görüntü - Serde
// 14877 export interface XCATConfig {
// 14878   nodegroup: string;
// 14879   image: string;
// 14880 }
// 14881 // *CIDO - BÖLÜM - 2159 - WarewulfConfig - Warewulf - Düğüm - VNFS - Serde
// 14882 export interface WarewulfConfig {
// 14883   node_name: string;
// 14884   vnfs: string;
// 14885 }
// 14886 // *CIDO - BÖLÜM - 2160 - OpenHPCConfig - OpenHPC - İş Yükü Yöneticisi - MPI - Serde
// 14887 export interface OpenHPCConfig {
// 14888   workload_manager: string;
// 14889   mpi_library: string;
// 14890 }
// 14891 // *CIDO - BÖLÜM - 2161 - SlurmConfig - Slurm - Denetleyici - Düğümler - Serde
// 14892 export interface SlurmConfig {
// 14893   controller: string;
// 14894   nodes: string[];
// 14895 }
// 14896 // *CIDO - BÖLÜM - 2162 - PBSTorqueConfig - PBS Torque - Sunucu - Kuyruklar - Serde
// 14897 export interface PBSTorqueConfig {
// 14898   server: string;
// 14899   queues: string[];
// 14900 }
// 14901 // *CIDO - BÖLÜM - 2163 - LSFDaemon - LSF - Ana Bilgisayar - Kuyruklar - Serde
// 14902 export interface LSFDaemon {
// 14903   master_host: string;
// 14904   queues: string[];
// 14905 }
// 14906 // *CIDO - BÖLÜM - 2164 - GridEngineConfig - Grid Engine - Ana Bilgisayar - Kuyruklar - Serde
// 14907 export interface GridEngineConfig {
// 14908   master_host: string;
// 14909   queues: string[];
// 14910 }
// 14911 // *CIDO - BÖLÜM - 2165 - HTCondorConfig - HTCondor - Merkezi Yönetici - Serde
// 14912 export interface HTCondorConfig {
// 14913   central_manager: string;
// 14914 }
// 14915 // *CIDO - BÖLÜM - 2166 - NomadConfig - Nomad - Sunucular - İstemciler - Serde
// 14916 export interface NomadConfig {
// 14917   servers: string[];
// 14918   clients: string[];
// 14919 }
// 14920 // *CIDO - BÖLÜM - 2167 - DockerSwarmConfig - Docker Swarm - Yöneticiler - İşçiler - Serde
// 14921 export interface DockerSwarmConfig {
// 14922   managers: string[];
// 14923   workers: string[];
// 14924 }
// 14925 // *CIDO - BÖLÜM - 2168 - KubernetesClusterConfig - K8s Kümesi - API Sunucusu - Sürüm - Serde
// 14926 export interface KubernetesClusterConfig {
// 14927   api_server: string;
// 14928   version: string;
// 14929   pod_cidr: string;
// 14930   service_cidr: string;
// 14931 }
// 14932 // *CIDO - BÖLÜM - 2169 - K3sConfig - K3s - Sunucu - Düğümler - Serde
// 14933 export interface K3sConfig {
// 14934   server: string;
// 14935   nodes: string[];
// 14936 }
// 14937 // *CIDO - BÖLÜM - 2170 - MicroK8sConfig - MicroK8s - Eklentiler - Serde
// 14938 export interface MicroK8sConfig {
// 14939   addons: string[];
// 14940 }
// 14941 // *CIDO - BÖLÜM - 2171 - KindConfig - Kind - Küme Adı - Düğümler - Serde
// 14942 export interface KindConfig {
// 14943   cluster_name: string;
// 14944   nodes: number;
// 14945 }
// 14946 // *CIDO - BÖLÜM - 2172 - MinikubeConfig - Minikube - Sürücü - CPU - Serde
// 14947 export interface MinikubeConfig {
// 14948   driver: string;
// 14949   cpus: number;
// 14950   memory_mb: number;
// 14951 }
// 14952 // *CIDO - BÖLÜM - 2173 - KubeadmConfig - Kubeadm - Pod Ağı - Hizmet DNS - Serde
// 14953 export interface KubeadmConfig {
// 14954   pod_network_cidr: string;
// 14955   service_dns_domain: string;
// 14956 }
// 14957 // *CIDO - BÖLÜM - 2174 - KOPSConfig - KOPS - Küme Adı - Durum Deposu - Serde
// 14958 export interface KOPSConfig {
// 14959   cluster_name: string;
// 14960   state_store: string;
// 14961 }
// 14962 // *CIDO - BÖLÜM - 2175 - EKSConfig - EKS - Küme Adı - Bölge - Serde
// 14963 export interface EKSConfig {
// 14964   cluster_name: string;
// 14965   region: string;
// 14966   node_groups: EKSNodeGroup[];
// 14967 }
// 14968 // *CIDO - BÖLÜM - 2176 - EKSNodeGroup - Düğüm Grubu - Örnek Türü - Boyut - Serde
// 14969 export interface EKSNodeGroup {
// 14970   instance_type: string;
// 14971   desired_size: number;
// 14972   min_size: number;
// 14973   max_size: number;
// 14974 }
// 14975 // *CIDO - BÖLÜM - 2177 - AKSConfig - AKS - Kaynak Grubu - Düğüm Havuzları - Serde
// 14976 export interface AKSConfig {
// 14977   resource_group: string;
// 14978   node_pools: AKSNodePool[];
// 14979 }
// 14980 // *CIDO - BÖLÜM - 2178 - AKSNodePool - Düğüm Havuzu - VM Boyutu - Düğümler - Serde
// 14981 export interface AKSNodePool {
// 14982   vm_size: string;
// 14983   node_count: number;
// 14984 }
// 14985 // *CIDO - BÖLÜM - 2179 - GKEConfig - GKE - Proje - Bölge - Serde
// 14986 export interface GKEConfig {
// 14987   project: string;
// 14988   zone: string;
// 14989   node_pools: GKENodePool[];
// 14990 }
// 14991 // *CIDO - BÖLÜM - 2180 - GKENodePool - Düğüm Havuzu - Makine Türü - Düğümler - Serde
// 14992 export interface GKENodePool {
// 14993   machine_type: string;
// 14994   node_count: number;
// 14995 }
// 14996 // *CIDO - BÖLÜM - 2181 - OpenShiftConfig - OpenShift - Sürüm - Platform - Serde
// 14997 export interface OpenShiftConfig {
// 14998   version: string;
// 14999   platform: string;
// 15000 }
// 15001 // *CIDO - BÖLÜM - 2182 - RancherConfig - Rancher - Sunucu URL - Küme - Serde
// 15002 export interface RancherConfig {
// 15003   server_url: string;
// 15004   cluster_name: string;
// 15005 }
// 15006 // *CIDO - BÖLÜM - 2183 - TanzuConfig - Tanzu - Yönetim Kümesi - İş Yükü - Serde
// 15007 export interface TanzuConfig {
// 15008   management_cluster: string;
// 15009   workload_cluster: string;
// 15010 }
// 15011 // *CIDO - BÖLÜM - 2184 - AnthosConfig - Anthos - Üyelik - Filo - Serde
// 15012 export interface AnthosConfig {
// 15013   membership: string;
// 15014   fleet: string;
// 15015 }
// 15016 // *CIDO - BÖLÜM - 2185 - CloudFoundryConfig - Cloud Foundry - API - Organizasyon - Serde
// 15017 export interface CloudFoundryConfig {
// 15018   api_endpoint: string;
// 15019   organization: string;
// 15020   space: string;
// 15021 }
// 15022 // *CIDO - BÖLÜM - 2186 - HerokuConfig - Heroku - Uygulama - Bölge - Serde
// 15023 export interface HerokuConfig {
// 15024   app_name: string;
// 15025   region: string;
// 15026   stack: string;
// 15027 }
// 15028 // *CIDO - BÖLÜM - 2187 - FlyIOConfig - Fly.io - Uygulama - Bölge - Serde
// 15029 export interface FlyIOConfig {
// 15030   app_name: string;
// 15031   region: string;
// 15032 }
// 15033 // *CIDO - BÖLÜM - 2188 - RenderConfig - Render - Hizmet Adı - Tür - Serde
// 15034 export interface RenderConfig {
// 15035   service_name: string;
// 15036   type: string;
// 15037 }
// 15038 // *CIDO - BÖLÜM - 2189 - RailwayConfig - Railway - Proje - Ortam - Serde
// 15039 export interface RailwayConfig {
// 15040   project: string;
// 15041   environment: string;
// 15042 }
// 15043 // *CIDO - BÖLÜM - 2190 - VercelConfig - Vercel - Proje - Çerçeve - Serde
// 15044 export interface VercelConfig {
// 15045   project_name: string;
// 15046   framework: string;
// 15047 }
// 15048 // *CIDO - BÖLÜM - 2191 - NetlifyConfig - Netlify - Site Adı - Yapı Komutu - Serde
// 15049 export interface NetlifyConfig {
// 15050   site_name: string;
// 15051   build_command: string;
// 15052   publish_directory: string;
// 15053 }
// 15054 // *CIDO - BÖLÜM - 2192 - CloudflarePagesConfig - Cloudflare Pages - Proje - Dal - Serde
// 15055 export interface CloudflarePagesConfig {
// 15056   project_name: string;
// 15057   production_branch: string;
// 15058 }
// 15059 // *CIDO - BÖLÜM - 2193 - AWSConfig - AWS - Bölge - Profil - Serde
// 15060 export interface AWSConfig {
// 15061   region: string;
// 15062   profile: string;
// 15063 }
// 15064 // *CIDO - BÖLÜM - 2194 - AzureConfig - Azure - Abonelik - Kiracı - Serde
// 15065 export interface AzureConfig {
// 15066   subscription_id: string;
// 15067   tenant_id: string;
// 15068 }
// 15069 // *CIDO - BÖLÜM - 2195 - GCPConfig - GCP - Proje - Bölge - Serde
// 15070 export interface GCPConfig {
// 15071   project_id: string;
// 15072   region: string;
// 15073 }
// 15074 // *CIDO - BÖLÜM - 2196 - DOConfig - DigitalOcean - Belirteç - Bölge - Serde
// 15075 export interface DOConfig {
// 15076   token_encrypted: string;
// 15077   region: string;
// 15078 }
// 15079 // *CIDO - BÖLÜM - 2197 - LinodeConfig - Linode - Belirteç - Bölge - Serde
// 15080 export interface LinodeConfig {
// 15081   token_encrypted: string;
// 15082   region: string;
// 15083 }
// 15084 // *CIDO - BÖLÜM - 2198 - VultrConfig - Vultr - API Anahtarı - Bölge - Serde
// 15085 export interface VultrConfig {
// 15086   api_key_encrypted: string;
// 15087   region: string;
// 15088 }
// 15089 // *CIDO - BÖLÜM - 2199 - AlibabaCloudConfig - Alibaba Cloud - Bölge - Erişim Anahtarı - Serde
// 15090 export interface AlibabaCloudConfig {
// 15091   region: string;
// 15092   access_key_encrypted: string;
// 15093 }
// 15094 // *CIDO - BÖLÜM - 2200 - TencentCloudConfig - Tencent Cloud - Bölge - Gizli Kimlik - Serde
// 15095 export interface TencentCloudConfig {
// 15096   region: string;
// 15097   secret_id_encrypted: string;
// 15098 }
// 15099 // *CIDO - BÖLÜM - 2201 - IBMCloudConfig - IBM Cloud - Bölge - API Anahtarı - Serde
// 15100 export interface IBMCloudConfig {
// 15101   region: string;
// 15102   api_key_encrypted: string;
// 15103 }
// 15104 // *CIDO - BÖLÜM - 2202 - OracleCloudConfig - Oracle Cloud - Bölge - Parmak İzi - Serde
// 15105 export interface OracleCloudConfig {
// 15106   region: string;
// 15107   fingerprint: string;
// 15108 }
// 15109 // *CIDO - BÖLÜM - 2203 - OpenStackConfig - OpenStack - Kimlik Doğrulama URL - Kiracı - Serde
// 15110 export interface OpenStackConfig {
// 15111   auth_url: string;
// 15112   tenant_name: string;
// 15113 }
// 15114 // *CIDO - BÖLÜM - 2204 - VMwareConfig - VMware - vCenter - Veri Merkezi - Serde
// 15115 export interface VMwareConfig {
// 15116   vcenter: string;
// 15117   datacenter: string;
// 15118 }
// 15119 // *CIDO - BÖLÜM - 2205 - NutanixConfig - Nutanix - Prizma - Küme - Serde
// 15120 export interface NutanixConfig {
// 15121   prism_central: string;
// 15122   cluster_name: string;
// 15123 }
// 15124 // *CIDO - BÖLÜM - 2206 - ProxmoxConfig - Proxmox - Düğüm - Depolama - Serde
// 15125 export interface ProxmoxConfig {
// 15126   node: string;
// 15127   storage: string;
// 15128 }
// 15129 // *CIDO - BÖLÜM - 2207 - HyperVConfig - Hyper-V - Sunucu - Sanal Anahtar - Serde
// 15130 export interface HyperVConfig {
// 15131   server: string;
// 15132   virtual_switch: string;
// 15133 }
// 15134 // *CIDO - BÖLÜM - 2208 - XCPNGConfig - XCP-ng - Havuz - Depolama - Serde
// 15135 export interface XCPNGConfig {
// 15136   pool: string;
// 15137   storage_repository: string;
// 15138 }
// 15139 // *CIDO - BÖLÜM - 2209 - KVMConfig - KVM - Libvirt URI - Ağ - Serde
// 15140 export interface KVMConfig {
// 15141   libvirt_uri: string;
// 15142   network: string;
// 15143 }
// 15144 // *CIDO - BÖLÜM - 2210 - LXDConfig - LXD - Uzak - Konteyner - Serde
// 15145 export interface LXDConfig {
// 15146   remote: string;
// 15147   container_name: string;
// 15148 }
// 15149 // *CIDO - BÖLÜM - 2211 - IncusConfig - Incus - Sunucu - Örnek - Serde
// 15150 export interface IncusConfig {
// 15151   server: string;
// 15152   instance_name: string;
// 15153 }
// 15154 // *CIDO - BÖLÜM - 2212 - PodmanConfig - Podman - Makine - Görüntü - Serde
// 15155 export interface PodmanConfig {
// 15156   machine: string;
// 15157   image: string;
// 15158 }
// 15159 // *CIDO - BÖLÜM - 2213 - ContainerdConfig - containerd - Yuva - Çalışma Zamanı - Serde
// 15160 export interface ContainerdConfig {
// 15161   socket: string;
// 15162   runtime: string;
// 15163 }
// 15164 // *CIDO - BÖLÜM - 2214 - CRI_OConfig - CRI-O - Yuva - Depolama - Serde
// 15165 export interface CRI_OConfig {
// 15166   socket: string;
// 15167   storage_driver: string;
// 15168 }
// 15169 // *CIDO - BÖLÜM - 2215 - FirecrackerConfig - Firecracker - Soket - Çekirdek - Serde
// 15170 export interface FirecrackerConfig {
// 15171   socket_path: string;
// 15172   kernel_path: string;
// 15173 }
// 15174 // *CIDO - BÖLÜM - 2216 - KataContainersConfig - Kata - Hypervisor - Ajan - Serde
// 15175 export interface KataContainersConfig {
// 15176   hypervisor: string;
// 15177   agent: string;
// 15178 }
// 15179 // *CIDO - BÖLÜM - 2217 - GVisorConfig - gVisor - Platform - Ağ - Serde
// 15180 export interface GVisorConfig {
// 15181   platform: string;
// 15182   network: string;
// 15183 }
// 15184 // *CIDO - BÖLÜM - 2218 - UnikernelConfig - Unikernel - Dil - Hedef - Serde
// 15185 export interface UnikernelConfig {
// 15186   language: string;
// 15187   target: string;
// 15188 }
// 15189 // *CIDO - BÖLÜM - 2219 - WASMEdgeConfig - WASM Edge - Çalışma Zamanı - AOT - Serde
// 15190 export interface WASMEdgeConfig {
// 15191   runtime_path: string;
// 15192   aot_compiled: boolean;
// 15193 }
// 15194 // *CIDO - BÖLÜM - 2220 - WasmtimeConfig - Wasmtime - Motor - Önbellek - Serde
// 15195 export interface WasmtimeConfig {
// 15196   engine_config: string;
// 15197   cache_enabled: boolean;
// 15198 }
// 15199 // *CIDO - BÖLÜM - 2221 - EK - Test Helper Kullanıcı - Mock User Oluşturucu - Test Kolaylığı - Serde
// 15200 export function createMockUser(overrides?: Partial<User>): User {
// 15201   return { id: 'test-user-id', tenant_id: 'test-tenant-id', email: 'test@example.com', name: 'Test User', role: UserRole.Viewer, created_at: Date.now(), updated_at: Date.now(), is_active: true, ...overrides };
// 15202 }
// 15203 // *CIDO - BÖLÜM - 2222 - EK - Test Helper Session - Mock Oturum Oluşturucu - Test Kolaylığı - Serde
// 15204 export function createMockSession(overrides?: Partial<Session>): Session {
// 15205   return { id: 'test-session-id', user_id: 'test-user-id', tenant_id: 'test-tenant-id', token: 'test-jwt-token', expires_at: Date.now() + 3600, created_at: Date.now(), is_active: true, ...overrides };
// 15206 }
// 15207 // *CIDO - BÖLÜM - 2223 - EK - Test Helper JWT - Mock JWT Payload Oluşturucu - Test Kolaylığı - Serde
// 15208 export function createMockJWTPayload(overrides?: Partial<JWTPayload>): JWTPayload {
// 15209   return { sub: 'test-user-id', tenant_id: 'test-tenant-id', role: UserRole.Viewer, exp: Date.now() + 3600, iat: Date.now(), ...overrides };
// 15210 }
// 15211 // *CIDO - BÖLÜM - 2224 - EK - Type Guard Kullanıcı - User Tipi Doğrulama - Runtime Kontrol - Serde
// 15212 export function isUser(value: unknown): value is User {
// 15213   if (typeof value !== 'object' || value === null) return false;
// 15214   const u = value as Record<string, unknown>;
// 15215   return typeof u.id === 'string' && typeof u.tenant_id === 'string' && typeof u.email === 'string' && String(u.email).includes('@');
// 15216 }
// 15217 // *CIDO - BÖLÜM - 2225 - EK - Type Guard Session - Session Tipi Doğrulama - Runtime Kontrol - Serde
// 15218 export function isSession(value: unknown): value is Session {
// 15219   if (typeof value !== 'object' || value === null) return false;
// 15220   const s = value as Record<string, unknown>;
// 15221   return typeof s.id === 'string' && typeof s.user_id === 'string' && typeof s.tenant_id === 'string' && typeof s.token === 'string' && typeof s.is_active === 'boolean';
// 15222 }
// 15223 // *CIDO - BÖLÜM - 2226 - EK - Type Guard JWT - JWTPayload Doğrulama - Runtime Kontrol - Serde
// 15224 export function isJWTPayload(value: unknown): value is JWTPayload {
// 15225   if (typeof value !== 'object' || value === null) return false;
// 15226   const p = value as Record<string, unknown>;
// 15227   return typeof p.sub === 'string' && typeof p.tenant_id === 'string' && typeof p.role === 'string' && typeof p.exp === 'number' && typeof p.iat === 'number';
// 15228 }
// 15229 // *CIDO - BÖLÜM - 2227 - EK - Auth Doğrulama - validateAuthResponse Yardımcı - Yanıt Kontrolü - Serde
// 15230 export function isValidAuthResponse(value: unknown): value is AuthResponse {
// 15231   if (typeof value !== 'object' || value === null) return false;
// 15232   const r = value as Record<string, unknown>;
// 15233   return typeof r.access_token === 'string' && typeof r.refresh_token === 'string' && typeof r.expires_in === 'number' && typeof r.user === 'object';
// 15234 }
// 15235 // *CIDO - BÖLÜM - 2228 - EK - Index Re-export - Tüm Auth Tipleri Dışa Aktarım - Modül Birleştirme - Serde
// 15236 export type { User, Session, JWTPayload, AuthResponse, LoginRequest, RegisterRequest, ApiKey, ApiKeyRequest, ApiKeyResponse, TokenValidationResult, RefreshToken, MagicLink, TwoFactorSetup, TwoFactorVerify, SocialLoginRequest, JWTConfig, PasswordResetRequest, PasswordResetConfirm, AuthError, AuthGuardContext };
// 15237 // *CIDO - BÖLÜM - 2229 - EK - Index Re-export - Store ve Strateji Dışa Aktarım - Modül Birleştirme - Serde
// 15238 export type { SessionStore, ApiKeyStore, UserStore, AuthStrategy, AuthMiddleware };
// 15239 // *CIDO - BÖLÜM - 2230 - EK - Index Re-export - Enum Dışa Aktarım - Rol İzin Sabitleri - Modül Birleştirme - Serde
// 15240 export { UserRole, Permission, DefaultRolePermissions, isValidUserRole, isValidPermission };
// 15241 // *CIDO - BÖLÜM - 2231 - EK - Index Re-export - Validasyon Sabitleri Dışa Aktarım - Doğrulama Kuralları - Modül Birleştirme - Serde
// 15242 export { UserConstraints, SessionConstraints, JWTPayloadConstraints, ApiKeyConstraints, LoginRequestConstraints, RegisterRequestConstraints, AuthResponseConstraints, RefreshTokenConstraints, PasswordResetConstraints, SocialLoginConstraints, JWTConfigConstraints, TwoFactorConstraints, EncryptedDataConstraints };
// 15243 // *CIDO - BÖLÜM - 2232 - EK - Index Re-export - Yardımcı Fonksiyonlar - Tip Doğrulayıcı Mock - Modül Birleştirme - Serde
// 15244 export { createMockUser, createMockSession, createMockJWTPayload, isUser as isAuthUser, isSession as isAuthSession, isJWTPayload as isAuthJWTPayload, isValidAuthResponse };
// 15245 // *CIDO - BÖLÜM - 2233 - EK - AuthConfig Sabiti - Kimlik Doğrulama Sabitleri - Merkezi Yapılandırma - Serde
// 15246 export const AUTH_CONFIG = {
// 15247   ACCESS_TOKEN_EXPIRY_SECONDS: 3600,
// 15248   REFRESH_TOKEN_EXPIRY_SECONDS: 2592000,
// 15249   PASSWORD_MIN_LENGTH: 8,
// 15250   PASSWORD_MAX_LENGTH: 128,
// 15251   EMAIL_MAX_LENGTH: 255,
// 15252   NAME_MIN_LENGTH: 2,
// 15253   NAME_MAX_LENGTH: 100,
// 15254   API_KEY_MIN_LENGTH: 16,
// 15255   API_KEY_MAX_LENGTH: 512,
// 15256   SESSION_TTL_SECONDS: 86400,
// 15257   MAX_LOGIN_ATTEMPTS: 5,
// 15258   LOCKOUT_DURATION_SECONDS: 900,
// 15259   TWO_FACTOR_CODE_LENGTH: 6,
// 15260   MAGIC_LINK_EXPIRY_SECONDS: 900,
// 15261   PASSWORD_RESET_EXPIRY_SECONDS: 3600,
// 15262 } as const;
// 15263 // *CIDO - BÖLÜM - 2234 - EK - Auth Hata Kodları - Kimlik Doğrulama Hata Sabitleri - Merkezi Hata Yönetimi - Serde
// 15264 export const AUTH_ERROR_CODES = {
// 15265   INVALID_CREDENTIALS: 'AUTH_001',
// 15266   ACCOUNT_LOCKED: 'AUTH_002',
// 15267   TOKEN_EXPIRED: 'AUTH_003',
// 15268   TOKEN_INVALID: 'AUTH_004',
// 15269   INSUFFICIENT_PERMISSIONS: 'AUTH_005',
// 15270   SESSION_EXPIRED: 'AUTH_006',
// 15271   TWO_FACTOR_REQUIRED: 'AUTH_007',
// 15272   TWO_FACTOR_INVALID: 'AUTH_008',
// 15273   API_KEY_INVALID: 'AUTH_009',
// 15274   API_KEY_EXPIRED: 'AUTH_010',
// 15275   PASSWORD_TOO_WEAK: 'AUTH_011',
// 15276   EMAIL_ALREADY_EXISTS: 'AUTH_012',
// 15277   TENANT_NOT_FOUND: 'AUTH_013',
// 15278   RATE_LIMITED: 'AUTH_014',
// 15279   SOCIAL_LOGIN_FAILED: 'AUTH_015',
// 15280 } as const;
// 15281 // *CIDO: Bu dosya tamamdır. Hayırlı olsun.
```