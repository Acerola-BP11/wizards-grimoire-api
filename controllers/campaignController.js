const { firestore, bucket } = require('../utils/firebase')
const fs = require('fs')

async function getCampaign(req, res) {

}

async function createCampaign(req, res){
    const { campaignName, campaignDescription } = req.body
    const path = req.file.path
    const userUid = req.uid
    const extension = req.imageExtension
    const campaignFolderRef = firestore.collection('Campaigns')

    let campaign = await campaignFolderRef.add({
        campaignName: campaignName,
        campaignDescription: campaignDescription,
        players: [
            {
                uid: userUid,
                character: null,
                isGM: true
            }
        ]
    })
    
    bucket.upload(path, {
        destination: (`Campaigns/${campaign.id}.${extension}`)
    })
    fs.unlink(path, err => {
        if(err){
            throw err
        }else{
            res.sendStatus(200)
        }
    })
}

module.exports = {
    createCampaign
}