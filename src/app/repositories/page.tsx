import RepositoriesView from "@/features/repositories/RepositoriesView";
import { Suspense } from "react";

const RepositoriesPage = () => {
  return (
    <Suspense fallback={null}>
      <RepositoriesView />
    </Suspense>
  );
};

export default RepositoriesPage;
