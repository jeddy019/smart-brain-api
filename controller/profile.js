const handlePorfileGet = (req, res, db) => {
	const { id } = req.params;
  db.select('*').from('users').where({id})
 .then(user => {
 	if (user.length) {
  	res.json(user[0]);
 	} else {
 		res.status(404).json('error getting user')
 	}
  }).catch(err => res.status(404).json('user not found'))
}

module.exports = {
    handlePorfileGet: handlePorfileGet
};