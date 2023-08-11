const { firestore } = require('./firebase')

async function getCharacters(req, res) {
    const uid = req.params.uid
    const characterRef = firestore.collection('Users'+uid)
    let characterList = characterRef.get()
    if(characterList.lenght() <= 0){
        res.send('Não existem personagens')
    }else{
        characterList = await characterList.filter(element => element.data())
        res.send(characterList)
    }
}

async function getCharacter(req, res) {
    const uid = req.params.uid
    const characterRef = firestore.collection('Users/'+uid)
    const character = await characterRef.doc(characterRef).get()
    res.send(character)
}

async function createCharacter(req, res){
    const characterData = req.body.characterData
    const uid = req.get.uid
    const characterRef = firestore.collection('Users/'+uid)
    characterRef.add(characterData)
    res.status(200)
}

async function updateCharacter(req, res){
    const characterData = req.body.characterData
    const uid = req.get.uid
    const characterID = req.body.characterID
    const characterRef = firestore.collection('Users/'+uid)
    await characterRef.doc(characterID).set(characterData, { merge: true })
    res.status(200)
}

async function deleteCharacter(req, res){
    const uid = req.get.uid
    const characterID = req.body.characterID
    const characterRef = firestore.collection('Users/'+uid)
    await characterRef.doc(characterID).delete()
    res.status(200)
}