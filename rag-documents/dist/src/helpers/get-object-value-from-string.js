"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObjectValueFromString = void 0;
const getObjectValueFromString = (object, path) => {
    const parts = path.split('.');
    let value = object;
    for (const part of parts) {
        if (value[part] === undefined) {
            return undefined;
        }
        value = value[part];
    }
    return value;
};
exports.getObjectValueFromString = getObjectValueFromString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LW9iamVjdC12YWx1ZS1mcm9tLXN0cmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oZWxwZXJzL2dldC1vYmplY3QtdmFsdWUtZnJvbS1zdHJpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQU8sTUFBTSx3QkFBd0IsR0FBRyxDQUFDLE1BQVcsRUFBRSxJQUFZLEVBQU8sRUFBRTtJQUN6RSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzdCLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQTtJQUVsQixLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRTtRQUN4QixJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxTQUFTLEVBQUU7WUFDN0IsT0FBTyxTQUFTLENBQUE7U0FDakI7UUFDRCxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0tBQ3BCO0lBQ0QsT0FBTyxLQUFLLENBQUE7QUFDZCxDQUFDLENBQUE7QUFYWSxRQUFBLHdCQUF3Qiw0QkFXcEMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZ2V0T2JqZWN0VmFsdWVGcm9tU3RyaW5nID0gKG9iamVjdDogYW55LCBwYXRoOiBzdHJpbmcpOiBhbnkgPT4ge1xuICBjb25zdCBwYXJ0cyA9IHBhdGguc3BsaXQoJy4nKVxuICBsZXQgdmFsdWUgPSBvYmplY3RcblxuICBmb3IgKGNvbnN0IHBhcnQgb2YgcGFydHMpIHtcbiAgICBpZiAodmFsdWVbcGFydF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbiAgICB2YWx1ZSA9IHZhbHVlW3BhcnRdXG4gIH1cbiAgcmV0dXJuIHZhbHVlXG59XG4iXX0=