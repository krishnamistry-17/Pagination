import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { MdDownloadDone } from "react-icons/md";
import Page from "./Pagination/Page";

const Table = () => {
  const [posts, setPost] = useState([]);
  const [error, setError] = useState(true);
  const [isLoading, setIsLoading] = useState(null);
  const [input, setInput] = useState("");
  const [isDownloadComplete, setDownloadComplete] = useState(false);
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

  const searchResults = currentPosts.filter((item) =>
    item.title.toLowerCase().includes(input.toLowerCase())
  );

  const downloadCSV = () => {
    const headers = ["Id", "Title", "Body"];
    const rows = searchResults.map((post) => [
      post.id,
      `"${post.title}"`,
      `"${post.body}"`,
    ]);

    const csvContent =
      headers.join(",") + "\n" + rows.map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "posts.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadComplete(true);
    setTimeout(() => setDownloadComplete(false), 2000);
  };

  return (
    <>
      <div className="container mx-auto sm:p-[16px] xs:p-[5px]">
        <div className="flex justify-center items-center mb-4">
          <div className="flex justify-between items-center w-full max-w-md">
            <input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder="Search Title"
              className="border border-black p-[5px] rounded-md w-full"
            />
            <FaSearch className="ml-[-25px] mt-[-8px]" />
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
              <th className="px-[16px] py-[8px] border-r border-black-darkest text-left text-[16px]">
                <div className="flex justify-between items-center">
                  Body
                  <span>
                    {isDownloadComplete ? (
                      <MdDownloadDone
                        className="w-[30px] h-[30px] cursor-pointer"
                        title="Downloaded"
                      />
                    ) : (
                      <IoMdDownload
                        className="w-[30px] h-[30px] cursor-pointer"
                        onClick={downloadCSV}
                        title="Download CSV"
                      />
                    )}
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((user) => (
              <tr key={user.id} className="border-black-darkest border-b">
                <td className="px-[16px] py-[8px] border-r border-black-darkest text-[15px]">
                  {user.id}
                </td>
                <td className="px-[16px] py-[8px] border-r border-black-darkest text-[15px]">
                  {user.title}
                </td>
                <td className="px-[16px] py-[8px] border-r border-black-darkest text-[15px]">
                  {user.body}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4">
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
