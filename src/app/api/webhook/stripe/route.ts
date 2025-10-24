import { NextRequest } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/libs/stripe";
import { fetchServiceByPriceId } from "@/actions/actions";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();

  const sig = req.headers.get("stripe-signature")!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the event
  try {
    switch (event.type) {
      // create or update user subscription
      /* ------------------------- checkout.session.completed ------------------------- */
      case "checkout.session.completed":
        const session = await stripe.checkout.sessions.retrieve(
          (event.data.object as Stripe.Checkout.Session).id,
          {
            expand: ["line_items"],
          }
        );
        const customerId = session.customer as string;
        const customerDetails = session.customer_details;
        const subscriptionId = session.subscription as string;
        // get jwt via route params
        const userId = session?.client_reference_id;
        if (customerDetails?.email && userId) {
          const lineItems = session.line_items?.data || [];
          for (const item of lineItems) {
            const priceId = item.price?.id;
            const isSubscription = item.price?.type === "recurring";
            if (isSubscription) {
              // setup subscription period (monthly, yearly)
              const endDate = new Date();
              if (priceId === process.env.STRIPE_MONTHLY_PREMIUM_PRICE_ID!) {
                endDate.setMonth(endDate.getMonth() + 1); // 1 month from now
              } else if (
                priceId === process.env.STRIPE_MONTHLY_ULTIMATE_PRICE_ID!
              ) {
                endDate.setMonth(endDate.getMonth() + 1); // 1 month from now
              } else if (
                priceId === process.env.STRIPE_YEARLY_PREMIUM_PRICE_ID!
              ) {
                endDate.setFullYear(endDate.getFullYear() + 1); // 1 year from now
              } else if (
                priceId === process.env.STRIPE_YEARLY_ULTIMATE_PRICE_ID!
              ) {
                endDate.setFullYear(endDate.getFullYear() + 1); // 1 year from now
              } else {
                throw new Error("Invalid priceId");
              }
              // it is gonna create the sale if it does not exist already, but if it exists it will update it
              try {
                const response = await fetch(
                  `${process.env.BACKEND_URL}/api/sales?populate=*&filters[user][id][$eq]=${userId}`,
                  {
                    method: "GET",
                    headers: {
                      Authorization: `Bearer ${process.env.SUPER_USER_TOKEN}`,
                    },
                  }
                );
                const data = await response.json();
                const sale = data?.data?.length > 0 ? data?.data[0] : null;
                // get service by stripe_product_id => service id
                const service = await fetchServiceByPriceId(priceId);
                // if the chosen service can be found
                if (service) {
                  // if the user has got an existing subscription, update the db
                  if (sale) {
                    // --- If user has an existing subscription, cancel old one ---
                    if (
                      sale?.stripeSubscriptionId &&
                      sale.stripeSubscriptionId !== subscriptionId
                    ) {
                      // cancel at bill period end
                      try {
                        await stripe.subscriptions.update(
                          sale?.stripeSubscriptionId,
                          {
                            metadata: {
                              userId: String(userId), // store your own identifier
                            },
                            cancel_at_period_end: true,
                          }
                        );
                      } catch (error) {
                        console.error(
                          "Error canceling old subscription:",
                          error
                        );
                      }
                    }
                    const updatedService = {
                      service: { id: service?.id },
                      startDate: new Date(),
                      endDate: endDate,
                      stripeSubscriptionId: subscriptionId,
                      isActive: true,
                    };
                    // update database
                    try {
                      const response = await fetch(
                        `${process.env.BACKEND_URL}/api/sales/${sale.documentId}`,
                        {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${process.env.SUPER_USER_TOKEN}`,
                          },
                          body: JSON.stringify({
                            data: updatedService,
                          }),
                        }
                      );
                      const result = await response.json();
                      if (result) {
                        // update user access level
                        try {
                          await fetch(
                            `${process.env.BACKEND_URL}/api/users/${userId}`,
                            {
                              method: "PUT",
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${process.env.SUPER_USER_TOKEN}`,
                              },
                              body: JSON.stringify({
                                access: service?.access,
                              }),
                            }
                          );
                        } catch (error) {
                          console.error("Fetch error:", error);
                        }
                        return new Response(JSON.stringify(updatedService), {
                          headers: {
                            "Content-Type": "application/json",
                          },
                          status: 201,
                        });
                      }
                    } catch (error) {
                      console.error("Fetch error:", error);
                    }
                  } else {
                    // if the user has not got an existing sale
                    const savedService = {
                      service: { id: service?.id },
                      user: { id: userId },
                      startDate: new Date(),
                      endDate: endDate,
                      stripeCustomerId: customerId,
                      stripeSubscriptionId: subscriptionId,
                      email: customerDetails?.email,
                      isActive: true,
                    };

                    // post sales to database
                    try {
                      const response = await fetch(
                        `${process.env.BACKEND_URL}/api/sales`,
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${process.env.SUPER_USER_TOKEN}`,
                          },
                          body: JSON.stringify({
                            data: savedService,
                          }),
                        }
                      );
                      const result = await response.json();

                      if (result) {
                        // update user access level
                        try {
                          await fetch(
                            `${process.env.BACKEND_URL}/api/users/${userId}`,
                            {
                              method: "PUT",
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${process.env.SUPER_USER_TOKEN}`,
                              },
                              body: JSON.stringify({
                                access: service?.access,
                              }),
                            }
                          );
                        } catch (error) {
                          console.error("Fetch error:", error);
                        }

                        return new Response(JSON.stringify(savedService), {
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${process.env.SUPER_USER_TOKEN}`,
                          },
                          status: 201,
                        });
                      }
                    } catch (error) {
                      console.error("Fetch error:", error);
                    }
                  }
                } else {
                  console.error("Error: Service cannot be found!");
                }
              } catch (error) {
                console.error("Fetch error:", error);
              }
            } else {
              // one_time_purchase
              console.log("One time purchase is irrelevant");
              continue;
            }
          }
        }
        break;
      // reset user on successful recharge
      /* ------------------------- invoice.payment_succeeded ------------------------- */
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;

        // ✅ Safe cast for subscription
        const subscriptionId =
          typeof (invoice as any).subscription === "string"
            ? (invoice as any).subscription
            : null;

        if (!subscriptionId) {
          console.warn("No subscription id on invoice");
          break;
        }

        let sub: Stripe.Subscription | null = null;
        try {
          sub = await stripe.subscriptions.retrieve(subscriptionId);
        } catch (err) {
          console.error("Failed to retrieve subscription:", err);
          break;
        }

        // ✅ Safe access for current_period_end
        const currentPeriodEnd = (sub as any).current_period_end;
        if (!currentPeriodEnd) {
          console.warn(
            `No current_period_end found on subscription ${subscriptionId}`
          );
          break;
        }

        const newPeriodEnd = new Date(currentPeriodEnd * 1000);

        try {
          const saleResp = await fetch(
            `${process.env.BACKEND_URL}/api/sales?populate=*&filters[stripeSubscriptionId][$eq]=${subscriptionId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${process.env.SUPER_USER_TOKEN}`,
              },
            }
          );
          const saleData = await saleResp.json();
          const sale = saleData?.data?.[0];
          if (!sale) {
            console.warn(`No sale found for subscription ${subscriptionId}`);
            break;
          }

          await fetch(
            `${process.env.BACKEND_URL}/api/sales/${sale.documentId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.SUPER_USER_TOKEN}`,
              },
              body: JSON.stringify({
                data: {
                  endDate: newPeriodEnd,
                  isActive: true,
                },
              }),
            }
          );
        } catch (err) {
          console.error(
            "Error updating sale on invoice.payment_succeeded:",
            err
          );
        }
        break;
      }

      // cancel user subscription
      /* ------------------------- customer.subscription.deleted ------------------------- */
      case "customer.subscription.deleted":
        const subscription = event.data.object as Stripe.Subscription;
        const cancelledUserId = subscription.metadata?.userId; // ✅ set earlier when creating/canceling subscription

        try {
          if (cancelledUserId) {
            // 🔒 Fetch sale by userId instead of just customerId
            const response = await fetch(
              `${process.env.BACKEND_URL}/api/sales?populate=*&filters[user][id][$eq]=${cancelledUserId}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${process.env.SUPER_USER_TOKEN}`,
                },
              }
            );

            const data = await response.json();
            const sale = data?.data?.length > 0 ? data.data[0] : null;

            if (sale) {
              // ✅ Mark subscription as canceled in DB
              await fetch(
                `${process.env.BACKEND_URL}/api/sales/${sale.documentId}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.SUPER_USER_TOKEN}`,
                  },
                  body: JSON.stringify({
                    data: { isActive: false },
                  }),
                }
              );

              // ✅ Update user access level (e.g. downgrade to free)
              await fetch(
                `${process.env.BACKEND_URL}/api/users/${cancelledUserId}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.SUPER_USER_TOKEN}`,
                  },
                  body: JSON.stringify({
                    access: "free", // or whatever your default access level is
                  }),
                }
              );
            }
          } else {
            console.warn(
              // User change plan will also trigger this warning but it is ok
              `⚠️ Subscription ${subscription.id} canceled but no userId in metadata.`
            );
          }
        } catch (error) {
          console.error("Error updating canceled subscription:", error);
        }
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error("Error handling event", error);
    return new Response("Webhook Error", { status: 400 });
  }

  return new Response("Webhook received", { status: 200 });
}
