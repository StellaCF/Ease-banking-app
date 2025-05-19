import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/SideBar";

const TransactionDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const txn = state?.txn;

  const { date, time } = new Date(txn.createdAt).toLocaleString("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).split(", ");

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="ml-64 flex-1 p-8 space-y-8">
        <div className="flex justify-between items-center">
          {/* <h2 className="text-2xl font-bold text-[#02487F]">{txn.type}</h2> */}
          <button onClick={() => navigate(-1)} className="text-white bg-[#02487F] hover:bg-[#1384AB] rounded-md px-3 py-1">
            ←
          </button>
        </div>
        <div className="w-5/12 mx-auto rounded-xl shadow-md p-1 bg-linear-to-r from-[#02487F] to-[#1384AB]">
          <div className="bg-[#ffffffc5] px-8 py-6 w-full rounded-xl">
            <div className="w-30 h-30 mx-auto flex justify-center items-center bg-green-800 text-white font-bold text-sm rounded-full">{txn.status.toUpperCase()}</div>
            <div className="grid grid-cols-1 mt-8 gap-3">
              <Detail label="Type" value={txn.type} />
              <Detail label="Amount" value={`₦${txn.amount.toLocaleString()}`} />
              <Detail label="Status" value={txn.status} />
              <Detail label="Date" value={date} />
              <Detail label="Time" value={time} />
              <Detail label="Sender Name" value={txn.senderName || "N/A"} />
              <Detail label="Sender Account Number" value={txn.senderAccount || "N/A"} />
              <Detail label="Receiver Name" value={txn.receiverName || "N/A"} />
              <Detail label="Receiver Account Number" value={txn.receiverAccount || "N/A"} />
              <Detail label="Transaction ID" value={txn.id} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div className="flex justify-between">
    <p className="text-md text-gray-700">{label}:</p>
    <p className="text-lg font-semibold text-gray-800">{value}</p>
  </div>
);

export default TransactionDetails;