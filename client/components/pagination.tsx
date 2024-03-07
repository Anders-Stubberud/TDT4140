import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  number: number;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const PaginationDemo: React.FC<PaginationProps> = ({ number, index, setIndex }) => {
  const paginationItems = [];

  // Loop to create pagination items
  for (let i = 0; i < number; i++) {
    paginationItems.push(
      <PaginationItem key={i} >
        <PaginationLink href="#" onClick={() => setIndex(i)} isActive={index == i}>
          {i}
        </PaginationLink>
      </PaginationItem>
    );
  }

  // Function to handle "Next" button click
  const handleNextClick = () => {
    if (index + 1 < number) {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Function to handle "Previous" button click
  const handlePreviousClick = () => {
    if (index > 0) {
      setIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={handlePreviousClick} />
        </PaginationItem>
        {paginationItems}
        <PaginationItem>
          <PaginationNext href="#" onClick={handleNextClick} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
