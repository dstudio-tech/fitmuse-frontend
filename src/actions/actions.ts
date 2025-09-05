"use server";
import { cookies } from "next/headers";

// GET jwt
export const getJwt = async () => {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;
  return jwt;
};

// GET Single Model Data
export const getModelItemDetailsData = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/authors/${id}?populate=*`
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const getPostItemsByModel = async (
  id: string,
  access: string = "free"
) => {
  if (access === "ultimate") {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/articles?populate=*&filters[model][documentId][$eq]=${id}`
      );
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Fetch error:", error);
    }
  } else if (access === "premium") {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/articles?populate=*&filters[access][$ne]=ultimate&filters[model][documentId][$eq]=${id}`
      );
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Fetch error:", error);
    }
  } else {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/articles?populate=*&filters[access][$eq]=free&filters[model][documentId][$eq]=${id}`
      );
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }
};

export const fetchCallToActionSectionData = async () => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/call-to-action-section?populate=*`
    );
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const fetchPageData = async (page: string) => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/${page}?populate=*`
    );
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const fetchPageTitleData = async (page: string) => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/${page}?populate[pageTitle][populate][0]=prevPage&populate[pageTitle][populate][1]=currentPage`
    );
    const data = await response.json();
    return data?.data?.pageTitle;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const fetchPricingData = async () => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/pricing-page?populate[pricingCards][populate][0]=pricingItem&populate[pricingCards][populate][1]=monthlyPaymentLink&populate[pricingCards][populate][2]=yearlyPaymentLink&populate[pricingCards][populate][3]=videoLink`
    );
    const data = await response.json();
    return data?.data?.pricingCards;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const fetchFaqData = async () => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/faqs?populate=*`
    );
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const fetchStatsSectionData = async () => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/pricing-stats-section?populate=*`
    );
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const fetchServiceByPriceId = async (priceId: string) => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/services?filters[stripePriceId][$eq]=${priceId}`
    );
    const data = await response.json();
    return data.data.length > 0 ? data?.data[0] : null;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const fetchSocialsData = async () => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/socials?populate=*`
    );
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const fetchFooterData = async () => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/footer-section?populate[0]=socials.sci&populate[1]=footerLinks.links&populate[2]=copyright&populate[3]=logo`
    );
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const updateModelViews = async (modelId: string, views: number) => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/authors/${modelId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SUPER_USER_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            views,
          },
        }),
      }
    );
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
