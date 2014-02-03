exports.viewProject = function(req, res) {
  var name = req.params.name;
  console.log("The project name is: " + name);
  res.render('project', {
    'projectName': name,
    'image': 'lorempixel.technics.2.jpeg'
  });
};