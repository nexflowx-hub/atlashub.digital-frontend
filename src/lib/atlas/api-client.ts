export interface AtlasTenantSummary {
  id: string;
  name: string;
  slug: string;
  product: string;
  status: string;
  plan: string;
  role: string;
  capabilities: string[];
}

export interface AtlasMe {
  success: boolean;
  onboardingRequired: boolean;
  user: {
    id: string;
    email: string | null;
    name: string;
  };
  tenant: AtlasTenantSummary | null;
  tenants: AtlasTenantSummary[];
}

export interface AtlasSmmService {
  id: string;
  platform: string;
  category: string;
  serviceType: string;
  name: string;
  description: string | null;
  minQuantity: number | null;
  maxQuantity: number | null;
  refillSupported: boolean;
  cancelSupported: boolean;
  metadata: Record<string, unknown>;
}

export interface AtlasSmmOffer {
  id: string;
  publicName: string;
  description: string | null;
  salePrice: string;
  currency: string;
  pricingModel: "fixed" | "per_unit_size";
  unitSize: number;
  active: boolean;
  sortOrder: number;
  service: AtlasSmmService;
}

export interface AtlasSmmOrder {
  id: string;
  target: string;
  quantity: number;
  amount: string;
  currency: string;
  status: string;
  providerStatus: string | null;
  createdAt: string;
  offer?: {
    publicName: string;
  } | null;
  service: {
    platform: string;
    category: string;
    serviceType: string;
    name: string;
  };
}

const BASE_URL =
  process.env.NEXT_PUBLIC_ATLAS_API_URL?.replace(/\/$/, "") ??
  "https://api.atendimento.center/api/v1";

export async function atlasApi<T>(
  path: string,
  accessToken: string,
  options: RequestInit & { tenantSlug?: string } = {},
): Promise<T> {
  const { tenantSlug, headers, ...request } = options;

  const response = await fetch(`${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`, {
    ...request,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...(tenantSlug ? { "x-tenant-slug": tenantSlug } : {}),
      ...headers,
    },
  });

  const text = await response.text();
  let payload: unknown = null;

  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = { message: text };
    }
  }

  if (!response.ok) {
    const message =
      payload && typeof payload === "object" && "message" in payload
        ? String((payload as { message?: unknown }).message ?? "Request failed")
        : `Request failed (${response.status})`;
    throw new Error(message);
  }

  return payload as T;
}
