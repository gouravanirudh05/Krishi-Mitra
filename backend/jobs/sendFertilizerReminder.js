import Farmer from '../models/farmerModel.js';
import Crop from '../models/cropModel.js';
import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export default (agenda) => {
  agenda.define('send fertilizer reminder', async (job) => {
    try{
    console.log("Entered1");
    console.log("Job data:", job.attrs.data);
    const { farmerId, cropName } = job.attrs.data;

    const farmer = await Farmer.findById(farmerId);
    const cropInfo = await Crop.findOne({ name: cropName });
    console.log("Entered2");

    if (!farmer || !cropInfo) return;
    console.log("Entered3");

    await client.messages.create({
      body: `Reminder: Apply ${cropInfo.fertilizer} for your ${cropName} crop today! 🌾`,
      from: process.env.TWILIO_PHONE,
      to: farmer.phoneNumber
    });
    console.log("Entered4");

    console.log(`SMS sent to ${farmer.name}`);
  }
  catch(err){
    console.log(err.message)
  }
  });
};
