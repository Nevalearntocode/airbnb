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
      <div className="pt-4 grid grid-flow-col xl:grid-rows-1 md:grid-rows-2 grid-rows-3">
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
