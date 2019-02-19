describe("util", function () {
  describe("isEmpty",function () {
    it("should return false", function () {
      const isEmpty = cloudinary.Util.isEmpty;
      expect(isEmpty("")).toBe(true, "for empty string");
      expect(isEmpty(true)).toBe(true, "for true");
      expect(isEmpty([])).toBe(true, "for empty literal array");
      expect(isEmpty({})).toBe(true);
      expect(isEmpty(new Array())).toBe(true, "for new Array()");
      if(typeof Map){
        expect(isEmpty(new Map())).toBe(true, "for new Map()");
      } else {
        console.warn("Map is not preset.")
      }
      if(typeof Set) {
        expect(isEmpty(new Set())).toBe(true);
      } else {
        console.warn("Set is not preset.")
      }
    })
  })
});
