import React from 'react';

const OrderTable = ({ orders }) => {
  if (!orders.length) return <p>გთხოვ ატვირთე Excel ფაილი</p>;

  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">შეკვეთის ნომერი</th>
          <th className="border border-gray-300 p-2">მიტანის დრო</th>
          <th className="border border-gray-300 p-2">თაიმსლოტი</th>
          <th className="border border-gray-300 p-2">ჩაბარების დრო</th>
          <th className="border border-gray-300 p-2">თარიღის სტატუსი</th>
          <th className="border border-gray-300 p-2">თაიმსლოტის სტატუსი</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, i) => (
          <tr key={i} className="text-center border border-gray-200">
            <td className="border border-gray-300 p-2">{order['შეკვეთის ნომერი']}</td>
            <td className="border border-gray-300 p-2">{order['მიტანის დრო']}</td>
            <td className="border border-gray-300 p-2">{order['თაიმსლოტი']}</td>
            <td className="border border-gray-300 p-2">{order['ჩაბარების დრო']}</td>
            <td className="border border-gray-300 p-2">{order['თარიღის სტატუსი']}</td>
            <td className="border border-gray-300 p-2">{order['თაიმსლოტის სტატუსი']}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
