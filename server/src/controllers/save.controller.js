const saveService = require("../services/save.services");

exports.saveFunds = async (req, res) => {
  try {
    const { amount, description } = req.body;
    const userId = req.user.id;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid save amount" });
    }

    const saveData = { 
      userId: userId,
      amount: amount,
      type: "save",
      description: description,
      createdAt: new Date()
    }

    const data = await saveService.saveFunds(userId, saveData);
    return res.status(200).json({ message: "save added", data});

  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.addSavings = async (req, res) => {
   try {
      const { transactionId, amount} = req.body;
      const userId = req.user.id;
   
      if (!transactionId || !amount || amount <= 0) {
         return res.status(400).json({ message: "Transaction ID and valid amount required" });
      }
   
      const data = await saveService.updateSave(userId, transactionId, amount)
      
      return res.status(200).json({message: "updated", data})
   } catch (error) {
      return res.status(500).json({ message: "Server error", error: error.message });
   }
}


exports.useSavings = async (req, res) => {
   try {
     const { transactionId, amount } = req.body;
     const userId = req.user.id;
 
     if (!transactionId || !amount || amount <= 0) {
       return res.status(400).json({ message: "Transaction ID and valid amount required" });
     }
 
     const data = await saveService.useSavings(userId, transactionId, amount);
     return res.status(200).json(data);
 
   } catch (error) {
     return res.status(500).json({ message: "Server error", error: error.message });
   }
 };
 

 exports.userSavings = async (req, res) => {
   try {
      const data = await saveService.userSavings(req.user.id);
      return res.status(200).json({ message: 'User saving fetched successfully', data });
   } catch (error) {
      return res.status(500).json({message: "server error", error: error.message})
   }
 }