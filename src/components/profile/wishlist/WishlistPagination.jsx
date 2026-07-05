import { Button } from "@/components/ui/button";

export default function WishlistPagination({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}) {
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={onPrev}
      >
        Prev
      </Button>

      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={onNext}
      >
        Next
      </Button>
    </div>
  );
}