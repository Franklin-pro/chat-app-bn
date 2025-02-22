import Conversation from "../models/conversation.js";
import Message from "../models/message.js";

export const sendMessage = async(req,res)=>{
  try {
    const {message} = req.body;
    const {id: receiverId} = req.params;
    const senderId = req.user._id;

   let conversation = await Conversation.findOne({
        participants: {$all: [senderId, receiverId]}
    })
    if(!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId]
        })
    }
    const newMessage = new Message({
        senderId,
        receiverId,
        message
    })

    if(newMessage){
        conversation.messages.push(newMessage._id)
    }
    // SOCKET IO FUNCTIONALITY WILL GO HERE

    await Promise.all([conversation.save(), newMessage.save()])
    res.status(201).json(newMessage)
  } catch (error) {
    console.log("Error in SendMessage controller",error.message);
    res.status(500).json({error: "internal server error"})
    
  }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        // Find the conversation between the sender and the recipient
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages");

        // If no conversation exists, return an empty array
        if (!conversation) {
            return res.status(200).json([]);
        }

        // Return the messages from the conversation
        const messages = conversation.messages;
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};