const router = require('express').Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReactionToThought,
  removeReactionToThought,
} = require('../../controllers/thoughtController');

router.route('/')
  .get(getThoughts)
  .post(createThought);

router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

  router.route('/:thoughtId/reactions').post(addReactionToThought);
  router.route('/:thoughtId/reactions/:reactionId').delete(removeReactionToThought);

module.exports = router;