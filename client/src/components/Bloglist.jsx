import React, { useState } from "react";
import { blog_data, blogCategories } from "../assets/assets";
import { motion } from "framer-motion";
import Blogcard from "./Blogcard";
import { useAPPContext } from "../context/Appcontext";

export const Bloglist = () => {
  const [menu, setmenu] = useState("All");
  const { bloG, input } = useAPPContext();

  // ✅ Fixed casing and added fallback if bloG is undefined
  const filteredBlogs = () => {
    if (!bloG) return []; // safety
    if (input === "") return bloG;

    return bloG.filter(
      (blog) =>
        blog.title.toLowerCase().includes(input.toLowerCase()) ||
        blog.category.toLowerCase().includes(input.toLowerCase())
    );
  };

  return (
    <div>
      {/* Category Menu */}
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setmenu(item)}
              className={`cursor-pointer relative ${
                menu === item ? "text-white px-4 pt-0.5" : "text-gray-500"
              }`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute left-0 right-0 top-0 h-7 -z-1 bg-purple-800 rounded-full"
                />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {filteredBlogs()
          .filter((blog) => menu === "All" || blog.category === menu)
          .map((blog) => (
            <Blogcard key={blog.id} blog={blog} />
          ))}
      </div>
    </div>
  );
};
