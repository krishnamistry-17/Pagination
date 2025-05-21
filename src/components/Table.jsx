import React, { useEffect, useState } from "react";
import Page from "./Pagination/Page";
import { MdDownloadDone } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import CsvDownloader from "react-csv-downloader";

const Table = () => {
  const [posts, setPost] = useState([]);
  const [error, setError] = useState(true);
  const [isLoading, setIsLoading] = useState(null);
  const [input, setInput] = useState("");
  const [isdownloadComplete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/posts";
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network error");
        }
        return response.json();
      })
      .then((data) => {
        setPost(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading</div>;
  }

  const searchResult = currentPosts.filter((item) =>
    item.title.toLowerCase().includes(input.toLocaleLowerCase())
  );
  console.log("searchResult :", searchResult);

  return (
    <>
      <div>
        <div className=" container mx-auto sm:p-[16px] xs:p-[4px]">
          <div className="flex justify-center items-center mb-[16px] mt-[10px]">
            <div className="flex justify-between items-center w-full max-w-md">
              <input
                type="text"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                placeholder="Search Title"
                className="border-black-dark border p-[5px] mb-[10px] rounded-md w-full"
              />
              <FaSearch className="ml-[-25px] mt-[-8px] mr-[15px]" />
            </div>
          </div>
          <table className="table-auto w-full border-collapse border-[2px] border-black-darkest">
            <thead>
              <tr className="border-black-darkest border-b">
                <th className="px-[16px] py-[8px] border-r border-black-darkest text-left text-[16px]">
                  Id
                </th>
                <th className="px-[16px] py-[8px] border-r border-black-darkest text-left text-[16px]">
                  Title
                </th>
                <th className="px-[16px] py-[8px] border-r border-black-darkest text-left text-[16px] ">
                  <div className="flex justify-between items-center">
                    Body
                    <span>
                      {isdownloadComplete ? (
                        <>
                          <MdDownloadDone
                            className="w-[35px] h-[35px] cursor-pointer"
                            title="Downloaded"
                          />
                        </>
                      ) : (
                        <button
                          className="bg-yellow-600 
                        sm:w-[120px] h-[45px] 
                        xs:w-[50px] sm:ml-[0px] xs:ml-[5px]
                        sm:text-[15px] xs:text-[8px] p-[5px] rounded-md text-white-light"
                        >
                          <CsvDownloader
                            datas={searchResult}
                            text="Download CSV"
                            filename={`postData_` + new Date().toLocaleString()}
                            extension=".csv"
                          />
                        </button>
                      )}
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {searchResult?.map((user) => (
                <tr key={user.id} className="border-black-darkest border-b">
                  <td className="px-[16px] border-r border-black-darkest py-[8px] text-[15px]">
                    {user.id}
                  </td>
                  <td className="px-[16px] border-r border-black-darkest py-[8px] text-[15px]">
                    {user.title}
                  </td>
                  <td className="px-[16px] border-r border-black-darkest py-[8px] text-[15px]">
                    {user.body}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <Page
            postsPerPage={postsPerPage}
            totalPosts={posts?.length}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Table;
