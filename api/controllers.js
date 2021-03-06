const util = require('util');
const path = require('path');
const fs = require('fs');
const tv4 = require('tv4');

const PROFILES_SCHEMA = require('../data/profile-schema.json');
const DATA_PATH = path.join(__dirname, '..', 'data', 'candidate.json');
//console.log(DATA_PATH);

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const controllers = {
  create: async (req, res) => {

    const newProfile = req.body
    console.log(newProfile);
    
    try {
      const profilesDataString = await readFile(DATA_PATH, 'utf-8');
      const profilesData = JSON.parse(profilesDataString);


      newProfile.id = profilesData.nextId;
      profilesData.nextId++;

      const isValid = tv4.validate(newProfile, PROFILES_SCHEMA)

      if (!isValid) {
        const error = tv4.error
        console.error(error)

        res.status(400).json({
          error: {
            message: error.message,
            dataPath: error.dataPath
          }
        })
        return
      }

      profilesData.profiles.push(newProfile);
      console.log(profilesData.profiles);
      const newProfileDataString = JSON.stringify(profilesData, null, '  ');

      await writeFile(DATA_PATH, newProfileDataString);
      console.log(newProfile);
      
      res.redirect('/');

    } catch (err) {
      console.log(err);

      if (err && err.code === 'ENOENT') {
        res.status(404).end();
        return;
      }

      next(err);
    }

  },
  readAll: async (req, res) => {
    try {
      const profilesDataString = await readFile(DATA_PATH, 'utf-8');
      const profilesData = JSON.parse(profilesDataString);

      res.send(profilesData.profiles);

    } catch (err) {
      console.log(err)

      if (err && err.code === 'ENOENT') {
        res.status(404).end();
        return;
      }

      next(err);
    }
  },
  readOne: async (req, res) => {
    const idToUpdateStr = req.body.id;
    const idToUpdate = Number(idToUpdateStr);

    try {
      const profilesDataString = await readFile(DATA_PATH, 'utf-8');
      const profilesData = JSON.parse(profilesDataString);
      const selectedProfile = profilesData.profiles
        .find(profile => profile.id == idToUpdate);

      res.json(selectedProfile);

    } catch (err) {
      console.log(err)

      if (err && err.code === 'ENOENT') {
        res.status(404).end();
        return;
      }

      next(err);
    }
  },
  update: async (req, res) => {
    const idToUpdateStr = req.body.id;
    const idToUpdate = Number(idToUpdateStr);

    const newProfile = req.body
    newProfile.id = idToUpdate;
    const isValid = tv4.validate(newProfile, PROFILES_SCHEMA)

    if (!isValid) {
      const error = tv4.error
      console.error(error)

      res.status(400).json({
        error: {
          message: error.message,
          dataPath: error.dataPath
        }
      })
      return
    }

    try {
      const profilesDataString = await readFile(DATA_PATH, 'utf-8');
      const profilesData = JSON.parse(profilesDataString);

      const entryToUpdate = profilesData.profiles
        .find(profile => profile.id == idToUpdate);

      if (entryToUpdate) {
        const indexOfProfile = profilesData.profiles
          .indexOf(entryToUpdate);
        profilesData.profiles[indexOfProfile] = newProfile;

        const newProfileDataString = JSON.stringify(profilesData, null, '  ');

        await writeFile(DATA_PATH, newProfileDataString);

        res.redirect("/");
      } else {
        res.json(`no entry with id ${idToUpdate}`);
      }

    } catch (err) {
      console.log(err);

      if (err && err.code === 'ENOENT') {
        res.status(404).end();
        return;
      }

      next(err);
    }
  },
  delete: async (req, res) => {
    const idToDeleteStr = req.body.id;
    const idToDelete = Number(idToDeleteStr);
    console.log(idToDelete);
    

    try {
      const profilesDataString = await readFile(DATA_PATH, 'utf-8');
      const profilesData = JSON.parse(profilesDataString);

      const entryToDelete = profilesData.profiles
        .find(profile => profile.id == idToDelete);

      if (entryToDelete) {

        profilesData.profiles = profilesData.profiles
          .filter(profile => profile.id != entryToDelete.id);

        const newProfileDataString = JSON.stringify(profilesData, null, '  ');

        await writeFile(DATA_PATH, newProfileDataString);

        res.redirect("/");
      } else {
        res.json(`no entry with id ${idToUpdate}`);
      }

    } catch (err) {
      console.log(err);

      if (err && err.code === 'ENOENT') {
        res.status(404).end();
        return;
      }

      next(err);
    }
    
  },
};



module.exports = controllers;
