"use client";

import React from "react";
import Container from "../container";

import CategoryBox from "../category-box";
import { categories } from "@/constants";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {};

const Categories = (props: Props) => {
  const params = useSearchParams();
  const pathname = usePathname();

  const isMainPage = pathname === `/`;

  if (!isMainPage) {
    return null;
  }
  const category = params.get("category");

  return (
    <Container>
      <div className="grid grid-flow-col grid-rows-3 pt-4 md:grid-rows-2 xl:grid-rows-1">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            description={item.description}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
