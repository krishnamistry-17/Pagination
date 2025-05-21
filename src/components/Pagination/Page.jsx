import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";

const Page = ({ totalPages = 10, currentPage, setCurrentPage }) => {
  const getPaginationRange = () => {
    //take a range
    const range = [];
    //push 1 in range
    range.push(1);
    //addd ... after range
    if (currentPage > 3) {
      range.push("...");
    }
    //give start & end point
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    //push i range wise
    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    if (currentPage < totalPages - 2) {
      range.push("...");
    }
    //push total pages
    range.push(totalPages);

    return range;
  };

  const paginationRange = getPaginationRange();

  const paginate = (pageNumber, e) => {
    e.preventDefault();
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 490); // Scroll to top
    }
  };

  // Go to the previous page
  const goToPreviousPage = (e) => {
    e.preventDefault();
    if (currentPage === 1) {
      setCurrentPage(totalPages); // Loop to the last page
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  // Go to the next page
  const goToNextPage = (e) => {
    e.preventDefault();
    if (currentPage === totalPages) {
      setCurrentPage(1); // Loop to the first page
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div
      className="flex flex-col lg:flex-row justify-center 
    items-center gap-4 mt-[16px] mb-[25px]"
    >
      {/* Previous Button */}
      <button
        className="flex items-center justify-center 
          md:w-[108px] md:h-[40px] sm:text-[20px] xs:text-[16px]
          sm:w-[120px] sm:h-[40px]
          xs:w-[94px] xs:h-[40px]
          md:rounded-l-lg sm:rounded-l-lg 
          transition-all
          bg-cream-bglight text-black-darkest"
        onClick={goToPreviousPage}
      >
        <MdArrowBackIos className="pl-[4px]" />
        Previous
      </button>

      <div className="md:flex sm:gap-4 xs:gap-2">
        {paginationRange.map((number, index) =>
          typeof number === "number" ? (
            <button
              key={index}
              className={`
        md:w-[60px] md:h-[40px] 
        sm:w-[50px] sm:h-[30px] 
        xs:w-[40px] xs:h-[30px]
        md:px-[16px] md:py-[8px]
        sm:px-[10px] sm:py-[4px]
        xs:px-[15px]
        md:text-lg sm:text-sm 
        md:rounded-lg sm:rounded-lg xs:rounded-md
        transition-all font-semibold 
        ${
          currentPage === number
            ? "bg-yellow-600 text-white sm:ml-[0px] xs:ml-[5px]"
            : "bg-cream-bglight text-black-darkest border border-gray-300 hover:bg-yellow-700 sm:ml-[0px] xs:ml-[5px]"
        }
      `}
              onClick={(e) => paginate(number, e)}
            >
              {number}
            </button>
          ) : (
            <span
              key={index}
              className={`
        flex items-center justify-center 
        md:w-[60px] md:h-[40px] 
        sm:w-[50px] sm:h-[30px] 
        xs:w-[40px] xs:h-[30px]
        md:px-[16px] md:py-[8px]
        sm:px-[10px] sm:py-[4px]
        md:text-lg sm:text-sm 
        text-gray-400 font-semibold
      `}
            >
              ...
            </span>
          )
        )}
      </div>

      {/* Next Button */}
      <button
        className="flex items-center justify-center 
         md:w-[108px] md:h-[40px] sm:text-[20px] xs:text-[16px]
          sm:w-[120px] sm:h-[40px]
          xs:w-[94px] xs:h-[40px] bg-cream-bglight text-black-darkest 
          md:rounded-r-lg  
          transition-all"
        onClick={goToNextPage}
      >
        Next
        <MdArrowForwardIos className="pl-[2px]" />
      </button>
    </div>
  );
};

export default Page;
