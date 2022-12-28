import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [task, setTask] = useState([]);
  const [open, setOpen] = useState(true);
  const [parentId, setparentId] = useState(null);
  const [clickedId, setClickedId] = useState();
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");
  const [parent, setParent] = useState(null);


  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(title);
    console.log(due);
    console.log(parent);
    try {
      const body = {
        title: title,
        due: due,
        parent_task: parent,
      };
      const { res } = await axios.post(
        "http://18.208.183.190/api/tasks/",
        body
      );
      setOpen(!open)
      setTitle("")
      setDue("")
      setParent(null)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTask();
  }, [task]);

  const getTask = async () => {
    try {
      const { data } = await axios.get("http://18.208.183.190/api/tasks/");
      setTask(data);
    } catch (error) {}
  };

  const handleClick = (id) => {
    setClickedId(id);
    const child = task.filter((item) => item.parent_task === id);
    setparentId(child);
    setParent(id)
  };

  return open ? (
    <div className="w-full h-auto flex flex-col">
      <div className="flex justify-end p-8">
        <button
          onClick={() => setOpen(!open)}
          type="button"
          className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-sm hover:shadow-lg transition-all ease-in-out duration-100 font-semibold text-white"
        >
          Add Task
        </button>
      </div>

      <div className=" h-auto p-10">
        <div className="w-full h-auto gap-3">
          <div className="flex flex-row justify-between px-6 py-3 m-2">
            <p>Task Title</p>
            <p>Due</p>
          </div>

          {task.map(
            (item) =>
              !item.parent_task && (
                <>
                  <div className="flex flex-col bg-slate-100 justify-between px-6 py-3 m-2">
                    <div className="flex ">
                      <div className="flex w-11/12 flex-wrap">
                        <p>{item.title}</p>
                      </div>

                      <div className="flex w-2/12 justify-end">
                        <p>{item.due}</p>
                      </div>
                    </div>

                    <div className="flex justify-between py-4">
                      <button
                        onClick={() => handleClick(item.id)}
                        type="button"
                        className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-sm hover:shadow-lg transition-all ease-in-out duration-100 font-semibold text-white"
                      >
                        View Child task
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setOpen(!open);
                          handleClick(item.id);
                        }}
                        className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-sm hover:shadow-lg transition-all ease-in-out duration-100 font-semibold text-white ml-auto"
                      >
                        Add Child Task
                      </button>
                    </div>
                  </div>

                  {clickedId === item.id &&
                    parentId?.map((childItem) => (
                      <div className="flex flex-col w-11/12 ml-auto bg-slate-100 justify-between px-6 py-3 m-2">
                        <div className="flex ">
                          <div className="flex w-11/12 flex-wrap">
                            <p>{childItem.title}</p>
                          </div>
                          <div className="flex w-2/12 justify-end">
                            <p>{childItem.due}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </>
              )
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="p-8 mt-8 flex justify-center  h-screen w-full">
      <div className="w-2/4 h-80 bg-gray-100">
        <div className="flex justify-end">
          <button
            onClick={() => setOpen(!open)}
            type="submit"
            className="bg-gray-700 w-auto md:w-auto p-2 rounded-sm hover:bg-red-600 transition-all ease-in-out duration-100 font-semibold text-white"
          >
            X
          </button>
        </div>
        <div className="p-6">
          <form onSubmit={submitHandler}>
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-8 p-2 bg-white border border-white outline-none appearance-none focus:border-gray-500"
              required
            />
            <label htmlFor="">Due</label>
            <input
              type="date"
              name="due"
              value={due}
              onChange={(e) => setDue(e.target.value)}
              className="w-full h-8 p-2 bg-white border border-white outline-none appearance-none focus:border-gray-500"
              required
            />

            <label htmlFor="" hidden>
              Parent Task
            </label>
            <input
              type="text"
              value={parent}
              onChange={setParent}
              className="w-full h-8 p-2 bg-white border border-white outline-none appearance-none focus:border-gray-500"
              hidden
            />

            <div className="flex justify-end p-6">
              <button
                type="submit"
                className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-sm hover:shadow-lg transition-all ease-in-out duration-100 font-semibold text-white"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
