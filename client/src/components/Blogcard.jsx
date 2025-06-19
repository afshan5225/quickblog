import React from 'react';
import { useNavigate } from 'react-router-dom';

const Blogcard = ({ blog }) => {
  const { _id, title, image, description, category } = blog;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className="w-full rounded-lg overflow-hidden shadow hover:scale-105 hover:shadow-purple-800/25 duration-300 cursor-pointer"
    >
      <img src={image} alt={title} className="aspect-video w-full object-cover" />
      
      <span className="ml-5 mt-4 px-3 py-1 inline-block bg-purple-800/20 rounded-full text-xs">
        {category}
      </span>

      <div className="p-5">
        <h5 className="mb-2 font-medium text-gray-900">{title}</h5>
        
        <p
          className="mb-3 text-xs text-gray-600"
          dangerouslySetInnerHTML={{
            __html: description.length > 80
              ? description.slice(0, 80) + "..."
              : description
          }}
        />
      </div>
    </div>
  );
};

export default Blogcard;
