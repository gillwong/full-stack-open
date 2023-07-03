const jwt = require('jsonwebtoken')
const logger = require('./logger')
const User = require('../models/user')

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message,
    })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization')
  if (auth && auth.startsWith('Bearer ')) {
    request.token = auth.replace('Bearer ', '')
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token invalid',
    })
  }
  request.user = await User.findById(decodedToken.id)
  next()
}

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor,
}