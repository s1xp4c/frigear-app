import {POST} from "@/app/api/webhooks/stripe/route";
import {describe, expect, it} from "vitest";
import {buildNextRequest, buildStripeEvent} from "@/tests/mock-data";

describe("/api/webhooks/stripe", () => {
  it("should handle a correct event", async () => {
    const body = buildStripeEvent("product.updated", {
      name: "NewTest",
    });

    const request = buildNextRequest({ body });

    const response = await POST(request);
    expect(response.status).toEqual(200);
  });

  it("should throw error on unknown events", async () => {
    const body = buildStripeEvent("some.unhandled.event", {
      name: "NewTest",
    });

    const request = buildNextRequest({ body });

    expect(POST(request)).to.rejects.toThrow(
      "Unhandled event: some.unhandled.event",
    );
  });
});
