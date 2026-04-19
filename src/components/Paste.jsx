import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react"; // Import useState
import { removeFromPastes } from "../redux/pasteSlice";
import { FormatDate } from "../utlis/formatDate";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term

  const handleDelete = (id) => {
    dispatch(removeFromPastes(id));
  };

  // Filter pastes based on search term (by title or content)
  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-3">
        {/* Search */}
        <div className="w-full flex gap-3 px-4 py-2 rounded-[0.3rem] border-2 border-slate-400 bg-slate-800 mt-6">
          <input
            type="search"
            placeholder="Search paste here..."
            className="focus:outline-none w-full bg-transparent text-white placeholder-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* All Pastes */}
        <div className="flex flex-col border-2 border-slate-400 bg-slate-800 bg-opacity-60 py-4 rounded-[0.4rem]">
          <h2 className="px-4 text-4xl font-bold text-white border-b-2 border-slate-400 pb-4">
            All Pastes
          </h2>
          <div className="w-full px-4 pt-4 flex flex-col gap-y-5">
            {filteredPastes.length > 0 ? (
              filteredPastes.map((paste) => (
                <div
                  key={paste?._id}
                  className="border-2 border-slate-500 w-full gap-y-6 justify-between flex flex-col sm:flex-row p-4 rounded-[0.3rem] bg-slate-700 bg-opacity-40 hover:bg-opacity-60 transition"
                >
                  {/* heading and Description */}
                  <div className="w-[50%] flex flex-col space-y-3">
                    <p className="text-4xl font-semibold text-white">{paste?.title}</p>
                    <p className="text-sm font-normal line-clamp-3 max-w-[80%] text-gray-300">
                      {paste?.content}
                    </p>
                  </div>

                  {/* icons */}
                  <div className="flex flex-col gap-y-4 sm:items-end">
                    <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                      <button
                        className="p-2 rounded-[0.2rem] bg-slate-600 border-2 border-slate-500 hover:bg-blue-600 group hover:border-blue-400 text-white"
                      >
                        <a href={`/?pasteId=${paste?._id}`}>
                          <PencilLine
                            className="text-white group-hover:text-white"
                            size={20}
                          />
                        </a>
                      </button>
                      <button
                        className="p-2 rounded-[0.2rem] bg-slate-600 border-2 border-slate-500 hover:bg-red-600 group hover:border-red-400 text-white"
                        onClick={() => handleDelete(paste?._id)}
                      >
                        <Trash2
                          className="text-white group-hover:text-white"
                          size={20}
                        />
                      </button>

                      <button className="p-2 rounded-[0.2rem] bg-slate-600 border-2 border-slate-500 hover:bg-orange-600 group hover:border-orange-400 text-white">
                        <a href={`/pastes/${paste?._id}`} target="_blank" rel="noreferrer">
                          <Eye
                            className="text-white group-hover:text-white"
                            size={20}
                          />
                        </a>
                      </button>
                      <button
                        className="p-2 rounded-[0.2rem] bg-slate-600 border-2 border-slate-500 hover:bg-green-600 group hover:border-green-400 text-white"
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("Copied to Clipboard");
                        }}
                      >
                        <Copy
                          className="text-white group-hover:text-white"
                          size={20}
                        />
                      </button>
                    </div>

                    <div className="gap-x-2 flex text-gray-300">
                      <Calendar className="text-gray-300" size={20} />
                      {FormatDate(paste?.createdAt)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-2xl text-center w-full text-gray-300">
                No Data Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paste;
