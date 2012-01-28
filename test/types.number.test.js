
/**
 * Module dependencies.
 */

var mongoose = require('./common').mongoose
  , MongooseNumber = mongoose.Types.Number
  , SchemaNumber = mongoose.Schema.Types.Number
  , should = require('should')

/**
 * Test.
 */

module.exports = {

  'test that a mongoose number behaves and quacks like a number': function(){
    var a = new MongooseNumber(5);

    a.should.be.an.instanceof(Number);
    a.should.be.an.instanceof(MongooseNumber);
    a.toString().should.eql('5');

    (a._atomics.constructor).should.eql(Object);
  },

  'an empty string casts to null': function () {
    var n = new SchemaNumber();
    should.strictEqual(n.cast(''), null);
  },

  'a null number should castForQuery to null': function () {
    var n = new SchemaNumber();
    should.strictEqual(n.castForQuery(null), null);
  },

  'undefined throws number cast error': function () {
    var n = new SchemaNumber();
    var err;
    try {
      n.cast(undefined);
    } catch (e) {
      err = e;
    }
    should.strictEqual(true, !! err);
  },

  'array throws cast number error': function () {
    var n = new SchemaNumber();
    var err;
    try {
      n.cast([]);
    } catch (e) {
      err = e;
    }
    should.strictEqual(true, !! err);
  },

  'three throws cast number error': function () {
    var n = new SchemaNumber();
    var err;
    try {
      n.cast('three');
    } catch (e) {
      err = e;
    }
    should.strictEqual(true, !! err);
  },

  '{} throws cast number error': function () {
    var n = new SchemaNumber();
    var err;
    try {
      n.cast({});
    } catch (e) {
      err = e;
    }
    should.strictEqual(true, !! err);
  },

  'does not throw number cast error': function () {
    var n = new SchemaNumber();
    var items = [1, '2', '0', null, '', new Number(5), Number(40), 09, 0x12];
    var err;
    try {
      for (var i = 0, len = items.length; i < len; ++i) {
        n.cast(items[i]);
      }
    } catch (e) {
      err = e;
    }
    should.strictEqual(false, !! err, err);
  }

};
