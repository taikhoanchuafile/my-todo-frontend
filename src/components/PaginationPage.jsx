import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
const PaginationPage = ({ page, setPage, pages }) => {
  return (
    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
      <Pagination>
        <PaginationContent>
          {/* prev */}
          <PaginationItem>
            <PaginationPrevious
              className={`cursor-pointer ${
                page < 2 && "pointer-events-none opacity-50"
              }`}
              onClick={() => {
                setPage((prev) => prev - 1);
              }}
            />
          </PaginationItem>

          {pages.map((p, index) => {
            return p === "..." ? (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={index}>
                <PaginationLink
                  className="cursor-pointer"
                  onClick={() => {
                    setPage(p);
                  }}
                  isActive={p === page}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              className={`cursor-pointer ${
                page === pages.length && "pointer-events-none opacity-50"
              }`}
              onClick={() => {
                setPage((prev) => prev + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationPage;
