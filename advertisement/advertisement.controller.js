const adService = require('./advertisement.service');

const getAll = async (req, res) => {
  try {
    const list = await adService.getAdvertisementList();
    res.status(200).json({
      status: 'ok',
      data: list
    });
  } catch(error) {
    res.status(500).json({
      status: 'error',
      error
    })
  }
};

const getByParams = async (req, res) => {
  try {
    const item = await adService.getAdvertisementByParams(req.params);
    res.status(200).json({
      status: 'ok',
      data: item
    });
  } catch(error) {
    res.status(500).json({
      status: 'error',
      error
    })
  }
};

const getById = async (req, res) => {
  try {
    const item = await adService.getAdvertisementById(req.params.id);
    res.status(200).json({
      status: 'ok',
      data: item
    });
  } catch(error) {
    res.status(500).json({
      status: 'error',
      error
    })
  }
};

const create = async (req, res) => {
  const { shortText, description } = req.body;
  const images = req.files.images ? req.files.images.map(i => i.path) : [];

  // Check empty fields
  if (!shortText) {
    return res.status(422).json({
      status: 'error',
      error: 'Required fields must be filled'
    })
  }

  try {
    const newAd = await adService.createAdvertisement({
      shortText,
      description,
      userId: req.user._id,
      tags: [],
      isDeleted: false,
      images
    });

    res.status(201).json({
        status: 'ok',
        data: newAd
    })
  } catch(error) {
    res.status(500).json({
      status: 'error',
      error
    })
  }
};

const remove = async (req, res) => {
  try {
    const removedCandidate = await adService.getAdvertisementById(req.params.id);
    if (removedCandidate.userId._id.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        error: 'Permission denied'
      })
    }

    await adService.removeAdvertisement(req.params.id);

    res.status(200).json({
        status: 'ok'
    })
  } catch(error) {
    res.status(500).json({
      status: 'error',
      error
    })
  }
};

module.exports = {
  getAll,
  getByParams,
  getById,
  create,
  remove
};