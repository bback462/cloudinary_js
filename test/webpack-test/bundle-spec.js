import cloudinary from 'cloudinary-core'
import * as cld from 'cloudinary-core'
import {Cloudinary} from 'cloudinary-core'

describe('webpack Module', function(){
  it('should support default import', function(){
    expect(cloudinary).toBeDefined();
    expect(cloudinary.Cloudinary).toBeDefined();
    expect(cloudinary.Transformation).toBeDefined();

  });
  it('should support named exports', function(){
    expect(Cloudinary).toBeDefined();
  });
  it('should support * as imports', function(){
    expect(cld).toBeDefined();
    expect(cld.Cloudinary).toBeDefined();
    expect(cld.Transformation).toBeDefined();

  })
});
