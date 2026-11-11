import { Suspense } from "react";
import ExploreStudios from "@/components/ExploreStudios";
import PageSpinner from "@/components/PageSpinner";

export const metadata = { title: "Explore Studios" };

export default function StudiosPage() {
  return (
    <Suspense fallback={<PageSpinner label="Loading studios" />}>
      <ExploreStudios />
    </Suspense>
  );
}
