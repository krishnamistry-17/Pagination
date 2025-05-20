import React, { useEffect, useState } from "react";
import Page from "./Pagination/Page";
import { IoMdDownload } from "react-icons/io";
import { MdDownloadDone } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

const Table = () => {
  const [posts, setPost] = useState([]);
  const [error, setError] = useState(true);
  const [isLoading, setIsLoading] = useState(null);
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState();
  console.log("suggestion :", suggestion);
  const [isdownloadComplete, setDownloadComplete] = useState();
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

  const serachTitle = currentPosts.filter((item) =>
    item.title.toLowerCase().includes(input.toLocaleLowerCase())
  );

  const handleDownload = (complete) => {
    setDownloadComplete(!isdownloadComplete);
  };

  return (
    <>
      <div>
        <div className=" container mx-auto sm:p-[16px] xs:p-[5px]">
          <div className="flex justify-center items-center">
            <div className="flex justify-between items-center">
              <input
                type="text"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                placeholder="Search Title"
                className="border-black-dark border p-[5px] mb-[10px] rounded-md"
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
                <th className="px-[16px] py-[8px] border-r border-black-darkest text-left text-[16px] ">
                  <div className="flex justify-between items-center">
                    Body
                    <span>
                      <IoMdDownload
                        className={`mt-[5px] justify-end items-end  w-[35px] h-[35px]
                          ${
                            isdownloadComplete === "complete" ? (
                              <MdDownloadDone />
                            ) : (
                              <IoMdDownload />
                            )
                          }
                          `}
                        onClick={handleDownload}
                      />
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {serachTitle?.map((user) => (
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

{/*echo "# Pagination" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/krishnamistry-17/Pagination.git
git push -u origin main */}