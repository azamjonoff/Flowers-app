import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { limit } from "../lib/my-utils";

export default function MyPagination({ setSkip, total, pageCount, skip }) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault();
              setSkip((prev) => {
                if (prev > 0) {
                  return (prev -= limit);
                } else return 0;
              });
            }}
            href="#"
          />
        </PaginationItem>
        {Array.from({ length: pageCount }, (_, index) => index + 1).map(
          (item) => {
            return (
              <PaginationItem key={item}>
                <PaginationLink
                  isActive={skip / limit + 1 === item ? true : false}
                  href={`#${item}`}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            );
          }
        )}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault();
              setSkip((prev) => {
                if (prev + limit >= total) {
                  return prev;
                } else return (prev += limit);
              });
            }}
            href="#"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
