const { Timestamp } = require('firebase-admin/firestore')
const { firestore, bucket } = require('../utils/firebase')
const fs = require('fs')

async function getCampaigns(req, res) {
    const uid = req.uid;
    let campaingFolderRef = firestore.collection('Campaigns');

    try {
        let campaignsQuery = await campaingFolderRef.where('players', 'array-contains', uid).get();
        let campaignPromises = campaignsQuery.docs.map(async (document) => {
            const campaign = document.data();
            campaign.id = document.id
            let campaignPictureRef = await bucket.getFiles({
                prefix: `Campaigns/${document.id}`
            });
            campaignPictureRef = campaignPictureRef[0][0]
            const [signedUrl] = await campaignPictureRef.getSignedUrl({
                action: 'read',
                expires: (Timestamp.now().toDate().setHours((Timestamp.now().toDate().getHours()) + 1))
            });
            campaign.picture = signedUrl;
            return campaign;
        });

        let campaigns = await Promise.all(campaignPromises);
        console.log(campaigns);
        res.send(campaigns);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Erro ao buscar campanhas.' });
    }
}
async function createCampaign(req, res){
    const { campaignName, campaignDescription } = req.body
    const path = req.file.path
    const userUid = req.uid
    const extension = req.imageExtension
    const username = req.username
    const campaignFolderRef = firestore.collection('Campaigns')

    let campaign = await campaignFolderRef.add({
        campaignName: campaignName,
        campaignDescription: campaignDescription,
        gm: username,
        players: [userUid],
        characters: {
            [userUid]: {
                characters: [],
                isGM: true
            }
        },
        createdAt: Timestamp.now().toDate().getUTCDate(),
        updatedAt: Timestamp.now().toDate().getUTCDate()
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

async function getCampaign(req, res, next) {
    const uid = req.uid
    const campaignID = req.params.id
    try {
        let campaign = await firestore.doc(`Campaigns/${campaignID}`).get()
        campaign = campaign.data()
        let campaignPicture = await bucket.getFiles({
            prefix: `Campaigns/${campaignID}`
        })
        campaignPicture = campaignPicture[0][0]
        campaignPicture = await campaignPicture.getSignedUrl({
            action: 'read',
            expires: (Timestamp.now().toDate().setHours((Timestamp.now().toDate().getHours()) + 1))
        });
        campaign.picture = campaignPicture
        if(!campaign.players.includes(uid)){
            throw '403'
        }else{
            res.send(campaign)
        }
    } catch (error) {
        console.error(error);
        res.status(404).send({ error: 'Campanha não encontrada' });
    }
}

module.exports = {
    createCampaign,
    getCampaigns,
    getCampaign
}