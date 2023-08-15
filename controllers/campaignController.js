const { firestore } = require('../utils/firebase')

async function getCampaign(req, res) {

}

async function createCampaign(req, res){
    const campaignData = await req.body.campaignData
    const uid = await req.body.uid
    const token = await req.body.token
}