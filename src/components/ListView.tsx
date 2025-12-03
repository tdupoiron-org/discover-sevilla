import React from "react";
import { Site } from "../types/site";

interface ListViewProps {
  sites: Site[];
}

const ListView: React.FC<ListViewProps> = ({ sites }) => {
  return (
    <ul className="divide-y divide-gray-200">
      {sites.map((site) => (
        <li key={site.id} className="py-4 flex items-center">
          <img src={site.image} alt={site.name} className="w-16 h-16 rounded mr-4 object-cover" />
          <div>
            <h3 className="text-lg font-semibold">{site.name}</h3>
            <p className="text-gray-500">{site.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListView;
