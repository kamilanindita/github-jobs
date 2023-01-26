import createError from 'http-errors';

import db from '@/database';
import { Op } from 'sequelize';

/**
 * GET /jobs
 * List job with pagination
 */
export const getJobs = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10 } = req.query;
    const offset = page * perPage - perPage;

    const jobListResponse = await db.models.job
      .findAndCountAll({
        offset,
        limit: perPage,
        order: [['createdAt', 'DESC']],
      });

    const totalPage = Math.ceil(jobListResponse.count / perPage);
    
    const response = {
        ...jobListResponse, page, totalPage, perPage
    };
    return res.json(response);
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /jobs/filter
 * List job with filter and pagination
 */
export const getJobsFilter = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10 } = req.query;
    let { description, location, fullTimeOnly  } = req.query;
    const offset = page * perPage - perPage;

    if(location.length < 1){
      location = " "
    }

    if(description.length < 1){
      description =" "
    }

    const jobListResponse = await db.models.job
      .findAndCountAll({
        where: {
          [Op.or]: [
            { title: { [Op.like]: `%${description}%` } },
            { company: { [Op.like]: `%${description}%` } },
            { location: { [Op.like]: `%${location}%` } },
          ]
        },
        offset,
        limit: perPage,
        order: [['createdAt', 'DESC']],
      });

    const totalPage = Math.ceil(jobListResponse.count / perPage);
    
    const response = {
        ...jobListResponse, page, totalPage, perPage
    };
    return res.json(response);
  } catch (err) {
    return next(err);
  }
};


/**
 * GET /job/:id
 * Get job by id
 */
export const getJobById = async (req, res, next) => {
  try {
    const { id: jobId } = req.params;

    const job = await db.models.job
      .findOne({
        where: { id: jobId }
      });
    if (!job) {
      return next(createError(404, 'There is no job with this id!'));
    }

    return res.status(200).json(job);
  } catch (err) {
    return next(err);
  }
};
