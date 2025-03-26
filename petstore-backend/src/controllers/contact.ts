import { sendContactUsEmail } from "../utils/contactUs";
import contactModel from "../model/contactModel"; 

export const contactUs = async (req: any, res: any) => {
  try {
    const { name, email, message } = req.body;
    await sendContactUsEmail(name, email, message);
    await contactModel.createContact(req.body);
    res.status(200).json({ status: true, message: "Email sent successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

export const getAllMessages = async (req: any, res: any) => {
  try {
    const messages = await contactModel.getAllMessages();
    res.status(200).json(messages);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message });
  }
};


export const getMessageById = async (req: any, res: any) => {
  try {
    const message = await contactModel.getMessageById(req.params.id);
    if(message){
      res.status(200).json(message);
    }else{
      res.status(404).json({ message: "Message not found" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

export const deleteMessageById = async (req: any, res: any) => {  

  try {
    const message = await contactModel.deleteMessageById(req.params.id);
    res.status(200).json(message);
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.message });
  }
};












