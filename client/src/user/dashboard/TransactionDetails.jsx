import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/SideBar";
import { CheckCircle } from "lucide-react";

const TransactionDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const txn = state?.txn;

  const formatDateAndTime = (isoString) => {
    const dateObj = new Date(isoString);
    const date = dateObj.toLocaleDateString("en-NG", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    const time = dateObj.toLocaleTimeString("en-NG", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return { date, time };
  };

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
        <div className="w-5/12 mx-auto rounded-xl shadow-md p-1 bg-linear-to-br from-[#02487F] to-[#1384AB]">
          <div className="bg-white px-8 py-6 w-full rounded-xl">
              {txn.status === "approved" || txn.status === "completed" ? (
                <CheckCircle className="text-green-600 w-15 h-15 mx-auto font-extrabold" />
              ) : ""}
            <div className="grid grid-cols-1 mt-8 gap-4">
              <Detail label="Transaction type" value={txn.type} />
              <Detail label="Amount" value={`₦${txn.amount.toLocaleString()}`} />
              <Detail label="Status" value={txn.status} />
              <Detail label="Date" value={formatDateAndTime(txn.createdAt).date} />
              <Detail label="Time" value={formatDateAndTime(txn.createdAt).time} />
              {txn.type === "deposit" || txn.type === "loan" ? (
                <div className="grid grid-cols-1 gap-4">
                  <Detail label="Sender Name" value={txn.senderName || "N/A"} />
                  <Detail label="Sender Account Number" value={txn.senderAccount || "N/A"} />
                  <Detail label="Sender Bank" value={txn.senderBank || "N/A"} />
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  <Detail label="Receiver Name" value={txn.acctName || "N/A"} />
                  <Detail label="Receiver Account Number" value={txn.acctNumber || "N/A"} />
                  <Detail label="Receiver Bank" value={txn.bankAcct || "N/A"} />
                </div>
              )}
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-700">Transaction ID:</p>
                <p className="text-sm text-gray-800">{txn.id}</p>
              </div>
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
    <p className="text-md font-semibold text-gray-800">{value}</p>
  </div>
);

export default TransactionDetails;