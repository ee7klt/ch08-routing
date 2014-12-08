/*
This snippet allows you to get a JavaScript object
from a form:

### HTML
<form>
  <input name="email" value="mail@example.com">
  <input name="name" value="My Name">
</form>

### JavaScript
var formData = $(form).serializeObject()

### Result
formData = {
  email: 'mail@example.com',
  name: 'My Name'
}
*/

$.fn.serializeObject = function() {
  var a, o;
  o = {};
  a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name] !== void 0) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      return o[this.name].push(this.value || '');
    } else {
      return o[this.name] = this.value || '';
    }
  });
  return o;
};