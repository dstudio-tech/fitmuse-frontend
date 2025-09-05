import { PostItemProps } from "@/data/props";
import _ from "lodash";

export const paginate = (
  items: PostItemProps[],
  pageNumber: number,
  pageSize: number
) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
};

export const handleCloseMobileMenu = () => {
  const body: HTMLElement = document.querySelector("body")!;
  body.classList.remove("mobile-nav-active");
};

export const handleScrollTo = (section: string) => {
  const targetEl: HTMLElement = document.querySelector("#" + section)!;
  const elementPosition = targetEl.offsetTop - 100;
  window.scrollTo({
    top: elementPosition,
    behavior: "smooth",
  });
};
