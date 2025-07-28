import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import OrderTable from './components/OrderTable';

function App() {
  const [orders, setOrders] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { defval: '' });

      const enrichedData = data.map((row) => {
        const deliveryDate = new Date(row['მიტანის დრო']);
        const deliverySlot = row['თაიმსლოტი'];
        const deliveredAt = row['ჩაბარების დრო'] ? new Date(row['ჩაბარების დრო']) : null;

        let dateStatus = 'ჩასაბარებელი';
        let slotStatus = 'ჩასაბარებელი';

        if (deliveredAt) {
          if (
            deliveredAt.getFullYear() === deliveryDate.getFullYear() &&
            deliveredAt.getMonth() === deliveryDate.getMonth() &&
            deliveredAt.getDate() === deliveryDate.getDate()
          ) {
            dateStatus = 'დროულად';
          } else if (deliveredAt > deliveryDate) {
            dateStatus = 'გვიან';
          } else {
            dateStatus = 'ადრე';
          }

          const [fromTime, toTime] = deliverySlot.split(' - ').map((t) => t.trim());
          const from = new Date(deliveryDate);
          const to = new Date(deliveryDate);

          const [fh, fm, fs] = fromTime.split(':');
          from.setHours(fh, fm, fs);

          const [th, tm, ts] = toTime.split(':');
          to.setHours(th, tm, ts);

          if (deliveredAt < from) slotStatus = 'ადრე';
          else if (deliveredAt > to) slotStatus = 'გვიან';
          else slotStatus = 'დროულად';
        }

        return {
          ...row,
          'თარიღის სტატუსი': dateStatus,
          'თაიმსლოტის სტატუსი': slotStatus,
        };
      });

      setOrders(enrichedData);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Order Delivery Status Checker</h1>
      <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} className="mb-4" />
      <OrderTable orders={orders} />
    </div>
  );
}

export default App;
