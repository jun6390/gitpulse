import LanguageView from "@/features/language/LanguageView";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={null}>
      <LanguageView />
    </Suspense>
  );
};

export default Page;
