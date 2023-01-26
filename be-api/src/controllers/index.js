/**
 * GET /
 * Index
 */
export const getIndex = async (req, res, next) => {
  try {
    return res.json("API Server");
  } catch (err) {
    return next(err);
  }
};
