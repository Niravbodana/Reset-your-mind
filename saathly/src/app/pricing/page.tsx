import { redirect } from "next/navigation";

/** Single pricing surface lives on homepage #pricing */
export default function PricingPage() {
  redirect("/#pricing");
}
