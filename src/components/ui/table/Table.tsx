import TableRow from "./TableRow";

interface Header {
  label: string;
  key: string;
  isCustom?: boolean; // Optional property for custom columns
}

interface TableProps {
  items: any[];
  headers: Header[]; // Accept headers as props
}

const Table: React.FC<TableProps> = ({ items, headers }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-2 py-3 text-xs text-center font-medium uppercase tracking-wider text-gray-500">
              SL
            </th>
            {headers.map((header) => (
              <th
                key={header.key}
                className="px-2 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                {header.label}
              </th>
            ))}
            <th className="px-2 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {items.map((item, index) => (
            <TableRow
              headers={headers}
              key={item?.id}
              item={item}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
