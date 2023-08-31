const { firestore, bucket } = require('../utils/firebase')
const fs = require('fs')

async function getCampaigns(req, res) {
    const uid = req.uid
    let campaingFolderRef = firestore.collection('Campaigns')
    let campaigns = campaingFolderRef.where('players.uid', '==', uid)
    console.log(campaigns)
    res.send(campaigns)
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
        players: {
            [userUid]: {
                characters: [],
                isGM: true
            }
        }
    })
    
    bucket.upload(path, {
        destination: (`Campaigns/${campaign.id}.${extension}`)
    })
    fs.unlink(path, err => {
        if(err){
            throw err
        }else{
            res.send(campaign.id)
        }
    })
}

module.exports = {
    createCampaign,
    getCampaigns
}