import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons/lib";
import queryString from "query-string";

type Props = {
  label: string;
  description: string;
  icon: IconType;
  selected?: boolean;
};

const CategoryBox = ({ description, icon: Icon, label, selected }: Props) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer",
        selected
          ? "border-b-neutral-800 text-neutral-800"
          : "border-transparent text-neutral-500"
      )}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
