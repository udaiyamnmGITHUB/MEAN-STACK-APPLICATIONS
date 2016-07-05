var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userModel = {
    name:String,
    username:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    admin:Boolean,
    location:String,
    meta:{age:Number, website:String},
    created_at:Date,
    updated_at:Date
};

var userSchema = mongoose.Schema(userModel);

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.statics.isValidUserPassword = function(username, password, done) {
    this.findOne({
        username: username
    }, function(err, user) {
        if (err)
            return done(err);
        if (!user)
            return done(null, false, {
                message: 'Incorrect Username.'
            });
        if (user.isLocked) {

            return user.incLoginAttempts(function(err) {
                if (err) return done(err);
                return done(null, false, {
                    message: 'Account Locked'
                });
            });
        }
        if (passwordHash.verify(password,JSON.parse(JSON.stringify(user)).password)) {

            var updates = { loginAttempts: 0, isLocked: false };
            return user.update(updates, function(err) {
                if (err) return done(err);
                return done(null, user);
            });
        } else {

        	user.incLoginAttempts(function(err) {
                if (err) return done(err);
                return done(null, false, {
                    message: 'Incorrect password'
                });
            });
        }
    });
};

userSchema.methods.incLoginAttempts = function(cb) {

    var updates = { $inc: { loginAttempts: 1 } };

    if (this.loginAttempts + 1 >= config.login.maxAttempts && !this.isLocked) {
        updates.$set = { isLocked: true };
    }
    return this.update(updates, cb);
};


// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);