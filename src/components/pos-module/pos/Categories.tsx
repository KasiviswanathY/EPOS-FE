/* eslint-disable @next/next/no-img-element */

import { RootState } from "@/lib/redux/store";
import Link from "next/link";
import { useSelector } from "react-redux";

const CategorySidebar = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  const {
    categories,
    loading: catLoading,
    error: catError,
  } = useSelector(
    (state: RootState) =>
      state.categories || { categories: [], loading: false, error: null }
  );
  return (
    <div className="tab-wrap">
      <ul className="tabs owl-carousel pos-category5">
        <li
          id="all"
          onClick={() => setActiveTab("all")}
          className={activeTab === "all" ? "active" : ""}
        >
          <Link href="#">
            <img src="assets/img/categories/category-01.svg" alt="Categories" />
          </Link>
          <h6>
            <Link href="#">All</Link>
          </h6>
        </li>
        {catLoading ? (
          <li>
            <span>Loading categories...</span>
          </li>
        ) : catError ? (
          <li>
            <span className="text-danger">Error loading categories</span>
          </li>
        ) : (
          categories.map((cat) => (
            <li
              key={cat.id}
              id={cat.name.toLowerCase()}
              onClick={() => setActiveTab(cat.name.toLowerCase())}
              className={activeTab === cat.name.toLowerCase() ? "active" : ""}
            >
              <Link href="#">
                <img
                  src="assets/img/categories/category-01.svg"
                  alt={cat.name}
                />
              </Link>
              <h6>
                <Link href="#">{cat.name}</Link>
              </h6>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CategorySidebar;
