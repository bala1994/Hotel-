app.factory('sharedServices', function(){
    var data = [];
    return {
        set: function (input) {
            data = input;
        },
        get:function(){
            return data;
        },
    }
});