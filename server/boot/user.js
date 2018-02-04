module.exports = function (app) {
  // console.log(app.models)
  var User = app.models.User;
  var Note = app.models.Note;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  User.settings.acls = require('./user-test.json')//require('./user-acls.json');
  User.create([
    {username: 'John', email: 'john@doe.com', password: 'opensesame'},
    {username: 'Jane', email: 'jane@doe.com', password: 'opensesame'},
    {username: 'Bob', email: 'bob@projects.com', password: 'opensesame'}
  ], function (err, users) {
    if (err) throw err;
    Role.create({
      name: 'admin'
    }, function (err, role) {
      if (err) throw err;

      console.log('Created role:', role);
      Note.create([
        {title: 'project.ownerId', ownerId: users[2].id},
        {title: '2222project.ownerId', ownerId: users[1].id}
      ], function (err, note) {
        if (err) throw err;

        console.log('Created note:', note);
      });
      //make bob an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[2].id
      }, function (err, principal) {
        if (err) throw err;

        console.log('Created principal:', principal);
      });
    });
  });
};
