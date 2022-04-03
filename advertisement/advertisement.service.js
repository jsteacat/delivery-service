const AdModel = require('./advertisement.model');

const getAdvertisementList = async () => {
  const list = await AdModel
    .find()
    .populate({
      path: 'userId',
      select: '_id, name'
    })
    .select('-__v');
  return list;
};

const getAdvertisementByParams = async (params) => {
  const tags = params.tags
    ? params.tags.splite(',').map((tag) => ({ tags: { $in: [tag.trim()] } }))
    : null;
  const query = {
    $and: [
      { isDeleted: false },
      { shortText: { $regex: params.shortText, $options: '$i' } },
      { description: { $regex: params.description, $options: '$i' } }
    ]
  };
  if (params.userId) query['$and'].push({ userId: params.userId });
  if (tags) query['$and'].push(...tags);
  const response = await AdModel.find(query).populate({
    path: 'userId',
    select: '_id, name'
  });
  return response;
};

const getAdvertisementById = async (id) => {
  const adItem = await AdModel
    .findById(id)
    .populate({
      path: 'userId',
      select: 'name'
    })
    .select('-__v');
  return adItem || null;
};

const createAdvertisement = async (adData) => {
  return await AdModel.create(adData);
};

const removeAdvertisement = async (id) => {
  return await AdModel.findOneAndUpdate({ _id: id }, { isDeleted: true });
};

module.exports = {
  getAdvertisementList,
  getAdvertisementById,
  getAdvertisementByParams,
  createAdvertisement,
  removeAdvertisement
};