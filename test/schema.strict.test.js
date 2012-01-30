
/**
 * Test dependencies.
 */

var start = require('./common')
  , should = require('should')
  , mongoose = start.mongoose
  , random = require('../lib/utils').random
  , Query = require('../lib/query')
  , Schema = mongoose.Schema
  , SchemaType = mongoose.SchemaType
  , CastError = SchemaType.CastError
  , ValidatorError = SchemaType.ValidatorError
  , ValidationError = mongoose.Document.ValidationError
  , ObjectId = Schema.ObjectId
  , DocumentObjectId = mongoose.Types.ObjectId
  , DocumentArray = mongoose.Types.DocumentArray
  , EmbeddedDocument = mongoose.Types.Embedded
  , MongooseArray = mongoose.Types.Array
  , MongooseError = mongoose.Error;

model.exports = {

  'should not persist non-schema props': function () {
    var db = start()
      , B = db.model('BlogPost', new Schema({ title: String })

    var b = new B;
    b.whateveriwant = 10;
    b.save(function (err) {
      should.strictEqual(null, err);
      B.collection.findOne({ _id: b._id }, function (err, doc) {
        db.close();
        should.strictEqual(null, err);
        ;('whateveriwant' in doc).should.be.false;
      });
    });
  },

  'strict mode': function(){
    var db = start();

    var lax = new Schema({
        ts  : { type: Date, default: Date.now }
      , content: String
    });

    var strict = new Schema({
        ts  : { type: Date, default: Date.now }
      , content: String
    }, { strict: true });

    var Lax = db.model('Lax', lax);
    var Strict = db.model('Strict', strict);

    var l = new Lax({content: 'sample', rouge: 'data'});
    l._strictMode.should.be.false;
    l = l.toObject();
    l.content.should.equal('sample')
    l.rouge.should.equal('data');
    should.exist(l.rouge);

    var s = new Strict({content: 'sample', rouge: 'data'});
    s._strictMode.should.be.true;
    s = s.toObject();
    s.should.have.property('ts');
    s.content.should.equal('sample');
    s.should.not.have.property('rouge');
    should.not.exist(s.rouge);

    // instance override
    var instance = new Lax({content: 'sample', rouge: 'data'}, true);
    instance._strictMode.should.be.true;
    instance = instance.toObject();
    instance.content.should.equal('sample')
    should.not.exist(instance.rouge);
    instance.should.have.property('ts')

    // hydrate works as normal, but supports the schema level flag.
    var s2 = new Strict({content: 'sample', rouge: 'data'}, false);
    s2._strictMode.should.be.false;
    s2 = s2.toObject();
    s2.should.have.property('ts')
    s2.content.should.equal('sample');
    s2.should.have.property('rouge');
    should.exist(s2.rouge);

    // testing init
    var s3 = new Strict();
    s3.init({content: 'sample', rouge: 'data'});
    var s3obj = s3.toObject();
    s3.content.should.equal('sample');
    s3.should.not.have.property('rouge');
    should.not.exist(s3.rouge);

    // strict on create
    Strict.create({content: 'sample2', rouge: 'data'}, function(err, doc){
      doc.content.should.equal('sample2');
      doc.should.not.have.property('rouge');
      should.not.exist(doc.rouge);
      db.close();
    });
  },

  'strict mode virtuals': function () {
    var db = start();

    var getCount = 0
      , setCount = 0;

    var strictSchema = new Schema({
        email: String
      , prop: String
    }, {strict: true});

    strictSchema
    .virtual('myvirtual')
    .get(function() {
      getCount++;
      return 'ok';
    })
    .set(function(v) {
      setCount++;
      this.prop = v;
    });

    var StrictModel = db.model('StrictVirtual', strictSchema);

    var strictInstance = new StrictModel({
        email: 'hunter@skookum.com'
      , myvirtual: 'test'
    });

    db.close();
    getCount.should.equal(0);
    setCount.should.equal(1);

    strictInstance.myvirtual = 'anotherone';
    var myvirtual = strictInstance.myvirtual;

    getCount.should.equal(1);
    setCount.should.equal(2);
  },

}
