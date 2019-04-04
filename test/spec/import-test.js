import cloudinary from '../../dist/cloudinary-core-shrinkwrap.min';
import {Cloudinary} from '../../dist/cloudinary-core-shrinkwrap.min';
import {Cloudinary as Cld} from '../../dist/cloudinary-core-shrinkwrap.min';

describe('import', function () {
  it('should allow the default export', function () {
    expect(cloudinary).toBeDefined();
    expect(cloudinary.Cloudinary).toBeDefined();
  });
  it('should allow importing a named import', function () {
    var cl = new Cloudinary({cloud_name: 'demo'});
    expect(cl).toBeDefined();
  });
  it('should allow importing a named import alias', function () {
    var cl = new Cld({cloud_name: 'demo'});
    expect(cl).toBeDefined();
  });
});
