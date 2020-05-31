var router = require('express').Router();
var goalsCtrl = require('../controllers/goals');

router.get('/', goalsCtrl.index);
router.get('/new', goalsCtrl.new);
router.post('/', goalsCtrl.create);
router.get('/:id', goalsCtrl.show);
router.get('/:id/edit', goalsCtrl.edit);
router.put('/:id', goalsCtrl.update);
router.delete('/:id', goalsCtrl.delete);

module.exports = router;