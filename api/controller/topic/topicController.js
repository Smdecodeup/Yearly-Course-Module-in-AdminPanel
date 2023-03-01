const TOPIC = require("../../model/topic");
// const jay = require('../')
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { findById, findByIdAndDelete } = require("../../model/topic");

// Set up storage for images and videos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
      cb(null, path.join(__dirname, "../../public/images"));
    } else if (file.mimetype === "video/mp4") {
      cb(null, path.join(__dirname, "../../public/videos"));
    } else if (file.mimetype === "audio/mpeg") {
      cb(null, path.join(__dirname, "../../public/audios"));
    } else if (file.mimetype === "audio/mpeg") {
      cb(null, path.join(__dirname, "../../public/audioSuggestion"));
    } else if (
      file.mimetype === "signLanguageimage/png" ||
      file.mimetype === "signLanguageimage/jpeg"
    ) {
      cb(null, path.join(__dirname, "../../public/videoSuggestion"));
    } else {
      cb(new Error("Invalid file type"));
    }
    console.log(file);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
      "-" +
      Date.now() +
      "." +
      file.originalname.split(".").pop()
    );
  },
});
// Set up multer instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: {
      image: 2 * 1024 * 1024, // 2 MB
      signLanguageimage: 2 * 1024 * 1024, // 2 MB
      video: 10 * 1024 * 1024, // 10 MB
      audio: 2 * 1024 * 1024, // 2 MB
      audioSuggestion: 2 * 1024 * 1024, // 2 MB
    },
  },
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "video/mp4" ||
      file.mimetype === "audio/mpeg" ||
      file.mimetype === "audioSuggestion/mpeg" ||
      file.mimetype === "signLanguageimage/jpg" ||
      file.mimetype === "signLanguageimage/png" ||
      file.mimetype === "signLanguageimage/jpef"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
}).array("files");

exports.createTopic = async function (req, res, next) {
  try {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        return res.status(400).json({ Status: false, message: err.message });
      } else if (err) {
        // An error occurred when uploading
        return res.status(400).json({ Status: false, message: err.message });
      }

      const imageUrls = [];
      const signLanguageimageUrls = [];
      const videoUrls = [];
      const audioUrls = [];
      const audioSuggestionUrls = [];

      // Loop through uploaded files and store their URLs in separate arrays
      if (req.files !== undefined) {
        for (const file of req.files) {
          if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/jpg"
          ) {
            imageUrls.push(file.path);
          } else if (file.mimetype === "video/mp4") {
            videoUrls.push(file.path);
          } else if (file.mimetype === "audio/mpeg") {
            audioUrls.push(file.path);
          } else if (file.mimetype === "audioSuggestion/mpeg") {
            audioSuggestionUrls.push(file.path);
          } else if (file.mimetype === "signLanguage/mpeg") {
            signLanguageimageUrls.push(file.path);
          }
        }
      }

      // Set the image, video and audio URLs in the request body
      req.body.image = imageUrls;
      req.body.video = videoUrls;
      req.body.audio = audioUrls;
      req.body.audioSuggestion = audioSuggestionUrls;
      req.body.signLanguageimage = signLanguageimageUrls;

      // Create the topic
      const createTopic = await TOPIC.create({
        ...req.body,
        image: req.body.image,
        video: req.body.video,
        audio: req.body.audio,
        audioSuggestion: req.body.audioSuggestion,
        signLanguageimage: req.body.signLanguageimage,
        user: req.userId,
        module: req.moduleId,
      });
      // Populate the user field of the created topic and return it in the response
      const data = await TOPIC.findById(createTopic._id).populate("user");
      return res.status(200).json({ Status: true, message: "Create topic successfully", data });
    });
  } catch (error) {
    return res.status(500).json({ Status: false, message: error.message });
  }
};

exports.deleteTopic = async function (req, res) {
  try {
    id = req.query.id;
    var filename = await TOPIC.findById(id);
    console.log(filename, "filename");

    var deleteImage = filename.image;
    var deleteVideo = filename.video;
    var deleteAudio = filename.audio;

    deleteImage.map((el) => {
      return fs.unlinkSync(el);
    });
    deleteVideo.map((el) => {
      return fs.unlinkSync(el);
    });
    deleteAudio.map((el) => {
      return fs.unlinkSync(el);
    });
    var deleteId = req.query.id;
    var data = await TOPIC.findByIdAndDelete(deleteId);
    return res
      .status(200)
      .json({ Status: true, message: " topic delete Sucessfully", data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: err.message });
  }
};

exports.viewTopic = async function (req, res, next) {
  try {
    viewid = req.query.id;
    const data = await TOPIC.findById(viewid);
    return res.status(200).json({ Status: true, message: " topic view Sucessfully", data });
  } catch (error) {
    return res.status(500).json({ Status: false, message: error.message });
  }
};

exports.listingTopic = async function (req, res, next) {
  try {
    const data = await TOPIC.find();
    return res
      .status(200)
      .json({ Status: true, message: "all topic listing Sucessfully", data });
  } catch (error) {
    return res.status(500).json({ Status: false, message: error.message });
  }
};

exports.deleteAllTopic = async function (req, res) {
  try {
    const data = await TOPIC.deleteMany();
    return res
      .status(200)
      .json({ Status: true, message: "all topic listing Sucessfully", data });
  } catch (error) {
    return res.status(500).json({ Status: false, message: error.message });
  }
};
