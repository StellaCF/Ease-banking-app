import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/SideBar";

const TransactionDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const txn = state?.txn;

  const [date, time] = new Date(txn.createdAt).toLocaleString("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).split(", ");

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-4 md:p-8 space-y-6 md:ml-64">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-white bg-[#02487F] hover:bg-[#1384AB] rounded-md px-4 py-2 w-max"
        >
          ← Back
        </button>

        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-[#02487F]">
            Transaction Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Detail label="Type" value={txn.type} />
            <Detail label="Amount" value={`₦${txn.amount.toLocaleString()}`} />
            <Detail label="Status" value={txn.status} />
            <Detail label="Date" value={date} />
            <Detail label="Time" value={time} />
            <Detail label="Sender Name" value={txn.senderName || "N/A"} />
            <Detail label="Sender Account Number" value={txn.senderAccount || "N/A"} />
            <Detail label="Receiver Name" value={txn.receiverName || "N/A"} />
            <Detail label="Receiver Account Number" value={txn.receiverAccount || "N/A"} />
            <Detail label="Source" value={txn.source} />
          </div>
        </div>
      </main>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-base md:text-lg font-semibold text-gray-800">{value}</p>
  </div>
);

export default TransactionDetails;
