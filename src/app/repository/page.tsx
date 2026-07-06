import RepositoriesView from "@/features/repository/RepositoriesView";
import { Suspense } from "react";

const RepositoriesPage = () => {
  return (
    <Suspense fallback={null}>
      <RepositoriesView />
    </Suspense>
  );
};

export default RepositoriesPage;
