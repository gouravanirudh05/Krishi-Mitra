import { Router } from 'express';

const router = Router();

router.post("/api/checkFarmer", async (req, res) => {
    try{
      const {phoneNumber} = req.body;
      console.log(phoneNumber);
      const farmer = await Farmer.findOne({phoneNumber});
      if(farmer)
        res.json({exists: true});
      else
        res.json({exists: false});
    }
    catch(err){
      res.status(500).json({error: err});
    }
});

router.post("/api/registerFarmer", async (req, res) => {
    try{
      const {name, phoneNumber, townBody, landArea} = req.body;
      console.log(name, phoneNumber, townBody, landArea);

      const {state, district, block, town} = await getLocationHierarchy(townBody);
      console.log(state, district, block, town);
      const oldFarmer = await Farmer.findOne({phoneNumber});
      if(oldFarmer){
        res.status(403).json({registered: false, message: 'Farmer already exists'});
        return;
      }
      const farmer = new Farmer({name, phoneNumber, district, town, block, state, landArea});
      await farmer.save();
      res.json({registered: true});
    }
    catch(err){
      res.status(500).json({error: err});
    }
});

export default router;