export interface PublicSmmOffer {
  id: string;
  publicName: string;
  description: string | null;
  salePrice: string;
  currency: string;
  pricingModel: "fixed" | "per_unit_size" | string;
  unitSize: number;
  sortOrder: number;
  service: {
    platform: string;
    category: string;
    serviceType: string;
    minQuantity: number | null;
    maxQuantity: number | null;
    refillSupported: boolean;
    cancelSupported: boolean;
  };
}

export interface PublicSmmCatalog {
  success: boolean;
  storefront: {
    tenant: string;
    name: string;
  };
  offers: PublicSmmOffer[];
}

const DEFAULT_API_URL = "https://api.atendimento.center/api/v1";

export async function getPublicSmmCatalog(
  tenantSlug = "atlashub",
): Promise<PublicSmmCatalog | null> {
  const baseUrl = (
    process.env.ATLAS_PLATFORM_API_URL ??
    process.env.ATENDIMENTO_AGENT_BASE_URL ??
    DEFAULT_API_URL
  ).replace(/\/$/, "");

  try {
    const response = await fetch(
      `${baseUrl}/public/smm/${encodeURIComponent(tenantSlug)}/offers`,
      {
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) return null;

    const data = (await response.json()) as PublicSmmCatalog;
    if (!data?.success || !Array.isArray(data.offers)) return null;

    return data;
  } catch {
    return null;
  }
}

export function formatSmmPrice(offer: PublicSmmOffer): string {
  const amount = Number(offer.salePrice);
  if (!Number.isFinite(amount)) return `${offer.currency} ${offer.salePrice}`;

  const locale = offer.currency === "BRL" ? "pt-BR" : "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: offer.currency,
    maximumFractionDigits: 2,
  }).format(amount);
}
