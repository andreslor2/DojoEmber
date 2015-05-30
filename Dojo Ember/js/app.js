App = Ember.Application.create();

App.Router.map(function() {
    this.route('create', { path: '/create' });
    this.route('index', { path: '/' });
});

App.IndexRoute = Ember.Route.extend({
    setupController: function(controller) {
        $.get( "http://proyectosudea.hol.es/users", function(users) {
            controller.set('users', JSON.parse(users).users);
        });
    }
});

App.CreateRoute = Ember.Route.extend({
    model: function(){
        return Em.Object.create({});
    },
    setupController: function(controller, model) {
        controller.set('model', model);
        controller.set('title', 'Crear Nuevo Usuario');
    }
});

App.IndexController = Ember.Controller.extend({
    title: 'Lista de Usuarios',
    actions: {
        delete: function(user) {
            $.ajax({
                url: 'http://proyectosudea.hol.es/users/'+user.id,
                type: 'DELETE',
                success: function(){
                    location.reload();
                }
            });
        }
    }
});

App.CreateController = Ember.Controller.extend({
    actions: {
        create: function() {
            var userParams = this.get("model");
            $.ajax({
                url: 'http://proyectosudea.hol.es/users',
                type: 'POST',
                data: JSON.stringify(userParams),
                contentType: 'text/json'
            });
            this.transitionTo('index');
        }
    }
});

